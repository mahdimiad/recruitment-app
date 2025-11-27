'use client'

import { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faUserCircle,
  faCreditCard,
  faKey,
  faPalette,
  faUsers,
  faPlug,
  faBell,
  faCheck,
  faDownload,
  faCopy,
  faTrashAlt,
  faPlus,
  faTimes,
} from '@fortawesome/free-solid-svg-icons'
import Breadcrumbs from '@/components/layout/Breadcrumbs'
import { getCompanyById, getProfilesByCompany, getSubscriptionByCompany, getUsageMetricsByCompany } from '@/lib/mock-db'
import { Company, Profile, Subscription, UsageMetric } from '@/types/database'
import { format } from 'date-fns'
import clsx from 'clsx'

type SettingsTab = 'account' | 'billing' | 'api' | 'branding' | 'users' | 'integrations' | 'notifications'

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<SettingsTab>('account')
  const [company, setCompany] = useState<Company | null>(null)
  const [profiles, setProfiles] = useState<Profile[]>([])
  const [subscription, setSubscription] = useState<Subscription | null>(null)
  const [usageMetrics, setUsageMetrics] = useState<UsageMetric[]>([])
  const [loading, setLoading] = useState(true)
  const [formData, setFormData] = useState({
    companyName: '',
    website: '',
    industry: '',
    companySize: '',
    adminName: '',
    adminEmail: '',
    adminPhone: '',
    adminPosition: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  })
  const [apiKeys, setApiKeys] = useState([
    { id: '1', name: 'Production API Key', key: 'sk_live_1234567890abcdef', created: '2025-01-15', lastUsed: '2025-11-24' },
    { id: '2', name: 'Development API Key', key: 'sk_test_abcdef1234567890', created: '2025-01-15', lastUsed: '2025-11-20' },
  ])
  const [copiedKeyId, setCopiedKeyId] = useState<string | null>(null)

  const companyId = 'company-1'

  useEffect(() => {
    const loadData = async () => {
      setLoading(true)
      try {
        const [companyData, profilesData, subscriptionData, metricsData] = await Promise.all([
          getCompanyById(companyId),
          getProfilesByCompany(companyId),
          getSubscriptionByCompany(companyId),
          getUsageMetricsByCompany(companyId),
        ])

        if (companyData) {
          setCompany(companyData)
          setFormData({
            companyName: companyData.name,
            website: '',
            industry: 'Technology',
            companySize: '51-200 employees',
            adminName: '',
            adminEmail: '',
            adminPhone: '',
            adminPosition: '',
            currentPassword: '',
            newPassword: '',
            confirmPassword: '',
          })
        }

        setProfiles(profilesData)
        setSubscription(subscriptionData)
        setUsageMetrics(metricsData)
      } catch (error) {
        console.error('Failed to load settings data:', error)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [companyId])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSaveAccount = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement actual save
    alert('Account settings saved (mock action)')
  }

  const handleCopyApiKey = (keyId: string) => {
    const apiKey = apiKeys.find(k => k.id === keyId)
    if (apiKey) {
      navigator.clipboard.writeText(apiKey.key)
      setCopiedKeyId(keyId)
      setTimeout(() => setCopiedKeyId(null), 2000)
    }
  }

  const handleDeleteApiKey = (keyId: string) => {
    if (confirm('Are you sure you want to delete this API key?')) {
      setApiKeys(prev => prev.filter(k => k.id !== keyId))
    }
  }

  const getUsagePercentage = (type: UsageMetric['metric_type']) => {
    if (!company) return 0
    const metric = usageMetrics.find(m => m.metric_type === type)
    if (!metric) return 0

    switch (type) {
      case 'cv_upload':
        return (metric.metric_value / company.max_cv_uploads_per_month) * 100
      case 'job_created':
        return (metric.metric_value / company.max_jobs) * 100
      case 'storage_used':
        return (metric.metric_value / company.storage_limit_gb) * 100
      default:
        return 0
    }
  }

  const getUsageValue = (type: UsageMetric['metric_type']) => {
    const metric = usageMetrics.find(m => m.metric_type === type)
    return metric?.metric_value || 0
  }

  const getUsageLimit = (type: UsageMetric['metric_type']) => {
    if (!company) return 0
    switch (type) {
      case 'cv_upload':
        return company.max_cv_uploads_per_month
      case 'job_created':
        return company.max_jobs
      case 'storage_used':
        return company.storage_limit_gb
      default:
        return 0
    }
  }

  if (loading) {
    return (
      <>
        <Breadcrumbs
          items={[
            { label: 'Dashboard', href: '/dashboard' },
            { label: 'Admin Settings', href: '#' },
          ]}
        />
        <div className="px-4 sm:px-6 lg:px-8 py-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-center h-64">
              <p className="text-gray-400">Loading settings...</p>
            </div>
          </div>
        </div>
      </>
    )
  }

  const tabs: { id: SettingsTab; label: string; icon: any }[] = [
    { id: 'account', label: 'Account', icon: faUserCircle },
    { id: 'billing', label: 'Billing & Usage', icon: faCreditCard },
    { id: 'api', label: 'API Keys', icon: faKey },
    { id: 'branding', label: 'Branding', icon: faPalette },
    { id: 'users', label: 'Users & Roles', icon: faUsers },
    { id: 'integrations', label: 'Integrations', icon: faPlug },
    { id: 'notifications', label: 'Notifications', icon: faBell },
  ]

  return (
    <>
      <Breadcrumbs
        items={[
          { label: 'Dashboard', href: '/dashboard' },
          { label: 'Admin Settings', href: '#' },
        ]}
      />
      <div className="px-4 sm:px-6 lg:px-8 py-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-white">Admin Settings</h1>
              <p className="mt-1 text-gray-400">Manage your account settings, users, and integrations</p>
            </div>
          </div>

          {/* Settings Content */}
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Sidebar Navigation */}
            <div className="w-full lg:w-1/4">
              <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden mb-6">
                <div className="p-5 border-b border-gray-700">
                  <h2 className="text-lg font-medium text-white">Settings</h2>
                </div>
                <div className="p-0">
                  <ul className="divide-y divide-gray-700">
                    {tabs.map((tab) => (
                      <li key={tab.id}>
                        <button
                          onClick={() => setActiveTab(tab.id)}
                          className={clsx(
                            'w-full text-left px-5 py-3 flex items-center hover:bg-gray-700 focus:outline-none transition-colors',
                            activeTab === tab.id
                              ? 'text-white border-l-4 border-green-400'
                              : 'text-gray-300'
                          )}
                        >
                          <FontAwesomeIcon icon={tab.icon} className="w-5 mr-3 text-gray-400" />
                          {tab.label}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Settings Panels */}
            <div className="w-full lg:w-3/4">
              {/* Account Settings Panel */}
              {activeTab === 'account' && (
                <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden mb-6">
                  <div className="p-5 border-b border-gray-700">
                    <h2 className="text-lg font-medium text-white">Account Settings</h2>
                  </div>
                  <div className="p-5">
                    <form onSubmit={handleSaveAccount}>
                      {/* Company Information */}
                      <div className="mb-6">
                        <h3 className="text-md font-medium text-white mb-4">Company Information</h3>
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                          <div>
                            <label htmlFor="company-name" className="block text-sm font-medium text-gray-400 mb-1">
                              Company Name
                            </label>
                            <input
                              type="text"
                              id="company-name"
                              name="companyName"
                              value={formData.companyName}
                              onChange={handleInputChange}
                              className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
                            />
                          </div>
                          <div>
                            <label htmlFor="website" className="block text-sm font-medium text-gray-400 mb-1">
                              Website
                            </label>
                            <input
                              type="url"
                              id="website"
                              name="website"
                              value={formData.website}
                              onChange={handleInputChange}
                              className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
                              placeholder="https://example.com"
                            />
                          </div>
                          <div>
                            <label htmlFor="industry" className="block text-sm font-medium text-gray-400 mb-1">
                              Industry
                            </label>
                            <select
                              id="industry"
                              name="industry"
                              value={formData.industry}
                              onChange={handleInputChange}
                              className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
                            >
                              <option>Technology</option>
                              <option>Finance</option>
                              <option>Healthcare</option>
                              <option>Education</option>
                              <option>Retail</option>
                              <option>Manufacturing</option>
                            </select>
                          </div>
                          <div>
                            <label htmlFor="company-size" className="block text-sm font-medium text-gray-400 mb-1">
                              Company Size
                            </label>
                            <select
                              id="company-size"
                              name="companySize"
                              value={formData.companySize}
                              onChange={handleInputChange}
                              className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
                            >
                              <option>1-10 employees</option>
                              <option>11-50 employees</option>
                              <option>51-200 employees</option>
                              <option>201-500 employees</option>
                              <option>501-1000 employees</option>
                              <option>1000+ employees</option>
                            </select>
                          </div>
                        </div>
                      </div>

                      {/* Admin Contact */}
                      <div className="mb-6 pt-6 border-t border-gray-700">
                        <h3 className="text-md font-medium text-white mb-4">Admin Contact</h3>
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                          <div>
                            <label htmlFor="admin-name" className="block text-sm font-medium text-gray-400 mb-1">
                              Full Name
                            </label>
                            <input
                              type="text"
                              id="admin-name"
                              name="adminName"
                              value={formData.adminName}
                              onChange={handleInputChange}
                              className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
                            />
                          </div>
                          <div>
                            <label htmlFor="admin-email" className="block text-sm font-medium text-gray-400 mb-1">
                              Email Address
                            </label>
                            <input
                              type="email"
                              id="admin-email"
                              name="adminEmail"
                              value={formData.adminEmail}
                              onChange={handleInputChange}
                              className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
                            />
                          </div>
                          <div>
                            <label htmlFor="admin-phone" className="block text-sm font-medium text-gray-400 mb-1">
                              Phone Number
                            </label>
                            <input
                              type="tel"
                              id="admin-phone"
                              name="adminPhone"
                              value={formData.adminPhone}
                              onChange={handleInputChange}
                              className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
                            />
                          </div>
                          <div>
                            <label htmlFor="admin-position" className="block text-sm font-medium text-gray-400 mb-1">
                              Job Title
                            </label>
                            <input
                              type="text"
                              id="admin-position"
                              name="adminPosition"
                              value={formData.adminPosition}
                              onChange={handleInputChange}
                              className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Password Change */}
                      <div className="mb-6 pt-6 border-t border-gray-700">
                        <h3 className="text-md font-medium text-white mb-4">Change Password</h3>
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                          <div>
                            <label htmlFor="current-password" className="block text-sm font-medium text-gray-400 mb-1">
                              Current Password
                            </label>
                            <input
                              type="password"
                              id="current-password"
                              name="currentPassword"
                              value={formData.currentPassword}
                              onChange={handleInputChange}
                              className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
                              placeholder="Enter your current password"
                            />
                          </div>
                          <div></div>
                          <div>
                            <label htmlFor="new-password" className="block text-sm font-medium text-gray-400 mb-1">
                              New Password
                            </label>
                            <input
                              type="password"
                              id="new-password"
                              name="newPassword"
                              value={formData.newPassword}
                              onChange={handleInputChange}
                              className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
                              placeholder="Enter new password"
                            />
                          </div>
                          <div>
                            <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-400 mb-1">
                              Confirm New Password
                            </label>
                            <input
                              type="password"
                              id="confirm-password"
                              name="confirmPassword"
                              value={formData.confirmPassword}
                              onChange={handleInputChange}
                              className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
                              placeholder="Confirm new password"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="pt-6 border-t border-gray-700 flex justify-end">
                        <button
                          type="button"
                          className="inline-flex items-center px-4 py-2 border border-gray-600 rounded-md shadow-sm text-sm font-medium text-white bg-gray-700 hover:bg-gray-600 focus:outline-none mr-3"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-gray-900 bg-gradient-to-r from-green-400 to-emerald-500 hover:from-green-500 hover:to-emerald-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                        >
                          Save Changes
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}

              {/* Billing & Usage Panel */}
              {activeTab === 'billing' && (
                <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden mb-6">
                  <div className="p-5 border-b border-gray-700">
                    <h2 className="text-lg font-medium text-white">Billing & Usage</h2>
                  </div>
                  <div className="p-5">
                    {/* Current Plan */}
                    <div className="mb-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-md font-medium text-white">Current Plan</h3>
                          {subscription && (
                            <p className="text-gray-400 text-sm">
                              Your plan renews on {format(new Date(subscription.current_period_end), 'MMMM dd, yyyy')}
                            </p>
                          )}
                        </div>
                        <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-gray-900 bg-gradient-to-r from-green-400 to-emerald-500 hover:from-green-500 hover:to-emerald-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                          Upgrade Plan
                        </button>
                      </div>
                      <div className="bg-gray-700 rounded-lg p-4 border border-gray-600">
                        <div className="flex flex-col sm:flex-row justify-between mb-4">
                          <div>
                            <span className="px-3 py-1 bg-gradient-to-r from-green-400 to-emerald-500 text-gray-900 text-sm font-semibold rounded-full">
                              {company?.subscription_tier ? company.subscription_tier.charAt(0).toUpperCase() + company.subscription_tier.slice(1) : 'Professional'} Plan
                            </span>
                            <p className="text-white font-medium mt-2">$199 per month</p>
                          </div>
                          <div className="mt-3 sm:mt-0">
                            <span className="text-gray-400 block mb-1">Active Users:</span>
                            <span className="text-white font-medium">
                              {profiles.length} / {company?.max_users || 0}
                            </span>
                          </div>
                          {subscription && (
                            <div className="mt-3 sm:mt-0">
                              <span className="text-gray-400 block mb-1">Next Billing Date:</span>
                              <span className="text-white font-medium">
                                {format(new Date(subscription.current_period_end), 'MMM dd, yyyy')}
                              </span>
                            </div>
                          )}
                        </div>
                        <div className="border-t border-gray-600 pt-4">
                          <h4 className="text-white font-medium mb-2">Features Included:</h4>
                          <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2">
                            <li className="flex items-center text-sm text-gray-300">
                              <FontAwesomeIcon icon={faCheck} className="text-green-400 mr-2" />
                              Up to {company?.max_users || 0} users
                            </li>
                            <li className="flex items-center text-sm text-gray-300">
                              <FontAwesomeIcon icon={faCheck} className="text-green-400 mr-2" />
                              {company?.max_cv_uploads_per_month || 0} CV parses per month
                            </li>
                            <li className="flex items-center text-sm text-gray-300">
                              <FontAwesomeIcon icon={faCheck} className="text-green-400 mr-2" />
                              Custom branding
                            </li>
                            <li className="flex items-center text-sm text-gray-300">
                              <FontAwesomeIcon icon={faCheck} className="text-green-400 mr-2" />
                              API access
                            </li>
                            <li className="flex items-center text-sm text-gray-300">
                              <FontAwesomeIcon icon={faCheck} className="text-green-400 mr-2" />
                              Advanced analytics
                            </li>
                            <li className="flex items-center text-sm text-gray-300">
                              <FontAwesomeIcon icon={faCheck} className="text-green-400 mr-2" />
                              Email support
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    {/* Usage Statistics */}
                    <div className="mb-6 pt-6 border-t border-gray-700">
                      <h3 className="text-md font-medium text-white mb-4">Usage Statistics</h3>

                      {/* CV Processing */}
                      <div className="mb-6">
                        <div className="flex justify-between mb-1">
                          <span className="text-sm text-gray-400">CV Parsing Usage</span>
                          <span className="text-sm text-white">
                            {getUsageValue('cv_upload')} / {getUsageLimit('cv_upload')}
                          </span>
                        </div>
                        <div className="bg-gray-700 rounded-full h-2.5">
                          <div
                            className="bg-gradient-to-r from-green-400 to-emerald-500 h-2.5 rounded-full"
                            style={{ width: `${Math.min(getUsagePercentage('cv_upload'), 100)}%` }}
                          ></div>
                        </div>
                        <p className="text-xs text-gray-400 mt-1">
                          {Math.round(getUsagePercentage('cv_upload'))}% of monthly quota used (
                          {getUsageLimit('cv_upload') - getUsageValue('cv_upload')} parses remaining)
                        </p>
                      </div>

                      {/* Storage */}
                      <div className="mb-6">
                        <div className="flex justify-between mb-1">
                          <span className="text-sm text-gray-400">Storage Usage</span>
                          <span className="text-sm text-white">
                            {getUsageValue('storage_used')} GB / {getUsageLimit('storage_used')} GB
                          </span>
                        </div>
                        <div className="bg-gray-700 rounded-full h-2.5">
                          <div
                            className="bg-gradient-to-r from-green-400 to-emerald-500 h-2.5 rounded-full"
                            style={{ width: `${Math.min(getUsagePercentage('storage_used'), 100)}%` }}
                          ></div>
                        </div>
                        <p className="text-xs text-gray-400 mt-1">
                          {Math.round(getUsagePercentage('storage_used'))}% of storage used (
                          {getUsageLimit('storage_used') - getUsageValue('storage_used')} GB remaining)
                        </p>
                      </div>

                      {/* Jobs Created */}
                      <div className="mb-6">
                        <div className="flex justify-between mb-1">
                          <span className="text-sm text-gray-400">Jobs Created</span>
                          <span className="text-sm text-white">
                            {getUsageValue('job_created')} / {getUsageLimit('job_created')}
                          </span>
                        </div>
                        <div className="bg-gray-700 rounded-full h-2.5">
                          <div
                            className="bg-gradient-to-r from-green-400 to-emerald-500 h-2.5 rounded-full"
                            style={{ width: `${Math.min(getUsagePercentage('job_created'), 100)}%` }}
                          ></div>
                        </div>
                        <p className="text-xs text-gray-400 mt-1">
                          {Math.round(getUsagePercentage('job_created'))}% of limit used (
                          {getUsageLimit('job_created') - getUsageValue('job_created')} jobs remaining)
                        </p>
                      </div>
                    </div>

                    {/* Billing History */}
                    <div className="pt-6 border-t border-gray-700">
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="text-md font-medium text-white">Billing History</h3>
                        <button className="text-sm text-green-400 hover:text-green-300 flex items-center">
                          <FontAwesomeIcon icon={faDownload} className="mr-1" />
                          Download All
                        </button>
                      </div>
                      <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-700">
                          <thead className="bg-gray-700">
                            <tr>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                Invoice
                              </th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                Date
                              </th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                Amount
                              </th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                Status
                              </th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                Action
                              </th>
                            </tr>
                          </thead>
                          <tbody className="bg-gray-800 divide-y divide-gray-700">
                            <tr>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-white">INV-2025-1042</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">Nov 23, 2025</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-white">$199.00</td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                  Paid
                                </span>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                                <button className="text-green-400 hover:text-green-300">
                                  <FontAwesomeIcon icon={faDownload} />
                                </button>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* API Keys Panel */}
              {activeTab === 'api' && (
                <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden mb-6">
                  <div className="p-5 border-b border-gray-700 flex justify-between items-center">
                    <h2 className="text-lg font-medium text-white">API Keys</h2>
                    <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-gray-900 bg-gradient-to-r from-green-400 to-emerald-500 hover:from-green-500 hover:to-emerald-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                      <FontAwesomeIcon icon={faPlus} className="mr-2" />
                      Create API Key
                    </button>
                  </div>
                  <div className="p-5">
                    <div className="space-y-4">
                      {apiKeys.map((apiKey) => (
                        <div key={apiKey.id} className="bg-gray-700 rounded-lg p-4 border border-gray-600">
                          <div className="flex justify-between items-start mb-3">
                            <div>
                              <h3 className="text-white font-medium">{apiKey.name}</h3>
                              <p className="text-gray-400 text-sm mt-1">
                                Created: {format(new Date(apiKey.created), 'MMM dd, yyyy')} • Last used:{' '}
                                {format(new Date(apiKey.lastUsed), 'MMM dd, yyyy')}
                              </p>
                            </div>
                            <button
                              onClick={() => handleDeleteApiKey(apiKey.id)}
                              className="text-red-400 hover:text-red-300"
                              title="Delete API key"
                            >
                              <FontAwesomeIcon icon={faTrashAlt} />
                            </button>
                          </div>
                          <div className="flex items-center space-x-2">
                            <input
                              type="text"
                              value={apiKey.key}
                              readOnly
                              className="flex-1 bg-gray-800 border border-gray-600 rounded-md py-2 px-3 text-white text-sm font-mono"
                            />
                            <button
                              onClick={() => handleCopyApiKey(apiKey.id)}
                              className="inline-flex items-center px-3 py-2 border border-gray-600 rounded-md shadow-sm text-sm font-medium text-white bg-gray-700 hover:bg-gray-600 focus:outline-none"
                            >
                              <FontAwesomeIcon
                                icon={copiedKeyId === apiKey.id ? faCheck : faCopy}
                                className="mr-2"
                              />
                              {copiedKeyId === apiKey.id ? 'Copied!' : 'Copy'}
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Branding Panel */}
              {activeTab === 'branding' && (
                <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden mb-6">
                  <div className="p-5 border-b border-gray-700">
                    <h2 className="text-lg font-medium text-white">Branding</h2>
                  </div>
                  <div className="p-5">
                    <div className="mb-6">
                      <h3 className="text-md font-medium text-white mb-4">Company Logo</h3>
                      <div className="flex items-center space-x-4">
                        <div className="h-24 w-24 bg-gray-700 rounded-lg flex items-center justify-center">
                          {company?.logo_url ? (
                            <img src={company.logo_url} alt="Company logo" className="h-full w-full object-contain" />
                          ) : (
                            <span className="text-gray-400 text-sm">No logo</span>
                          )}
                        </div>
                        <div>
                          <button className="inline-flex items-center px-4 py-2 border border-gray-600 rounded-md shadow-sm text-sm font-medium text-white bg-gray-700 hover:bg-gray-600 focus:outline-none">
                            Upload Logo
                          </button>
                          <p className="text-xs text-gray-400 mt-2">Recommended: 200x200px, PNG or SVG</p>
                        </div>
                      </div>
                    </div>
                    <div className="mb-6 pt-6 border-t border-gray-700">
                      <h3 className="text-md font-medium text-white mb-4">Brand Colors</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-400 mb-2">Primary Color</label>
                          <div className="flex items-center space-x-2">
                            <div className="h-10 w-10 rounded border border-gray-600 bg-green-400"></div>
                            <input
                              type="text"
                              value="#34d399"
                              className="flex-1 bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-400 mb-2">Secondary Color</label>
                          <div className="flex items-center space-x-2">
                            <div className="h-10 w-10 rounded border border-gray-600 bg-emerald-500"></div>
                            <input
                              type="text"
                              value="#10b981"
                              className="flex-1 bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="pt-6 border-t border-gray-700 flex justify-end">
                      <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-gray-900 bg-gradient-to-r from-green-400 to-emerald-500 hover:from-green-500 hover:to-emerald-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                        Save Branding
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Users & Roles Panel */}
              {activeTab === 'users' && (
                <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden mb-6">
                  <div className="p-5 border-b border-gray-700 flex justify-between items-center">
                    <h2 className="text-lg font-medium text-white">Users & Roles</h2>
                    <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-gray-900 bg-gradient-to-r from-green-400 to-emerald-500 hover:from-green-500 hover:to-emerald-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                      <FontAwesomeIcon icon={faPlus} className="mr-2" />
                      Add User
                    </button>
                  </div>
                  <div className="p-5">
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-700">
                        <thead className="bg-gray-700">
                          <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                              User
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                              Role
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                              Status
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                              Actions
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-gray-800 divide-y divide-gray-700">
                          {profiles.map((profile) => (
                            <tr key={profile.id}>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                  <div className="h-10 w-10 rounded-full bg-gray-700 flex items-center justify-center mr-3">
                                    <span className="text-white text-sm font-medium">
                                      {profile.full_name.charAt(0).toUpperCase()}
                                    </span>
                                  </div>
                                  <div>
                                    <div className="text-sm font-medium text-white">{profile.full_name}</div>
                                    <div className="text-sm text-gray-400">{profile.email}</div>
                                  </div>
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <select
                                  defaultValue={profile.role}
                                  className="bg-gray-700 border border-gray-600 rounded-md py-1 px-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-green-500"
                                >
                                  <option value="admin">Admin</option>
                                  <option value="recruiter">Recruiter</option>
                                  <option value="viewer">Viewer</option>
                                </select>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                  Active
                                </span>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                <button className="text-red-400 hover:text-red-300">
                                  <FontAwesomeIcon icon={faTrashAlt} />
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {/* Integrations Panel */}
              {activeTab === 'integrations' && (
                <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden mb-6">
                  <div className="p-5 border-b border-gray-700">
                    <h2 className="text-lg font-medium text-white">Integrations</h2>
                  </div>
                  <div className="p-5">
                    <p className="text-gray-400 mb-6">Connect your favorite tools and services.</p>
                    <div className="space-y-4">
                      <div className="bg-gray-700 rounded-lg p-4 border border-gray-600 flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="h-12 w-12 bg-gray-600 rounded-lg flex items-center justify-center mr-4">
                            <FontAwesomeIcon icon={faPlug} className="text-2xl text-gray-400" />
                          </div>
                          <div>
                            <h3 className="text-white font-medium">Slack</h3>
                            <p className="text-gray-400 text-sm">Get notifications in Slack channels</p>
                          </div>
                        </div>
                        <button className="inline-flex items-center px-4 py-2 border border-gray-600 rounded-md shadow-sm text-sm font-medium text-white bg-gray-700 hover:bg-gray-600 focus:outline-none">
                          Connect
                        </button>
                      </div>
                      <div className="bg-gray-700 rounded-lg p-4 border border-gray-600 flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="h-12 w-12 bg-gray-600 rounded-lg flex items-center justify-center mr-4">
                            <FontAwesomeIcon icon={faPlug} className="text-2xl text-gray-400" />
                          </div>
                          <div>
                            <h3 className="text-white font-medium">Microsoft Teams</h3>
                            <p className="text-gray-400 text-sm">Send updates to Teams channels</p>
                          </div>
                        </div>
                        <button className="inline-flex items-center px-4 py-2 border border-gray-600 rounded-md shadow-sm text-sm font-medium text-white bg-gray-700 hover:bg-gray-600 focus:outline-none">
                          Connect
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Notifications Panel */}
              {activeTab === 'notifications' && (
                <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden mb-6">
                  <div className="p-5 border-b border-gray-700">
                    <h2 className="text-lg font-medium text-white">Notifications</h2>
                  </div>
                  <div className="p-5">
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-md font-medium text-white mb-4">Email Notifications</h3>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <div>
                              <label className="text-sm font-medium text-white">New Application Received</label>
                              <p className="text-xs text-gray-400">Get notified when a candidate applies</p>
                            </div>
                            <input type="checkbox" defaultChecked className="h-5 w-5 text-green-500" />
                          </div>
                          <div className="flex items-center justify-between">
                            <div>
                              <label className="text-sm font-medium text-white">Candidate Shortlisted</label>
                              <p className="text-xs text-gray-400">Notifications for shortlisted candidates</p>
                            </div>
                            <input type="checkbox" defaultChecked className="h-5 w-5 text-green-500" />
                          </div>
                          <div className="flex items-center justify-between">
                            <div>
                              <label className="text-sm font-medium text-white">Weekly Summary</label>
                              <p className="text-xs text-gray-400">Receive weekly activity summary</p>
                            </div>
                            <input type="checkbox" className="h-5 w-5 text-green-500" />
                          </div>
                        </div>
                      </div>
                      <div className="pt-6 border-t border-gray-700">
                        <h3 className="text-md font-medium text-white mb-4">In-App Notifications</h3>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <div>
                              <label className="text-sm font-medium text-white">Browser Notifications</label>
                              <p className="text-xs text-gray-400">Enable browser push notifications</p>
                            </div>
                            <input type="checkbox" defaultChecked className="h-5 w-5 text-green-500" />
                          </div>
                        </div>
                      </div>
                      <div className="pt-6 border-t border-gray-700 flex justify-end">
                        <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-gray-900 bg-gradient-to-r from-green-400 to-emerald-500 hover:from-green-500 hover:to-emerald-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                          Save Preferences
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

