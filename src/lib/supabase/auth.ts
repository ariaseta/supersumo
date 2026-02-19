import type { AuthError, User } from '@supabase/supabase-js'
import { supabase } from './client'

export async function signInWithEmail(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  return { data, error }
}

export async function signUpWithEmail(email: string, password: string) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  })

  return { data, error }
}

export async function signOut() {
  const { error } = await supabase.auth.signOut()
  return { error }
}

export async function resetPassword(email: string) {
  const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/auth/reset-password`,
  })

  return { data, error }
}

export async function getCurrentUser(): Promise<{
  user: User | null
  error: AuthError | null
}> {
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()

  return { user, error }
}

export async function getSession() {
  const {
    data: { session },
    error,
  } = await supabase.auth.getSession()

  return { session, error }
}
