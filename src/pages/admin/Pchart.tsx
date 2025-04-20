
"use client"

import * as React from "react"
import { TrendingUp } from "lucide-react"
import { Label, Pie, PieChart, ResponsiveContainer } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

const generateRandomData = () => [
  { category: "Groceries", value: Math.floor(Math.random() * 300) + 200, fill: "#8884d8" },
  { category: "Electronics", value: Math.floor(Math.random() * 250) + 150, fill: "#82ca9d" },
  { category: "Clothing", value: Math.floor(Math.random() * 200) + 100, fill: "#ffc658" },
  { category: "Home", value: Math.floor(Math.random() * 150) + 50, fill: "#ff7300" },
];

const chartConfig = {
  sales: {
    label: "Sales Distribution",
  },
  Groceries: {
    label: "Groceries",
    color: "hsl(var(--chart-1))",
  },
  Electronics: {
    label: "Electronics",
    color: "hsl(var(--chart-2))",
  },
  Clothing: {
    label: "Clothing",
    color: "hsl(var(--chart-3))",
  },
  Home: {
    label: "Home",
    color: "hsl(var(--chart-4))",
  },
} satisfies ChartConfig

export default function Pchart() {
  const [chartData, setChartData] = React.useState(generateRandomData());
  const totalValue = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.value, 0)
  }, [chartData])

  React.useEffect(() => {
    const interval = setInterval(() => {
      setChartData(generateRandomData());
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-2">
        <CardDescription>Sales Distribution</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-4">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square h-[200px]"
        >
          <ResponsiveContainer>
            <PieChart>
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent />}
              />
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="category"
                innerRadius={60}
                outerRadius={80}
              >
                <Label
                  content={({ viewBox }) => {
                    if (!viewBox || !('cx' in viewBox) || !('cy' in viewBox)) return null;
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-xl font-bold"
                        >
                          ${totalValue.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 20}
                          className="fill-muted-foreground text-xs"
                        >
                          Total Sales
                        </tspan>
                      </text>
                    );
                  }}
                />
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Trending up by 8.3% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Real-time sales distribution
        </div>
      </CardFooter>
    </Card>
  )
}
