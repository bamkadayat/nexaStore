export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

export const ITEMS_PER_PAGE = 12

export const ROAST_LEVELS = [
  { value: 'LIGHT', label: 'Light Roast' },
  { value: 'MEDIUM_LIGHT', label: 'Medium-Light Roast' },
  { value: 'MEDIUM', label: 'Medium Roast' },
  { value: 'MEDIUM_DARK', label: 'Medium-Dark Roast' },
  { value: 'DARK', label: 'Dark Roast' },
]

export const PRODUCT_TYPES = [
  { value: 'COFFEE_BEANS', label: 'Coffee Beans' },
  { value: 'BREWING_EQUIPMENT', label: 'Brewing Equipment' },
  { value: 'ACCESSORIES', label: 'Accessories' },
  { value: 'MERCHANDISE', label: 'Merchandise' },
]

export const ORDER_STATUS = [
  { value: 'PENDING', label: 'Pending' },
  { value: 'PAID', label: 'Paid' },
  { value: 'PROCESSING', label: 'Processing' },
  { value: 'SHIPPED', label: 'Shipped' },
  { value: 'DELIVERED', label: 'Delivered' },
  { value: 'CANCELLED', label: 'Cancelled' },
  { value: 'REFUNDED', label: 'Refunded' },
]
