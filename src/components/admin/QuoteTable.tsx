import { useState } from 'react'
import { Trash2, Eye, FileText } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { SearchInput } from '@/components/ui/search-input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import type { SavedQuote } from '@/types'

interface Props {
  savedQuotes: SavedQuote[]
  onView: (quoteId: string) => void
  onDelete: (quoteId: string) => void
}

export function QuoteTable({ savedQuotes, onView, onDelete }: Props) {
  const [search, setSearch] = useState('')

  const query = search.toLowerCase().trim()

  const filtered = query
    ? savedQuotes.filter(
        (q) =>
          q.clientName.toLowerCase().includes(query) ||
          q.clientPhone.includes(query),
      )
    : savedQuotes

  return (
    <div className="bg-card border-border rounded-lg border">
      <div className="border-b px-4 py-3">
        <SearchInput
          placeholder="Search by client name or phone…"
          value={search}
          onChange={setSearch}
        />
      </div>

      {filtered.length === 0 ? (
        <div className="flex flex-col items-center gap-3 py-16 text-center">
          <FileText className="text-muted-foreground size-10" />
          <p className="text-muted-foreground text-sm">
            {query ? 'No quotes match your search.' : 'No saved quotes yet.'}
          </p>
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Client</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Items</TableHead>
              <TableHead className="text-right">Total</TableHead>
              <TableHead className="w-24 text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((quote) => (
              <TableRow key={quote.id}>
                <TableCell className="font-medium">
                  {quote.clientName}
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {quote.clientPhone}
                </TableCell>
                <TableCell className="text-muted-foreground tabular-nums">
                  {new Date(quote.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  {quote.items.reduce((s, i) => s + i.quantity, 0)} units
                </TableCell>
                <TableCell className="text-right font-medium tabular-nums">
                  ${quote.finalTotal.toFixed(2)}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onView(quote.id)}
                      className="h-7 w-7 p-0"
                    >
                      <Eye className="size-3.5" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onDelete(quote.id)}
                      className="text-destructive hover:text-destructive h-7 w-7 p-0"
                    >
                      <Trash2 className="size-3.5" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  )
}
