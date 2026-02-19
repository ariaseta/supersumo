import { SearchIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useSearch } from '@/context/search-provider'

type SearchProps = {
  className?: string
  type?: React.HTMLInputTypeAttribute
  placeholder?: string
}

export function Search({
  className = '',
  placeholder = 'Search',
}: SearchProps) {
  const { setOpen } = useSearch()
  return (
    <div
      className={cn(
        'flex h-9 w-full max-w-sm cursor-pointer items-center justify-between rounded-full border bg-background px-3 text-sm text-muted-foreground shadow-sm hover:bg-accent/50',
        className
      )}
      onClick={() => setOpen(true)}
    >
      <div className='flex items-center gap-2'>
        <SearchIcon size={16} className='text-muted-foreground' />
        <span>{placeholder}</span>
      </div>
      <kbd className='pointer-events-none hidden h-5 items-center gap-1 rounded bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 select-none sm:flex'>
        <span className='text-xs'>⌘</span>K
      </kbd>
    </div>
  )
}
