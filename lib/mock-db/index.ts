/**
 * Mock Database Service
 * 
 * This service reads from a JSON file to simulate Supabase database.
 * Once Supabase is set up, replace these functions with actual Supabase queries.
 * 
 * Usage:
 * - Import: import { getJobs, getCandidates } from '@/lib/mock-db'
 * - Use in components: const jobs = await getJobs('company-1')
 * 
 * Migration to Supabase:
 * - Replace these functions with Supabase client calls
 * - Keep the same function signatures for easy migration
 */

import data from './data.json'
import type { Database } from '@/types/database'

const db = data as Database

// Simulate async database calls
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

/**
 * Get all companies
 */
export async function getCompanies(): Promise<Database['companies']> {
  await delay(100) // Simulate network delay
  return db.companies
}

/**
 * Get company by ID
 */
export async function getCompanyById(id: string): Promise<Database['companies'][0] | null> {
  await delay(100)
  return db.companies.find(company => company.id === id) || null
}

/**
 * Get all profiles
 */
export async function getProfiles(): Promise<Database['profiles']> {
  await delay(100)
  return db.profiles
}

/**
 * Get profile by ID
 */
export async function getProfileById(id: string): Promise<Database['profiles'][0] | null> {
  await delay(100)
  return db.profiles.find(profile => profile.id === id) || null
}

/**
 * Get profiles by company ID
 */
export async function getProfilesByCompany(companyId: string): Promise<Database['profiles']> {
  await delay(100)
  return db.profiles.filter(profile => profile.company_id === companyId)
}

/**
 * Get all jobs
 */
export async function getJobs(): Promise<Database['jobs']> {
  await delay(100)
  return db.jobs
}

/**
 * Get jobs by company ID
 */
export async function getJobsByCompany(companyId: string): Promise<Database['jobs']> {
  await delay(100)
  return db.jobs.filter(job => job.company_id === companyId)
}

/**
 * Get job by ID
 */
export async function getJobById(id: string): Promise<Database['jobs'][0] | null> {
  await delay(100)
  return db.jobs.find(job => job.id === id) || null
}

/**
 * Get jobs by status
 */
export async function getJobsByStatus(
  companyId: string,
  status: Database['jobs'][0]['status']
): Promise<Database['jobs']> {
  await delay(100)
  return db.jobs.filter(job => job.company_id === companyId && job.status === status)
}

/**
 * Get job requirements by job ID
 */
export async function getJobRequirements(jobId: string): Promise<Database['job_requirements']> {
  await delay(100)
  return db.job_requirements.filter(req => req.job_id === jobId)
}

/**
 * Get all candidates
 */
export async function getCandidates(): Promise<Database['candidates']> {
  await delay(100)
  return db.candidates
}

/**
 * Get candidates by company ID
 */
export async function getCandidatesByCompany(companyId: string): Promise<Database['candidates']> {
  await delay(100)
  return db.candidates.filter(candidate => candidate.company_id === companyId)
}

/**
 * Get candidate by ID
 */
export async function getCandidateById(id: string): Promise<Database['candidates'][0] | null> {
  await delay(100)
  return db.candidates.find(candidate => candidate.id === id) || null
}

/**
 * Get candidate skills by candidate ID
 */
export async function getCandidateSkills(candidateId: string): Promise<Database['candidate_skills']> {
  await delay(100)
  return db.candidate_skills.filter(skill => skill.candidate_id === candidateId)
}

/**
 * Get all applications
 */
export async function getApplications(): Promise<Database['applications']> {
  await delay(100)
  return db.applications
}

/**
 * Get applications by job ID
 */
export async function getApplicationsByJob(jobId: string): Promise<Database['applications']> {
  await delay(100)
  return db.applications.filter(app => app.job_id === jobId)
}

/**
 * Get applications by candidate ID
 */
export async function getApplicationsByCandidate(candidateId: string): Promise<Database['applications']> {
  await delay(100)
  return db.applications.filter(app => app.candidate_id === candidateId)
}

/**
 * Get application by ID
 */
export async function getApplicationById(id: string): Promise<Database['applications'][0] | null> {
  await delay(100)
  return db.applications.find(app => app.id === id) || null
}

/**
 * Get scores by application ID
 */
export async function getScoresByApplication(applicationId: string): Promise<Database['scores']> {
  await delay(100)
  return db.scores.filter(score => score.application_id === applicationId)
}

