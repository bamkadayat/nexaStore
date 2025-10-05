import Link from 'next/link'

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-muted/40">
      <div className="w-full max-w-md space-y-8 p-8">
        {/* Logo */}
        <div className="text-center">
          <Link href="/" className="inline-block">
            <span className="text-3xl font-bold text-primary">NexaStore</span>
          </Link>
        </div>

        {/* Auth Form */}
        <div className="bg-background p-8 rounded-lg shadow-md border">
          {children}
        </div>

        {/* Footer */}
        <p className="text-center text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} NexaStore. All rights reserved.
        </p>
      </div>
    </div>
  )
}
