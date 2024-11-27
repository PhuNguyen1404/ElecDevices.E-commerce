import { Checkout, DeteleBagItem } from "@/app/action";
import { CheckoutButton, DelItemBag } from "@/app/components/SubmitButton";
import { Cart } from "@/app/lib/interface";
import { redis } from "@/app/lib/redis";
import { Button } from "@/components/ui/button";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { ShoppingBag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { unstable_noStore as noStore } from "next/cache";

export default async function Bag() {
  noStore();
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    return redirect("/");
  }

  const cart: Cart | null = await redis.get(`cart-${user.id}`);

  let totalPrice = 0;

  cart?.items.forEach((item) => {
    totalPrice += item.price * item.quantity;
  });

  return (
    <div className="max-w-2xl mx-auto mt-10 min-h-[55vh]">
      {!cart || !cart.items ? (
        <div className="flex min-h-[400px] flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center mt-20">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
            <ShoppingBag className="w-10 h-10 text-primary" />
          </div>
          <h2 className="text-xl font-semibold mt-6 mb-6">
            You dont have any in here currently
          </h2>
          <Button asChild>
            <Link href="/">Shop Now!</Link>
          </Button>
        </div>
      ) : (
        <div className="flex flex-col gap-y-10">
          {cart?.items.map((item) => (
            <div key={item.id} className="flex">
              <div className="w-24 h-24 sm:w-32 sm:h-32 relative">
                <Image
                  src={item.imageString}
                  alt="Product Image"
                  fill
                  className="rounded-md object-contain"
                />
              </div>
              <div className="ml-5 flex justify-between items-start w-full font-semibold">
                <p>{item.name}</p>
                <div className="flex flex-col h-full justify-between">
                  <div className="flex items-center gap-x-2">
                    <p>{item.quantity} x</p>
                    <p>${new Intl.NumberFormat("en-US").format(item.price)}</p>
                  </div>
                  <form action={DeteleBagItem} className="text-end">
                    <input type="hidden" name="productId" value={item.id} />
                    <DelItemBag />
                  </form>
                </div>
              </div>
            </div>
          ))}
          <div className="mt-10">
            <div className="flex items-center justify-between font-semibold text-xl">
              <p>Subtotal: </p>
              <p>${new Intl.NumberFormat("en-US").format(totalPrice)}</p>
            </div>
            <form action={Checkout}>
              <CheckoutButton />
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