/**
 * Get notes by candidate ID
 */
export async function getNotesByCandidate(candidateId: string): Promise<Database['notes']> {
  await delay(100)
  return db.notes.filter(note => note.candidate_id === candidateId)
}

/**
 * Get notes by job ID
 */
export async function getNotesByJob(jobId: string): Promise<Database['notes']> {
  await delay(100)
  return db.notes.filter(note => note.job_id === jobId)
}

/**
 * Get all notes for a company (by company's jobs and candidates)
 */
export async function getNotesByCompany(companyId: string): Promise<Database['notes']> {
  await delay(100)
  const jobs = await getJobsByCompany(companyId)
  const candidates = await getCandidatesByCompany(companyId)
  const jobIds = jobs.map(j => j.id)
  const candidateIds = candidates.map(c => c.id)
  
  return db.notes.filter(note => 
    (note.job_id && jobIds.includes(note.job_id)) ||
    (note.candidate_id && candidateIds.includes(note.candidate_id))
  )
}

/**
 * Get subscription by company ID
 */
export async function getSubscriptionByCompany(companyId: string): Promise<Database['subscriptions'][0] | null> {
  await delay(100)
  return db.subscriptions.find(sub => sub.company_id === companyId) || null
}

/**
 * Get usage metrics by company ID
 */
export async function getUsageMetricsByCompany(companyId: string): Promise<Database['usage_metrics']> {
  await delay(100)
  return db.usage_metrics.filter(metric => metric.company_id === companyId)
}

/**
 * Get dashboard statistics for a company
 */
export async function getDashboardStats(
  companyId: string,
  dateRange?: { startDate: Date; endDate: Date }
) {
  await delay(150)
  
  const jobs = await getJobsByCompany(companyId)
  const candidates = await getCandidatesByCompany(companyId)
  const applications = await getApplications()
  
  let companyApplications = applications.filter(app => {
    const job = jobs.find(j => j.id === app.job_id)
    return job?.company_id === companyId
  })

  // Filter by date range if provided
  if (dateRange) {
    companyApplications = companyApplications.filter(app => {
      const appDate = new Date(app.created_at)
      return appDate >= dateRange.startDate && appDate <= dateRange.endDate
    })
  }

  return {
    totalJobs: jobs.length,
    publishedJobs: jobs.filter(j => j.status === 'published').length,
    draftJobs: jobs.filter(j => j.status === 'draft').length,
    totalCandidates: candidates.length,
    totalApplications: companyApplications.length,
    shortlistedCandidates: companyApplications.filter(a => a.status === 'shortlisted').length,
    interviewedCandidates: companyApplications.filter(a => a.status === 'interviewed').length,
    hiredCandidates: companyApplications.filter(a => a.status === 'hired').length,
  }
}

/**
 * Get candidate with full details (candidate + skills + applications)
 */
export async function getCandidateWithDetails(candidateId: string) {
  await delay(150)
  
  const candidate = await getCandidateById(candidateId)
  if (!candidate) return null

  const skills = await getCandidateSkills(candidateId)
  const applications = await getApplicationsByCandidate(candidateId)
  const notes = await getNotesByCandidate(candidateId)

  // Get job details for each application
  const applicationsWithJobs = await Promise.all(
    applications.map(async (app) => {
      const job = await getJobById(app.job_id)
      const scores = await getScoresByApplication(app.id)
      return {
        ...app,
        job,
        scores,
      }
    })
  )

  return {
    ...candidate,
    skills,
    applications: applicationsWithJobs,
    notes,
  }
}

/**
 * Get job with full details (job + requirements + applications)
 */
export async function getJobWithDetails(jobId: string) {
  await delay(150)
  
  const job = await getJobById(jobId)
  if (!job) return null

  const requirements = await getJobRequirements(jobId)
  const applications = await getApplicationsByJob(jobId)

  // Get candidate details for each application
  const applicationsWithCandidates = await Promise.all(
    applications.map(async (app) => {
      const candidate = await getCandidateById(app.candidate_id)
      const scores = await getScoresByApplication(app.id)
      return {
        ...app,
        candidate,
        scores,
      }
    })
  )

  return {
    ...job,
    requirements,
    applications: applicationsWithCandidates,
  }
}

/**
 * Get recent activity for dashboard
 */
