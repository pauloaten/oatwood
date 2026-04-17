'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import CartButton from './CartButton'
import CartDrawer from './CartDrawer'

const NAV_LINKS = [
  { href: '/',        label: 'Home'    },
  { href: '/shop',    label: 'Shop'    },
  { href: '/journal', label: 'Journal' },
  { href: '/about',   label: 'About'   },
  { href: '/contact', label: 'Contact' },
]

export default function Nav() {
  const pathname  = usePathname()
  const [open,     setOpen]     = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  useEffect(() => { setOpen(false) }, [pathname])

  return (
    <>
      <header
        className="sticky top-0 z-40 border-b border-bark/10 transition-shadow duration-200"
        style={{ background: '#FDFAF5', boxShadow: scrolled ? '0 2px 20px rgba(44,26,14,0.08)' : 'none' }}
      >
        <div className="max-w-site mx-auto px-6 flex items-center justify-between gap-6 py-4">
          <Link href="/" style={{ textDecoration: 'none' }}>
            <p className="font-display font-bold leading-none" style={{ fontSize: '1.5rem', color: '#2C1A0E' }}>
              Wood<span style={{ color: '#A0622A' }}>craft</span>
            </p>
            <p className="font-ui" style={{ fontSize: '0.65rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#6B3F1F', marginTop: '2px' }}>
              Handcrafted furniture
            </p>
          </Link>

          <nav className="hidden md:flex items-center gap-1" aria-label="Primary">
            {NAV_LINKS.map(({ href, label }) => {
              const active = href === '/' ? pathname === '/' : pathname.startsWith(href)
              return (
                <Link
                  key={href}
                  href={href}
                  style={{
                    fontFamily: 'var(--font-dm-sans), system-ui, sans-serif',
                    fontSize: '0.875rem',
                    fontWeight: 500,
                    padding: '0.4rem 0.875rem',
                    borderRadius: '4px',
                    background: active ? '#E8D5B0' : 'transparent',
                    color: active ? '#6B3F1F' : '#2C1A0E',
                    textDecoration: 'none',
                    transition: 'all 0.15s',
                  }}
                >
                  {label}
                </Link>
              )
            })}
          </nav>

          <div className="flex items-center gap-1">
            <Link href="/search" aria-label="Search" style={{ width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 4, color: '#2C1A0E' }}>
              <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.75">
                <circle cx="8.5" cy="8.5" r="5.5"/><path d="m15 15 3 3"/>
              </svg>
            </Link>
            <CartButton />
            <button
              className="md:hidden"
              style={{ width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 4, color: '#2C1A0E', background: 'none', border: 'none', cursor: 'pointer' }}
              onClick={() => setOpen(o => !o)}
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
            >
              {open ? (
                <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.75"><path d="M4 4l12 12M16 4L4 16"/></svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.75"><path d="M3 5h14M3 10h14M3 15h14"/></svg>
              )}
            </button>
          </div>
        </div>

        {open && (
          <div className="md:hidden" style={{ borderTop: '1px solid rgba(44,26,14,0.1)', background: '#FDFAF5', padding: '1rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
            {NAV_LINKS.map(({ href, label }) => (
              <Link key={href} href={href} style={{ fontFamily: 'var(--font-dm-sans)', fontSize: '0.875rem', fontWeight: 500, padding: '0.625rem 0.75rem', borderRadius: 4, color: '#2C1A0E', textDecoration: 'none' }}>
                {label}
              </Link>
            ))}
          </div>
        )}
      </header>
      <CartDrawer />
    </>
  )
}
