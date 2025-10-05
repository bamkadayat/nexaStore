import { CustomerHeader } from '@/components/layouts/customer-header'
import { CustomerSidebar } from '@/components/layouts/customer-sidebar'

export default function CustomerLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <CustomerHeader />
      <div className="flex flex-1">
        <CustomerSidebar />
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  )
}
