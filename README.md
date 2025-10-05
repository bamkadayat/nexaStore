# NexaStore

A modern e-commerce platform built with Next.js, Node.js, and TypeScript.

## Features

- JWT authentication with refresh tokens
- Shopping cart with persistent storage
- Stripe payment integration
- Order history and tracking
- Product search and filters
- Responsive, mobile-first design
- Email notifications via SendGrid

## Tech Stack

**Frontend:** Next.js 14, TypeScript, Tailwind CSS, shadcn/ui, Zustand, React Query

**Backend:** Node.js, Express, TypeScript, Prisma, PostgreSQL, Stripe, SendGrid

**Infrastructure:** Google Cloud Run, Cloud SQL, Cloud Storage, GitHub Actions

## Getting Started

### Prerequisites

- Node.js 20+
- pnpm
- PostgreSQL

### Installation

```bash
# Clone repository
git clone https://github.com/yourusername/nexastore.git
cd nexastore

# Install dependencies
pnpm install
cd backend && pnpm install
cd ../frontend && pnpm install

# Setup backend
cd backend
cp .env.example .env
# Update DATABASE_URL in .env
pnpm prisma:migrate
pnpm prisma:seed

# Setup frontend
cd ../frontend
cp .env.local.example .env.local
# Update NEXT_PUBLIC_API_URL in .env.local
```

### Development

```bash
# Terminal 1: Backend
cd backend && pnpm dev

# Terminal 2: Frontend
cd frontend && pnpm dev
```

## Project Structure

```
nexastore/
├── frontend/
│   ├── app/
│   ├── components/
│   ├── lib/
│   └── store/
│
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── services/
│   │   └── server.ts
│   └── prisma/
│       └── schema.prisma
│
└── .github/workflows/
```