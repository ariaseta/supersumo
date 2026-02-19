import { supabase } from './client'

/**
 * Check if email authentication is properly configured
 */
export async function checkSupabaseAuthConfig() {
  try {
    // Try to get current session
    const { error } = await supabase.auth.getSession()

    if (error) {
      return {
        configured: true,
        error: error.message,
      }
    }

    return {
      configured: true,
    }
  } catch (err) {
    return {
      configured: false,
      error: err instanceof Error ? err.message : 'Unknown error',
    }
  }
}
