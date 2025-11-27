'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faArrowLeft,
  faTrophy,
  faBookmark,
  faEnvelope,
  faCalendarAlt,
  faTimesCircle,
  faMapMarkerAlt,
  faPhone,
  faLink as faLinkIcon,
  faEye,
  faDownload,
  faFilePdf,
  faFileAlt,
} from '@fortawesome/free-solid-svg-icons'
import { faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons'
import Breadcrumbs from '@/components/layout/Breadcrumbs'
import { getCandidateWithDetails } from '@/lib/mock-db'
import { Candidate, CandidateSkill, Application, Job, Score, Note } from '@/types/database'
import { format } from 'date-fns'
import clsx from 'clsx'

interface CandidateDetails extends Candidate {
  skills: CandidateSkill[]
  applications: (Application & { job: Job | null; scores: Score[] })[]
  notes: Note[]
}

type TabType = 'summary' | 'experience' | 'education' | 'raw-cv'

export default function CandidateDetailPage() {
  const params = useParams()
  const router = useRouter()
  const candidateId = params.id as string
  const [candidate, setCandidate] = useState<CandidateDetails | null>(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<TabType>('summary')
  const [noteContent, setNoteContent] = useState('')

  useEffect(() => {
    const loadCandidate = async () => {
      setLoading(true)
      try {
        const candidateData = await getCandidateWithDetails(candidateId)
        if (candidateData) {
          setCandidate(candidateData as CandidateDetails)
        }
      } catch (error) {
        console.error('Failed to load candidate details:', error)
      } finally {
        setLoading(false)
      }
    }

    if (candidateId) {
      loadCandidate()
    }
  }, [candidateId])

  const handleAddNote = () => {
    if (!noteContent.trim()) return
    // TODO: Implement actual note creation
    alert('Note added (mock action)')
    setNoteContent('')
  }

  const getMatchPercentage = () => {
    if (!candidate || candidate.applications.length === 0) return null
    // Get the highest match percentage from applications
    const maxMatch = Math.max(...candidate.applications.map(app => app.match_percentage))
    return maxMatch
  }

  const getMatchColor = (percentage: number) => {
    if (percentage >= 90) return 'text-green-400'
    if (percentage >= 80) return 'text-yellow-400'
    if (percentage >= 70) return 'text-orange-400'
    return 'text-red-400'
  }

  const getScoreBreakdown = () => {
    if (!candidate || candidate.applications.length === 0) return null
    // Get scores from the most recent application
    const latestApplication = candidate.applications[0]
    if (!latestApplication.scores || latestApplication.scores.length === 0) return null

    const breakdown: Record<string, { score: number; maxScore: number }> = {}
    latestApplication.scores.forEach((score) => {
      breakdown[score.criteria] = {
        score: score.score,
        maxScore: score.max_score,
      }
    })

    return breakdown
  }

  if (loading) {
    return (
      <>
        <Breadcrumbs
          items={[
            { label: 'Dashboard', href: '/dashboard' },
            { label: 'Candidates', href: '/dashboard/candidates' },
            { label: 'Loading...', href: '#' },
          ]}
        />
        <div className="px-4 sm:px-6 lg:px-8 py-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-center h-64">
              <p className="text-gray-400">Loading candidate details...</p>
            </div>
          </div>
        </div>
      </>
    )
  }

  if (!candidate) {
    return (
      <>
        <Breadcrumbs
          items={[
            { label: 'Dashboard', href: '/dashboard' },
            { label: 'Candidates', href: '/dashboard/candidates' },
            { label: 'Not Found', href: '#' },
          ]}
        />
        <div className="px-4 sm:px-6 lg:px-8 py-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-center h-64">
              <p className="text-gray-400">Candidate not found.</p>
            </div>
          </div>
        </div>
      </>
    )
  }

  const matchPercentage = getMatchPercentage()
  const scoreBreakdown = getScoreBreakdown()
  const primaryApplication = candidate.applications[0]

  return (
    <>
      <Breadcrumbs
        items={[
          { label: 'Dashboard', href: '/dashboard' },
          { label: 'Candidates', href: '/dashboard/candidates' },
          { label: candidate.full_name, href: '#' },
        ]}
      />
      <div className="max-w-7xl mx-auto flex-grow flex flex-col md:flex-row overflow-hidden bg-gray-900">
        {/* Left Column - Profile Information */}
        <div className="w-full md:w-1/3 bg-gray-800 border-r border-gray-700 overflow-auto">
          <div className="p-6">
            {/* Back to Candidates Button */}
            <Link
              href="/dashboard/candidates"
              className="inline-flex items-center text-sm text-gray-400 hover:text-green-400 mb-6"
            >
              <FontAwesomeIcon icon={faArrowLeft} className="mr-2" /> Back to Candidates
            </Link>

            {/* Candidate Profile */}
            <div className="flex flex-col items-center text-center mb-8">
              <div className="h-32 w-32 rounded-full bg-gray-700 flex items-center justify-center mb-4">
                <span className="text-4xl text-white font-medium">
                  {candidate.full_name.charAt(0).toUpperCase()}
                </span>
              </div>
              <h1 className="text-2xl font-bold text-white">{candidate.full_name}</h1>
              <p className="text-gray-400">
                {candidate.parsed_data?.summary
                  ? candidate.parsed_data.summary.split('.')[0]
                  : 'Candidate'}
              </p>

              {/* Match Score */}
              {matchPercentage !== null && (
                <div className="mt-6 w-full max-w-xs mx-auto">
                  <div className="text-sm text-gray-400 mb-1 flex justify-between">
                    <span>Match Score</span>
                    <span className="text-white font-medium">{matchPercentage}%</span>
                  </div>
                  <div className="bg-gray-700 rounded-full h-2.5">
                    <div
                      className={clsx(
                        'bg-gradient-to-r from-green-400 to-emerald-500 h-2.5 rounded-full',
                        getMatchColor(matchPercentage)
                      )}
                      style={{ width: `${matchPercentage}%` }}
                    ></div>
                  </div>
                </div>
              )}

              {/* Badge */}
              {matchPercentage !== null && matchPercentage >= 90 && (
                <div className="mt-4">
                  <span className="inline-flex items-center bg-green-500 text-gray-900 px-3 py-1 rounded-full text-sm font-medium">
                    <FontAwesomeIcon icon={faTrophy} className="mr-1" />
                    Top Match
                  </span>
                </div>
              )}

              {/* Application Status */}
              {primaryApplication && (
                <div className="mt-6 w-full">
                  <div className="text-sm text-gray-400 mb-2">Application Status</div>
                  <span
                    className={clsx(
                      'inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium',
                      primaryApplication.status === 'hired' && 'bg-green-100 text-green-800',
                      primaryApplication.status === 'interviewed' && 'bg-blue-100 text-blue-800',
                      primaryApplication.status === 'shortlisted' && 'bg-purple-100 text-purple-800',
                      primaryApplication.status === 'applied' && 'bg-gray-100 text-gray-800',
                      primaryApplication.status === 'rejected' && 'bg-red-100 text-red-800'
                    )}
                  >
                    {primaryApplication.status.charAt(0).toUpperCase() + primaryApplication.status.slice(1)}
                  </span>
                  {primaryApplication.job && (
                    <p className="text-xs text-gray-400 mt-2">
                      For: {primaryApplication.job.title}
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 mb-8">
              <button
                onClick={() => {
                  // TODO: Implement shortlist
                  alert('Candidate shortlisted (mock action)')
                }}
                className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-gray-900 bg-gradient-to-r from-green-400 to-emerald-500 hover:from-green-500 hover:to-emerald-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                <FontAwesomeIcon icon={faBookmark} className="mr-2" /> Shortlist Candidate
              </button>
              <button
                onClick={() => {
                  // TODO: Implement contact
                  alert('Contact candidate (mock action)')
                }}
                className="w-full flex items-center justify-center px-4 py-2 border border-gray-600 rounded-md shadow-sm text-sm font-medium text-white bg-gray-700 hover:bg-gray-600 focus:outline-none"
              >
                <FontAwesomeIcon icon={faEnvelope} className="mr-2" /> Contact Candidate
              </button>
              <button
                onClick={() => {
                  // TODO: Implement schedule interview
                  alert('Schedule interview (mock action)')
                }}
                className="w-full flex items-center justify-center px-4 py-2 border border-gray-600 rounded-md shadow-sm text-sm font-medium text-white bg-gray-700 hover:bg-gray-600 focus:outline-none"
              >
                <FontAwesomeIcon icon={faCalendarAlt} className="mr-2" /> Schedule Interview
              </button>
              <button
                onClick={() => {
                  if (confirm('Are you sure you want to reject this candidate?')) {
                    // TODO: Implement reject
                    alert('Candidate rejected (mock action)')
                  }
                }}
                className="w-full flex items-center justify-center px-4 py-2 border border-gray-600 rounded-md shadow-sm text-sm font-medium text-white bg-gray-700 hover:bg-gray-600 focus:outline-none"
              >
                <FontAwesomeIcon icon={faTimesCircle} className="mr-2" /> Reject Candidate
              </button>
            </div>

            {/* Contact Information */}
            <div className="border-t border-gray-700 pt-6 mb-8">
              <h3 className="text-lg font-medium text-white mb-4">Contact Information</h3>
              <div className="space-y-3">
                <div className="flex items-start">
                  <FontAwesomeIcon icon={faEnvelope} className="text-gray-500 mt-1 mr-3 w-5" />
                  <div>
                    <p className="text-sm text-white">{candidate.email}</p>
                  </div>
                </div>
                {candidate.phone && (
                  <div className="flex items-start">
                    <FontAwesomeIcon icon={faPhone} className="text-gray-500 mt-1 mr-3 w-5" />
                    <div>
                      <p className="text-sm text-white">{candidate.phone}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Skills Section */}
            <div className="border-t border-gray-700 pt-6 mb-8">
              <h3 className="text-lg font-medium text-white mb-4">Skills</h3>
              <div className="flex flex-wrap gap-2">
                {candidate.skills.map((skill) => {
                  const proficiencyColors = {
                    advanced: 'bg-green-500',
                    intermediate: 'bg-yellow-500',
                    beginner: 'bg-orange-500',
                  }
                  return (
                    <div
                      key={skill.id}
                      className="flex items-center px-3 py-1 bg-gray-700 rounded-full text-sm text-white"
                    >
                      <span>{skill.skill}</span>
                      <span
                        className={clsx(
                          'ml-2 px-1.5 py-0.5 text-gray-900 text-xs rounded-md',
                          proficiencyColors[skill.proficiency] || 'bg-gray-500'
                        )}
                      >
                        {skill.proficiency.charAt(0).toUpperCase() + skill.proficiency.slice(1)}
                      </span>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Applied For */}
            {primaryApplication && primaryApplication.job && (
              <div className="border-t border-gray-700 pt-6">
                <h3 className="text-lg font-medium text-white mb-4">Applied For</h3>
                <div className="bg-gray-700 rounded-lg p-4">
                  <h4 className="font-medium text-white">{primaryApplication.job.title}</h4>
                  <p className="text-sm text-gray-400 mt-1">
                    Applied on: {format(new Date(primaryApplication.created_at), 'MMMM dd, yyyy')}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column - Tabbed Content */}
        <div className="w-full md:w-2/3 bg-gray-900 overflow-auto">
          <div className="p-6">
            {/* Tabs */}
            <div className="border-b border-gray-700">
              <nav className="-mb-px flex space-x-6" aria-label="Tabs">
                {(['summary', 'experience', 'education', 'raw-cv'] as TabType[]).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={clsx(
                      'whitespace-nowrap py-2 px-1 border-b-2 font-medium',
                      activeTab === tab
                        ? 'border-green-400 text-green-400'
                        : 'border-transparent text-gray-400 hover:text-green-300 hover:border-green-300'
                    )}
                  >
                    {tab === 'raw-cv' ? 'Raw CV' : tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                ))}
              </nav>
            </div>

            {/* Tab Contents */}
            <div className="mt-6">
              {/* Summary Tab */}
              {activeTab === 'summary' && (
                <div>
                  <div className="mb-6">
                    <div className="flex items-center mb-4">
                      <h2 className="text-xl font-semibold text-white">AI-Generated Summary</h2>
                      <div className="ml-2 text-xs text-gray-400">(Generated by Talenust AI)</div>
                    </div>

                    <div className="bg-gray-800 border border-gray-700 rounded-lg p-4 text-gray-300">
                      {candidate.parsed_data?.summary ? (
                        <p className="whitespace-pre-wrap">{candidate.parsed_data.summary}</p>
                      ) : (
                        <p>No summary available for this candidate.</p>
                      )}
                    </div>
                  </div>

                  {/* Scoring Breakdown */}
                  {scoreBreakdown && (
                    <div className="mb-8">
                      <h3 className="text-lg font-semibold text-white mb-4">Scoring Breakdown</h3>
                      <div className="space-y-4">
                        {Object.entries(scoreBreakdown).map(([criteria, { score, maxScore }]) => {
                          const percentage = (score / maxScore) * 100
                          return (
                            <div key={criteria}>
                              <div className="flex justify-between mb-1">
                                <span className="text-sm text-gray-400">{criteria}</span>
                                <span className="text-sm text-white">
                                  {score}/{maxScore}
                                </span>
                              </div>
                              <div className="bg-gray-700 rounded-full h-2.5">
                                <div
                                  className="bg-gradient-to-r from-green-400 to-emerald-500 h-2.5 rounded-full"
                                  style={{ width: `${percentage}%` }}
                                ></div>
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  )}

                  {/* Notes Section */}
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-4">Notes</h3>

                    {candidate.notes.length > 0 && (
                      <div className="space-y-4 mb-4">
                        {candidate.notes.map((note) => (
                          <div key={note.id} className="bg-gray-800 border border-gray-700 rounded-lg p-4">
                            <div className="flex items-start">
                              <div className="h-8 w-8 rounded-full bg-gray-600 flex items-center justify-center mr-3">
                                <span className="text-white text-xs font-medium">
                                  {note.author_id.charAt(0).toUpperCase()}
                                </span>
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center">
                                  <h4 className="font-medium text-white">User</h4>
                                  <span className="ml-2 text-xs text-gray-400">
                                    • {format(new Date(note.created_at), 'MMMM dd, yyyy')}
                                  </span>
                                </div>
                                <p className="text-sm text-gray-300 mt-1">{note.content}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Add Note */}
                    <div>
                      <label htmlFor="note" className="sr-only">
                        Add a note
                      </label>
                      <textarea
                        id="note"
                        rows={3}
                        value={noteContent}
                        onChange={(e) => setNoteContent(e.target.value)}
                        className="w-full bg-gray-800 border border-gray-700 rounded-lg py-2 px-3 text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
                        placeholder="Add a note about this candidate..."
                      />
                      <div className="mt-2 flex justify-end">
                        <button
                          onClick={handleAddNote}
                          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-gray-900 bg-gradient-to-r from-green-400 to-emerald-500 hover:from-green-500 hover:to-emerald-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                        >
                          Add Note
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Experience Tab */}
              {activeTab === 'experience' && (
                <div>
                  <h2 className="text-xl font-semibold text-white mb-4">Work Experience</h2>
                  {candidate.parsed_data?.experience_years ? (
                    <div className="bg-gray-800 border border-gray-700 rounded-lg p-5">
                      <p className="text-gray-300">
                        {candidate.full_name} has {candidate.parsed_data.experience_years} years of experience.
                      </p>
                      <p className="text-gray-400 text-sm mt-2">
                        Detailed experience information would be parsed from the CV document.
                      </p>
                    </div>
                  ) : (
                    <p className="text-gray-400">No experience information available.</p>
                  )}
                </div>
              )}

              {/* Education Tab */}
              {activeTab === 'education' && (
                <div>
                  <h2 className="text-xl font-semibold text-white mb-4">Education</h2>
                  {candidate.parsed_data?.education && candidate.parsed_data.education.length > 0 ? (
                    <div className="space-y-6">
                      {candidate.parsed_data.education.map((edu, index) => (
                        <div key={index} className="bg-gray-800 border border-gray-700 rounded-lg p-5">
                          <div className="flex flex-col sm:flex-row sm:justify-between mb-2">
                            <h3 className="text-lg font-medium text-white">
                              {edu.degree} in {edu.field}
                            </h3>
                            <div className="text-green-400 font-medium">{edu.year}</div>
                          </div>
                          <div className="text-gray-400 mb-3">{edu.university}</div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-400">No education information available.</p>
                  )}
                </div>
              )}

              {/* Raw CV Tab */}
              {activeTab === 'raw-cv' && (
                <div>
                  <div className="mb-6 flex items-center justify-between">
                    <h2 className="text-xl font-semibold text-white">Original CV Document</h2>
                    <div className="flex space-x-3">
                      <button
                        onClick={() => alert('Preview CV (mock action)')}
                        className="inline-flex items-center px-3 py-2 border border-gray-600 rounded-md shadow-sm text-sm font-medium text-white bg-gray-700 hover:bg-gray-600 focus:outline-none"
                      >
                        <FontAwesomeIcon icon={faEye} className="mr-2" />
                        Preview
                      </button>
                      <button
                        onClick={() => alert('Download CV (mock action)')}
                        className="inline-flex items-center px-3 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-gray-900 bg-gradient-to-r from-green-400 to-emerald-500 hover:from-green-500 hover:to-emerald-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                      >
                        <FontAwesomeIcon icon={faDownload} className="mr-2" />
                        Download
                      </button>
                    </div>
                  </div>

                  <div className="border border-gray-700 rounded-lg overflow-hidden">
                    {/* File Info */}
                    <div className="bg-gray-800 border-b border-gray-700 p-4 flex items-center justify-between">
                      <div className="flex items-center">
                        <FontAwesomeIcon icon={faFilePdf} className="text-red-500 text-2xl mr-3" />
                        <div>
                          <h4 className="font-medium text-white">
                            {candidate.full_name.replace(/\s+/g, '_')}_CV.pdf
                          </h4>
                          <p className="text-sm text-gray-400">
                            Uploaded on {format(new Date(candidate.created_at), 'MMMM dd, yyyy')} • CV File
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center text-gray-400 text-sm">
                        <FontAwesomeIcon icon={faEye} className="text-green-500 mr-1" />
                        Successfully parsed
                      </div>
                    </div>

                    {/* PDF Preview Placeholder */}
                    <div className="bg-gray-900 p-6 h-96 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-gray-400 mb-2">
                          <FontAwesomeIcon icon={faFilePdf} className="text-5xl" />
                        </div>
                        <h4 className="text-white font-medium mb-2">CV Preview</h4>
                        <p className="text-gray-400 text-sm mb-4">
                          Click the Preview button to view the full document
                        </p>
                        <button
                          onClick={() => alert('Preview CV (mock action)')}
                          className="inline-flex items-center px-3 py-2 border border-gray-600 rounded-md shadow-sm text-sm font-medium text-white bg-gray-700 hover:bg-gray-600 focus:outline-none"
                        >
                          <FontAwesomeIcon icon={faEye} className="mr-2" />
                          Preview
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

