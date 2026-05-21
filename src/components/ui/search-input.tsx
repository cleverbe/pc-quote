import { Search } from 'lucide-react'
import { Input } from '@/components/ui/input'

interface Props {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

export function SearchInput({ value, onChange, placeholder }: Props) {
  return (
    <div className="relative">
      <Search className="text-muted-foreground absolute top-1/2 left-3 size-3.5 -translate-y-1/2" />
      <Input
        className="h-8 pl-8 text-xs"
        placeholder={placeholder ?? 'Search...'}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  )
}
