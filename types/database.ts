// Database types matching the JSON structure
// These will be replaced with generated Supabase types later

export type Company = {
  id: string
  name: string
  logo_url: string | null
  subscription_tier: 'free' | 'basic' | 'professional' | 'enterprise'
  deployment_type: 'cloud' | 'self-hosted'
  license_key: string | null
  license_expires_at: string | null
  max_users: number
  max_jobs: number
  max_cv_uploads_per_month: number
  storage_limit_gb: number
  created_at: string
  updated_at: string
}

export type Profile = {
  id: string
  email: string
  full_name: string
  avatar_url: string | null
  company_id: string
  role: 'admin' | 'recruiter' | 'viewer'
  created_at: string
}

export type Job = {
  id: string
  company_id: string
  title: string
  description: string
  location: string
  job_type: 'full-time' | 'part-time' | 'contract'
  salary_min: number
  salary_max: number
  status: 'draft' | 'published' | 'closed'
  created_by: string
  created_at: string
  updated_at: string
}

export type JobRequirement = {
  id: string
  job_id: string
  skill: string
  weight: number
  required: boolean
}

export type Candidate = {
  id: string
  company_id: string
  full_name: string
  email: string
  phone: string
  cv_file_url: string
  parsed_data: {
    experience_years: number
    education: Array<{
      degree: string
      field: string
      university: string
      year: number
    }>
    summary: string
  }
  created_at: string
  updated_at: string
}

export type CandidateSkill = {
  id: string
  candidate_id: string
  skill: string
  proficiency: 'beginner' | 'intermediate' | 'advanced'
}

export type Application = {
  id: string
  candidate_id: string
  job_id: string
  status: 'applied' | 'shortlisted' | 'interviewed' | 'rejected' | 'hired'
  score: number
  match_percentage: number
  created_at: string
  updated_at: string
}

export type Score = {
  id: string
  application_id: string
  criteria: string
  score: number
  max_score: number
  notes: string | null
}

export type Note = {
  id: string
  candidate_id: string
  job_id: string
  author_id: string
  content: string
  created_at: string
}

export type Subscription = {
  id: string
  company_id: string
  stripe_subscription_id: string
  stripe_customer_id: string
  plan_name: string
  status: 'active' | 'canceled' | 'past_due' | 'trialing'
  current_period_start: string
  current_period_end: string
  cancel_at_period_end: boolean
  trial_start: string | null
  trial_end: string | null
  created_at: string
  updated_at: string
}

export type UsageMetric = {
  id: string
  company_id: string
  metric_type: 'cv_upload' | 'job_created' | 'user_added' | 'storage_used'
  metric_value: number
  period_start: string
  period_end: string
  created_at: string
}

// Database structure
export type Database = {
  companies: Company[]
  profiles: Profile[]
  jobs: Job[]
  job_requirements: JobRequirement[]
  candidates: Candidate[]
  candidate_skills: CandidateSkill[]
  applications: Application[]
  scores: Score[]
  notes: Note[]
  subscriptions: Subscription[]
  usage_metrics: UsageMetric[]
}
