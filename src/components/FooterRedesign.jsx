import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Instagram, Mail, Phone, ArrowUpRight, MapPin, ShieldCheck } from 'lucide-react'
import { companyFacts } from '../data/siteData'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const FOOTER_MARQUEE_ITEMS = [
  'GOA PRODUCTION AND CONTRACT BOTTLING',
  'PROPRIETARY DISTILLATION',
  'WHISKY',
  'BRANDY',
  'RUM',
  'VODKA',
]

export default function FooterRedesign() {
  const footerRef = useRef(null)
  const marqueeItems = [...FOOTER_MARQUEE_ITEMS, ...FOOTER_MARQUEE_ITEMS, ...FOOTER_MARQUEE_ITEMS, ...FOOTER_MARQUEE_ITEMS]

  // Curtain reveal: the footer rises into view (clip-path from fully hidden to fully shown)
  // as it enters the viewport, instead of just appearing at its final position.
  useEffect(() => {
    if (typeof window === 'undefined' || !footerRef.current) return
    const ctx = gsap.context(() => {
      gsap.fromTo(
        footerRef.current,
        { clipPath: 'inset(100% 0% 0% 0%)' },
        {
          clipPath: 'inset(0% 0% 0% 0%)',
          ease: 'power2.out',
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 92%',
            end: 'top 55%',
            scrub: 0.6,
          },
        }
      )
    }, footerRef)

    // The page has lazy-loaded images below the fold; as they load in, everything above the
    // footer grows taller and shifts where it actually sits, but ScrollTrigger only measured
    // positions once at mount. Re-measure whenever the document's height changes so the curtain
    // stays in sync with the real scroll position instead of drifting (revealing too early/late).
    const resizeObserver = new ResizeObserver(() => ScrollTrigger.refresh())
    resizeObserver.observe(document.body)

    return () => {
      ctx.revert()
      resizeObserver.disconnect()
    }
  }, [])

  return (
    <footer
      ref={footerRef}
      className="relative w-full overflow-hidden bg-[#000] text-white"
      aria-label="Site footer"
      id="footer"
    >
      {/* Reveal marquee: the first thing that rises into view */}
      <div className="w-full overflow-hidden border-b border-white/15 bg-[#E9542E] py-3">
        <div className="inline-flex min-w-max animate-marquee items-center whitespace-nowrap motion-reduce:animate-none">
          {marqueeItems.map((item, index) => (
            <span
              key={`${item}-${index}`}
              className="inline-flex items-center font-sans text-[11px] font-black uppercase tracking-[0.18em] text-white"
            >
              <span className="mx-8 inline-block h-1.5 w-1.5 rounded-full bg-white/80" aria-hidden="true" />
              {item}
            </span>
          ))}
        </div>
      </div>

      <div className="px-5 py-12 sm:px-8 sm:py-16 lg:px-14 lg:py-20">
        <div className="relative z-10 mx-auto w-full max-w-[1440px]">
          <div className="relative flex min-h-[560px] flex-col justify-between border-t border-white/20 pt-9 sm:pt-12">

            {/* 1. Top Section: Tagline on Left, Pill Contact Button on Right */}
          <div className="flex flex-col items-start justify-between gap-7 border-b border-white/15 pb-9 sm:flex-row sm:items-center sm:pb-12">
            <div>
              <h2 className="max-w-xl font-serif text-[clamp(2rem,4.4vw,4.9rem)] font-black uppercase leading-[0.92] tracking-normal text-white">
                Your distillation &amp;<br className="hidden sm:block" /> contract bottling partner
              </h2>
            </div>

            <div>
              <a
                href="/contact"
                className="group inline-flex min-h-12 items-center justify-center rounded-full border border-white/55 bg-transparent px-8 font-sans text-xs font-black uppercase tracking-[0.16em] text-white transition-all duration-300 hover:border-[#E9542E] hover:bg-[#E9542E] active:scale-95 sm:px-10"
              >
                <span>Contact</span>
              </a>
            </div>
          </div>

          {/* 2. Middle Section: Navigation, Services, Social Pill Badges & Facility Badge */}
          <div className="grid grid-cols-2 gap-x-8 gap-y-10 py-10 sm:py-14 md:grid-cols-4 lg:gap-x-16">
            
            {/* Column 1: Services */}
            <div className="space-y-4">
              <h3 className="font-mono text-[11px] font-black uppercase tracking-[0.18em] text-white">
                Services
              </h3>
              <ul className="space-y-2.5 font-sans text-xs font-bold text-white/58 sm:text-sm">
                <li><a href="/contact" className="transition-colors hover:text-[#E9542E]">Contract Bottling</a></li>
                <li><a href="/distillery" className="transition-colors hover:text-[#E9542E]">Production Support</a></li>
                <li><a href="/distillery" className="transition-colors hover:text-[#E9542E]">Bonded Warehousing</a></li>
                <li><a href="/contact" className="transition-colors hover:text-[#E9542E]">Private Label Distillation</a></li>
              </ul>
            </div>

            {/* Column 2: Explore */}
            <div className="space-y-4">
              <h3 className="font-mono text-[11px] font-black uppercase tracking-[0.18em] text-white">
                Explore
              </h3>
              <ul className="space-y-2.5 font-sans text-xs font-bold text-white/58 sm:text-sm">
                <li><a href="/products" className="transition-colors hover:text-[#E9542E]">Proprietary Brands</a></li>
                <li><a href="/distillery" className="transition-colors hover:text-[#E9542E]">Goa Distillery</a></li>
                <li><a href="/about" className="transition-colors hover:text-[#E9542E]">About Us</a></li>
                <li><a href="/achievements" className="transition-colors hover:text-[#E9542E]">Achievements</a></li>
                <li><a href="/faq" className="transition-colors hover:text-[#E9542E]">FAQ</a></li>
              </ul>
            </div>

            {/* Column 3: Say Hello! Pill Badges */}
            <div className="space-y-4 col-span-2 sm:col-span-1">
              <h3 className="font-mono text-[11px] font-black uppercase tracking-[0.18em] text-white">
                Say hello!
              </h3>
              <div className="flex flex-col gap-2">
                <a
                  href={`mailto:${companyFacts.email}`}
                  className="inline-flex w-fit items-center gap-2 font-mono text-[11px] font-bold text-white/75 transition-colors hover:text-[#E9542E]"
                >
                  <Mail className="h-3.5 w-3.5 text-[#E9542E]" />
                  <span>{companyFacts.email}</span>
                </a>

                <a
                  href={`mailto:${companyFacts.salesEmail}`}
                  className="inline-flex w-fit items-center gap-2 font-mono text-[11px] font-bold text-white/75 transition-colors hover:text-[#E9542E]"
                >
                  <Mail className="h-3.5 w-3.5 text-[#E9542E]" />
                  <span>{companyFacts.salesEmail}</span>
                </a>

                <a
                  href="tel:8925523801"
                  className="inline-flex w-fit items-center gap-2 font-mono text-[11px] font-bold text-white/75 transition-colors hover:text-[#E9542E]"
                >
                  <Phone className="h-3.5 w-3.5 text-[#E9542E]" />
                  <span>{companyFacts.whatsapp}</span>
                </a>

                <a
                  href="tel:8925599592"
                  className="inline-flex w-fit items-center gap-2 font-mono text-[11px] font-bold text-white/75 transition-colors hover:text-[#E9542E]"
                >
                  <Phone className="h-3.5 w-3.5 text-[#E9542E]" />
                  <span>{companyFacts.exportWhatsapp}</span>
                </a>

                <a
                  href={companyFacts.instagramUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex w-fit items-center gap-2 font-mono text-[11px] font-bold text-white/75 transition-colors hover:text-[#E9542E]"
                >
                  <Instagram className="h-3.5 w-3.5 text-[#E9542E]" />
                  <span>{companyFacts.instagram}</span>
                </a>

                <div className="inline-flex w-fit items-center gap-2 font-mono text-[11px] font-bold text-white/75">
                  <MapPin className="h-3.5 w-3.5 text-[#E9542E]" />
                  <span>Canacona, Goa &amp; Pondicherry</span>
                </div>
              </div>
            </div>

            {/* Column 4: Quality & Compliance Preview Card */}
            <div className="space-y-4 col-span-2 sm:col-span-1">
              <a
                href="/distillery"
                className="group flex items-center gap-1.5 font-mono text-[11px] font-black uppercase tracking-[0.18em] text-white transition-colors hover:text-[#E9542E]"
              >
                <span>Quality Standards</span>
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>

              <div className="border-l-2 border-[#E9542E] pl-4">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.08em] text-white">
                  <ShieldCheck className="h-4 w-4 text-[#E9542E] shrink-0" />
                  <span>Goa Excise Listed Facility</span>
                </div>
                <p className="mt-1.5 font-sans text-[11px] leading-relaxed text-white/60">
                  Public Goa Excise information lists NTS Blenders and Distillers Private Limited under Canacona.
                </p>
              </div>
            </div>

          </div>

          {/* 3. Bottom Hero Wordmark (Giant Typography matching "faizur" style) */}
          <div className="pt-6 sm:pt-10 overflow-hidden select-none">
            <div className="w-full text-center">
              <p className="font-serif text-[clamp(3.2rem,10.5vw,13rem)] font-black uppercase leading-[0.84] tracking-normal text-white transition-all" aria-label="NTS Blenders and Distillers">
                <span className="block">NTS</span>
                <span className="block">Blenders &amp;</span>
                <span className="block">Distillers</span>
              </p>
            </div>

            {/* Sub-bar Copyright & Legal */}
            <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-white/15 pt-6 font-sans text-xs font-bold text-white/50 sm:flex-row">
              <p>© {new Date().getFullYear()} NTS Blenders and Distillers Pvt. Ltd. All rights reserved.</p>
              <div className="flex flex-wrap items-center gap-4">
                <button
                  onClick={() => {
                    localStorage.removeItem('nts_jd_age_verified')
                    sessionStorage.removeItem('nts_jd_age_verified')
                    localStorage.removeItem('nts_distillers_age_verified')
                    window.dispatchEvent(new Event('reopen-age-gate'))
                  }}
                  className="rounded-full border border-white/30 bg-transparent px-3 py-1 text-[11px] text-white/70 transition-all hover:bg-white hover:text-black"
                >
                  Age Check
                </button>
                <span>•</span>
                <a href="/privacy" className="hover:text-white transition-colors">Privacy Policy</a>
                <span>•</span>
                <a href="/terms" className="hover:text-white transition-colors">Terms of Service</a>
                <span>•</span>
                <a href="/cookie-policy" className="hover:text-white transition-colors">Cookie Policy</a>
                <span>•</span>
                <a href="/responsible-drinking" className="hover:text-white transition-colors">Responsible Drinking</a>
                <span>•</span>
                <a href="#top" className="hover:text-white transition-colors">Back to Top ↑</a>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    </footer>
  )
}
