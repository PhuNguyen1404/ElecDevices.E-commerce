import { ProductCard } from "@/app/components/storefront/ProductCard";
import prisma from "@/app/lib/db";
import { notFound } from "next/navigation";

async function getData(productCategory: string) {
  switch (productCategory) {
    case "all": {
      const data = await prisma.product.findMany({
        select: {
          name: true,
          image: true,
          price: true,
          id: true,
          description: true,
        },
        where: {
          status: "published",
        },
      });

      return {
        title: "All Products",
        data: data,
      };
    }
    case "phone": {
      const data = await prisma.product.findMany({
        where: {
          status: "published",
          category: "phone",
        },
        select: {
          name: true,
          image: true,
          price: true,
          id: true,
          description: true,
        },
      });

      return {
        title: "Phone",
        data: data,
      };
    }
    case "laptop": {
      const data = await prisma.product.findMany({
        where: {
          status: "published",
          category: "laptop",
        },
        select: {
          name: true,
          image: true,
          price: true,
          id: true,
          description: true,
        },
      });

      return {
        title: "Laptop",
        data: data,
      };
    }
    case "tablet": {
      const data = await prisma.product.findMany({
        where: {
          status: "published",
          category: "tablet",
        },
        select: {
          name: true,
          image: true,
          price: true,
          id: true,
          description: true,
        },
      });

      return {
        title: "Tablet",
        data: data,
      };
    }
    default: {
      return notFound();
    }
  }
}

export default async function CategoriesPage({
  params,
}: {
  params: { name: string };
}) {
  const { data, title } = await getData(params.name);

  return (
    <section>
      <h1 className="font-semibold text-3xl my-5">{title}</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {data.map((item) => (
          <ProductCard item={item} key={item.id} />
        ))}
      </div>
    </section>
  );
}
