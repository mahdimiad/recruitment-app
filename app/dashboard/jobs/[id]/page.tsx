'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faBuilding,
  faMapMarkerAlt,
  faClock,
  faDollarSign,
  faEdit,
  faTrashAlt,
  faUsers,
  faFileAlt,
  faChartLine,
  faArrowLeft,
  faSearch,
  faEye,
  faChevronDown,
  faChevronUp,
} from '@fortawesome/free-solid-svg-icons'
import { getJobWithDetails, getJobById } from '@/lib/mock-db'
import Breadcrumbs from '@/components/layout/Breadcrumbs'
import { format } from 'date-fns'
import { Application, Candidate } from '@/types/database'
import clsx from 'clsx'

interface ApplicationWithCandidate extends Application {
  candidate: Candidate | null
}

export default function AdminJobDetailPage() {
  const params = useParams()
  const router = useRouter()
  const jobId = params.id as string
  const [job, setJob] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [sortBy, setSortBy] = useState<'date' | 'score' | 'name'>('date')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 20

  useEffect(() => {
    const loadJob = async () => {
      setLoading(true)
      try {
        const jobData = await getJobWithDetails(jobId)
        if (jobData) {
          setJob(jobData)
        }
      } catch (error) {
        console.error('Failed to load job:', error)
      } finally {
        setLoading(false)
      }
    }

    if (jobId) {
      loadJob()
    }
  }, [jobId])

  const formatDate = (dateString: string) => {
    if (!dateString) return '-'
    try {
      return format(new Date(dateString), 'MMM dd, yyyy')
    } catch {
      return '-'
    }
  }

  const formatSalary = () => {
    if (!job) return 'Not specified'
    if (!job.salary_min && !job.salary_max) return 'Not specified'
    if (job.salary_min && job.salary_max) {
      return `$${job.salary_min.toLocaleString()} - $${job.salary_max.toLocaleString()}`
    }
    if (job.salary_min) return `$${job.salary_min.toLocaleString()}+`
    return `Up to $${job.salary_max.toLocaleString()}`
  }

  const handleDelete = async () => {
    if (confirm('Are you sure you want to delete this job? This action cannot be undone.')) {
      // TODO: Implement delete functionality
      router.push('/dashboard/jobs')
    }
  }

  if (loading) {
    return (
      <>
        <Breadcrumbs
          items={[
            { label: 'Dashboard', href: '/dashboard' },
            { label: 'Jobs', href: '/dashboard/jobs' },
            { label: 'Loading...', href: '#' },
          ]}
        />
        <div className="px-4 sm:px-6 lg:px-8 py-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-center h-64">
              <p className="text-gray-400">Loading job details...</p>
            </div>
          </div>
        </div>
      </>
    )
  }

  if (!job) {
    return (
      <>
        <Breadcrumbs
          items={[
            { label: 'Dashboard', href: '/dashboard' },
            { label: 'Jobs', href: '/dashboard/jobs' },
            { label: 'Not Found', href: '#' },
          ]}
        />
        <div className="px-4 sm:px-6 lg:px-8 py-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-center h-64">
              <p className="text-gray-400">Job not found</p>
            </div>
          </div>
        </div>
      </>
    )
  }

  const applications = job.applications || []
  const requirements = job.requirements || []

  const getStatusColor = (status: Application['status']) => {
    switch (status) {
      case 'hired':
        return 'bg-green-100 text-green-800'
      case 'interviewed':
        return 'bg-blue-100 text-blue-800'
      case 'shortlisted':
        return 'bg-purple-100 text-purple-800'
      case 'applied':
        return 'bg-gray-100 text-gray-800'
      case 'rejected':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getMatchColor = (percentage: number) => {
    if (percentage >= 90) return 'text-green-400'
    if (percentage >= 80) return 'text-yellow-400'
    if (percentage >= 70) return 'text-orange-400'
    return 'text-red-400'
  }

  // Filter and sort applications
  const filteredApplications = applications
    .filter((app: ApplicationWithCandidate) => {
      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase()
        const matchesSearch =
          app.candidate?.full_name.toLowerCase().includes(query) ||
          app.candidate?.email.toLowerCase().includes(query)
        if (!matchesSearch) return false
      }

      // Status filter
      if (statusFilter !== 'all' && app.status !== statusFilter) {
        return false
      }

      return true
    })
    .sort((a: ApplicationWithCandidate, b: ApplicationWithCandidate) => {
      let comparison = 0

      switch (sortBy) {
        case 'name':
          comparison = (a.candidate?.full_name || '').localeCompare(b.candidate?.full_name || '')
          break
        case 'score':
          comparison = (a.match_percentage || 0) - (b.match_percentage || 0)
          break
        case 'date':
        default:
          comparison =
            new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
          break
      }

      return sortOrder === 'asc' ? comparison : -comparison
    })

  // Pagination
  const totalPages = Math.ceil(filteredApplications.length / itemsPerPage)
  const paginatedApplications = filteredApplications.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  const handleSort = (field: 'date' | 'score' | 'name') => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    } else {
      setSortBy(field)
      setSortOrder('desc')
    }
  }

  return (
    <>
      <Breadcrumbs
        items={[
          { label: 'Dashboard', href: '/dashboard' },
          { label: 'Jobs', href: '/dashboard/jobs' },
          { label: job.title, href: '#' },
        ]}
      />
      <div className="px-4 sm:px-6 lg:px-8 py-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-6">
            <Link
              href="/dashboard/jobs"
              className="inline-flex items-center text-sm text-gray-400 hover:text-green-400 mb-4"
            >
              <FontAwesomeIcon icon={faArrowLeft} className="mr-2 h-3 w-3" />
              Back to Jobs
            </Link>
            <div className="flex justify-between items-start">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-2xl font-bold text-white">{job.title}</h1>
                  <span
                    className={`px-3 py-1 text-xs font-semibold rounded-full ${
                      job.status === 'published'
                        ? 'bg-green-100 text-green-800'
                        : job.status === 'draft'
                        ? 'bg-gray-100 text-gray-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {job.status === 'published' ? 'Published' : job.status === 'draft' ? 'Draft' : 'Closed'}
                  </span>
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-400">
                  <div className="flex items-center">
                    <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-2 text-gray-500" />
                    {job.location}
                  </div>
                  <div className="flex items-center">
                    <FontAwesomeIcon icon={faClock} className="mr-2 text-gray-500" />
                    <span className="capitalize">{job.job_type.replace('-', ' ')}</span>
                  </div>
                  <div className="flex items-center">
                    <FontAwesomeIcon icon={faDollarSign} className="mr-2 text-gray-500" />
                    {formatSalary()}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Link
                  href={`/jobs/${job.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 border border-gray-600 rounded-md shadow-sm text-sm font-medium text-white bg-gray-700 hover:bg-gray-600 focus:outline-none"
                >
                  <FontAwesomeIcon icon={faFileAlt} className="mr-2 h-4 w-4" />
                  View Public Page
                </Link>
                <Link
                  href={`/dashboard/jobs/${job.id}/edit`}
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-700 hover:bg-gray-600 focus:outline-none"
                >
                  <FontAwesomeIcon icon={faEdit} className="mr-2 h-4 w-4" />
                  Edit
                </Link>
                <button
                  onClick={handleDelete}
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none"
                >
                  <FontAwesomeIcon icon={faTrashAlt} className="mr-2 h-4 w-4" />
                  Delete
                </button>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                    <FontAwesomeIcon icon={faUsers} className="text-blue-400" />
                  </div>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-400">Applications</p>
                  <p className="text-2xl font-bold text-white">{applications.length}</p>
                </div>
              </div>
            </div>
            <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                    <FontAwesomeIcon icon={faChartLine} className="text-green-400" />
                  </div>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-400">Shortlisted</p>
                  <p className="text-2xl font-bold text-white">
                    {applications.filter((app: any) => app.status === 'shortlisted' || app.status === 'interviewed' || app.status === 'hired').length}
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-yellow-500/20 rounded-lg flex items-center justify-center">
                    <FontAwesomeIcon icon={faClock} className="text-yellow-400" />
                  </div>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-400">Posted</p>
                  <p className="text-sm font-medium text-white">{formatDate(job.created_at)}</p>
                </div>
              </div>
            </div>
            <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
                    <FontAwesomeIcon icon={faFileAlt} className="text-purple-400" />
                  </div>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-400">Requirements</p>
                  <p className="text-2xl font-bold text-white">{requirements.length}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Job Details and Applications */}
            <div className="lg:col-span-2 space-y-6">
              {/* Job Description */}
              <div className="bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-700">
                <h2 className="text-xl font-bold text-white mb-4">Job Description</h2>
                <div className="text-gray-300 whitespace-pre-wrap">{job.description}</div>
              </div>

              {/* Requirements */}
              {requirements.length > 0 && (
                <div className="bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-700">
                  <h2 className="text-xl font-bold text-white mb-4">Requirements</h2>
                  <ul className="space-y-2">
                    {requirements.map((req: any) => (
                      <li key={req.id} className="flex items-start text-gray-300">
                        <span className="text-green-400 mr-2">•</span>
                        <span>
                          {req.skill}
                          {req.required && (
                            <span className="ml-2 text-xs text-red-400">(Required)</span>
                          )}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Applications Section */}
              <div className="bg-gray-800 rounded-lg shadow-lg border border-gray-700">
                <div className="p-6 border-b border-gray-700">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold text-white">Applications ({applications.length})</h2>
                  </div>

                  {/* Search and Filter */}
                  <div className="flex flex-col md:flex-row md:items-center gap-4">
                    <div className="flex-1 relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FontAwesomeIcon icon={faSearch} className="text-gray-500" />
                      </div>
                      <input
                        type="text"
                        placeholder="Search by name or email..."
                        value={searchQuery}
                        onChange={(e) => {
                          setSearchQuery(e.target.value)
                          setCurrentPage(1)
                        }}
                        className="pl-10 pr-3 py-2 w-full border border-gray-700 rounded-md leading-5 bg-gray-700 text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500 sm:text-sm"
                      />
                    </div>
                    <select
                      value={statusFilter}
                      onChange={(e) => {
                        setStatusFilter(e.target.value)
                        setCurrentPage(1)
                      }}
                      className="bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-sm text-white focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
                    >
                      <option value="all">All Status</option>
                      <option value="applied">Applied</option>
                      <option value="shortlisted">Shortlisted</option>
                      <option value="interviewed">Interviewed</option>
                      <option value="rejected">Rejected</option>
                      <option value="hired">Hired</option>
                    </select>
                  </div>
                </div>

                {/* Applications Table */}
                {applications.length === 0 ? (
                  <div className="p-8 text-center">
                    <FontAwesomeIcon icon={faUsers} className="text-4xl text-gray-600 mb-3" />
                    <p className="text-gray-400">No applications yet</p>
                  </div>
                ) : (
                  <>
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-700">
                        <thead className="bg-gray-700">
                          <tr>
                            <th
                              scope="col"
                              className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider cursor-pointer hover:bg-gray-600"
                              onClick={() => handleSort('name')}
                            >
                              <div className="flex items-center">
                                Candidate
                                {sortBy === 'name' && (
                                  <FontAwesomeIcon
                                    icon={sortOrder === 'asc' ? faChevronUp : faChevronDown}
                                    className="ml-2 h-3 w-3"
                                  />
                                )}
                              </div>
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider cursor-pointer hover:bg-gray-600"
                              onClick={() => handleSort('score')}
                            >
                              <div className="flex items-center">
                                Match Score
                                {sortBy === 'score' && (
                                  <FontAwesomeIcon
                                    icon={sortOrder === 'asc' ? faChevronUp : faChevronDown}
                                    className="ml-2 h-3 w-3"
                                  />
                                )}
                              </div>
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider"
                            >
                              Status
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider cursor-pointer hover:bg-gray-600"
                              onClick={() => handleSort('date')}
                            >
                              <div className="flex items-center">
                                Applied Date
                                {sortBy === 'date' && (
                                  <FontAwesomeIcon
                                    icon={sortOrder === 'asc' ? faChevronUp : faChevronDown}
                                    className="ml-2 h-3 w-3"
                                  />
                                )}
                              </div>
                            </th>
                            <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">
                              Actions
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-gray-800 divide-y divide-gray-700">
                          {paginatedApplications.length === 0 ? (
                            <tr>
                              <td colSpan={5} className="px-6 py-8 text-center text-gray-400">
                                {searchQuery || statusFilter !== 'all'
                                  ? 'No applications match your filters'
                                  : 'No applications found'}
                              </td>
                            </tr>
                          ) : (
                            paginatedApplications.map((application: ApplicationWithCandidate) => (
                              <tr key={application.id} className="hover:bg-gray-700">
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="flex items-center">
                                    <div className="h-10 w-10 rounded-full bg-gray-600 flex items-center justify-center mr-3">
                                      <span className="text-white text-sm font-medium">
                                        {application.candidate?.full_name.charAt(0).toUpperCase() || '?'}
                                      </span>
                                    </div>
                                    <div>
                                      <div className="text-sm font-medium text-white">
                                        {application.candidate?.full_name || 'Unknown Candidate'}
                                      </div>
                                      <div className="text-sm text-gray-400">
                                        {application.candidate?.email || 'No email'}
                                      </div>
                                    </div>
                                  </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className={clsx('text-sm font-medium', getMatchColor(application.match_percentage || 0))}>
                                    {application.match_percentage?.toFixed(0) || 0}%
                                  </div>
                                  <div className="text-xs text-gray-400">Score: {application.score || 0}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <span
                                    className={clsx(
                                      'px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full',
                                      getStatusColor(application.status)
                                    )}
                                  >
                                    {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                                  </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                                  {formatDate(application.created_at)}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                  <Link
                                    href={`/dashboard/candidates/${application.candidate_id}`}
                                    className="text-green-400 hover:text-green-300 inline-flex items-center"
                                    title="View candidate details"
                                  >
                                    <FontAwesomeIcon icon={faEye} className="h-4 w-4 mr-2" />
                                    View
                                  </Link>
                                </td>
                              </tr>
                            ))
                          )}
                        </tbody>
                      </table>
                    </div>

                    {/* Pagination */}
                    {totalPages > 1 && (
                      <div className="bg-gray-900 px-6 py-4 border-t border-gray-700 flex items-center justify-between">
                        <div className="text-sm text-gray-400">
                          Showing <span className="font-medium">{(currentPage - 1) * itemsPerPage + 1}</span> to{' '}
                          <span className="font-medium">
                            {Math.min(currentPage * itemsPerPage, filteredApplications.length)}
                          </span>{' '}
                          of <span className="font-medium">{filteredApplications.length}</span> applications
                        </div>
                        <div>
                          <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                            <button
                              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                              disabled={currentPage === 1}
                              className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-700 bg-gray-800 text-sm font-medium text-gray-400 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              <FontAwesomeIcon icon={faChevronDown} className="h-5 w-5 rotate-90" />
                            </button>
                            {Array.from({ length: totalPages }, (_, i) => i + 1)
                              .filter((page) => {
                                return (
                                  page === 1 ||
                                  page === totalPages ||
                                  (page >= currentPage - 1 && page <= currentPage + 1)
                                )
                              })
                              .map((page, index, array) => {
                                const prevPage = array[index - 1]
                                const showEllipsisBefore = prevPage && page - prevPage > 1

                                return (
                                  <span key={page}>
                                    {showEllipsisBefore && (
                                      <span className="relative inline-flex items-center px-4 py-2 border border-gray-700 bg-gray-800 text-sm font-medium text-gray-400">
                                        ...
                                      </span>
                                    )}
                                    <button
                                      onClick={() => setCurrentPage(page)}
                                      className={clsx(
                                        'relative inline-flex items-center px-4 py-2 border text-sm font-medium',
                                        currentPage === page
                                          ? 'z-10 bg-gradient-to-r from-green-400 to-emerald-500 border-green-500 text-gray-900'
                                          : 'bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-700'
                                      )}
                                    >
                                      {page}
                                    </button>
                                  </span>
                                )
                              })}
                            <button
                              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                              disabled={currentPage === totalPages}
                              className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-700 bg-gray-800 text-sm font-medium text-gray-400 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              <FontAwesomeIcon icon={faChevronDown} className="h-5 w-5 -rotate-90" />
                            </button>
                          </nav>
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>

            {/* Right Column - Job Info Summary */}
            <div className="lg:col-span-1">
              <div className="bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-700 sticky top-6">
                <h2 className="text-xl font-bold text-white mb-4">Job Information</h2>
                <div className="space-y-4">
                  <div>
                    <div className="text-sm font-medium text-gray-400 mb-1">Location</div>
                    <div className="text-white flex items-center">
                      <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-2 text-gray-500" />
                      {job.location}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-400 mb-1">Job Type</div>
                    <div className="text-white flex items-center">
                      <FontAwesomeIcon icon={faClock} className="mr-2 text-gray-500" />
                      <span className="capitalize">{job.job_type.replace('-', ' ')}</span>
                    </div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-400 mb-1">Salary</div>
                    <div className="text-white flex items-center">
                      <FontAwesomeIcon icon={faDollarSign} className="mr-2 text-gray-500" />
                      {formatSalary()}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-400 mb-1">Posted</div>
                    <div className="text-white">{formatDate(job.created_at)}</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-400 mb-1">Status</div>
                    <span
                      className={`px-2 py-1 text-xs font-semibold rounded ${
                        job.status === 'published'
                          ? 'bg-green-100 text-green-800'
                          : job.status === 'draft'
                          ? 'bg-gray-100 text-gray-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {job.status === 'published' ? 'Published' : job.status === 'draft' ? 'Draft' : 'Closed'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

