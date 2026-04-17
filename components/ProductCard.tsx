'use client'

import Link from 'next/link'
import type { Product } from '@/lib/products'
import { useCart } from '@/lib/cart'
import { useState } from 'react'

interface Props { product: Product }

const BADGE: Record<string, string> = {
  new:    'background:#A0622A;color:white',
  sale:   'background:#7A8C6E;color:white',
  custom: 'background:#2C1A0E;color:#E8D5B0',
}

export default function ProductCard({ product }: Props) {
  const { addItem } = useCart()
  const [added, setAdded] = useState(false)

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault()
    addItem({ id: product.id, name: product.name, slug: product.slug, price: product.price, wood: product.wood })
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <article className="product-card group">
      <div style={{ position: 'relative', aspectRatio: '4/3', overflow: 'hidden', background: '#E8D5B0' }}>
        <Link href={`/shop/${product.slug}`} style={{ display: 'block', width: '100%', height: '100%' }}>
          <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="52" height="52" viewBox="0 0 60 60" fill="none" stroke="#A0622A" strokeWidth="1" opacity="0.35">
              <rect x="8" y="16" width="44" height="30" rx="2"/>
              <path d="M8 22h44"/><path d="M20 16V8h20v8"/>
              <rect x="20" y="38" width="5" height="8"/><rect x="35" y="38" width="5" height="8"/>
            </svg>
          </div>
        </Link>
        {product.badge && (
          <span style={{ position: 'absolute', top: '0.75rem', left: '0.75rem', fontFamily: 'var(--font-dm-sans)', fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.04em', textTransform: 'uppercase', padding: '0.2rem 0.5rem', borderRadius: 3, ...(product.badge === 'new' ? { background: '#A0622A', color: 'white' } : product.badge === 'sale' ? { background: '#7A8C6E', color: 'white' } : { background: '#2C1A0E', color: '#E8D5B0' }) }}>
            {product.badge}
          </span>
        )}
      </div>

      <div style={{ padding: '1.25rem' }}>
        <p style={{ fontFamily: 'var(--font-dm-sans)', fontSize: '0.65rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#A0622A', marginBottom: '0.25rem' }}>{product.wood}</p>
        <h3 style={{ fontFamily: 'var(--font-playfair), Georgia, serif', fontSize: '1.05rem', fontWeight: 600, color: '#2C1A0E', marginBottom: '0.375rem', lineHeight: 1.3 }}>
          <Link href={`/shop/${product.slug}`} style={{ color: 'inherit', textDecoration: 'none' }}>{product.name}</Link>
        </h3>
        <p style={{ fontSize: '0.875rem', color: '#6B3F1F', lineHeight: 1.55, marginBottom: '1rem' }}>{product.excerpt}</p>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ fontFamily: 'var(--font-playfair), Georgia, serif', fontSize: '1.2rem', fontWeight: 700, color: '#2C1A0E' }}>
            {product.comparePrice && <del style={{ fontSize: '0.875rem', fontWeight: 400, color: '#6B3F1F', opacity: 0.6, marginRight: '0.375rem' }}>£{product.comparePrice.toLocaleString()}</del>}
            £{product.price.toLocaleString()}
          </div>
          <button
            onClick={handleAdd}
            style={{ fontFamily: 'var(--font-dm-sans)', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase', padding: '0.5rem 1rem', background: added ? '#7A8C6E' : '#2C1A0E', color: '#E8D5B0', border: 'none', borderRadius: 3, cursor: 'pointer', transition: 'background 0.2s', whiteSpace: 'nowrap' }}
          >
            {added ? 'Added ✓' : 'Add to cart'}
          </button>
        </div>
      </div>
    </article>
  )
}
