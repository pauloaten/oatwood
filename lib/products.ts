export interface Product {
  id:           string
  name:         string
  slug:         string
  price:        number
  comparePrice?: number
  description:  string
  excerpt:      string
  wood:         string
  category:     string
  badge?:       'new' | 'sale' | 'custom'
  inStock:      boolean
  leadTime:     string
  images:       string[]
  dimensions?:  { w: number; d: number; h: number }
}

// Replace this with Shopify Storefront API calls in production:
// https://shopify.dev/docs/api/storefront
export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Pemberton Dining Table',
    slug: 'pemberton-dining-table',
    price: 2400,
    description: 'Handcut mortise and tenon joints throughout. Seats 6–8 comfortably. Available in English oak, ash, or walnut. Each table is individually made and will vary slightly in grain pattern.',
    excerpt: 'Handcut mortise and tenon joints. Seats 6–8 comfortably.',
    wood: 'English Oak',
    category: 'Tables',
    badge: 'new',
    inStock: true,
    leadTime: '5–6 weeks',
    images: [],
    dimensions: { w: 200, d: 90, h: 75 },
  },
  {
    id: '2',
    name: 'Keswick Bench Seat',
    slug: 'keswick-bench-seat',
    price: 680,
    description: 'Steam-bent back rail. Solid walnut throughout with hand-finished oil. Pairs perfectly with the Pemberton table.',
    excerpt: 'Steam-bent back rail. Solid walnut throughout.',
    wood: 'Walnut',
    category: 'Chairs & Benches',
    inStock: true,
    leadTime: '3–4 weeks',
    images: [],
    dimensions: { w: 140, d: 40, h: 82 },
  },
  {
    id: '3',
    name: 'Briar Bookcase',
    slug: 'briar-bookcase',
    price: 880,
    comparePrice: 1100,
    description: 'Adjustable shelves, dado joints, hand-rubbed oil finish. Solid ash frame with back panel.',
    excerpt: 'Adjustable shelves, dado joints, oil finish.',
    wood: 'Ash',
    category: 'Storage',
    badge: 'sale',
    inStock: true,
    leadTime: '4–5 weeks',
    images: [],
    dimensions: { w: 90, d: 35, h: 180 },
  },
  {
    id: '4',
    name: 'Sedge Bedside Cabinet',
    slug: 'sedge-bedside-cabinet',
    price: 420,
    description: 'Dovetailed drawer, hand-cut ebony inlay detail. Solid cherry with a linseed oil finish.',
    excerpt: 'Dovetailed drawer, hand-cut ebony inlay detail.',
    wood: 'Cherry',
    category: 'Storage',
    inStock: true,
    leadTime: '3–4 weeks',
    images: [],
    dimensions: { w: 45, d: 40, h: 55 },
  },
  {
    id: '5',
    name: 'Stour Coffee Table',
    slug: 'stour-coffee-table',
    price: 960,
    description: 'Live-edge slab top on hand-forged steel legs. Each piece is unique — send us your preferred grain direction.',
    excerpt: 'Live-edge slab top on hand-forged steel legs.',
    wood: 'English Walnut',
    category: 'Tables',
    badge: 'custom',
    inStock: true,
    leadTime: '6–8 weeks',
    images: [],
    dimensions: { w: 120, d: 60, h: 42 },
  },
  {
    id: '6',
    name: 'Avon Wall Shelf',
    slug: 'avon-wall-shelf',
    price: 180,
    description: 'Floating shelf with hidden bracket system. Available in three lengths: 60, 90, or 120cm.',
    excerpt: 'Floating shelf, hidden bracket system. 3 lengths.',
    wood: 'Oak',
    category: 'Storage',
    inStock: true,
    leadTime: '2–3 weeks',
    images: [],
  },
]

export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find(p => p.slug === slug)
}

export function getProductsByCategory(category: string): Product[] {
  return PRODUCTS.filter(p => p.category.toLowerCase() === category.toLowerCase())
}

export const CATEGORIES = [...new Set(PRODUCTS.map(p => p.category))]
