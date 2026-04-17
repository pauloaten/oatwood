import Link from 'next/link'
import { getAllPosts } from '@/lib/posts'
import { PRODUCTS } from '@/lib/products'
import ProductCard from '@/components/ProductCard'
import PostCard from '@/components/PostCard'

export default function HomePage() {
  const latestPosts      = getAllPosts().slice(0, 3)
  const featuredProducts = PRODUCTS.slice(0, 4)

  return (
    <>
      {/* HERO */}
      <section className="relative min-h-[90vh] flex items-center justify-center bg-bark overflow-hidden">
        <div className="absolute inset-0 opacity-[0.06]" style={{ backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 3px, rgba(160,98,42,1) 3px, rgba(160,98,42,1) 6px)' }} />
        <div className="absolute -top-20 -left-20 w-80 h-80 rounded-full bg-oak/25 pointer-events-none" />
        <div className="absolute -bottom-16 -right-10 w-60 h-60 rounded-full bg-oak/20 pointer-events-none" />
        <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
          <p className="font-ui text-[0.7rem] tracking-[0.18em] uppercase text-grain mb-5 flex items-center justify-center gap-3 animate-fade-in-up">
            <span className="block w-10 h-px bg-grain opacity-60"/>Handcrafted in Britain<span className="block w-10 h-px bg-grain opacity-60"/>
          </p>
          <h1 className="text-white text-balance animate-fade-in-up-1 mb-5">Furniture built to last <em className="text-grain italic">generations</em></h1>
          <p className="text-flax/80 text-lg max-w-lg mx-auto mb-10 animate-fade-in-up-2">Every piece hand-finished in our workshop using sustainably sourced hardwoods.</p>
          <div className="flex gap-4 justify-center flex-wrap animate-fade-in-up-3">
            <Link href="/shop" className="btn bg-grain text-white border-grain hover:bg-oak hover:border-oak hover:-translate-y-0.5">Shop the collection</Link>
            <Link href="/about" className="btn border-flax/40 text-flax hover:bg-flax/10 hover:border-flax hover:text-white hover:-translate-y-0.5">Our story</Link>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 animate-bob flex flex-col items-center gap-1.5 text-flax/40 font-ui text-[0.7rem] tracking-widest uppercase">
          <span>Scroll</span>
          <svg width="14" height="18" viewBox="0 0 14 18" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M7 2v12M2 11l5 5 5-5"/></svg>
        </div>
      </section>

      {/* FEATURE STRIP */}
      <div className="bg-bark border-t border-white/5 py-4 px-6">
        <div className="max-w-site mx-auto flex justify-center gap-8 flex-wrap">
          {[
            { path: 'M10 2L3 7v11h5v-4h4v4h5V7z', text: 'Made in Yorkshire' },
            { path: 'M10 2c1 3 4 5 4 8a4 4 0 0 1-8 0c0-3 3-5 4-8z', text: 'Sustainably sourced' },
            { path: 'M5 10l4 4 6-8', text: '50-year guarantee' },
            { path: 'M3 10h14M10 3l7 7-7 7', text: 'Free UK delivery' },
          ].map(({ path, text }) => (
            <div key={text} className="flex items-center gap-2 font-ui text-[0.78rem] text-flax/80">
              <svg width="14" height="14" viewBox="0 0 20 20" fill="none" stroke="#A0622A" strokeWidth="1.5"><path d={path}/></svg>
              {text}
            </div>
          ))}
        </div>
      </div>

      {/* FEATURED PRODUCTS */}
      <section className="py-20 px-6 bg-cream">
        <div className="max-w-site mx-auto">
          <div className="text-center mb-12">
            <span className="section-label">New in</span>
            <h2 className="font-display text-4xl font-bold text-bark mb-3">From the workshop</h2>
            <p className="font-body italic text-oak">Each piece is made to order and takes 4-6 weeks to complete.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {featuredProducts.map(product => <ProductCard key={product.id} product={product} />)}
          </div>
          <div className="text-center mt-12">
            <Link href="/shop" className="btn btn-outline">View all pieces</Link>
          </div>
        </div>
      </section>

      {/* CRAFT */}
      <section className="py-20 px-6 bg-bark relative overflow-hidden">
        <div className="absolute top-[-40%] right-[-10%] w-96 h-96 rounded-full bg-oak/30 pointer-events-none" />
        <div className="max-w-site mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="section-label text-grain">The craft</span>
            <h2 className="font-display text-4xl font-bold text-white mb-5">Every joint cut by hand. Every surface finished with care.</h2>
            <p className="text-flax/75 leading-relaxed mb-8">We do not do flat-pack. We do not do shortcuts. Everything leaves our workshop as a piece of furniture you will hand down to your kids.</p>
            <div className="grid grid-cols-2 gap-6 mb-10">
              {[['18+','Years making'],['2,400','Pieces sold'],['100%','Hardwood'],['50yr','Guarantee']].map(([num,label]) => (
                <div key={label}>
                  <div className="font-display text-4xl font-bold text-grain leading-none">{num}</div>
                  <div className="font-ui text-[0.68rem] tracking-widest uppercase text-flax/50 mt-1">{label}</div>
                </div>
              ))}
            </div>
            <Link href="/about" className="btn border-flax/35 text-flax hover:bg-flax/10 hover:border-flax hover:text-white">Meet the maker</Link>
          </div>
          <div className="rounded-xl overflow-hidden aspect-[4/5] bg-oak/25 flex items-center justify-center">
            <div className="text-center">
              <svg width="72" height="72" viewBox="0 0 80 80" fill="none" stroke="rgba(232,213,176,0.15)" strokeWidth="1.5"><rect x="10" y="20" width="60" height="45" rx="2"/><path d="M10 30h60"/><path d="M25 20V10h30v10"/></svg>
              <p className="font-ui text-[0.7rem] tracking-widest uppercase text-flax/20 mt-3">Workshop photo</p>
            </div>
          </div>
        </div>
      </section>

      {/* BLOG PREVIEW */}
      <section className="py-20 px-6 bg-flax">
        <div className="max-w-site mx-auto">
          <div className="flex items-end justify-between mb-10 gap-4 flex-wrap">
            <div>
              <span className="section-label">From the journal</span>
              <h2 className="font-display text-4xl font-bold text-bark">Tips, builds and stories</h2>
            </div>
            <Link href="/journal" className="font-ui text-xs font-semibold tracking-widest uppercase text-grain underline underline-offset-4 hover:text-oak">All posts</Link>
          </div>
          {latestPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {latestPosts.map(post => <PostCard key={post.slug} post={post} />)}
            </div>
          ) : (
            <div className="text-center py-16 bg-parchment/50 rounded-xl">
              <p className="font-display text-xl text-bark mb-2">No posts yet</p>
              <p className="text-oak text-sm">Add <code className="text-grain">.mdx</code> files to the <code className="text-grain">/posts</code> folder to get started.</p>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
