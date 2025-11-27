'use client'

import { useState, useEffect, useMemo } from 'react'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faSearch,
  faFilter,
  faTimes,
  faBuilding,
  faMapMarkerAlt,
  faBriefcase,
  faDollarSign,
  faClock,
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons'
import { getJobs } from '@/lib/mock-db'
import Navigation from '@/components/layout/Navigation'
import Footer from '@/components/layout/Footer'

const ITEMS_PER_PAGE = 10

export default function PublicJobsPage() {
  const [jobs, setJobs] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
  const [filters, setFilters] = useState({
    search: '',
    location: '',
    job_type: [] as string[],
    experience: [] as string[],
    min_salary: '',
    max_salary: '',
  })
  const [sortBy, setSortBy] = useState('relevance')

  useEffect(() => {
    const loadJobs = async () => {
      setLoading(true)
      try {
        const allJobs = await getJobs()
        // Only show published jobs
        const publishedJobs = allJobs.filter(job => job.status === 'published')
        setJobs(publishedJobs)
      } catch (error) {
        console.error('Failed to load jobs:', error)
      } finally {
        setLoading(false)
      }
    }

    loadJobs()
  }, [])

  const filteredJobs = useMemo(() => {
    let filtered = [...jobs]

    // Search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase()
      filtered = filtered.filter(
        job =>
          job.title.toLowerCase().includes(searchLower) ||
          job.description.toLowerCase().includes(searchLower) ||
          job.location.toLowerCase().includes(searchLower)
      )
    }

    // Location filter
    if (filters.location) {
      filtered = filtered.filter(job =>
        job.location.toLowerCase().includes(filters.location.toLowerCase())
      )
    }

    // Job type filter
    if (filters.job_type.length > 0) {
      filtered = filtered.filter(job => filters.job_type.includes(job.job_type))
    }

    // Salary filter
    if (filters.min_salary) {
      filtered = filtered.filter(job => job.salary_max >= parseInt(filters.min_salary))
    }
    if (filters.max_salary) {
      filtered = filtered.filter(job => job.salary_min <= parseInt(filters.max_salary))
    }

    // Sort
    if (sortBy === 'recent') {
      filtered.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    } else if (sortBy === 'salary-high') {
      filtered.sort((a, b) => (b.salary_max || 0) - (a.salary_max || 0))
    } else if (sortBy === 'salary-low') {
      filtered.sort((a, b) => (a.salary_min || 0) - (b.salary_min || 0))
    }

    return filtered
  }, [jobs, filters, sortBy])

  const totalPages = Math.ceil(filteredJobs.length / ITEMS_PER_PAGE)
  const paginatedJobs = filteredJobs.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  )

  const handleFilterChange = (key: string, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }))
    setCurrentPage(1) // Reset to first page when filters change
  }

  const toggleJobType = (type: string) => {
    setFilters(prev => ({
      ...prev,
      job_type: prev.job_type.includes(type)
        ? prev.job_type.filter(t => t !== type)
        : [...prev.job_type, type],
    }))
    setCurrentPage(1)
  }

  const toggleExperience = (level: string) => {
    setFilters(prev => ({
      ...prev,
      experience: prev.experience.includes(level)
        ? prev.experience.filter(e => e !== level)
        : [...prev.experience, level],
    }))
    setCurrentPage(1)
  }

  const clearFilters = () => {
    setFilters({
      search: '',
      location: '',
      job_type: [],
      experience: [],
      min_salary: '',
      max_salary: '',
    })
    setCurrentPage(1)
  }

  const formatSalary = (job: any) => {
    if (!job.salary_min && !job.salary_max) return 'Not specified'
    if (job.salary_min && job.salary_max) {
      return `$${job.salary_min.toLocaleString()} - $${job.salary_max.toLocaleString()}`
    }
    if (job.salary_min) return `$${job.salary_min.toLocaleString()}+`
    return `Up to $${job.salary_max.toLocaleString()}`
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffTime = Math.abs(now.getTime() - date.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays === 0) return 'Today'
    if (diffDays === 1) return 'Yesterday'
    if (diffDays < 7) return `${diffDays} days ago`
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`
    return `${Math.floor(diffDays / 30)} months ago`
  }

  const activeFiltersCount =
    (filters.search ? 1 : 0) +
    (filters.location ? 1 : 0) +
    filters.job_type.length +
    filters.experience.length +
    (filters.min_salary ? 1 : 0) +
    (filters.max_salary ? 1 : 0)

  return (
    <div className="min-h-screen bg-gray-900">
      <Navigation />
      
      {/* Header Section */}
      <div className="bg-gray-800 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl font-extrabold text-white sm:text-4xl">
              Find your next opportunity
            </h1>
            <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-300 sm:mt-4">
              Browse through our curated list of top jobs from leading companies
            </p>
          </div>

          {/* Search & Filter Bar */}
          <div className="mt-10 max-w-4xl mx-auto">
            <div className="bg-gray-700 p-4 rounded-lg shadow-lg">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
                <div className="md:col-span-2">
                  <div className="relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FontAwesomeIcon icon={faSearch} className="text-gray-400" />
                    </div>
                    <input
                      type="text"
                      name="search"
                      id="search"
                      value={filters.search}
                      onChange={(e) => handleFilterChange('search', e.target.value)}
                      className="bg-gray-800 block w-full pl-10 pr-3 py-2 border border-gray-600 rounded-md leading-5 text-gray-300 placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500"
                      placeholder="Job title, company, or keywords"
                    />
                  </div>
                </div>
                <div>
                  <select
                    id="location"
                    name="location"
                    value={filters.location}
                    onChange={(e) => handleFilterChange('location', e.target.value)}
                    className="bg-gray-800 block w-full pl-3 pr-10 py-2 text-base border border-gray-600 rounded-md leading-5 text-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500"
                  >
                    <option value="">Any Location</option>
                    <option value="remote">Remote</option>
                    <option value="usa">United States</option>
                    <option value="europe">Europe</option>
                    <option value="asia">Asia</option>
                  </select>
                </div>
                <div>
                  <button
                    type="button"
                    onClick={() => setMobileFiltersOpen(true)}
                    className="w-full px-4 py-2 rounded-md text-sm font-medium text-gray-900 bg-gradient-to-r from-green-400 to-emerald-400 hover:from-green-500 hover:to-emerald-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                  >
                    <FontAwesomeIcon icon={faFilter} className="mr-2" />
                    Filters
                  </button>
                </div>
              </div>

              {/* Active Filters */}
              {activeFiltersCount > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {filters.job_type.map((type) => (
                    <span
                      key={type}
                      className="inline-flex rounded-full items-center py-1 pl-3 pr-2 text-sm font-medium bg-gray-800 text-gray-300"
                    >
                      {type.replace('-', ' ')}
                      <button
                        type="button"
                        onClick={() => toggleJobType(type)}
                        className="ml-1 inline-flex text-gray-400 hover:text-gray-300"
                      >
                        <FontAwesomeIcon icon={faTimes} className="text-xs" />
                      </button>
                    </span>
                  ))}
                  {activeFiltersCount > 0 && (
                    <span className="inline-flex rounded-full items-center py-1 pl-3 pr-2 text-sm font-medium bg-green-400 text-gray-900">
                      Clear All Filters
                      <button
                        type="button"
                        onClick={clearFilters}
                        className="ml-1 inline-flex text-gray-700 hover:text-gray-900"
                      >
                        <FontAwesomeIcon icon={faTimes} className="text-xs" />
                      </button>
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          {/* Filters (Left Sidebar on Desktop) */}
          <div className="hidden lg:block lg:col-span-3">
            <div className="sticky top-6 space-y-6">
              {/* Job Type Filter */}
              <div className="bg-gray-800 rounded-lg shadow p-4">
                <h3 className="text-lg font-medium text-white mb-3">Job Type</h3>
                <div className="space-y-2">
                  {['full-time', 'part-time', 'contract', 'internship'].map((type) => (
                    <div key={type} className="flex items-center">
                      <input
                        id={type}
                        name="job-type"
                        type="checkbox"
                        checked={filters.job_type.includes(type)}
                        onChange={() => toggleJobType(type)}
                        className="h-4 w-4 text-green-400 border-gray-600 rounded bg-gray-700 focus:ring-green-500"
                      />
                      <label htmlFor={type} className="ml-3 text-sm text-gray-300 capitalize">
                        {type.replace('-', ' ')}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Experience Level Filter */}
              <div className="bg-gray-800 rounded-lg shadow p-4">
                <h3 className="text-lg font-medium text-white mb-3">Experience Level</h3>
                <div className="space-y-2">
                  {['entry', 'mid', 'senior', 'executive'].map((level) => (
                    <div key={level} className="flex items-center">
                      <input
                        id={level}
                        name="experience"
                        type="checkbox"
                        checked={filters.experience.includes(level)}
                        onChange={() => toggleExperience(level)}
                        className="h-4 w-4 text-green-400 border-gray-600 rounded bg-gray-700 focus:ring-green-500"
                      />
                      <label htmlFor={level} className="ml-3 text-sm text-gray-300 capitalize">
                        {level} Level
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Salary Range */}
              <div className="bg-gray-800 rounded-lg shadow p-4">
                <h3 className="text-lg font-medium text-white mb-3">Salary Range</h3>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="min-salary" className="block text-sm font-medium text-gray-300">
                      Minimum
                    </label>
                    <select
                      id="min-salary"
                      name="min-salary"
                      value={filters.min_salary}
                      onChange={(e) => handleFilterChange('min_salary', e.target.value)}
                      className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-600 bg-gray-700 rounded-md text-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500"
                    >
                      <option value="">No minimum</option>
                      <option value="30000">$30,000</option>
                      <option value="50000">$50,000</option>
                      <option value="70000">$70,000</option>
                      <option value="90000">$90,000</option>
                      <option value="120000">$120,000</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="max-salary" className="block text-sm font-medium text-gray-300">
                      Maximum
                    </label>
                    <select
                      id="max-salary"
                      name="max-salary"
                      value={filters.max_salary}
                      onChange={(e) => handleFilterChange('max_salary', e.target.value)}
                      className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-600 bg-gray-700 rounded-md text-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500"
                    >
                      <option value="">No maximum</option>
                      <option value="50000">$50,000</option>
                      <option value="70000">$70,000</option>
                      <option value="90000">$90,000</option>
                      <option value="120000">$120,000</option>
                      <option value="150000">$150,000</option>
                      <option value="200000">$200,000+</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Apply Filters Button */}
              <div>
                <button
                  type="button"
                  onClick={clearFilters}
                  className="w-full px-4 py-2 rounded-md text-sm font-medium text-green-400 bg-gray-700 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  Reset Filters
                </button>
              </div>
            </div>
          </div>

          {/* Job Listings (Right Column) */}
          <div className="mt-6 lg:mt-0 lg:col-span-9">
            <div className="bg-gray-800 rounded-lg shadow overflow-hidden">
              {/* Results Info */}
              <div className="px-4 py-3 border-b border-gray-700 flex items-center justify-between">
                <span className="text-sm text-gray-300">
                  Showing <strong>{filteredJobs.length}</strong> jobs
                </span>
                <div className="flex items-center">
                  <span className="mr-2 text-sm text-gray-300">Sort by:</span>
                  <select
                    id="sort"
                    name="sort"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="bg-gray-700 text-sm rounded-md border-gray-600 text-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500"
                  >
                    <option value="relevance">Relevance</option>
                    <option value="recent">Most Recent</option>
                    <option value="salary-high">Highest Salary</option>
                    <option value="salary-low">Lowest Salary</option>
                  </select>
                </div>
              </div>

              {/* Job Listings */}
              {loading ? (
                <div className="px-4 py-8 text-center">
                  <p className="text-gray-400">Loading jobs...</p>
                </div>
              ) : paginatedJobs.length === 0 ? (
                <div className="px-4 py-8 text-center">
                  <p className="text-gray-400">No jobs found matching your criteria.</p>
                </div>
              ) : (
                <ul className="divide-y divide-gray-700">
                  {paginatedJobs.map((job) => (
                    <li key={job.id}>
                      <Link
                        href={`/jobs/${job.id}`}
                        className="block hover:bg-gray-700 transition duration-150"
                      >
                        <div className="px-4 py-4 sm:px-6">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-12 w-12 bg-gray-700 rounded-md flex items-center justify-center">
                                <FontAwesomeIcon
                                  icon={faBuilding}
                                  className="text-xl text-green-400"
                                />
                              </div>
                              <div className="ml-4">
                                <div className="text-lg font-medium text-white">{job.title}</div>
                                <div className="text-sm text-green-400">Company Name</div>
                              </div>
                            </div>
                          </div>
                          <div className="mt-4 sm:flex sm:justify-between">
                            <div className="sm:flex">
                              <div className="flex items-center text-sm text-gray-300">
                                <FontAwesomeIcon icon={faMapMarkerAlt} className="text-gray-400 mr-1.5" />
                                {job.location}
                              </div>
                              <div className="mt-2 flex items-center text-sm text-gray-300 sm:mt-0 sm:ml-6">
                                <FontAwesomeIcon icon={faBriefcase} className="text-gray-400 mr-1.5" />
                                <span className="capitalize">{job.job_type.replace('-', ' ')}</span>
                              </div>
                              <div className="mt-2 flex items-center text-sm text-gray-300 sm:mt-0 sm:ml-6">
                                <FontAwesomeIcon icon={faDollarSign} className="text-gray-400 mr-1.5" />
                                {formatSalary(job)}
                              </div>
                            </div>
                            <div className="mt-2 flex items-center text-sm text-gray-300 sm:mt-0">
                              <FontAwesomeIcon icon={faClock} className="text-gray-400 mr-1.5" />
                              Posted {formatDate(job.created_at)}
                            </div>
                          </div>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="bg-gray-800 px-4 py-3 flex items-center justify-between border-t border-gray-700 sm:px-6">
                  <div className="flex-1 flex justify-between sm:hidden">
                    <button
                      onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                      disabled={currentPage === 1}
                      className="relative inline-flex items-center px-4 py-2 border border-gray-600 text-sm font-medium rounded-md text-gray-300 bg-gray-700 hover:bg-gray-600 disabled:opacity-50"
                    >
                      Previous
                    </button>
                    <button
                      onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                      disabled={currentPage === totalPages}
                      className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-600 text-sm font-medium rounded-md text-gray-300 bg-gray-700 hover:bg-gray-600 disabled:opacity-50"
                    >
                      Next
                    </button>
                  </div>
                  <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                    <div>
                      <p className="text-sm text-gray-300">
                        Showing <span className="font-medium">{(currentPage - 1) * ITEMS_PER_PAGE + 1}</span> to{' '}
                        <span className="font-medium">
                          {Math.min(currentPage * ITEMS_PER_PAGE, filteredJobs.length)}
                        </span>{' '}
                        of <span className="font-medium">{filteredJobs.length}</span> results
                      </p>
                    </div>
                    <div>
                      <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                        <button
                          onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                          disabled={currentPage === 1}
                          className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-600 bg-gray-700 text-sm font-medium text-gray-300 hover:bg-gray-600 disabled:opacity-50"
                        >
                          <FontAwesomeIcon icon={faChevronLeft} />
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
                              onClick={() => setCurrentPage(pageNum)}
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
                        <button
                          onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                          disabled={currentPage === totalPages}
                          className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-600 bg-gray-700 text-sm font-medium text-gray-300 hover:bg-gray-600 disabled:opacity-50"
                        >
                          <FontAwesomeIcon icon={faChevronRight} />
                        </button>
                      </nav>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Filters Button */}
            <div className="mt-6 block lg:hidden">
              <button
                type="button"
                onClick={() => setMobileFiltersOpen(true)}
                className="w-full px-4 py-3 rounded-md text-sm font-medium text-gray-900 bg-gradient-to-r from-green-400 to-emerald-500 hover:from-green-500 hover:to-emerald-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                <FontAwesomeIcon icon={faFilter} className="mr-2" />
                Show Filters
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Mobile Filter Modal */}
      {mobileFiltersOpen && (
        <div className="fixed inset-0 overflow-hidden z-50 lg:hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div
              className="absolute inset-0 bg-gray-900 bg-opacity-75 transition-opacity"
              onClick={() => setMobileFiltersOpen(false)}
            />
            <div className="fixed inset-y-0 right-0 pl-10 max-w-full flex">
              <div className="w-screen max-w-md">
                <div className="h-full flex flex-col bg-gray-800 shadow-xl overflow-y-scroll">
                  <div className="px-4 py-6 sm:px-6 flex items-center justify-between">
                    <h2 className="text-lg font-medium text-white">Filters</h2>
                    <button
                      type="button"
                      onClick={() => setMobileFiltersOpen(false)}
                      className="text-gray-400 hover:text-gray-300 focus:outline-none"
                    >
                      <FontAwesomeIcon icon={faTimes} className="text-xl" />
                    </button>
                  </div>
                  <div className="mt-6 relative flex-1 px-4 sm:px-6">
                    {/* Same filter content as sidebar */}
                    <div className="space-y-6">
                      {/* Job Type Filter */}
                      <div className="bg-gray-700 rounded-lg shadow p-4">
                        <h3 className="text-lg font-medium text-white mb-3">Job Type</h3>
                        <div className="space-y-2">
                          {['full-time', 'part-time', 'contract', 'internship'].map((type) => (
                            <div key={type} className="flex items-center">
                              <input
                                id={`${type}-mobile`}
                                name="job-type"
                                type="checkbox"
                                checked={filters.job_type.includes(type)}
                                onChange={() => toggleJobType(type)}
                                className="h-4 w-4 text-green-400 border-gray-600 rounded bg-gray-600 focus:ring-green-500"
                              />
                              <label
                                htmlFor={`${type}-mobile`}
                                className="ml-3 text-sm text-gray-300 capitalize"
                              >
                                {type.replace('-', ' ')}
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Experience Level Filter */}
                      <div className="bg-gray-700 rounded-lg shadow p-4">
                        <h3 className="text-lg font-medium text-white mb-3">Experience Level</h3>
                        <div className="space-y-2">
                          {['entry', 'mid', 'senior', 'executive'].map((level) => (
                            <div key={level} className="flex items-center">
                              <input
                                id={`${level}-mobile`}
                                name="experience"
                                type="checkbox"
                                checked={filters.experience.includes(level)}
                                onChange={() => toggleExperience(level)}
                                className="h-4 w-4 text-green-400 border-gray-600 rounded bg-gray-600 focus:ring-green-500"
                              />
                              <label htmlFor={`${level}-mobile`} className="ml-3 text-sm text-gray-300 capitalize">
                                {level} Level
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Salary Range */}
                      <div className="bg-gray-700 rounded-lg shadow p-4">
                        <h3 className="text-lg font-medium text-white mb-3">Salary Range</h3>
                        <div className="space-y-4">
                          <div>
                            <label htmlFor="min-salary-mobile" className="block text-sm font-medium text-gray-300">
                              Minimum
                            </label>
                            <select
                              id="min-salary-mobile"
                              name="min-salary"
                              value={filters.min_salary}
                              onChange={(e) => handleFilterChange('min_salary', e.target.value)}
                              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-600 bg-gray-600 rounded-md text-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500"
                            >
                              <option value="">No minimum</option>
                              <option value="30000">$30,000</option>
                              <option value="50000">$50,000</option>
                              <option value="70000">$70,000</option>
                              <option value="90000">$90,000</option>
                              <option value="120000">$120,000</option>
                            </select>
                          </div>
                          <div>
                            <label htmlFor="max-salary-mobile" className="block text-sm font-medium text-gray-300">
                              Maximum
                            </label>
                            <select
                              id="max-salary-mobile"
                              name="max-salary"
                              value={filters.max_salary}
                              onChange={(e) => handleFilterChange('max_salary', e.target.value)}
                              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-600 bg-gray-600 rounded-md text-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500"
                            >
                              <option value="">No maximum</option>
                              <option value="50000">$50,000</option>
                              <option value="70000">$70,000</option>
                              <option value="90000">$90,000</option>
                              <option value="120000">$120,000</option>
                              <option value="150000">$150,000</option>
                              <option value="200000">$200,000+</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex-shrink-0 px-4 py-4 flex justify-end border-t border-gray-700">
                    <button
                      type="button"
                      onClick={() => setMobileFiltersOpen(false)}
                      className="px-4 py-2 rounded-md border border-gray-600 text-sm font-medium text-gray-300 bg-gray-700 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  )
}

