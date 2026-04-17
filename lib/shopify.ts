/**
 * Shopify Storefront API Integration
 * ─────────────────────────────────────────────────────────────────────────────
 * To activate:
 *   1. In your Shopify admin go to: Apps → Develop apps → Create an app
 *   2. Under "Storefront API", enable: unauthenticated_read_product_listings,
 *      unauthenticated_read_product_inventory, unauthenticated_write_checkouts
 *   3. Copy the Storefront Access Token
 *   4. Add to .env.local:
 *        SHOPIFY_STORE_DOMAIN=your-store.myshopify.com
 *        SHOPIFY_STOREFRONT_TOKEN=your_token_here
 *   5. In lib/products.ts, replace PRODUCTS with getShopifyProducts()
 * ─────────────────────────────────────────────────────────────────────────────
 */

const DOMAIN = process.env.SHOPIFY_STORE_DOMAIN
const TOKEN  = process.env.SHOPIFY_STOREFRONT_TOKEN
const API_URL = DOMAIN ? `https://${DOMAIN}/api/2024-01/graphql.json` : null

// ── GraphQL helper ────────────────────────────────────────────────────────────

async function shopifyFetch<T>(query: string, variables?: Record<string, unknown>): Promise<T> {
  if (!API_URL || !TOKEN) {
    throw new Error('Shopify env vars not configured. Set SHOPIFY_STORE_DOMAIN and SHOPIFY_STOREFRONT_TOKEN in .env.local')
  }

  const res = await fetch(API_URL, {
    method:  'POST',
    headers: {
      'Content-Type':                      'application/json',
      'X-Shopify-Storefront-Access-Token': TOKEN,
    },
    body: JSON.stringify({ query, variables }),
    next: { revalidate: 60 }, // ISR: revalidate product data every 60s
  })

  if (!res.ok) throw new Error(`Shopify API error: ${res.status}`)
  const { data, errors } = await res.json()
  if (errors?.length) throw new Error(errors[0].message)
  return data as T
}

// ── Types ─────────────────────────────────────────────────────────────────────

export interface ShopifyProduct {
  id:          string
  title:       string
  handle:      string
  description: string
  tags:        string[]
  priceRange:  { minVariantPrice: { amount: string; currencyCode: string } }
  compareAtPriceRange: { maxVariantPrice: { amount: string; currencyCode: string } }
  images:      { edges: Array<{ node: { url: string; altText: string | null } }> }
  variants:    { edges: Array<{ node: { id: string; title: string; price: { amount: string } } }> }
}

export interface ShopifyCart {
  id:           string
  checkoutUrl:  string
  totalQuantity: number
  cost:         { totalAmount: { amount: string; currencyCode: string } }
  lines:        { edges: Array<{ node: ShopifyCartLine }> }
}

export interface ShopifyCartLine {
  id:          string
  quantity:    number
  merchandise: { id: string; title: string; product: { title: string; handle: string }; image?: { url: string } }
  cost:        { totalAmount: { amount: string; currencyCode: string } }
}

// ── Product queries ───────────────────────────────────────────────────────────

const PRODUCT_FIELDS = `
  id
  title
  handle
  description
  tags
  priceRange { minVariantPrice { amount currencyCode } }
  compareAtPriceRange { maxVariantPrice { amount currencyCode } }
  images(first: 5) { edges { node { url altText } } }
  variants(first: 10) { edges { node { id title price { amount } } } }
`

export async function getShopifyProducts(): Promise<ShopifyProduct[]> {
  const data = await shopifyFetch<{ products: { edges: Array<{ node: ShopifyProduct }> } }>(`
    query Products {
      products(first: 50, sortKey: CREATED_AT, reverse: true) {
        edges { node { ${PRODUCT_FIELDS} } }
      }
    }
  `)
  return data.products.edges.map(e => e.node)
}

export async function getShopifyProduct(handle: string): Promise<ShopifyProduct | null> {
  const data = await shopifyFetch<{ product: ShopifyProduct | null }>(`
    query Product($handle: String!) {
      product(handle: $handle) { ${PRODUCT_FIELDS} }
    }
  `, { handle })
  return data.product
}

// ── Cart mutations ────────────────────────────────────────────────────────────

const CART_FIELDS = `
  id
  checkoutUrl
  totalQuantity
  cost { totalAmount { amount currencyCode } }
  lines(first: 50) {
    edges {
      node {
        id
        quantity
        merchandise {
          ... on ProductVariant {
            id title
            product { title handle }
            image { url }
          }
        }
        cost { totalAmount { amount currencyCode } }
      }
    }
  }
`

export async function createCart(): Promise<ShopifyCart> {
  const data = await shopifyFetch<{ cartCreate: { cart: ShopifyCart } }>(`
    mutation CartCreate {
      cartCreate { cart { ${CART_FIELDS} } }
    }
  `)
  return data.cartCreate.cart
}

export async function addToCart(cartId: string, variantId: string, quantity = 1): Promise<ShopifyCart> {
  const data = await shopifyFetch<{ cartLinesAdd: { cart: ShopifyCart } }>(`
    mutation CartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
      cartLinesAdd(cartId: $cartId, lines: $lines) { cart { ${CART_FIELDS} } }
    }
  `, { cartId, lines: [{ merchandiseId: variantId, quantity }] })
  return data.cartLinesAdd.cart
}

export async function updateCartLine(cartId: string, lineId: string, quantity: number): Promise<ShopifyCart> {
  const data = await shopifyFetch<{ cartLinesUpdate: { cart: ShopifyCart } }>(`
    mutation CartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
      cartLinesUpdate(cartId: $cartId, lines: $lines) { cart { ${CART_FIELDS} } }
    }
  `, { cartId, lines: [{ id: lineId, quantity }] })
  return data.cartLinesUpdate.cart
}

export async function removeCartLine(cartId: string, lineId: string): Promise<ShopifyCart> {
  const data = await shopifyFetch<{ cartLinesRemove: { cart: ShopifyCart } }>(`
    mutation CartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
      cartLinesRemove(cartId: $cartId, lineIds: $lineIds) { cart { ${CART_FIELDS} } }
    }
  `, { cartId, lineIds: [lineId] })
  return data.cartLinesRemove.cart
}

export async function getCart(cartId: string): Promise<ShopifyCart | null> {
  const data = await shopifyFetch<{ cart: ShopifyCart | null }>(`
    query Cart($cartId: ID!) {
      cart(id: $cartId) { ${CART_FIELDS} }
    }
  `, { cartId })
  return data.cart
}

// ── Utility ───────────────────────────────────────────────────────────────────

/** Convert Shopify amount string to formatted GBP */
export function formatPrice(amount: string, currency = 'GBP'): string {
  return new Intl.NumberFormat('en-GB', { style: 'currency', currency }).format(parseFloat(amount))
}

/** Extract the first product image URL, or undefined */
export function getProductImage(product: ShopifyProduct): string | undefined {
  return product.images.edges[0]?.node.url
}

/** Get a wood species tag from Shopify product tags (tag format: "wood:Oak") */
export function getWoodTag(product: ShopifyProduct): string {
  const woodTag = product.tags.find(t => t.startsWith('wood:'))
  return woodTag ? woodTag.replace('wood:', '') : 'Hardwood'
}
