'use client'

import { useState } from 'react'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faEye,
  faEdit,
  faTrashAlt,
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons'
import { format } from 'date-fns'

interface Job {
  id: string
  title: string
  location: string
  status: 'draft' | 'published' | 'closed'
  created_at: string
  updated_at: string
  applicationCount: number
  department?: string
}

interface JobsTableProps {
  jobs: Job[]
  currentPage: number
  totalPages: number
  totalJobs: number
  onPageChange: (page: number) => void
  onSelectAll: (selected: boolean) => void
  selectedJobs: Set<string>
  onSelectJob: (jobId: string, selected: boolean) => void
}

const statusColors = {
  published: 'bg-green-100 text-green-800',
  draft: 'bg-gray-100 text-gray-800',
  closed: 'bg-red-100 text-red-800',
  paused: 'bg-yellow-100 text-yellow-800',
}

const statusLabels = {
  published: 'Active',
  draft: 'Draft',
  closed: 'Expired',
  paused: 'Paused',
}

export default function JobsTable({
  jobs,
  currentPage,
  totalPages,
  totalJobs,
  onPageChange,
  onSelectAll,
  selectedJobs,
  onSelectJob,
}: JobsTableProps) {
  const allSelected = jobs.length > 0 && jobs.every(job => selectedJobs.has(job.id))
  const someSelected = selectedJobs.size > 0 && !allSelected

  const formatDate = (dateString: string) => {
    if (!dateString || dateString === '-') return '-'
    try {
      return format(new Date(dateString), 'MMM dd, yyyy')
    } catch {
      return '-'
    }
  }

  // Calculate expiry date (60 days from created date for published jobs)
  const getExpiryDate = (job: Job) => {
    if (job.status === 'draft' || job.status === 'closed') return '-'
    try {
      const created = new Date(job.created_at)
      const expiry = new Date(created)
      expiry.setDate(expiry.getDate() + 60)
      return format(expiry, 'MMM dd, yyyy')
    } catch {
      return '-'
    }
  }

  const getDepartment = (job: Job) => {
    // Extract department from title or use default
    if (job.title.toLowerCase().includes('engineer') || job.title.toLowerCase().includes('developer')) {
      return 'Engineering'
    }
    if (job.title.toLowerCase().includes('designer') || job.title.toLowerCase().includes('ux')) {
      return 'Design'
    }
    if (job.title.toLowerCase().includes('product')) {
      return 'Product'
    }
    if (job.title.toLowerCase().includes('marketing')) {
      return 'Marketing'
    }
    return 'General'
  }

  return (
    <div className="mt-6 bg-gray-800 shadow overflow-hidden sm:rounded-lg">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-700">
          <thead className="bg-gray-700">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                <div className="flex items-center">
                  <input
                    id="select-all"
                    type="checkbox"
                    checked={allSelected}
                    ref={(input) => {
                      if (input) input.indeterminate = someSelected
                    }}
                    onChange={(e) => onSelectAll(e.target.checked)}
                    className="h-4 w-4 text-green-400 border-gray-600 rounded bg-gray-800 focus:ring-green-500"
                  />
                  <span className="ml-3">Job Title</span>
                </div>
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Department
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Location
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Applications
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Status
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Post Date
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Expires
              </th>
              <th scope="col" className="relative px-6 py-3">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody className="bg-gray-800 divide-y divide-gray-700">
            {jobs.length === 0 ? (
              <tr>
                <td colSpan={8} className="px-6 py-4 text-center text-gray-400">
                  No jobs found
                </td>
              </tr>
            ) : (
              jobs.map((job) => (
                <tr key={job.id} className="hover:bg-gray-700">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        checked={selectedJobs.has(job.id)}
                        onChange={(e) => onSelectJob(job.id, e.target.checked)}
                        className="h-4 w-4 text-green-400 border-gray-600 rounded bg-gray-800 focus:ring-green-500"
                      />
                      <div className="ml-3">
                        <div className="text-sm font-medium text-white">{job.title}</div>
                        <div className="text-sm text-gray-400">ID: {job.id.toUpperCase()}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-300">{getDepartment(job)}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-300">{job.location}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    <Link
                      href={`/dashboard/jobs/${job.id}/applications`}
                      className="text-green-400 hover:text-green-300"
                    >
                      {job.applicationCount} {job.applicationCount === 1 ? 'applicant' : 'applicants'}
                    </Link>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        statusColors[job.status] || statusColors.draft
                      }`}
                    >
                      {statusLabels[job.status] || 'Draft'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    {formatDate(job.created_at)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    {getExpiryDate(job)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-2">
                      <Link
                        href={`/dashboard/jobs/${job.id}`}
                        className="text-gray-400 hover:text-white focus:outline-none focus:text-white"
                        title="View job details"
                      >
                        <FontAwesomeIcon icon={faEye} className="h-4 w-4" />
                      </Link>
                      <Link
                        href={`/dashboard/jobs/${job.id}/edit`}
                        className="text-gray-400 hover:text-white focus:outline-none focus:text-white"
                        title="Edit"
                      >
                        <FontAwesomeIcon icon={faEdit} className="h-4 w-4" />
                      </Link>
                      <button
                        className="text-gray-400 hover:text-red-400 focus:outline-none focus:text-red-400"
                        title="Delete"
                        onClick={() => {
                          if (confirm('Are you sure you want to delete this job?')) {
                            // Handle delete
                          }
                        }}
                      >
                        <FontAwesomeIcon icon={faTrashAlt} className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination and Bulk Actions */}
      <div className="bg-gray-800 px-4 py-3 flex items-center justify-between border-t border-gray-700 sm:px-6">
        <div className="flex-1 flex justify-between sm:hidden">
          <button
            onClick={() => onPageChange(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="relative inline-flex items-center px-4 py-2 border border-gray-600 text-sm font-medium rounded-md text-gray-300 bg-gray-700 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          <button
            onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-600 text-sm font-medium rounded-md text-gray-300 bg-gray-700 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
        <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
          <div>
            <div className="text-sm text-gray-400">
              Showing <span className="font-medium text-gray-300">{(currentPage - 1) * 10 + 1}</span> to{' '}
              <span className="font-medium text-gray-300">{Math.min(currentPage * 10, totalJobs)}</span> of{' '}
              <span className="font-medium text-gray-300">{totalJobs}</span> results
            </div>
          </div>
          <div className="flex items-center">
            <div className="mr-4">
              <select
                id="bulk-actions"
                className="bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 pl-3 pr-10 text-xs text-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500"
              >
                <option value="">Bulk Actions</option>
                <option value="activate">Activate Selected</option>
                <option value="pause">Pause Selected</option>
                <option value="extend">Extend Expiry</option>
                <option value="delete">Delete Selected</option>
              </select>
              <button
                type="button"
                className="ml-2 inline-flex items-center px-3 py-2 border border-transparent text-xs font-medium rounded-md text-gray-900 bg-green-400 hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                Apply
              </button>
            </div>
            <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
              <button
                onClick={() => onPageChange(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-600 bg-gray-700 text-sm font-medium text-gray-300 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="sr-only">Previous</span>
                <FontAwesomeIcon icon={faChevronLeft} className="h-4 w-4" />
              </button>
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let pageNum
                if (totalPages <= 5) {
                  pageNum = i + 1
                } else if (currentPage <= 3) {
                  pageNum = i + 1
                } else if (currentPage >= totalPages - 2) {
                  pageNum = totalPages - 4 + i
                } else {
                  pageNum = currentPage - 2 + i
                }
                return (
                  <button
                    key={pageNum}
                    onClick={() => onPageChange(pageNum)}
                    className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                      currentPage === pageNum
                        ? 'z-10 bg-gradient-to-r from-green-400 to-emerald-500 border-green-400 text-gray-900'
                        : 'bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600'
                    }`}
                  >
                    {pageNum}
                  </button>
                )
              })}
              {totalPages > 5 && currentPage < totalPages - 2 && (
                <span className="relative inline-flex items-center px-4 py-2 border border-gray-600 bg-gray-700 text-sm font-medium text-gray-300">
                  ...
                </span>
              )}
              {totalPages > 5 && (
                <>
                  <button
                    onClick={() => onPageChange(totalPages - 1)}
                    className="bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                  >
                    {totalPages - 1}
                  </button>
                  <button
                    onClick={() => onPageChange(totalPages)}
                    className="bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                  >
                    {totalPages}
                  </button>
                </>
              )}
              <button
                onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-600 bg-gray-700 text-sm font-medium text-gray-300 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="sr-only">Next</span>
                <FontAwesomeIcon icon={faChevronRight} className="h-4 w-4" />
              </button>
            </nav>
          </div>
        </div>
      </div>
    </div>
  )
}

