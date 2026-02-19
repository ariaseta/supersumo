import { useEffect } from 'react'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { toast } from 'sonner'
import { supabase } from '@/lib/supabase/client'

export const Route = createFileRoute('/auth/callback')({
  component: AuthCallback,
})

function AuthCallback() {
  const navigate = useNavigate()

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        const { data, error } = await supabase.auth.getSession()

        if (error) {
          toast.error('Authentication failed')
          navigate({ to: '/sign-in' })
          return
        }

        if (data.session) {
          toast.success('Signed in successfully')
          navigate({ to: '/' })
        } else {
          navigate({ to: '/sign-in' })
        }
      } catch {
        toast.error('Authentication failed')
        navigate({ to: '/sign-in' })
      }
    }

    handleAuthCallback()
  }, [navigate])

  return (
    <div className='flex min-h-screen items-center justify-center'>
      <div className='text-center'>
        <h2 className='text-2xl font-semibold'>Loading...</h2>
        <p className='text-muted-foreground'>
          Please wait while we sign you in.
        </p>
      </div>
    </div>
  )
}
