'use client'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRobot, faChartLine, faCode, faBullseye } from '@fortawesome/free-solid-svg-icons'

interface AIInsightsProps {
  stats: {
    totalCVs: number
    shortlisted: number
    hired: number
    avgScore: number
    cvIncrease: number
    shortlistedIncrease: number
    scoreIncrease: number
  }
}

export default function AIInsights({ stats }: AIInsightsProps) {
  // Calculate insights based on stats
  const hiringTrend = stats.cvIncrease > 0 
    ? `Applications increased by ${stats.cvIncrease}% compared to last month`
    : 'Applications are stable compared to last month'

  const mostInDemandSkill = 'React' // This would come from actual data analysis
  const topSkillPercentage = 78 // This would be calculated from actual data

  const qualityInsight = stats.scoreIncrease > 0
    ? `Average candidate score is ${stats.avgScore} (↑${stats.scoreIncrease} from last period)`
    : `Average candidate score is ${stats.avgScore}`

  return (
    <div className="bg-gradient-to-r from-gray-800 to-gray-700 rounded-lg shadow-lg p-4 mb-6 border border-gray-700">
      <div className="flex items-center mb-3">
        <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center mr-3">
          <FontAwesomeIcon icon={faRobot} className="text-gray-900" />
        </div>
        <h2 className="text-lg font-medium text-white">AI Insights</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gray-800 rounded-lg p-3 border border-gray-700">
          <div className="flex items-center mb-1">
            <FontAwesomeIcon icon={faChartLine} className="text-green-400 mr-2" />
            <h3 className="text-sm font-medium text-white">Hiring Trend</h3>
          </div>
          <p className="text-sm text-gray-300">{hiringTrend}</p>
        </div>
        <div className="bg-gray-800 rounded-lg p-3 border border-gray-700">
          <div className="flex items-center mb-1">
            <FontAwesomeIcon icon={faCode} className="text-green-400 mr-2" />
            <h3 className="text-sm font-medium text-white">Most In-Demand Skill</h3>
          </div>
          <p className="text-sm text-gray-300">
            {mostInDemandSkill} skills are present in {topSkillPercentage}% of top candidates
          </p>
        </div>
        <div className="bg-gray-800 rounded-lg p-3 border border-gray-700">
          <div className="flex items-center mb-1">
            <FontAwesomeIcon icon={faBullseye} className="text-green-400 mr-2" />
            <h3 className="text-sm font-medium text-white">Quality Insight</h3>
          </div>
          <p className="text-sm text-gray-300">{qualityInsight}</p>
        </div>
      </div>
    </div>
  )
}

