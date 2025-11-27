'use client'

import { useState, useEffect } from 'react'
import Breadcrumbs from '@/components/layout/Breadcrumbs'
import StatsCard from '@/components/dashboard/StatsCard'
import ScoreDistributionChart from '@/components/dashboard/ScoreDistributionChart'
import ApplicationStatusChart from '@/components/dashboard/HiringFunnelChart'
import TopJobsChart from '@/components/reports/TopJobsChart'
import CVUploadTrendChart from '@/components/reports/CVUploadTrendChart'
import AIInsights from '@/components/reports/AIInsights'
import {
  getReportsStats,
  getScoreDistributionData,
  getHiringFunnelData,
  getTopJobsData,
  getCVUploadTrendData,
} from '@/lib/mock-db'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faFileAlt,
  faClipboardCheck,
  faUserCheck,
  faStarHalfAlt,
  faClock,
  faDownload,
  faPrint,
  faChevronDown,
  faSlidersH,
} from '@fortawesome/free-solid-svg-icons'
import { getDateRangeForPeriod, type Period } from '@/lib/utils/dateRanges'

type DateRangeOption = '30' | '90' | 'month' | 'quarter' | 'year' | 'custom'

export default function ReportsPage() {
  const companyId = 'company-1'
  const [loading, setLoading] = useState(true)
  const [dateRange, setDateRange] = useState<DateRangeOption>('month')
  const [customStartDate, setCustomStartDate] = useState('')
  const [customEndDate, setCustomEndDate] = useState('')
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false)
  const [showExportDropdown, setShowExportDropdown] = useState(false)
  const [jobTitleFilter, setJobTitleFilter] = useState('all')
  const [candidateStatusFilter, setCandidateStatusFilter] = useState('all')
  const [skillsFilter, setSkillsFilter] = useState('all')
  const [experienceFilter, setExperienceFilter] = useState('all')
  const [sourceFilter, setSourceFilter] = useState('all')

  const [reportsData, setReportsData] = useState<{
    stats: any
    scoreDistribution: any[]
    hiringFunnel: any[]
    topJobs: any[]
    cvUploadTrend: any[]
  } | null>(null)

  // Close export dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (showExportDropdown && !(event.target as Element).closest('.export-dropdown-container')) {
        setShowExportDropdown(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [showExportDropdown])

  useEffect(() => {
    const loadReportsData = async () => {
      setLoading(true)
      try {
        // Calculate date range
        let startDate: Date
        let endDate: Date = new Date()

        if (dateRange === 'custom' && customStartDate && customEndDate) {
          startDate = new Date(customStartDate)
          endDate = new Date(customEndDate)
        } else if (dateRange === '30') {
          // Last 30 days
          endDate = new Date()
          startDate = new Date()
          startDate.setDate(startDate.getDate() - 30)
        } else if (dateRange === '90') {
          // Last 90 days
          endDate = new Date()
          startDate = new Date()
          startDate.setDate(startDate.getDate() - 90)
        } else if (dateRange === 'quarter') {
          // This quarter
          const now = new Date()
          const quarter = Math.floor(now.getMonth() / 3)
          startDate = new Date(now.getFullYear(), quarter * 3, 1)
          endDate = new Date()
        } else if (dateRange === 'year') {
          // This year
          const now = new Date()
          startDate = new Date(now.getFullYear(), 0, 1)
          endDate = new Date()
        } else {
          // This month (default)
          const range = getDateRangeForPeriod('this-month')
          startDate = range.startDate
          endDate = range.endDate
        }

        const dateRangeObj = { startDate, endDate }

        const [stats, scoreDistribution, hiringFunnel, topJobs, cvUploadTrend] = await Promise.all([
          getReportsStats(companyId, dateRangeObj),
          getScoreDistributionData(companyId, dateRangeObj),
          getHiringFunnelData(companyId, dateRangeObj),
          getTopJobsData(companyId, dateRangeObj),
          getCVUploadTrendData(companyId),
        ])

        setReportsData({
          stats,
          scoreDistribution,
          hiringFunnel,
          topJobs,
          cvUploadTrend,
        })
      } catch (error) {
        console.error('Failed to load reports data:', error)
      } finally {
        setLoading(false)
      }
    }

    loadReportsData()
  }, [dateRange, customStartDate, customEndDate, jobTitleFilter, candidateStatusFilter])

  const handleExport = (format: 'pdf' | 'csv' | 'email') => {
    // Placeholder for export functionality
    if (process.env.NODE_ENV === 'development') {
      console.log(`Exporting as ${format}`)
    }
    setShowExportDropdown(false)
    alert(`Export as ${format.toUpperCase()} functionality will be implemented`)
  }

  const handlePrint = () => {
    window.print()
  }

  if (loading || !reportsData) {
    return (
      <div className="px-4 sm:px-6 lg:px-8 py-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center h-64">
            <p className="text-gray-400">Loading reports...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6">
      <div className="max-w-7xl mx-auto">
        <Breadcrumbs
          items={[
            { label: 'Dashboard', href: '/dashboard' },
            { label: 'Reports', href: '/dashboard/reports' },
          ]}
        />

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 mt-6">
          <div>
            <h1 className="text-2xl font-bold text-white">Recruitment Analytics</h1>
            <p className="mt-1 text-gray-400">Track your recruitment performance and insights</p>
          </div>
          <div className="mt-4 md:mt-0 flex space-x-3">
            <div className="relative export-dropdown-container">
              <button
                onClick={() => setShowExportDropdown(!showExportDropdown)}
                className="inline-flex items-center px-4 py-2 border border-gray-600 rounded-md shadow-sm text-sm font-medium text-white bg-gray-700 hover:bg-gray-600 focus:outline-none"
              >
                <FontAwesomeIcon icon={faDownload} className="mr-2" />
                Export
                <FontAwesomeIcon icon={faChevronDown} className="ml-2 text-xs" />
              </button>
              {showExportDropdown && (
                <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-gray-800 ring-1 ring-black ring-opacity-5 divide-y divide-gray-700 z-10">
                  <div className="py-1">
                    <button
                      onClick={() => handleExport('pdf')}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700"
                    >
                      <FontAwesomeIcon icon={faFileAlt} className="mr-2 text-red-400" />
                      Export as PDF
                    </button>
                    <button
                      onClick={() => handleExport('csv')}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700"
                    >
                      <FontAwesomeIcon icon={faFileAlt} className="mr-2 text-green-400" />
                      Export as CSV
                    </button>
                    <button
                      onClick={() => handleExport('email')}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700"
                    >
                      <FontAwesomeIcon icon={faFileAlt} className="mr-2 text-blue-400" />
                      Send by Email
                    </button>
                  </div>
                </div>
              )}
            </div>
            <button
              onClick={handlePrint}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-gray-900 bg-gradient-to-r from-green-400 to-emerald-500 hover:from-green-500 hover:to-emerald-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              <FontAwesomeIcon icon={faPrint} className="mr-2" />
              Print Report
            </button>
          </div>
        </div>

        {/* Filters Bar */}
        <div className="bg-gray-800 rounded-lg shadow-lg p-4 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Date Range Picker */}
            <div>
              <label htmlFor="date-range" className="block text-sm font-medium text-gray-400 mb-1">
                Date Range
              </label>
              <select
                id="date-range"
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value as DateRangeOption)}
                className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
              >
                <option value="30">Last 30 days</option>
                <option value="90">Last 90 days</option>
                <option value="month">This month</option>
                <option value="quarter">This quarter</option>
                <option value="year">This year</option>
                <option value="custom">Custom range</option>
              </select>
            </div>

            {/* Custom Date Range */}
            {dateRange === 'custom' && (
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-400 mb-1">Custom Range</label>
                <div className="flex space-x-2">
                  <div className="relative flex-1">
                    <input
                      type="date"
                      value={customStartDate}
                      onChange={(e) => setCustomStartDate(e.target.value)}
                      className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
                    />
                  </div>
                  <span className="text-gray-400 flex items-center">to</span>
                  <div className="relative flex-1">
                    <input
                      type="date"
                      value={customEndDate}
                      onChange={(e) => setCustomEndDate(e.target.value)}
                      className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Job Title Filter */}
            <div>
              <label htmlFor="job-title" className="block text-sm font-medium text-gray-400 mb-1">
                Job Title
              </label>
              <select
                id="job-title"
                value={jobTitleFilter}
                onChange={(e) => setJobTitleFilter(e.target.value)}
                className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
              >
                <option value="all">All Positions</option>
                <option value="frontend">Frontend Developer</option>
                <option value="backend">Backend Developer</option>
                <option value="fullstack">Full Stack Developer</option>
                <option value="designer">UX Designer</option>
                <option value="product">Product Manager</option>
              </select>
            </div>

            {/* Candidate Status Filter */}
            <div>
              <label htmlFor="candidate-status" className="block text-sm font-medium text-gray-400 mb-1">
                Candidate Status
              </label>
              <select
                id="candidate-status"
                value={candidateStatusFilter}
                onChange={(e) => setCandidateStatusFilter(e.target.value)}
                className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
              >
                <option value="all">All Statuses</option>
                <option value="applied">Applied</option>
                <option value="shortlisted">Shortlisted</option>
                <option value="interviewed">Interviewed</option>
                <option value="hired">Hired</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
          </div>

          {/* Advanced Filters Toggle */}
          <div
            onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
            className="mt-4 flex items-center text-sm text-gray-400 hover:text-green-400 cursor-pointer"
          >
            <FontAwesomeIcon icon={faSlidersH} className="mr-2" />
            <span>Advanced Filters</span>
            <FontAwesomeIcon
              icon={faChevronDown}
              className={`ml-1 text-xs transition-transform ${showAdvancedFilters ? 'rotate-180' : ''}`}
            />
          </div>

          {/* Advanced Filters */}
          {showAdvancedFilters && (
            <div className="pt-4 mt-4 border-t border-gray-700 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label htmlFor="skills" className="block text-sm font-medium text-gray-400 mb-1">
                  Skills
                </label>
                <select
                  id="skills"
                  value={skillsFilter}
                  onChange={(e) => setSkillsFilter(e.target.value)}
                  className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
                >
                  <option value="all">All Skills</option>
                  <option value="javascript">JavaScript</option>
                  <option value="react">React</option>
                  <option value="python">Python</option>
                  <option value="java">Java</option>
                  <option value="design">UX Design</option>
                </select>
              </div>
              <div>
                <label htmlFor="experience" className="block text-sm font-medium text-gray-400 mb-1">
                  Experience Level
                </label>
                <select
                  id="experience"
                  value={experienceFilter}
                  onChange={(e) => setExperienceFilter(e.target.value)}
                  className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
                >
                  <option value="all">All Levels</option>
                  <option value="entry">Entry Level (0-2 years)</option>
                  <option value="mid">Mid Level (3-5 years)</option>
                  <option value="senior">Senior (6+ years)</option>
                </select>
              </div>
              <div>
                <label htmlFor="source" className="block text-sm font-medium text-gray-400 mb-1">
                  Candidate Source
                </label>
                <select
                  id="source"
                  value={sourceFilter}
                  onChange={(e) => setSourceFilter(e.target.value)}
                  className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
                >
                  <option value="all">All Sources</option>
                  <option value="careers">Careers Page</option>
                  <option value="linkedin">LinkedIn</option>
                  <option value="indeed">Indeed</option>
                  <option value="referral">Referral</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>
          )}

          {/* Apply Filters Button */}
          <div className="mt-4 flex justify-end">
            <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-gray-900 bg-gradient-to-r from-green-400 to-emerald-500 hover:from-green-500 hover:to-emerald-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
              Apply Filters
            </button>
          </div>
        </div>

        {/* AI Insights Section */}
        <AIInsights stats={reportsData.stats} />

        {/* Key Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
          <StatsCard
            title="Total CVs Uploaded"
            value={reportsData.stats.totalCVs}
            icon={faFileAlt}
            iconBgColor="indigo"
            iconTextColor="indigo"
            gradientColor="indigo"
            trend={{
              text: `${reportsData.stats.cvIncrease}% increase`,
              isPositive: true,
            }}
          />
          <StatsCard
            title="Candidates Shortlisted"
            value={reportsData.stats.shortlisted}
            icon={faClipboardCheck}
            iconBgColor="blue"
            iconTextColor="blue"
            gradientColor="blue"
            trend={{
              text: `${reportsData.stats.shortlistedIncrease}% increase`,
              isPositive: true,
            }}
          />
          <StatsCard
            title="Candidates Hired"
            value={reportsData.stats.hired}
            icon={faUserCheck}
            iconBgColor="green"
            iconTextColor="green"
            gradientColor="green"
            trend={{
              text: reportsData.stats.hiredChange === 0 ? 'Same as last period' : `${Math.abs(reportsData.stats.hiredChange)} ${reportsData.stats.hiredChange > 0 ? 'increase' : 'decrease'}`,
              isPositive: reportsData.stats.hiredChange >= 0,
            }}
          />
          <StatsCard
            title="Avg. Score (Top 10%)"
            value={reportsData.stats.avgScore}
            icon={faStarHalfAlt}
            iconBgColor="purple"
            iconTextColor="purple"
            gradientColor="purple"
            trend={{
              text: `${reportsData.stats.scoreIncrease} points increase`,
              isPositive: true,
            }}
          />
          <StatsCard
            title="Avg. Time to Hire"
            value={`${reportsData.stats.avgTimeToHire}`}
            subtitle="days"
            icon={faClock}
            iconBgColor="yellow"
            iconTextColor="yellow"
            gradientColor="yellow"
            trend={{
              text: `${reportsData.stats.timeImprovement} days improvement`,
              isPositive: true,
            }}
          />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <ScoreDistributionChart data={reportsData.scoreDistribution} />
          <ApplicationStatusChart data={reportsData.hiringFunnel} />
          <TopJobsChart data={reportsData.topJobs} />
          <CVUploadTrendChart data={reportsData.cvUploadTrend} />
        </div>
      </div>
    </div>
  )
}

