'use client'

import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBriefcase, faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { formatDistanceToNow } from 'date-fns'

interface Job {
  id: string
  title: string
  status: 'draft' | 'published' | 'closed'
  location: string
  created_at: string
  applicationCount: number
}

interface RecentJobsProps {
  jobs: Job[]
}

const statusColors = {
  draft: 'bg-gray-500',
  published: 'bg-green-500',
  closed: 'bg-red-500',
}

export default function RecentJobs({ jobs }: RecentJobsProps) {
  return (
    <div className="bg-gray-800 rounded-lg shadow overflow-hidden">
      <div className="px-4 py-5 sm:p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-white">Recent Jobs</h3>
          <Link
            href="/dashboard/jobs"
            className="text-sm text-green-400 hover:text-green-300 flex items-center"
          >
            View all
            <FontAwesomeIcon icon={faArrowRight} className="ml-1 h-3 w-3" />
          </Link>
        </div>
        <div className="space-y-3">
          {jobs.length === 0 ? (
            <p className="text-gray-400 text-sm">No jobs yet</p>
          ) : (
            jobs.map((job) => (
              <Link
                key={job.id}
                href={`/dashboard/jobs/${job.id}`}
                className="block p-4 rounded-lg border border-gray-700 hover:border-green-500/50 hover:bg-gray-700 transition-colors"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start space-x-3 flex-1 min-w-0">
                    <div className="flex-shrink-0 mt-0.5">
                      <FontAwesomeIcon icon={faBriefcase} className="h-4 w-4 text-gray-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center flex-wrap gap-2 mb-1">
                        <h4 className="text-white font-medium truncate">{job.title}</h4>
                        <span
                          className={`px-2 py-0.5 rounded text-xs text-white whitespace-nowrap ${statusColors[job.status]}`}
                        >
                          {job.status}
                        </span>
                      </div>
                      <p className="text-gray-400 text-sm truncate">{job.location}</p>
                      <div className="flex items-center flex-wrap gap-x-4 gap-y-1 mt-2 text-xs text-gray-500">
                        <span className="whitespace-nowrap">{job.applicationCount} {job.applicationCount === 1 ? 'application' : 'applications'}</span>
                        <span className="whitespace-nowrap">{formatDistanceToNow(new Date(job.created_at), { addSuffix: true })}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

