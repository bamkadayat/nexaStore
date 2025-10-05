export interface User {
  id: string
  email: string
  name: string
  role: Role
  emailVerified: boolean
  isActive: boolean
  createdAt: Date
  updatedAt: Date
  lastLoginAt?: Date
}

export enum Role {
  USER = 'USER',
  ADMIN = 'ADMIN',
}
