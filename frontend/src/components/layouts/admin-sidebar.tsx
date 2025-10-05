'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { adminNavigation } from '@/config/navigation'
import { cn } from '@/lib/utils'

export function AdminSidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-64 border-r bg-background min-h-[calc(100vh-4rem)]">
      <nav className="p-4 space-y-2">
        {adminNavigation.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/')

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center px-4 py-2 rounded-md text-sm font-medium transition-colors',
                isActive
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:bg-accent hover:text-foreground'
              )}
            >
              {item.name}
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}
