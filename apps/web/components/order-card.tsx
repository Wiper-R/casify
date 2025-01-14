import { Order } from "@repo/types";
import { formatDistance } from "date-fns";
import { COLORS, FINISHES, MATERIALS, MODELS } from "@repo/constants";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Badge } from "./ui/badge";
import { AlertCircle, Clock, DollarSign, MapPin, Palette } from "lucide-react";
import { Phone } from "./phone";
import Link from "next/link";
import { buttonVariants } from "./ui/button";

const STATE_COLORS = {
  pending: "bg-yellow-400",
  paid: "bg-green-400",
  refunded: "bg-purple-400",
  fulfilled: "bg-green-800",
  cancelled: "bg-red-800",
};

export default function OrderCard({
  order,
  isAdminView,
}: {
  order: Order;
  isAdminView: boolean;
}) {
  const stateColor = STATE_COLORS[order.state];
  const model =
    MODELS.find((m) => m.value == order.Customization?.model) || MODELS[0];
  const material =
    MATERIALS.options.find((m) => m.value == order.Customization?.material) ||
    MATERIALS.options[0];
  const finish =
    FINISHES.options.find((f) => f.value == order.Customization?.finish) ||
    FINISHES.options[0];
  const color =
    COLORS.find((c) => c.value == order.Customization?.color) || COLORS[0];
  return (
    <Card className="w-full max-w-2xl">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Order #{order.id}</CardTitle>
        <Badge
          variant="outline"
          className={`${stateColor} text-white capitalize`}
        >
          {order.state}
        </Badge>
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-4">
          <div className="bg-white p-1 border rounded-md">
            <Phone
              imgSrc={order.Customization?.customizedUrl || order.imageUrl}
              className="w-10"
              backgroundColor={color.color}
            />
          </div>
          <div className="space-y-1">
            <h3 className="font-semibold">{model?.name || "Not Selected"}</h3>

            <p className="text-sm text-muted-foreground">
              Image Size: {order.width}x{order.height}{" "}
            </p>
            {order.Customization ? (
              <div className="flex items-center space-x-2 text-sm">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{
                    backgroundColor: COLORS.find(
                      (c) => c.value === order.Customization?.color,
                    )?.color,
                  }}
                />
                <span>{color.name}</span>
                <span>•</span>
                <span>{material.name}</span>
                <span>•</span>
                <span>{finish.name}</span>
              </div>
            ) : (
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Palette className="h-4 w-4" />
                <span>No customization</span>
              </div>
            )}
          </div>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-4">
          <div className="flex items-center space-x-2">
            <MapPin className="h-4 w-4 opacity-70" />
            <span className="text-sm font-medium">Shipping Address</span>
          </div>
          <div className="text-sm">
            {order.Address ? (
              <>
                <p>{order.Address.line1}</p>
                {order.Address.line2 && <p>{order.Address.line2}</p>}
                <p>
                  {order.Address.city}, {order.Address.state}{" "}
                  {order.Address.postal_code}
                </p>
                <p>{order.Address.country}</p>
              </>
            ) : (
              <p className="text-muted-foreground">
                No shipping address provided
              </p>
            )}
          </div>
          <div className="flex items-center space-x-2">
            <DollarSign className="h-4 w-4 opacity-70" />
            <span className="text-sm font-medium">Total Amount</span>
          </div>
          <div className="text-sm font-semibold">
            {order.amount > 0
              ? (order.amount / 100).toLocaleString("en-IN", {
                  style: "currency",
                  currency: "INR",
                })
              : "Not calculated"}
          </div>
          <div className="flex items-center space-x-2">
            <Clock className="h-4 w-4 opacity-70" />
            <span className="text-sm font-medium">Order Date</span>
          </div>
          <div className="text-sm">
            {formatDistance(new Date(order.createdAt), new Date(), {
              addSuffix: true,
            })}
          </div>
        </div>
      </CardContent>
      <CardFooter className="justify-between">
        {isAdminView ? (
          <span className="text-sm text-gray-700">{order.User?.email}</span>
        ) : !order.Customization ? (
          <Link
            href={`/create/customize?id=${order.id}`}
            className={buttonVariants({ variant: "outline" })}
          >
            Continue Customizing
          </Link>
        ) : (
          order.state == "pending" && (
            <Link
              href={`/create/preview?id=${order.id}`}
              className={buttonVariants({ variant: "outline" })}
            >
              Review & Checkout
            </Link>
          )
        )}
        {order.transactionId ? (
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <AlertCircle className="h-4 w-4" />
            <span>Transaction ID: {order.transactionId}</span>
          </div>
        ) : (
          <div className="text-sm text-muted-foreground">No transaction ID</div>
        )}
      </CardFooter>
    </Card>
  );
}
