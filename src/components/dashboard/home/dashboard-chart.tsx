"use client"

import { useTheme } from "next-themes"
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { Card } from "@/components/ui/card"

interface CategoryScore {
  categoryId: number
  categoryName: string
  accuracy: number
}

interface DashboardChartProps {
  data: CategoryScore[]
}

export function DashboardChart({ data }: DashboardChartProps) {
  const { theme } = useTheme()
  const isDark = theme === "dark"

  // Format data for the chart
  const chartData = data.map((item) => ({
    name: item.categoryName,
    value: item.accuracy,
  }))

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 30 }}>
        <CartesianGrid
          strokeDasharray="3 3"
          vertical={false}
          stroke={isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)"}
        />
        <XAxis
          dataKey="name"
          tick={{ fill: isDark ? "#e2e8f0" : "#64748b" }}
          tickLine={false}
          axisLine={false}
          angle={-45}
          textAnchor="end"
          height={70}
        />
        <YAxis
          tickFormatter={(value) => `${value}%`}
          tick={{ fill: isDark ? "#e2e8f0" : "#64748b" }}
          tickLine={false}
          axisLine={false}
          domain={[0, 100]}
        />
        <Tooltip
          content={({ active, payload }) => {
            if (active && payload && payload.length) {
              return (
                <Card className="p-2 shadow-lg border">
                  <p className="font-medium">{payload[0].payload.name}</p>
                  <p className="text-sm text-muted-foreground">
                    Accuracy: <span className="font-medium">{payload[0].value}%</span>
                  </p>
                </Card>
              )
            }
            return null
          }}
        />
        <Bar dataKey="value" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} barSize={30} />
      </BarChart>
    </ResponsiveContainer>
  )
}
