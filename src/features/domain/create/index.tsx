import { useState } from 'react'
import {
  Search,
  CheckCircle2,
  XCircle,
  Globe,
  ShoppingCart,
  ChevronRight,
  CreditCard,
  Loader2,
  ArrowLeft,
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
import { Search as SearchComp } from '@/components/search'

type Step = 'search' | 'checkout'

interface DomainResult {
  tld: string
  available: boolean
  price: number
  tag?: string
}

const tldPrices: Record<string, number> = {
  '.com': 150000,
  '.net': 120000,
  '.org': 130000,
  '.id': 200000,
  '.co.id': 180000,
  '.io': 450000,
  '.dev': 280000,
  '.app': 320000,
}

function generateResults(name: string): DomainResult[] {
  if (!name) return []
  const hash = name.split('').reduce((a, c) => a + c.charCodeAt(0), 0)
  return Object.entries(tldPrices).map(([tld, price], i) => ({
    tld,
    available: (hash + i) % 3 !== 0,
    price,
    tag:
      tld === '.com'
        ? 'Popular'
        : tld === '.id' || tld === '.co.id'
          ? 'Local'
          : tld === '.io'
            ? 'Tech'
            : undefined,
  }))
}

export function CreateDomain() {
  const [query, setQuery] = useState('')
  const [inputValue, setInputValue] = useState('')
  const [searching, setSearching] = useState(false)
  const [results, setResults] = useState<DomainResult[]>([])
  const [selected, setSelected] = useState<DomainResult | null>(null)
  const [step, setStep] = useState<Step>('search')
  const [years, setYears] = useState(1)

  const handleSearch = () => {
    if (!inputValue.trim()) return
    const name = inputValue.replace(/\..+$/, '').trim().toLowerCase()
    setSearching(true)
    setQuery(name)
    setSelected(null)
    setTimeout(() => {
      setResults(generateResults(name))
      setSearching(false)
    }, 900)
  }

  const handleSelect = (domain: DomainResult) => {
    if (!domain.available) return
    setSelected(domain)
  }

  const handleCheckout = () => {
    if (!selected) return
    setStep('checkout')
  }

  const totalCost = selected ? selected.price * years : 0
  const fullDomain = selected ? `${query}${selected.tld}` : ''

  return (
    <>
      <Header fixed>
        <SearchComp />
        <div className='ms-auto flex items-center gap-4'>
          <Notifications />
          <ProfileDropdown />
        </div>
      </Header>
      <Main className='gap-4'>
        <PageHeader
          title='Register Domain'
          description='Search and register a new domain for your project'
          backButton={{ to: '/domain', label: '' }}
          className='mb-2'
        />

        {step === 'search' && (
          <div className='space-y-6'>
            {/* Search */}
            <Card>
              <CardHeader className='pb-2'>
                <CardTitle className='flex items-center gap-2 text-lg font-semibold'>
                  <Globe className='h-5 w-5' />
                  Find Your Domain
                </CardTitle>
                <CardDescription>
                  Enter the domain name you want to register.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className='flex gap-2'>
                  <div className='relative flex-1'>
                    <Search className='absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground' />
                    <Input
                      placeholder='yourdomain'
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                      className='pl-10 text-base'
                    />
                  </div>
                  <Button
                    onClick={handleSearch}
                    disabled={searching || !inputValue.trim()}
                  >
                    {searching ? (
                      <Loader2 className='h-4 w-4 animate-spin' />
                    ) : (
                      'Search'
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Results */}
            {results.length > 0 && (
              <div className='grid gap-6 lg:grid-cols-3'>
                <div className='space-y-3 lg:col-span-2'>
                  <h2 className='text-sm font-semibold tracking-wider text-muted-foreground uppercase'>
                    Results for &quot;{query}&quot;
                  </h2>
                  {results.map((r) => (
                    <div
                      key={r.tld}
                      onClick={() => handleSelect(r)}
                      className={`flex cursor-pointer items-center justify-between rounded-lg border-2 p-4 transition-all ${
                        !r.available
                          ? 'cursor-not-allowed border-border opacity-50'
                          : selected?.tld === r.tld
                            ? 'border-slate-700 bg-slate-700/5'
                            : 'border-border hover:border-slate-400'
                      }`}
                    >
                      <div className='flex items-center gap-3'>
                        {r.available ? (
                          <CheckCircle2 className='h-5 w-5 text-green-500' />
                        ) : (
                          <XCircle className='h-5 w-5 text-red-400' />
                        )}
                        <div>
                          <div className='flex items-center gap-2'>
                            <span className='font-semibold'>
                              {query}
                              {r.tld}
                            </span>
                            {r.tag && (
                              <Badge variant='secondary' className='text-xs'>
                                {r.tag}
                              </Badge>
                            )}
                          </div>
                          <p className='text-xs text-muted-foreground'>
                            {r.available ? 'Available' : 'Not available'}
                          </p>
                        </div>
                      </div>
                      <div className='text-right'>
                        {r.available ? (
                          <>
                            <p className='font-bold'>
                              Rp {r.price.toLocaleString('id-ID')}
                            </p>
                            <p className='text-xs text-muted-foreground'>
                              /year
                            </p>
                          </>
                        ) : (
                          <p className='text-sm text-muted-foreground'>
                            Unavailable
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Cart */}
                <div>
                  <Card className='lg:sticky lg:top-24'>
                    <CardHeader>
                      <CardTitle className='flex items-center gap-2 text-lg'>
                        <ShoppingCart className='h-5 w-5' />
                        Cart
                      </CardTitle>
                    </CardHeader>
                    <CardContent className='space-y-4'>
                      {selected ? (
                        <>
                          <div className='rounded-lg border p-3'>
                            <p className='font-semibold'>
                              {query}
                              {selected.tld}
                            </p>
                            <div className='mt-2 flex items-center justify-between text-sm'>
                              <span className='text-muted-foreground'>
                                Registration
                              </span>
                              <span className='font-medium'>
                                Rp {selected.price.toLocaleString('id-ID')}/year
                              </span>
                            </div>
                          </div>

                          <div className='space-y-2'>
                            <Label>Registration Period</Label>
                            <div className='flex gap-2'>
                              {[1, 2, 3, 5].map((y) => (
                                <button
                                  key={y}
                                  onClick={() => setYears(y)}
                                  className={`flex-1 rounded-md border px-2 py-1.5 text-sm font-medium transition-all ${
                                    years === y
                                      ? 'border-slate-700 bg-slate-700 text-white'
                                      : 'border-border hover:border-slate-400'
                                  }`}
                                >
                                  {y}yr
                                </button>
                              ))}
                            </div>
                          </div>

                          <Separator />

                          <div className='flex items-baseline justify-between'>
                            <span className='font-bold'>Total</span>
                            <span className='text-lg font-bold'>
                              Rp {totalCost.toLocaleString('id-ID')}
                            </span>
                          </div>
                          <p className='text-right text-xs text-muted-foreground'>
                            For {years} year{years > 1 ? 's' : ''}
                          </p>

                          <Button
                            className='w-full gap-2 bg-black text-white hover:bg-black/90'
                            onClick={handleCheckout}
                          >
                            Continue to Checkout
                            <ChevronRight className='h-4 w-4' />
                          </Button>
                        </>
                      ) : (
                        <p className='text-sm text-muted-foreground'>
                          Select an available domain to continue.
                        </p>
                      )}
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}
          </div>
        )}

        {step === 'checkout' && selected && (
          <div className='grid gap-6 lg:grid-cols-3'>
            <div className='space-y-6 lg:col-span-2'>
              <div>
                <Button
                  variant='ghost'
                  size='sm'
                  className='mb-4 -ml-1 gap-1'
                  onClick={() => setStep('search')}
                >
                  <ArrowLeft className='h-4 w-4' />
                  Back to search
                </Button>
              </div>

              {/* Contact Info */}
              <Card>
                <CardHeader className='pb-2'>
                  <CardTitle className='text-lg font-semibold'>
                    Registrant Information
                  </CardTitle>
                  <CardDescription>
                    This information will be used for domain registration
                    (WHOIS).
                  </CardDescription>
                </CardHeader>
                <CardContent className='space-y-4'>
                  <div className='grid gap-4 sm:grid-cols-2'>
                    <div className='space-y-2'>
                      <Label>
                        First Name <span className='text-red-500'>*</span>
                      </Label>
                      <Input placeholder='John' />
                    </div>
                    <div className='space-y-2'>
                      <Label>
                        Last Name <span className='text-red-500'>*</span>
                      </Label>
                      <Input placeholder='Doe' />
                    </div>
                    <div className='space-y-2'>
                      <Label>
                        Email <span className='text-red-500'>*</span>
                      </Label>
                      <Input type='email' placeholder='john@example.com' />
                    </div>
                    <div className='space-y-2'>
                      <Label>Phone</Label>
                      <Input placeholder='+62 812 3456 7890' />
                    </div>
                    <div className='space-y-2 sm:col-span-2'>
                      <Label>Address</Label>
                      <Input placeholder='Jl. Example No. 1' />
                    </div>
                    <div className='space-y-2'>
                      <Label>City</Label>
                      <Input placeholder='Jakarta' />
                    </div>
                    <div className='space-y-2'>
                      <Label>Country</Label>
                      <Input placeholder='Indonesia' />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Payment Method */}
              <Card>
                <CardHeader className='pb-2'>
                  <CardTitle className='flex items-center gap-2 text-lg font-semibold'>
                    <CreditCard className='h-5 w-5' />
                    Payment Method
                  </CardTitle>
                </CardHeader>
                <CardContent className='space-y-4'>
                  <div className='grid gap-3 sm:grid-cols-3'>
                    {['Credit / Debit Card', 'Bank Transfer', 'QRIS'].map(
                      (method, i) => (
                        <button
                          key={method}
                          className={`flex flex-col items-center gap-2 rounded-lg border-2 p-3 text-center text-sm font-medium transition-all hover:border-slate-400 ${
                            i === 0
                              ? 'border-slate-700 bg-slate-700/5'
                              : 'border-border'
                          }`}
                        >
                          <CreditCard className='h-5 w-5' />
                          {method}
                        </button>
                      )
                    )}
                  </div>

                  <Separator />

                  <div className='space-y-4'>
                    <div className='space-y-2'>
                      <Label>Card Number</Label>
                      <Input placeholder='4242 4242 4242 4242' />
                    </div>
                    <div className='grid gap-4 sm:grid-cols-3'>
                      <div className='space-y-2 sm:col-span-2'>
                        <Label>Expiration Date</Label>
                        <Input placeholder='MM / YY' />
                      </div>
                      <div className='space-y-2'>
                        <Label>CVV</Label>
                        <Input placeholder='123' />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Order Summary */}
            <div>
              <Card className='lg:sticky lg:top-24'>
                <CardHeader>
                  <CardTitle className='text-lg'>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className='space-y-5'>
                  <div>
                    <p className='text-xs font-medium tracking-wider text-muted-foreground uppercase'>
                      Domain
                    </p>
                    <p className='mt-1 text-lg font-bold'>{fullDomain}</p>
                  </div>

                  <Separator />

                  <div className='space-y-2 text-sm'>
                    <div className='flex justify-between'>
                      <span className='text-muted-foreground'>
                        Registration ({years}yr)
                      </span>
                      <span className='font-medium'>
                        Rp {(selected.price * years).toLocaleString('id-ID')}
                      </span>
                    </div>
                    <div className='flex justify-between'>
                      <span className='text-muted-foreground'>Tax (11%)</span>
                      <span className='font-medium'>
                        Rp{' '}
                        {Math.round(
                          selected.price * years * 0.11
                        ).toLocaleString('id-ID')}
                      </span>
                    </div>
                  </div>

                  <Separator />

                  <div className='flex items-baseline justify-between font-bold'>
                    <span>Total</span>
                    <span className='text-lg'>
                      Rp{' '}
                      {Math.round(selected.price * years * 1.11).toLocaleString(
                        'id-ID'
                      )}
                    </span>
                  </div>

                  <Button className='w-full gap-2 bg-black text-white hover:bg-black/90'>
                    <CreditCard className='h-4 w-4' />
                    Complete Purchase
                  </Button>

                  <p className='text-center text-xs text-muted-foreground'>
                    By purchasing, you agree to our Terms of Service. Your
                    domain will be registered immediately after payment.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </Main>
    </>
  )
}
