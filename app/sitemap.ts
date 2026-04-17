import { MetadataRoute } from 'next'
import { getAllPosts } from '@/lib/posts'
import { PRODUCTS } from '@/lib/products'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://woodcraft.co.uk'

  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl,              priority: 1.0,  changeFrequency: 'weekly'  },
    { url: `${baseUrl}/shop`,    priority: 0.9,  changeFrequency: 'weekly'  },
    { url: `${baseUrl}/journal`, priority: 0.8,  changeFrequency: 'weekly'  },
    { url: `${baseUrl}/about`,   priority: 0.6,  changeFrequency: 'monthly' },
    { url: `${baseUrl}/contact`, priority: 0.5,  changeFrequency: 'monthly' },
  ]

  const productPages: MetadataRoute.Sitemap = PRODUCTS.map(p => ({
    url:              `${baseUrl}/shop/${p.slug}`,
    priority:         0.8,
    changeFrequency:  'weekly' as const,
  }))

  const postPages: MetadataRoute.Sitemap = getAllPosts().map(p => ({
    url:             `${baseUrl}/journal/${p.slug}`,
    lastModified:    new Date(p.date),
    priority:        0.6,
    changeFrequency: 'monthly' as const,
  }))

  return [...staticPages, ...productPages, ...postPages]
}