export async function getRecentActivity(
  companyId: string,
  limit: number = 10,
  dateRange?: { startDate: Date; endDate: Date }
) {
  await delay(150)
  
  const jobs = await getJobsByCompany(companyId)
  const candidates = await getCandidatesByCompany(companyId)
  const applications = await getApplications()
  const allNotes = await getNotesByCompany(companyId)
  
  let companyApplications = applications.filter(app => {
    const job = jobs.find(j => j.id === app.job_id)
    return job?.company_id === companyId
  })

  // Filter by date range if provided
  if (dateRange) {
    companyApplications = companyApplications.filter(app => {
      const appDate = new Date(app.created_at)
      return appDate >= dateRange.startDate && appDate <= dateRange.endDate
    })
  }

  const activities: Array<{
    id: string
    type: 'job_created' | 'candidate_added' | 'application_received' | 'status_changed' | 'note_added'
    title: string
    description: string
    timestamp: string
    link?: string
  }> = []

  // Recent jobs (all jobs)
  jobs
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    .forEach(job => {
      activities.push({
        id: `job-${job.id}`,
        type: 'job_created',
        title: `New job posted: ${job.title}`,
        description: `Status: ${job.status}`,
        timestamp: job.created_at,
        link: `/dashboard/jobs/${job.id}`,
      })
    })

  // Recent candidates (all candidates)
  candidates
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    .forEach(candidate => {
      activities.push({
        id: `candidate-${candidate.id}`,
        type: 'candidate_added',
        title: `New candidate: ${candidate.full_name}`,
        description: candidate.email,
        timestamp: candidate.created_at,
        link: `/dashboard/candidates/${candidate.id}`,
      })
    })

  // Recent applications (more applications to get to 15 total)
  companyApplications
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    .slice(0, 8)
    .forEach(app => {
      const job = jobs.find(j => j.id === app.job_id)
      const candidate = candidates.find(c => c.id === app.candidate_id)
      if (job && candidate) {
        activities.push({
          id: `app-${app.id}`,
          type: 'application_received',
          title: `${candidate.full_name} applied for ${job.title}`,
          description: `Match: ${app.match_percentage}%`,
          timestamp: app.created_at,
          link: `/dashboard/candidates/${candidate.id}`,
        })
      }
    })

  // Status changes (from applications that were updated)
  companyApplications
    .filter(app => app.updated_at !== app.created_at)
    .sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime())
    .slice(0, 3)
    .forEach(app => {
      const job = jobs.find(j => j.id === app.job_id)
      const candidate = candidates.find(c => c.id === app.candidate_id)
      if (job && candidate && app.status !== 'applied') {
        activities.push({
          id: `status-${app.id}`,
          type: 'status_changed',
          title: `${candidate.full_name} status updated for ${job.title}`,
          description: `Status: ${app.status}`,
          timestamp: app.updated_at,
          link: `/dashboard/candidates/${candidate.id}`,
        })
      }
    })

  // Recent notes (all notes)
  allNotes
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    .forEach(note => {
      const candidate = candidates.find(c => c.id === note.candidate_id)
      const job = jobs.find(j => j.id === note.job_id)
      if (candidate && job) {
        activities.push({
          id: `note-${note.id}`,
          type: 'note_added',
          title: `Note added for ${candidate.full_name}`,
          description: note.content.substring(0, 50) + (note.content.length > 50 ? '...' : ''),
          timestamp: note.created_at,
          link: `/dashboard/candidates/${candidate.id}`,
        })
      }
    })

  // Sort by timestamp and return the last N results (most recent)
  const sortedActivities = activities
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
  
  // Return exactly the last N items (most recent)
  // This ensures we have exactly 15 activities for pagination demo
  return sortedActivities.slice(0, limit)
}

/**
 * Get chart data for applications over time
 */
export async function getApplicationsChartData(
  companyId: string,
  dateRange?: { startDate: Date; endDate: Date }
) {
  await delay(150)
  
  const jobs = await getJobsByCompany(companyId)
  const applications = await getApplications()
  
  let companyApplications = applications.filter(app => {
    const job = jobs.find(j => j.id === app.job_id)
    return job?.company_id === companyId
  })

  // Filter by date range if provided
  if (dateRange) {
    companyApplications = companyApplications.filter(app => {
      const appDate = new Date(app.created_at)
      return appDate >= dateRange.startDate && appDate <= dateRange.endDate
    })
  }

  // Determine date range for chart
  const startDate = dateRange?.startDate || new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
  const endDate = dateRange?.endDate || new Date()
  
  const data: Array<{ date: string; count: number }> = []
  
  // Generate data for each day in the range
  const currentDate = new Date(startDate)
  while (currentDate <= endDate) {
    const dateStr = currentDate.toISOString().split('T')[0]
    
    // Count applications for this specific date
    const count = companyApplications.filter(app => {
      const appDate = new Date(app.created_at).toISOString().split('T')[0]
      return appDate === dateStr
    }).length
    
    data.push({
      date: dateStr,
      count,
    })
    
    currentDate.setDate(currentDate.getDate() + 1)
  }
  
  return data
}

