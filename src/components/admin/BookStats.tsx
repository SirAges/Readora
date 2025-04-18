"use client";
import { useBookStatisticsQuery } from "@/redux/features/book/bookApiSlice";
import { Loader2, TrendingDown, TrendingUp } from "lucide-react";
import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "../ui/chart";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import CountUp from "react-countup";

type StatsType = {
  totalBooks: number;
  stats: StatType[];
  trend: {
    growth: boolean;
    percentage: number;
  };
};
type StatType = {
  year?: number;
  month: number;
  count: number;
};

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const BookStats = () => {
  const { data, isFetching } = useBookStatisticsQuery("book");
  const [stats, setStats] = useState<StatsType | null>(null);
  const [chartData, setChartData] = useState([]);
  const [selectedYear, setSelectedYear] = useState<string>("2025");

  const date = new Date();
  const year = date.getFullYear();
  useEffect(() => {
    if (data?.success) {
      const transformed = data.data.stats
        .filter((f: StatType) => f.year === parseInt(selectedYear))
        .map(({ month, count }: StatType) => ({
          count,
          month: months[month - 1],
        }));
      setChartData(transformed);
    }
  }, [data, selectedYear]);

  useEffect(() => {
    if (data?.success) {
      setStats(data.data);
    }
    return () => {};
  }, [data]);
  const chartConfig = {
    month: { label: "Month: ", color: "var(--chart-1)" },
    count: { label: "Count: ", color: "var(--chart-1)" },
  } satisfies ChartConfig;
  if (isFetching) {
    return (
      <div className="w-full h-full  px-2 flex flex-col items-center justify-center">
        <Loader2
          size={100}
          strokeWidth={1}
          className="text-primary animate-spin"
        />
        <p>Fetching books from library...</p>
      </div>
    );
  }
  return (
    <Card className="border-none h-full w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Book Statictics</CardTitle>

          <Select
            value={selectedYear}
            onValueChange={setSelectedYear}
          >
            <SelectTrigger className="w-24">
              <SelectValue placeholder="Select a year" />
            </SelectTrigger>
            <SelectContent>
              <div className="w-20"></div>
              <SelectItem value={`${year - 4}`}>{}</SelectItem>
              <SelectItem value={`${year - 3}`}>{year - 3}</SelectItem>
              <SelectItem value={`${year - 2}`}>{year - 2}</SelectItem>
              <SelectItem value={`${year - 1}`}>{year - 1}</SelectItem>
              <SelectItem value={`${year}`}>{year}</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center justify-between">
          <CardDescription>one year Statictics</CardDescription>

          <CardDescription className="leading-none text-muted-foreground">
            Total Books:{" "}
            <CountUp
              duration={3}
              delay={2}
              start={0}
              end={stats?.totalBooks || 0}
            />
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="w-full h-full">
        <ChartContainer
          className="h-full py-2"
          config={chartConfig}
        >
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{ left: 10, right: 10, top: 10 }}
          >
            <CartesianGrid
              vertical={false}
              horizontal={false}
            />

            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  indicator="line"
                  className="px-2 py-2 gap-2"
                />
              }
              cursor={false}
            />

            <Line
              dataKey="count"
              type="natural"
              stroke="var(--chart-1)"
              strokeWidth={2}
              dot={{ fill: "var(--chart-1)" }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-x-2 font-medium leading-none">
          <p>
            Trending {stats?.trend.growth ? "up" : "down"} by{" "}
            {stats?.trend.percentage}% this month
          </p>
          {stats?.trend.growth ? (
            <TrendingUp
              size={14}
              className="text-primary"
            />
          ) : (
            <TrendingDown
              size={14}
              className="text-destructive"
            />
          )}
        </div>
      </CardFooter>
    </Card>
  );
};
export default BookStats;
