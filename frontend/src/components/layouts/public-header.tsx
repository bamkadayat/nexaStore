"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { publicNavigation } from "@/config/navigation";
import { ShoppingCart, User, Search, X } from "lucide-react";

type PublicHeaderProps = {
  cartCount?: number;
};

export function PublicHeader({ cartCount = 0 }: PublicHeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const panelRef = useRef<HTMLDivElement | null>(null);

  // Close menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Lock body scroll when the menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      const { overflowY } = document.documentElement.style;
      document.documentElement.style.overflowY = "hidden";
      return () => {
        document.documentElement.style.overflowY = overflowY;
      };
    }
  }, [mobileMenuOpen]);

  // Focus the first focusable element when menu opens
  useEffect(() => {
    if (!mobileMenuOpen || !panelRef.current) return;
    const focusables = panelRef.current.querySelectorAll<HTMLElement>(
      'a, button, [tabindex]:not([tabindex="-1"])'
    );
    focusables[0]?.focus();
  }, [mobileMenuOpen]);

  // Simple focus trap + Escape to close
  const onKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (!mobileMenuOpen || !panelRef.current) return;

      if (e.key === "Escape") {
        e.preventDefault();
        setMobileMenuOpen(false);
        return;
      }
      if (e.key === "Tab") {
        const focusables = Array.from(
          panelRef.current.querySelectorAll<HTMLElement>(
            'a, button, [tabindex]:not([tabindex="-1"])'
          )
        ).filter((el) => !el.hasAttribute("disabled"));

        if (focusables.length === 0) return;

        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    },
    [mobileMenuOpen]
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      {/* Safe-area + container */}
      <div className="container mx-auto px-4 flex h-14 md:h-16 items-center justify-between pb-[env(safe-area-inset-bottom)]">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center h-10 md:h-12 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 rounded-lg"
          aria-label="Go to homepage"
        >
          <span className="text-2xl font-bold tracking-wider">
            <span className="text-light font-extrabold">NEXA</span>
            <span className="text-coffee-cream font-extrabold">STORE</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-2 lg:gap-4">
          {publicNavigation.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`px-3 py-2 text-base font-semibold rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60
                  hover:text-primary ${
                    active ? "text-primary" : "text-white"
                  }`}
                aria-current={active ? "page" : undefined}
              >
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-1 md:gap-2">
          <button
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg hover:bg-accent transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
            aria-label="Search"
          >
            <Search className="h-5 w-5" aria-hidden="true" />
          </button>

          <Link
            href="/cart"
            className="relative inline-flex h-10 w-10 items-center justify-center rounded-lg hover:bg-accent transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
            aria-label="Cart"
          >
            <ShoppingCart className="h-5 w-5" aria-hidden="true" />
            {cartCount > 0 && (
              <span
                className="absolute -top-1.5 -right-1.5 min-w-[1.25rem] h-5 rounded-full bg-primary px-1.5 text-[11px] leading-5 text-primary-foreground text-center"
                aria-live="polite"
              >
                {cartCount}
              </span>
            )}
          </Link>

          <Link
            href="/login"
            className="hidden sm:inline-flex h-10 w-10 items-center justify-center rounded-lg hover:bg-accent transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
            aria-label="Account"
          >
            <User className="h-5 w-5" aria-hidden="true" />
          </Link>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-lg hover:bg-accent transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
            onClick={() => setMobileMenuOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu-panel"
          >
            <div className="w-5 h-4 flex flex-col justify-center gap-1.5">
              <span
                className={`block h-0.5 w-full bg-current transition-all duration-300 ${
                  mobileMenuOpen ? "rotate-45 translate-y-1" : ""
                }`}
              />
              <span
                className={`block h-0.5 w-full bg-current transition-all duration-300 ${
                  mobileMenuOpen ? "-rotate-45 -translate-y-1" : ""
                }`}
              />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Overlay + Panel (dialog-like) */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <div
            className="md:hidden fixed inset-0 z-50"
            role="dialog"
            aria-modal="true"
            onKeyDown={onKeyDown}
          >
            {/* Backdrop */}
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 bg-black/50"
              aria-label="Close menu"
              onClick={() => setMobileMenuOpen(false)}
            />

            {/* Panel */}
            <motion.div
              id="mobile-menu-panel"
              ref={panelRef}
              initial={{ y: "-100%" }}
              animate={{ y: 0 }}
              exit={{ y: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="absolute left-0 right-0 top-0 pt-[env(safe-area-inset-top)] bg-[#1f1513] border-b shadow-lg focus:outline-none min-h-screen h-[100dvh] max-h-[100svh] overflow-y-auto"
            >
            <div className="container mx-auto px-4 flex items-center justify-between h-14">
              <span className="sr-only">Mobile Navigation</span>
              <Link
                href="/"
                className="flex items-center h-10 md:h-12 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 rounded-lg"
                aria-label="Go to homepage"
              >
               <span className="text-2xl font-bold tracking-wider">
            <span className="text-light font-extrabold">NEXA</span>
            <span className="text-coffee-cream font-extrabold">STORE</span>
          </span>
              </Link>
              <button
                className="inline-flex h-10 w-10 items-center justify-center rounded-lg hover:bg-accent transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close menu"
              >
                <div className="w-5 h-4 flex flex-col justify-center gap-1.5">
                  <span className="block h-0.5 w-full bg-current transition-all duration-300 rotate-45 translate-y-1" />
                  <span className="block h-0.5 w-full bg-current transition-all duration-300 -rotate-45 -translate-y-1" />
                </div>
              </button>
            </div>

            <nav className="container mx-auto px-4 pb-4 pt-2 space-y-1" aria-label="Primary">
              {publicNavigation.map((item, index) => {
                const active = pathname === item.href;
                return (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.3 }}
                  >
                    <Link
                      href={item.href}
                      className={`block rounded-lg px-3 py-3 text-base font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60
                        hover:bg-accent ${
                          active ? "text-primary" : "text-white"
                        }`}
                      onClick={() => setMobileMenuOpen(false)}
                      aria-current={active ? "page" : undefined}
                    >
                      {item.name}
                    </Link>
                  </motion.div>
                );
              })}

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.3 }}
                className="h-px bg-border my-2"
              />

              <div className="space-y-2">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4, duration: 0.4, ease: "easeOut" }}
                >
                  <Link
                    href="/cart"
                    className="flex w-full items-center justify-center rounded-lg border px-4 py-3 text-base font-medium hover:bg-accent transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 relative"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <ShoppingCart className="mr-2 h-5 w-5" aria-hidden="true" />
                    Cart
                    {cartCount > 0 && (
                      <span className="ml-2 min-w-[1.25rem] h-5 rounded-full bg-primary px-1.5 text-[11px] leading-5 text-primary-foreground">
                        {cartCount}
                      </span>
                    )}
                  </Link>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5, duration: 0.4, ease: "easeOut" }}
                >
                  <Link
                    href="/login"
                    className="flex w-full items-center justify-center rounded-lg border px-4 py-3 text-base font-medium hover:bg-accent transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <User className="mr-2 h-5 w-5" aria-hidden="true" />
                    Login
                  </Link>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6, duration: 0.4, ease: "easeOut" }}
                >
                  <button
                    className="flex w-full items-center justify-center rounded-lg border px-4 py-3 text-base font-medium hover:bg-accent transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Search className="mr-2 h-5 w-5" aria-hidden="true" />
                    Search
                  </button>
                </motion.div>
              </div>

              <div className="pb-[env(safe-area-inset-bottom)]" />
            </nav>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </header>
  );
}
