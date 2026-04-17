import { getAllPosts } from '@/lib/posts'
import { PRODUCTS } from '@/lib/products'
import PostCard from '@/components/PostCard'
import ProductCard from '@/components/ProductCard'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Search' }

interface Props { searchParams: Promise<{ q?: string }> }

export default async function SearchPage({ searchParams }: Props) {
  const { q = '' } = await searchParams
  const query = q.trim().toLowerCase()

  const matchedProducts = query
    ? PRODUCTS.filter(p =>
        p.name.toLowerCase().includes(query) ||
        p.wood.toLowerCase().includes(query) ||
        p.category.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query)
      )
    : []

  const matchedPosts = query
    ? getAllPosts().filter(p =>
        p.title.toLowerCase().includes(query) ||
        p.excerpt.toLowerCase().includes(query) ||
        p.category.toLowerCase().includes(query) ||
        (p.tags ?? []).some(t => t.toLowerCase().includes(query))
      )
    : []

  const total = matchedProducts.length + matchedPosts.length

  return (
    <>
      <div className="bg-flax border-b border-bark/10 py-10 px-6">
        <div className="max-w-site mx-auto">
          <form method="get" action="/search">
            <label htmlFor="search-input" className="section-label">Search</label>
            <div className="flex gap-0 max-w-xl">
              <input
                id="search-input"
                name="q"
                type="search"
                defaultValue={q}
                placeholder="Chairs, oak, dining tables..."
                autoFocus
                style={{ flex: 1, padding: '0.875rem 1.25rem', border: '1px solid rgba(44,26,14,0.2)', borderRight: 'none', borderRadius: '4px 0 0 4px', fontFamily: 'var(--font-lora), Georgia, serif', fontSize: '1rem', background: '#FDFAF5', color: '#2C1A0E', outline: 'none' }}
              />
              <button type="submit" style={{ padding: '0.875rem 1.5rem', background: '#2C1A0E', color: '#E8D5B0', border: 'none', borderRadius: '0 4px 4px 0', fontFamily: 'var(--font-dm-sans)', fontWeight: 600, fontSize: '0.875rem', letterSpacing: '0.04em', textTransform: 'uppercase', cursor: 'pointer' }}>
                Search
              </button>
            </div>
          </form>
          {query && (
            <p style={{ fontFamily: 'var(--font-ui)', fontSize: '0.875rem', color: '#6B3F1F', marginTop: '0.75rem' }}>
              {total === 0 ? `No results for "${q}"` : `${total} result${total !== 1 ? 's' : ''} for "${q}"`}
            </p>
          )}
        </div>
      </div>

      <div className="max-w-site mx-auto px-6 py-12 space-y-14">
        {!query && (
          <div className="text-center py-16 text-oak">
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" stroke="#A0622A" strokeWidth="1" opacity="0.4" style={{ margin: '0 auto 1rem' }}>
              <circle cx="17" cy="17" r="11"/><path d="m30 30 7 7"/>
            </svg>
            <p style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', color: '#2C1A0E', marginBottom: '0.5rem' }}>What are you looking for?</p>
            <p style={{ fontSize: '0.9rem' }}>Search across products and journal posts.</p>
          </div>
        )}

        {matchedProducts.length > 0 && (
          <section>
            <h2 className="font-display text-2xl font-bold text-bark mb-6">
              Products <span style={{ fontFamily: 'var(--font-dm-sans)', fontSize: '0.875rem', fontWeight: 400, color: '#A0622A' }}>({matchedProducts.length})</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {matchedProducts.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          </section>
        )}

        {matchedPosts.length > 0 && (
          <section>
            <h2 className="font-display text-2xl font-bold text-bark mb-6">
              Journal <span style={{ fontFamily: 'var(--font-dm-sans)', fontSize: '0.875rem', fontWeight: 400, color: '#A0622A' }}>({matchedPosts.length})</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {matchedPosts.map(p => <PostCard key={p.slug} post={p} />)}
            </div>
          </section>
        )}

        {query && total === 0 && (
          <div className="text-center py-16">
            <p className="font-display text-2xl text-bark mb-3">Nothing found</p>
            <p className="text-oak mb-8">Try a different search term, or browse below.</p>
            <div className="flex gap-4 justify-center flex-wrap">
              <a href="/shop"    className="btn btn-primary">Browse shop</a>
              <a href="/journal" className="btn btn-outline">Read the journal</a>
            </div>
          </div>
        )}
      </div>
    </>
  )
}
