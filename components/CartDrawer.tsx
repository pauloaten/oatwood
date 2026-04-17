'use client'

import Link from 'next/link'
import { useCart } from '@/lib/cart'
import { useEffect } from 'react'

export default function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQty, total, itemCount } = useCart()

  // Lock body scroll when open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') closeCart() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [closeCart])

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-bark/40 z-40 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={closeCart}
        aria-hidden
      />

      {/* Drawer */}
      <div
        role="dialog"
        aria-label="Shopping cart"
        aria-modal="true"
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-parchment z-50 flex flex-col shadow-2xl transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-bark/10">
          <h2 className="font-display text-xl font-bold text-bark">
            Your cart
            {itemCount() > 0 && (
              <span className="ml-2 font-ui text-sm font-normal text-grain">({itemCount()} {itemCount() === 1 ? 'item' : 'items'})</span>
            )}
          </h2>
          <button
            onClick={closeCart}
            aria-label="Close cart"
            className="w-9 h-9 flex items-center justify-center rounded text-bark hover:bg-flax transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.75">
              <path d="M4 4l12 12M16 4L4 16"/>
            </svg>
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center gap-4">
              <svg width="48" height="48" viewBox="0 0 50 50" fill="none" stroke="#A0622A" strokeWidth="1" opacity="0.3">
                <path d="M6 6h5l1 5M12 11l4 18h22l4-18z"/>
                <circle cx="20" cy="38" r="2.5"/><circle cx="34" cy="38" r="2.5"/>
              </svg>
              <div>
                <p className="font-display text-lg text-bark mb-1">Your cart is empty</p>
                <p className="text-sm text-oak">Add a piece from the workshop to get started.</p>
              </div>
              <button onClick={closeCart} className="btn btn-outline mt-2">Browse the shop</button>
            </div>
          ) : (
            <ul className="space-y-4">
              {items.map(item => (
                <li key={item.id} className="flex gap-4 p-4 bg-cream rounded-lg border border-bark/8">
                  {/* Placeholder image */}
                  <div className="w-16 h-16 rounded bg-flax flex items-center justify-center flex-shrink-0">
                    <svg width="24" height="24" viewBox="0 0 40 40" fill="none" stroke="#A0622A" strokeWidth="1" opacity="0.5">
                      <rect x="5" y="10" width="30" height="20" rx="2"/>
                      <path d="M5 14h30"/><path d="M13 10V6h14v4"/>
                    </svg>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="font-ui text-[0.62rem] tracking-widest uppercase text-grain">{item.wood}</p>
                        <Link
                          href={`/shop/${item.slug}`}
                          onClick={closeCart}
                          className="font-display text-sm font-semibold text-bark hover:text-grain transition-colors line-clamp-1"
                        >
                          {item.name}
                        </Link>
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        aria-label={`Remove ${item.name}`}
                        className="text-oak/50 hover:text-grain transition-colors flex-shrink-0 mt-0.5"
                      >
                        <svg width="13" height="13" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.75">
                          <path d="M4 4l12 12M16 4L4 16"/>
                        </svg>
                      </button>
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      {/* Qty controls */}
                      <div className="flex items-center border border-bark/15 rounded overflow-hidden">
                        <button
                          onClick={() => updateQty(item.id, item.quantity - 1)}
                          aria-label="Decrease quantity"
                          className="w-7 h-7 flex items-center justify-center text-oak hover:bg-flax transition-colors font-ui text-sm"
                        >
                          −
                        </button>
                        <span className="w-7 text-center font-ui text-sm text-bark">{item.quantity}</span>
                        <button
                          onClick={() => updateQty(item.id, item.quantity + 1)}
                          aria-label="Increase quantity"
                          className="w-7 h-7 flex items-center justify-center text-oak hover:bg-flax transition-colors font-ui text-sm"
                        >
                          +
                        </button>
                      </div>
                      <p className="font-display text-base font-bold text-bark">
                        £{(item.price * item.quantity).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="px-6 py-5 border-t border-bark/10 space-y-3 bg-parchment">
            <div className="flex items-center justify-between">
              <span className="font-ui text-sm text-oak">Subtotal</span>
              <span className="font-display text-2xl font-bold text-bark">£{total().toLocaleString()}</span>
            </div>
            <p className="font-ui text-xs text-oak/60">Free UK delivery on all orders. Lead time 3–8 weeks.</p>
            <Link
              href="/checkout"
              onClick={closeCart}
              className="btn btn-primary w-full justify-center"
            >
              Proceed to checkout
              <svg width="14" height="14" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 10h12M11 5l5 5-5 5"/>
              </svg>
            </Link>
            <button
              onClick={closeCart}
              className="w-full text-center font-ui text-xs text-oak underline underline-offset-4 hover:text-grain transition-colors"
            >
              Continue shopping
            </button>
          </div>
        )}
      </div>
    </>
  )
}
