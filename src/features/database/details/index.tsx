import { useState } from 'react'
import { useNavigate, useParams } from '@tanstack/react-router'
import {
  ChevronLeft,
  Copy,
  Eye,
  EyeOff,
  Database,
  Activity,
  RefreshCw,
  Settings2,
  Shield,
  HardDrive,
  Trash2,
  Power,
  RotateCcw,
  AlertCircle,
  CheckCircle2,
  BarChart3,
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

const backups = [
  {
    id: 1,
    date: '2026-02-19 02:00',
    size: '142 MB',
    status: 'success',
    type: 'Automated',
  },
  {
    id: 2,
    date: '2026-02-18 02:00',
    size: '139 MB',
    status: 'success',
    type: 'Automated',
  },
  {
    id: 3,
    date: '2026-02-17 14:30',
    size: '137 MB',
    status: 'success',
    type: 'Manual',
  },
  {
    id: 4,
    date: '2026-02-16 02:00',
    size: '135 MB',
    status: 'success',
    type: 'Automated',
  },
]

const metrics = [
  { label: 'CPU Usage', value: 12, max: 100, unit: '%', color: 'bg-blue-500' },
  {
    label: 'Memory',
    value: 680,
    max: 1024,
    unit: ' MB',
    color: 'bg-purple-500',
  },
  { label: 'Storage', value: 3.2, max: 10, unit: ' GB', color: 'bg-amber-500' },
  { label: 'Connections', value: 8, max: 100, unit: '', color: 'bg-green-500' },
]

export function DatabaseDetails() {
  const navigate = useNavigate()
  const { databaseId } = useParams({
    from: '/_authenticated/database/$databaseId',
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showUrl, setShowUrl] = useState(false)
  const [copied, setCopied] = useState<string | null>(null)

  const db = {
    id: databaseId,
    name: 'prod-postgres',
    status: 'active',
    engine: 'PostgreSQL',
    engineIcon: '🐘',
    version: 'v16',
    region: 'Jakarta 🇮🇩',
    plan: 'Dedicated – Medium',
    cpu: 2,
    ram: 2,
    storage: 10,
    created: '2026-02-09',
    host: 'prod-postgres.db.superumo.id',
    port: '5432',
    username: 'superuser',
    password: 'S3cr3tP@ssw0rd!',
    defaultDb: 'postgres',
  }

  const connectionUrl = `postgresql://${db.username}:${db.password}@${db.host}:${db.port}/${db.defaultDb}`
  const maskedUrl = `postgresql://${db.username}:••••••••@${db.host}:${db.port}/${db.defaultDb}`

  const handleCopy = (text: string, key: string) => {
    void navigator.clipboard.writeText(text)
    setCopied(key)
    setTimeout(() => setCopied(null), 2000)
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
          <div className='flex items-center gap-3'>
            <Button
              variant='ghost'
              size='icon'
              onClick={() => navigate({ to: '/database' })}
              className='-ml-1'
            >
              <ChevronLeft className='h-4 w-4' />
            </Button>
            <div className='flex flex-col'>
              <div className='flex items-center gap-2'>
                <span className='text-xl'>{db.engineIcon}</span>
                <h1 className='text-xl font-bold tracking-tight sm:text-2xl'>
                  {db.name}
                </h1>
                <Badge
                  variant='outline'
                  className='border-green-200 bg-green-50 px-2 py-0 font-medium text-green-700 capitalize'
                >
                  {db.status}
                </Badge>
              </div>
              <p className='text-xs text-muted-foreground sm:text-sm'>
                {db.engine} {db.version} • {db.region} • Created {db.created}
              </p>
            </div>
          </div>

          <div className='flex flex-wrap items-center gap-2'>
            <Button variant='outline' size='sm' className='gap-2'>
              <RotateCcw className='h-4 w-4' />
              Restart
            </Button>
            <Button variant='outline' size='sm' className='gap-2'>
              <RefreshCw className='h-4 w-4' />
              Upgrade
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
                <p className='mt-1 text-xs text-muted-foreground'>
                  of {m.max}
                  {m.unit}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Tabs */}
        <Tabs defaultValue='connection'>
          <TabsList>
            <TabsTrigger value='connection' className='gap-2'>
              <Database className='h-4 w-4' />
              Connection
            </TabsTrigger>
            <TabsTrigger value='monitoring' className='gap-2'>
              <BarChart3 className='h-4 w-4' />
              Monitoring
            </TabsTrigger>
            <TabsTrigger value='backups' className='gap-2'>
              <HardDrive className='h-4 w-4' />
              Backups
            </TabsTrigger>
            <TabsTrigger value='security' className='gap-2'>
              <Shield className='h-4 w-4' />
              Security
            </TabsTrigger>
            <TabsTrigger value='settings' className='gap-2'>
              <Settings2 className='h-4 w-4' />
              Settings
            </TabsTrigger>
          </TabsList>

          {/* Connection Tab */}
          <TabsContent value='connection' className='mt-4 space-y-4'>
            <Card>
              <CardHeader>
                <CardTitle>Connection Details</CardTitle>
                <CardDescription>
                  Use these credentials to connect your application to the
                  database.
                </CardDescription>
              </CardHeader>
              <CardContent className='space-y-6'>
                {/* Connection URL */}
                <div className='space-y-2'>
                  <Label>Connection URL</Label>
                  <div className='flex items-center gap-2'>
                    <Input
                      value={showUrl ? connectionUrl : maskedUrl}
                      readOnly
                      className='font-mono text-sm'
                    />
                    <Button
                      variant='ghost'
                      size='icon'
                      onClick={() => setShowUrl(!showUrl)}
                    >
                      {showUrl ? (
                        <EyeOff className='h-4 w-4' />
                      ) : (
                        <Eye className='h-4 w-4' />
                      )}
                    </Button>
                    <Button
                      variant='ghost'
                      size='icon'
                      onClick={() => handleCopy(connectionUrl, 'url')}
                    >
                      {copied === 'url' ? (
                        <CheckCircle2 className='h-4 w-4 text-green-500' />
                      ) : (
                        <Copy className='h-4 w-4' />
                      )}
                    </Button>
                  </div>
                </div>

                <Separator />

                <div className='grid gap-4 sm:grid-cols-2'>
                  {[
                    { label: 'Host', value: db.host, key: 'host' },
                    { label: 'Port', value: db.port, key: 'port' },
                    { label: 'Username', value: db.username, key: 'user' },
                    { label: 'Database', value: db.defaultDb, key: 'db' },
                  ].map((field) => (
                    <div key={field.key} className='space-y-2'>
                      <Label>{field.label}</Label>
                      <div className='flex items-center gap-2'>
                        <Input
                          value={field.value}
                          readOnly
                          className='font-mono text-sm'
                        />
                        <Button
                          variant='ghost'
                          size='icon'
                          onClick={() => handleCopy(field.value, field.key)}
                        >
                          {copied === field.key ? (
                            <CheckCircle2 className='h-4 w-4 text-green-500' />
                          ) : (
                            <Copy className='h-4 w-4' />
                          )}
                        </Button>
                      </div>
                    </div>
                  ))}

                  <div className='space-y-2'>
                    <Label>Password</Label>
                    <div className='flex items-center gap-2'>
                      <Input
                        type={showPassword ? 'text' : 'password'}
                        value={db.password}
                        readOnly
                        className='font-mono text-sm'
                      />
                      <Button
                        variant='ghost'
                        size='icon'
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className='h-4 w-4' />
                        ) : (
                          <Eye className='h-4 w-4' />
                        )}
                      </Button>
                      <Button
                        variant='ghost'
                        size='icon'
                        onClick={() => handleCopy(db.password, 'pass')}
                      >
                        {copied === 'pass' ? (
                          <CheckCircle2 className='h-4 w-4 text-green-500' />
                        ) : (
                          <Copy className='h-4 w-4' />
                        )}
                      </Button>
                    </div>
                  </div>
                </div>

                <div className='rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm text-amber-800'>
                  <div className='flex items-start gap-2'>
                    <AlertCircle className='mt-0.5 h-4 w-4 flex-shrink-0' />
                    <p>
                      Keep your credentials secure. Never share your password or
                      commit it to version control.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Instance Details</CardTitle>
              </CardHeader>
              <CardContent>
                <dl className='grid gap-4 sm:grid-cols-3'>
                  {[
                    { label: 'Engine', value: `${db.engine} ${db.version}` },
                    { label: 'Region', value: db.region },
                    { label: 'Plan', value: db.plan },
                    { label: 'CPU', value: `${db.cpu} cores` },
                    { label: 'Memory', value: `${db.ram} GB RAM` },
                    { label: 'Storage', value: `${db.storage} GB` },
                  ].map((item) => (
                    <div key={item.label}>
                      <dt className='text-xs font-medium tracking-wider text-muted-foreground uppercase'>
                        {item.label}
                      </dt>
                      <dd className='mt-1 font-semibold'>{item.value}</dd>
                    </div>
                  ))}
                </dl>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Monitoring Tab */}
          <TabsContent value='monitoring' className='mt-4 space-y-4'>
            <Card>
              <CardHeader>
                <CardTitle className='flex items-center gap-2'>
                  <Activity className='h-5 w-5' />
                  Performance Metrics
                </CardTitle>
                <CardDescription>
                  Real-time metrics for the last 24 hours.
                </CardDescription>
              </CardHeader>
              <CardContent className='space-y-6'>
                {metrics.map((m) => (
                  <div key={m.label} className='space-y-2'>
                    <div className='flex items-center justify-between text-sm'>
                      <span className='font-medium'>{m.label}</span>
                      <span className='font-bold'>
                        {m.value}
                        {m.unit}{' '}
                        <span className='font-normal text-muted-foreground'>
                          / {m.max}
                          {m.unit}
                        </span>
                      </span>
                    </div>
                    <div className='h-3 w-full overflow-hidden rounded-full bg-gray-100'>
                      <div
                        className={`h-full rounded-full transition-all ${m.color}`}
                        style={{ width: `${(m.value / m.max) * 100}%` }}
                      />
                    </div>
                    <p className='text-xs text-muted-foreground'>
                      {((m.value / m.max) * 100).toFixed(1)}% utilization
                    </p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Backups Tab */}
          <TabsContent value='backups' className='mt-4 space-y-4'>
            <Card>
              <CardHeader className='flex flex-wrap items-start justify-between gap-3'>
                <div>
                  <CardTitle>Backup History</CardTitle>
                  <CardDescription>
                    Automated backups run daily at 02:00 UTC. Manual backups can
                    be created anytime.
                  </CardDescription>
                </div>
                <Button size='sm' className='gap-2'>
                  <HardDrive className='h-4 w-4' />
                  Create Backup
                </Button>
              </CardHeader>
              <CardContent className='overflow-x-auto p-0'>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className='pl-6'>Date</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Size</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className='pr-6 text-right'>Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {backups.map((backup) => (
                      <TableRow key={backup.id}>
                        <TableCell className='pl-6 font-mono text-sm'>
                          {backup.date}
                        </TableCell>
                        <TableCell>
                          <Badge variant='secondary'>{backup.type}</Badge>
                        </TableCell>
                        <TableCell>{backup.size}</TableCell>
                        <TableCell>
                          <span className='flex items-center gap-1 text-sm text-green-600'>
                            <CheckCircle2 className='h-3 w-3' />
                            {backup.status}
                          </span>
                        </TableCell>
                        <TableCell className='pr-6 text-right'>
                          <Button variant='ghost' size='sm'>
                            Restore
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Security Tab */}
          <TabsContent value='security' className='mt-4 space-y-4'>
            <Card>
              <CardHeader>
                <CardTitle className='flex items-center gap-2'>
                  <Shield className='h-5 w-5' />
                  Trusted Sources
                </CardTitle>
                <CardDescription>
                  Restrict access to your database by IP address. Only listed
                  IPs can connect.
                </CardDescription>
              </CardHeader>
              <CardContent className='space-y-4'>
                <div className='flex gap-2'>
                  <Input placeholder='0.0.0.0/0 or specific IP' />
                  <Button>Add IP</Button>
                </div>
                <div className='rounded-lg border p-4'>
                  <div className='flex items-center justify-between'>
                    <div>
                      <p className='font-mono text-sm font-medium'>0.0.0.0/0</p>
                      <p className='text-xs text-muted-foreground'>
                        All sources (not recommended for production)
                      </p>
                    </div>
                    <Button variant='ghost' size='sm' className='text-red-500'>
                      Remove
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>SSL/TLS Encryption</CardTitle>
                <CardDescription>
                  All connections are encrypted using TLS 1.3 by default.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className='flex items-center justify-between rounded-lg border p-4'>
                  <div className='flex items-center gap-3'>
                    <CheckCircle2 className='h-5 w-5 text-green-500' />
                    <div>
                      <p className='font-medium'>TLS Encryption Enabled</p>
                      <p className='text-xs text-muted-foreground'>
                        TLS 1.3 • Certificate auto-renewed
                      </p>
                    </div>
                  </div>
                  <Button variant='outline' size='sm'>
                    Download CA Cert
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value='settings' className='mt-4 space-y-4'>
            <Card>
              <CardHeader>
                <CardTitle>General Settings</CardTitle>
              </CardHeader>
              <CardContent className='space-y-4'>
                <div className='space-y-2'>
                  <Label>Database Name</Label>
                  <div className='flex gap-2'>
                    <Input defaultValue={db.name} />
                    <Button variant='outline'>Rename</Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className='border-red-200'>
              <CardHeader>
                <CardTitle className='text-red-600'>Danger Zone</CardTitle>
                <CardDescription>
                  These actions are irreversible. Please be certain.
                </CardDescription>
              </CardHeader>
              <CardContent className='space-y-3'>
                <div className='flex items-center justify-between rounded-lg border border-red-100 bg-red-50 p-4'>
                  <div>
                    <p className='font-medium text-red-700'>Delete Database</p>
                    <p className='text-xs text-red-600'>
                      Permanently delete this database and all its data.
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
