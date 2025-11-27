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
} from '@fortawesome/free-solid-svg-icons'
import { getJobWithDetails, getJobById } from '@/lib/mock-db'
import Breadcrumbs from '@/components/layout/Breadcrumbs'
import { format } from 'date-fns'

export default function AdminJobDetailPage() {
  const params = useParams()
  const router = useRouter()
  const jobId = params.id as string
  const [job, setJob] = useState<any>(null)
  const [loading, setLoading] = useState(true)

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
            {/* Left Column - Job Details */}
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
            </div>

            {/* Right Column - Applications */}
            <div className="lg:col-span-1">
              <div className="bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-700 sticky top-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-white">Applications</h2>
                  <Link
                    href={`/dashboard/jobs/${job.id}/applications`}
                    className="text-sm text-green-400 hover:text-green-300"
                  >
                    View All
                  </Link>
                </div>
                {applications.length === 0 ? (
                  <div className="text-center py-8">
                    <FontAwesomeIcon icon={faUsers} className="text-4xl text-gray-600 mb-3" />
                    <p className="text-gray-400">No applications yet</p>
                  </div>
                ) : (
                  <div className="space-y-3 max-h-[600px] overflow-y-auto">
                    {applications.slice(0, 10).map((application: any) => (
                      <Link
                        key={application.id}
                        href={`/dashboard/candidates/${application.candidate_id}`}
                        className="block p-3 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <p className="text-sm font-medium text-white">
                            {application.candidate?.full_name || 'Unknown Candidate'}
                          </p>
                          <span
                            className={`px-2 py-1 text-xs font-semibold rounded ${
                              application.status === 'shortlisted'
                                ? 'bg-green-100 text-green-800'
                                : application.status === 'interviewed'
                                ? 'bg-blue-100 text-blue-800'
                                : application.status === 'hired'
                                ? 'bg-purple-100 text-purple-800'
                                : application.status === 'rejected'
                                ? 'bg-red-100 text-red-800'
                                : 'bg-gray-100 text-gray-800'
                            }`}
                          >
                            {application.status}
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-xs text-gray-400">
                          <span>Score: {application.match_percentage?.toFixed(0) || 0}%</span>
                          <span>{formatDate(application.created_at)}</span>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

