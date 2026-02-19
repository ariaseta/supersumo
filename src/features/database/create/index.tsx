import { useState } from 'react'
import {
  Database,
  Globe,
  HardDrive,
  Server,
  Zap,
  CheckCircle2,
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
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { PageHeader } from '@/components/layout/page-header'
import { Notifications } from '@/components/notifications'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'

type DbType = 'postgresql' | 'mariadb' | 'mysql'
type Region = 'jakarta' | 'singapore'
type PlanType = 'shared' | 'dedicated'

interface DedicatedPlan {
  id: string
  name: string
  cpu: number
  ram: number
  price: number
  description: string
}

const dbTypes: { id: DbType; label: string; icon: string; version: string }[] =
  [
    { id: 'postgresql', label: 'PostgreSQL', icon: '🐘', version: 'v16' },
    { id: 'mariadb', label: 'MariaDB', icon: '🐬', version: 'v11' },
    { id: 'mysql', label: 'MySQL', icon: '🐬', version: 'v8.0' },
  ]

const regions: {
  id: Region
  label: string
  country: string
  flag: string
  ping: string
}[] = [
  {
    id: 'jakarta',
    label: 'Jakarta',
    country: 'Indonesia',
    flag: '🇮🇩',
    ping: '~5ms',
  },
  {
    id: 'singapore',
    label: 'Singapore',
    country: 'Singapore',
    flag: '🇸🇬',
    ping: '~25ms',
  },
]

const dedicatedPlans: DedicatedPlan[] = [
  {
    id: 'lite',
    name: 'Lite',
    cpu: 1,
    ram: 1,
    price: 75000,
    description: 'Perfect for small projects',
  },
  {
    id: 'medium',
    name: 'Medium',
    cpu: 2,
    ram: 2,
    price: 150000,
    description: 'Ideal for growing apps',
  },
  {
    id: 'large',
    name: 'Large',
    cpu: 4,
    ram: 4,
    price: 280000,
    description: 'For high-traffic workloads',
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    cpu: 8,
    ram: 16,
    price: 550000,
    description: 'Mission-critical databases',
  },
]

const STORAGE_PRICE_PER_GB = 5000

export function CreateDatabase() {
  const [dbName, setDbName] = useState('')
  const [dbType, setDbType] = useState<DbType>('postgresql')
  const [region, setRegion] = useState<Region>('jakarta')
  const [planType, setPlanType] = useState<PlanType>('shared')
  const [storageGb, setStorageGb] = useState(1)
  const [dedicatedPlan, setDedicatedPlan] = useState<string>('medium')

  const dbNameError =
    dbName.length > 0 && (dbName.length < 3 || /[^a-z0-9_-]/.test(dbName))

  const selectedDedicatedPlan =
    dedicatedPlans.find((p) => p.id === dedicatedPlan) ?? dedicatedPlans[1]

  const estimatedCost =
    planType === 'shared'
      ? storageGb * STORAGE_PRICE_PER_GB
      : selectedDedicatedPlan.price + storageGb * STORAGE_PRICE_PER_GB

  const selectedDb = dbTypes.find((d) => d.id === dbType)
  const selectedRegion = regions.find((r) => r.id === region)

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
          title='Create Database'
          description='Provision a managed database for your application'
          backButton={{ to: '/database', label: '' }}
          className='mb-2'
        />

        <div className='grid gap-6 lg:grid-cols-3'>
          <div className='space-y-6 lg:col-span-2'>
            {/* Database Name */}
            <Card>
              <CardHeader className='pb-2'>
                <CardTitle className='flex items-center gap-2 text-lg font-semibold'>
                  <Database className='h-5 w-5' />
                  Database Name
                </CardTitle>
              </CardHeader>
              <CardContent className='space-y-2'>
                <Label>
                  Name <span className='text-red-500'>*</span>
                </Label>
                <Input
                  placeholder='my-database'
                  value={dbName}
                  onChange={(e) => setDbName(e.target.value)}
                  className={
                    dbNameError
                      ? 'border-red-500 focus-visible:ring-red-500'
                      : ''
                  }
                />
                {dbNameError ? (
                  <p className='text-xs text-red-500'>
                    Name must be at least 3 characters, lowercase only, and no
                    spaces
                  </p>
                ) : (
                  <p className='text-xs text-muted-foreground'>
                    Only lowercase letters, numbers, hyphens, and underscores
                    are allowed
                  </p>
                )}
              </CardContent>
            </Card>

            {/* Database Engine */}
            <Card>
              <CardHeader className='pb-2'>
                <CardTitle className='flex items-center gap-2 text-lg font-semibold'>
                  <Database className='h-5 w-5' />
                  Database Engine
                </CardTitle>
                <CardDescription>
                  Choose the database engine that fits your application needs.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className='grid gap-3 sm:grid-cols-3'>
                  {dbTypes.map((db) => (
                    <button
                      key={db.id}
                      onClick={() => setDbType(db.id)}
                      className={`relative flex flex-col items-start gap-2 rounded-lg border-2 p-4 text-left transition-all hover:border-slate-400 ${
                        dbType === db.id
                          ? 'border-slate-700 bg-slate-700/5'
                          : 'border-border'
                      }`}
                    >
                      {dbType === db.id && (
                        <CheckCircle2 className='absolute top-3 right-3 h-4 w-4 text-slate-700' />
                      )}
                      <span className='text-2xl'>{db.icon}</span>
                      <div>
                        <p className='font-semibold'>{db.label}</p>
                        <p className='text-xs text-muted-foreground'>
                          {db.version}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Region */}
            <Card>
              <CardHeader className='pb-2'>
                <CardTitle className='flex items-center gap-2 text-lg font-semibold'>
                  <Globe className='h-5 w-5' />
                  Select Region
                </CardTitle>
                <CardDescription>
                  Choose the region closest to your users for better
                  performance.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className='grid gap-4 sm:grid-cols-2'>
                  {regions.map((r) => (
                    <button
                      key={r.id}
                      onClick={() => setRegion(r.id)}
                      className={`relative flex cursor-pointer items-center justify-between rounded-lg border-2 p-4 text-left transition-all hover:border-slate-400 ${
                        region === r.id
                          ? 'border-slate-700 bg-slate-700/5'
                          : 'border-border'
                      }`}
                    >
                      <div className='flex items-center gap-3'>
                        <span className='text-2xl'>{r.flag}</span>
                        <div className='flex flex-col'>
                          <span className='font-bold'>{r.label}</span>
                          <span className='text-xs text-muted-foreground'>
                            {r.country}
                          </span>
                        </div>
                      </div>
                      <div className='flex items-center gap-2'>
                        <Badge variant='secondary' className='text-xs'>
                          {r.ping}
                        </Badge>
                        {region === r.id && (
                          <CheckCircle2 className='h-4 w-4 text-slate-700' />
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Plan Type */}
            <Card>
              <CardHeader className='pb-2'>
                <CardTitle className='flex items-center gap-2 text-lg font-semibold'>
                  <Server className='h-5 w-5' />
                  Instance Type
                </CardTitle>
                <CardDescription>
                  Choose between shared resources for cost efficiency or
                  dedicated resources for performance isolation.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className='grid gap-4 sm:grid-cols-2'>
                  <button
                    onClick={() => setPlanType('shared')}
                    className={`flex flex-col gap-2 rounded-lg border-2 p-4 text-left transition-all hover:border-slate-400 ${
                      planType === 'shared'
                        ? 'border-slate-700 bg-slate-700/5'
                        : 'border-border'
                    }`}
                  >
                    <div className='flex items-center justify-between'>
                      <span className='font-semibold'>Shared</span>
                      {planType === 'shared' && (
                        <CheckCircle2 className='h-4 w-4 text-slate-700' />
                      )}
                    </div>
                    <p className='text-sm text-muted-foreground'>
                      Shared CPU and memory resources. Cost-effective for dev
                      and small workloads.
                    </p>
                    <Badge variant='secondary' className='w-fit text-xs'>
                      From Rp 5.000/GB/month
                    </Badge>
                  </button>
                  <button
                    onClick={() => setPlanType('dedicated')}
                    className={`flex flex-col gap-2 rounded-lg border-2 p-4 text-left transition-all hover:border-slate-400 ${
                      planType === 'dedicated'
                        ? 'border-slate-700 bg-slate-700/5'
                        : 'border-border'
                    }`}
                  >
                    <div className='flex items-center justify-between'>
                      <span className='font-semibold'>Dedicated</span>
                      {planType === 'dedicated' && (
                        <CheckCircle2 className='h-4 w-4 text-slate-700' />
                      )}
                    </div>
                    <p className='text-sm text-muted-foreground'>
                      Dedicated CPU and memory. Ideal for production workloads
                      requiring consistent performance.
                    </p>
                    <Badge variant='secondary' className='w-fit text-xs'>
                      From Rp 75.000/month
                    </Badge>
                  </button>
                </div>
              </CardContent>
            </Card>

            {/* Dedicated Plan Packages */}
            {planType === 'dedicated' && (
              <Card>
                <CardHeader className='pb-2'>
                  <CardTitle className='text-lg font-semibold'>
                    Select Resource Package
                  </CardTitle>
                  <CardDescription>
                    Choose the CPU and memory configuration for your dedicated
                    database instance.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className='grid gap-3 sm:grid-cols-2'>
                    {dedicatedPlans.map((plan) => (
                      <button
                        key={plan.id}
                        onClick={() => setDedicatedPlan(plan.id)}
                        className={`relative flex flex-col gap-3 rounded-lg border-2 p-4 text-left transition-all hover:border-slate-400 ${
                          dedicatedPlan === plan.id
                            ? 'border-slate-700 bg-slate-700/5'
                            : 'border-border'
                        }`}
                      >
                        {dedicatedPlan === plan.id && (
                          <CheckCircle2 className='absolute top-3 right-3 h-4 w-4 text-slate-700' />
                        )}
                        <div>
                          <p className='font-bold'>{plan.name}</p>
                          <p className='text-xs text-muted-foreground'>
                            {plan.description}
                          </p>
                        </div>
                        <div className='flex gap-3 text-sm'>
                          <span className='flex items-center gap-1 font-medium'>
                            <span className='text-muted-foreground'>CPU:</span>{' '}
                            {plan.cpu} {plan.cpu === 1 ? 'core' : 'cores'}
                          </span>
                          <span className='flex items-center gap-1 font-medium'>
                            <span className='text-muted-foreground'>RAM:</span>{' '}
                            {plan.ram} GB
                          </span>
                        </div>
                        <p className='text-sm font-bold'>
                          Rp {plan.price.toLocaleString('id-ID')}/month
                        </p>
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Storage */}
            <Card>
              <CardHeader className='pb-2'>
                <CardTitle className='flex items-center gap-2 text-lg font-semibold'>
                  <HardDrive className='h-5 w-5' />
                  Storage
                </CardTitle>
                <CardDescription>
                  {planType === 'shared'
                    ? 'Select storage size for your shared database instance.'
                    : 'Select additional storage for your dedicated database instance.'}
                </CardDescription>
              </CardHeader>
              <CardContent className='space-y-5'>
                <div className='space-y-3'>
                  <div className='flex items-center justify-between'>
                    <Label>Storage Size</Label>
                    <span className='text-sm font-bold'>{storageGb} GB</span>
                  </div>
                  <input
                    type='range'
                    min={1}
                    max={planType === 'shared' ? 10 : 50}
                    step={1}
                    value={storageGb}
                    onChange={(e) => setStorageGb(Number(e.target.value))}
                    className='h-2 w-full cursor-pointer appearance-none rounded-full bg-gray-200 accent-black'
                  />
                  <div className='flex justify-between text-xs text-muted-foreground'>
                    <span>1 GB</span>
                    <span>{planType === 'shared' ? '10' : '50'} GB</span>
                  </div>
                </div>

                {/* Storage steps visual */}
                <div className='flex flex-wrap gap-2'>
                  {(planType === 'shared'
                    ? [1, 2, 5, 10]
                    : [1, 5, 10, 20, 50]
                  ).map((size) => (
                    <button
                      key={size}
                      onClick={() => setStorageGb(size)}
                      className={`rounded-md border px-3 py-1 text-xs font-medium transition-all ${
                        storageGb === size
                          ? 'border-slate-700 bg-slate-700 text-white'
                          : 'border-border hover:border-slate-400'
                      }`}
                    >
                      {size} GB
                    </button>
                  ))}
                </div>

                <div className='rounded-lg bg-muted/50 p-3'>
                  <p className='text-xs text-muted-foreground'>
                    Storage cost:{' '}
                    <span className='font-semibold text-foreground'>
                      Rp{' '}
                      {(storageGb * STORAGE_PRICE_PER_GB).toLocaleString(
                        'id-ID'
                      )}
                      /month
                    </span>{' '}
                    (Rp 5.000 per GB/month)
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Summary Sidebar */}
          <div className='space-y-6'>
            <Card className='lg:sticky lg:top-24'>
              <CardHeader>
                <CardTitle className='text-lg'>Configuration Summary</CardTitle>
              </CardHeader>
              <CardContent className='space-y-6'>
                <div className='space-y-4'>
                  <div className='space-y-1'>
                    <p className='text-xs tracking-wider text-muted-foreground uppercase'>
                      Database Name
                    </p>
                    <p className='font-bold'>
                      {dbName.length >= 3 && !dbNameError
                        ? dbName
                        : 'Not specified'}
                    </p>
                  </div>

                  <div className='space-y-1'>
                    <p className='text-xs tracking-wider text-muted-foreground uppercase'>
                      Engine
                    </p>
                    <div className='flex items-center gap-2'>
                      <span>{selectedDb?.icon}</span>
                      <p className='font-bold'>{selectedDb?.label}</p>
                      <Badge variant='secondary' className='text-xs'>
                        {selectedDb?.version}
                      </Badge>
                    </div>
                  </div>

                  <div className='space-y-1'>
                    <p className='text-xs tracking-wider text-muted-foreground uppercase'>
                      Region
                    </p>
                    <div className='flex items-center gap-2'>
                      <span>{selectedRegion?.flag}</span>
                      <p className='font-bold'>{selectedRegion?.label}</p>
                    </div>
                  </div>

                  <div className='space-y-1'>
                    <p className='text-xs tracking-wider text-muted-foreground uppercase'>
                      Instance Type
                    </p>
                    <p className='font-bold capitalize'>{planType}</p>
                  </div>

                  {planType === 'dedicated' && (
                    <div className='space-y-1'>
                      <p className='text-xs tracking-wider text-muted-foreground uppercase'>
                        Plan
                      </p>
                      <p className='font-bold'>{selectedDedicatedPlan.name}</p>
                      <p className='text-sm text-muted-foreground'>
                        {selectedDedicatedPlan.cpu}{' '}
                        {selectedDedicatedPlan.cpu === 1 ? 'core' : 'cores'} •{' '}
                        {selectedDedicatedPlan.ram} GB RAM
                      </p>
                    </div>
                  )}

                  <div className='space-y-1'>
                    <p className='text-xs tracking-wider text-muted-foreground uppercase'>
                      Storage
                    </p>
                    <p className='font-bold'>{storageGb} GB</p>
                  </div>
                </div>

                <Separator />

                <div className='space-y-3'>
                  {planType === 'dedicated' && (
                    <div className='flex items-center justify-between text-sm'>
                      <span className='text-muted-foreground'>
                        Resource plan
                      </span>
                      <span className='font-medium'>
                        Rp {selectedDedicatedPlan.price.toLocaleString('id-ID')}
                      </span>
                    </div>
                  )}
                  <div className='flex items-center justify-between text-sm'>
                    <span className='text-muted-foreground'>
                      Storage ({storageGb} GB)
                    </span>
                    <span className='font-medium'>
                      Rp{' '}
                      {(storageGb * STORAGE_PRICE_PER_GB).toLocaleString(
                        'id-ID'
                      )}
                    </span>
                  </div>
                  <Separator />
                  <div className='flex items-baseline justify-between'>
                    <span className='font-bold'>Total Cost</span>
                    <span className='text-lg font-bold'>
                      Rp {estimatedCost.toLocaleString('id-ID')}/month
                    </span>
                  </div>
                  <p className='text-right text-xs text-muted-foreground'>
                    Billed monthly • Cancel anytime
                  </p>
                </div>

                <Button
                  size='lg'
                  className='w-full bg-black text-white hover:bg-black/90'
                >
                  <Zap className='mr-2 h-4 w-4 fill-current' />
                  Create Database
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </Main>
    </>
  )
}
