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
export async function getDashboardStats(companyId: string) {
  await delay(150)
  
  const jobs = await getJobsByCompany(companyId)
  const candidates = await getCandidatesByCompany(companyId)
  const applications = await getApplications()
  const companyApplications = applications.filter(app => {
    const job = jobs.find(j => j.id === app.job_id)
    return job?.company_id === companyId
  })

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

