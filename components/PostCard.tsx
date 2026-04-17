import Link from 'next/link'
import type { PostMeta } from '@/lib/posts'

interface Props { post: PostMeta; featured?: boolean }

export default function PostCard({ post, featured = false }: Props) {
  const { slug, title, date, excerpt, category, readTime } = post
  const formatted = new Date(date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })

  if (featured) {
    return (
      <article className="post-card md:flex-row group">
        <div className="md:w-1/2 aspect-video md:aspect-auto bg-flax flex items-center justify-center flex-shrink-0 overflow-hidden">
          <div className="group-hover:scale-[1.03] transition-transform duration-500 flex items-center justify-center w-full h-full">
            <svg width="56" height="56" viewBox="0 0 60 60" fill="none" stroke="#A0622A" strokeWidth="1" opacity="0.35">
              <rect x="5" y="5" width="50" height="50" rx="4"/>
              <path d="M5 18h50"/><path d="M18 5v50"/>
            </svg>
          </div>
        </div>
        <div className="p-7 flex flex-col justify-center">
          <div className="flex items-center gap-3 font-ui text-xs text-grain uppercase tracking-widest mb-3">
            <span>{category}</span>
            <span className="w-1 h-1 rounded-full bg-grain/40 inline-block"/>
            <time dateTime={date}>{formatted}</time>
            <span className="w-1 h-1 rounded-full bg-grain/40 inline-block"/>
            <span>{readTime} min read</span>
          </div>
          <h2 className="font-display text-2xl font-bold text-bark mb-3 leading-snug">
            <Link href={`/journal/${slug}`} className="hover:text-grain transition-colors">{title}</Link>
          </h2>
          <p className="text-oak text-sm leading-relaxed mb-5">{excerpt}</p>
          <Link href={`/journal/${slug}`} className="font-ui text-xs font-semibold tracking-widest uppercase text-grain flex items-center gap-2 hover:gap-3 transition-all hover:text-oak">
            Read more
            <svg width="13" height="13" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 10h12M11 5l5 5-5 5"/>
            </svg>
          </Link>
        </div>
      </article>
    )
  }

  return (
    <article className="post-card group">
      <div className="aspect-video bg-flax overflow-hidden flex items-center justify-center">
        <div className="group-hover:scale-[1.03] transition-transform duration-500 flex items-center justify-center w-full h-full">
          <svg width="40" height="40" viewBox="0 0 60 60" fill="none" stroke="#A0622A" strokeWidth="1" opacity="0.35">
            <rect x="5" y="5" width="50" height="50" rx="4"/>
            <path d="M5 18h50"/><path d="M18 5v50"/>
          </svg>
        </div>
      </div>
      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-center gap-2.5 font-ui text-[0.68rem] text-grain uppercase tracking-wider mb-2.5">
          <span>{category}</span>
          <span className="w-1 h-1 rounded-full bg-grain/40 inline-block"/>
          <time dateTime={date}>{formatted}</time>
        </div>
        <h3 className="font-display text-[1.1rem] font-semibold text-bark mb-2 leading-snug">
          <Link href={`/journal/${slug}`} className="hover:text-grain transition-colors">{title}</Link>
        </h3>
        <p className="text-sm text-oak leading-relaxed mb-4 flex-1 line-clamp-3">{excerpt}</p>
        <Link href={`/journal/${slug}`} className="font-ui text-[0.7rem] font-semibold tracking-widest uppercase text-grain flex items-center gap-2 hover:gap-3 transition-all hover:text-oak mt-auto">
          Read more
          <svg width="12" height="12" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M4 10h12M11 5l5 5-5 5"/>
          </svg>
        </Link>
      </div>
    </article>
  )
}
