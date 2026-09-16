import React from 'react'
import { motion } from 'framer-motion'

export default function ShowcaseBanner() {
  return (
    <section
      className="relative w-full overflow-hidden bg-[#030303] py-8 sm:py-14 border-t border-white/10"
      data-od-id="partner-showcase-banner"
    >
      <div className="relative z-10 mx-auto w-full max-w-[1440px] px-4 sm:px-8 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="group relative overflow-hidden rounded-[2rem] sm:rounded-[2.8rem] border border-white/15 bg-[#050505] shadow-[0_30px_90px_rgba(0,0,0,0.9)]"
        >
          <img
            src="/banner/banner-4.png"
            alt="NTS Blenders & Distillers Premium Lineup"
            loading="lazy"
            decoding="async"
            className="w-full h-auto max-h-[720px] object-cover object-center transition-transform duration-700 group-hover:scale-[1.02]"
          />
          {/* Subtle luxury ambient vignette overlay */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#030303]/60 via-transparent to-[#030303]/20" />
        </motion.div>
      </div>
    </section>
  )
}
