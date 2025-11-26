import { createBrowserClient } from '@supabase/ssr'
import { Database } from '@/types/database'

/**
 * Create Supabase client for browser
 * Returns null if Supabase is not configured (using mock database)
 */
export function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  // If Supabase is not configured, return null
  // The app will use mock database instead
  if (!supabaseUrl || !supabaseAnonKey) {
    return null
  }

  return createBrowserClient<Database>(supabaseUrl, supabaseAnonKey)
}

