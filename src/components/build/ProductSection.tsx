import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
  ChevronDown,
  ChevronRight,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ProductCard } from './ProductCard'
import type { Category, Product, LineItem } from '@/types'

type SortField = 'name' | 'price'
type SortDir = 'asc' | 'desc'

const accents = [
  'border-sky-500 bg-sky-50/50',
  'border-emerald-500 bg-emerald-50/50',
  'border-violet-500 bg-violet-50/50',
  'border-amber-500 bg-amber-50/50',
  'border-rose-500 bg-rose-50/50',
  'border-cyan-500 bg-cyan-50/50',
  'border-lime-500 bg-lime-50/50',
  'border-pink-500 bg-pink-50/50',
  'border-indigo-500 bg-indigo-50/50',
  'border-teal-500 bg-teal-50/50',
] as const

interface Props {
  category: Category
  products: Product[]
  selectedList: LineItem[]
  collapsed: boolean
  hasQuery: boolean
  colorIndex: number
  onToggleCollapse: (catId: string) => void
  onToggleProduct: (product: Product) => void
  onUpdateQuantity: (product: Product, delta: number) => void
}

function getSorted(products: Product[], field: SortField, dir: SortDir) {
  return [...products].sort((a, b) => {
    const cmp =
      field === 'name' ? a.name.localeCompare(b.name) : a.price - b.price
    return dir === 'asc' ? cmp : -cmp
  })
}

export function ProductSection({
  category,
  products,
  selectedList,
  collapsed,
  hasQuery,
  colorIndex,
  onToggleCollapse,
  onToggleProduct,
  onUpdateQuantity,
}: Props) {
  const { t } = useTranslation()
  const [sortField, setSortField] = useState<SortField>('name')
  const [sortDir, setSortDir] = useState<SortDir>('asc')

  const sortLabel: Record<SortField, string> = {
    name: t('build.sortName'),
    price: t('build.sortPrice'),
  }

  const selectedMap = new Map(
    selectedList.map((item) => [item.product.id, item]),
  )
  const color = accents[colorIndex % accents.length]
  const sorted = getSorted(products, sortField, sortDir)

  const totalSelected = selectedList
    .filter((item) => item.product.categoryId === category.id)
    .reduce((sum, item) => sum + item.quantity, 0)

  function toggleSort(field: SortField) {
    if (sortField === field) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'))
    } else {
      setSortField(field)
      setSortDir('asc')
    }
  }

  if (products.length === 0 && !hasQuery) return null
  if (products.length === 0 && hasQuery) {
    return (
      <section key={category.id} className="opacity-40 transition-opacity">
        <div className="flex items-center gap-2 py-2">
          <Badge variant="outline" className="text-muted-foreground">
            {category.name}
          </Badge>
          <span className="text-muted-foreground text-xs">
            {t('build.noMatches')}
          </span>
        </div>
      </section>
    )
  }

  function SortIcon({ field }: { field: SortField }) {
    if (sortField !== field) return <ArrowUpDown className="size-3" />
    return sortDir === 'asc' ? (
      <ArrowUp className="size-3" />
    ) : (
      <ArrowDown className="size-3" />
    )
  }

  return (
    <section key={category.id} className={`rounded-lg border-l-4 ${color}`}>
      <div className="flex flex-wrap items-center gap-2 px-4 py-3">
        <button
          type="button"
          onClick={() => onToggleCollapse(category.id)}
          className="hover:text-foreground/80 flex items-center gap-2 text-left font-semibold"
        >
          {collapsed ? (
            <ChevronRight className="size-4" />
          ) : (
            <ChevronDown className="size-4" />
          )}
          {category.name}
        </button>
        <Badge variant="secondary" className="ml-1">
          {products.length}
        </Badge>
        {totalSelected > 0 && (
          <Badge
            variant="default"
            className="bg-primary/10 text-primary hover:bg-primary/15"
          >
            {t('build.selected', { count: totalSelected })}
          </Badge>
        )}

        <div className="ml-auto flex w-full items-center justify-end gap-1 sm:ml-auto sm:w-auto">
          {(['name', 'price'] as const).map((field) => (
            <Button
              key={field}
              variant="ghost"
              size="sm"
              onClick={() => toggleSort(field)}
              className={`h-7 gap-1 px-2 text-xs ${sortField === field ? 'text-foreground' : 'text-muted-foreground'}`}
            >
              <SortIcon field={field} />
              {sortLabel[field]}
            </Button>
          ))}
        </div>
      </div>

      {!collapsed && (
        <div className="p-4">
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {sorted.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                quantity={selectedMap.get(product.id)?.quantity ?? 0}
                onToggle={onToggleProduct}
                onUpdateQuantity={onUpdateQuantity}
              />
            ))}
          </div>
        </div>
      )}
    </section>
  )
}
