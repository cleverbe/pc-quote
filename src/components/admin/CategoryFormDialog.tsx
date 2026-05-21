import { useState } from 'react'
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
  const [name, setName] = useState(editing?.name ?? '')
  const [desc, setDesc] = useState(editing?.description ?? '')

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="cat-name">Name</Label>
        <Input
          id="cat-name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g. Processors"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="cat-desc">Description</Label>
        <Textarea
          id="cat-desc"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          placeholder="Category description"
        />
      </div>
      <div className="flex justify-end gap-2">
        <DialogClose asChild>
          <Button variant="outline" type="button">
            Cancel
          </Button>
        </DialogClose>
        <Button onClick={() => onSave(name, desc)}>Save</Button>
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
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {editing ? 'Edit Category' : 'New Category'}
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
