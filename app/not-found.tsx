import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-6 text-center">
      <div>
        <p className="font-display font-bold text-[8rem] leading-none text-flax">404</p>
        <span className="section-label justify-center flex">Page not found</span>
        <h1 className="font-display text-3xl text-bark mb-4">This plank&apos;s gone missing.</h1>
        <p className="text-oak max-w-sm mx-auto mb-8">The page you&apos;re looking for doesn&apos;t exist — it may have moved, or the link might be wrong.</p>
        <div className="flex gap-4 justify-center flex-wrap">
          <Link href="/"     className="btn btn-primary">Back home</Link>
          <Link href="/shop" className="btn btn-outline">Browse the shop</Link>
        </div>
      </div>
    </div>
  )
}
