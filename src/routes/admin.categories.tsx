import { useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'
import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { SearchInput } from '@/components/ui/search-input'
import { Pagination } from '@/components/ui/pagination'
import { useStore } from '@/hooks/use-store'
import { CategoryFormDialog } from '@/components/admin/CategoryFormDialog'
import { CategoryTable } from '@/components/admin/CategoryTable'
import type { Category } from '@/types'

export const Route = createFileRoute('/admin/categories')({
  component: CategoriesPage,
})

const PAGE_SIZE = 10

function CategoriesPage() {
  const { t } = useTranslation()
  const { categories, addCategory, updateCategory, deleteCategory } = useStore()
  const [open, setOpen] = useState(false)
  const [editing, setEditing] = useState<Category | null>(null)
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)

  const query = search.toLowerCase().trim()
  const filtered = categories.filter(
    (cat) =>
      !query ||
      cat.name.toLowerCase().includes(query) ||
      cat.description.toLowerCase().includes(query),
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

  function handleSave(name: string, description: string) {
    if (editing) {
      updateCategory(editing.id, name, description)
      toast.success(t('admin.categories.updatedToast'))
    } else {
      addCategory(name, description)
      toast.success(t('admin.categories.createdToast'))
    }
    setOpen(false)
    setEditing(null)
  }

  function handleDelete(id: string) {
    const cat = categories.find((c) => c.id === id)
    deleteCategory(id)
    toast.success(t('admin.categories.deletedToast', { name: cat?.name ?? '' }))
  }

  function openDialog(cat: Category | null) {
    setEditing(cat)
    setOpen(true)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">{t('admin.categories.title')}</h1>
        <Button onClick={() => openDialog(null)}>
          <Plus className="size-4" />
          {t('admin.categories.addCategory')}
        </Button>
      </div>

      <SearchInput
        value={search}
        onChange={handleSearch}
        placeholder={t('admin.categories.searchPlaceholder')}
      />

      {filtered.length === 0 ? (
        <p className="text-muted-foreground py-8 text-center text-sm">
          {query
            ? t('admin.categories.noSearchResults')
            : t('admin.categories.noCategories')}
        </p>
      ) : (
        <>
          <CategoryTable
            categories={paginated}
            onEdit={(cat) => openDialog(cat)}
            onDelete={handleDelete}
          />
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        </>
      )}

      <CategoryFormDialog
        open={open}
        editing={editing}
        onOpenChange={(v) => {
          setOpen(v)
          if (!v) setEditing(null)
        }}
        onSave={handleSave}
      />
    </div>
  )
}
