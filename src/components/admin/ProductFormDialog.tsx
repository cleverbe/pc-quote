import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from '@/components/ui/dialog'
import type { Category, Product } from '@/types'

interface Props {
  open: boolean
  editing: Product | null
  categories: Category[]
  onOpenChange: (open: boolean) => void
  onSave: (
    name: string,
    description: string,
    price: number,
    categoryId: string,
    state: boolean,
  ) => void
}

function ProductForm({
  editing,
  categories,
  onSave,
}: {
  editing: Product | null
  categories: Category[]
  onSave: Props['onSave']
}) {
  const { t } = useTranslation()
  const [name, setName] = useState(editing?.name ?? '')
  const [desc, setDesc] = useState(editing?.description ?? '')
  const [price, setPrice] = useState(editing?.price.toString() ?? '')
  const [categoryId, setCategoryId] = useState(editing?.categoryId ?? '')
  const [state, setState] = useState(editing?.state ?? true)
  const [errors, setErrors] = useState<{
    name?: string
    categoryId?: string
    price?: string
  }>({})

  function handleSave() {
    const next: typeof errors = {}
    if (!name.trim()) next.name = t('admin.products.nameRequired')
    if (!categoryId) next.categoryId = t('admin.products.categoryRequired')
    const parsed = Number.parseFloat(price)
    if (!price || Number.isNaN(parsed) || parsed <= 0)
      next.price = t('admin.products.priceInvalid')
    setErrors(next)
    if (next.name || next.categoryId || next.price) return
    onSave(name.trim(), desc.trim(), parsed, categoryId, state)
  }

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="prod-name">{t('admin.products.nameLabel')}</Label>
        <Input
          id="prod-name"
          value={name}
          onChange={(e) => {
            setName(e.target.value)
            if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }))
          }}
          placeholder={t('admin.products.namePlaceholder')}
        />
        {errors.name && (
          <p className="text-destructive text-xs">{errors.name}</p>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="prod-category">
          {t('admin.products.categoryLabel')}
        </Label>
        <Select
          value={categoryId}
          onValueChange={(v) => {
            setCategoryId(v)
            if (errors.categoryId)
              setErrors((prev) => ({ ...prev, categoryId: undefined }))
          }}
        >
          <SelectTrigger id="prod-category">
            <SelectValue
              placeholder={t('admin.products.categoryPlaceholder')}
            />
          </SelectTrigger>
          <SelectContent>
            {categories.map((cat) => (
              <SelectItem key={cat.id} value={cat.id}>
                {cat.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.categoryId && (
          <p className="text-destructive text-xs">{errors.categoryId}</p>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="prod-price">{t('admin.products.priceLabel')}</Label>
        <Input
          id="prod-price"
          type="number"
          step="0.01"
          min="0"
          value={price}
          onChange={(e) => {
            setPrice(e.target.value)
            if (errors.price)
              setErrors((prev) => ({ ...prev, price: undefined }))
          }}
          placeholder={t('admin.products.pricePlaceholder')}
        />
        {errors.price && (
          <p className="text-destructive text-xs">{errors.price}</p>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="prod-desc">{t('admin.products.descLabel')}</Label>
        <Textarea
          id="prod-desc"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          placeholder={t('admin.products.descPlaceholder')}
        />
      </div>
      <div className="flex items-center justify-between">
        <Label>{t('admin.products.stateLabel')}</Label>
        <button
          type="button"
          role="switch"
          aria-checked={state}
          className={cn(
            'relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border transition-colors',
            state ? 'bg-primary border-primary' : 'bg-input border-border',
          )}
          onClick={() => setState(!state)}
        >
          <span
            className={cn(
              'inline-block size-5 rounded-full bg-white shadow-sm transition-transform',
              state ? 'translate-x-[22px]' : 'translate-x-px',
            )}
          />
        </button>
      </div>
      <div className="flex justify-end gap-2">
        <DialogClose asChild>
          <Button variant="outline" type="button">
            {t('common.cancel')}
          </Button>
        </DialogClose>
        <Button onClick={handleSave}>{t('common.save')}</Button>
      </div>
    </div>
  )
}

export function ProductFormDialog({
  open,
  editing,
  categories,
  onOpenChange,
  onSave,
}: Props) {
  const { t } = useTranslation()

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {editing
              ? t('admin.products.editTitle')
              : t('admin.products.newTitle')}
          </DialogTitle>
        </DialogHeader>
        <ProductForm
          key={editing?.id ?? '__new__'}
          editing={editing}
          categories={categories}
          onSave={onSave}
        />
      </DialogContent>
    </Dialog>
  )
}
