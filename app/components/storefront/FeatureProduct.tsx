import prisma from "@/app/lib/db";
import { LoadingProductCard, ProductCard } from "./ProductCard";
import { Suspense } from "react";
import { unstable_noStore as noStore } from "next/cache";

async function getData() {
  const data = await prisma.product.findMany({
    where: {
      status: "published",
      isFeatured: true,
    },
    select: {
      id: true,
      name: true,
      description: true,
      image: true,
      price: true,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 3,
  });

  return data;
}

export function FeatureProducts() {
  return (
    <>
      <h2 className="text-2xl font-extrabold tracking-tight">
        Featured Products
      </h2>
      <Suspense fallback={<LoadingRows />}>
        <LoadFeatureProducts />
      </Suspense>
    </>
  );
}

async function LoadFeatureProducts() {
  noStore();
  const data = await getData();

  return (
    <div className="mt-5 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {data.map((item) => (
        <ProductCard key={item.id} item={item} />
      ))}
    </div>
  );
}

function LoadingRows() {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mt-5">
      <LoadingProductCard />
      <LoadingProductCard />
      <LoadingProductCard />
    </div>
  );
}
