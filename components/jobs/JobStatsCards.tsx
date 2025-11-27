'use client'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faBriefcase,
  faEye,
  faPauseCircle,
  faCalendarTimes,
} from '@fortawesome/free-solid-svg-icons'

interface JobStats {
  total: number
  active: number
  paused: number
  expired: number
}

interface JobStatsCardsProps {
  stats: JobStats
}

export default function JobStatsCards({ stats }: JobStatsCardsProps) {
  const statCards = [
    {
      label: 'Total Jobs',
      value: stats.total,
      icon: faBriefcase,
      bgColor: 'bg-green-400',
    },
    {
      label: 'Active Jobs',
      value: stats.active,
      icon: faEye,
      bgColor: 'bg-blue-400',
    },
    {
      label: 'Paused Jobs',
      value: stats.paused,
      icon: faPauseCircle,
      bgColor: 'bg-yellow-400',
    },
    {
      label: 'Expired Jobs',
      value: stats.expired,
      icon: faCalendarTimes,
      bgColor: 'bg-red-400',
    },
  ]

  return (
    <div className="bg-gray-800 rounded-lg shadow overflow-hidden">
      <div className="px-4 py-5 sm:p-6">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-4">
          {statCards.map((card, index) => (
            <div key={index} className="bg-gray-700 overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <div className="flex items-center">
                  <div className={`flex-shrink-0 ${card.bgColor} rounded-md p-3`}>
                    <FontAwesomeIcon icon={card.icon} className="text-gray-900 text-xl" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-400 truncate">{card.label}</dt>
                      <dd>
                        <div className="text-lg font-medium text-white">{card.value}</div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

