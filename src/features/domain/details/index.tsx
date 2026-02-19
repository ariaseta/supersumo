import { useState, useEffect } from 'react'
import { useNavigate, useParams } from '@tanstack/react-router'
import {
  ChevronLeft,
  Globe,
  Shield,
  Settings2,
  RefreshCw,
  Copy,
  Plus,
  Pencil,
  Trash2,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Clock,
  Lock,
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
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

interface DnsRecord {
  id: string
  type: string
  name: string
  value: string
  ttl: string
  proxied?: boolean
}

const dnsRecords: DnsRecord[] = [
  { id: '1', type: 'A', name: '@', value: '103.12.34.56', ttl: 'Auto' },
  { id: '2', type: 'A', name: 'www', value: '103.12.34.56', ttl: 'Auto' },
  {
    id: '3',
    type: 'CNAME',
    name: 'blog',
    value: 'blog.superumo.id',
    ttl: 'Auto',
  },
  { id: '4', type: 'MX', name: '@', value: 'mail.example.com', ttl: '3600' },
  {
    id: '5',
    type: 'TXT',
    name: '@',
    value: 'v=spf1 include:_spf.google.com ~all',
    ttl: '3600',
  },
  { id: '6', type: 'NS', name: '@', value: 'ns1.superumo.id', ttl: '86400' },
  { id: '7', type: 'NS', name: '@', value: 'ns2.superumo.id', ttl: '86400' },
]

const recordTypeColors: Record<string, string> = {
  A: 'bg-blue-100 text-blue-700',
  AAAA: 'bg-indigo-100 text-indigo-700',
  CNAME: 'bg-purple-100 text-purple-700',
  MX: 'bg-amber-100 text-amber-700',
  TXT: 'bg-green-100 text-green-700',
  NS: 'bg-slate-100 text-slate-700',
  SRV: 'bg-pink-100 text-pink-700',
}

export function DomainDetails() {
  const navigate = useNavigate()
  const { domainId } = useParams({ from: '/_authenticated/domain/$domainId' })
  const [copied, setCopied] = useState<string | null>(null)
  const [newRecord, setNewRecord] = useState({
    type: 'A',
    name: '',
    value: '',
    ttl: 'Auto',
  })

  const domain = {
    id: domainId,
    name: 'superumo.id',
    status: 'active',
    registered: '2026-02-09',
    expires: '2027-02-09',
    autoRenew: true,
    locked: true,
    nameservers: ['ns1.superumo.id', 'ns2.superumo.id'],
    ssl: {
      status: 'active',
      issuer: "Let's Encrypt",
      expires: '2026-05-09',
    },
  }

  const [daysToExpiry, setDaysToExpiry] = useState<number>(0)

  useEffect(() => {
    const now = Date.now()
    const value = Math.ceil(
      (new Date(domain.expires).getTime() - now) / 86400000
    )
    if (value !== daysToExpiry) {
      const id = setTimeout(() => setDaysToExpiry(value), 0)
      return () => clearTimeout(id)
    }
    return undefined
  }, [domain.expires, daysToExpiry])

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
        <div className='flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
          <div className='flex items-center gap-4'>
            <Button
              variant='ghost'
              size='icon'
              onClick={() => navigate({ to: '/domain' })}
              className='-ml-1'
            >
              <ChevronLeft className='h-4 w-4' />
            </Button>
            <div className='flex flex-col'>
              <div className='flex items-center gap-2'>
                <Globe className='h-5 w-5 text-muted-foreground' />
                <h1 className='text-xl font-bold tracking-tight sm:text-2xl'>
                  {domain.name}
                </h1>
                <Badge
                  variant='outline'
                  className='border-green-200 bg-green-50 px-2 py-0 font-medium text-green-700 capitalize'
                >
                  {domain.status}
                </Badge>
                {domain.locked && (
                  <Badge
                    variant='outline'
                    className='gap-1 border-slate-200 bg-slate-50 px-2 py-0 text-slate-600'
                  >
                    <Lock className='h-3 w-3' />
                    Locked
                  </Badge>
                )}
              </div>
              <p className='text-xs text-muted-foreground sm:text-sm'>
                Expires {domain.expires} • {daysToExpiry} days remaining
              </p>
            </div>
          </div>

          <div className='flex items-center gap-2'>
            <Button variant='outline' size='sm' className='gap-2' asChild>
              <a
                href={`https://${domain.name}`}
                target='_blank'
                rel='noopener noreferrer'
              >
                <ExternalLink className='h-4 w-4' />
                Visit
              </a>
            </Button>
            <Button variant='outline' size='sm' className='gap-2'>
              <RefreshCw className='h-4 w-4' />
              Renew
            </Button>
          </div>
        </div>

        {/* Status Cards */}
        <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>
          <Card>
            <CardContent className='flex items-center gap-3 pt-5'>
              <div className='flex h-10 w-10 items-center justify-center rounded-lg bg-green-100'>
                <CheckCircle2 className='h-5 w-5 text-green-600' />
              </div>
              <div>
                <p className='text-xs text-muted-foreground'>Domain Status</p>
                <p className='font-bold text-green-600 capitalize'>
                  {domain.status}
                </p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className='flex items-center gap-3 pt-5'>
              <div className='flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100'>
                <Lock className='h-5 w-5 text-blue-600' />
              </div>
              <div>
                <p className='text-xs text-muted-foreground'>Transfer Lock</p>
                <p className='font-bold text-blue-600'>
                  {domain.locked ? 'Locked' : 'Unlocked'}
                </p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className='flex items-center gap-3 pt-5'>
              <div className='flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100'>
                <Shield className='h-5 w-5 text-purple-600' />
              </div>
              <div>
                <p className='text-xs text-muted-foreground'>SSL Certificate</p>
                <p className='font-bold text-purple-600 capitalize'>
                  {domain.ssl.status}
                </p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className='flex items-center gap-3 pt-5'>
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-lg ${daysToExpiry < 30 ? 'bg-red-100' : 'bg-amber-100'}`}
              >
                <Clock
                  className={`h-5 w-5 ${daysToExpiry < 30 ? 'text-red-600' : 'text-amber-600'}`}
                />
              </div>
              <div>
                <p className='text-xs text-muted-foreground'>Expires In</p>
                <p
                  className={`font-bold ${daysToExpiry < 30 ? 'text-red-600' : 'text-amber-600'}`}
                >
                  {daysToExpiry} days
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue='dns'>
          <TabsList>
            <TabsTrigger value='dns' className='gap-2'>
              <Globe className='h-4 w-4' />
              DNS Records
            </TabsTrigger>
            <TabsTrigger value='nameservers' className='gap-2'>
              <Settings2 className='h-4 w-4' />
              Nameservers
            </TabsTrigger>
            <TabsTrigger value='ssl' className='gap-2'>
              <Shield className='h-4 w-4' />
              SSL / TLS
            </TabsTrigger>
            <TabsTrigger value='settings' className='gap-2'>
              <Settings2 className='h-4 w-4' />
              Settings
            </TabsTrigger>
          </TabsList>

          {/* DNS Records */}
          <TabsContent value='dns' className='mt-4 space-y-4'>
            {/* Add Record */}
            <Card>
              <CardHeader className='pb-2'>
                <CardTitle className='text-base font-semibold'>
                  Add DNS Record
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className='grid gap-3 sm:grid-cols-5'>
                  <div className='space-y-1'>
                    <Label className='text-xs'>Type</Label>
                    <Select
                      value={newRecord.type}
                      onValueChange={(v) =>
                        setNewRecord((r) => ({ ...r, type: v }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {['A', 'AAAA', 'CNAME', 'MX', 'TXT', 'NS', 'SRV'].map(
                          (t) => (
                            <SelectItem key={t} value={t}>
                              {t}
                            </SelectItem>
                          )
                        )}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className='space-y-1'>
                    <Label className='text-xs'>Name</Label>
                    <Input
                      placeholder='@'
                      value={newRecord.name}
                      onChange={(e) =>
                        setNewRecord((r) => ({ ...r, name: e.target.value }))
                      }
                    />
                  </div>
                  <div className='space-y-1 sm:col-span-2'>
                    <Label className='text-xs'>Value</Label>
                    <Input
                      placeholder='103.0.0.1'
                      value={newRecord.value}
                      onChange={(e) =>
                        setNewRecord((r) => ({ ...r, value: e.target.value }))
                      }
                    />
                  </div>
                  <div className='flex items-end'>
                    <Button className='w-full gap-2'>
                      <Plus className='h-4 w-4' />
                      Add
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Records Table */}
            <Card>
              <CardHeader className='flex flex-row items-center justify-between'>
                <div>
                  <CardTitle>DNS Records</CardTitle>
                  <CardDescription>
                    {dnsRecords.length} records configured for {domain.name}
                  </CardDescription>
                </div>
                <Button variant='outline' size='sm' className='gap-2'>
                  <RefreshCw className='h-4 w-4' />
                  Sync
                </Button>
              </CardHeader>
              <CardContent className='p-0'>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className='w-20 pl-6'>Type</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead className='max-w-xs'>Value</TableHead>
                      <TableHead>TTL</TableHead>
                      <TableHead className='pr-6 text-right'>Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {dnsRecords.map((record) => (
                      <TableRow key={record.id}>
                        <TableCell className='pl-6'>
                          <span
                            className={`rounded px-2 py-0.5 text-xs font-bold ${recordTypeColors[record.type] ?? 'bg-gray-100 text-gray-700'}`}
                          >
                            {record.type}
                          </span>
                        </TableCell>
                        <TableCell className='font-mono text-sm'>
                          {record.name}
                        </TableCell>
                        <TableCell className='max-w-xs truncate font-mono text-sm text-muted-foreground'>
                          {record.value}
                        </TableCell>
                        <TableCell className='text-sm text-muted-foreground'>
                          {record.ttl}
                        </TableCell>
                        <TableCell className='pr-6 text-right'>
                          <div className='flex items-center justify-end gap-1'>
                            <Button
                              variant='ghost'
                              size='icon'
                              className='h-7 w-7'
                              onClick={() =>
                                handleCopy(record.value, record.id)
                              }
                            >
                              {copied === record.id ? (
                                <CheckCircle2 className='h-3 w-3 text-green-500' />
                              ) : (
                                <Copy className='h-3 w-3' />
                              )}
                            </Button>
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
                              className='h-7 w-7 text-red-500 hover:text-red-600'
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
          </TabsContent>

          {/* Nameservers */}
          <TabsContent value='nameservers' className='mt-4 space-y-4'>
            <Card>
              <CardHeader>
                <CardTitle>Nameservers</CardTitle>
                <CardDescription>
                  These are the current authoritative nameservers for{' '}
                  {domain.name}. DNS changes can take up to 48 hours to
                  propagate.
                </CardDescription>
              </CardHeader>
              <CardContent className='space-y-4'>
                {domain.nameservers.map((ns, i) => (
                  <div key={ns} className='flex items-center gap-2'>
                    <Label className='w-8 text-muted-foreground'>
                      NS{i + 1}
                    </Label>
                    <Input value={ns} readOnly className='font-mono text-sm' />
                    <Button
                      variant='ghost'
                      size='icon'
                      onClick={() => handleCopy(ns, `ns-${i}`)}
                    >
                      {copied === `ns-${i}` ? (
                        <CheckCircle2 className='h-4 w-4 text-green-500' />
                      ) : (
                        <Copy className='h-4 w-4' />
                      )}
                    </Button>
                  </div>
                ))}

                <Separator />

                <div>
                  <p className='mb-3 text-sm font-medium'>
                    Use Custom Nameservers
                  </p>
                  <div className='space-y-2'>
                    <Input placeholder='ns1.yournameserver.com' />
                    <Input placeholder='ns2.yournameserver.com' />
                  </div>
                  <Button variant='outline' className='mt-3'>
                    Update Nameservers
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* SSL */}
          <TabsContent value='ssl' className='mt-4 space-y-4'>
            <Card>
              <CardHeader>
                <CardTitle className='flex items-center gap-2'>
                  <Shield className='h-5 w-5' />
                  SSL Certificate
                </CardTitle>
                <CardDescription>
                  Free SSL certificate auto-managed via Let's Encrypt.
                </CardDescription>
              </CardHeader>
              <CardContent className='space-y-4'>
                <div className='flex items-center justify-between rounded-lg border border-green-200 bg-green-50 p-4'>
                  <div className='flex items-center gap-3'>
                    <CheckCircle2 className='h-5 w-5 text-green-500' />
                    <div>
                      <p className='font-medium'>Certificate Active</p>
                      <p className='text-xs text-muted-foreground'>
                        Issued by {domain.ssl.issuer} • Expires{' '}
                        {domain.ssl.expires}
                      </p>
                    </div>
                  </div>
                  <Button variant='outline' size='sm'>
                    Renew
                  </Button>
                </div>

                <dl className='grid gap-3 text-sm sm:grid-cols-3'>
                  {[
                    { label: 'Issuer', value: domain.ssl.issuer },
                    { label: 'Valid Until', value: domain.ssl.expires },
                    { label: 'Protocol', value: 'TLS 1.3' },
                    { label: 'Wildcard', value: 'No' },
                    { label: 'Auto-Renew', value: 'Yes' },
                    { label: 'HSTS', value: 'Enabled' },
                  ].map((item) => (
                    <div key={item.label}>
                      <dt className='text-xs tracking-wider text-muted-foreground uppercase'>
                        {item.label}
                      </dt>
                      <dd className='mt-1 font-medium'>{item.value}</dd>
                    </div>
                  ))}
                </dl>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings */}
          <TabsContent value='settings' className='mt-4 space-y-4'>
            <Card>
              <CardHeader>
                <CardTitle>General Settings</CardTitle>
              </CardHeader>
              <CardContent className='space-y-5'>
                <div className='flex items-center justify-between'>
                  <div>
                    <p className='font-medium'>Auto Renew</p>
                    <p className='text-xs text-muted-foreground'>
                      Automatically renew this domain before it expires.
                    </p>
                  </div>
                  <Badge
                    variant={domain.autoRenew ? 'default' : 'secondary'}
                    className='cursor-pointer'
                  >
                    {domain.autoRenew ? 'Enabled' : 'Disabled'}
                  </Badge>
                </div>
                <Separator />
                <div className='flex items-center justify-between'>
                  <div>
                    <p className='font-medium'>Transfer Lock</p>
                    <p className='text-xs text-muted-foreground'>
                      Prevent this domain from being transferred to another
                      registrar.
                    </p>
                  </div>
                  <Badge
                    variant={domain.locked ? 'default' : 'secondary'}
                    className='cursor-pointer'
                  >
                    {domain.locked ? 'Locked' : 'Unlocked'}
                  </Badge>
                </div>
                <Separator />
                <div className='flex items-center justify-between'>
                  <div>
                    <p className='font-medium'>WHOIS Privacy</p>
                    <p className='text-xs text-muted-foreground'>
                      Hide your personal info from public WHOIS lookups.
                    </p>
                  </div>
                  <Badge variant='default' className='cursor-pointer'>
                    Enabled
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Renewal</CardTitle>
              </CardHeader>
              <CardContent className='space-y-4'>
                {daysToExpiry < 60 && (
                  <div className='rounded-lg border border-amber-200 bg-amber-50 p-3'>
                    <div className='flex items-start gap-2 text-sm text-amber-800'>
                      <AlertCircle className='mt-0.5 h-4 w-4 flex-shrink-0' />
                      <p>
                        Your domain expires in {daysToExpiry} days. Renew now to
                        avoid service interruption.
                      </p>
                    </div>
                  </div>
                )}
                <div className='flex items-center justify-between rounded-lg border p-4'>
                  <div>
                    <p className='font-medium'>Expires: {domain.expires}</p>
                    <p className='text-xs text-muted-foreground'>
                      {daysToExpiry} days remaining
                    </p>
                  </div>
                  <Button className='gap-2'>
                    <RefreshCw className='h-4 w-4' />
                    Renew Domain
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className='border-red-200'>
              <CardHeader>
                <CardTitle className='text-red-600'>Danger Zone</CardTitle>
              </CardHeader>
              <CardContent>
                <div className='flex items-center justify-between rounded-lg border border-red-100 bg-red-50 p-4'>
                  <div>
                    <p className='font-medium text-red-700'>Delete Domain</p>
                    <p className='text-xs text-red-600'>
                      Removes this domain from your account. Does not cancel
                      registration.
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
