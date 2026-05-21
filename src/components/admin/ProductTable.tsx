import { Pencil, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import type { Product } from '@/types'
import { useState } from 'react'

interface Props {
  products: Product[]
  getCategoryName: (id: string) => string
  onEdit: (product: Product) => void
  onDelete: (id: string) => void
}

export function ProductTable({
  products,
  getCategoryName,
  onEdit,
  onDelete,
}: Props) {
  const [confirmId, setConfirmId] = useState<string | null>(null)

  return (
    <div className="bg-card border-border rounded-lg border">
      <div className="border-border border-b px-5 py-3">
        <h3 className="text-sm font-semibold">All Products</h3>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Description</TableHead>
            <TableHead className="w-24">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id}>
              <TableCell className="font-medium">{product.name}</TableCell>
              <TableCell>
                <Badge variant="secondary" className="font-normal">
                  {getCategoryName(product.categoryId)}
                </Badge>
              </TableCell>
              <TableCell className="tabular-nums">
                ${product.price.toFixed(2)}
              </TableCell>
              <TableCell className="text-muted-foreground max-w-xs truncate">
                {product.description || '—'}
              </TableCell>
              <TableCell>
                <div className="flex gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onEdit(product)}
                  >
                    <Pencil className="size-3.5" />
                  </Button>
                  {confirmId === product.id ? (
                    <Button
                      variant="destructive"
                      size="icon"
                      onClick={() => {
                        onDelete(product.id)
                        setConfirmId(null)
                      }}
                    >
                      <Trash2 className="size-3.5" />
                    </Button>
                  ) : (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setConfirmId(product.id)}
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
