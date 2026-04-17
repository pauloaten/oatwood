import type { Metadata } from 'next'
import './globals.css'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: { default: 'Woodcraft — Handcrafted Furniture', template: '%s | Woodcraft' },
  description: 'Small-batch hardwood furniture made by hand in our Yorkshire workshop.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="font-body text-bark bg-cream antialiased">
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-1.5 focus:left-1.5 focus:z-[999] focus:bg-bark focus:text-flax focus:px-3 focus:py-1.5 focus:rounded focus:text-sm">
          Skip to content
        </a>
        <Nav />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
