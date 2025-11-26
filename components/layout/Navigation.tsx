'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <nav className="bg-gray-800 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="flex items-center">
                <Image
                  src="/images/talentust_logo.png"
                  alt="Talentust Logo"
                  width={170}
                  height={50}
                  className="h-10 w-auto"
                  priority
                />
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link
                href="#features"
                className="border-transparent text-gray-300 hover:border-primary-300 hover:text-primary-400 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
                Features
              </Link>
              <Link
                href="#pricing"
                className="border-transparent text-gray-300 hover:border-primary-300 hover:text-primary-400 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
                Pricing
              </Link>
              <Link
                href="#testimonials"
                className="border-transparent text-gray-300 hover:border-primary-300 hover:text-primary-400 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
                Testimonials
              </Link>
              <Link
                href="#about"
                className="border-transparent text-gray-300 hover:border-primary-300 hover:text-primary-400 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
                About
              </Link>
              <Link
                href="/dashboard"
                className="border-transparent text-gray-300 hover:border-primary-300 hover:text-primary-400 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
                Dashboard
              </Link>
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            <Link
              href="/login"
              className="px-4 py-2 text-sm font-medium text-primary-400 hover:text-primary-300"
            >
              Log in
            </Link>
            <Link
              href="/signup"
              className="ml-3 px-4 py-2 rounded-md text-sm font-medium text-gray-900 bg-gradient-to-r from-primary-400 to-primary-400 hover:from-primary-500 hover:to-primary-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              Sign up
            </Link>
          </div>
          <div className="-mr-2 flex items-center sm:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-300 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <FontAwesomeIcon icon={faBars} className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="sm:hidden">
          <div className="pt-2 pb-3 space-y-1">
            <Link
              href="#features"
              className="block px-3 py-2 text-base font-medium text-gray-300 hover:text-primary-400 hover:bg-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              Features
            </Link>
            <Link
              href="#pricing"
              className="block px-3 py-2 text-base font-medium text-gray-300 hover:text-primary-400 hover:bg-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              Pricing
            </Link>
            <Link
              href="#testimonials"
              className="block px-3 py-2 text-base font-medium text-gray-300 hover:text-primary-400 hover:bg-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              Testimonials
            </Link>
            <Link
              href="/dashboard"
              className="block px-3 py-2 text-base font-medium text-gray-300 hover:text-primary-400 hover:bg-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              Dashboard
            </Link>
            <div className="pt-4 pb-3 border-t border-gray-700">
              <Link
                href="/login"
                className="block px-3 py-2 text-base font-medium text-primary-400"
                onClick={() => setMobileMenuOpen(false)}
              >
                Log in
              </Link>
              <Link
                href="/signup"
                className="mt-2 block px-3 py-2 text-base font-medium text-gray-900 bg-gradient-to-r from-primary-400 to-primary-400 rounded-md"
                onClick={() => setMobileMenuOpen(false)}
              >
                Sign up
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}

