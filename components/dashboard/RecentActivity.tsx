'use client'

import { useState } from 'react'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faBriefcase,
  faUserPlus,
  faFileAlt,
  faComment,
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons'
import { formatDistanceToNow } from 'date-fns'

interface Activity {
  id: string
  type: 'job_created' | 'candidate_added' | 'application_received' | 'status_changed' | 'note_added'
  title: string
  description: string
  timestamp: string
  link?: string
}

interface RecentActivityProps {
  activities: Activity[]
}

const activityIcons = {
  job_created: faBriefcase,
  candidate_added: faUserPlus,
  application_received: faFileAlt,
  status_changed: faFileAlt,
  note_added: faComment,
}

const activityColors = {
  job_created: 'text-blue-400 bg-blue-400/10',
  candidate_added: 'text-green-400 bg-green-400/10',
  application_received: 'text-primary-400 bg-primary-400/10',
  status_changed: 'text-yellow-400 bg-yellow-400/10',
  note_added: 'text-purple-400 bg-purple-400/10',
}

const ITEMS_PER_PAGE = 10

export default function RecentActivity({ activities }: RecentActivityProps) {
  const [currentPage, setCurrentPage] = useState(1)
  
  const totalPages = Math.ceil(activities.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const endIndex = startIndex + ITEMS_PER_PAGE
  const currentActivities = activities.slice(startIndex, endIndex)

  const goToPage = (page: number) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)))
  }

  return (
    <div className="bg-gray-800 rounded-lg shadow overflow-hidden">
      <div className="px-4 py-4 sm:p-4">
        <h3 className="text-lg font-medium text-white mb-4">Recent Activity</h3>
        <div className="space-y-4">
          {currentActivities.length === 0 ? (
            <p className="text-gray-400 text-sm">No recent activity</p>
          ) : (
            currentActivities.map((activity) => {
              const Icon = activityIcons[activity.type]
              const colorClass = activityColors[activity.type]
              
              return (
                <div
                  key={activity.id}
                  className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-700 transition-colors"
                >
                  <div className={`flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center ${colorClass}`}>
                    <FontAwesomeIcon icon={Icon} className="h-5 w-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    {activity.link ? (
                      <Link
                        href={activity.link}
                        className="text-white font-medium hover:text-green-400 transition-colors"
                      >
                        {activity.title}
                      </Link>
                    ) : (
                      <p className="text-white font-medium">{activity.title}</p>
                    )}
                    <p className="text-gray-400 text-sm mt-1">{activity.description}</p>
                    <p className="text-gray-500 text-xs mt-1">
                      {formatDistanceToNow(new Date(activity.timestamp), { addSuffix: true })}
                    </p>
                  </div>
                </div>
              )
            })
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-6 flex items-center justify-between border-t border-gray-700 pt-4">
            <div className="flex-1 flex justify-between sm:hidden">
              <button
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="relative inline-flex items-center px-4 py-2 border border-gray-700 text-sm font-medium rounded-md text-gray-300 bg-gray-800 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              <button
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-700 text-sm font-medium rounded-md text-gray-300 bg-gray-800 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-400">
                  Showing <span className="font-medium">{startIndex + 1}</span> to{' '}
                  <span className="font-medium">{Math.min(endIndex, activities.length)}</span> of{' '}
                  <span className="font-medium">{activities.length}</span> activities
                </p>
              </div>
              <div>
                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                  <button
                    onClick={() => goToPage(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-700 bg-gray-800 text-sm font-medium text-gray-400 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span className="sr-only">Previous</span>
                    <FontAwesomeIcon icon={faChevronLeft} className="h-5 w-5" />
                  </button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                    if (
                      page === 1 ||
                      page === totalPages ||
                      (page >= currentPage - 1 && page <= currentPage + 1)
                    ) {
                      return (
                        <button
                          key={page}
                          onClick={() => goToPage(page)}
                          className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                            currentPage === page
                              ? 'z-10 bg-gradient-to-r from-green-400 to-emerald-500 border-green-500 text-gray-900'
                              : 'bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-700'
                          }`}
                        >
                          {page}
                        </button>
                      )
                    } else if (page === currentPage - 2 || page === currentPage + 2) {
                      return (
                        <span
                          key={page}
                          className="relative inline-flex items-center px-4 py-2 border border-gray-700 bg-gray-800 text-sm font-medium text-gray-400"
                        >
                          ...
                        </span>
                      )
                    }
                    return null
                  })}
                  <button
                    onClick={() => goToPage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-700 bg-gray-800 text-sm font-medium text-gray-400 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span className="sr-only">Next</span>
                    <FontAwesomeIcon icon={faChevronRight} className="h-5 w-5" />
                  </button>
                </nav>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

