import { getDashboardStats } from '@/lib/mock-db'

/**
 * Dashboard Page - Example using Mock Database
 * 
 * This is an example of how to use the mock database service.
 * Replace with Supabase queries when ready.
 */
export default async function DashboardPage() {
  // Use mock database - replace with Supabase later
  const stats = await getDashboardStats('company-1')

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Total Jobs */}
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <h3 className="text-gray-400 text-sm font-medium mb-2">Total Jobs</h3>
            <p className="text-3xl font-bold text-white">{stats.totalJobs}</p>
            <p className="text-sm text-gray-500 mt-2">
              {stats.publishedJobs} published, {stats.draftJobs} draft
            </p>
          </div>

          {/* Total Candidates */}
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <h3 className="text-gray-400 text-sm font-medium mb-2">Total Candidates</h3>
            <p className="text-3xl font-bold text-white">{stats.totalCandidates}</p>
          </div>

          {/* Total Applications */}
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <h3 className="text-gray-400 text-sm font-medium mb-2">Total Applications</h3>
            <p className="text-3xl font-bold text-white">{stats.totalApplications}</p>
          </div>

          {/* Shortlisted */}
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <h3 className="text-gray-400 text-sm font-medium mb-2">Shortlisted</h3>
            <p className="text-3xl font-bold text-green-400">{stats.shortlistedCandidates}</p>
            <p className="text-sm text-gray-500 mt-2">
              {stats.interviewedCandidates} interviewed, {stats.hiredCandidates} hired
            </p>
          </div>
        </div>

        <div className="mt-8 bg-gray-800 rounded-lg p-6 border border-gray-700">
          <h2 className="text-xl font-semibold mb-4">Mock Database Active</h2>
          <p className="text-gray-400">
            This dashboard is using the mock database service. Once you set up Supabase,
            replace the <code className="bg-gray-700 px-2 py-1 rounded">getDashboardStats</code> call
            with a Supabase query.
          </p>
        </div>
      </div>
    </div>
  )
}

