import { PRODUCTS, CATEGORIES } from '@/lib/products'
import ProductCard from '@/components/ProductCard'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Shop' }

interface Props { searchParams: Promise<{ category?: string }> }

export default async function ShopPage({ searchParams }: Props) {
  const { category } = await searchParams
  const filtered = category
    ? PRODUCTS.filter(p => p.category.toLowerCase() === category.toLowerCase())
    : PRODUCTS

  return (
    <>
      <div className="bg-flax border-b border-bark/10 py-14 px-6">
        <div className="max-w-site mx-auto">
          <span className="section-label">The collection</span>
          <h1 className="font-display text-5xl font-bold text-bark">All pieces</h1>
        </div>
      </div>

      <div className="max-w-site mx-auto px-6 py-12">
        {/* Category filter */}
        <div className="flex gap-2 flex-wrap mb-10">
          <a
            href="/shop"
            className={`font-ui text-xs font-semibold tracking-wider uppercase px-4 py-2 rounded border transition-colors ${
              !category ? 'bg-bark text-flax border-bark' : 'bg-transparent text-oak border-bark/20 hover:border-bark hover:text-bark'
            }`}
          >
            All
          </a>
          {CATEGORIES.map(cat => (
            <a
              key={cat}
              href={`/shop?category=${encodeURIComponent(cat)}`}
              className={`font-ui text-xs font-semibold tracking-wider uppercase px-4 py-2 rounded border transition-colors ${
                category?.toLowerCase() === cat.toLowerCase()
                  ? 'bg-bark text-flax border-bark'
                  : 'bg-transparent text-oak border-bark/20 hover:border-bark hover:text-bark'
              }`}
            >
              {cat}
            </a>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <p className="font-display text-xl text-bark mb-2">No products in this category</p>
            <a href="/shop" className="text-grain underline underline-offset-4 text-sm">View all</a>
          </div>
        )}
      </div>
    </>
  )
}
