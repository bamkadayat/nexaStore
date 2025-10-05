import Link from 'next/link'
import { Bell, User, Settings, LogOut } from 'lucide-react'

export function AdminHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link href="/admin" className="flex items-center space-x-2">
          <span className="text-2xl font-bold text-primary">NexaStore</span>
          <span className="text-sm font-semibold text-destructive">Admin</span>
        </Link>

        {/* Actions */}
        <div className="flex items-center space-x-4">
          <button className="p-2 hover:bg-accent rounded-md relative">
            <Bell className="h-5 w-5" />
            <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-destructive"></span>
          </button>
          <Link href="/admin/settings" className="p-2 hover:bg-accent rounded-md">
            <Settings className="h-5 w-5" />
          </Link>
          <Link href="/profile" className="p-2 hover:bg-accent rounded-md">
            <User className="h-5 w-5" />
          </Link>
          <button className="p-2 hover:bg-accent rounded-md text-destructive">
            <LogOut className="h-5 w-5" />
          </button>
        </div>
      </div>
    </header>
  )
}
