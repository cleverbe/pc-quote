import { Minus, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { Product } from '@/types'

interface Props {
  product: Product
  quantity: number
  onToggle: (product: Product) => void
  onUpdateQuantity: (product: Product, delta: number) => void
}

export function ProductCard({
  product,
  quantity,
  onToggle,
  onUpdateQuantity,
}: Props) {
  return (
    <button
      type="button"
      onClick={() => onToggle(product)}
      className={`bg-card hover:bg-secondary border-border flex w-full flex-col items-start gap-2 rounded-lg border p-4 text-left text-sm transition-all ${
        quantity > 0 ? 'ring-accent ring-2' : ''
      }`}
    >
      <div className="flex w-full items-start justify-between gap-2">
        <span className="leading-tight font-medium">{product.name}</span>
        <span className="text-accent shrink-0 font-semibold tabular-nums">
          ${product.price.toFixed(2)}
        </span>
      </div>
      <p className="text-muted-foreground line-clamp-2 text-xs leading-relaxed">
        {product.description}
      </p>
      {quantity > 0 ? (
        <div className="mt-1 flex items-center gap-1">
          <Button
            variant="secondary"
            size="sm"
            onClick={(e) => {
              e.stopPropagation()
              onUpdateQuantity(product, -1)
            }}
            className="h-7 w-7 p-0"
          >
            <Minus className="size-3" />
          </Button>
          <span className="text-accent w-8 text-center text-xs font-semibold tabular-nums">
            {quantity}
          </span>
          <Button
            variant="secondary"
            size="sm"
            onClick={(e) => {
              e.stopPropagation()
              onUpdateQuantity(product, 1)
            }}
            className="h-7 w-7 p-0"
          >
            <Plus className="size-3" />
          </Button>
        </div>
      ) : (
        <span className="text-muted-foreground mt-0.5 text-xs">
          Click to select
        </span>
      )}
    </button>
  )
}
