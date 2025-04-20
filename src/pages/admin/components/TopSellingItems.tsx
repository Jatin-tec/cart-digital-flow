
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, DollarSign } from "lucide-react";

interface TopSellingItem {
  name: string;
  sales: number;
  growth: number;
  revenue: number;
}

const TopSellingItems = () => {
  // Simulated data - in real app, this would come from an API
  const topItems: TopSellingItem[] = [
    { name: "Organic Bananas", sales: 1234, growth: 12.3, revenue: 6170 },
    { name: "Whole Milk", sales: 1156, growth: 8.7, revenue: 5780 },
    { name: "Wheat Bread", sales: 998, growth: 5.2, revenue: 4990 },
    { name: "Fresh Eggs", sales: 887, growth: 3.8, revenue: 4435 },
    { name: "Chicken Breast", sales: 765, growth: 2.1, revenue: 3825 }
  ];

  const totalRevenue = topItems.reduce((sum, item) => sum + item.revenue, 0);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <TrendingUp className="h-5 w-5" />
          Top Selling Items
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {topItems.map((item, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm font-medium">{item.name}</p>
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span>{item.sales.toLocaleString()} units</span>
                  <span className="flex items-center gap-1">
                    <DollarSign className="h-3 w-3" />
                    {item.revenue.toLocaleString()}
                  </span>
                </div>
              </div>
              <div className="text-sm text-green-600">
                +{item.growth}%
              </div>
            </div>
          ))}
          <div className="pt-4 mt-4 border-t">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Total Revenue</span>
              <span className="text-sm font-bold">${totalRevenue.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TopSellingItems;
