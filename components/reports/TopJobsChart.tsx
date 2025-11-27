'use client'

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons'

interface TopJobData {
  jobTitle: string
  applicants: number
}

interface TopJobsChartProps {
  data: TopJobData[]
}

export default function TopJobsChart({ data }: TopJobsChartProps) {
  return (
    <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
      <div className="p-4 border-b border-gray-700">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium text-white">Top 5 Job Positions</h3>
          <button className="text-sm text-gray-400 hover:text-white">
            <FontAwesomeIcon icon={faEllipsisV} className="h-4 w-4" />
          </button>
        </div>
      </div>
      <div className="p-4">
        <div style={{ height: '300px', width: '100%' }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis
                dataKey="jobTitle"
                stroke="#9CA3AF"
                style={{ fontSize: '12px' }}
                angle={-45}
                textAnchor="end"
                height={80}
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
                cursor={{ fill: 'rgba(79, 70, 229, 0.1)' }}
              />
              <Bar dataKey="applicants" fill="#4f46e5" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}

