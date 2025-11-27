'use client'

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons'

interface CVUploadData {
  month: string
  thisYear: number
  lastYear: number
}

interface CVUploadTrendChartProps {
  data: CVUploadData[]
}

export default function CVUploadTrendChart({ data }: CVUploadTrendChartProps) {
  return (
    <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
      <div className="p-4 border-b border-gray-700">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium text-white">CV Upload Trend</h3>
          <button className="text-sm text-gray-400 hover:text-white">
            <FontAwesomeIcon icon={faEllipsisV} className="h-4 w-4" />
          </button>
        </div>
      </div>
      <div className="p-4">
        <div style={{ height: '300px', width: '100%' }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis
                dataKey="month"
                stroke="#9CA3AF"
                style={{ fontSize: '12px' }}
              />
              <YAxis
                stroke="#9CA3AF"
                style={{ fontSize: '12px' }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#374151',
                  border: '1px solid #4B5563',
                  borderRadius: '8px',
                  color: '#E5E7EB',
                }}
                cursor={{ stroke: '#10b981', strokeWidth: 1 }}
              />
              <Legend
                wrapperStyle={{ color: '#E5E7EB' }}
                iconType="line"
              />
              <Line
                type="monotone"
                dataKey="thisYear"
                stroke="#10b981"
                strokeWidth={2}
                fill="rgba(16, 185, 129, 0.1)"
                name="This Year"
                dot={{ fill: '#10b981', r: 3 }}
              />
              <Line
                type="monotone"
                dataKey="lastYear"
                stroke="#d1d5db"
                strokeWidth={2}
                strokeDasharray="5 5"
                fill="rgba(209, 213, 219, 0.1)"
                name="Last Year"
                dot={{ fill: '#d1d5db', r: 3 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}

