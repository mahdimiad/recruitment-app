'use client'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'

export type Period = 'this-week' | 'last-week' | 'this-month' | 'last-month'

interface DashboardPeriodSelectorProps {
  selectedPeriod: Period
  onPeriodChange: (period: Period) => void
}

const periodOptions: { value: Period; label: string }[] = [
  { value: 'this-week', label: 'This Week' },
  { value: 'last-week', label: 'Last Week' },
  { value: 'this-month', label: 'This Month' },
  { value: 'last-month', label: 'Last Month' },
]

export default function DashboardPeriodSelector({
  selectedPeriod,
  onPeriodChange,
}: DashboardPeriodSelectorProps) {
  return (
    <div className="relative">
      <select
        value={selectedPeriod}
        onChange={(e) => onPeriodChange(e.target.value as Period)}
        className="appearance-none bg-gray-700 border border-gray-600 rounded-md py-2 pl-4 pr-10 text-white text-sm font-medium focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500 cursor-pointer hover:bg-gray-600 transition-colors"
      >
        {periodOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
        <FontAwesomeIcon icon={faChevronDown} className="h-4 w-4 text-gray-400" />
      </div>
    </div>
  )
}

