import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { DashboardStats } from "../components/dashboard/DashboardStats";
import { RecentSale } from "../components/dashboard/RecentSale";
import { Chart } from "../components/dashboard/Chart";
import prisma from "../lib/db";
import { unstable_noStore as noStore } from "next/cache";


async function getData() {
  const now = new Date();
  const sevendays = new Date();
  sevendays.setDate(now.getDate() - 7);

  const data = await prisma.order.findMany({
    where: {
      createdAt: {
        gte: sevendays,
      },
    },
    select: {
      amount: true,
      createdAt: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const result = data.map((item) => ({
    date: new Intl.DateTimeFormat("en-US").format(item.createdAt),
    revenue: item.amount / 100,
  }));

  return result;
}

export default async function Dashboard() {
  noStore();
  const data = await getData();

  return (
    <>
      <DashboardStats />
      <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3 mt-10">
        <Card className="xl:col-span-2 ">
          <CardHeader>
            <CardTitle>Transaction</CardTitle>
            <CardDescription>Recent transaction from the last 7 days</CardDescription>
          </CardHeader>
          <CardContent>
            <Chart data={data} />
          </CardContent>
        </Card>

        <RecentSale />
      </div>
    </>
  );
}
