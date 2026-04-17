import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = { title: 'About' }

export default function AboutPage() {
  return (
    <>
      <div className="bg-bark relative overflow-hidden py-20 px-6 text-center">
        <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 3px, rgba(160,98,42,1) 3px, rgba(160,98,42,1) 6px)' }} />
        <div className="relative z-10">
          <span className="section-label text-grain">Our story</span>
          <h1 className="text-white max-w-2xl mx-auto">Built by hand. Designed to outlast us all.</h1>
        </div>
      </div>

      <div className="max-w-[800px] mx-auto px-6 py-16 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div>
            <span className="section-label">Who we are</span>
            <h2 className="font-display text-3xl font-bold text-bark mb-4">A small workshop. A big obsession.</h2>
            <p className="text-oak leading-relaxed mb-4">Woodcraft started in a single-car garage in 2007. Today we work from a proper workshop in the Yorkshire Dales, but the ethos hasn&apos;t changed — every piece is still made by hand, to order, by the same small team.</p>
            <p className="text-oak leading-relaxed">We work exclusively in hardwoods sourced from certified sustainable forestry. No veneers. No particle board. No shortcuts.</p>
          </div>
          <div className="aspect-square rounded-xl bg-flax flex items-center justify-center">
            <div className="text-center">
              <svg width="60" height="60" viewBox="0 0 80 80" fill="none" stroke="#A0622A" strokeWidth="1.2" opacity="0.4">
                <rect x="10" y="20" width="60" height="45" rx="2"/>
                <path d="M10 30h60"/><path d="M25 20V10h30v10"/>
              </svg>
              <p className="font-ui text-[0.65rem] tracking-widest uppercase text-grain/40 mt-3">Workshop photo</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-10 border-y border-bark/10">
          {[['18+','Years'],['2,400','Pieces made'],['100%','Hardwood'],['50yr','Guarantee']].map(([num, label]) => (
            <div key={label} className="text-center">
              <div className="font-display text-4xl font-bold text-grain">{num}</div>
              <div className="font-ui text-xs tracking-widest uppercase text-oak mt-1">{label}</div>
            </div>
          ))}
        </div>

        <div>
          <span className="section-label">Our process</span>
          <h2 className="font-display text-3xl font-bold text-bark mb-6">From tree to table</h2>
          <div className="space-y-6">
            {[
              { step: '01', title: 'Timber selection', body: 'We source from a handful of trusted mills. Every board is hand-picked for grain, figure, and moisture content.' },
              { step: '02', title: 'Joinery', body: 'All structural joints are cut by hand — mortise and tenon, dovetail, or dado depending on the piece. No biscuits, no dowels, no pocket screws.' },
              { step: '03', title: 'Fitting and assembly', body: 'Each component is dry-fitted, adjusted, and test-assembled before final glue-up. We&apos;d rather catch a problem before the glue goes in.' },
              { step: '04', title: 'Finishing', body: 'We use Danish oil, hard wax, or beeswax depending on the piece. No spray lacquers. Every surface is hand-rubbed.' },
            ].map(({ step, title, body }) => (
              <div key={step} className="flex gap-6 p-6 bg-flax rounded-lg border border-bark/8">
                <div className="font-display text-3xl font-bold text-grain/30 flex-shrink-0 leading-none mt-1">{step}</div>
                <div>
                  <h3 className="font-display text-lg font-bold text-bark mb-1">{title}</h3>
                  <p className="text-oak text-sm leading-relaxed">{body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center py-10">
          <h2 className="font-display text-3xl font-bold text-bark mb-4">Ready to commission a piece?</h2>
          <p className="text-oak mb-8 max-w-md mx-auto">We take on custom commissions alongside our standard range. Tell us what you have in mind.</p>
          <Link href="/contact" className="btn btn-primary">Get in touch</Link>
        </div>
      </div>
    </>
  )
}
