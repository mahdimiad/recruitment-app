/**
 * Placeholder authentication utilities
 * In production, these would interact with Supabase Auth
 */

export function isLoggedIn(): boolean {
  if (typeof window === 'undefined') {
    return false
  }
  return localStorage.getItem('isLoggedIn') === 'true'
}

export function getUserEmail(): string | null {
  if (typeof window === 'undefined') {
    return null
  }
  return localStorage.getItem('userEmail')
}

export function login(email: string): void {
  if (typeof window === 'undefined') {
    return
  }
  localStorage.setItem('isLoggedIn', 'true')
  localStorage.setItem('userEmail', email)
}

export function logout(): void {
  if (typeof window === 'undefined') {
    return
  }
  localStorage.removeItem('isLoggedIn')
  localStorage.removeItem('userEmail')
}

