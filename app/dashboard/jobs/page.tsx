'use client'

import { useState, useEffect, useMemo } from 'react'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { getJobsByCompany, getApplications } from '@/lib/mock-db'
import JobStatsCards from '@/components/jobs/JobStatsCards'
import JobFilters from '@/components/jobs/JobFilters'
import JobsTable from '@/components/jobs/JobsTable'
import Breadcrumbs from '@/components/layout/Breadcrumbs'

const ITEMS_PER_PAGE = 10

export default function JobsPage() {
  const companyId = 'company-1'
  const [jobs, setJobs] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedJobs, setSelectedJobs] = useState<Set<string>>(new Set())
  const [filters, setFilters] = useState({
    status: '',
    department: '',
    location: '',
  })

  useEffect(() => {
    const loadJobs = async () => {
      setLoading(true)
      try {
        const allJobs = await getJobsByCompany(companyId)
        const applications = await getApplications()

        // Add application count to each job
        const jobsWithCounts = allJobs.map(job => ({
          ...job,
          applicationCount: applications.filter(app => app.job_id === job.id).length,
        }))

        setJobs(jobsWithCounts)
      } catch (error) {
        console.error('Failed to load jobs:', error)
      } finally {
        setLoading(false)
      }
    }

    loadJobs()
  }, [])

  // Filter jobs based on selected filters
  const filteredJobs = useMemo(() => {
    return jobs.filter(job => {
      if (filters.status && job.status !== filters.status) {
        // Map filter values to status values
        if (filters.status === 'active' && job.status !== 'published') return false
        if (filters.status === 'expired' && job.status !== 'closed') return false
        if (filters.status === 'paused' && job.status !== 'paused') return false
        if (filters.status === 'draft' && job.status !== 'draft') return false
      }

      if (filters.location) {
        const locationLower = job.location.toLowerCase()
        if (filters.location === 'remote' && !locationLower.includes('remote')) return false
        if (filters.location === 'usa' && !locationLower.match(/(usa|united states|san francisco|new york|austin|seattle|chicago|boston)/i)) return false
      }

      return true
    })
  }, [jobs, filters])

  // Paginate jobs
  const paginatedJobs = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
    return filteredJobs.slice(startIndex, startIndex + ITEMS_PER_PAGE)
  }, [filteredJobs, currentPage])

  const totalPages = Math.ceil(filteredJobs.length / ITEMS_PER_PAGE)

  // Calculate stats
  const stats = useMemo(() => {
    return {
      total: jobs.length,
      active: jobs.filter(j => j.status === 'published').length,
      paused: jobs.filter(j => j.status === 'paused').length,
      expired: jobs.filter(j => j.status === 'closed').length,
    }
  }, [jobs])

  const handleSelectAll = (selected: boolean) => {
    if (selected) {
      setSelectedJobs(new Set(paginatedJobs.map(job => job.id)))
    } else {
      setSelectedJobs(new Set())
    }
  }

  const handleSelectJob = (jobId: string, selected: boolean) => {
    const newSelected = new Set(selectedJobs)
    if (selected) {
      newSelected.add(jobId)
    } else {
      newSelected.delete(jobId)
    }
    setSelectedJobs(newSelected)
  }

  if (loading) {
    return (
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto py-6">
          <div className="flex items-center justify-center h-64">
            <p className="text-gray-400">Loading jobs...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      <Breadcrumbs
        items={[
          { label: 'Dashboard', href: '/dashboard' },
          { label: 'Jobs', href: '/dashboard/jobs' },
        ]}
      />
      <div className="px-4 sm:px-6 lg:px-8 py-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-semibold text-white">All Jobs</h1>
            <Link
              href="/dashboard/jobs/new"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-gray-900 bg-gradient-to-r from-green-400 to-emerald-500 hover:from-green-500 hover:to-emerald-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              <FontAwesomeIcon icon={faPlus} className="mr-2 h-4 w-4" />
              Add New Job
            </Link>
          </div>

          {/* Stats Cards */}
          <div className="mt-8">
            <JobStatsCards stats={stats} />
          </div>

          {/* Filters */}
          <JobFilters onFilterChange={setFilters} />

          {/* Jobs Table */}
          <JobsTable
            jobs={paginatedJobs}
            currentPage={currentPage}
            totalPages={totalPages}
            totalJobs={filteredJobs.length}
            onPageChange={setCurrentPage}
            onSelectAll={handleSelectAll}
            selectedJobs={selectedJobs}
            onSelectJob={handleSelectJob}
          />
        </div>
      </div>
    </>
  )
}

