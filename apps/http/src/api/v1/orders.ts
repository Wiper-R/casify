import { Router } from "express";
import { generateSignature } from "../../cloudinary";
import prisma from "@repo/db/client";
import { CreateOrderSchema, UpdateOrderSchema } from "../../types";
import { stripe } from "../../stripe";
import crypto from "crypto";
import {
  BASE_PRICE,
  COLORS,
  FINISHES,
  MATERIALS,
  MODELS,
} from "@repo/constants";
import Stripe from "stripe";
import env from "../../env";
import { Order } from "@repo/types";
import { auth } from "../../middleware/auth";
import z from "zod";

export const router = Router();

router.post("/upload", async (_, res) => {
  const { timestamp, signature } = await generateSignature();
  res.json({ timestamp, signature });
});

router.post("/", async (req, res) => {
  const data = await CreateOrderSchema.parseAsync(req.body);
  const order: Order = await prisma.order.create({
    data: {
      userId: req.userId,
      imageUrl: data.imageUrl,
      height: data.height,
      width: data.width,
    },
  });
  res.json(order);
});

router.put("/:orderId", async (req, res) => {
  const orderId = req.params.orderId;
  const data = await UpdateOrderSchema.parseAsync(req.body);
  const order = await prisma.order.update({
    where: { id: orderId },
    data: {
      Customization: {
        create: {
          ...data,
        },
      },
    },
  });
  res.json(order);
});

router.get("/:orderId", async (req, res) => {
  const orderId = req.params.orderId;
  const order: Order | null = await prisma.order.findUnique({
    where: { id: orderId },
    include: { Customization: true, Address: true, User: true },
  });
  if (!order) {
    res.status(404).json({ message: "Order not found" });
    return;
  }
  res.json(order);
});

router.post("/:orderId/checkout", async (req, res) => {
  const orderId = req.params.orderId;
  const order = await prisma.order.findUnique({
    where: { id: orderId },
    include: { Customization: true, Address: true },
  });

  if (!order) {
    res.status(404).json({ message: "Order not found" });
    return;
  }

  const Customization = order.Customization!;

  const material = MATERIALS.options.find(
    (m) => m.value == Customization.material,
  )!;
  const finish = FINISHES.options.find((f) => f.value == Customization.finish)!;
  const model = MODELS.find((m) => m.value == Customization.model)!;
  const color = COLORS.find((f) => f.value == Customization.color)!;
  const price = material.price + finish.price + BASE_PRICE;
  const name = `Case for ${model.name}/Color: ${color.name}/Material: ${material.name}/Finish: ${finish.name}`;
  const session = await stripe.checkout.sessions.create({
    shipping_address_collection: { allowed_countries: ["IN"] },
    line_items: [
      {
        quantity: 1,
        price_data: {
          currency: "inr",
          unit_amount: price * 100 * 84, // Converting dollor to inr
          product_data: { name },
        },
      },
    ],
    success_url: `${req.headers.origin}/thank-you?id=${order.id}`,
    cancel_url: `${req.headers.origin}/payment-failed?id=${order.id}`,
    mode: "payment",
    payment_intent_data: {
      metadata: {
        order_id: order.id,
      },
    },
  });
  res.json({ id: session.id });
});

async function handlePaymentSuccess(event: Stripe.PaymentIntentSucceededEvent) {
  const object = event.data.object;
  const { order_id } = object.metadata;
  const { billing_details } = (object as any).charges.data[0];
  const { email, name } = billing_details as { email: string; name: string };
  const shipping = object.shipping!.address!;
  const order = await prisma.order.findUnique({ where: { id: order_id } });
  if (!order) return false;
  if (order.state == "paid") return false;
  await prisma.order.update({
    where: { id: order_id },
    include: { User: true },
    data: {
      transactionId: event.id,
      amount: object.amount,
      state: "paid",
      Address: {
        create: {
          line1: shipping.line1!,
          line2: shipping.line2!,
          country: shipping.country!,
          city: shipping.city!,
          postal_code: shipping.postal_code!,
          state: shipping.state!,
        },
      },
      User: {
        connectOrCreate: {
          where: { email },
          create: {
            email,
            name,
            password: crypto.randomBytes(14).toString("hex"),
          },
        },
      },
    },
  });
  return true;
}

router.post("/callback", async (req, res) => {
  var ack = false;
  try {
    const signature = req.headers["stripe-signature"];
    const event = stripe.webhooks.constructEvent(
      req.rawBody!,
      signature!,
      env.STRIPE_WEBHOOK_SECRET,
    );

    switch (event.type) {
      case "payment_intent.succeeded":
        ack = await handlePaymentSuccess(event);
        break;
    }

    res.json({ received: ack });
  } catch (e) {
    console.error("Error processing webhook:", e);
    res.status(400).send("Webhook error");
  }
});

router.get("/", auth, async (req, res) => {
  const { cursor, limit: take } = await z
    .object({
      cursor: z.string().nullish(),
      limit: z.number().default(10),
    })
    .parseAsync(req.query);

  var orders: Order[];
  if (req.role == "user") {
    orders = await prisma.order.findMany({
      where: { userId: req.userId },
      take,
      skip: cursor ? 1 : 0,
      cursor: cursor ? { id: cursor } : undefined,
      include: { Address: true, Customization: true, User: true },
      orderBy: [{ createdAt: "desc" }, { id: "asc" }],
    });
  } else {
    orders = await prisma.order.findMany({
      take,
      skip: cursor ? 1 : 0,
      cursor: cursor ? { id: cursor } : undefined,
      include: { Address: true, Customization: true, User: true },
      orderBy: [{ createdAt: "desc" }, { id: "asc" }],
    });
  }
  res.json({
    data: orders,
    nextCursor: orders.length > 0 ? orders[orders.length - 1].id : null,
  });
});
