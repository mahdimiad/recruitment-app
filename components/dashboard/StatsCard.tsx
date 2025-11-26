'use client'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import {
  faArrowUp,
  faArrowDown,
  faEquals,
} from '@fortawesome/free-solid-svg-icons'

interface StatsCardProps {
  title: string
  value: string | number
  subtitle?: string
  icon?: IconDefinition
  iconBgColor?: 'indigo' | 'blue' | 'green' | 'purple' | 'yellow' | 'red'
  iconTextColor?: 'indigo' | 'blue' | 'green' | 'purple' | 'yellow' | 'red'
  gradientColor?: 'indigo' | 'blue' | 'green' | 'purple' | 'yellow' | 'red'
  trend?: {
    text: string
    isPositive?: boolean
    isNeutral?: boolean
  }
}

const iconBgColors = {
  indigo: 'bg-indigo-100',
  blue: 'bg-blue-100',
  green: 'bg-green-100',
  purple: 'bg-purple-100',
  yellow: 'bg-yellow-100',
  red: 'bg-red-100',
}

const iconTextColors = {
  indigo: 'text-indigo-600',
  blue: 'text-blue-600',
  green: 'text-green-600',
  purple: 'text-purple-600',
  yellow: 'text-yellow-600',
  red: 'text-red-600',
}

const gradientColors = {
  indigo: 'from-indigo-500 to-indigo-600',
  blue: 'from-blue-500 to-blue-600',
  green: 'from-green-500 to-green-600',
  purple: 'from-purple-500 to-purple-600',
  yellow: 'from-yellow-500 to-yellow-600',
  red: 'from-red-500 to-red-600',
}

export default function StatsCard({
  title,
  value,
  subtitle,
  icon,
  iconBgColor = 'indigo',
  iconTextColor = 'indigo',
  gradientColor = 'indigo',
  trend,
}: StatsCardProps) {
  return (
    <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
      <div className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-400 mb-1">{title}</p>
            <h3 className="text-2xl font-bold text-white">
              {value}
              {subtitle && <span className="text-lg font-medium ml-1">{subtitle}</span>}
            </h3>
          </div>
          {icon && (
            <div className={`w-10 h-10 ${iconBgColors[iconBgColor]} rounded-full flex items-center justify-center`}>
              <FontAwesomeIcon icon={icon} className={iconTextColors[iconTextColor]} />
            </div>
          )}
        </div>
        {trend && (
          <div className={`flex items-center mt-3 text-xs ${
            trend.isNeutral ? 'text-yellow-400' : trend.isPositive ? 'text-green-400' : 'text-red-400'
          }`}>
            <FontAwesomeIcon
              icon={trend.isNeutral ? faEquals : trend.isPositive ? faArrowUp : faArrowDown}
              className="mr-1"
            />
            <span>{trend.text}</span>
          </div>
        )}
      </div>
      <div className={`bg-gradient-to-r ${gradientColors[gradientColor]} h-1`}></div>
    </div>
  )
}

