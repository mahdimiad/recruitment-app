'use client'

import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons'

interface FAQItem {
  id: string
  question: string
  answer: string
}

const faqs: FAQItem[] = [
  {
    id: '1',
    question: 'How does the CV parsing and analysis work?',
    answer: 'Our AI-powered CV parser automatically extracts key information from resumes in any format (PDF, Word, etc.). It identifies skills, work experience, education, certifications, and other relevant details to create structured candidate profiles. The system learns from your job requirements to improve matching accuracy over time.',
  },
  {
    id: '2',
    question: 'What is the candidate scoring system based on?',
    answer: 'The candidate scoring system evaluates candidates based on multiple factors including skills match, experience relevance, education level, certifications, and keywords from your job description. You can customize the scoring criteria and weights to match your specific hiring needs. Scores are calculated automatically when candidates apply or when you upload resumes.',
  },
  {
    id: '3',
    question: 'Can I use Talenust for multiple job postings simultaneously?',
    answer: 'Yes! Talenust supports unlimited job postings. You can create, manage, and track multiple positions at once. Each job posting has its own candidate pipeline, scoring criteria, and analytics dashboard. This makes it easy to manage hiring for different departments or roles simultaneously.',
  },
  {
    id: '4',
    question: 'How does the self-hosting option work?',
    answer: 'The self-hosting option allows you to deploy Talenust on your own servers for complete data control and compliance. You receive a one-time license, installation package, and documentation. Our team provides setup assistance and you can choose to host on-premises or in your preferred cloud infrastructure. This option is ideal for organizations with strict data privacy requirements.',
  },
  {
    id: '5',
    question: 'What kind of support do you provide?',
    answer: 'We offer different support tiers based on your plan. All plans include email support and access to our knowledge base. Popular and Enterprise plans include priority support with faster response times. Enterprise and Self-Hosted plans include dedicated account management and phone support. We also provide onboarding assistance and training sessions for your team.',
  },
  {
    id: '6',
    question: 'Can I integrate Talenust with other HR tools?',
    answer: 'Yes! Talenust offers API access for Popular, Enterprise, and Self-Hosted plans. You can integrate with popular HR systems, ATS platforms, calendar tools, and communication platforms. We also provide webhooks for real-time updates and pre-built integrations with common HR software.',
  },
]

export default function FAQSection() {
  const [openItems, setOpenItems] = useState<Set<string>>(new Set())

  const toggleItem = (id: string) => {
    const newOpenItems = new Set(openItems)
    if (newOpenItems.has(id)) {
      newOpenItems.delete(id)
    } else {
      newOpenItems.add(id)
    }
    setOpenItems(newOpenItems)
  }

  return (
    <div id="faq" className="relative bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 py-20 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary-400/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h3 className="text-sm font-semibold text-primary-400 tracking-wide uppercase mb-4">
            FAQ
          </h3>
          <h2 className="text-4xl font-extrabold text-white sm:text-5xl">
            Most common questions about our services
          </h2>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqs.map((faq) => {
            const isOpen = openItems.has(faq.id)
            return (
              <div
                key={faq.id}
                className="relative rounded-xl border border-primary-500/30 bg-gray-800/50 backdrop-blur-sm overflow-hidden transition-all hover:border-primary-500/50"
                style={{
                  background: 'rgba(31, 41, 55, 0.5)',
                  backdropFilter: 'blur(10px)',
                }}
              >
                <button
                  onClick={() => toggleItem(faq.id)}
                  className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
                >
                  <span className="text-lg font-medium text-white pr-8">
                    {faq.question}
                  </span>
                  <div className="flex-shrink-0">
                    <FontAwesomeIcon
                      icon={isOpen ? faMinus : faPlus}
                      className={`text-white text-xl transition-transform ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </div>
                </button>
                
                {isOpen && (
                  <div className="px-6 pb-6">
                    <div className="pt-4 border-t border-gray-700/50">
                      <p className="text-gray-300 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

