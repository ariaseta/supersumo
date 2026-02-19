import { useState } from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Save, Mail } from 'lucide-react'
import { showSubmittedData } from '@/lib/show-submitted-data'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { Switch } from '@/components/ui/switch'

const profileFormSchema = z.object({
  firstName: z.string().min(1, 'First name is required.'),
  lastName: z.string().min(1, 'Last name is required.'),
  email: z.string().email(),
  company: z.string().optional(),
  website: z
    .string()
    .optional()
    .refine(
      (val) => !val || val === '' || z.url().safeParse(val).success,
      'Please enter a valid URL.'
    ),
})

type ProfileFormValues = z.infer<typeof profileFormSchema>

const defaultValues: ProfileFormValues = {
  firstName: 'Ariaseta',
  lastName: 'Alam',
  email: '07ariaseta@gmail.com',
  company: 'KodingWorks',
  website: 'https://kodingworks.io',
}

export function ProfileForm() {
  const [marketingEmails, setMarketingEmails] = useState(true)

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
    mode: 'onChange',
  })

  return (
    <div className='flex flex-col gap-6'>
      {/* Profile Information */}
      <Card>
        <CardHeader className='pb-4'>
          <CardTitle className='text-base font-semibold'>
            Profile Information
          </CardTitle>
        </CardHeader>
        <Separator />
        <CardContent className='pt-6'>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit((data) => showSubmittedData(data))}
              className='space-y-6'
            >
              <div className='grid grid-cols-2 gap-6'>
                <FormField
                  control={form.control}
                  name='firstName'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='lastName'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last Name</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className='grid grid-cols-2 gap-6'>
                <FormField
                  control={form.control}
                  name='email'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input {...field} disabled />
                      </FormControl>
                      <p className='text-xs text-muted-foreground'>
                        Email cannot be changed
                      </p>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='company'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Company</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name='website'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Website</FormLabel>
                    <FormControl>
                      <Input placeholder='https://yourdomain.com' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className='flex justify-end'>
                <Button type='submit'>
                  <Save className='mr-2 h-4 w-4' />
                  Save Profile
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>

      {/* Email Marketing Preferences */}
      <Card>
        <CardHeader className='pb-4'>
          <CardTitle className='flex items-center gap-2 text-base font-semibold'>
            <Mail className='h-4 w-4' />
            Email Marketing Preferences
          </CardTitle>
        </CardHeader>
        <Separator />
        <CardContent className='pt-6'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-sm font-medium'>Marketing Emails</p>
              <p className='text-sm text-muted-foreground'>
                Receive promotional emails, product updates, and special offers
                from SuperUMO.
              </p>
            </div>
            <Switch
              checked={marketingEmails}
              onCheckedChange={setMarketingEmails}
            />
          </div>
          <div className='mt-6 flex justify-end'>
            <Button onClick={() => showSubmittedData({ marketingEmails })}>
              <Save className='mr-2 h-4 w-4' />
              Save Preferences
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
