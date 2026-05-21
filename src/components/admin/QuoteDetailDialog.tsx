import { useState, useRef } from 'react'
import html2canvas from 'html2canvas-pro'
import { Pencil, Download } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
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
  open: boolean
  quote: SavedQuote | null
  getCategoryName: (id: string) => string
  onOpenChange: (open: boolean) => void
  onUpdateQuote: (
    id: string,
    data: Partial<Pick<SavedQuote, 'clientName' | 'clientPhone'>>,
  ) => void
}

export function QuoteDetailDialog({
  open,
  quote,
  getCategoryName,
  onOpenChange,
  onUpdateQuote,
}: Props) {
  const [editingName, setEditingName] = useState(quote?.clientName ?? '')
  const [editingPhone, setEditingPhone] = useState(quote?.clientPhone ?? '')
  const quoteRef = useRef<HTMLDivElement>(null)

  function handleUpdateClient() {
    if (!quote) return
    if (!editingName.trim() || !editingPhone.trim()) return
    onUpdateQuote(quote.id, {
      clientName: editingName.trim(),
      clientPhone: editingPhone.trim(),
    })
    toast.success('Client info updated')
  }

  async function downloadQuote() {
    const el = quoteRef.current
    if (!el) return
    try {
      const canvas = await html2canvas(el, {
        scale: 3,
        backgroundColor: '#ffffff',
        scrollX: 0,
        scrollY: 0,
        windowWidth: document.body.scrollWidth,
      })
      const url = canvas.toDataURL('image/png')
      const link = document.createElement('a')
      link.download = `pc-quote-${quote?.clientName ?? 'quote'}.png`
      link.href = url
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    } catch (err) {
      console.error('[downloadQuote] FAILED:', err)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle>Quote Details</DialogTitle>
        </DialogHeader>

        {quote && (
          <div className="space-y-4">
            <div className="bg-secondary/50 flex items-end gap-3 rounded-lg px-4 py-3 text-sm">
              <div className="flex-1">
                <span className="text-muted-foreground mb-1 block text-xs">
                  Client *
                </span>
                <input
                  type="text"
                  value={editingName}
                  onChange={(e) => setEditingName(e.target.value)}
                  className="bg-card focus:ring-accent h-8 w-full rounded-md border-none px-2 text-sm focus:ring-1 focus:outline-none"
                />
              </div>
              <div className="flex-1">
                <span className="text-muted-foreground mb-1 block text-xs">
                  Phone *
                </span>
                <input
                  type="text"
                  value={editingPhone}
                  onChange={(e) => setEditingPhone(e.target.value)}
                  className="bg-card focus:ring-accent h-8 w-full rounded-md border-none px-2 text-sm focus:ring-1 focus:outline-none"
                />
              </div>
              <div>
                <span className="text-muted-foreground mb-1 block text-xs">
                  Date
                </span>
                <p className="py-1.5 text-sm tabular-nums">
                  {new Date(quote.createdAt).toLocaleDateString()}
                </p>
              </div>
              <Button
                variant="default"
                size="sm"
                onClick={handleUpdateClient}
                disabled={!editingName.trim() || !editingPhone.trim()}
                className="h-8"
              >
                <Pencil className="size-3.5" />
                Update
              </Button>
            </div>

            <div
              ref={quoteRef}
              className="space-y-5 rounded-lg bg-white p-6 text-black"
            >
              <div className="text-center">
                <h2 className="text-xl font-bold tracking-tight">PC Quote</h2>
                <p className="mt-0.5 text-sm text-gray-500">
                  Client: {quote.clientName}
                </p>
                <p className="text-xs text-gray-400">
                  {new Date(quote.createdAt).toLocaleDateString()}
                </p>
              </div>

              <div className="border-border overflow-hidden rounded-lg border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-black">Component</TableHead>
                      <TableHead className="text-black">Category</TableHead>
                      <TableHead className="text-right text-black">
                        Qty
                      </TableHead>
                      <TableHead className="text-right text-black">
                        Price
                      </TableHead>
                      <TableHead className="text-right text-black">
                        Subtotal
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {quote.items.map((item) => (
                      <TableRow key={item.product.id}>
                        <TableCell className="font-medium text-black">
                          {item.product.name}
                        </TableCell>
                        <TableCell className="text-gray-500">
                          {getCategoryName(item.product.categoryId)}
                        </TableCell>
                        <TableCell className="text-right text-black tabular-nums">
                          {item.quantity}
                        </TableCell>
                        <TableCell className="text-right text-black tabular-nums">
                          ${item.product.price.toFixed(2)}
                        </TableCell>
                        <TableCell className="text-right text-black tabular-nums">
                          ${(item.product.price * item.quantity).toFixed(2)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              <div className="space-y-1.5 border-t pt-3 text-sm text-black">
                <div className="flex items-center justify-between">
                  <span>Subtotal</span>
                  <span className="tabular-nums">
                    ${quote.subtotal.toFixed(2)}
                  </span>
                </div>
                {quote.discount > 0 && (
                  <div className="flex items-center justify-between text-gray-500">
                    <span>Discount ({quote.discount}%)</span>
                    <span className="tabular-nums">
                      -$
                      {(quote.subtotal * (quote.discount / 100)).toFixed(2)}
                    </span>
                  </div>
                )}
                <div className="flex items-center justify-between text-base font-semibold">
                  <span>Total</span>
                  <span className="tabular-nums">
                    ${quote.finalTotal.toFixed(2)}
                  </span>
                </div>
              </div>

              <p className="text-center text-xs text-gray-400">
                This quote is valid for 30 days.
              </p>
            </div>

            <div className="flex justify-end">
              <Button size="sm" onClick={downloadQuote}>
                <Download className="size-4" />
                Download Image
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
