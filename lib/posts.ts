import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const POSTS_DIR = path.join(process.cwd(), 'posts')

export interface PostMeta {
  slug:        string
  title:       string
  date:        string
  excerpt:     string
  category:    string
  readTime:    number
  coverImage?: string
  author?:     string
  tags?:       string[]
}

export interface Post extends PostMeta {
  content: string
}

// Ensure posts directory exists
function ensurePostsDir() {
  if (!fs.existsSync(POSTS_DIR)) {
    fs.mkdirSync(POSTS_DIR, { recursive: true })
  }
}

export function getAllPostSlugs(): string[] {
  ensurePostsDir()
  return fs.readdirSync(POSTS_DIR)
    .filter(f => f.endsWith('.mdx') || f.endsWith('.md'))
    .map(f => f.replace(/\.(mdx|md)$/, ''))
}

export function getAllPosts(): PostMeta[] {
  const slugs = getAllPostSlugs()
  return slugs
    .map(slug => getPostMeta(slug))
    .filter(Boolean)
    .sort((a, b) => new Date(b!.date).getTime() - new Date(a!.date).getTime()) as PostMeta[]
}

export function getPostMeta(slug: string): PostMeta | null {
  ensurePostsDir()
  const mdxPath = path.join(POSTS_DIR, `${slug}.mdx`)
  const mdPath  = path.join(POSTS_DIR, `${slug}.md`)
  const filePath = fs.existsSync(mdxPath) ? mdxPath : fs.existsSync(mdPath) ? mdPath : null
  if (!filePath) return null

  const raw = fs.readFileSync(filePath, 'utf-8')
  const { data, content } = matter(raw)
  const wordCount = content.split(/\s+/).length
  const readTime  = Math.max(1, Math.ceil(wordCount / 200))

  return {
    slug,
    title:      data.title      ?? 'Untitled',
    date:       data.date       ? new Date(data.date).toISOString() : new Date().toISOString(),
    excerpt:    data.excerpt    ?? '',
    category:   data.category   ?? 'Journal',
    coverImage: data.coverImage ?? undefined,
    author:     data.author     ?? 'The team',
    tags:       data.tags       ?? [],
    readTime,
  }
}

export function getPost(slug: string): Post | null {
  ensurePostsDir()
  const mdxPath = path.join(POSTS_DIR, `${slug}.mdx`)
  const mdPath  = path.join(POSTS_DIR, `${slug}.md`)
  const filePath = fs.existsSync(mdxPath) ? mdxPath : fs.existsSync(mdPath) ? mdPath : null
  if (!filePath) return null

  const raw = fs.readFileSync(filePath, 'utf-8')
  const { data, content } = matter(raw)
  const wordCount = content.split(/\s+/).length
  const readTime  = Math.max(1, Math.ceil(wordCount / 200))

  return {
    slug,
    title:      data.title      ?? 'Untitled',
    date:       data.date       ? new Date(data.date).toISOString() : new Date().toISOString(),
    excerpt:    data.excerpt    ?? '',
    category:   data.category   ?? 'Journal',
    coverImage: data.coverImage ?? undefined,
    author:     data.author     ?? 'The team',
    tags:       data.tags       ?? [],
    readTime,
    content,
  }
}

export function getPostsByCategory(category: string): PostMeta[] {
  return getAllPosts().filter(p => p.category.toLowerCase() === category.toLowerCase())
}

export function getRelatedPosts(slug: string, limit = 3): PostMeta[] {
  const post = getPostMeta(slug)
  if (!post) return []
  return getAllPosts()
    .filter(p => p.slug !== slug)
    .sort((a, b) => {
      const aMatch = a.category === post.category ? 1 : 0
      const bMatch = b.category === post.category ? 1 : 0
      return bMatch - aMatch
    })
    .slice(0, limit)
}
