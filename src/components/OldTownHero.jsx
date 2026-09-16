import React from 'react'
import { motion } from 'framer-motion'
import { ChevronRight, Menu, X } from 'lucide-react'

export default function OldTownHero({ onOpenMenu, isMenuOpen }) {
  return (
    <section
      className="relative w-full min-h-[100vh] bg-black text-white overflow-hidden flex flex-col justify-between select-none"
      id="top"
      data-od-id="jack-daniels-style-hero"
    >
      {/* 1. Top Navigation Bar (Exact match to reference style) */}
      <header className="relative z-40 w-full px-6 py-5 sm:px-12 lg:px-16">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between">
          
          {/* Left Navigation Links */}
          <nav className="hidden lg:flex items-center gap-10 text-[11px] font-extrabold uppercase tracking-[0.25em] text-white/80" aria-label="Left Header Navigation">
            <a href="#flavors" className="transition-colors hover:text-white">OUR SPIRITS</a>
            <a href="#legacy" className="transition-colors hover:text-white">DISTILLERY</a>
            <a href="#about-us" className="transition-colors hover:text-white">ABOUT US</a>
          </nav>

          {/* Center Brand Crest (Exact reference placement) */}
          <a href="#top" className="flex items-center justify-center group" aria-label="NTS Distillers Home">
            <div className="flex flex-col items-center">
              <div className="flex h-12 w-12 items-center justify-center transition-transform duration-300 group-hover:scale-105">
                <img src="/logo.png" alt="NTS Crest" className="h-full w-full object-contain" />
              </div>
              <span className="font-serif text-[10px] font-black uppercase tracking-[0.25em] text-white/90 mt-1">
                NTS DISTILLERS
              </span>
            </div>
          </a>

          {/* Right Navigation Links */}
          <nav className="hidden lg:flex items-center gap-10 text-[11px] font-extrabold uppercase tracking-[0.25em] text-white/80" aria-label="Right Header Navigation">
            <a href="#legacy" className="transition-colors hover:text-white">TRACK RECORD</a>
            <a href="/contact" className="transition-colors hover:text-[#E9542E]">CONTACT</a>
          </nav>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={onOpenMenu}
            className="lg:hidden flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white hover:bg-white/20"
            aria-label="Toggle navigation menu"
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </header>

      {/* 2. Giant Vertical Watermark on Left Margin (Matching reference image) */}
      <div className="absolute left-0 top-0 bottom-0 w-36 pointer-events-none hidden md:flex items-center justify-center z-0 overflow-hidden">
        <span
          className="font-serif text-[clamp(4.5rem,8vw,7.5rem)] font-black uppercase tracking-tight text-white/[0.06] select-none whitespace-nowrap -rotate-90 origin-center"
          style={{ fontFamily: 'var(--font-jd-display)' }}
        >
          NTS BLENDERS
        </span>
      </div>

      {/* 3. Main Stage: Giant Centered Typography & Foreground Old Town Bottle */}
      <div className="relative z-10 mx-auto flex w-full max-w-[1440px] flex-1 items-center justify-center px-4 py-2 sm:px-8">
        
        {/* Giant Centered 3-Row Typography (Exact scale & alignment behind bottle) */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none select-none z-0">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="w-full flex flex-col items-center justify-center font-serif font-black uppercase text-white"
            style={{ fontFamily: 'var(--font-jd-display)' }}
          >
            {/* Line 1: OLD */}
            <span className="text-[clamp(4.5rem,15vw,13rem)] leading-[0.82] tracking-normal block text-white drop-shadow-[0_10px_30px_rgba(0,0,0,0.9)]">
              OLD
            </span>

            {/* Line 2: TOWN */}
            <span className="text-[clamp(4.5rem,15vw,13rem)] leading-[0.82] tracking-normal block text-white drop-shadow-[0_10px_30px_rgba(0,0,0,0.9)] mt-[-1vw]">
              TOWN
            </span>

            {/* Line 3: MALT on Left, NO. 1 on Right (Cut cleanly by center bottle) */}
            <div className="w-full max-w-5xl flex items-center justify-between px-6 sm:px-16 mt-[-1vw]">
              <span className="text-[clamp(3.5rem,11vw,9.5rem)] leading-[0.85] tracking-normal text-white drop-shadow-[0_10px_30px_rgba(0,0,0,0.9)]">
                MALT
              </span>
              <span className="text-[clamp(3.5rem,11vw,9.5rem)] leading-[0.85] tracking-normal text-white drop-shadow-[0_10px_30px_rgba(0,0,0,0.9)]">
                NO. 1
              </span>
            </div>
          </motion.div>
        </div>

        {/* Centerpiece Bottle: Old Town Malt Whisky standing proudly in the dead center */}
        <div className="relative z-20 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 35, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="relative flex items-center justify-center"
          >
            {/* Subtle Amber Glow behind bottle */}
            <div className="absolute inset-0 rounded-full bg-white/5 blur-[75px] pointer-events-none" />

            <img
              src="/portfolio-images/old-town.png"
              alt="Old Town Indian Blended Malt Whisky"
              className="h-[72vh] sm:h-[82vh] lg:h-[90vh] xl:h-[96vh] max-h-[920px] w-auto object-contain drop-shadow-[0_30px_60px_rgba(0,0,0,0.98)] transition-transform duration-500 hover:scale-105 cursor-pointer"
            />

            {/* Realistic Floor Shadow */}
            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-64 sm:w-80 h-8 rounded-full bg-black/95 blur-md pointer-events-none" />
          </motion.div>
        </div>

      </div>

      {/* 4. Bottom Row: "EXPLORE OUR PRODUCTS >" on Left, Trademark Seal in Corner */}
      <footer className="relative z-30 w-full px-6 py-6 sm:px-12 lg:px-16">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between">
          
          {/* Left CTA: "EXPLORE OUR PRODUCTS >" (Exact match to reference) */}
          <a
            href="#flavors"
            className="group inline-flex items-center gap-2 font-mono text-xs sm:text-sm font-bold uppercase tracking-[0.25em] text-white/90 transition-all hover:text-[#E9542E]"
            data-od-id="explore-products-link"
          >
            <span>EXPLORE OUR PRODUCTS</span>
            <span className="text-white/60 group-hover:text-[#E9542E] group-hover:translate-x-1 transition-transform">
              &gt;
            </span>
          </a>

          {/* Right Indicator / Scroll Prompt */}
          <a
            href="#legacy"
            className="hidden sm:flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.2em] text-white/60 hover:text-white transition-colors"
          >
            <span>DISCOVER DISTILLERY</span>
            <span className="inline-block w-8 h-[1px] bg-white/40" />
          </a>
        </div>
      </footer>
    </section>
  )
}
