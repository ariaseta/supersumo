import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// eslint-disable-next-line no-console
console.error({
  message: 'Supabase Configuration',
  hasUrl: !!supabaseUrl,
  hasAnonKey: !!supabaseAnonKey,
  supabaseUrl: supabaseUrl ? `${supabaseUrl.substring(0, 20)}...` : 'MISSING',
  supabaseAnonKey: supabaseAnonKey ? `${supabaseAnonKey.substring(0, 10)}...` : 'MISSING',
})

if (!supabaseUrl) {
  // eslint-disable-next-line no-console
  console.error('Missing VITE_SUPABASE_URL environment variable')
  throw new Error(
    'Missing VITE_SUPABASE_URL environment variable.\n' +
      'Please add it to your .env file.\n' +
      'Get it from: https://app.supabase.com -> Project Settings -> API'
  )
}

if (!supabaseAnonKey) {
  // eslint-disable-next-line no-console
  console.error('Missing VITE_SUPABASE_ANON_KEY environment variable')
  throw new Error(
    'Missing VITE_SUPABASE_ANON_KEY environment variable.\n' +
      'Please add it to your .env file.\n' +
      'Get it from: https://app.supabase.com -> Project Settings -> API'
  )
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
