import { Product } from './product'

export interface Cart {
  id: string
  userId: string
  items: CartItem[]
  createdAt: Date
  updatedAt: Date
}

export interface CartItem {
  id: string
  cartId: string
  productId: string
  product: Product
  quantity: number
  grindPreference?: string
  createdAt: Date
  updatedAt: Date
}
