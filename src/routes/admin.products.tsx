import { useState, useMemo } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'
import { Plus } from 'lucide-react'
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
    updateProduct,
    deleteProduct,
    getCategoryName,
  } = useStore()
  const [open, setOpen] = useState(false)
  const [editing, setEditing] = useState<Product | null>(null)
  const [search, setSearch] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [page, setPage] = useState(1)

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
        <Button onClick={() => openDialog(null)}>
          <Plus className="size-4" />
          {t('admin.products.addProduct')}
        </Button>
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
