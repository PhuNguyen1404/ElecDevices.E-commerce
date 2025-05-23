import { EditForm } from "@/app/components/dashboard/EditForm";
import prisma from "@/app/lib/db";
import { notFound } from "next/navigation";
import { unstable_noStore as noStore } from "next/cache"

async function getData(productId: string) {
  noStore();
  const data = await prisma.product.findUnique({
    where: {
      id: productId,
    },
  });

  if (!data) {
    return notFound();
  }

  return data;
}

export default async function EditProduct({
  params,
}: {
  params: { id: string };
}) {
  const data = await getData(params.id);
  return <EditForm data={data} />;
}
