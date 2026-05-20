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
}
