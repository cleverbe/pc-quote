import { useTranslation } from 'react-i18next'
import {
  ShoppingCart,
  Trash2,
  MonitorSmartphone,
  Minus,
  Plus,
  Percent,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { Product, LineItem } from '@/types'

interface Props {
  selectedList: LineItem[]
  subtotal: number
  discount: number
  finalTotal: number
  hasSelection: boolean
  getCategoryName: (id: string) => string
  onRemove: (product: Product) => void
  onUpdateQuantity: (product: Product, delta: number) => void
  onDiscountChange: (value: number) => void
  onGenerateQuote: () => void
}

export function SummarySidebar({
  selectedList,
  subtotal,
  discount,
  finalTotal,
  hasSelection,
  getCategoryName,
  onRemove,
  onUpdateQuantity,
  onDiscountChange,
  onGenerateQuote,
}: Props) {
  const { t } = useTranslation()
  const itemCount = selectedList.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <div className="w-full shrink-0 lg:w-80">
      <div className="bg-card border-border rounded-lg border lg:sticky lg:top-8">
        <div className="flex items-center gap-2 border-b px-4 py-3">
          <ShoppingCart className="text-muted-foreground size-4" />
          <span className="text-sm font-semibold">{t('build.summary')}</span>
          {hasSelection && (
            <span className="bg-accent/10 text-accent ml-auto rounded-md px-1.5 py-0.5 text-xs font-medium">
              {t('build.items', { count: itemCount })}
            </span>
          )}
        </div>

        <div className="p-4">
          {!hasSelection ? (
            <p className="text-muted-foreground py-6 text-center text-xs">
              {t('build.noComponents')}
            </p>
          ) : (
            <div className="space-y-3">
              <div className="space-y-1">
                {selectedList.map((item) => (
                  <div
                    key={item.product.id}
                    className="hover:bg-secondary flex items-center justify-between gap-2 rounded-md px-2 py-1.5 text-sm transition-colors"
                  >
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-medium">
                        {item.product.name}
                      </p>
                      <p className="text-muted-foreground truncate text-xs">
                        {getCategoryName(item.product.categoryId)}
                      </p>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="flex items-center gap-0.5">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation()
                            onUpdateQuantity(item.product, -1)
                          }}
                          className="text-muted-foreground hover:text-foreground flex size-5 items-center justify-center rounded transition-colors"
                        >
                          <Minus className="size-3" />
                        </button>
                        <span className="text-accent w-6 text-center text-xs font-semibold tabular-nums">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation()
                            onUpdateQuantity(item.product, 1)
                          }}
                          className="text-muted-foreground hover:text-foreground flex size-5 items-center justify-center rounded transition-colors"
                        >
                          <Plus className="size-3" />
                        </button>
                      </div>
                      <span className="text-accent w-16 shrink-0 text-right text-xs font-semibold tabular-nums">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </span>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation()
                          onRemove(item.product)
                        }}
                        className="text-muted-foreground hover:text-destructive ml-0.5 flex size-5 items-center justify-center rounded transition-colors"
                      >
                        <Trash2 className="size-3" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-2 border-t pt-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">
                    {t('build.subtotal')}
                  </span>
                  <span className="tabular-nums">${subtotal.toFixed(2)}</span>
                </div>

                <div className="flex items-center justify-between gap-2">
                  <span className="text-muted-foreground flex items-center gap-1 text-sm">
                    <Percent className="size-3" />
                    {t('build.discount')}
                  </span>
                  <div className="flex items-center gap-1">
                    <input
                      type="number"
                      min={0}
                      max={100}
                      value={discount}
                      onChange={(e) =>
                        onDiscountChange(
                          Math.min(
                            100,
                            Math.max(0, Number(e.target.value) || 0),
                          ),
                        )
                      }
                      className="bg-secondary focus:ring-accent h-7 w-14 rounded border-none px-1.5 text-right text-xs tabular-nums focus:ring-1 focus:outline-none"
                    />
                    <span className="text-xs">%</span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm font-semibold">
                  <span>{t('build.total')}</span>
                  <span className="text-accent tabular-nums">
                    ${finalTotal.toFixed(2)}
                  </span>
                </div>
              </div>

              <Button className="w-full" size="sm" onClick={onGenerateQuote}>
                <MonitorSmartphone className="size-4" />
                {t('build.generateQuote')}
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
