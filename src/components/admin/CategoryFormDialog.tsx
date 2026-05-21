import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from '@/components/ui/dialog'
import type { Category } from '@/types'

interface Props {
  open: boolean
  editing: Category | null
  onOpenChange: (open: boolean) => void
  onSave: (name: string, description: string) => void
}

function CategoryForm({
  editing,
  onSave,
}: {
  editing: Category | null
  onSave: Props['onSave']
}) {
  const { t } = useTranslation()
  const [name, setName] = useState(editing?.name ?? '')
  const [desc, setDesc] = useState(editing?.description ?? '')
  const [errors, setErrors] = useState<{ name?: string }>({})

  function handleSave() {
    const next: { name?: string } = {}
    if (!name.trim()) next.name = t('admin.categories.nameRequired')
    setErrors(next)
    if (next.name) return
    onSave(name.trim(), desc.trim())
  }

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="cat-name">{t('admin.categories.nameLabel')}</Label>
        <Input
          id="cat-name"
          value={name}
          onChange={(e) => {
            setName(e.target.value)
            if (errors.name) setErrors({})
          }}
          placeholder={t('admin.categories.namePlaceholder')}
        />
        {errors.name && (
          <p className="text-destructive text-xs">{errors.name}</p>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="cat-desc">{t('admin.categories.descLabel')}</Label>
        <Textarea
          id="cat-desc"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          placeholder={t('admin.categories.descPlaceholder')}
        />
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

export function CategoryFormDialog({
  open,
  editing,
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
              ? t('admin.categories.editTitle')
              : t('admin.categories.newTitle')}
          </DialogTitle>
        </DialogHeader>
        <CategoryForm
          key={editing?.id ?? '__new__'}
          editing={editing}
          onSave={onSave}
        />
      </DialogContent>
    </Dialog>
  )
}
