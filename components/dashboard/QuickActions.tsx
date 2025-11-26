'use client'

import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faPlus,
  faFileUpload,
  faUsers,
  faChartBar,
} from '@fortawesome/free-solid-svg-icons'

const actions = [
  {
    name: 'Post New Job',
    description: 'Create a new job posting',
    href: '/dashboard/jobs/new',
    icon: faPlus,
  },
  {
    name: 'Upload CV',
    description: 'Add a new candidate',
    href: '/dashboard/candidates/upload',
    icon: faFileUpload,
  },
  {
    name: 'View Candidates',
    description: 'Browse all candidates',
    href: '/dashboard/candidates',
    icon: faUsers,
  },
  {
    name: 'View Reports',
    description: 'Check analytics',
    href: '/dashboard/reports',
    icon: faChartBar,
  },
]

export default function QuickActions() {
  return (
    <div className="bg-gray-800 rounded-lg shadow overflow-hidden">
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-lg font-medium text-white mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {actions.map((action) => (
            <Link
              key={action.name}
              href={action.href}
              className="flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-gray-900 bg-gradient-to-r from-green-400 to-emerald-500 hover:from-green-500 hover:to-emerald-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              <FontAwesomeIcon icon={action.icon} className="mr-2 h-4 w-4" />
              {action.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

