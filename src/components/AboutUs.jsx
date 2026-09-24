import React, { useRef } from 'react'
import ClipReveal from './motion/ClipReveal'
import Reveal from './motion/Reveal'
import { useScrub } from './motion/useScrub'

export default function AboutUs() {
  const sectionRef = useRef(null)

  // The photo settles from 1.18x to 1x as the section scrolls through the viewport.
  useScrub(sectionRef, ({ gsap, mobile }) => {
    gsap.fromTo(
      '[data-about-image]',
      { scale: mobile ? 1.1 : 1.18 },
      {
        scale: 1,
        ease: 'none',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 85%', end: 'center 45%', scrub: true },
      }
    )
  })

  return (
    <section
      ref={sectionRef}
      id="about-us"
      className="relative w-full overflow-hidden bg-[#030303] py-16 sm:py-24 lg:py-28 text-white border-t border-white/10"
      data-od-id="about-us-section"
    >
      <div className="relative z-10 mx-auto w-full max-w-[1400px] px-4 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">

          {/* Left Column: Image Showcase with Subtle Depth Shadow */}
          <div className="mx-auto flex w-full max-w-lg items-center justify-center lg:col-span-6">
            <ClipReveal className="relative group w-full overflow-hidden rounded-[2.5rem]">
              <img
                data-about-image
                src="/images/about-nts-bottle-collection.jpeg"
                alt="NTS Blenders and Distillers premium spirits collection"
                loading="lazy"
                decoding="async"
                className="relative h-auto w-full rounded-[2.5rem] border border-white/15 object-cover shadow-2xl"
              />
            </ClipReveal>
          </div>

          {/* Right Column: About Us Header & Combined Story/Timeline Narrative */}
          <div className="space-y-6 lg:col-span-6">
            <div className="space-y-2">
              <span className="font-mono text-xs font-bold uppercase tracking-[0.22em] text-[#E9542E] bg-white/5 border border-white/10 px-3.5 py-1.5 rounded-full inline-block">
                ABOUT US
              </span>
              <Reveal
                as="h2"
                className="font-serif text-3xl font-black uppercase leading-[1.02] tracking-tight text-white sm:text-4xl lg:text-[44px]"
              >
                From NTS Wines to Goa Manufacturing
              </Reveal>
            </div>

            {/* Combined Narrative Paragraphs */}
            <div className="space-y-4 font-sans text-sm sm:text-[15px] font-medium leading-relaxed text-white/85">
              <Reveal as="p" variant="lines">
                NTS began in 1980 in Pondicherry as <strong>NTS Wines</strong> under <strong>Mr. N.T. Sambath</strong>. The company grew through decades of IMFL and beer distribution work across established beverage portfolios and regional trade channels.
              </Reveal>
              <Reveal as="p" variant="lines" delay={0.1}>
                Today the business is anchored by a manufacturing unit at <strong>Canacona Industrial Estate, Goa</strong>, with owned semi-premium labels including Old Town, East Coast, and Wanted 999 expressions.
              </Reveal>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
