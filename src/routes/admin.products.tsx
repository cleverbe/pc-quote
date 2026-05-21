import { useState, useMemo, useRef } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'
import { Plus, Upload } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { SearchInput } from '@/components/ui/search-input'
import { Pagination } from '@/components/ui/pagination'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useStore } from '@/hooks/use-store'
import { ProductFormDialog } from '@/components/admin/ProductFormDialog'
import { ProductTable } from '@/components/admin/ProductTable'
import type { Product } from '@/types'

export const Route = createFileRoute('/admin/products')({
  component: ProductsPage,
})

const PAGE_SIZE = 10

function ProductsPage() {
  const { t } = useTranslation()
  const {
    products,
    categories,
    addProduct,
    addCategory,
    updateProduct,
    deleteProduct,
    getCategoryName,
  } = useStore()
  const [open, setOpen] = useState(false)
  const [editing, setEditing] = useState<Product | null>(null)
  const [search, setSearch] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [page, setPage] = useState(1)
  const fileRef = useRef<HTMLInputElement>(null)

  async function handleImport(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    const buf = await file.arrayBuffer()
    const { read, utils } = await import('xlsx')
    const wb = read(buf, { type: 'array' })
    const ws = wb.Sheets[wb.SheetNames[0]]
    const rows: Record<string, string>[] = utils.sheet_to_json(ws)
    let imported = 0
    let skipped = 0
    for (const row of rows) {
      const name = (row['Name'] ?? '').toString().trim()
      const desc = (row['Description'] ?? '').toString().trim()
      const price = Number.parseFloat(String(row['Price'] ?? ''))
      const catName = (row['Category'] ?? '').toString().trim()
      const stateStr = (row['State'] ?? '').toString().trim().toLowerCase()
      if (!name || Number.isNaN(price) || price <= 0 || !catName) {
        skipped++
        continue
      }
      let catId = categories.find(
        (c) => c.name.toLowerCase() === catName.toLowerCase(),
      )?.id
      if (!catId) catId = addCategory(catName, '')
      const state = stateStr === '' || stateStr === 'true' || stateStr === '1'
      addProduct(name, desc, price, catId, state)
      imported++
    }
    toast.success(t('admin.products.importToast', { imported, skipped }))
    e.target.value = ''
  }

  const query = search.toLowerCase().trim()

  const filtered = useMemo(
    () =>
      products.filter((p) => {
        if (query && !p.name.toLowerCase().includes(query)) return false
        if (categoryFilter !== 'all' && p.categoryId !== categoryFilter)
          return false
        return true
      }),
    [products, query, categoryFilter],
  )

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const safePage = Math.min(page, totalPages)
  const paginated = filtered.slice(
    (safePage - 1) * PAGE_SIZE,
    safePage * PAGE_SIZE,
  )

  function handleSearch(value: string) {
    setSearch(value)
    setPage(1)
  }

  function handleCategoryFilter(value: string) {
    setCategoryFilter(value)
    setPage(1)
  }

  function handleSave(
    name: string,
    description: string,
    price: number,
    categoryId: string,
    state: boolean,
  ) {
    if (editing) {
      updateProduct(editing.id, name, description, price, categoryId, state)
      toast.success(t('admin.products.updatedToast'))
    } else {
      addProduct(name, description, price, categoryId, state)
      toast.success(t('admin.products.createdToast'))
    }
    setOpen(false)
    setEditing(null)
  }

  function handleDelete(id: string) {
    const product = products.find((p) => p.id === id)
    deleteProduct(id)
    toast.success(
      t('admin.products.deletedToast', { name: product?.name ?? '' }),
    )
  }

  function openDialog(product: Product | null) {
    setEditing(product)
    setOpen(true)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">{t('admin.products.title')}</h1>
        <div className="flex gap-2">
          <div className="group relative">
            <Button variant="outline" onClick={() => fileRef.current?.click()}>
              <Upload className="size-4" />
              {t('admin.products.importExcel')}
            </Button>
            <div className="bg-popover text-popover-foreground pointer-events-none absolute top-full right-0 z-50 mt-2 min-w-56 rounded-md border px-3 py-2 text-xs opacity-0 shadow-sm transition-opacity group-hover:opacity-100">
              <p className="mb-1 font-medium">Columnas:</p>
              <ul className="text-muted-foreground list-inside list-disc leading-relaxed">
                <li>Name</li>
                <li>Description</li>
                <li>Price</li>
                <li>Category</li>
                <li>State</li>
              </ul>
              <p className="mt-1.5 mb-0.5 font-medium">Ejemplo:</p>
              <p className="text-muted-foreground leading-relaxed whitespace-nowrap">
                Core i5-13400, 10 cores 3.5GHz,
                <br />
                319.99, Procesadores, true
              </p>
            </div>
          </div>
          <input
            ref={fileRef}
            type="file"
            accept=".xlsx,.xls"
            className="hidden"
            onChange={handleImport}
          />
          <Button onClick={() => openDialog(null)}>
            <Plus className="size-4" />
            {t('admin.products.addProduct')}
          </Button>
        </div>
      </div>

      <div className="flex gap-3">
        <div className="flex-1">
          <SearchInput
            value={search}
            onChange={handleSearch}
            placeholder={t('admin.products.searchPlaceholder')}
          />
        </div>
        <Select value={categoryFilter} onValueChange={handleCategoryFilter}>
          <SelectTrigger className="w-44">
            <SelectValue placeholder={t('admin.products.allCategories')} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">
              {t('admin.products.allCategories')}
            </SelectItem>
            {categories.map((cat) => (
              <SelectItem key={cat.id} value={cat.id}>
                {cat.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {filtered.length === 0 ? (
        <p className="text-muted-foreground py-8 text-center text-sm">
          {query || categoryFilter !== 'all'
            ? t('admin.products.noSearchResults')
            : t('admin.products.noProducts')}
        </p>
      ) : (
        <>
          <ProductTable
            products={paginated}
            getCategoryName={getCategoryName}
            onEdit={(product) => openDialog(product)}
            onDelete={handleDelete}
          />
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        </>
      )}

      <ProductFormDialog
        open={open}
        editing={editing}
        categories={categories}
        onOpenChange={(v) => {
          setOpen(v)
          if (!v) setEditing(null)
        }}
        onSave={handleSave}
      />
    </div>
  )
}
