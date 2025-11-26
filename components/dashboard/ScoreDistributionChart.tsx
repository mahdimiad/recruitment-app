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

interface ScoreDistributionData {
  range: string
  count: number
}

interface ScoreDistributionChartProps {
  data: ScoreDistributionData[]
}

const getBarColor = (range: string): string => {
  const rangeNum = parseInt(range.split('-')[0])
  if (rangeNum < 20) return '#ef4444' // red-500
  if (rangeNum < 40) return '#f97316' // orange-500
  if (rangeNum < 60) return '#eab308' // yellow-500
  if (rangeNum < 70) return '#eab308' // yellow-500
  if (rangeNum < 80) return '#10b981' // green-500
  if (rangeNum < 90) return '#10b981' // green-500
  return '#10b981' // green-500
}

const getBarOpacity = (range: string): number => {
  const rangeNum = parseInt(range.split('-')[0])
  if (rangeNum < 20) return 0.7
  if (rangeNum < 40) return 0.7
  if (rangeNum < 60) return 0.7
  if (rangeNum < 70) return 0.7
  if (rangeNum < 80) return 0.5
  if (rangeNum < 90) return 0.7
  return 0.9
}

export default function ScoreDistributionChart({ data }: ScoreDistributionChartProps) {
  const chartData = data.map(item => ({
    ...item,
    fill: getBarColor(item.range),
    fillOpacity: getBarOpacity(item.range),
  }))

  return (
    <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
      <div className="p-4 border-b border-gray-700">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium text-white">Score Distribution</h3>
          <button className="text-sm text-gray-400 hover:text-white">
            <FontAwesomeIcon icon={faEllipsisV} className="h-4 w-4" />
          </button>
        </div>
      </div>
      <div className="p-4">
        <div style={{ height: '300px', width: '100%' }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis
                dataKey="range"
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
                cursor={{ fill: 'rgba(16, 185, 129, 0.1)' }}
              />
              <Bar dataKey="count" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}

