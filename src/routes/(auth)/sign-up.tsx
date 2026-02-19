import { useState, useEffect } from 'react'
import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { Loader2, Github, Mail, ArrowLeft, Clock } from 'lucide-react'
import { toast } from 'sonner'
import { supabase } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export const Route = createFileRoute('/(auth)/sign-up')({
  component: SignUp,
})

const OTP_COOLDOWN_SECONDS = 60

function SignUp() {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [showOtpInput, setShowOtpInput] = useState(false)
  const [email, setEmail] = useState('')
  const [otp, setOtp] = useState('')
  const [countdown, setCountdown] = useState(0)

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

    setIsLoading(true)

    try {
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: `${window.location.origin}/`,
        },
      })

      if (error) throw error

      toast.success('OTP code sent to your email')
      setShowOtpInput(true)
      setCountdown(OTP_COOLDOWN_SECONDS)
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : 'Failed to send OTP'
      toast.error(message)
    } finally {
      setIsLoading(false)
    }
  }

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!otp || otp.length !== 6) {
      toast.error('Please enter the 6-digit OTP code')
      return
    }

    setIsLoading(true)

    try {
      // Try to verify OTP
      const { error } = await supabase.auth.verifyOtp({
        email,
        token: otp,
        type: 'signup',
      })

      if (error) {
        // Show more specific error message
        if (
          error.message.includes('403') ||
          error.message.includes('Forbidden')
        ) {
          toast.error(
            'OTP verification failed. The code may be expired or invalid. Please request a new code.'
          )
        } else {
          toast.error(`Invalid OTP: ${error.message}`)
        }
        return
      }

      toast.success('Account created and verified successfully')
      navigate({ to: '/' })
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : 'Failed to verify OTP'
      toast.error(message)
    } finally {
      setIsLoading(false)
    }
  }

  const handleResendOtp = async () => {
    if (countdown > 0) {
      toast.error(`Please wait ${countdown} seconds before resending`)
      return
    }

    setIsLoading(true)

    try {
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: `${window.location.origin}/`,
        },
      })

      if (error) throw error

      toast.success('New OTP code sent to your email')
      setCountdown(OTP_COOLDOWN_SECONDS)
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : 'Failed to resend OTP'
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

  const handleBackToEmail = () => {
    setShowOtpInput(false)
    setOtp('')
  }

  return (
    <div className='flex min-h-screen items-center justify-center bg-background p-4'>
      <Card className='w-full max-w-md'>
        <CardHeader className='space-y-1'>
          <CardTitle className='text-2xl font-bold'>
            Create an account
          </CardTitle>
          <CardDescription>
            {showOtpInput
              ? 'Enter the OTP code sent to your email'
              : 'Choose your sign-up method'}
          </CardDescription>
        </CardHeader>
        <CardContent className='grid gap-4'>
          {!showOtpInput && (
            <>
              <div className='grid grid-cols-2 gap-4'>
                <Button
                  variant='outline'
                  onClick={() => handleOAuthSignUp('github')}
                  disabled={isLoading}
                  type='button'
                >
                  <Github className='mr-2 h-4 w-4' />
                  GitHub
                </Button>
                <Button
                  variant='outline'
                  onClick={() => handleOAuthSignUp('google')}
                  disabled={isLoading}
                  type='button'
                >
                  <Mail className='mr-2 h-4 w-4' />
                  Google
                </Button>
              </div>
              <div className='relative'>
                <div className='absolute inset-0 flex items-center'>
                  <span className='w-full border-t' />
                </div>
                <div className='relative flex justify-center text-xs uppercase'>
                  <span className='bg-background px-2 text-muted-foreground'>
                    Or continue with
                  </span>
                </div>
              </div>
            </>
          )}
          <form
            onSubmit={showOtpInput ? handleVerifyOtp : handleSendOtp}
            className='grid gap-4'
          >
            <div className='grid gap-2'>
              <Label htmlFor='email'>Email</Label>
              <Input
                id='email'
                type='email'
                placeholder='name@example.com'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading || showOtpInput}
                autoComplete='email'
                required
              />
            </div>
            {showOtpInput && (
              <>
                <div className='grid gap-2'>
                  <Label htmlFor='otp'>OTP Code</Label>
                  <Input
                    id='otp'
                    type='text'
                    inputMode='numeric'
                    pattern='[0-9]*'
                    placeholder='123456'
                    value={otp}
                    onChange={(e) => {
                      // Only allow numbers
                      const value = e.target.value.replace(/\D/g, '')
                      setOtp(value)
                    }}
                    disabled={isLoading}
                    maxLength={6}
                    autoComplete='one-time-code'
                    required
                  />
                  <p className='text-xs text-muted-foreground'>
                    Enter the 6-digit code sent to your email
                  </p>
                </div>
                <Button
                  type='button'
                  variant='link'
                  onClick={handleResendOtp}
                  disabled={isLoading || countdown > 0}
                  className='w-full'
                >
                  <Clock className='mr-2 h-4 w-4' />
                  {countdown > 0
                    ? `Resend OTP in ${countdown}s`
                    : 'Resend OTP Code'}
                </Button>
              </>
            )}
            <Button type='submit' disabled={isLoading} className='w-full'>
              {isLoading && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
              {showOtpInput ? 'Create Account' : 'Send OTP Code'}
            </Button>
            {showOtpInput && (
              <Button
                type='button'
                variant='ghost'
                onClick={handleBackToEmail}
                disabled={isLoading}
                className='w-full'
              >
                <ArrowLeft className='mr-2 h-4 w-4' />
                Back to email input
              </Button>
            )}
          </form>
        </CardContent>
        <CardFooter className='flex flex-wrap items-center justify-between gap-2'>
          <div className='text-sm text-muted-foreground'>
            Already have an account?{' '}
            <Link
              to='/sign-in'
              className='text-primary underline-offset-4 hover:underline'
            >
              Sign in
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
