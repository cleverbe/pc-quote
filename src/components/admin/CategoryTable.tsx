import { Pencil, Trash2 } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import type { Category } from '@/types'
import { useState } from 'react'

interface Props {
  categories: Category[]
  onEdit: (cat: Category) => void
  onDelete: (id: string) => void
}

export function CategoryTable({ categories, onEdit, onDelete }: Props) {
  const { t } = useTranslation()
  const [confirmId, setConfirmId] = useState<string | null>(null)

  return (
    <div className="bg-card border-border rounded-lg border">
      <div className="border-border border-b px-5 py-3">
        <h3 className="text-sm font-semibold">
          {t('admin.categories.tableTitle')}
        </h3>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>{t('admin.categories.name')}</TableHead>
            <TableHead>{t('admin.categories.description')}</TableHead>
            <TableHead className="w-24">
              {t('admin.categories.actions')}
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {categories.map((cat) => (
            <TableRow key={cat.id}>
              <TableCell className="font-medium">{cat.name}</TableCell>
              <TableCell className="text-muted-foreground">
                {cat.description || '—'}
              </TableCell>
              <TableCell>
                <div className="flex gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onEdit(cat)}
                  >
                    <Pencil className="size-3.5" />
                  </Button>
                  {confirmId === cat.id ? (
                    <Button
                      variant="destructive"
                      size="icon"
                      onClick={() => {
                        onDelete(cat.id)
                        setConfirmId(null)
                      }}
                    >
                      <Trash2 className="size-3.5" />
                    </Button>
                  ) : (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setConfirmId(cat.id)}
                      onBlur={() => setConfirmId(null)}
                    >
                      <Trash2 className="size-3.5" />
                    </Button>
                  )}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
