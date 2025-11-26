/**
 * Supabase Configuration Utilities
 * 
 * Helper functions to check if Supabase is configured
 */

/**
 * Check if Supabase is configured
 * Returns true if both URL and anon key are set
 */
export function isSupabaseConfigured(): boolean {
  return !!(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  )
}

/**
 * Get Supabase configuration status message
 */
export function getSupabaseStatus(): {
  configured: boolean
  message: string
} {
  const hasUrl = !!process.env.NEXT_PUBLIC_SUPABASE_URL
  const hasKey = !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (hasUrl && hasKey) {
    return {
      configured: true,
      message: 'Supabase is configured and ready to use',
    }
  }

  if (!hasUrl && !hasKey) {
    return {
      configured: false,
      message: 'Using mock database. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to use Supabase.',
    }
  }

  return {
    configured: false,
    message: 'Supabase configuration incomplete. Check your environment variables.',
  }
}

