import { notFound } from 'next/navigation'
import Link from 'next/link'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { getPost, getAllPostSlugs, getRelatedPosts } from '@/lib/posts'
import PostCard from '@/components/PostCard'
import type { Metadata } from 'next'

interface Props { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return getAllPostSlugs().map(slug => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = getPost(slug)
  if (!post) return {}
  return { title: post.title, description: post.excerpt }
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params
  const post = getPost(slug)
  if (!post) notFound()

  const related = getRelatedPosts(slug, 3)
  const formatted = new Date(post.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })

  return (
    <>
      {/* Post header */}
      <div className="bg-bark relative overflow-hidden pb-12 pt-14 px-6 text-center">
        <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 3px, rgba(160,98,42,1) 3px, rgba(160,98,42,1) 6px)' }} />
        <div className="relative z-10 max-w-2xl mx-auto">
          <div className="flex items-center justify-center gap-3 font-ui text-[0.72rem] text-grain uppercase tracking-widest mb-4">
            <Link href="/journal" className="hover:text-flax transition-colors">Journal</Link>
            <span className="opacity-40">·</span>
            <span>{post.category}</span>
            <span className="opacity-40">·</span>
            <time dateTime={post.date}>{formatted}</time>
            <span className="opacity-40">·</span>
            <span>{post.readTime} min read</span>
          </div>
          <h1 className="text-white text-balance">{post.title}</h1>
          {post.author && (
            <p className="font-ui text-sm text-flax/50 mt-4">By {post.author}</p>
          )}
        </div>
        {/* Curved bottom edge */}
        <div className="absolute bottom-0 left-0 right-0 h-12 bg-cream" style={{ clipPath: 'ellipse(55% 100% at 50% 100%)' }} />
      </div>

      {/* Post body */}
      <div className="max-w-[760px] mx-auto px-6 py-14">
        <article className="prose prose-woodcraft max-w-none">
          <MDXRemote source={post.content} />
        </article>

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 items-center mt-10 pt-8 border-t border-bark/10">
            <span className="font-ui text-[0.7rem] tracking-widest uppercase text-grain">Tagged:</span>
            {post.tags.map(tag => (
              <span key={tag} className="font-ui text-xs px-3 py-1 bg-flax text-oak rounded border border-bark/10">
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Post nav */}
        <div className="mt-10 pt-8 border-t border-bark/10">
          <Link href="/journal" className="font-ui text-sm font-medium text-grain hover:text-oak flex items-center gap-2">
            <svg width="14" height="14" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 10H4M9 5l-5 5 5 5"/></svg>
            Back to journal
          </Link>
        </div>
      </div>

      {/* Related posts */}
      {related.length > 0 && (
        <section className="bg-flax py-16 px-6">
          <div className="max-w-site mx-auto">
            <h2 className="font-display text-2xl font-bold text-bark mb-8">More from the journal</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {related.map(p => <PostCard key={p.slug} post={p} />)}
            </div>
          </div>
        </section>
      )}
    </>
  )
}
