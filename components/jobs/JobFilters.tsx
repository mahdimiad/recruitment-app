'use client'

import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faFilter,
  faDownload,
  faSyncAlt,
} from '@fortawesome/free-solid-svg-icons'

interface JobFiltersProps {
  onFilterChange: (filters: {
    status: string
    department: string
    location: string
  }) => void
}

export default function JobFilters({ onFilterChange }: JobFiltersProps) {
  const [filters, setFilters] = useState({
    status: '',
    department: '',
    location: '',
  })

  const handleFilterChange = (key: string, value: string) => {
    const newFilters = { ...filters, [key]: value }
    setFilters(newFilters)
    onFilterChange(newFilters)
  }

  const handleRefresh = () => {
    // Reset filters and refresh
    const resetFilters = { status: '', department: '', location: '' }
    setFilters(resetFilters)
    onFilterChange(resetFilters)
  }

  return (
    <div className="mt-6 bg-gray-800 rounded-lg shadow overflow-hidden">
      <div className="px-4 py-5 sm:p-6">
        <div className="flex flex-col sm:flex-row justify-between space-y-3 sm:space-y-0 sm:space-x-4">
          <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-3 sm:space-y-0">
            <select
              id="status-filter"
              value={filters.status}
              onChange={(e) => handleFilterChange('status', e.target.value)}
              className="bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 pl-3 pr-10 text-base text-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
            >
              <option value="">All Statuses</option>
              <option value="published">Active</option>
              <option value="paused">Paused</option>
              <option value="draft">Draft</option>
              <option value="closed">Expired</option>
            </select>
            <select
              id="department-filter"
              value={filters.department}
              onChange={(e) => handleFilterChange('department', e.target.value)}
              className="bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 pl-3 pr-10 text-base text-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
            >
              <option value="">All Departments</option>
              <option value="engineering">Engineering</option>
              <option value="design">Design</option>
              <option value="marketing">Marketing</option>
              <option value="sales">Sales</option>
              <option value="product">Product</option>
            </select>
            <select
              id="location-filter"
              value={filters.location}
              onChange={(e) => handleFilterChange('location', e.target.value)}
              className="bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 pl-3 pr-10 text-base text-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
            >
              <option value="">All Locations</option>
              <option value="remote">Remote</option>
              <option value="usa">United States</option>
              <option value="europe">Europe</option>
              <option value="asia">Asia</option>
            </select>
          </div>
          <div className="flex space-x-3">
            <button
              type="button"
              className="inline-flex items-center px-4 py-2 border border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-300 bg-gray-700 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              <FontAwesomeIcon icon={faFilter} className="mr-2 h-4 w-4" />
              Filter
            </button>
            <button
              type="button"
              className="inline-flex items-center px-4 py-2 border border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-300 bg-gray-700 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              <FontAwesomeIcon icon={faDownload} className="mr-2 h-4 w-4" />
              Export
            </button>
            <button
              type="button"
              onClick={handleRefresh}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-gray-900 bg-green-400 hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              <FontAwesomeIcon icon={faSyncAlt} className="mr-2 h-4 w-4" />
              Refresh
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

