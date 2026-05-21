import { createContext } from 'react'
import type { Category, Product, SavedQuote } from '@/types'

export interface StoreContextValue {
  categories: Category[]
  products: Product[]
  savedQuotes: SavedQuote[]
  addCategory: (name: string, description: string) => void
  updateCategory: (id: string, name: string, description: string) => void
  deleteCategory: (id: string) => void
  addProduct: (
    name: string,
    description: string,
    price: number,
    categoryId: string,
    state?: boolean,
  ) => void
  updateProduct: (
    id: string,
    name: string,
    description: string,
    price: number,
    categoryId: string,
    state: boolean,
  ) => void
  deleteProduct: (id: string) => void
  getCategoryName: (id: string) => string
  getProductsByCategory: (categoryId: string) => Product[]
  saveQuote: (data: Omit<SavedQuote, 'id' | 'createdAt'>) => void
  updateQuote: (
    id: string,
    data: Partial<Pick<SavedQuote, 'clientName' | 'clientPhone'>>,
  ) => void
  deleteQuote: (id: string) => void
}

export const StoreContext = createContext<StoreContextValue | null>(null)
