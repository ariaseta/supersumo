import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl) {
  throw new Error(
    'Missing VITE_SUPABASE_URL environment variable.\n' +
      'Please add it to your .env file.\n' +
      'Get it from: https://app.supabase.com -> Project Settings -> API'
  )
}

if (!supabaseAnonKey) {
  throw new Error(
    'Missing VITE_SUPABASE_ANON_KEY environment variable.\n' +
      'Please add it to your .env file.\n' +
      'Get it from: https://app.supabase.com -> Project Settings -> API'
  )
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
