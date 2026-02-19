import {
  Wallet,
  Key,
  Zap,
  MessageSquare,
  Activity,
  Box,
  Copy,
  Plus,
  Code2,
  MoreHorizontal,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { PageHeader } from '@/components/layout/page-header'
import { Notifications } from '@/components/notifications'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'

const aiModels = [
  {
    id: 'ai-1234',
    name: 'llama-2-7b-chat',
    type: 'LLM (Fine-tuned)',
    status: 'ready',
    usage: '1.2M tokens',
    cost: '$0.00',
  },
  {
    id: 'ai-5678',
    name: 'stable-diffusion-xl',
    type: 'Image Gen',
    status: 'training',
    usage: '450 images',
    cost: '$1.45',
  },
]

export function AI() {
  return (
    <>
      <Header fixed>
        <Search />
        <div className='ms-auto flex items-center gap-4'>
          <Notifications />
          <ProfileDropdown />
        </div>
      </Header>
      <Main className='gap-4'>
        <PageHeader
          title='AI Models'
          description='Access powerful AI models and manage your usage'
          className='mb-2'
          actions={
            <>
              <Button variant='outline' className='flex-1 sm:flex-none'>
                <Plus className='mr-2 h-4 w-4' />
                API Key
              </Button>
              <Button className='flex-1 sm:flex-none'>
                <Plus className='mr-2 h-4 w-4' />
                Topup
              </Button>
            </>
          }
        />

        <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-4'>
          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>AI Balance</CardTitle>
              <Wallet className='h-4 w-4 text-muted-foreground' />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>$4.0889107</div>
              <p className='text-xs text-muted-foreground'>
                Available credits for AI services
              </p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue='quickstart' className='mt-3 w-full'>
          <div className='overflow-x-auto'>
            <TabsList className='w-max min-w-full sm:w-auto'>
              <TabsTrigger value='quickstart'>
                <Zap className='mr-2 h-4 w-4' />
                Quick Start
              </TabsTrigger>
              <TabsTrigger value='chat'>
                <MessageSquare className='mr-2 h-4 w-4' />
                Chat
              </TabsTrigger>
              <TabsTrigger value='usage'>
                <Activity className='mr-2 h-4 w-4' />
                Usage
              </TabsTrigger>
              <TabsTrigger value='models'>
                <Box className='mr-2 h-4 w-4' />
                Models
              </TabsTrigger>
              <TabsTrigger value='apikeys'>
                <Key className='mr-2 h-4 w-4' />
                API Keys
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value='quickstart' className='mt-3'>
            <div className='rounded-md border bg-background'>
              <Card className='border-0'>
                <CardContent className='flex flex-col items-start space-y-8 px-6 py-4'>
                  <div className='space-y-2'>
                    <h3 className='text-2xl font-bold'>AI API Quick Start</h3>
                    <p className='max-w-lg text-muted-foreground'>
                      Get started with SumoPod AI API in minutes. Compatible
                      with OpenAI SDK and tools.
                    </p>
                  </div>

                  <div className='flex w-full max-w-3xl flex-wrap items-center justify-between gap-2 rounded-lg border border-blue-100 bg-blue-50/50 p-3 sm:p-4 dark:border-blue-900/50 dark:bg-blue-950/20'>
                    <div className='flex flex-wrap items-center gap-2 sm:gap-3'>
                      <Zap className='h-5 w-5 shrink-0 text-blue-500' />
                      <span className='font-medium text-blue-700 dark:text-blue-300'>
                        Base URL:
                      </span>
                      <code className='rounded border border-blue-200 bg-white px-2 py-1 text-xs text-blue-800 sm:text-sm dark:border-blue-800 dark:bg-blue-900 dark:text-blue-200'>
                        https://ai.supersumo.com
                      </code>
                    </div>
                    <Button
                      variant='ghost'
                      size='icon'
                      className='text-blue-400 hover:text-blue-600'
                    >
                      <Copy className='h-4 w-4' />
                    </Button>
                  </div>

                  <div className='w-full max-w-3xl space-y-4'>
                    <div className='flex items-center gap-2 text-xl font-semibold'>
                      <Code2 className='h-5 w-5' />
                      <h4>Getting Started</h4>
                    </div>

                    <div className='space-y-6'>
                      <div className='space-y-4'>
                        <h5 className='flex items-center gap-2 font-bold'>
                          1. Authentication
                        </h5>
                        <p className='text-sm text-muted-foreground'>
                          Create an API key from the{' '}
                          <span className='cursor-pointer font-medium text-blue-600 hover:underline'>
                            API Keys
                          </span>{' '}
                          tab. Set a budget limit to control your spending.
                        </p>
                      </div>

                      <div className='space-y-2 rounded-lg border bg-muted p-4 font-mono text-sm'>
                        <div className='flex items-start justify-between'>
                          <span className='text-muted-foreground'>
                            # Python example
                          </span>
                          <Copy className='h-4 w-4 cursor-pointer text-muted-foreground hover:text-foreground' />
                        </div>
                        <pre className='overflow-x-auto text-blue-600 dark:text-blue-400'>
                          {`from openai import OpenAI

client = OpenAI(
    api_key="your_api_key",
    base_url="https://ai.supersumo.com/v1"
)

response = client.chat.completions.create(
    model="llama-3-8b",
    messages=[{"role": "user", "content": "Hello!"}]
)`}
                        </pre>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value='chat' className='mt-3'>
            <div className='rounded-md border bg-background'>
              <Card className='border-0'>
                <CardContent className='flex flex-col items-center justify-center space-y-4 px-6 py-4'>
                  <MessageSquare className='h-16 w-16 text-muted-foreground' />
                  <div className='space-y-2 text-center'>
                    <h3 className='text-xl font-semibold'>
                      AI Chat Playground
                    </h3>
                    <p className='max-w-md text-sm text-muted-foreground'>
                      Interact with AI models in real-time. Start a conversation
                      and explore the capabilities of our AI services.
                    </p>
                  </div>
                  <Button className='bg-blue-600 text-white hover:bg-blue-700'>
                    Start New Chat
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value='usage' className='mt-3'>
            <div className='rounded-md border bg-background'>
              <Card className='border-0'>
                <CardContent className='space-y-6 px-6 py-4'>
                  <div className='space-y-2'>
                    <h3 className='text-xl font-semibold'>Usage Overview</h3>
                    <p className='text-sm text-muted-foreground'>
                      Track your AI API usage and costs across all models.
                    </p>
                  </div>
                  <div className='grid gap-4 sm:grid-cols-3'>
                    <div className='space-y-2 rounded-lg border p-4'>
                      <p className='text-sm font-medium text-muted-foreground'>
                        Total Tokens
                      </p>
                      <p className='text-2xl font-bold'>1.2M</p>
                      <p className='text-xs text-muted-foreground'>
                        This month
                      </p>
                    </div>
                    <div className='space-y-2 rounded-lg border p-4'>
                      <p className='text-sm font-medium text-muted-foreground'>
                        Total Cost
                      </p>
                      <p className='text-2xl font-bold'>$1.45</p>
                      <p className='text-xs text-muted-foreground'>
                        This month
                      </p>
                    </div>
                    <div className='space-y-2 rounded-lg border p-4'>
                      <p className='text-sm font-medium text-muted-foreground'>
                        API Calls
                      </p>
                      <p className='text-2xl font-bold'>3,847</p>
                      <p className='text-xs text-muted-foreground'>
                        This month
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value='models' className='mt-3'>
            <div className='rounded-md border bg-background'>
              <Card className='border-0'>
                <CardContent className='overflow-x-auto p-0'>
                  <Table className='min-w-[28rem]'>
                    <TableHeader>
                      <TableRow className='hover:bg-transparent'>
                        <TableHead className='pl-6'>Model / Type</TableHead>
                        <TableHead>Usage / Cost</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className='pr-6 text-right'>
                          Actions
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {aiModels.map((ai) => (
                        <TableRow key={ai.id}>
                          <TableCell className='pl-6 font-medium'>
                            <div className='flex flex-col'>
                              <span>{ai.name}</span>
                              <span className='text-xs font-normal text-muted-foreground'>
                                {ai.type}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className='flex flex-col'>
                              <span>{ai.usage}</span>
                              <span className='text-xs text-muted-foreground'>
                                {ai.cost}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant='outline'
                              className={cn(
                                'font-normal capitalize',
                                ai.status === 'ready'
                                  ? 'border-green-300 bg-green-50 text-green-700 dark:border-green-700 dark:bg-green-950 dark:text-green-400'
                                  : 'border-amber-300 bg-amber-50 text-amber-700 dark:border-amber-700 dark:bg-amber-950 dark:text-amber-400'
                              )}
                            >
                              {ai.status}
                            </Badge>
                          </TableCell>
                          <TableCell className='pr-6 text-right'>
                            <Button variant='ghost' size='icon'>
                              <MoreHorizontal className='h-4 w-4' />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value='apikeys' className='mt-3'>
            <div className='rounded-md border bg-background'>
              <Card className='border-0'>
                <CardContent className='space-y-6 px-6 py-4'>
                  <div className='flex flex-wrap items-start justify-between gap-3'>
                    <div className='space-y-2'>
                      <h3 className='text-xl font-semibold'>API Keys</h3>
                      <p className='text-sm text-muted-foreground'>
                        Manage your API keys for authentication
                      </p>
                    </div>
                    <Button className='bg-blue-600 text-white hover:bg-blue-700'>
                      <Plus className='mr-2 h-4 w-4' />
                      Create New Key
                    </Button>
                  </div>
                  <div className='space-y-4 rounded-lg border p-6 text-center'>
                    <Key className='mx-auto h-12 w-12 text-muted-foreground' />
                    <p className='text-sm text-muted-foreground'>
                      No API keys found. Create your first key to start using
                      the AI API.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </Main>
    </>
  )
}
