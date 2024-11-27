"use client";

import {
  ResponsiveContainer,
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Legend,
  Line,
  Tooltip,
} from "recharts";

interface iAppProps {
  data: {
    date: string;
    revenue: number;
  }[];
}

interface DataPoint {
  date: string;
  revenue: number;
}

interface AggregatedData {
  [date: string]: number;
}

const aggregateData = (data: DataPoint[]): DataPoint[] => {
  const aggregated = data.reduce((acc: AggregatedData, curr: DataPoint) => {
    if (acc[curr.date]) {
      acc[curr.date] += curr.revenue;
    } else {
      acc[curr.date] = curr.revenue;
    }
    return acc;
  }, {});

  return Object.keys(aggregated).map((date) => ({
    date,
    revenue: aggregated[date],
  }));
};

export function Chart({ data }: iAppProps) {
  const processedData = aggregateData(data);
  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={processedData}>
        <CartesianGrid strokeDasharray={"3 3"} />
        <XAxis dataKey="date" />
        <YAxis dataKey="revenue" />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          stroke="#3b82f6"
          activeDot={{ r: 8 }}
          dataKey="revenue"
        />
      </LineChart>
    </ResponsiveContainer>
  );
}