/**
 * Get score distribution data for chart
 */
export async function getScoreDistributionData(
  companyId: string,
  dateRange?: { startDate: Date; endDate: Date }
) {
  await delay(150)
  
  const jobs = await getJobsByCompany(companyId)
  const applications = await getApplications()
  const candidates = await getCandidatesByCompany(companyId)
  
  let companyApplications = applications.filter(app => {
    const job = jobs.find(j => j.id === app.job_id)
    return job?.company_id === companyId
  })

  // Filter by date range if provided
  if (dateRange) {
    companyApplications = companyApplications.filter(app => {
      const appDate = new Date(app.created_at)
      return appDate >= dateRange.startDate && appDate <= dateRange.endDate
    })
  }

  // Get all scores from applications (use match_percentage as score if available, otherwise use score field)
  const allScores: number[] = []
  for (const app of companyApplications) {
    // Use match_percentage if available, otherwise use score field, or default to 0
    const score = app.match_percentage || app.score || 0
    if (score > 0) {
      allScores.push(score)
    }
  }

  // If no scores, generate sample data
  if (allScores.length === 0) {
    return [
      { range: '0-19', count: 5 },
      { range: '20-39', count: 12 },
      { range: '40-59', count: 34 },
      { range: '60-69', count: 65 },
      { range: '70-79', count: 142 },
      { range: '80-89', count: 176 },
      { range: '90-100', count: 53 },
    ]
  }

  // Categorize scores into ranges
  const ranges = {
    '0-19': 0,
    '20-39': 0,
    '40-59': 0,
    '60-69': 0,
    '70-79': 0,
    '80-89': 0,
    '90-100': 0,
  }

  allScores.forEach(score => {
    if (score < 20) ranges['0-19']++
    else if (score < 40) ranges['20-39']++
    else if (score < 60) ranges['40-59']++
    else if (score < 70) ranges['60-69']++
    else if (score < 80) ranges['70-79']++
    else if (score < 90) ranges['80-89']++
    else ranges['90-100']++
  })

  return Object.entries(ranges).map(([range, count]) => ({
    range,
    count,
  }))
}

/**
 * Get hiring funnel data for chart
 * Note: Hiring funnel shows current pipeline state, not filtered by date range
 */
export async function getHiringFunnelData(
  companyId: string,
  dateRange?: { startDate: Date; endDate: Date }
) {
  await delay(150)
  
  const jobs = await getJobsByCompany(companyId)
  const applications = await getApplications()
  
  // Get all company applications (hiring funnel shows current state, not date-filtered)
  let companyApplications = applications.filter(app => {
    const job = jobs.find(j => j.id === app.job_id)
    return job?.company_id === companyId
  })

  // If date range is provided, we can optionally filter, but for funnel we show all
  // The funnel represents the current pipeline state regardless of when applications were created
  // However, if user wants to see funnel for a specific period, we filter by created_at
  let filteredApplications = companyApplications
  if (dateRange) {
    filteredApplications = companyApplications.filter(app => {
      const appDate = new Date(app.created_at)
      return appDate >= dateRange.startDate && appDate <= dateRange.endDate
    })
    
    // If no applications in date range, fall back to all applications to show current state
    if (filteredApplications.length === 0) {
      filteredApplications = companyApplications
    }
  }

  // Count by status
  const applied = filteredApplications.length
  const screened = filteredApplications.filter(app => app.status !== 'applied').length
  const shortlisted = filteredApplications.filter(app => app.status === 'shortlisted' || app.status === 'interviewed' || app.status === 'offered' || app.status === 'hired').length
  const interviewed = filteredApplications.filter(app => app.status === 'interviewed' || app.status === 'offered' || app.status === 'hired').length
  const offered = filteredApplications.filter(app => app.status === 'offered' || app.status === 'hired').length
  const hired = filteredApplications.filter(app => app.status === 'hired').length

  // Ensure we always return data (fallback to sample data if all counts are 0)
  const funnelData = [
    { stage: 'Applied', count: applied },
    { stage: 'Screened', count: screened },
    { stage: 'Shortlisted', count: shortlisted },
    { stage: 'Interviewed', count: interviewed },
    { stage: 'Offered', count: offered },
    { stage: 'Hired', count: hired },
  ]

  // If all counts are 0, return sample data to show the chart structure
  const totalCount = funnelData.reduce((sum, item) => sum + item.count, 0)
  if (totalCount === 0) {
    return [
      { stage: 'Applied', count: companyApplications.length || 35 },
      { stage: 'Screened', count: Math.floor((companyApplications.length || 35) * 0.64) },
      { stage: 'Shortlisted', count: Math.floor((companyApplications.length || 35) * 0.29) },
      { stage: 'Interviewed', count: Math.floor((companyApplications.length || 35) * 0.12) },
      { stage: 'Offered', count: Math.floor((companyApplications.length || 35) * 0.07) },
      { stage: 'Hired', count: Math.floor((companyApplications.length || 35) * 0.05) },
    ]
  }

  return funnelData
}

