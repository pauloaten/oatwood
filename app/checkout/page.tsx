'use client'

import Link from 'next/link'
import { useCart } from '@/lib/cart'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

/**
 * Checkout page
 *
 * Without Shopify: shows an order summary and placeholder.
 * With Shopify: replace the body with a redirect to cart.checkoutUrl
 * from the Shopify Storefront API (see lib/shopify.ts).
 */
export default function CheckoutPage() {
  const { items, total, itemCount, clearCart } = useCart()
  const router = useRouter()

  useEffect(() => {
    if (items.length === 0) router.replace('/shop')
  }, [items.length, router])

  if (items.length === 0) return null

  return (
    <>
      <div style={{ background: '#E8D5B0', borderBottom: '1px solid rgba(44,26,14,0.1)', padding: '3rem 1.5rem' }}>
        <div className="max-w-site mx-auto">
          <span className="section-label">Almost there</span>
          <h1 className="font-display" style={{ fontSize: 'clamp(1.75rem, 3vw, 3rem)', fontWeight: 700, color: '#2C1A0E' }}>Checkout</h1>
        </div>
      </div>

      <div className="max-w-site mx-auto px-6 py-12" style={{ maxWidth: 680 }}>
        {/* Integration notice */}
        <div style={{ background: '#FDFAF5', border: '1px solid rgba(160,98,42,0.3)', borderLeft: '3px solid #A0622A', borderRadius: '0 8px 8px 0', padding: '1.25rem 1.5rem', marginBottom: '2rem' }}>
          <p style={{ fontFamily: 'var(--font-dm-sans)', fontSize: '0.8rem', fontWeight: 600, color: '#A0622A', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Connect your payment provider</p>
          <p style={{ fontSize: '0.875rem', color: '#2C1A0E', lineHeight: 1.65 }}>
            To take real payments, connect <strong>Shopify</strong> (see <code style={{ background: '#E8D5B0', padding: '1px 5px', borderRadius: 3 }}>lib/shopify.ts</code>)
            or integrate <strong>Stripe</strong> directly. Until then, this page shows your order summary.
          </p>
        </div>

        {/* Order summary */}
        <div style={{ background: '#FDFAF5', borderRadius: 8, border: '1px solid rgba(44,26,14,0.08)', padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 className="font-display" style={{ fontSize: '1.2rem', fontWeight: 700, color: '#2C1A0E', marginBottom: '1.25rem' }}>Order summary</h2>
          <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem', marginBottom: '1.25rem' }}>
            {items.map(item => (
              <li key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.9rem', color: '#2C1A0E' }}>
                <div>
                  <span style={{ fontFamily: 'var(--font-playfair), Georgia, serif', fontWeight: 600 }}>{item.name}</span>
                  <span style={{ color: '#6B3F1F', fontSize: '0.8rem', marginLeft: '0.5rem' }}>× {item.quantity}</span>
                </div>
                <span style={{ fontFamily: 'var(--font-playfair), Georgia, serif', fontWeight: 700 }}>£{(item.price * item.quantity).toLocaleString()}</span>
              </li>
            ))}
          </ul>
          <div style={{ height: 1, background: 'rgba(44,26,14,0.08)', margin: '0.75rem 0' }} />
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontFamily: 'var(--font-dm-sans)', fontWeight: 600, color: '#2C1A0E' }}>Total</span>
            <span style={{ fontFamily: 'var(--font-playfair), Georgia, serif', fontSize: '1.5rem', fontWeight: 700, color: '#2C1A0E' }}>£{total().toLocaleString()}</span>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <Link href="/contact" className="btn btn-primary" style={{ justifyContent: 'center' }}>
            Enquire to order
          </Link>
          <Link href="/cart" className="btn btn-outline" style={{ justifyContent: 'center' }}>
            Back to cart
          </Link>
        </div>
      </div>
    </>
  )
}
