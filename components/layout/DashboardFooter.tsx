'use client'

import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faQuestionCircle,
  faBook,
  faLifeRing,
  faFileAlt,
  faEnvelope,
} from '@fortawesome/free-solid-svg-icons'

const APP_VERSION = '0.1.0'

const helpLinks = [
  {
    name: 'Documentation',
    href: '/dashboard/help/documentation',
    icon: faBook,
    description: 'User guides and tutorials',
  },
  {
    name: 'Support',
    href: '/dashboard/help/support',
    icon: faLifeRing,
    description: 'Get help from our team',
  },
  {
    name: 'FAQ',
    href: '/dashboard/help/faq',
    icon: faQuestionCircle,
    description: 'Frequently asked questions',
  },
  {
    name: 'Contact',
    href: '/dashboard/help/contact',
    icon: faEnvelope,
    description: 'Reach out to us',
  },
]

export default function DashboardFooter() {
  return (
    <footer className="bg-gray-800 border-t border-gray-700 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          {/* Quick Help Section */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-3">Quick Help</h3>
            <ul className="space-y-2">
              {helpLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="flex items-start space-x-2 text-sm text-gray-400 hover:text-green-400 transition-colors group"
                  >
                    <FontAwesomeIcon
                      icon={link.icon}
                      className="h-4 w-4 mt-0.5 flex-shrink-0 group-hover:text-green-400"
                    />
                    <div>
                      <div className="font-medium">{link.name}</div>
                      <div className="text-xs text-gray-500">{link.description}</div>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Section */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-3">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/dashboard/help/api-docs"
                  className="text-sm text-gray-400 hover:text-green-400 transition-colors"
                >
                  API Documentation
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard/help/integrations"
                  className="text-sm text-gray-400 hover:text-green-400 transition-colors"
                >
                  Integrations
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard/help/changelog"
                  className="text-sm text-gray-400 hover:text-green-400 transition-colors"
                >
                  Changelog
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard/help/status"
                  className="text-sm text-gray-400 hover:text-green-400 transition-colors"
                >
                  System Status
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Section */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-3">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/dashboard/legal/privacy"
                  className="text-sm text-gray-400 hover:text-green-400 transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard/legal/terms"
                  className="text-sm text-gray-400 hover:text-green-400 transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard/legal/license"
                  className="text-sm text-gray-400 hover:text-green-400 transition-colors"
                >
                  License Agreement
                </Link>
              </li>
            </ul>
          </div>

          {/* Version & Info Section */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-3">About</h3>
            <div className="space-y-2 text-sm text-gray-400">
              <div>
                <span className="font-medium text-gray-300">Version:</span>{' '}
                <span className="text-green-400 font-mono">{APP_VERSION}</span>
              </div>
              <div>
                <span className="font-medium text-gray-300">Build:</span>{' '}
                <span className="text-gray-500">Production</span>
              </div>
              <div className="pt-2">
                <p className="text-xs text-gray-500">
                  © {new Date().getFullYear()} Talenust. All rights reserved.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 pt-4 mt-4">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0">
            <p className="text-xs text-gray-500">
              Talenust - Modern Recruitment Platform
            </p>
            <div className="flex items-center space-x-4 text-xs text-gray-500">
              <span>Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

