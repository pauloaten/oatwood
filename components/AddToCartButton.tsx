'use client'

import { useCart } from '@/lib/cart'
import type { Product } from '@/lib/products'
import { useState } from 'react'

interface Props {
  product: Product
  className?: string
}

export default function AddToCartButton({ product, className = '' }: Props) {
  const { addItem } = useCart()
  const [added, setAdded] = useState(false)

  const handleAdd = () => {
    addItem({
      id:    product.id,
      name:  product.name,
      slug:  product.slug,
      price: product.price,
      wood:  product.wood,
    })
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <button
      onClick={handleAdd}
      className={`btn btn-primary w-full justify-center ${className}`}
      aria-label={`Add ${product.name} to cart`}
    >
      {added ? (
        <>
          <svg width="15" height="15" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 10l4 4 6-8"/>
          </svg>
          Added to cart
        </>
      ) : (
        <>
          <svg width="15" height="15" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.75">
            <path d="M3 3h2l.5 2M5.5 5l1.5 7h9l1.5-7z"/>
            <circle cx="9" cy="16" r="1"/><circle cx="14" cy="16" r="1"/>
          </svg>
          Add to cart
        </>
      )}
    </button>
  )
}
