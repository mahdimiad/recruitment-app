'use client'

import { useState, useEffect } from 'react'
import {
  getDashboardStats,
  getRecentActivity,
  getApplicationsChartData,
  getTopCandidates,
  getRecentJobs,
  getJobsByCompany,
  getScoreDistributionData,
  getHiringFunnelData,
} from '@/lib/mock-db'
import { getDateRangeForPeriod, type Period } from '@/lib/utils/dateRanges'
import StatsCard from '@/components/dashboard/StatsCard'
import RecentActivity from '@/components/dashboard/RecentActivity'
import ApplicationsChart from '@/components/dashboard/ApplicationsChart'
import JobStatusChart from '@/components/dashboard/JobStatusChart'
import RecentJobs from '@/components/dashboard/RecentJobs'
import TopCandidates from '@/components/dashboard/TopCandidates'
import ScoreDistributionChart from '@/components/dashboard/ScoreDistributionChart'
import ApplicationStatusChart from '@/components/dashboard/HiringFunnelChart'
import DashboardPeriodSelector from '@/components/dashboard/DashboardPeriodSelector'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faBriefcase,
  faUsers,
  faFileAlt,
  faCheckCircle,
} from '@fortawesome/free-solid-svg-icons'

export default function DashboardContent() {
  const companyId = 'company-1'
  const [selectedPeriod, setSelectedPeriod] = useState<Period>('this-month')
  const [loading, setLoading] = useState(true)
  const [dashboardData, setDashboardData] = useState<{
    stats: any
    activities: any[]
    chartData: any[]
    topCandidates: any[]
    recentJobs: any[]
    allJobs: any[]
    scoreDistributionData: any[]
    hiringFunnelData: any[]
    jobStatusData: any[]
  } | null>(null)

  useEffect(() => {
    const loadDashboardData = async () => {
      setLoading(true)
      const dateRange = getDateRangeForPeriod(selectedPeriod)
      
      const [
        stats,
        activities,
        chartData,
        topCandidates,
        recentJobs,
        allJobs,
        scoreDistributionData,
        hiringFunnelData,
      ] = await Promise.all([
        getDashboardStats(companyId, dateRange),
        getRecentActivity(companyId, 15, dateRange),
        getApplicationsChartData(companyId, dateRange),
        getTopCandidates(companyId, 5),
        getRecentJobs(companyId, 5),
        getJobsByCompany(companyId),
        getScoreDistributionData(companyId, dateRange),
        getHiringFunnelData(companyId, dateRange),
      ])

      const jobStatusData = [
        {
          name: 'Published',
          value: stats.publishedJobs,
          color: '#10b981',
        },
        {
          name: 'Draft',
          value: stats.draftJobs,
          color: '#3b82f6',
        },
        {
          name: 'Closed',
          value: allJobs.filter(j => j.status === 'closed').length,
          color: '#f59e0b',
        },
      ].filter(item => item.value > 0)

      setDashboardData({
        stats,
        activities,
        chartData,
        topCandidates,
        recentJobs,
        allJobs,
        scoreDistributionData,
        hiringFunnelData,
        jobStatusData,
      })
      setLoading(false)
    }

    loadDashboardData()
  }, [selectedPeriod])

  if (loading || !dashboardData) {
    return (
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center h-64">
            <p className="text-gray-400">Loading dashboard...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8 pt-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">Dashboard</h1>
            <p className="text-gray-400 mt-2">Welcome back! Here's what's happening with your recruitment.</p>
          </div>
          <DashboardPeriodSelector
            selectedPeriod={selectedPeriod}
            onPeriodChange={setSelectedPeriod}
          />
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatsCard
            title="Total Jobs"
            value={dashboardData.stats.totalJobs}
            icon={faBriefcase}
            iconBgColor="indigo"
            iconTextColor="indigo"
            gradientColor="indigo"
            trend={{
              text: `${dashboardData.stats.publishedJobs} published`,
              isPositive: true,
            }}
          />
          <StatsCard
            title="Total Candidates"
            value={dashboardData.stats.totalCandidates}
            icon={faUsers}
            iconBgColor="blue"
            iconTextColor="blue"
            gradientColor="blue"
            trend={{
              text: 'Active candidates',
              isPositive: true,
            }}
          />
          <StatsCard
            title="Total Applications"
            value={dashboardData.stats.totalApplications}
            icon={faFileAlt}
            iconBgColor="purple"
            iconTextColor="purple"
            gradientColor="purple"
            trend={{
              text: 'This month',
              isPositive: true,
            }}
          />
          <StatsCard
            title="Shortlisted"
            value={dashboardData.stats.shortlistedCandidates}
            icon={faCheckCircle}
            iconBgColor="green"
            iconTextColor="green"
            gradientColor="green"
            trend={{
              text: `${dashboardData.stats.hiredCandidates} hired`,
              isPositive: true,
            }}
          />
        </div>

        {/* Score Distribution and Application Status Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <ScoreDistributionChart data={dashboardData.scoreDistributionData} />
          <ApplicationStatusChart data={dashboardData.hiringFunnelData} />
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <ApplicationsChart data={dashboardData.chartData} />
          {dashboardData.jobStatusData.length > 0 && (
            <JobStatusChart data={dashboardData.jobStatusData} />
          )}
        </div>

        {/* Recent Activity and Lists Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2">
            <RecentActivity activities={dashboardData.activities} />
          </div>
          <div className="space-y-6">
            <TopCandidates candidates={dashboardData.topCandidates} />
            <RecentJobs jobs={dashboardData.recentJobs} />
          </div>
        </div>
      </div>
    </div>
  )
}

