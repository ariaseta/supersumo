import { useState, useEffect } from 'react'
import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { Turnstile } from '@marsidev/react-turnstile'
import { Loader2, Mail, Key, User, Building2 } from 'lucide-react'
import { toast } from 'sonner'
import { supabase } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const ENABLE_GITHUB = import.meta.env.VITE_ENABLE_GITHUB_LOGIN === 'true'
const ENABLE_TURNSTILE =
  import.meta.env.VITE_ENABLE_CLOUDFLARE_TURNSTILE === 'true'
const TURNSTILE_SITE_KEY =
  import.meta.env.VITE_CLOUDFLARE_TURNSTILE_SITE_KEY ?? ''

// eslint-disable-next-line react-refresh/only-export-components
function GoogleIcon() {
  return (
    <svg className='mr-2 h-4 w-4' viewBox='0 0 24 24' aria-hidden='true'>
      <path
        fill='#4285F4'
        d='M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z'
      />
      <path
        fill='#34A853'
        d='M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z'
      />
      <path
        fill='#FBBC05'
        d='M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z'
      />
      <path
        fill='#EA4335'
        d='M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z'
      />
    </svg>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
function GitHubIcon() {
  return (
    <svg
      className='mr-2 h-4 w-4'
      viewBox='0 0 24 24'
      fill='currentColor'
      aria-hidden='true'
    >
      <path d='M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z' />
    </svg>
  )
}

export const Route = createFileRoute('/(auth)/sign-up')({
  component: SignUp,
})

const OTP_COOLDOWN_SECONDS = 60

// eslint-disable-next-line react-refresh/only-export-components
function SignUp() {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [showOtpInput, setShowOtpInput] = useState(false)
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [companyName, setCompanyName] = useState('')
  const [email, setEmail] = useState('')
  const [otp, setOtp] = useState('')
  const [countdown, setCountdown] = useState(0)
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null)

  // Countdown timer effect
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000)
      return () => clearTimeout(timer)
    }
  }, [countdown])

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email || !email.includes('@')) {
      toast.error('Please enter a valid email address')
      return
    }

    if (ENABLE_TURNSTILE && !turnstileToken) {
      toast.error('Please complete the security verification')
      return
    }

    setIsLoading(true)

    try {
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: `${window.location.origin}/`,
          data: {
            first_name: firstName,
            last_name: lastName,
            company_name: companyName,
          },
        },
      })

      if (error) throw error

      toast.success('Verification code sent to your email')
      setShowOtpInput(true)
      setCountdown(OTP_COOLDOWN_SECONDS)
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : 'Failed to send code'
      toast.error(message)
    } finally {
      setIsLoading(false)
    }
  }

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!otp || otp.length !== 6) {
      toast.error('Please enter the 6-digit verification code')
      return
    }

    setIsLoading(true)

    try {
      const { error } = await supabase.auth.verifyOtp({
        email,
        token: otp,
        type: 'signup',
      })

      if (error) {
        if (
          error.message.includes('403') ||
          error.message.includes('Forbidden')
        ) {
          toast.error(
            'Code expired or invalid. Please request a new verification code.'
          )
        } else {
          toast.error(`Invalid code: ${error.message}`)
        }
        return
      }

      toast.success('Account created successfully')
      navigate({ to: '/' })
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : 'Failed to verify code'
      toast.error(message)
    } finally {
      setIsLoading(false)
    }
  }

  const handleResendOtp = async () => {
    if (countdown > 0) return

    setIsLoading(true)

    try {
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: `${window.location.origin}/`,
        },
      })

      if (error) throw error

      toast.success('New verification code sent to your email')
      setCountdown(OTP_COOLDOWN_SECONDS)
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : 'Failed to resend code'
      toast.error(message)
    } finally {
      setIsLoading(false)
    }
  }

  const handleOAuthSignUp = async (provider: 'google' | 'github') => {
    setIsLoading(true)

    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}/`,
        },
      })

      if (error) throw error
    } catch (error: unknown) {
      const message =
        error instanceof Error
          ? error.message
          : `Failed to sign up with ${provider}`
      toast.error(message)
      setIsLoading(false)
    }
  }

  if (showOtpInput) {
    return (
      <div className='flex min-h-screen items-center justify-center bg-background p-4'>
        <Card className='w-full max-w-md'>
          <CardHeader className='space-y-1 text-center'>
            <CardTitle className='text-2xl font-bold'>
              Enter verification code
            </CardTitle>
            <CardDescription>
              Enter the code we sent to your email
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleVerifyOtp} className='grid gap-4'>
              <div className='rounded-md border border-green-200 bg-green-50 p-3 dark:border-green-800 dark:bg-green-950'>
                <div className='flex items-center gap-2 text-sm text-green-700 dark:text-green-400'>
                  <svg
                    className='h-4 w-4 shrink-0'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
                    />
                  </svg>
                  A verification code has been sent to your email
                </div>
              </div>

              <div className='grid gap-2'>
                <Label htmlFor='otp'>Verification Code</Label>
                <div className='relative'>
                  <Key className='absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground' />
                  <Input
                    id='otp'
                    type='text'
                    inputMode='numeric'
                    pattern='[0-9]*'
                    placeholder='123456'
                    value={otp}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, '')
                      setOtp(value)
                    }}
                    disabled={isLoading}
                    maxLength={6}
                    autoComplete='one-time-code'
                    required
                    className='pl-9'
                  />
                </div>
                <p className='text-xs text-muted-foreground'>
                  Check your email for the verification code
                </p>
              </div>

              <div className='flex items-center justify-between text-sm'>
                <button
                  type='button'
                  onClick={() => {
                    setShowOtpInput(false)
                    setOtp('')
                  }}
                  className='text-primary hover:underline'
                >
                  Use a different email
                </button>
                <button
                  type='button'
                  onClick={handleResendOtp}
                  disabled={countdown > 0 || isLoading}
                  className='text-muted-foreground disabled:cursor-not-allowed'
                >
                  {countdown > 0
                    ? `Resend code (${countdown}s)`
                    : 'Resend code'}
                </button>
              </div>

              <Button type='submit' disabled={isLoading} className='w-full'>
                {isLoading && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
                Create Account
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className='flex min-h-screen items-center justify-center bg-background p-4'>
      <Card className='w-full max-w-md'>
        <CardHeader className='space-y-1 text-center'>
          <CardTitle className='text-2xl font-bold'>
            Create your account
          </CardTitle>
          <CardDescription>
            Start managing your containers today
          </CardDescription>
        </CardHeader>
        <CardContent className='grid gap-4'>
          <Button
            variant='outline'
            onClick={() => handleOAuthSignUp('google')}
            disabled={isLoading}
            type='button'
            className='w-full'
          >
            <GoogleIcon />
            Sign up with Google
          </Button>

          {ENABLE_GITHUB && (
            <Button
              variant='outline'
              onClick={() => handleOAuthSignUp('github')}
              disabled={isLoading}
              type='button'
              className='w-full'
            >
              <GitHubIcon />
              Sign up with GitHub
            </Button>
          )}

          <div className='relative'>
            <div className='absolute inset-0 flex items-center'>
              <span className='w-full border-t' />
            </div>
            <div className='relative flex justify-center text-xs uppercase'>
              <span className='bg-background px-2 text-muted-foreground'>
                Or sign up with email
              </span>
            </div>
          </div>

          <form onSubmit={handleSendOtp} className='grid gap-4'>
            <div className='grid grid-cols-2 gap-4'>
              <div className='grid gap-2'>
                <Label htmlFor='firstName'>First Name</Label>
                <div className='relative'>
                  <User className='absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground' />
                  <Input
                    id='firstName'
                    type='text'
                    placeholder='John'
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    disabled={isLoading}
                    autoComplete='given-name'
                    className='pl-9'
                  />
                </div>
              </div>
              <div className='grid gap-2'>
                <Label htmlFor='lastName'>Last Name</Label>
                <div className='relative'>
                  <User className='absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground' />
                  <Input
                    id='lastName'
                    type='text'
                    placeholder='Doe'
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    disabled={isLoading}
                    autoComplete='family-name'
                    className='pl-9'
                  />
                </div>
              </div>
            </div>

            <div className='grid gap-2'>
              <Label htmlFor='companyName'>Company Name</Label>
              <div className='relative'>
                <Building2 className='absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground' />
                <Input
                  id='companyName'
                  type='text'
                  placeholder='Acme Inc'
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  disabled={isLoading}
                  autoComplete='organization'
                  className='pl-9'
                />
              </div>
            </div>

            <div className='grid gap-2'>
              <Label htmlFor='email'>Email address</Label>
              <div className='relative'>
                <Mail className='absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground' />
                <Input
                  id='email'
                  type='email'
                  placeholder='you@example.com'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLoading}
                  autoComplete='email'
                  required
                  className='pl-9'
                />
              </div>
            </div>

            {ENABLE_TURNSTILE && TURNSTILE_SITE_KEY && (
              <div className='grid gap-2'>
                <Label>Security verification</Label>
                <Turnstile
                  siteKey={TURNSTILE_SITE_KEY}
                  onSuccess={(token) => setTurnstileToken(token)}
                  onExpire={() => setTurnstileToken(null)}
                  onError={() => {
                    setTurnstileToken(null)
                    toast.error('Security verification failed. Please refresh.')
                  }}
                />
              </div>
            )}

            <Button type='submit' disabled={isLoading} className='w-full'>
              {isLoading && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
              Create Account
            </Button>
          </form>

          <p className='text-center text-sm text-muted-foreground'>
            Already have an account?{' '}
            <Link
              to='/sign-in'
              className='text-primary underline-offset-4 hover:underline'
            >
              Sign in
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
