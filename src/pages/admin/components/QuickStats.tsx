
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { ChartBar, Users, Activity, PieChart } from "lucide-react";

interface QuickStatsProps {
  metrics: {
    totalSales?: number;
    activeUsers?: number;
    cartUsage?: number;
    timestamp?: string;
  } | null;
  activeRequests: number;
}

const QuickStats: React.FC<QuickStatsProps> = ({ metrics, activeRequests }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <Card>
        <CardContent className="pt-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-500">Total Sales</p>
              <p className="text-3xl font-bold mt-2">
                ${metrics?.totalSales?.toLocaleString() ?? '0'}
              </p>
            </div>
            <div className="bg-primary-light p-3 rounded-full">
              <ChartBar className="h-6 w-6 text-primary" />
            </div>
          </div>
          <div className="mt-4 text-sm text-gray-600">
            <span className="text-green-600 font-medium">+12% </span>
            from yesterday
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-500">Active Users</p>
              <p className="text-3xl font-bold mt-2">{metrics?.activeUsers ?? 0}</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-full">
              <Users className="h-6 w-6 text-blue-500" />
            </div>
          </div>
          <div className="mt-4 text-sm text-gray-600">
            <span className="text-green-600 font-medium">+5% </span>
            from last hour
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-500">Cart Usage</p>
              <p className="text-3xl font-bold mt-2">{metrics?.cartUsage ?? 0}%</p>
            </div>
            <div className="bg-yellow-100 p-3 rounded-full">
              <Activity className="h-6 w-6 text-yellow-500" />
            </div>
          </div>
          <div className="mt-4 text-sm text-gray-600">
            Current active cart utilization
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-500">Assistance Calls</p>
              <p className="text-3xl font-bold mt-2">{activeRequests}</p>
            </div>
            <div className="bg-red-100 p-3 rounded-full">
              <PieChart className="h-6 w-6 text-red-500" />
            </div>
          </div>
          <div className="mt-4 text-sm text-gray-600">
            Active assistance requests
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default QuickStats;
