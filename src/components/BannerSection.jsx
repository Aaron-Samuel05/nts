import React from 'react'

const heroImage = '/banner/east-coast-bottle-lineup-hero-desktop.png'

export default function BannerSection() {
  return (
    <section
      className="relative h-[72vh] min-h-[560px] w-full overflow-hidden bg-[#030303] text-white sm:h-[78vh] md:h-[82vh] lg:h-[86vh] lg:max-h-[920px]"
      id="top"
      data-od-id="hero-single-image"
      aria-labelledby="home-hero-title"
    >
      <div className="absolute inset-0" data-parallax-speed="-0.08" data-parallax-scale="1.04">
        <picture className="block h-full w-full">
          <source media="(max-width: 1100px)" srcSet="/banner/east-coast-bottle-lineup-hero-mobile.png" />
          <img
            src={heroImage}
            alt="NTS Distillers bottle lineup on a table"
            className="h-full w-full object-cover object-center"
            loading="eager"
          />
        </picture>
      </div>

      <div className="hero-vertical-shade pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.2)_0%,rgba(0,0,0,0)_38%,rgba(255,255,255,0.12)_100%)]" />

      <div className="home-hero-content relative z-10 flex h-full items-center px-4 py-10 sm:px-8 sm:py-14 lg:px-12 lg:py-16">
        <div className="home-hero-copy max-w-[860px]">
          <p className="home-hero-kicker font-mono text-[10px] font-black uppercase tracking-[0.28em] text-[#E9542E] sm:text-xs">
            <span>Goa manufacturing / proprietary</span>
            <span>IMFL brands</span>
          </p>
          <h1
            id="home-hero-title"
            className="mt-4 max-w-[10.8ch] font-serif text-[clamp(3.4rem,8.2vw,8.9rem)] font-black uppercase leading-[0.86] tracking-normal text-white drop-shadow-[0_14px_34px_rgba(0,0,0,0.42)]"
          >
            <span className="hero-title-line">NTS</span>
            <span className="hero-title-line hero-title-line--blenders">Blenders,</span>
            <span className="hero-title-line hero-title-line--pour">Built to Pour</span>
          </h1>
          <p className="hero-intro">
            <span>Goa production and contract bottling.</span>
            <span>Whisky, brandy, rum and vodka labels.</span>
          </p>
        </div>
      </div>
    </section>
  )
}
