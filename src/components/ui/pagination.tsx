import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface Props {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

export function Pagination({ currentPage, totalPages, onPageChange }: Props) {
  if (totalPages <= 1) return null

  const pages: number[] = []
  const start = Math.max(1, currentPage - 1)
  const end = Math.min(totalPages, currentPage + 1)
  for (let i = start; i <= end; i++) pages.push(i)

  return (
    <div className="flex items-center justify-between">
      <p className="text-muted-foreground text-xs">
        Page {currentPage} of {totalPages}
      </p>
      <div className="flex items-center gap-0.5">
        <Button
          variant="ghost"
          size="icon"
          disabled={currentPage <= 1}
          onClick={() => onPageChange(currentPage - 1)}
          className="size-7"
        >
          <ChevronLeft className="size-3.5" />
        </Button>
        {pages.map((p) => (
          <Button
            key={p}
            variant={p === currentPage ? 'default' : 'ghost'}
            size="icon"
            onClick={() => onPageChange(p)}
            className="size-7 text-xs"
          >
            {p}
          </Button>
        ))}
        <Button
          variant="ghost"
          size="icon"
          disabled={currentPage >= totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          className="size-7"
        >
          <ChevronRight className="size-3.5" />
        </Button>
      </div>
    </div>
  )
}
