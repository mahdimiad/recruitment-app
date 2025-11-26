/**
 * Utility functions for calculating date ranges
 */

export type Period = 'this-week' | 'last-week' | 'this-month' | 'last-month'

export interface DateRange {
  startDate: Date
  endDate: Date
}

/**
 * Get date range for a given period
 */
export function getDateRangeForPeriod(period: Period): DateRange {
  const now = new Date()
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  
  let startDate: Date
  let endDate: Date = new Date(today)
  endDate.setHours(23, 59, 59, 999) // End of today

  switch (period) {
    case 'this-week': {
      // Start of this week (Monday)
      const dayOfWeek = today.getDay()
      const diff = today.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1) // Adjust when day is Sunday
      startDate = new Date(today.setDate(diff))
      startDate.setHours(0, 0, 0, 0)
      break
    }
    case 'last-week': {
      // Start of last week (Monday)
      const dayOfWeek = today.getDay()
      const diff = today.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1) - 7
      startDate = new Date(today.setDate(diff))
      startDate.setHours(0, 0, 0, 0)
      // End of last week (Sunday)
      endDate = new Date(startDate)
      endDate.setDate(endDate.getDate() + 6)
      endDate.setHours(23, 59, 59, 999)
      break
    }
    case 'this-month': {
      // Start of this month
      startDate = new Date(today.getFullYear(), today.getMonth(), 1)
      startDate.setHours(0, 0, 0, 0)
      break
    }
    case 'last-month': {
      // Start of last month
      startDate = new Date(today.getFullYear(), today.getMonth() - 1, 1)
      startDate.setHours(0, 0, 0, 0)
      // End of last month
      endDate = new Date(today.getFullYear(), today.getMonth(), 0)
      endDate.setHours(23, 59, 59, 999)
      break
    }
    default:
      // Default to this month
      startDate = new Date(today.getFullYear(), today.getMonth(), 1)
      startDate.setHours(0, 0, 0, 0)
  }

  return { startDate, endDate }
}

/**
 * Check if a date is within a date range
 */
export function isDateInRange(date: Date, range: DateRange): boolean {
  return date >= range.startDate && date <= range.endDate
}

