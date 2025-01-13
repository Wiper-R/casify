"use client";

import { Button } from "@/components/ui/button";
import apiClient from "@/lib/api-client";
import { Order } from "@repo/types";
import { loadStripe, Stripe } from "@stripe/stripe-js";
import { useEffect, useRef } from "react";

export function CheckoutButton({ order }: { order: Order }) {
  const stripeRef = useRef<Stripe>(null);
  useEffect(() => {
    loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!).then((stripe) => {
      if (stripe) stripeRef.current = stripe;
    });
  }, []);
  async function handleCheckout() {
    if (!stripeRef.current) {
      stripeRef.current = (await loadStripe(
        process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!,
      ))!;
    }

    const stripe = stripeRef.current;
    const res = await apiClient.post(`/orders/${order.id}/checkout`);
    const data: { id: string } = res.data;
    await stripe.redirectToCheckout({ sessionId: data.id });
  }
  return (
    <Button className="ml-auto block mt-10" onClick={handleCheckout}>
      Checkout
    </Button>
  );
}
