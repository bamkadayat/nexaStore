import Link from "next/link";

export function PublicFooter() {
  return (
    <footer className="w-full border-t bg-background">
      <div className="container mx-auto px-4 py-12">
        <div className="w-full grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4 text-left">
            <h3 className="text-lg font-bold text-primary text-left">NexaStore</h3>
            <p className="text-sm text-muted-foreground">
              Premium coffee beans and brewing equipment for coffee enthusiasts.
            </p>
          </div>

          {/* Shop */}
          <div className="space-y-4 items-start text-left flex flex-col">
            <h4 className="font-semibold text-left">Shop</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/products"
                  className="text-muted-foreground hover:text-foreground"
                >
                  All Products
                </Link>
              </li>
              <li>
                <Link
                  href="/categories"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Categories
                </Link>
              </li>
              <li>
                <Link
                  href="/products?featured=true"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Featured
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-4 items-start text-left flex flex-col">
            <h4 className="font-semibold text-left">Company</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/about"
                  className="text-muted-foreground hover:text-foreground"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div className="space-y-4 md:col-start-4 items-start text-left flex flex-col">
            <h4 className="font-semibold text-left">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/privacy"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>
            &copy; {new Date().getFullYear()} NexaStore. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
