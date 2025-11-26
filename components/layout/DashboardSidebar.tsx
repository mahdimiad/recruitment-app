'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faBriefcase,
  faUsers,
  faChartBar,
  faCog,
  faBars,
  faTimes,
  faSignOutAlt,
  faUserCircle,
  faBell,
  faChevronDown,
} from '@fortawesome/free-solid-svg-icons'
import { clsx } from 'clsx'
import { getUserEmail, logout as authLogout } from '@/lib/utils/auth'
import { getProfiles } from '@/lib/mock-db'

const navigation = [
  { name: 'Dashboard', href: '/dashboard' },
  { name: 'Jobs', href: '/dashboard/jobs' },
  { name: 'Candidates', href: '/dashboard/candidates' },
  { name: 'Reports', href: '/dashboard/reports' },
  { name: 'Settings', href: '/dashboard/settings' },
]

export default function DashboardTopNav() {
  const pathname = usePathname()
  const router = useRouter()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const [userProfile, setUserProfile] = useState<{
    full_name: string
    email: string
    avatar_url: string | null
    role: string
  } | null>(null)

  useEffect(() => {
    const loadUserProfile = async () => {
      const email = getUserEmail()
      if (email) {
        // Set initial profile immediately to avoid loading state
        const initialName = email.split('@')[0].replace(/\./g, ' ').replace(/\b\w/g, l => l.toUpperCase())
        setUserProfile({
          full_name: initialName,
          email: email,
          avatar_url: null,
          role: 'user',
        })
        
        // Then try to load full profile
        try {
          const profiles = await getProfiles()
          const profile = profiles.find(p => p.email === email)
          if (profile) {
            setUserProfile({
              full_name: profile.full_name,
              email: profile.email,
              avatar_url: profile.avatar_url,
              role: profile.role,
            })
          }
        } catch (error) {
          // Keep the initial profile if error
          console.error('Failed to load user profile:', error)
        }
      }
    }
    loadUserProfile()
  }, [])

  // Close user menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuOpen && !(event.target as Element).closest('.user-menu-container')) {
        setUserMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [userMenuOpen])

  const handleLogout = () => {
    authLogout()
    router.push('/')
    router.refresh()
  }

  return (
    <>
      {/* Top Navigation */}
      <nav className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <Link href="/dashboard" className="text-green-400 text-xl font-bold">
                  Talenust
                </Link>
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                {navigation.map((item) => {
                  const isActive = pathname === item.href || pathname?.startsWith(item.href + '/')
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={clsx(
                        'inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors',
                        isActive
                          ? 'border-green-400 text-white'
                          : 'border-transparent text-gray-300 hover:border-green-300 hover:text-green-400'
                      )}
                    >
                      {item.name}
                    </Link>
                  )
                })}
              </div>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:items-center">
              <button className="p-1 rounded-full text-gray-400 hover:text-white focus:outline-none">
                <span className="sr-only">View notifications</span>
                <FontAwesomeIcon icon={faBell} className="h-5 w-5" />
              </button>
              <div className="ml-3 relative user-menu-container">
                <div>
                  <button
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    className="flex text-sm rounded-full focus:outline-none items-center"
                  >
                    {userProfile?.avatar_url ? (
                      <img
                        className="h-8 w-8 rounded-full"
                        src={userProfile.avatar_url}
                        alt={userProfile.full_name}
                      />
                    ) : (
                      <div className="h-8 w-8 rounded-full bg-gray-700 flex items-center justify-center">
                        <FontAwesomeIcon icon={faUserCircle} className="h-5 w-5 text-gray-400" />
                      </div>
                    )}
                    <span className="ml-2 text-gray-300">{userProfile?.full_name || 'User'}</span>
                    <FontAwesomeIcon icon={faChevronDown} className="ml-1 text-xs text-gray-500" />
                  </button>
                </div>
                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-gray-800 ring-1 ring-black ring-opacity-5 z-50">
                    <div className="py-1">
                      <div className="px-4 py-2 text-sm text-gray-300 border-b border-gray-700">
                        <p className="font-medium">{userProfile?.full_name}</p>
                        <p className="text-xs text-gray-400">{userProfile?.email}</p>
                      </div>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 flex items-center"
                      >
                        <FontAwesomeIcon icon={faSignOutAlt} className="mr-2 h-4 w-4" />
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
            {/* Mobile menu button */}
            <div className="sm:hidden flex items-center">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-gray-400 hover:text-white focus:outline-none"
                aria-label="Toggle menu"
              >
                <FontAwesomeIcon icon={mobileMenuOpen ? faTimes : faBars} className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="sm:hidden border-t border-gray-700">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item) => {
                const isActive = pathname === item.href || pathname?.startsWith(item.href + '/')
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={clsx(
                      'block px-3 py-2 rounded-md text-base font-medium',
                      isActive
                        ? 'bg-gray-700 text-white'
                        : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                    )}
                  >
                    {item.name}
                  </Link>
                )
              })}
            </div>
            {userProfile && (
              <div className="px-4 py-3 border-t border-gray-700">
                <div className="flex items-center">
                  {userProfile.avatar_url ? (
                    <img
                      className="h-8 w-8 rounded-full"
                      src={userProfile.avatar_url}
                      alt={userProfile.full_name}
                    />
                  ) : (
                    <div className="h-8 w-8 rounded-full bg-gray-700 flex items-center justify-center">
                      <FontAwesomeIcon icon={faUserCircle} className="h-5 w-5 text-gray-400" />
                    </div>
                  )}
                  <div className="ml-3 flex-1">
                    <p className="text-sm font-medium text-white">{userProfile.full_name}</p>
                    <p className="text-xs text-gray-400">{userProfile.email}</p>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="ml-2 text-gray-400 hover:text-white"
                    aria-label="Logout"
                  >
                    <FontAwesomeIcon icon={faSignOutAlt} className="h-5 w-5" />
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </nav>
    </>
  )
}

