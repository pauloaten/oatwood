'use client'

import { useCart } from '@/lib/cart'

export default function CartButton() {
  const { openCart, itemCount } = useCart()
  const count = itemCount()

  return (
    <button
      onClick={openCart}
      aria-label={count > 0 ? `Cart (${count} items)` : 'Cart'}
      className="relative w-10 h-10 flex items-center justify-center rounded text-bark hover:bg-flax transition-colors"
    >
      <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.75">
        <path d="M3 3h2l.5 2M5.5 5l1.5 7h9l1.5-7z"/>
        <circle cx="9" cy="16" r="1"/><circle cx="14" cy="16" r="1"/>
      </svg>
      {count > 0 && (
        <span
          aria-hidden
          className="absolute top-1 right-1 min-w-[16px] h-4 rounded-full bg-grain text-white font-ui text-[9px] font-bold flex items-center justify-center px-1"
        >
          {count}
        </span>
      )}
    </button>
  )
}
