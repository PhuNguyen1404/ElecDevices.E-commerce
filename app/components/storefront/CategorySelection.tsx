import Link from "next/link";
import Image from "next/image";
import phone from "@/public/phone.jpg";
import laptop from "@/public/laptop.jpg";
import tablet from "@/public/tablet.jpg";

export function CategorieSelection() {
  return (
    <div className="py-24 sm:py-32">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-extrabold tracking-tight">
          Shop by Category
        </h2>

        <Link
          href="/products/all"
          className="text-sm font-semibold text-primary hover:text-primary/80"
        >
          Browse all products &rarr;
        </Link>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:grid-rows-2 sm:gap-x-6">
        <div className="group aspect-w-2 aspect-h-1 rounded-xl overflow-hidden sm:aspect-w-1 sm:row-span-2">
          <Image
            src={phone}
            alt="Phone products image"
            className="object-fill object-center"
          />
          <div className="bg-gradient-to-b from-transparent to-black opacity-75" />
          <div className="p-6 flex items-end w-full">
            <Link href="/products/phone">
              <h3 className="text-white font-semibold">Phone</h3>
              <p className="mt-1 text-sm text-white">Shop Now &rarr;</p>
            </Link>
          </div>
        </div>

        <div className="group aspect-w-2 aspect-h-1 rounded-xl overflow-hidden sm:relative sm:aspect-none sm:h-full">
          <Image
            src={tablet}
            alt="Tablet products image"
            className="object-fill object-center sm:absolute sm:inset-0 sm:w-full sm:h-full"
          />
          <div className="bg-gradient-to-b from-transparent to-black opacity-75 sm:absolute sm:inset-0" />
          <div className="p-6 flex items-end sm:absolute sm:inset-0">
            <Link href="/products/tablet">
              <h3 className="text-white font-semibold">Tablet</h3>
              <p className="mt-1 text-sm text-white">Shop Now &rarr;</p>
            </Link>
          </div>
        </div>

        <div className="group aspect-w-2 aspect-h-1 rounded-xl overflow-hidden sm:relative sm:aspect-none sm:h-full">
          <Image
            src={laptop}
            alt="Laptop products image"
            className="object-contain object-center sm:absolute sm:inset-0 sm:w-full sm:h-full"
          />
          <div className="bg-gradient-to-b from-transparent to-black opacity-75 sm:absolute sm:inset-0" />
          <div className="p-6 flex items-end sm:absolute sm:inset-0">
            <Link href="/products/laptop">
              <h3 className="text-white font-semibold">Laptop</h3>
              <p className="mt-1 text-sm text-white">Shop Now &rarr;</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
