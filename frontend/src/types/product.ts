export interface Product {
  id: string
  name: string
  slug: string
  description: string
  price: number
  comparePrice?: number
  sku?: string
  stock: number
  category: string
  brand?: string
  tags: string[]
  images: string[]
  thumbnail?: string
  isActive: boolean
  isFeatured: boolean

  // Coffee-specific fields
  coffeeOrigin?: string
  region?: string
  roastLevel?: RoastLevel
  roastDate?: Date
  processingMethod?: string
  flavorNotes?: string[]
  tastingNotes?: string
  altitude?: string
  varietals?: string[]
  harvestYear?: number
  certifications?: string[]
  farmName?: string
  farmerStory?: string
  acidityLevel?: number
  bodyLevel?: number
  sweetnessLevel?: number
  bestBrewMethods?: string[]
  grindSize?: string
  brewTemperature?: string
  brewRatio?: string
  productType: ProductType
  weight?: number

  // Equipment-specific
  material?: string
  capacity?: string
  compatibility?: string[]

  createdAt: Date
  updatedAt: Date
}

export enum RoastLevel {
  LIGHT = 'LIGHT',
  MEDIUM_LIGHT = 'MEDIUM_LIGHT',
  MEDIUM = 'MEDIUM',
  MEDIUM_DARK = 'MEDIUM_DARK',
  DARK = 'DARK',
}

export enum ProductType {
  COFFEE_BEANS = 'COFFEE_BEANS',
  BREWING_EQUIPMENT = 'BREWING_EQUIPMENT',
  ACCESSORIES = 'ACCESSORIES',
  MERCHANDISE = 'MERCHANDISE',
}
