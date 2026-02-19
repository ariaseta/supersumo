import { Wallet, FileText, Ticket, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { PageHeader } from '@/components/layout/page-header'
import { Notifications } from '@/components/notifications'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { BillingOverview } from './components/billing-overview'
import { InvoiceList } from './components/invoice-list'
import { TransactionList } from './components/transaction-list'

export function Billing() {
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
          title='Billing'
          description='Manage your balance and view transaction history'
          className='mb-2'
          actions={
            <>
              <Button variant='outline' className='flex-1 sm:flex-none'>
                <Ticket className='mr-2 h-4 w-4' />
                Redeem
              </Button>
              <Button className='flex-1 sm:flex-none'>
                <Plus className='mr-2 h-4 w-4' />
                Topup
              </Button>
            </>
          }
        />

        <div className='space-y-6'>
          <BillingOverview />
          <Tabs defaultValue='transactions' className='mt-3 w-full'>
            <div className='overflow-x-auto'>
              <TabsList className='w-max min-w-full sm:w-auto'>
                <TabsTrigger value='transactions'>
                  <Wallet className='mr-2 h-4 w-4' />
                  Transactions
                </TabsTrigger>
                <TabsTrigger value='payments'>
                  <FileText className='mr-2 h-4 w-4' />
                  Payments
                </TabsTrigger>
              </TabsList>
            </div>
            <TabsContent value='transactions' className='mt-3'>
              <TransactionList />
            </TabsContent>
            <TabsContent value='payments' className='mt-3'>
              <InvoiceList />
            </TabsContent>
          </Tabs>
        </div>
      </Main>
    </>
  )
}
