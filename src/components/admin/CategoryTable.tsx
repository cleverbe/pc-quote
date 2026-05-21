import { Pencil, Trash2 } from 'lucide-react'
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
  const [confirmId, setConfirmId] = useState<string | null>(null)

  return (
    <div className="bg-card border-border rounded-lg border">
      <div className="border-border border-b px-5 py-3">
        <h3 className="text-sm font-semibold">All Categories</h3>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Description</TableHead>
            <TableHead className="w-24">Actions</TableHead>
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
