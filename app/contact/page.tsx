import type { Metadata } from 'next'
import ContactForm from '@/components/ContactForm'

export const metadata: Metadata = { title: 'Contact' }

export default function ContactPage() {
  return (
    <>
      <div className="bg-flax border-b border-bark/10 py-14 px-6">
        <div className="max-w-site mx-auto">
          <span className="section-label">Get in touch</span>
          <h1 className="font-display text-5xl font-bold text-bark">Contact us</h1>
        </div>
      </div>

      <div className="max-w-site mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div>
          <h2 className="font-display text-2xl font-bold text-bark mb-6">Send us a message</h2>
          <ContactForm />
        </div>

        <div className="space-y-8">
          <div>
            <h2 className="font-display text-2xl font-bold text-bark mb-6">Find us</h2>
            <div className="space-y-4">
              {[
                { label: 'Workshop',       value: 'Mill Lane, Grassington, North Yorkshire, BD23 5AT' },
                { label: 'Email',          value: 'hello@woodcraft.co.uk' },
                { label: 'Phone',          value: '01756 740 123' },
                { label: 'Workshop hours', value: 'Mon–Fri 8am–5pm. Visits by appointment only.' },
              ].map(({ label, value }) => (
                <div key={label} style={{ display: 'flex', gap: '1rem', padding: '1rem', background: '#E8D5B0', borderRadius: 8, border: '1px solid rgba(44,26,14,0.08)' }}>
                  <div>
                    <p style={{ fontFamily: 'var(--font-dm-sans)', fontSize: '0.68rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#A0622A', marginBottom: 2 }}>{label}</p>
                    <p style={{ fontSize: '0.9rem', color: '#2C1A0E' }}>{value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ background: '#2C1A0E', borderRadius: 8, padding: '1.5rem', color: '#E8D5B0' }}>
            <h3 className="font-display text-lg font-bold mb-2">Custom commissions</h3>
            <p style={{ color: 'rgba(232,213,176,0.7)', fontSize: '0.875rem', lineHeight: 1.7, marginBottom: '1rem' }}>Have something specific in mind? We love a challenge. Send us your sketches, dimensions, and timber preferences — we&apos;ll come back with a quote within 5 working days.</p>
            <div style={{ fontFamily: 'var(--font-dm-sans)', fontSize: '0.72rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#A0622A' }}>Lead time: 6–10 weeks from deposit</div>
          </div>
        </div>
      </div>
    </>
  )
}
