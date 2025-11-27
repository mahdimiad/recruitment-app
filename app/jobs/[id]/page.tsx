'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faBuilding,
  faMapMarkerAlt,
  faClock,
  faDollarSign,
  faGlobe,
  faBriefcase,
  faCheckCircle,
  faEnvelope,
} from '@fortawesome/free-solid-svg-icons'
import { getJobById, getApplications } from '@/lib/mock-db'
import Navigation from '@/components/layout/Navigation'
import Footer from '@/components/layout/Footer'

export default function JobDetailPage() {
  const params = useParams()
  const jobId = params.id as string
  const [job, setJob] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [applicationSubmitted, setApplicationSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    phone: '',
  })
  const [applicationCount, setApplicationCount] = useState(0)

  useEffect(() => {
    const loadJob = async () => {
      setLoading(true)
      try {
        const jobData = await getJobById(jobId)
        if (jobData) {
          setJob(jobData)
          // Get application count
          const applications = await getApplications()
          const count = applications.filter(app => app.job_id === jobId).length
          setApplicationCount(count)
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement actual application submission
    // After submission, send a link to the candidate to complete their application
    // For now, just show success message
    setApplicationSubmitted(true)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900">
        <Navigation />
        <div className="flex items-center justify-center h-64">
          <p className="text-gray-400">Loading job details...</p>
        </div>
        <Footer />
      </div>
    )
  }

  if (!job) {
    return (
      <div className="min-h-screen bg-gray-900">
        <Navigation />
        <div className="flex items-center justify-center h-64">
          <p className="text-gray-400">Job not found</p>
        </div>
        <Footer />
      </div>
    )
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
  }

  const formatSalary = () => {
    if (!job.salary_min && !job.salary_max) return 'Not specified'
    if (job.salary_min && job.salary_max) {
      return `$${job.salary_min.toLocaleString()} - $${job.salary_max.toLocaleString()}`
    }
    if (job.salary_min) return `$${job.salary_min.toLocaleString()}+`
    return `Up to $${job.salary_max.toLocaleString()}`
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <Navigation />
      <main className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-3 lg:gap-8">
          {/* Job Details (Left Column) */}
          <div className="lg:col-span-2">
            {/* Job Header */}
            <div className="bg-gray-800 rounded-lg shadow-lg p-6 mb-6">
              <div className="flex items-center mb-4">
                <div className="h-16 w-16 bg-gray-700 rounded-md flex items-center justify-center mr-4">
                  <FontAwesomeIcon icon={faBuilding} className="text-2xl text-green-400" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-white">{job.title}</h1>
                  <p className="text-green-400 font-medium">Company Name</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                <div className="bg-gray-700 rounded-md p-3 flex items-center">
                  <FontAwesomeIcon icon={faMapMarkerAlt} className="text-green-400 mr-2" />
                  <span>{job.location}</span>
                </div>
                <div className="bg-gray-700 rounded-md p-3 flex items-center">
                  <FontAwesomeIcon icon={faClock} className="text-green-400 mr-2" />
                  <span className="capitalize">{job.job_type.replace('-', ' ')}</span>
                </div>
                <div className="bg-gray-700 rounded-md p-3 flex items-center">
                  <FontAwesomeIcon icon={faDollarSign} className="text-green-400 mr-2" />
                  <span>{formatSalary()}</span>
                </div>
              </div>
              <div className="flex items-center mt-6">
                <span className="text-gray-300 mr-2">Posted:</span>
                <span className="text-white">{formatDate(job.created_at)}</span>
                <span className="mx-3 text-gray-500">•</span>
                <span className="text-gray-300 mr-2">Applications:</span>
                <span className="text-white">{applicationCount}</span>
                <span className="mx-3 text-gray-500">•</span>
                <span className="bg-green-400 text-gray-900 text-xs font-bold px-2 py-1 rounded">
                  {job.status === 'published' ? 'ACTIVELY HIRING' : job.status.toUpperCase()}
                </span>
              </div>
            </div>

            {/* Job Description */}
            <div className="bg-gray-800 rounded-lg shadow-lg p-6 mb-6">
              <h2 className="text-xl font-bold text-white mb-4">Job Description</h2>
              <div className="text-gray-300 whitespace-pre-wrap">{job.description}</div>
            </div>

            {/* About Company */}
            <div className="bg-gray-800 rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-bold text-white mb-4">About Company</h2>
              <p className="text-gray-300 mb-4">
                We are a leading technology company that specializes in developing innovative software
                solutions for businesses of all sizes. Our mission is to empower organizations through
                technology, helping them streamline operations, enhance productivity, and achieve their
                business goals.
              </p>
              <div className="flex items-center mt-6">
                <Link href="#" className="text-green-400 hover:text-green-300 mr-6 flex items-center">
                  <FontAwesomeIcon icon={faGlobe} className="mr-2" />
                  <span>Visit Website</span>
                </Link>
                <Link href="/jobs" className="text-green-400 hover:text-green-300 flex items-center">
                  <FontAwesomeIcon icon={faBriefcase} className="mr-2" />
                  <span>View All Jobs</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Application Form (Right Column) */}
          <div className="mt-10 lg:mt-0">
            <div className="bg-gray-800 rounded-lg shadow-lg p-6 sticky top-6">
              {!applicationSubmitted ? (
                <>
                  <h2 className="text-xl font-bold text-white mb-6">Apply for this position</h2>
                  <form id="application-form" onSubmit={handleSubmit}>
                    <div className="mb-4">
                      <label htmlFor="fullname" className="block text-sm font-medium text-gray-300 mb-2">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="fullname"
                        name="fullname"
                        required
                        value={formData.fullname}
                        onChange={handleInputChange}
                        className="bg-gray-700 border border-gray-600 rounded-md w-full px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      />
                    </div>

                    <div className="mb-4">
                      <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                        Email <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        className="bg-gray-700 border border-gray-600 rounded-md w-full px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      />
                    </div>

                    <div className="mb-6">
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-2">
                        Phone (optional)
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="bg-gray-700 border border-gray-600 rounded-md w-full px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        placeholder="+1 (555) 123-4567"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full px-4 py-3 rounded-md font-medium text-gray-900 bg-gradient-to-r from-green-400 to-emerald-500 hover:from-green-500 hover:to-emerald-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                    >
                      Submit Application
                    </button>
                  </form>
                </>
              ) : (
                <div className="bg-gray-700 rounded-md p-4 border-l-4 border-green-400">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <FontAwesomeIcon icon={faCheckCircle} className="text-green-400 text-xl" />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-white">
                        Thank you! We've received your information.
                      </p>
                      <p className="mt-2 text-sm text-gray-300">
                        Please check your email ({formData.email}) for a link to complete your application with your resume and cover letter.
                      </p>
                      <div className="mt-3 flex items-center text-sm text-gray-400">
                        <FontAwesomeIcon icon={faEnvelope} className="mr-2" />
                        <span>Check your inbox for the application link</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

