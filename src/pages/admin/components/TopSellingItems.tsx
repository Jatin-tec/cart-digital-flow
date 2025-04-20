
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp } from "lucide-react";

interface TopSellingItem {
  name: string;
  sales: number;
  growth: number;
}

const TopSellingItems = () => {
  // Simulated data - in real app, this would come from an API
  const topItems: TopSellingItem[] = [
    { name: "Organic Bananas", sales: 1234, growth: 12.3 },
    { name: "Whole Milk", sales: 1156, growth: 8.7 },
    { name: "Wheat Bread", sales: 998, growth: 5.2 },
    { name: "Fresh Eggs", sales: 887, growth: 3.8 },
    { name: "Chicken Breast", sales: 765, growth: 2.1 }
  ];

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
                <p className="text-xs text-muted-foreground">
                  {item.sales.toLocaleString()} units sold
                </p>
              </div>
              <div className="text-sm text-green-600">
                +{item.growth}%
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default TopSellingItems;
