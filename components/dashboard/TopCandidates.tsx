'use client'

import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faArrowRight, faStar } from '@fortawesome/free-solid-svg-icons'

interface Candidate {
  id: string
  full_name: string
  email: string
  averageScore: number
  applicationCount: number
}

interface TopCandidatesProps {
  candidates: Candidate[]
}

export default function TopCandidates({ candidates }: TopCandidatesProps) {
  return (
    <div className="bg-gray-800 rounded-lg shadow overflow-hidden">
      <div className="px-4 py-5 sm:p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-white">Top Candidates</h3>
          <Link
            href="/dashboard/candidates"
            className="text-sm text-green-400 hover:text-green-300 flex items-center"
          >
            View all
            <FontAwesomeIcon icon={faArrowRight} className="ml-1 h-3 w-3" />
          </Link>
        </div>
        <div className="space-y-3">
          {candidates.length === 0 ? (
            <p className="text-gray-400 text-sm">No candidates yet</p>
          ) : (
            candidates.map((candidate, index) => (
              <Link
                key={candidate.id}
                href={`/dashboard/candidates/${candidate.id}`}
                className="block p-4 rounded-lg border border-gray-700 hover:border-green-500/50 hover:bg-gray-700 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3 flex-1">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center">
                      <FontAwesomeIcon icon={faUser} className="h-5 w-5 text-gray-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2">
                        <h4 className="text-white font-medium">{candidate.full_name}</h4>
                        {index < 3 && (
                          <FontAwesomeIcon icon={faStar} className="h-4 w-4 text-yellow-400" />
                        )}
                      </div>
                      <p className="text-gray-400 text-sm truncate">{candidate.email}</p>
                    </div>
                  </div>
                  <div className="flex-shrink-0 text-right ml-4">
                    <div className="text-lg font-bold text-green-400">
                      {candidate.averageScore.toFixed(0)}
                    </div>
                    <div className="text-xs text-gray-500">
                      {candidate.applicationCount} {candidate.applicationCount === 1 ? 'app' : 'apps'}
                    </div>
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

