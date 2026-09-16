import React from 'react'
import { motion } from 'framer-motion'
import { X } from 'lucide-react'

export default function ProductModal({ product, onClose }) {
  if (!product) return null

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-md"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`${product.name} profile`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
    >
      <motion.div
        className="premium-modal relative grid max-h-[90vh] w-full max-w-4xl overflow-hidden rounded-[28px] border border-white/20 bg-[#050505] text-white shadow-2xl md:grid-cols-[0.86fr_1fr]"
        onClick={(event) => event.stopPropagation()}
        initial={{ opacity: 0, y: 28, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.96 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="premium-modal-media relative flex min-h-[300px] items-center justify-center overflow-hidden border-b border-white/10 bg-[#030303] p-8 md:border-b-0 md:border-r">
          {product.image ? (
            <img src={product.image} alt={product.name} className="relative z-10 h-72 w-auto object-contain drop-shadow-[0_20px_35px_rgba(0,0,0,0.8)]" />
          ) : (
            <div className="flex h-64 w-44 items-center justify-center rounded-md border border-white/20 bg-white/10 font-serif text-3xl font-black uppercase text-white">
              NTS
            </div>
          )}
        </div>

        <div className="overflow-y-auto bg-[#050505] p-7 text-white sm:p-9">
          <button
            type="button"
            onClick={onClose}
            className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-[#E9542E] hover:text-white"
            aria-label="Close product profile"
          >
            <X className="h-5 w-5" />
          </button>

          <span className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-[#E9542E]">
            {product.category} / {product.style}
          </span>
          <h2 className="mt-3 pr-12 font-serif text-2xl font-black uppercase leading-tight tracking-tight text-white sm:text-3xl">
            {product.name}
          </h2>
          <p className="mt-4 font-sans text-sm font-medium leading-relaxed text-white/80">
            {product.description || product.tagline}
          </p>
          <div className="mt-6 grid grid-cols-2 gap-3">
            <div className="rounded-xl border border-white/10 bg-white/5 p-4">
              <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-white/60">Specification</span>
              <p className="mt-1 font-serif text-2xl font-black text-white">{product.abv}</p>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/5 p-4">
              <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-white/60">Category</span>
              <p className="mt-1 font-serif text-2xl font-black text-white">{product.category}</p>
            </div>
          </div>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href="/contact"
              onClick={onClose}
              className="magnetic-cta inline-flex rounded-full bg-[#E9542E] px-8 py-3.5 font-sans text-xs font-black uppercase tracking-widest text-white transition-colors hover:bg-white hover:text-[#030303]"
            >
              Contact NTS →
            </a>
            <a
              href={`mailto:md@ntsdistillers.com?subject=Product details for ${encodeURIComponent(product.name)}`}
              className="inline-flex rounded-full border border-white/20 px-6 py-3.5 font-sans text-xs font-bold uppercase tracking-widest text-white hover:bg-white/10"
            >
              Email Specs
            </a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
