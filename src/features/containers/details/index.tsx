import { useState } from 'react'
import { useNavigate, useParams } from '@tanstack/react-router'
import {
  ChevronLeft,
  Copy,
  ExternalLink,
  RefreshCw,
  RotateCcw,
  Power,
  Trash2,
  Terminal,
  Settings2,
  Activity,
  Container,
  Globe,
  HardDrive,
  AlertCircle,
  CheckCircle2,
  BarChart3,
  Plus,
  Pencil,
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
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
import { Separator } from '@/components/ui/separator'
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
import { Notifications } from '@/components/notifications'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'

const envVars = [
  { key: 'NODE_ENV', value: 'production', secret: false },
  { key: 'PORT', value: '3000', secret: false },
  { key: 'DATABASE_URL', value: 'postgresql://...', secret: true },
  { key: 'JWT_SECRET', value: '••••••••••••', secret: true },
]

const volumes = [
  { path: '/app/uploads', size: '5 GB', status: 'mounted' },
  { path: '/app/logs', size: '2 GB', status: 'mounted' },
]

const metrics = [
  { label: 'CPU Usage', value: 24, max: 100, unit: '%', color: 'bg-blue-500' },
  {
    label: 'Memory',
    value: 512,
    max: 1024,
    unit: ' MB',
    color: 'bg-purple-500',
  },
  {
    label: 'Network In',
    value: 1.2,
    max: 10,
    unit: ' MB/s',
    color: 'bg-green-500',
  },
  {
    label: 'Network Out',
    value: 0.8,
    max: 10,
    unit: ' MB/s',
    color: 'bg-amber-500',
  },
]

const logs = [
  { time: '02:31:05', level: 'INFO', message: 'Server started on port 3000' },
  { time: '02:31:06', level: 'INFO', message: 'Connected to database' },
  { time: '02:31:45', level: 'INFO', message: 'GET /api/health 200 3ms' },
  {
    time: '02:32:10',
    level: 'WARN',
    message: 'High memory usage detected: 82%',
  },
  { time: '02:32:45', level: 'INFO', message: 'POST /api/users 201 45ms' },
  { time: '02:33:00', level: 'INFO', message: 'GET /api/products 200 12ms' },
  {
    time: '02:33:20',
    level: 'ERROR',
    message: 'Failed to process payment: timeout',
  },
  { time: '02:33:21', level: 'INFO', message: 'Retrying payment request...' },
]

export function ContainerDetails() {
  const navigate = useNavigate()
  const { containerId } = useParams({
    from: '/_authenticated/containers/$containerId',
  })
  const [copied, setCopied] = useState<string | null>(null)

  const container = {
    id: containerId,
    name: 'web-app-prod',
    status: 'running',
    image: 'nginx:latest',
    imageType: 'public',
    region: 'Jakarta 🇮🇩',
    cpu: 2,
    memory: 1,
    port: 3000,
    url: 'web-app-prod.app.superumo.id',
    created: '2026-02-10',
    restarts: 0,
    uptime: '9 days',
  }

  const handleCopy = (text: string, key: string) => {
    void navigator.clipboard.writeText(text)
    setCopied(key)
    setTimeout(() => setCopied(null), 2000)
  }

  const logLevelColor: Record<string, string> = {
    INFO: 'text-blue-400',
    WARN: 'text-amber-400',
    ERROR: 'text-red-400',
  }

  return (
    <>
      <Header fixed>
        <Search />
        <div className='ms-auto flex items-center space-x-4'>
          <Notifications />
          <ProfileDropdown />
        </div>
      </Header>
      <Main className='flex flex-1 flex-col gap-4 sm:gap-6'>
        {/* Page Header */}
        <div className='flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between'>
          <div className='flex items-center gap-4'>
            <Button
              variant='ghost'
              size='icon'
              onClick={() => navigate({ to: '/containers' })}
              className='-ml-1'
            >
              <ChevronLeft className='h-4 w-4' />
            </Button>
            <div className='flex flex-col'>
              <div className='flex items-center gap-2'>
                <h1 className='text-xl font-bold tracking-tight sm:text-2xl'>
                  {container.name}
                </h1>
                <Badge
                  variant='outline'
                  className='border-green-200 bg-green-50 px-2 py-0 font-medium text-green-700 capitalize'
                >
                  {container.status}
                </Badge>
              </div>
              <p className='text-xs text-muted-foreground sm:text-sm'>
                {container.image} • {container.region} • Up {container.uptime}
              </p>
            </div>
          </div>

          <div className='flex flex-wrap items-center gap-2'>
            <Button variant='outline' size='sm' className='gap-2'>
              <a
                href={`https://${container.url}`}
                target='_blank'
                rel='noopener noreferrer'
                className='flex items-center gap-2'
              >
                <ExternalLink className='h-4 w-4' />
                Open URL
              </a>
            </Button>
            <Button variant='outline' size='sm' className='gap-2'>
              <RefreshCw className='h-4 w-4' />
              Redeploy
            </Button>
            <Button variant='outline' size='sm' className='gap-2'>
              <RotateCcw className='h-4 w-4' />
              Restart
            </Button>
            <Button
              variant='outline'
              size='sm'
              className='gap-2 text-red-500 hover:text-red-600'
            >
              <Power className='h-4 w-4' />
              Stop
            </Button>
          </div>
        </div>

        {/* Metrics Overview */}
        <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>
          {metrics.map((m) => (
            <Card key={m.label}>
              <CardContent className='pt-5'>
                <p className='text-xs font-medium tracking-wider text-muted-foreground uppercase'>
                  {m.label}
                </p>
                <p className='mt-1 text-2xl font-bold'>
                  {m.value}
                  <span className='text-sm font-normal text-muted-foreground'>
                    {m.unit}
                  </span>
                </p>
                <div className='mt-2 h-2 w-full overflow-hidden rounded-full bg-gray-100'>
                  <div
                    className={`h-full rounded-full ${m.color}`}
                    style={{ width: `${(m.value / m.max) * 100}%` }}
                  />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Tabs */}
        <Tabs defaultValue='overview'>
          <TabsList>
            <TabsTrigger value='overview' className='gap-2'>
              <Container className='h-4 w-4' />
              Overview
            </TabsTrigger>
            <TabsTrigger value='logs' className='gap-2'>
              <Terminal className='h-4 w-4' />
              Logs
            </TabsTrigger>
            <TabsTrigger value='env' className='gap-2'>
              <Settings2 className='h-4 w-4' />
              Environment
            </TabsTrigger>
            <TabsTrigger value='volumes' className='gap-2'>
              <HardDrive className='h-4 w-4' />
              Volumes
            </TabsTrigger>
            <TabsTrigger value='network' className='gap-2'>
              <Globe className='h-4 w-4' />
              Network
            </TabsTrigger>
            <TabsTrigger value='settings' className='gap-2'>
              <Activity className='h-4 w-4' />
              Settings
            </TabsTrigger>
          </TabsList>

          {/* Overview */}
          <TabsContent value='overview' className='mt-4 space-y-4'>
            <div className='grid gap-4 lg:grid-cols-2'>
              <Card>
                <CardHeader>
                  <CardTitle>Container Info</CardTitle>
                </CardHeader>
                <CardContent>
                  <dl className='space-y-3'>
                    {[
                      { label: 'Container ID', value: container.id },
                      { label: 'Image', value: container.image },
                      { label: 'Region', value: container.region },
                      { label: 'CPU', value: `${container.cpu} cores` },
                      { label: 'Memory', value: `${container.memory} GB` },
                      { label: 'Port', value: String(container.port) },
                      { label: 'Restarts', value: String(container.restarts) },
                      { label: 'Created', value: container.created },
                    ].map((item) => (
                      <div
                        key={item.label}
                        className='flex items-center justify-between'
                      >
                        <dt className='text-sm text-muted-foreground'>
                          {item.label}
                        </dt>
                        <dd className='text-sm font-medium'>{item.value}</dd>
                      </div>
                    ))}
                  </dl>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className='grid gap-3'>
                  {[
                    {
                      label: 'Redeploy Container',
                      desc: 'Pull latest image and restart',
                      icon: <RefreshCw className='h-4 w-4' />,
                    },
                    {
                      label: 'View Real-time Logs',
                      desc: 'Stream live container output',
                      icon: <Terminal className='h-4 w-4' />,
                    },
                    {
                      label: 'Scale Resources',
                      desc: 'Adjust CPU and memory',
                      icon: <BarChart3 className='h-4 w-4' />,
                    },
                    {
                      label: 'Manage Volumes',
                      desc: 'Add or remove persistent storage',
                      icon: <HardDrive className='h-4 w-4' />,
                    },
                  ].map((action) => (
                    <button
                      key={action.label}
                      className='flex items-center gap-3 rounded-lg border p-3 text-left transition-colors hover:bg-muted/50'
                    >
                      <div className='flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-md bg-muted'>
                        {action.icon}
                      </div>
                      <div>
                        <p className='text-sm font-medium'>{action.label}</p>
                        <p className='text-xs text-muted-foreground'>
                          {action.desc}
                        </p>
                      </div>
                    </button>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Logs */}
          <TabsContent value='logs' className='mt-4'>
            <Card>
              <CardHeader className='flex flex-wrap items-start justify-between gap-3'>
                <div>
                  <CardTitle>Container Logs</CardTitle>
                  <CardDescription>
                    Showing last 100 lines. Logs are retained for 7 days.
                  </CardDescription>
                </div>
                <Button variant='outline' size='sm' className='gap-2'>
                  <RefreshCw className='h-4 w-4' />
                  Refresh
                </Button>
              </CardHeader>
              <CardContent>
                <div className='overflow-hidden rounded-lg bg-zinc-950 p-4'>
                  <pre className='overflow-auto text-xs leading-relaxed'>
                    {logs.map((log, i) => (
                      <div key={i} className='mb-1 flex gap-3'>
                        <span className='shrink-0 text-zinc-500'>
                          {log.time}
                        </span>
                        <span
                          className={`w-12 shrink-0 font-semibold ${logLevelColor[log.level]}`}
                        >
                          {log.level}
                        </span>
                        <span className='text-zinc-300'>{log.message}</span>
                      </div>
                    ))}
                  </pre>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Environment Variables */}
          <TabsContent value='env' className='mt-4 space-y-4'>
            <Card>
              <CardHeader className='flex flex-wrap items-start justify-between gap-3'>
                <div>
                  <CardTitle>Environment Variables</CardTitle>
                  <CardDescription>
                    Injected at runtime. Changes require a redeploy to take
                    effect.
                  </CardDescription>
                </div>
                <Button size='sm' className='gap-2'>
                  <Plus className='h-4 w-4' />
                  Add Variable
                </Button>
              </CardHeader>
              <CardContent className='overflow-x-auto p-0'>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className='pl-6'>Key</TableHead>
                      <TableHead>Value</TableHead>
                      <TableHead className='pr-6 text-right'>Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {envVars.map((env) => (
                      <TableRow key={env.key}>
                        <TableCell className='pl-6 font-mono text-sm font-medium'>
                          {env.key}
                        </TableCell>
                        <TableCell className='font-mono text-sm text-muted-foreground'>
                          {env.secret ? '••••••••••••' : env.value}
                        </TableCell>
                        <TableCell className='pr-6 text-right'>
                          <div className='flex items-center justify-end gap-1'>
                            {env.secret && (
                              <Badge variant='secondary' className='text-xs'>
                                secret
                              </Badge>
                            )}
                            <Button
                              variant='ghost'
                              size='icon'
                              className='h-7 w-7'
                            >
                              <Pencil className='h-3 w-3' />
                            </Button>
                            <Button
                              variant='ghost'
                              size='icon'
                              className='h-7 w-7 text-red-500'
                            >
                              <Trash2 className='h-3 w-3' />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <div className='rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm text-amber-800'>
              <div className='flex items-start gap-2'>
                <AlertCircle className='mt-0.5 h-4 w-4 flex-shrink-0' />
                <p>
                  After saving environment variables, redeploy your container
                  for changes to take effect.
                </p>
              </div>
            </div>
          </TabsContent>

          {/* Volumes */}
          <TabsContent value='volumes' className='mt-4 space-y-4'>
            <Card>
              <CardHeader className='flex flex-wrap items-start justify-between gap-3'>
                <div>
                  <CardTitle>Persistent Volumes</CardTitle>
                  <CardDescription>
                    Volumes persist across container restarts and redeployments.
                  </CardDescription>
                </div>
                <Button size='sm' className='gap-2'>
                  <Plus className='h-4 w-4' />
                  Add Volume
                </Button>
              </CardHeader>
              <CardContent className='overflow-x-auto p-0'>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className='pl-6'>Mount Path</TableHead>
                      <TableHead>Size</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className='pr-6 text-right'>Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {volumes.map((vol) => (
                      <TableRow key={vol.path}>
                        <TableCell className='pl-6 font-mono text-sm'>
                          {vol.path}
                        </TableCell>
                        <TableCell>{vol.size}</TableCell>
                        <TableCell>
                          <span className='flex items-center gap-1 text-sm text-green-600'>
                            <CheckCircle2 className='h-3 w-3' />
                            {vol.status}
                          </span>
                        </TableCell>
                        <TableCell className='pr-6 text-right'>
                          <Button
                            variant='ghost'
                            size='sm'
                            className='text-red-500'
                          >
                            Detach
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Network */}
          <TabsContent value='network' className='mt-4 space-y-4'>
            <Card>
              <CardHeader>
                <CardTitle>Public Endpoint</CardTitle>
                <CardDescription>
                  Your container is accessible via this public URL.
                </CardDescription>
              </CardHeader>
              <CardContent className='space-y-4'>
                <div className='space-y-2'>
                  <Label>URL</Label>
                  <div className='flex items-center gap-2'>
                    <Input
                      value={`https://${container.url}`}
                      readOnly
                      className='font-mono text-sm'
                    />
                    <Button
                      variant='ghost'
                      size='icon'
                      onClick={() =>
                        handleCopy(`https://${container.url}`, 'url')
                      }
                    >
                      {copied === 'url' ? (
                        <CheckCircle2 className='h-4 w-4 text-green-500' />
                      ) : (
                        <Copy className='h-4 w-4' />
                      )}
                    </Button>
                    <Button variant='ghost' size='icon' asChild>
                      <a
                        href={`https://${container.url}`}
                        target='_blank'
                        rel='noopener noreferrer'
                      >
                        <ExternalLink className='h-4 w-4' />
                      </a>
                    </Button>
                  </div>
                </div>

                <Separator />

                <div className='space-y-2'>
                  <Label>Custom Domain</Label>
                  <div className='flex gap-2'>
                    <Input placeholder='yourdomain.com' />
                    <Button variant='outline'>Add</Button>
                  </div>
                  <p className='text-xs text-muted-foreground'>
                    Point your domain's CNAME record to{' '}
                    <code className='rounded bg-muted px-1'>
                      {container.url}
                    </code>
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings */}
          <TabsContent value='settings' className='mt-4 space-y-4'>
            <Card>
              <CardHeader>
                <CardTitle>Container Settings</CardTitle>
              </CardHeader>
              <CardContent className='space-y-4'>
                <div className='space-y-2'>
                  <Label>Container Name</Label>
                  <div className='flex gap-2'>
                    <Input defaultValue={container.name} />
                    <Button variant='outline'>Rename</Button>
                  </div>
                </div>
                <Separator />
                <div className='space-y-2'>
                  <Label>Container Image</Label>
                  <div className='flex gap-2'>
                    <Input defaultValue={container.image} />
                    <Button variant='outline'>Update</Button>
                  </div>
                  <p className='text-xs text-muted-foreground'>
                    Updating the image will trigger a redeployment.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className='border-red-200'>
              <CardHeader>
                <CardTitle className='text-red-600'>Danger Zone</CardTitle>
              </CardHeader>
              <CardContent className='space-y-3'>
                <div className='flex items-center justify-between rounded-lg border border-red-100 bg-red-50 p-4'>
                  <div>
                    <p className='font-medium text-red-700'>Delete Container</p>
                    <p className='text-xs text-red-600'>
                      Permanently delete this container and all attached
                      volumes.
                    </p>
                  </div>
                  <Button
                    variant='outline'
                    size='sm'
                    className='gap-2 border-red-300 text-red-600 hover:bg-red-50'
                  >
                    <Trash2 className='h-4 w-4' />
                    Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </Main>
    </>
  )
}
