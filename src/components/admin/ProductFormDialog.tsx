import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
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
  const [name, setName] = useState(editing?.name ?? '')
  const [desc, setDesc] = useState(editing?.description ?? '')
  const [price, setPrice] = useState(editing?.price.toString() ?? '')
  const [categoryId, setCategoryId] = useState(editing?.categoryId ?? '')

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="prod-name">Name</Label>
        <Input
          id="prod-name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g. Core i5-13400"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="prod-category">Category</Label>
        <Select value={categoryId} onValueChange={setCategoryId}>
          <SelectTrigger id="prod-category">
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((cat) => (
              <SelectItem key={cat.id} value={cat.id}>
                {cat.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="prod-price">Price ($)</Label>
        <Input
          id="prod-price"
          type="number"
          step="0.01"
          min="0"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="0.00"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="prod-desc">Description</Label>
        <Textarea
          id="prod-desc"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          placeholder="Product description"
        />
      </div>
      <div className="flex justify-end gap-2">
        <DialogClose asChild>
          <Button variant="outline" type="button">
            Cancel
          </Button>
        </DialogClose>
        <Button
          onClick={() =>
            onSave(name, desc, Number.parseFloat(price), categoryId)
          }
        >
          Save
        </Button>
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
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{editing ? 'Edit Product' : 'New Product'}</DialogTitle>
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
