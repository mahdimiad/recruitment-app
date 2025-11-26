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

interface HiringFunnelData {
  stage: string
  count: number
}

interface HiringFunnelChartProps {
  data: HiringFunnelData[]
}

export default function HiringFunnelChart({ data }: HiringFunnelChartProps) {
  const chartData = data.map((item, index) => ({
    ...item,
    fill: `rgba(16, 185, 129, ${0.4 + (index * 0.1)})`, // Increasing opacity
    fillOpacity: 0.4 + (index * 0.1),
  }))

  return (
    <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
      <div className="p-4 border-b border-gray-700">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium text-white">Hiring Funnel</h3>
          <button className="text-sm text-gray-400 hover:text-white">
            <FontAwesomeIcon icon={faEllipsisV} className="h-4 w-4" />
          </button>
        </div>
      </div>
      <div className="p-4">
        <div style={{ height: '300px', width: '100%' }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              layout="vertical"
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis
                type="number"
                stroke="#9CA3AF"
                style={{ fontSize: '12px' }}
              />
              <YAxis
                type="category"
                dataKey="stage"
                stroke="#9CA3AF"
                style={{ fontSize: '12px' }}
                width={100}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#374151',
                  border: '1px solid #4B5563',
                  borderRadius: '8px',
                  color: '#E5E7EB',
                }}
                cursor={{ fill: 'rgba(16, 185, 129, 0.1)' }}
              />
              <Bar dataKey="count" radius={[0, 4, 4, 0]} stroke="#10b981" strokeWidth={1} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}

