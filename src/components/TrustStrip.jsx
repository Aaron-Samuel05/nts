import React from 'react'

const trustItems = [
  ['Heritage Legacy', 'ESTD 1980'],
  ['Distillery Location', 'Goa, India'],
  ['Quality Standard', 'FDA Compliant'],
  ['Industrial Scale', 'Export Certified'],
]

export default function TrustStrip() {
  return (
    <section className="relative z-10 w-full border-y border-maroon/20 bg-bg-maroon py-6 text-cream">
      <div className="mx-auto grid max-w-[1280px] grid-cols-2 gap-x-3 gap-y-6 px-4 text-center text-cream/80 sm:px-12 md:grid-cols-4">
        {trustItems.map(([label, value], index) => (
          <div
            key={label}
            className={`space-y-1 ${index > 0 ? 'border-l border-white/5' : ''} ${index === 2 ? 'md:border-l' : ''}`}
          >
            <span className="block font-sans text-[10px] font-bold uppercase tracking-widest text-coral-orange">
              {label}
            </span>
            <span className="font-serif text-lg font-bold text-cream">{value}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
