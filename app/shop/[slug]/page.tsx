import { notFound } from 'next/navigation'
import Link from 'next/link'
import { PRODUCTS, getProductBySlug } from '@/lib/products'
import ProductCard from '@/components/ProductCard'
import AddToCartButton from '@/components/AddToCartButton'
import type { Metadata } from 'next'

interface Props { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return PRODUCTS.map(p => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const product = getProductBySlug(slug)
  if (!product) return {}
  return { title: product.name, description: product.excerpt }
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params
  const product = getProductBySlug(slug)
  if (!product) notFound()

  const related = PRODUCTS.filter(p => p.slug !== slug && p.category === product.category).slice(0, 3)

  return (
    <>
      {/* Breadcrumb */}
      <div style={{ borderBottom: '1px solid rgba(44,26,14,0.1)', background: '#F7F0E3', padding: '0.75rem 1.5rem' }}>
        <div className="max-w-site mx-auto" style={{ fontFamily: 'var(--font-dm-sans)', fontSize: '0.78rem', color: '#6B3F1F', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Link href="/"     style={{ color: '#6B3F1F', textDecoration: 'none' }}>Home</Link>
          <span style={{ opacity: 0.4 }}>/</span>
          <Link href="/shop" style={{ color: '#6B3F1F', textDecoration: 'none' }}>Shop</Link>
          <span style={{ opacity: 0.4 }}>/</span>
          <span style={{ color: '#2C1A0E' }}>{product.name}</span>
        </div>
      </div>

      {/* Product detail */}
      <div className="max-w-site mx-auto px-6 py-14">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3.5rem', alignItems: 'start' }} className="product-detail-grid">
          {/* Image */}
          <div style={{ aspectRatio: '1', borderRadius: 12, background: '#E8D5B0', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', position: 'sticky', top: '6rem' }}>
            <div style={{ textAlign: 'center' }}>
              <svg width="80" height="80" viewBox="0 0 80 80" fill="none" stroke="#A0622A" strokeWidth="1" opacity="0.35">
                <rect x="8" y="16" width="64" height="44" rx="2"/>
                <path d="M8 26h64"/><path d="M24 16V8h32v8"/>
                <rect x="24" y="52" width="7" height="12"/><rect x="49" y="52" width="7" height="12"/>
              </svg>
              <p style={{ fontFamily: 'var(--font-dm-sans)', fontSize: '0.65rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(160,98,42,0.4)', marginTop: '0.75rem' }}>
                Add your product photo
              </p>
            </div>
          </div>

          {/* Info */}
          <div>
            {product.badge && (
              <span style={{ display: 'inline-block', fontFamily: 'var(--font-dm-sans)', fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', padding: '0.25rem 0.625rem', borderRadius: 3, marginBottom: '1rem', ...(product.badge === 'new' ? { background: '#A0622A', color: 'white' } : product.badge === 'sale' ? { background: '#7A8C6E', color: 'white' } : { background: '#2C1A0E', color: '#E8D5B0' }) }}>
                {product.badge}
              </span>
            )}

            <p style={{ fontFamily: 'var(--font-dm-sans)', fontSize: '0.72rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#A0622A', marginBottom: '0.375rem' }}>{product.wood}</p>
            <h1 className="font-display" style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', fontWeight: 700, color: '#2C1A0E', marginBottom: '1rem' }}>{product.name}</h1>

            <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.75rem', marginBottom: '1.5rem' }}>
              {product.comparePrice && (
                <del style={{ fontFamily: 'var(--font-playfair), Georgia, serif', fontSize: '1.25rem', color: 'rgba(107,63,31,0.5)' }}>£{product.comparePrice.toLocaleString()}</del>
              )}
              <span style={{ fontFamily: 'var(--font-playfair), Georgia, serif', fontSize: '2.5rem', fontWeight: 700, color: '#2C1A0E', lineHeight: 1 }}>
                £{product.price.toLocaleString()}
              </span>
            </div>

            <p style={{ color: '#6B3F1F', lineHeight: 1.75, marginBottom: '2rem' }}>{product.description}</p>

            {/* Specs table */}
            <div style={{ background: '#E8D5B0', borderRadius: 8, padding: '1.25rem', marginBottom: '2rem' }}>
              {[
                ['Wood species', product.wood],
                ['Category',     product.category],
                ['Lead time',    product.leadTime],
                ['Availability', product.inStock ? 'Made to order' : 'Currently unavailable'],
                ...(product.dimensions ? [['Dimensions', `${product.dimensions.w} × ${product.dimensions.d} × ${product.dimensions.h} cm`]] : []),
              ].map(([label, value]) => (
                <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.875rem', borderBottom: '1px solid rgba(44,26,14,0.08)', paddingBottom: '0.625rem', marginBottom: '0.625rem' }}
                  className="last:border-0 last:mb-0 last:pb-0">
                  <span style={{ fontFamily: 'var(--font-dm-sans)', fontSize: '0.7rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: '#A0622A' }}>{label}</span>
                  <span style={{ color: '#2C1A0E', fontWeight: 500 }}>{value}</span>
                </div>
              ))}
            </div>

            <AddToCartButton product={product} />

            <button className="btn btn-outline" style={{ width: '100%', justifyContent: 'center', marginTop: '0.75rem' }}>
              <svg width="15" height="15" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M10 17S3 12 3 7a4 4 0 0 1 7-2.6A4 4 0 0 1 17 7c0 5-7 10-7 10z"/>
              </svg>
              Save to wishlist
            </button>

            <p style={{ textAlign: 'center', fontFamily: 'var(--font-dm-sans)', fontSize: '0.75rem', color: 'rgba(107,63,31,0.6)', marginTop: '1.25rem' }}>
              Free delivery to mainland UK. 50-year guarantee on all pieces.
            </p>
          </div>
        </div>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <section style={{ background: '#E8D5B0', padding: '4rem 1.5rem' }}>
          <div className="max-w-site mx-auto">
            <h2 className="font-display" style={{ fontSize: '1.75rem', fontWeight: 700, color: '#2C1A0E', marginBottom: '2rem' }}>You might also like</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
              {related.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          </div>
        </section>
      )}

      <style>{`
        @media (max-width: 768px) {
          .product-detail-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  )
}
