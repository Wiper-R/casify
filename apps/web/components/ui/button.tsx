import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";
import React, { ComponentProps } from "react";

export const buttonVariants = cva(
  "text-base inline-flex items-center transition duration-150 font-medium",
  {
    variants: {
      variant: {
        primary: "bg-primary text-primary-foreground",
        ghost: "bg-transparent hover:bg-accent",
      },
      size: {
        default: "p-1 px-4 rounded",
        lg: "py-2 px-6 rounded-lg",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
);

type ButtonProps = ComponentProps<"button"> &
  VariantProps<typeof buttonVariants>;

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, size, variant, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ size, variant }), className)}
        ref={ref}
        {...props}
      />
    );
  }
);
