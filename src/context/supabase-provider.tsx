import {
  type ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react'
import { useNavigate } from '@tanstack/react-router'
import { type Session, type User } from '@supabase/supabase-js'
import { toast } from 'sonner'
import { useAuthStore } from '@/stores/auth-store'
import { supabase } from '@/lib/supabase/client'

interface SupabaseContext {
  user: User | null
  session: Session | null
  isLoading: boolean
  signOut: () => Promise<void>
}

const Context = createContext<SupabaseContext | undefined>(undefined)

export function SupabaseProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const navigate = useNavigate()
  const syncWithSupabase = useAuthStore((state) => state.auth.syncWithSupabase)

  useEffect(() => {
    let isMounted = true

    // Get initial session with error handling
    supabase.auth.getSession().then(({ data: { session }, error }) => {
      if (!isMounted) return

      if (error) {
        // Handle session expired or invalid refresh token
        if (
          error.message.includes('Session Expired') ||
          error.message.includes('Invalid Refresh Token')
        ) {
          toast.error('Your session has expired. Please sign in again.')
          // Clear the expired session
          supabase.auth.signOut({ scope: 'global' }).catch(() => {})
        }
        setIsLoading(false)
        return
      }

      setSession(session)
      setUser(session?.user ?? null)
      syncWithSupabase(session?.user ?? null)
      setIsLoading(false)
    })

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (!isMounted) return

      setSession(session)
      setUser(session?.user ?? null)
      syncWithSupabase(session?.user ?? null)
      setIsLoading(false)

      // Handle token refresh errors
      if (event === 'TOKEN_REFRESHED') {
        toast.success('Session refreshed')
      } else if (event === 'SIGNED_OUT') {
        toast.success('Signed out successfully')
      }
    })

    return () => {
      isMounted = false
      subscription.unsubscribe()
    }
  }, [syncWithSupabase])

  const signOut = async () => {
    try {
      await supabase.auth.signOut()
      navigate({ to: '/sign-in' })
    } catch {
      // Navigate anyway even if sign out fails
      navigate({ to: '/sign-in' })
    }
  }

  const value = {
    user,
    session,
    isLoading,
    signOut,
  }

  return <Context.Provider value={value}>{children}</Context.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useSupabase() {
  const context = useContext(Context)

  if (context === undefined) {
    throw new Error('useSupabase must be used within SupabaseProvider')
  }

  return context
}
