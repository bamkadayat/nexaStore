import { apiClient } from './client'
import { Product } from '@/types'

export const productApi = {
  getAll: async (params?: {
    page?: number
    limit?: number
    category?: string
    search?: string
  }) => {
    const { data } = await apiClient.get<{ products: Product[]; total: number }>(
      '/api/products',
      { params }
    )
    return data
  },

  getBySlug: async (slug: string) => {
    const { data } = await apiClient.get<Product>(`/api/products/${slug}`)
    return data
  },

  create: async (product: Partial<Product>) => {
    const { data } = await apiClient.post<Product>('/api/products', product)
    return data
  },

  update: async (id: string, product: Partial<Product>) => {
    const { data } = await apiClient.put<Product>(`/api/products/${id}`, product)
    return data
  },

  delete: async (id: string) => {
    await apiClient.delete(`/api/products/${id}`)
  },
}
