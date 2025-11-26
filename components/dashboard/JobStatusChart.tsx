'use client'

import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts'

interface JobStatusData {
  name: string
  value: number
  color: string
}

interface JobStatusChartProps {
  data: JobStatusData[]
}

const COLORS = ['#10b981', '#3b82f6', '#f59e0b']

export default function JobStatusChart({ data }: JobStatusChartProps) {
  return (
    <div className="bg-gray-800 rounded-lg shadow overflow-hidden">
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-lg font-medium text-white mb-4">Job Status Distribution</h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color || COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: '#1F2937',
              border: '1px solid #374151',
              borderRadius: '8px',
              color: '#F3F4F6',
            }}
          />
          <Legend
            wrapperStyle={{ color: '#9CA3AF' }}
            iconType="circle"
          />
        </PieChart>
      </ResponsiveContainer>
      </div>
    </div>
  )
}

