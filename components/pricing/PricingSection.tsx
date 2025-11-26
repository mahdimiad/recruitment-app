'use client'

import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faTimes, faCircle } from '@fortawesome/free-solid-svg-icons'

interface Feature {
  id: string
  name: string
}

interface Plan {
  id: string
  name: string
  monthlyPrice: number
  yearlyPrice: number
  oneTimePrice?: number // For self-hosted plans
  features: string[] // Array of feature IDs included in this plan
}

const features: Feature[] = [
  { id: 'cv-parsing', name: 'CV Parsing & Analysis' },
  { id: 'candidate-scoring', name: 'Smart Candidate Scoring' },
  { id: 'job-management', name: 'Job & Candidate Management' },
  { id: 'team-collaboration', name: 'Team Collaboration' },
  { id: 'analytics', name: 'Advanced Analytics' },
  { id: 'api-access', name: 'API Access' },
  { id: 'custom-branding', name: 'Custom Branding' },
  { id: 'priority-support', name: 'Priority Support' },
  { id: 'self-hosting', name: 'Self-Hosting Option' },
  { id: 'unlimited-users', name: 'Unlimited Users' },
]

const plans: Plan[] = [
  {
    id: 'intro',
    name: 'Intro',
    monthlyPrice: 19,
    yearlyPrice: 15,
    features: ['cv-parsing', 'candidate-scoring', 'job-management'],
  },
  {
    id: 'base',
    name: 'Base',
    monthlyPrice: 39,
    yearlyPrice: 31,
    features: ['cv-parsing', 'candidate-scoring', 'job-management', 'team-collaboration', 'analytics'],
  },
  {
    id: 'popular',
    name: 'Popular',
    monthlyPrice: 99,
    yearlyPrice: 79,
    features: ['cv-parsing', 'candidate-scoring', 'job-management', 'team-collaboration', 'analytics', 'api-access', 'custom-branding', 'priority-support'],
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    monthlyPrice: 199,
    yearlyPrice: 159,
    features: ['cv-parsing', 'candidate-scoring', 'job-management', 'team-collaboration', 'analytics', 'api-access', 'custom-branding', 'priority-support', 'self-hosting', 'unlimited-users'],
  },
  {
    id: 'self-hosted',
    name: 'Self-Hosted',
    monthlyPrice: 0,
    yearlyPrice: 0,
    oneTimePrice: 4999,
    features: ['cv-parsing', 'candidate-scoring', 'job-management', 'team-collaboration', 'analytics', 'api-access', 'custom-branding', 'priority-support', 'self-hosting', 'unlimited-users'],
  },
]

export default function PricingSection() {
  const [isYearly, setIsYearly] = useState(true)
  const [selectedPlan, setSelectedPlan] = useState<string>('popular')

  const getSelectedPlanData = () => {
    return plans.find(plan => plan.id === selectedPlan)
  }

  const isFeatureIncluded = (featureId: string) => {
    const plan = getSelectedPlanData()
    return plan ? plan.features.includes(featureId) : false
  }

  return (
    <div id="pricing" className="bg-gray-800 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold text-white sm:text-5xl">
            Simple, transparent pricing
          </h2>
          <p className="mt-4 text-lg text-gray-400">
            No contracts. No surprise fees.
          </p>
        </div>

        <div className="grid lg:grid-cols-[1fr_1.3fr] gap-8 lg:gap-12 items-start">
          {/* Left Column - Features */}
          <div className="bg-gray-900 rounded-xl p-6 border border-gray-700 h-full flex flex-col">
            {/* Toggle */}
            <div className="flex items-center justify-center gap-4 mb-6">
              <button
                onClick={() => setIsYearly(false)}
                className={`px-6 py-2 rounded-lg font-medium transition-all ${
                  !isYearly
                    ? 'bg-primary-500 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setIsYearly(true)}
                className={`px-6 py-2 rounded-lg font-medium transition-all ${
                  isYearly
                    ? 'bg-primary-500 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                Yearly
              </button>
            </div>

            {/* Features List */}
            <div className="space-y-2">
              {features.map((feature) => {
                const isIncluded = isFeatureIncluded(feature.id)
                return (
                  <div
                    key={feature.id}
                    className="flex items-center justify-between py-2.5 px-3 rounded-lg border border-gray-700"
                  >
                    <span className="text-gray-300 text-sm">{feature.name}</span>
                    {selectedPlan ? (
                      <FontAwesomeIcon
                        icon={isIncluded ? faCheck : faTimes}
                        className={`text-lg ${
                          isIncluded ? 'text-primary-400' : 'text-gray-600'
                        }`}
                      />
                    ) : (
                      <FontAwesomeIcon
                        icon={faCircle}
                        className="text-lg text-gray-600"
                      />
                    )}
                  </div>
                )
              })}
            </div>
          </div>

          {/* Right Column - Pricing Plans */}
          <div className="space-y-4 h-full flex flex-col">
            {plans.map((plan) => {
              const isSelected = selectedPlan === plan.id
              const isOneTime = plan.oneTimePrice !== undefined
              const price = isOneTime ? plan.oneTimePrice : (isYearly ? plan.yearlyPrice : plan.monthlyPrice)
              const savings = !isOneTime && isYearly ? Math.round(((plan.monthlyPrice - plan.yearlyPrice) / plan.monthlyPrice) * 100) : 0

              return (
                <div
                  key={plan.id}
                  onClick={() => setSelectedPlan(isSelected ? plan.id : plan.id)}
                  className={`rounded-xl p-6 border-2 cursor-pointer transition-all shadow-lg ${
                    isSelected
                      ? 'border-primary-500 bg-primary-500 text-white'
                      : 'bg-gray-900 border-gray-700 hover:border-gray-600 text-white'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      {isSelected ? (
                        <FontAwesomeIcon
                          icon={faCheck}
                          className="text-white text-xl"
                        />
                      ) : (
                        <div className="w-5 h-5 rounded-full border-2 border-gray-600"></div>
                      )}
                      <div>
                        <h3 className={`text-xl font-semibold ${isSelected ? 'text-white' : 'text-white'}`}>
                          {plan.name}
                        </h3>
                        {!isOneTime && isYearly && savings > 0 && (
                          <span className={`text-sm mt-1 block ${isSelected ? 'text-white/80' : 'text-primary-400'}`}>
                            Save {savings}%
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`text-3xl font-bold ${isSelected ? 'text-white' : 'text-white'}`}>
                        ${price}
                      </div>
                      <div className={`text-sm ${isSelected ? 'text-white/80' : 'text-gray-400'}`}>
                        {isOneTime ? 'One-time payment' : `/ ${isYearly ? 'Year' : 'Month'}`}
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

