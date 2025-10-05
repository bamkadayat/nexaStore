# NexaStore Frontend Structure

## Overview
This is a Next.js 15 App Router e-commerce application with separate layouts for public pages, authentication, customer dashboard, and admin dashboard.

## Folder Structure

```
frontend/
├── src/
│   ├── app/                          # Next.js App Router
│   │   ├── (public)/                 # Public routes (no auth)
│   │   │   ├── layout.tsx            # Public layout
│   │   │   ├── page.tsx              # Homepage
│   │   │   ├── products/
│   │   │   ├── categories/
│   │   │   ├── about/
│   │   │   └── contact/
│   │   │
│   │   ├── (auth)/                   # Auth routes
│   │   │   ├── layout.tsx            # Auth layout
│   │   │   ├── login/
│   │   │   ├── register/
│   │   │   └── forgot-password/
│   │   │
│   │   ├── (customer)/               # Customer dashboard
│   │   │   ├── layout.tsx            # Customer layout
│   │   │   ├── dashboard/
│   │   │   ├── orders/
│   │   │   ├── profile/
│   │   │   ├── addresses/
│   │   │   ├── wishlist/
│   │   │   └── settings/
│   │   │
│   │   ├── (admin)/                  # Admin dashboard
│   │   │   ├── layout.tsx            # Admin layout
│   │   │   └── admin/
│   │   │       ├── page.tsx          # Admin overview
│   │   │       ├── products/
│   │   │       ├── categories/
│   │   │       ├── orders/
│   │   │       ├── customers/
│   │   │       ├── reviews/
│   │   │       ├── subscriptions/
│   │   │       └── settings/
│   │   │
│   │   ├── cart/
│   │   ├── checkout/
│   │   ├── api/                      # API routes
│   │   ├── layout.tsx                # Root layout
│   │   ├── globals.css
│   │   ├── error.tsx
│   │   └── not-found.tsx
│   │
│   ├── components/
│   │   ├── ui/                       # shadcn/ui components
│   │   ├── layouts/                  # Layout components
│   │   ├── products/                 # Product-related components
│   │   ├── cart/                     # Cart components
│   │   ├── forms/                    # Form components
│   │   └── shared/                   # Shared components
│   │
│   ├── lib/
│   │   ├── api/                      # API client functions
│   │   │   ├── client.ts             # Axios instance
│   │   │   └── products.ts           # Product API
│   │   ├── utils/
│   │   │   ├── cn.ts                 # Tailwind merge
│   │   │   └── formatters.ts         # Formatters
│   │   ├── hooks/                    # Custom hooks
│   │   ├── auth/                     # Auth config
│   │   ├── db/                       # Database client
│   │   ├── utils.ts                  # Utils (from shadcn)
│   │   └── constants.ts              # App constants
│   │
│   ├── types/
│   │   ├── index.ts                  # Type exports
│   │   ├── product.ts
│   │   ├── user.ts
│   │   ├── cart.ts
│   │   └── order.ts
│   │
│   ├── store/                        # State management
│   │
│   ├── config/
│   │   ├── site.ts                   # Site config
│   │   └── navigation.ts             # Navigation config
│   │
│   └── middleware.ts                 # Auth & role-based routing
│
├── public/
│   ├── images/
│   │   ├── products/
│   │   ├── categories/
│   │   └── logos/
│   ├── icons/
│   └── fonts/
│
└── Configuration files
```

## Route Groups

### (public) - Public Routes
- No authentication required
- Includes homepage, products, categories, about, contact
- Uses public header and footer

### (auth) - Authentication Routes
- Login, register, forgot password
- Minimal layout without navigation

### (customer) - Customer Dashboard
- Requires authentication (USER or ADMIN role)
- Customer-specific sidebar and header
- Access to orders, profile, wishlist, etc.

### (admin) - Admin Dashboard
- Requires authentication with ADMIN role
- Admin-specific sidebar and header
- Full management capabilities

## Key Features

1. **Route Groups**: Organize routes with different layouts without affecting URLs
2. **Middleware**: Automatic role-based access control
3. **TypeScript**: Full type safety with shared types
4. **API Client**: Centralized axios instance with interceptors
5. **Path Aliases**: Clean imports using `@/*` aliases
6. **Scalable**: Easy to add new features and routes

## Getting Started

1. Install dependencies:
   ```bash
   pnpm install
   ```

2. Set up environment variables:
   ```bash
   cp .env.example .env.local
   ```

3. Run development server:
   ```bash
   pnpm dev
   ```

## Path Aliases

- `@/*` - Root src directory
- `@/components/*` - Components directory
- `@/lib/*` - Lib directory
- `@/types/*` - Types directory
- `@/store/*` - Store directory
- `@/config/*` - Config directory

## Next Steps

1. Create layout components for each route group
2. Implement authentication with NextAuth or custom solution
3. Build UI components using shadcn/ui
4. Connect to backend API
5. Implement state management (Zustand/Redux)
6. Add error boundaries and loading states
