'use client'

import Link from 'next/link'
import { useCart } from '@/lib/cart'

export default function CartPage() {
  const { items, removeItem, updateQty, total, itemCount } = useCart()

  return (
    <>
      <div style={{ background: '#E8D5B0', borderBottom: '1px solid rgba(44,26,14,0.1)', padding: '3.5rem 1.5rem' }}>
        <div className="max-w-site mx-auto">
          <span className="section-label">Your order</span>
          <h1 className="font-display" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700, color: '#2C1A0E' }}>
            Shopping cart
            {itemCount() > 0 && (
              <span style={{ fontFamily: 'var(--font-dm-sans)', fontSize: '1rem', fontWeight: 400, color: '#A0622A', marginLeft: '0.75rem' }}>
                ({itemCount()} {itemCount() === 1 ? 'item' : 'items'})
              </span>
            )}
          </h1>
        </div>
      </div>

      <div className="max-w-site mx-auto px-6 py-12">
        {items.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '5rem 1rem' }}>
            <svg width="56" height="56" viewBox="0 0 56 56" fill="none" stroke="#A0622A" strokeWidth="1" opacity="0.3" style={{ margin: '0 auto 1.5rem' }}>
              <path d="M7 7h6l1.5 6M14.5 13l5 21h26l5-21z"/>
              <circle cx="23" cy="44" r="3"/><circle cx="40" cy="44" r="3"/>
            </svg>
            <h2 className="font-display" style={{ fontSize: '1.5rem', color: '#2C1A0E', marginBottom: '0.75rem' }}>Your cart is empty</h2>
            <p style={{ color: '#6B3F1F', marginBottom: '2rem' }}>Looks like you haven&apos;t added anything yet.</p>
            <Link href="/shop" className="btn btn-primary">Browse the shop</Link>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: '3rem', alignItems: 'start' }} className="cart-layout">

            {/* Items */}
            <div>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {items.map(item => (
                  <li key={item.id} style={{ display: 'flex', gap: '1.25rem', padding: '1.25rem', background: '#FDFAF5', borderRadius: 8, border: '1px solid rgba(44,26,14,0.08)' }}>
                    {/* Thumb */}
                    <div style={{ width: 80, height: 80, borderRadius: 6, background: '#E8D5B0', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <svg width="28" height="28" viewBox="0 0 40 40" fill="none" stroke="#A0622A" strokeWidth="1" opacity="0.5">
                        <rect x="5" y="10" width="30" height="20" rx="2"/><path d="M5 14h30"/><path d="M13 10V6h14v4"/>
                      </svg>
                    </div>

                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem', marginBottom: '0.25rem' }}>
                        <div>
                          <p style={{ fontFamily: 'var(--font-dm-sans)', fontSize: '0.65rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#A0622A' }}>{item.wood}</p>
                          <Link href={`/shop/${item.slug}`} style={{ fontFamily: 'var(--font-playfair), Georgia, serif', fontSize: '1rem', fontWeight: 600, color: '#2C1A0E', textDecoration: 'none' }}>
                            {item.name}
                          </Link>
                        </div>
                        <button onClick={() => removeItem(item.id)} aria-label={`Remove ${item.name}`} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(107,63,31,0.4)', flexShrink: 0, padding: '0.25rem' }}>
                          <svg width="14" height="14" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.75"><path d="M4 4l12 12M16 4L4 16"/></svg>
                        </button>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '0.75rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', border: '1px solid rgba(44,26,14,0.15)', borderRadius: 4, overflow: 'hidden' }}>
                          <button onClick={() => updateQty(item.id, item.quantity - 1)} style={{ width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'none', border: 'none', cursor: 'pointer', color: '#6B3F1F', fontSize: '1.1rem' }}>−</button>
                          <span style={{ width: 32, textAlign: 'center', fontFamily: 'var(--font-dm-sans)', fontSize: '0.875rem', color: '#2C1A0E' }}>{item.quantity}</span>
                          <button onClick={() => updateQty(item.id, item.quantity + 1)} style={{ width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'none', border: 'none', cursor: 'pointer', color: '#6B3F1F', fontSize: '1.1rem' }}>+</button>
                        </div>
                        <span style={{ fontFamily: 'var(--font-playfair), Georgia, serif', fontSize: '1.25rem', fontWeight: 700, color: '#2C1A0E' }}>
                          £{(item.price * item.quantity).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>

              <Link href="/shop" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', fontFamily: 'var(--font-dm-sans)', fontSize: '0.8rem', color: '#A0622A', textDecoration: 'underline', textUnderlineOffset: 3, marginTop: '1.5rem' }}>
                <svg width="13" height="13" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 10H4M9 5l-5 5 5 5"/></svg>
                Continue shopping
              </Link>
            </div>

            {/* Summary */}
            <div style={{ background: '#FDFAF5', borderRadius: 8, border: '1px solid rgba(44,26,14,0.08)', padding: '1.5rem', position: 'sticky', top: '6rem' }}>
              <h2 className="font-display" style={{ fontSize: '1.25rem', fontWeight: 700, color: '#2C1A0E', marginBottom: '1.25rem' }}>Order summary</h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem', marginBottom: '1.25rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', color: '#6B3F1F' }}>
                  <span>Subtotal ({itemCount()} items)</span>
                  <span>£{total().toLocaleString()}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', color: '#6B3F1F' }}>
                  <span>UK delivery</span>
                  <span style={{ color: '#7A8C6E', fontWeight: 600 }}>Free</span>
                </div>
                <div style={{ height: 1, background: 'rgba(44,26,14,0.08)', margin: '0.375rem 0' }} />
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontFamily: 'var(--font-dm-sans)', fontWeight: 600, color: '#2C1A0E' }}>Total</span>
                  <span style={{ fontFamily: 'var(--font-playfair), Georgia, serif', fontSize: '1.5rem', fontWeight: 700, color: '#2C1A0E' }}>£{total().toLocaleString()}</span>
                </div>
              </div>

              <Link href="/checkout" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', display: 'flex' }}>
                Proceed to checkout
                <svg width="14" height="14" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 10h12M11 5l5 5-5 5"/></svg>
              </Link>

              <div style={{ marginTop: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {['Free UK delivery on all orders', '50-year guarantee on every piece', 'Made to order — 3–8 week lead time', 'Secure checkout'].map(note => (
                  <div key={note} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontFamily: 'var(--font-dm-sans)', fontSize: '0.75rem', color: '#6B3F1F' }}>
                    <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="#7A8C6E" strokeWidth="2"><path d="M2 8l4 4 8-8"/></svg>
                    {note}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      <style>{`@media (max-width: 768px) { .cart-layout { grid-template-columns: 1fr !important; } }`}</style>
    </>
  )
}
