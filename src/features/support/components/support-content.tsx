import { Mail, MessageCircle, HelpCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

export function SupportContent() {
  return (
    <div className='space-y-8'>
      {/* Header */}
      <div className='rounded-lg border border-blue-200 bg-blue-50 p-6 dark:border-blue-900 dark:bg-blue-950'>
        <div className='flex items-start gap-4'>
          <HelpCircle className='h-8 w-8 text-blue-600 dark:text-blue-400' />
          <div>
            <h2 className='text-lg font-semibold text-gray-900 dark:text-white'>
              Support
            </h2>
            <p className='text-sm text-gray-600 dark:text-gray-400'>
              Get help and support for your SumoPod services
            </p>
          </div>
        </div>
      </div>

      {/* Support Options */}
      <div className='grid gap-6 md:grid-cols-2'>
        {/* Email Support */}
        <Card className='flex flex-col'>
          <CardHeader>
            <div className='flex items-center gap-3'>
              <div className='flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900'>
                <Mail className='h-5 w-5 text-blue-600 dark:text-blue-400' />
              </div>
              <div>
                <CardTitle>Email Support</CardTitle>
                <CardDescription>
                  Send us an email for detailed assistance
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className='flex flex-1 flex-col'>
            <div className='mb-6 flex-1'>
              <p className='text-sm text-gray-600 dark:text-gray-400'>
                <span className='font-semibold text-gray-900 dark:text-white'>
                  Email:
                </span>{' '}
                support@supersumo.com
              </p>
            </div>
            <Button className='w-full bg-blue-600 hover:bg-blue-700'>
              <Mail className='mr-2 h-4 w-4' />
              Send Email
            </Button>
          </CardContent>
        </Card>

        {/* WhatsApp Support */}
        <Card className='flex flex-col'>
          <CardHeader>
            <div className='flex items-center gap-3'>
              <div className='flex h-10 w-10 items-center justify-center rounded-lg bg-green-100 dark:bg-green-900'>
                <MessageCircle className='h-5 w-5 text-green-600 dark:text-green-400' />
              </div>
              <div>
                <CardTitle>WhatsApp Support</CardTitle>
                <CardDescription>
                  Chat with us directly on WhatsApp
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className='flex flex-1 flex-col'>
            <div className='mb-6 flex-1'>
              <p className='text-sm text-gray-600 dark:text-gray-400'>
                <span className='font-semibold text-gray-900 dark:text-white'>
                  WhatsApp:
                </span>{' '}
                +62 851-9005-2577
              </p>
            </div>
            <Button className='w-full bg-green-600 hover:bg-green-700'>
              <MessageCircle className='mr-2 h-4 w-4' />
              Chat on WhatsApp
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Before Contacting Support */}
      <Card>
        <CardHeader>
          <CardTitle className='text-base'>Before contacting support</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className='space-y-3'>
            <li className='flex gap-3'>
              <span className='flex-shrink-0 text-blue-600 dark:text-blue-400'>
                •
              </span>
              <span className='text-sm text-gray-600 dark:text-gray-400'>
                Please include your service ID or name when reporting issues
              </span>
            </li>
            <li className='flex gap-3'>
              <span className='flex-shrink-0 text-blue-600 dark:text-blue-400'>
                •
              </span>
              <span className='text-sm text-gray-600 dark:text-gray-400'>
                Describe the problem in detail with steps to reproduce
              </span>
            </li>
            <li className='flex gap-3'>
              <span className='flex-shrink-0 text-blue-600 dark:text-blue-400'>
                •
              </span>
              <span className='text-sm text-gray-600 dark:text-gray-400'>
                Include any error messages you&apos;re seeing
              </span>
            </li>
            <li className='flex gap-3'>
              <span className='flex-shrink-0 text-blue-600 dark:text-blue-400'>
                •
              </span>
              <span className='text-sm text-gray-600 dark:text-gray-400'>
                Let us know what you were trying to accomplish
              </span>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
