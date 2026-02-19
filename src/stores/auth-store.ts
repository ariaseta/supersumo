import { type User } from '@supabase/supabase-js'
import { create } from 'zustand'
import { getCookie, setCookie, removeCookie } from '@/lib/cookies'

const ACCESS_TOKEN = 'thisisjustarandomstring'

interface AuthUser {
  accountNo: string
  email: string
  role: string[]
  exp: number
}

interface AuthState {
  auth: {
    user: AuthUser | null
    setUser: (user: AuthUser | null) => void
    accessToken: string
    setAccessToken: (accessToken: string) => void
    resetAccessToken: () => void
    reset: () => void
    // Supabase integration
    syncWithSupabase: (user: User | null) => void
  }
}

// Helper function to convert Supabase User to AuthUser
function supabaseUserToAuthUser(user: User | null): AuthUser | null {
  if (!user) return null

  return {
    accountNo: user.id,
    email: user.email || '',
    role: user.user_metadata?.role || [],
    exp: Math.floor(Date.now() / 1000) + 24 * 60 * 60, // 24 hours from now
  }
}

export const useAuthStore = create<AuthState>()((set) => {
  const cookieState = getCookie(ACCESS_TOKEN)
  const initToken = cookieState ? JSON.parse(cookieState) : ''
  return {
    auth: {
      user: null,
      setUser: (user) =>
        set((state) => ({ ...state, auth: { ...state.auth, user } })),
      accessToken: initToken,
      setAccessToken: (accessToken) =>
        set((state) => {
          setCookie(ACCESS_TOKEN, JSON.stringify(accessToken))
          return { ...state, auth: { ...state.auth, accessToken } }
        }),
      resetAccessToken: () =>
        set((state) => {
          removeCookie(ACCESS_TOKEN)
          return { ...state, auth: { ...state.auth, accessToken: '' } }
        }),
      reset: () =>
        set((state) => {
          removeCookie(ACCESS_TOKEN)
          return {
            ...state,
            auth: { ...state.auth, user: null, accessToken: '' },
          }
        }),
      syncWithSupabase: (user) => {
        const authUser = supabaseUserToAuthUser(user)
        set((state) => ({
          ...state,
          auth: {
            ...state.auth,
            user: authUser,
            accessToken: user?.id || '',
          },
        }))
      },
    },
  }
})
