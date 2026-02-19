# Supabase OTP Authentication Setup Guide

## Problem: 403 Forbidden Error

If you're seeing a `403 Forbidden` error when verifying OTP codes, this means Supabase is rejecting the OTP verification request.

## Solutions

### Option 1: Use Magic Links (Recommended)

Instead of OTP codes, use Supabase's built-in magic link authentication. This is more reliable and doesn't require OTP verification.

Update the sign-in flow to use magic links:

```typescript
// Send magic link instead of OTP
const { error } = await supabase.auth.signInWithOAuth({
  provider: 'email',
  options: {
    emailRedirectTo: `${window.location.origin}/`,
  },
})
```

### Option 2: Enable Email OTP in Supabase Dashboard

1. Go to [https://supabase.com/dashboard](https://supabase.com/dashboard)
2. Select your project
3. Go to **Authentication** → **Providers**
4. Find **Email** provider and click to configure
5. Make sure these settings are enabled:
   - ✅ **Enable Email provider**
   - ✅ **Enable email confirmations**
   - ✅ **Allow email sign-ups**
   - ✅ **Set your email as the sender email** (for testing)

### Option 3: Check Email Templates

1. In Supabase Dashboard, go to **Authentication** → **Email Templates**
2. Make sure you have templates for:
   - **Confirm signup** - Used when user confirms their email
   - **Magic link** - Used for passwordless sign-in
   - **OTP/Email change** - Used for OTP codes

### Option 4: Verify SMTP Settings

1. Go to **Settings** → **Authentication** → **SMTP Settings**
2. Configure your SMTP server or use Supabase's built-in email
3. Click **Send Test Email** to verify it's working

### Option 5: Disable Email Confirmation (Quick Fix)

If you want to skip email confirmation during development:

1. Go to **Authentication** → **Providers** → **Email**
2. Scroll to **Email Confirmation** section
3. Disable **Enable email confirmations**
4. Save changes

**⚠️ Warning:** This is only for development! Never disable this in production.

## Testing Your Setup

### Test with Email Verification Disabled:

```bash
# 1. Disable email confirmation temporarily
# 2. Try signing up with a test email
# 3. Check if you receive the email
# 4. Try to sign in with the OTP
```

### Test Magic Link Flow:

1. Go to sign-in page
2. Enter your email
3. Click "Send OTP Code"
4. Check your email for BOTH:
   - A 6-digit OTP code
   - A magic link (button saying "Verify your email")

5. Try both methods:
   - Enter the OTP code
   - Click the magic link in the email

## Common Issues & Solutions

### Issue: "Email not confirmed"
**Solution:** Enable email confirmations in Supabase dashboard

### Issue: "Invalid OTP"
**Possible causes:**
- OTP expired (OTPs typically expire in 5-10 minutes)
- Wrong OTP code
- Email not verified yet

**Solution:** Request a new OTP code

### Issue: "No email received"
**Possible causes:**
- SMTP not configured
- Email blocked by spam filter
- Wrong sender email

**Solution:**
1. Check spam/junk folder
2. Use a test email service (like temp-mail.org)
3. Verify SMTP configuration

## Debug Mode

To debug the issue, add this to your sign-in component:

```typescript
const handleVerifyOtp = async (e: React.FormEvent) => {
  e.preventDefault()

  if (!otp || otp.length < 6) {
    toast.error('Please enter the 6-digit OTP code')
    return
  }

  setIsLoading(true)

  try {
    // Try to verify OTP
    const { error, data } = await supabase.auth.verifyOtp({
      email,
      token: otp,
      type: 'email',
    })

    // Debug: Log the response
    console.log('OTP Verification Response:', { error, data })

    if (error) {
      // Check specific error types
      console.error('OTP Error:', error)
      console.error('Error message:', error.message)
      console.error('Error status:', error.status)

      toast.error(`OTP verification failed: ${error.message}`)
      return
    }

    toast.success('Signed in successfully')
    navigate({ to: '/' })
  } catch (error: unknown) {
    console.error('OTP Verification Exception:', error)
    toast.error('An unexpected error occurred')
  } finally {
    setIsLoading(false)
  }
}
```

## Alternative: Use Supabase Auth UI (Simpler)

If you want to skip custom implementation, use Supabase's pre-built components:

```bash
npm install @supabase/auth-ui-react @supabase/auth-ui-shared
```

Then update your sign-in page to use their Auth component which handles all the complexity.

## Contact Support

If you've tried all options and still see 403 errors:

1. Check Supabase status: https://status.supabase.com
2. Check your project logs in Supabase dashboard
3. Search for your error message in Supabase GitHub issues
4. Post a question with details:
   - Your project URL
   - Error screenshots
   - Browser console errors
   - What you've tried so far

---

**Last Updated:** 2025-02-14
