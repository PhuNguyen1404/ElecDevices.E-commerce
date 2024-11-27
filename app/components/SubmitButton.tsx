"use client";

import { Button } from "@/components/ui/button";
import { Loader2, ShoppingBagIcon } from "lucide-react";
import { useFormStatus } from "react-dom";

interface buttonProps {
  text: string;
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link"
    | null
    | undefined;
}

export function SubmitButton({ text, variant }: buttonProps) {
  const { pending } = useFormStatus();

  return (
    <>
      {pending ? (
        <Button disabled variant={variant}>
          <Loader2 className="mr-2 h-4 2-4 animate-spin" />
          Please wait
        </Button>
      ) : (
        <Button variant={variant} type="submit">
          {text}
        </Button>
      )}
    </>
  );
}

export function ShoppingButton() {
  const { pending } = useFormStatus();

  return (
    <>
      {pending ? (
        <Button disabled size="lg" className="w-full mt-5">
          <Loader2 className="mr-4 h-5 w-5 animate-spin" />
          Please wait
        </Button>
      ) : (
        <Button size="lg" className="w-full mt-5" type="submit">
          <ShoppingBagIcon className="mr-4 h-5 w-5" />
          Add to cart
        </Button>
      )}
    </>
  );
}

export function DelItemBag() {
  const { pending } = useFormStatus();
  return (
    <>
      {pending ? (
        <button disabled className="font-semibol text-red-500 text-end">
          Removing...
        </button>
      ) : (
        <button type="submit" className="font-semibol text-red-500 text-end">
          Delete
        </button>
      )}
    </>
  );
}

export function CheckoutButton() {
  const { pending } = useFormStatus();

  return (
    <>
      {pending ? (
        <Button disabled size="lg" className="w-full mt-5">
          <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Please wait...
        </Button>
      ) : (
        <Button size="lg" className="w-full mt-5">
          Checkout
        </Button>
      )}
    </>
  );
}