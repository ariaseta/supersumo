import { useState } from 'react'
import { ChevronDown, HardDrive, Plus, Server } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { PageHeader } from '@/components/layout/page-header'
import { Notifications } from '@/components/notifications'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'

export function CreateContainer() {
  const [podName, setPodName] = useState('')
  const [imageType, setImageType] = useState<'public' | 'private'>('public')
  const [imageName, setImageName] = useState('nginx')
  const [cpuCores, setCpuCores] = useState(1)
  const [memoryGb, setMemoryGb] = useState(1)
  const [containerPort, setContainerPort] = useState('80')
  const [volumes, setVolumes] = useState<{ path: string; size: string }[]>([])

  const podNameError =
    podName.length > 0 && (podName.length < 3 || /[^a-z0-9-]/.test(podName))
  const estimatedCost = 40000 + (cpuCores - 1) * 15000 + (memoryGb - 1) * 10000

  const handleAddVolume = () => {
    setVolumes((prev) => [...prev, { path: '/data', size: '1' }])
  }

  const handleRemoveVolume = (index: number) => {
    setVolumes((prev) => prev.filter((_, i) => i !== index))
  }

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
          title='Deploy Container'
          description='Configure and deploy your containerized application'
          backButton={{ to: '/containers', label: '' }}
          className='mb-2'
        />

        <div className='grid gap-6 lg:grid-cols-3'>
          <div className='space-y-6 lg:col-span-2'>
            {/* Container Configuration */}
            <Card>
              <CardHeader className='pb-2'>
                <CardTitle className='text-lg font-semibold'>
                  Container Configuration
                </CardTitle>
              </CardHeader>
              <CardContent className='space-y-4'>
                <div className='space-y-2'>
                  <Label>
                    Container Name <span className='text-red-500'>*</span>
                  </Label>
                  <Input
                    placeholder='my-web-app'
                    value={podName}
                    onChange={(e) => setPodName(e.target.value)}
                    className={
                      podNameError
                        ? 'border-red-500 focus-visible:ring-red-500'
                        : ''
                    }
                  />
                  {podNameError && (
                    <p className='text-xs text-red-500'>
                      Container name must be at least 3 characters long,
                      lowercase only, and no spaces
                    </p>
                  )}
                  {!podNameError && (
                    <p className='text-xs text-muted-foreground'>
                      Only lowercase letters, numbers, and hyphens are allowed
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Container Image */}
            <Card>
              <CardHeader className='pb-2'>
                <CardTitle className='text-lg font-semibold'>
                  Container Image
                </CardTitle>
              </CardHeader>
              <CardContent className='space-y-4'>
                <div className='space-y-2'>
                  <Label>Image Type</Label>
                  <div className='flex gap-6'>
                    <label className='flex cursor-pointer items-center gap-2'>
                      <div
                        onClick={() => setImageType('public')}
                        className={`flex h-4 w-4 items-center justify-center rounded-full border-2 ${
                          imageType === 'public'
                            ? 'border-black'
                            : 'border-muted-foreground'
                        }`}
                      >
                        {imageType === 'public' && (
                          <div className='h-2 w-2 rounded-full bg-black' />
                        )}
                      </div>
                      <span className='text-sm'>Public Registry</span>
                    </label>
                    <label className='flex cursor-pointer items-center gap-2'>
                      <div
                        onClick={() => setImageType('private')}
                        className={`flex h-4 w-4 items-center justify-center rounded-full border-2 ${
                          imageType === 'private'
                            ? 'border-black'
                            : 'border-muted-foreground'
                        }`}
                      >
                        {imageType === 'private' && (
                          <div className='h-2 w-2 rounded-full bg-black' />
                        )}
                      </div>
                      <span className='text-sm'>Private Registry</span>
                    </label>
                  </div>
                </div>

                <div className='space-y-2'>
                  <Label>Image Name</Label>
                  <Input
                    placeholder='nginx'
                    value={imageName}
                    onChange={(e) => setImageName(e.target.value)}
                  />
                  {imageType === 'public' && (
                    <p className='text-xs text-muted-foreground'>
                      Enter a public Docker image (e.g., nginx, node:18,
                      python:3.9)
                    </p>
                  )}
                  {imageType === 'private' && (
                    <p className='text-xs text-muted-foreground'>
                      Enter the full image URL including registry hostname
                    </p>
                  )}
                </div>

                {imageType === 'private' && (
                  <div className='grid gap-4 sm:grid-cols-2'>
                    <div className='space-y-2'>
                      <Label>Registry Username</Label>
                      <Input placeholder='username' />
                    </div>
                    <div className='space-y-2'>
                      <Label>Registry Password</Label>
                      <Input type='password' placeholder='password' />
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Resource Configuration */}
            <Card>
              <CardHeader className='pb-2'>
                <CardTitle className='flex items-center gap-2 text-lg font-semibold'>
                  <Server className='h-5 w-5' />
                  Resource Configuration
                </CardTitle>
              </CardHeader>
              <CardContent className='space-y-6'>
                <div className='space-y-3'>
                  <div className='flex items-center justify-between'>
                    <Label>CPU Cores (Minimum 1 Core)</Label>
                    <span className='text-sm font-semibold'>
                      {cpuCores} {cpuCores === 1 ? 'Core' : 'Cores'}
                    </span>
                  </div>
                  <input
                    type='range'
                    min={1}
                    max={4}
                    step={1}
                    value={cpuCores}
                    onChange={(e) => setCpuCores(Number(e.target.value))}
                    className='h-2 w-full cursor-pointer appearance-none rounded-full bg-gray-200 accent-black'
                  />
                  <div className='flex justify-between text-xs text-muted-foreground'>
                    <span>1</span>
                    <span>4</span>
                  </div>
                </div>

                <div className='space-y-3'>
                  <div className='flex items-center justify-between'>
                    <Label>Memory (Minimum 1 GB)</Label>
                    <span className='text-sm font-semibold'>{memoryGb} GB</span>
                  </div>
                  <input
                    type='range'
                    min={1}
                    max={8}
                    step={1}
                    value={memoryGb}
                    onChange={(e) => setMemoryGb(Number(e.target.value))}
                    className='h-2 w-full cursor-pointer appearance-none rounded-full bg-gray-200 accent-black'
                  />
                  <div className='flex justify-between text-xs text-muted-foreground'>
                    <span>1 GB</span>
                    <span>8 GB</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Network Configuration */}
            <Card>
              <CardHeader className='pb-2'>
                <CardTitle className='text-lg font-semibold'>
                  Network Configuration
                </CardTitle>
                <p className='text-sm text-muted-foreground'>
                  Configure the port that your application will expose.
                </p>
              </CardHeader>
              <CardContent>
                <div className='space-y-2'>
                  <Label>Container Port</Label>
                  <Input
                    type='number'
                    placeholder='80'
                    value={containerPort}
                    onChange={(e) => setContainerPort(e.target.value)}
                    className='max-w-xs'
                  />
                  <p className='text-xs text-muted-foreground'>
                    The port number that your application listens on (e.g., 80
                    for HTTP, 3000 for Node.js)
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Volume Mounts */}
            <Card>
              <CardHeader className='pb-2'>
                <div className='flex items-center justify-between'>
                  <div>
                    <CardTitle className='text-lg font-semibold'>
                      Volume Mounts{' '}
                      <span className='text-sm font-normal text-muted-foreground'>
                        Optional
                      </span>
                    </CardTitle>
                    <p className='mt-1 text-sm text-muted-foreground'>
                      Add persistent storage volumes to your container. First
                      1GB is free, then Rp 10,000 per additional GB/month.
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className='space-y-4'>
                <div className='flex items-center justify-between'>
                  <Label>Volumes</Label>
                  <Button
                    variant='ghost'
                    size='sm'
                    className='gap-1 text-xs'
                    onClick={handleAddVolume}
                  >
                    <Plus className='h-3 w-3' />
                    Add Volume
                  </Button>
                </div>

                {volumes.length === 0 ? (
                  <p className='text-sm text-muted-foreground'>
                    No volumes configured
                  </p>
                ) : (
                  <div className='space-y-3'>
                    {volumes.map((vol, index) => (
                      <div
                        key={index}
                        className='grid gap-3 rounded-lg border p-3 sm:grid-cols-3'
                      >
                        <div className='space-y-1 sm:col-span-2'>
                          <Label className='text-xs'>Mount Path</Label>
                          <Input
                            placeholder='/data'
                            value={vol.path}
                            onChange={(e) => {
                              const updated = [...volumes]
                              updated[index].path = e.target.value
                              setVolumes(updated)
                            }}
                          />
                        </div>
                        <div className='space-y-1'>
                          <Label className='text-xs'>Size (GB)</Label>
                          <div className='flex gap-2'>
                            <Input
                              type='number'
                              placeholder='1'
                              value={vol.size}
                              onChange={(e) => {
                                const updated = [...volumes]
                                updated[index].size = e.target.value
                                setVolumes(updated)
                              }}
                            />
                            <Button
                              variant='ghost'
                              size='sm'
                              className='text-red-500 hover:text-red-600'
                              onClick={() => handleRemoveVolume(index)}
                            >
                              ×
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Deployment Summary */}
          <div className='space-y-6'>
            <Card className='lg:sticky lg:top-24'>
              <CardHeader>
                <CardTitle className='text-lg'>Deployment Summary</CardTitle>
              </CardHeader>
              <CardContent className='space-y-6'>
                <div className='space-y-4'>
                  <div className='space-y-1'>
                    <p className='text-xs tracking-wider text-muted-foreground uppercase'>
                      Container Name
                    </p>
                    <p className='font-bold'>
                      {podName.length >= 3 && !podNameError
                        ? podName
                        : 'Not specified'}
                    </p>
                  </div>
                  <div className='space-y-1'>
                    <p className='text-xs tracking-wider text-muted-foreground uppercase'>
                      Container Image
                    </p>
                    <p className='font-bold'>{imageName || 'Not specified'}</p>
                    <p className='text-xs text-muted-foreground'>
                      {imageType === 'public'
                        ? 'Public Registry'
                        : 'Private Registry'}
                    </p>
                  </div>
                  <div className='space-y-1'>
                    <p className='text-xs tracking-wider text-muted-foreground uppercase'>
                      Resources
                    </p>
                    <p className='text-sm font-medium'>
                      CPU: {cpuCores} {cpuCores === 1 ? 'core' : 'cores'}
                    </p>
                    <p className='text-sm font-medium'>Memory: {memoryGb} GB</p>
                  </div>
                  <div className='space-y-1'>
                    <p className='text-xs tracking-wider text-muted-foreground uppercase'>
                      Network
                    </p>
                    <p className='text-sm font-medium'>
                      Port: {containerPort || '80'}
                    </p>
                  </div>
                  {volumes.length > 0 && (
                    <div className='space-y-1'>
                      <p className='text-xs tracking-wider text-muted-foreground uppercase'>
                        Volumes
                      </p>
                      {volumes.map((vol, i) => (
                        <p
                          key={i}
                          className='flex items-center gap-1 text-sm font-medium'
                        >
                          <HardDrive className='h-3 w-3' />
                          {vol.path} ({vol.size} GB)
                        </p>
                      ))}
                    </div>
                  )}
                </div>

                <div className='flex items-baseline justify-between border-t pt-4'>
                  <span className='text-sm text-muted-foreground'>
                    Estimated Cost
                  </span>
                  <span className='text-lg font-bold'>
                    Rp {estimatedCost.toLocaleString('id-ID')}/month
                  </span>
                </div>

                <Button
                  size='lg'
                  className='w-full bg-black text-white hover:bg-black/90'
                >
                  <ChevronDown className='mr-2 h-4 w-4 rotate-[-90deg]' />
                  Deploy Container
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </Main>
    </>
  )
}
