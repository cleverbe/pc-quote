import { useState, useCallback, useMemo, useRef } from 'react'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import html2canvas from 'html2canvas-pro'
import { toast } from 'sonner'
import { useStore } from '@/hooks/use-store'
import { BuildFilters } from '@/components/build/BuildFilters'
import { ProductSection } from '@/components/build/ProductSection'
import { SummarySidebar } from '@/components/build/SummarySidebar'
import { QuoteDialog } from '@/components/build/QuoteDialog'
import type { Product, LineItem } from '@/types'

export const Route = createFileRoute('/build')({
  component: BuildPage,
})

function BuildPage() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { categories, products, getCategoryName, saveQuote } = useStore()
  const [selected, setSelected] = useState<Map<string, LineItem>>(new Map())
  const [search, setSearch] = useState('')
  const [collapsed, setCollapsed] = useState<Set<string>>(new Set())
  const [discount, setDiscount] = useState(0)
  const [quoteOpen, setQuoteOpen] = useState(false)
  const quoteRef = useRef<HTMLDivElement>(null)

  const toggleProduct = useCallback((product: Product) => {
    setSelected((prev) => {
      const next = new Map(prev)
      if (next.has(product.id)) {
        next.delete(product.id)
      } else {
        next.set(product.id, { product, quantity: 1 })
      }
      return next
    })
  }, [])

  const updateQuantity = useCallback((product: Product, delta: number) => {
    setSelected((prev) => {
      const item = prev.get(product.id)
      if (!item) return prev
      const next = new Map(prev)
      const qty = item.quantity + delta
      if (qty <= 0) {
        next.delete(product.id)
      } else {
        next.set(product.id, { ...item, quantity: qty })
      }
      return next
    })
  }, [])

  const total = useMemo(
    () =>
      Array.from(selected.values()).reduce(
        (sum, item) => sum + item.product.price * item.quantity,
        0,
      ),
    [selected],
  )

  const query = search.toLowerCase().trim()

  const nonEmptyCategories = useMemo(
    () =>
      categories.filter((cat) =>
        products.some((p) => p.categoryId === cat.id && p.state),
      ),
    [categories, products],
  )

  const matchesSearch = useCallback(
    (product: Product) =>
      !query ||
      product.name.toLowerCase().includes(query) ||
      product.description.toLowerCase().includes(query),
    [query],
  )

  const toggleCollapse = (catId: string) => {
    setCollapsed((prev) => {
      const next = new Set(prev)
      if (next.has(catId)) next.delete(catId)
      else next.add(catId)
      return next
    })
  }

  async function downloadQuote() {
    const el = quoteRef.current
    if (!el || selected.size === 0) return
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
      link.download = 'pc-quote.png'
      link.href = url
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    } catch (err) {
      console.error('[downloadQuote] FAILED:', err)
    }
  }

  function handleSaveQuote(clientName: string, clientPhone: string) {
    saveQuote({
      clientName,
      clientPhone,
      items: Array.from(selected.values()),
      subtotal: total,
      discount,
      finalTotal,
    })
    toast.success(t('build.quoteSaved'), {
      duration: 5000,
      action: {
        label: t('build.viewQuotes'),
        onClick: () => navigate({ to: '/admin/quotes' }),
      },
    })
  }

  const discountAmount = useMemo(
    () => total * (discount / 100),
    [total, discount],
  )
  const finalTotal = total - discountAmount
  const selectedList = Array.from(selected.values())

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            {t('build.title')}
          </h1>
          <p className="text-muted-foreground mt-1">{t('build.subtitle')}</p>
        </div>
      </div>

      <BuildFilters value={search} onChange={setSearch} />

      <div className="flex flex-col gap-8 lg:flex-row">
        <div className="flex-1 space-y-4">
          {nonEmptyCategories.length === 0 ? (
            <p className="text-muted-foreground">{t('build.noProducts')}</p>
          ) : (
            nonEmptyCategories.map((cat, i) => {
              const catProducts = products.filter(
                (p) => p.categoryId === cat.id && p.state && matchesSearch(p),
              )
              return (
                <ProductSection
                  key={cat.id}
                  category={cat}
                  products={catProducts}
                  selectedList={selectedList}
                  collapsed={collapsed.has(cat.id)}
                  hasQuery={!!query}
                  colorIndex={i}
                  onToggleCollapse={toggleCollapse}
                  onToggleProduct={toggleProduct}
                  onUpdateQuantity={updateQuantity}
                />
              )
            })
          )}
        </div>

        <SummarySidebar
          selectedList={selectedList}
          subtotal={total}
          discount={discount}
          finalTotal={finalTotal}
          hasSelection={selected.size > 0}
          getCategoryName={getCategoryName}
          onRemove={toggleProduct}
          onUpdateQuantity={updateQuantity}
          onDiscountChange={setDiscount}
          onGenerateQuote={() => setQuoteOpen(true)}
        />
      </div>

      <QuoteDialog
        open={quoteOpen}
        onOpenChange={setQuoteOpen}
        quoteRef={quoteRef}
        selectedList={selectedList}
        subtotal={total}
        discount={discount}
        finalTotal={finalTotal}
        getCategoryName={getCategoryName}
        onDownload={downloadQuote}
        onSaveQuote={handleSaveQuote}
      />
    </div>
  )
}
