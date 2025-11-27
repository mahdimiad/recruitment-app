'use client'

import { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faArrowLeft,
  faCheckSquare,
  faSquare,
  faFileExport,
  faSave,
  faSearch,
  faEye,
} from '@fortawesome/free-solid-svg-icons'
import Breadcrumbs from '@/components/layout/Breadcrumbs'
import { getCandidatesByCompany, getApplications, getJobsByCompany, getCandidateSkills } from '@/lib/mock-db'
import { Candidate, Application, Job, CandidateSkill } from '@/types/database'
import clsx from 'clsx'

interface CandidateWithDetails extends Candidate {
  skills: CandidateSkill[]
  applications: (Application & { job: Job | null })[]
  matchPercentage?: number
}

function CandidatesPageContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const jobId = searchParams.get('jobId')
  
  const [candidates, setCandidates] = useState<CandidateWithDetails[]>([])
  const [allJobs, setAllJobs] = useState<Job[]>([])
  const [selectedJob, setSelectedJob] = useState<Job | null>(null)
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCandidates, setSelectedCandidates] = useState<Set<string>>(new Set())
  const [selectionMethod, setSelectionMethod] = useState<'manual' | 'threshold'>('manual')
  const [scoreThreshold, setScoreThreshold] = useState(80)
  const [filters, setFilters] = useState({
    shortlisted: true,
    interviewed: false,
    topMatch: true,
  })

  useEffect(() => {
    const loadData = async () => {
      setLoading(true)
      try {
        const [candidatesData, applicationsData, jobsData] = await Promise.all([
          getCandidatesByCompany('company-1'),
          getApplications(),
          getJobsByCompany('company-1'),
        ])

        setAllJobs(jobsData)

        // If jobId is provided, filter candidates by that job
        let filteredCandidates = candidatesData
        if (jobId) {
          const jobApplications = applicationsData.filter(app => app.job_id === jobId)
          const candidateIds = new Set(jobApplications.map(app => app.candidate_id))
          filteredCandidates = candidatesData.filter(c => candidateIds.has(c.id))
          const job = jobsData.find(j => j.id === jobId)
          setSelectedJob(job || null)
        }

        // Enrich candidates with their skills and applications
        const enrichedCandidates = await Promise.all(
          filteredCandidates.map(async (candidate) => {
            const skills = await getCandidateSkills(candidate.id)
            const candidateApplications = applicationsData
              .filter(app => app.candidate_id === candidate.id)
              .map(app => ({
                ...app,
                job: jobsData.find(j => j.id === app.job_id) || null,
              }))

            // Get match percentage for the selected job if applicable
            let matchPercentage: number | undefined
            if (jobId) {
              const application = candidateApplications.find(app => app.job_id === jobId)
              matchPercentage = application?.match_percentage
            }

            return {
              ...candidate,
              skills,
              applications: candidateApplications,
              matchPercentage,
            }
          })
        )

        setCandidates(enrichedCandidates)
      } catch (error) {
        console.error('Failed to load candidates:', error)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [jobId])

  const handleSelectAll = () => {
    const allIds = new Set(filteredCandidates.map(c => c.id))
    setSelectedCandidates(allIds)
  }

  const handleDeselectAll = () => {
    setSelectedCandidates(new Set())
  }

  const handleToggleCandidate = (candidateId: string) => {
    const newSelected = new Set(selectedCandidates)
    if (newSelected.has(candidateId)) {
      newSelected.delete(candidateId)
    } else {
      newSelected.add(candidateId)
    }
    setSelectedCandidates(newSelected)
  }

  const handleMainCheckboxChange = (checked: boolean) => {
    if (checked) {
      handleSelectAll()
    } else {
      handleDeselectAll()
    }
  }

  const filteredCandidates = candidates.filter(candidate => {
    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      const matchesSearch =
        candidate.full_name.toLowerCase().includes(query) ||
        candidate.email.toLowerCase().includes(query) ||
        candidate.skills.some(skill => skill.skill.toLowerCase().includes(query))
      if (!matchesSearch) return false
    }

    // Status filters
    if (filters.shortlisted || filters.interviewed || filters.topMatch) {
      const hasMatchingApplication = candidate.applications.some(app => {
        if (filters.shortlisted && app.status === 'shortlisted') return true
        if (filters.interviewed && app.status === 'interviewed') return true
        return false
      })
      if (filters.shortlisted || filters.interviewed) {
        if (!hasMatchingApplication) return false
      }
    }

    // Top match filter
    if (filters.topMatch && candidate.matchPercentage !== undefined) {
      if (candidate.matchPercentage < 90) return false
    }

    // Score threshold filter
    if (selectionMethod === 'threshold' && candidate.matchPercentage !== undefined) {
      if (candidate.matchPercentage < scoreThreshold) return false
    }

    return true
  })

  const getStatusBadge = (status: Application['status']) => {
    const statusConfig = {
      shortlisted: 'bg-green-100 text-green-800',
      interviewed: 'bg-blue-100 text-blue-800',
      applied: 'bg-gray-100 text-gray-800',
      rejected: 'bg-red-100 text-red-800',
      hired: 'bg-purple-100 text-purple-800',
    }
    return statusConfig[status] || statusConfig.applied
  }

  const getMatchColor = (percentage: number | undefined) => {
    if (!percentage) return 'text-gray-400'
    if (percentage >= 90) return 'text-green-400'
    if (percentage >= 80) return 'text-yellow-400'
    if (percentage >= 70) return 'text-orange-400'
    return 'text-red-400'
  }

  const candidatesMeetingThreshold = filteredCandidates.filter(
    c => c.matchPercentage !== undefined && c.matchPercentage >= scoreThreshold
  ).length

  if (loading) {
    return (
      <>
        <Breadcrumbs
          items={[
            { label: 'Dashboard', href: '/dashboard' },
            { label: 'Candidates', href: '#' },
          ]}
        />
        <div className="px-4 sm:px-6 lg:px-8 py-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-center h-64">
              <p className="text-gray-400">Loading candidates...</p>
            </div>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <Breadcrumbs
        items={[
          { label: 'Dashboard', href: '/dashboard' },
          { label: 'Candidates', href: '#' },
          ...(selectedJob ? [{ label: selectedJob.title, href: '#' }] : []),
        ]}
      />
      <div className="px-4 sm:px-6 lg:px-8 py-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white">
                {selectedJob ? 'Shortlist & Export Candidates' : 'Candidates'}
              </h1>
              {selectedJob && (
                <p className="mt-1 text-gray-400">
                  Select and export top candidates for{' '}
                  <span className="text-green-400">{selectedJob.title}</span> position
                </p>
              )}
            </div>
            <div className="mt-4 md:mt-0 flex space-x-3">
              {selectedJob && (
                <Link
                  href={`/dashboard/jobs/${selectedJob.id}`}
                  className="inline-flex items-center px-4 py-2 border border-gray-600 rounded-md shadow-sm text-sm font-medium text-white bg-gray-700 hover:bg-gray-600 focus:outline-none"
                >
                  <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
                  Back to Job
                </Link>
              )}
            </div>
          </div>

          {/* Two-column layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left column - Selection Controls */}
            <div className="lg:col-span-1">
              {/* Selection Status Card */}
              <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden mb-4">
                <div className="p-4 bg-gray-700/50 border-b border-gray-700">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium text-gray-400">Selected Candidates</h3>
                    <span className="text-lg font-bold text-green-400">{selectedCandidates.size}</span>
                  </div>
                  {selectedCandidates.size > 0 && (
                    <p className="text-xs text-gray-400 mt-1">
                      {filteredCandidates.length > 0
                        ? `${Math.round((selectedCandidates.size / filteredCandidates.length) * 100)}% of visible candidates`
                        : ''}
                    </p>
                  )}
                </div>
              </div>

              {/* Selection Options */}
              <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden mb-6">
                <div className="p-5 border-b border-gray-700">
                  <h2 className="text-lg font-medium text-white">Selection Method</h2>
                </div>
                <div className="p-5">
                  {/* Selection Method Radio Buttons */}
                  <div className="mb-6">
                    <div className="space-y-3">
                      <label
                        htmlFor="select-manual"
                        className={clsx(
                          'flex items-center p-3 rounded-lg border-2 cursor-pointer transition-all',
                          selectionMethod === 'manual'
                            ? 'border-green-400 bg-green-400/10'
                            : 'border-gray-700 bg-gray-700/50 hover:border-gray-600'
                        )}
                      >
                        <input
                          id="select-manual"
                          name="selection-method"
                          type="radio"
                          checked={selectionMethod === 'manual'}
                          onChange={() => setSelectionMethod('manual')}
                          className="h-4 w-4 text-green-500 border-gray-600 bg-gray-700 focus:ring-green-500"
                        />
                        <div className="ml-3 flex-1">
                          <div className="text-sm font-medium text-white">Manual Selection</div>
                          <div className="text-xs text-gray-400 mt-0.5">Choose candidates individually</div>
                        </div>
                      </label>
                      <label
                        htmlFor="select-threshold"
                        className={clsx(
                          'flex items-center p-3 rounded-lg border-2 cursor-pointer transition-all',
                          selectionMethod === 'threshold'
                            ? 'border-green-400 bg-green-400/10'
                            : 'border-gray-700 bg-gray-700/50 hover:border-gray-600'
                        )}
                      >
                        <input
                          id="select-threshold"
                          name="selection-method"
                          type="radio"
                          checked={selectionMethod === 'threshold'}
                          onChange={() => setSelectionMethod('threshold')}
                          className="h-4 w-4 text-green-500 border-gray-600 bg-gray-700 focus:ring-green-500"
                        />
                        <div className="ml-3 flex-1">
                          <div className="text-sm font-medium text-white">Score Threshold</div>
                          <div className="text-xs text-gray-400 mt-0.5">Auto-select by match score</div>
                        </div>
                      </label>
                    </div>
                  </div>

                  {/* Score Threshold Controls */}
                  {selectionMethod === 'threshold' && (
                    <div className="mb-6 p-4 bg-gray-700/50 rounded-lg border border-gray-700">
                      <label htmlFor="score-threshold" className="block text-sm font-medium text-white mb-3">
                        Minimum Score: <span className="text-green-400">{scoreThreshold}%</span>
                      </label>
                      <div className="mb-3">
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={scoreThreshold}
                          onChange={(e) => setScoreThreshold(Number(e.target.value))}
                          className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer accent-green-500"
                          id="score-threshold"
                        />
                        <div className="flex justify-between text-xs text-gray-400 mt-1">
                          <span>0%</span>
                          <span>50%</span>
                          <span>100%</span>
                        </div>
                      </div>
                      <div className="mb-4 p-3 bg-gray-800 rounded-md border border-gray-600">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-300">Candidates matching threshold</span>
                          <span className="text-sm font-semibold text-green-400">{candidatesMeetingThreshold}</span>
                        </div>
                      </div>
                      <button
                        onClick={() => {
                          const ids = new Set(
                            filteredCandidates
                              .filter(c => c.matchPercentage !== undefined && c.matchPercentage >= scoreThreshold)
                              .map(c => c.id)
                          )
                          setSelectedCandidates(ids)
                        }}
                        className="w-full inline-flex items-center justify-center px-4 py-2.5 border border-transparent rounded-md shadow-sm text-sm font-medium text-gray-900 bg-gradient-to-r from-green-400 to-emerald-500 hover:from-green-500 hover:to-emerald-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all"
                      >
                        Apply Threshold
                      </button>
                    </div>
                  )}

                  {/* Manual Selection Controls */}
                  {selectionMethod === 'manual' && (
                    <div className="mb-6 p-4 bg-gray-700/50 rounded-lg border border-gray-700">
                      <div className="grid grid-cols-2 gap-2 mb-4">
                        <button
                          onClick={handleSelectAll}
                          className="inline-flex items-center justify-center px-3 py-2 border border-gray-600 rounded-md text-sm font-medium text-white bg-gray-700 hover:bg-gray-600 focus:outline-none transition-colors"
                        >
                          <FontAwesomeIcon icon={faCheckSquare} className="mr-2 h-4 w-4" />
                          Select All
                        </button>
                        <button
                          onClick={handleDeselectAll}
                          className="inline-flex items-center justify-center px-3 py-2 border border-gray-600 rounded-md text-sm font-medium text-white bg-gray-700 hover:bg-gray-600 focus:outline-none transition-colors"
                        >
                          <FontAwesomeIcon icon={faSquare} className="mr-2 h-4 w-4" />
                          Clear All
                        </button>
                      </div>
                      <button
                        onClick={() => {
                          const newSelected = new Set(
                            filteredCandidates
                              .filter(c => !selectedCandidates.has(c.id))
                              .map(c => c.id)
                          )
                          setSelectedCandidates(newSelected)
                        }}
                        className="w-full inline-flex items-center justify-center px-3 py-2 border border-gray-600 rounded-md text-sm font-medium text-gray-300 bg-gray-700 hover:bg-gray-600 focus:outline-none transition-colors"
                      >
                        Invert Selection
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Filter Options */}
              <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden mb-6">
                <div className="p-5 border-b border-gray-700">
                  <h2 className="text-lg font-medium text-white">Filters</h2>
                </div>
                <div className="p-5">
                  <div className="space-y-3">
                    <label
                      htmlFor="filter-shortlisted"
                      className="flex items-center p-3 rounded-lg border border-gray-700 bg-gray-700/30 hover:bg-gray-700/50 cursor-pointer transition-colors"
                    >
                      <input
                        id="filter-shortlisted"
                        type="checkbox"
                        checked={filters.shortlisted}
                        onChange={(e) => setFilters({ ...filters, shortlisted: e.target.checked })}
                        className="h-4 w-4 text-green-500 border-gray-600 rounded bg-gray-700 focus:ring-green-500"
                      />
                      <div className="ml-3 flex-1">
                        <div className="text-sm font-medium text-white">Shortlisted</div>
                        <div className="text-xs text-gray-400">Show shortlisted candidates</div>
                      </div>
                    </label>
                    <label
                      htmlFor="filter-interviewed"
                      className="flex items-center p-3 rounded-lg border border-gray-700 bg-gray-700/30 hover:bg-gray-700/50 cursor-pointer transition-colors"
                    >
                      <input
                        id="filter-interviewed"
                        type="checkbox"
                        checked={filters.interviewed}
                        onChange={(e) => setFilters({ ...filters, interviewed: e.target.checked })}
                        className="h-4 w-4 text-green-500 border-gray-600 rounded bg-gray-700 focus:ring-green-500"
                      />
                      <div className="ml-3 flex-1">
                        <div className="text-sm font-medium text-white">Interviewed</div>
                        <div className="text-xs text-gray-400">Show interviewed candidates</div>
                      </div>
                    </label>
                    <label
                      htmlFor="filter-top-match"
                      className="flex items-center p-3 rounded-lg border border-gray-700 bg-gray-700/30 hover:bg-gray-700/50 cursor-pointer transition-colors"
                    >
                      <input
                        id="filter-top-match"
                        type="checkbox"
                        checked={filters.topMatch}
                        onChange={(e) => setFilters({ ...filters, topMatch: e.target.checked })}
                        className="h-4 w-4 text-green-500 border-gray-600 rounded bg-gray-700 focus:ring-green-500"
                      />
                      <div className="ml-3 flex-1">
                        <div className="text-sm font-medium text-white">Top Match</div>
                        <div className="text-xs text-gray-400">Show candidates with &gt;90% match</div>
                      </div>
                    </label>
                  </div>
                </div>
              </div>

              {/* Export Options */}
              <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
                <div className="p-5 border-b border-gray-700">
                  <h2 className="text-lg font-medium text-white">Export Options</h2>
                </div>
                <div className="p-5">
                  <div className="mb-6">
                    <button
                      onClick={() => {
                        if (selectedCandidates.size === 0) {
                          alert('Please select at least one candidate to export.')
                          return
                        }
                        alert(`Exporting ${selectedCandidates.size} candidates... (Mock action)`)
                      }}
                      className="w-full mb-3 inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-gray-900 bg-gradient-to-r from-green-400 to-emerald-500 hover:from-green-500 hover:to-emerald-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                    >
                      <FontAwesomeIcon icon={faFileExport} className="mr-2" />
                      Export Selected Candidates
                    </button>
                    <button
                      onClick={() => {
                        if (selectedCandidates.size === 0) {
                          alert('Please select at least one candidate to save.')
                          return
                        }
                        alert(`Saving shortlist with ${selectedCandidates.size} candidates... (Mock action)`)
                      }}
                      className="w-full inline-flex items-center justify-center px-4 py-2 border border-gray-600 rounded-md shadow-sm text-sm font-medium text-white bg-gray-700 hover:bg-gray-600 focus:outline-none"
                    >
                      <FontAwesomeIcon icon={faSave} className="mr-2" />
                      Save Shortlist
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Right column - Candidate Table */}
            <div className="lg:col-span-2">
              <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
                <div className="p-5 border-b border-gray-700 flex justify-between items-center">
                  <h2 className="text-lg font-medium text-white">Candidates</h2>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FontAwesomeIcon icon={faSearch} className="text-gray-500" />
                    </div>
                    <input
                      type="text"
                      placeholder="Search candidates..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 pr-3 py-2 border border-gray-700 rounded-md leading-5 bg-gray-700 text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500 sm:text-sm"
                    />
                  </div>
                </div>

                {/* Candidate List */}
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-700">
                    <thead className="bg-gray-700">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider w-10">
                          <input
                            type="checkbox"
                            checked={filteredCandidates.length > 0 && selectedCandidates.size === filteredCandidates.length}
                            onChange={(e) => handleMainCheckboxChange(e.target.checked)}
                            className="h-4 w-4 text-green-500 border-gray-600 rounded bg-gray-700 focus:ring-green-500"
                          />
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                          Candidate
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                          Skills
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                          Match
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                          Status
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-gray-800 divide-y divide-gray-700">
                      {filteredCandidates.length === 0 ? (
                        <tr>
                          <td colSpan={6} className="px-6 py-4 text-center text-gray-400">
                            No candidates found
                          </td>
                        </tr>
                      ) : (
                        filteredCandidates.map((candidate) => {
                          const application = candidate.applications.find(app => app.job_id === jobId || !jobId)
                          const status = application?.status || 'applied'
                          const isSelected = selectedCandidates.has(candidate.id)

                          return (
                            <tr key={candidate.id} className={clsx('hover:bg-gray-700', isSelected && 'bg-gray-750')}>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <input
                                  type="checkbox"
                                  checked={isSelected}
                                  onChange={() => handleToggleCandidate(candidate.id)}
                                  className="h-4 w-4 text-green-500 border-gray-600 rounded bg-gray-700 focus:ring-green-500"
                                />
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                  <div className="h-10 w-10 rounded-full bg-gray-600 flex items-center justify-center mr-3">
                                    <span className="text-white text-sm font-medium">
                                      {candidate.full_name.charAt(0).toUpperCase()}
                                    </span>
                                  </div>
                                  <div>
                                    <div className="text-sm font-medium text-white">{candidate.full_name}</div>
                                    <div className="text-xs text-gray-400">{candidate.email}</div>
                                  </div>
                                </div>
                              </td>
                              <td className="px-6 py-4">
                                <div className="flex flex-wrap gap-1">
                                  {candidate.skills.slice(0, 3).map((skill) => (
                                    <span
                                      key={skill.id}
                                      className="px-2 py-0.5 bg-gray-700 rounded-full text-xs text-gray-300"
                                    >
                                      {skill.skill}
                                    </span>
                                  ))}
                                  {candidate.skills.length > 3 && (
                                    <span className="px-2 py-0.5 bg-gray-700 rounded-full text-xs text-gray-300">
                                      +{candidate.skills.length - 3}
                                    </span>
                                  )}
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                {candidate.matchPercentage !== undefined ? (
                                  <div className={clsx('text-sm font-medium', getMatchColor(candidate.matchPercentage))}>
                                    {candidate.matchPercentage}%
                                  </div>
                                ) : (
                                  <div className="text-sm text-gray-400">N/A</div>
                                )}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span
                                  className={clsx(
                                    'px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full',
                                    getStatusBadge(status)
                                  )}
                                >
                                  {status.charAt(0).toUpperCase() + status.slice(1)}
                                </span>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <Link
                                  href={`/dashboard/candidates/${candidate.id}`}
                                  className="text-green-400 hover:text-green-300"
                                  title="View candidate details"
                                >
                                  <FontAwesomeIcon icon={faEye} className="h-4 w-4" />
                                </Link>
                              </td>
                            </tr>
                          )
                        })
                      )}
                    </tbody>
                  </table>
                </div>

                {/* Pagination */}
                <div className="bg-gray-900 px-6 py-4 border-t border-gray-700 flex items-center justify-between">
                  <div className="text-sm text-gray-400">
                    Showing <span className="font-medium">1</span> to{' '}
                    <span className="font-medium">{filteredCandidates.length}</span> of{' '}
                    <span className="font-medium">{filteredCandidates.length}</span> candidates
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

export default function CandidatesPage() {
  return (
    <Suspense fallback={
      <div className="px-4 sm:px-6 lg:px-8 py-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center h-64">
            <p className="text-gray-400">Loading...</p>
          </div>
        </div>
      </div>
    }>
      <CandidatesPageContent />
    </Suspense>
  )
}

