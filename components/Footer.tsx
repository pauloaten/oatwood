import Link from 'next/link'
import NewsletterForm from './NewsletterForm'

const SHOP_LINKS = [
  { href: '/shop',          label: 'All products'  },
  { href: '/shop/tables',   label: 'Tables'        },
  { href: '/shop/chairs',   label: 'Chairs & benches' },
  { href: '/shop/storage',  label: 'Storage'       },
  { href: '/custom',        label: 'Custom orders' },
]
const INFO_LINKS = [
  { href: '/about',     label: 'About us'     },
  { href: '/workshop',  label: 'The workshop' },
  { href: '/journal',   label: 'Journal'      },
  { href: '/contact',   label: 'Contact'      },
]
const HELP_LINKS = [
  { href: '/delivery',  label: 'Delivery & returns' },
  { href: '/care',      label: 'Care guide'         },
  { href: '/warranty',  label: 'Warranty'           },
  { href: '/privacy',   label: 'Privacy policy'     },
]

export default function Footer() {
  return (
    <>
      {/* Newsletter */}
      <section className="bg-flax border-t border-bark/10 py-16 px-6">
        <div className="max-w-lg mx-auto text-center">
          <span className="section-label">Stay in the loop</span>
          <h2 className="font-display text-3xl font-bold text-bark mb-2">The Woodcraft Journal</h2>
          <p className="font-body italic text-oak mb-6">Build tips, new pieces, and the occasional story from the workshop.</p>
          <NewsletterForm />
        </div>
      </section>

      <footer className="bg-char text-flax pt-14 pb-5 px-6" role="contentinfo">
        <div className="max-w-site mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 pb-10 border-b border-flax/[0.08]">

            {/* Brand */}
            <div>
              <p className="font-display text-2xl font-bold text-flax mb-3">
                Wood<span className="text-grain">craft</span>
              </p>
              <p className="text-sm text-flax/50 max-w-[220px] leading-relaxed">
                Small-batch furniture made by hand in our Yorkshire workshop.
              </p>
              <div className="flex gap-2 mt-5">
                {[
                  <><rect x="3" y="3" width="14" height="14" rx="4"/><circle cx="10" cy="10" r="3"/><circle cx="14.5" cy="5.5" r="0.5" fill="currentColor" stroke="none"/></>,
                  <><path d="M14 3h-2a4 4 0 0 0-4 4v2H6v3h2v6h3v-6h2l1-3h-3V7a1 1 0 0 1 1-1h2z"/></>,
                  <><rect x="2" y="5" width="16" height="11" rx="2"/><polygon points="8,8 13,10.5 8,13" fill="currentColor" stroke="none"/></>,
                ].map((icon, i) => (
                  <a key={i} href="#" className="w-8 h-8 rounded bg-flax/[0.07] flex items-center justify-center text-flax/70 hover:bg-grain hover:text-white transition-all">
                    <svg width="13" height="13" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">{icon}</svg>
                  </a>
                ))}
              </div>
            </div>

            {/* Nav cols */}
            {[
              { title: 'Shop',  links: SHOP_LINKS },
              { title: 'Info',  links: INFO_LINKS },
              { title: 'Help',  links: HELP_LINKS },
            ].map(col => (
              <div key={col.title}>
                <h4 className="font-ui text-[0.68rem] font-bold tracking-[0.12em] uppercase text-grain mb-4">{col.title}</h4>
                <ul className="space-y-2">
                  {col.links.map(({ href, label }) => (
                    <li key={href}>
                      <Link href={href} className="text-sm text-flax/50 hover:text-flax transition-colors">
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 pt-5 font-ui text-xs text-flax/30">
            <p>&copy; {new Date().getFullYear()} Woodcraft. All rights reserved.</p>
            <p>Crafted with care. Built to last.</p>
          </div>
        </div>
      </footer>
    </>
  )
}