/**
 * Get top candidates by score
 */
export async function getTopCandidates(companyId: string, limit: number = 5) {
  await delay(150)
  
  const candidates = await getCandidatesByCompany(companyId)
  const applications = await getApplications()
  const jobs = await getJobsByCompany(companyId)
  
  const companyApplications = applications.filter(app => {
    const job = jobs.find(j => j.id === app.job_id)
    return job?.company_id === companyId
  })

  const candidatesWithScores = candidates.map(candidate => {
    const candidateApps = companyApplications.filter(app => app.candidate_id === candidate.id)
    const avgScore = candidateApps.length > 0
      ? candidateApps.reduce((sum, app) => sum + app.score, 0) / candidateApps.length
      : 0
    
    return {
      ...candidate,
      averageScore: avgScore,
      applicationCount: candidateApps.length,
    }
  })

  return candidatesWithScores
    .sort((a, b) => b.averageScore - a.averageScore)
    .slice(0, limit)
}

/**
 * Get recent jobs
 */
export async function getRecentJobs(companyId: string, limit: number = 5) {
  await delay(100)
  
  const jobs = await getJobsByCompany(companyId)
  const applications = await getApplications()
  
  return jobs
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    .slice(0, limit)
    .map(job => {
      const jobApplications = applications.filter(app => app.job_id === job.id)
      return {
        ...job,
        applicationCount: jobApplications.length,
      }
    })
}

/**
 * Create a new job
 * Note: In mock mode, this simulates creation but doesn't persist to JSON file
 * In production, this will save to Supabase
 */
export async function createJob(jobData: {
  company_id: string
  title: string
  description: string
  location: string
  job_type: 'full-time' | 'part-time' | 'contract'
  salary_min?: number
  salary_max?: number
  status: 'draft' | 'published' | 'closed'
  created_by: string
}): Promise<Database['jobs'][0]> {
  await delay(200) // Simulate network delay
  
  const newJob: Database['jobs'][0] = {
    id: `job-${Date.now()}`,
    company_id: jobData.company_id,
    title: jobData.title,
    description: jobData.description,
    location: jobData.location,
    job_type: jobData.job_type,
    salary_min: jobData.salary_min || 0,
    salary_max: jobData.salary_max || 0,
    status: jobData.status,
    created_by: jobData.created_by,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  }
  
  // In mock mode, we don't actually add to the JSON file
  // In production, this would be: await supabase.from('jobs').insert(newJob)
  
  return newJob
}

/**
 * Update an existing job
 * Note: In mock mode, this simulates update but doesn't persist to JSON file
 * In production, this will update in Supabase
 */
export async function updateJob(
  jobId: string,
  updates: Partial<Database['jobs'][0]>
): Promise<Database['jobs'][0] | null> {
  await delay(200)
  
  const job = await getJobById(jobId)
  if (!job) {
    return null
  }
  
  const updatedJob: Database['jobs'][0] = {
    ...job,
    ...updates,
    updated_at: new Date().toISOString(),
  }
  
  // In mock mode, we don't actually update the JSON file
  // In production, this would be: await supabase.from('jobs').update(updates).eq('id', jobId)
  
  return updatedJob
}

