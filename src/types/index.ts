export interface Category {
  id: string
  name: string
  description: string
  createdAt: string
}

export interface Product {
  id: string
  name: string
  description: string
  price: number
  categoryId: string
  createdAt: string
  state: boolean
}

export interface LineItem {
  product: Product
  quantity: number
}

export interface SavedQuote {
  id: string
  clientName: string
  clientPhone: string
  createdAt: string
  items: LineItem[]
  subtotal: number
  discount: number
  finalTotal: number
}
