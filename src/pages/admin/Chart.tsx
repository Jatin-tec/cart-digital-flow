
"use client"

import * as React from "react"
import { Area, AreaChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer, Legend } from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { salesData } from "@/services/dashboardService"

export default function Chart() {
  const [timeRange, setTimeRange] = React.useState("30d")
  const [data, setData] = React.useState(salesData)

  // Filter data based on selected time range
  const filteredData = React.useMemo(() => {
    const now = new Date()
    const daysToShow = parseInt(timeRange)
    const threshold = new Date(now.setDate(now.getDate() - daysToShow))

    return data
      .filter(item => new Date(item.date) >= threshold)
      .reduce((acc: any[], curr) => {
        const existingData = acc.find(item => item.date === curr.date)
        if (existingData) {
          existingData[curr.category] = curr.amount
        } else {
          acc.push({
            date: curr.date,
            [curr.category]: curr.amount,
          })
        }
        return acc
      }, [])
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
  }, [data, timeRange])

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div>
          <CardTitle>Sales Overview</CardTitle>
          <CardDescription>Daily sales by category</CardDescription>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-[120px]">
            <SelectValue placeholder="Select range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7d">7 days</SelectItem>
            <SelectItem value="30d">30 days</SelectItem>
            <SelectItem value="90d">90 days</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        <div className="h-[350px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={filteredData}>
              <defs>
                <linearGradient id="Groceries" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#8884d8" stopOpacity={0.1}/>
                </linearGradient>
                <linearGradient id="Electronics" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#82ca9d" stopOpacity={0.1}/>
                </linearGradient>
                <linearGradient id="Clothing" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ffc658" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#ffc658" stopOpacity={0.1}/>
                </linearGradient>
                <linearGradient id="Home" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ff7300" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#ff7300" stopOpacity={0.1}/>
                </linearGradient>
              </defs>
              <XAxis 
                dataKey="date" 
                tickFormatter={(date) => new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
              />
              <YAxis />
              <CartesianGrid strokeDasharray="3 3" />
              <Area type="monotone" dataKey="Groceries" stroke="#8884d8" fillOpacity={1} fill="url(#Groceries)" />
              <Area type="monotone" dataKey="Electronics" stroke="#82ca9d" fillOpacity={1} fill="url(#Electronics)" />
              <Area type="monotone" dataKey="Clothing" stroke="#ffc658" fillOpacity={1} fill="url(#Clothing)" />
              <Area type="monotone" dataKey="Home" stroke="#ff7300" fillOpacity={1} fill="url(#Home)" />
              <Legend />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
