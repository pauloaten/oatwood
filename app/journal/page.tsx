import { getAllPosts } from '@/lib/posts'
import PostCard from '@/components/PostCard'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Journal' }

export default function JournalPage() {
  const posts = getAllPosts()
  const [featured, ...rest] = posts

  return (
    <>
      <div className="bg-flax border-b border-bark/10 py-14 px-6">
        <div className="max-w-site mx-auto">
          <span className="section-label">The journal</span>
          <h1 className="font-display text-5xl font-bold text-bark">Tips, builds &amp; stories</h1>
        </div>
      </div>

      <div className="max-w-site mx-auto px-6 py-16">
        {posts.length === 0 ? (
          <div className="text-center py-20">
            <h2 className="font-display text-2xl text-bark mb-3">No posts yet</h2>
            <p className="text-oak mb-6">Create your first post by adding an <code className="text-grain bg-flax px-1.5 py-0.5 rounded">.mdx</code> file to the <code className="text-grain bg-flax px-1.5 py-0.5 rounded">/posts</code> folder.</p>
            <div className="bg-parchment border border-bark/10 rounded-lg p-6 max-w-lg mx-auto text-left">
              <p className="font-ui text-xs uppercase tracking-widest text-grain mb-3">Example: <code>posts/my-first-post.mdx</code></p>
              <pre className="text-sm text-bark font-mono leading-relaxed overflow-x-auto">{`---
title: "Why I still use hand planes in 2025"
date: "2025-04-12"
excerpt: "Power tools have their place, but nothing gives a finish like a sharp plane iron on green oak."
category: "Techniques"
author: "Sam Holt"
tags: ["hand tools", "finishing", "oak"]
---

Your post content goes here.

## A subheading

Write in **markdown**. Add images, quotes, code — whatever you need.`}</pre>
            </div>
          </div>
        ) : (
          <>
            {featured && (
              <div className="mb-10">
                <PostCard post={featured} featured />
              </div>
            )}
            {rest.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {rest.map(post => <PostCard key={post.slug} post={post} />)}
              </div>
            )}
          </>
        )}
      </div>
    </>
  )
}
