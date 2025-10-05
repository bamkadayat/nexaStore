import { AdminHeader } from '@/components/layouts/admin-header'
import { AdminSidebar } from '@/components/layouts/admin-sidebar'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <AdminHeader />
      <div className="flex flex-1">
        <AdminSidebar />
        <main className="flex-1 p-6 bg-muted/40">{children}</main>
      </div>
    </div>
  )
}
