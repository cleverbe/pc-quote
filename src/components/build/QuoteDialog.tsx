import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Download, Save, Printer } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { printQuote } from '@/lib/print-quote'
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
import type { LineItem } from '@/types'

interface Props {
  open: boolean
  onOpenChange: (open: boolean) => void
  quoteRef: React.RefObject<HTMLDivElement | null>
  selectedList: LineItem[]
  subtotal: number
  discount: number
  finalTotal: number
  getCategoryName: (id: string) => string
  onDownload: () => void
  onSaveQuote: (clientName: string, clientPhone: string) => void
}

export function QuoteDialog({
  open,
  onOpenChange,
  quoteRef,
  selectedList,
  subtotal,
  discount,
  finalTotal,
  getCategoryName,
  onDownload,
  onSaveQuote,
}: Props) {
  const { t } = useTranslation()
  const [clientName, setClientName] = useState('')
  const [clientPhone, setClientPhone] = useState('')

  const discountAmount = subtotal * (discount / 100)
  const canSave = clientName.trim().length > 0 && clientPhone.trim().length > 0

  function handlePrint() {
    printQuote({
      items: selectedList,
      clientName: clientName.trim() || 'N/A',
      clientDate: new Date().toLocaleDateString(),
      subtotal,
      discount,
      finalTotal,
      getCategoryName,
    })
  }

  function handleSave() {
    if (!canSave) return
    onSaveQuote(clientName.trim(), clientPhone.trim())
    setClientName('')
    setClientPhone('')
    onOpenChange(false)
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(val) => {
        if (!val) {
          setClientName('')
          setClientPhone('')
        }
        onOpenChange(val)
      }}
    >
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{t('build.quoteTitle')}</DialogTitle>
        </DialogHeader>

        <div
          ref={quoteRef}
          className="space-y-5 rounded-lg bg-white p-6 text-black"
        >
          <div className="text-center">
            <h2 className="text-xl font-bold tracking-tight">
              {t('build.quoteTitle')}
            </h2>
            <p className="mt-0.5 text-sm text-gray-500">
              {t('build.quoteSubtitle')}
            </p>
            <p className="text-xs text-gray-400">
              {new Date().toLocaleDateString()}
            </p>
          </div>

          <div className="border-border overflow-hidden rounded-lg border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-black">
                    {t('build.component')}
                  </TableHead>
                  <TableHead className="text-black">
                    {t('build.category')}
                  </TableHead>
                  <TableHead className="text-right text-black">
                    {t('build.qty')}
                  </TableHead>
                  <TableHead className="text-right text-black">
                    {t('build.unitPrice')}
                  </TableHead>
                  <TableHead className="text-right text-black">
                    {t('build.subtotal')}
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {selectedList.map((item) => (
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

          <div className="border-border space-y-1.5 border-t pt-3 text-sm text-black">
            <div className="flex items-center justify-between">
              <span>{t('build.quoteSubtotal')}</span>
              <span className="tabular-nums">${subtotal.toFixed(2)}</span>
            </div>
            {discount > 0 && (
              <div className="flex items-center justify-between text-gray-500">
                <span>{t('build.quoteDiscount', { pct: discount })}</span>
                <span className="tabular-nums">
                  -${discountAmount.toFixed(2)}
                </span>
              </div>
            )}
            <div className="flex items-center justify-between text-base font-semibold">
              <span>{t('build.quoteTotal')}</span>
              <span className="tabular-nums">${finalTotal.toFixed(2)}</span>
            </div>
          </div>

          <p className="text-center text-xs text-gray-400">
            {t('build.validPeriod')}
          </p>
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="flex-1">
              <label className="text-muted-foreground mb-1 block text-xs font-medium">
                {t('build.clientName')}
              </label>
              <input
                type="text"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                placeholder={t('build.clientNamePlaceholder')}
                className="bg-secondary focus:ring-accent h-8 w-full rounded-md border-none px-2.5 text-sm focus:ring-1 focus:outline-none"
              />
            </div>
            <div className="flex-1">
              <label className="text-muted-foreground mb-1 block text-xs font-medium">
                {t('build.clientPhone')}
              </label>
              <input
                type="text"
                value={clientPhone}
                onChange={(e) => setClientPhone(e.target.value)}
                placeholder={t('build.clientPhonePlaceholder')}
                className="bg-secondary focus:ring-accent h-8 w-full rounded-md border-none px-2.5 text-sm focus:ring-1 focus:outline-none"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <Button variant="outline" size="sm" onClick={handlePrint}>
              <Printer className="size-4" />
              {t('common.print')}
            </Button>
            <Button size="sm" onClick={onDownload}>
              <Download className="size-4" />
              {t('common.downloadImage')}
            </Button>
            <Button size="sm" onClick={handleSave} disabled={!canSave}>
              <Save className="size-4" />
              {t('build.saveQuote')}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
