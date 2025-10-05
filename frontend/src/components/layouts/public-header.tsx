import Link from 'next/link'
import Image from 'next/image'
import { publicNavigation } from '@/config/navigation'
import { ShoppingCart, User, Search } from 'lucide-react'

export function PublicHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 flex h-16 items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2 h-16">
          <Image src="/images/logos/nexa-store-logo.png" alt="NexaStore" width={100} height={64} style={{objectFit: 'contain'}} />
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {publicNavigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center space-x-4">
          <button className="p-2 hover:bg-accent rounded-md">
            <Search className="h-5 w-5" />
          </button>
          <Link href="/cart" className="p-2 hover:bg-accent rounded-md relative">
            <ShoppingCart className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
              0
            </span>
          </Link>
          <Link href="/login" className="p-2 hover:bg-accent rounded-md">
            <User className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </header>
  )
}
