import React from 'react'

const heroImage = '/banner/east-coast-bottle-lineup-hero-desktop.png'

const HeroMeta = ({ eyebrow, title, body, children }) => (
  <div className="nts-hero-meta">
    <span className="nts-hero-meta__eyebrow">{eyebrow}</span>
    <strong>{title}</strong>
    <small>{body}</small>
    {children}
  </div>
)

export default function BannerSection() {
  return (
    <section
      className="nts-hero"
      id="top"
      data-od-id="hero-single-image"
      aria-labelledby="home-hero-title"
    >
      <div className="nts-hero__media" aria-hidden="true">
        <picture>
          <source media="(max-width: 1100px)" srcSet="/banner/east-coast-bottle-lineup-hero-mobile.png" />
          <img
            src={heroImage}
            alt=""
            loading="eager"
          />
        </picture>
      </div>

      <div className="nts-hero__vignette" aria-hidden="true" />
      <div className="nts-hero__warmth" aria-hidden="true" />

      <div className="nts-hero__content">
        <div className="nts-hero__copy">
          <p className="nts-hero__kicker">
            GOA MANUFACTURING <span>/</span> PROPRIETARY
            <br />
            IMFL BRANDS
          </p>

          <h1 id="home-hero-title">
            <span>NTS</span>
            <span>BLENDERS <em>&amp;</em></span>
            <span className="accent">DISTILLERS</span>
          </h1>

          <p className="nts-hero__intro">
            Goa-based manufacturing.
            <br />
            Contract bottling. Proprietary spirits.
          </p>

          <p className="nts-hero__categories">
            WHISKY <i /> BRANDY <i /> RUM <i /> VODKA
          </p>

          <div className="nts-hero__actions">
            <a className="nts-hero__button nts-hero__button--primary" href="#flavors">
              EXPLORE OUR BRANDS <span>→</span>
            </a>
            <a className="nts-hero__button nts-hero__button--ghost" href="/distillery">
              OUR CAPABILITIES <span>→</span>
            </a>
          </div>
        </div>

        <div className="nts-hero__meta">
          <HeroMeta eyebrow="GOA, INDIA" title="OUR HOME, OUR CRAFT" body="">
            <span className="nts-hero__icon">⌁</span>
          </HeroMeta>

          <HeroMeta eyebrow="15+" title="PROPRIETARY IMFL BRANDS" body="" />

          <HeroMeta eyebrow="CONTRACT BOTTLING" title="FROM PRODUCTION TO BOTTLE" body="" />
        </div>

        <a className="nts-hero__scroll" href="#flavors" aria-label="Scroll to explore brands">
          <span>SCROLL TO EXPLORE</span>
          <b>↓</b>
        </a>
      </div>

      <style>{`
        .nts-hero {
          --orange: #E9542E;
          position: relative;
          min-height: calc(100svh - 110px);
          height: min(860px, calc(100svh - 110px));
          width: 100%;
          overflow: hidden;
          isolation: isolate;
          background: #050505;
          color: #fff;
        }

        .nts-hero__media,
        .nts-hero__media picture,
        .nts-hero__media img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
        }

        .nts-hero__media {
          z-index: -3;
          transform: scale(1.025);
          animation: ntsHeroIn 1.2s cubic-bezier(.16,1,.3,1) both;
        }

        .nts-hero__media img {
          object-fit: cover;
          object-position: center center;
          filter: saturate(.92) contrast(1.05);
        }

        .nts-hero__vignette {
          position: absolute;
          inset: 0;
          z-index: -2;
          background:
            linear-gradient(90deg, rgba(0,0,0,.96) 0%, rgba(0,0,0,.86) 23%, rgba(0,0,0,.42) 43%, rgba(0,0,0,.04) 70%),
            linear-gradient(180deg, rgba(0,0,0,.22) 0%, transparent 30%, rgba(0,0,0,.2) 70%, rgba(0,0,0,.9) 100%);
          pointer-events: none;
        }

        .nts-hero__warmth {
          position: absolute;
          inset: 0;
          z-index: -1;
          background: radial-gradient(circle at 72% 55%, rgba(255,142,62,.12), transparent 32%);
          mix-blend-mode: screen;
          pointer-events: none;
        }

        .nts-hero__content {
          position: relative;
          height: 100%;
          max-width: 1440px;
          margin: 0 auto;
          padding: clamp(72px, 9vh, 110px) 48px 0;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .nts-hero__copy {
          width: min(560px, 47vw);
          margin-top: -20px;
        }

        .nts-hero__kicker {
          margin: 0 0 22px;
          color: var(--orange);
          font: 800 11px/1.55 var(--font-mono);
          letter-spacing: .28em;
          text-transform: uppercase;
        }

        .nts-hero__kicker span { color: rgba(255,255,255,.72); margin: 0 .45em; }

        .nts-hero h1 {
          margin: 0;
          display: flex;
          flex-direction: column;
          color: #fff;
          font-family: var(--font-display);
          font-size: clamp(58px, 7.2vw, 112px);
          font-weight: 950;
          line-height: .84;
          letter-spacing: -.035em;
          text-transform: uppercase;
          text-shadow: 0 12px 35px rgba(0,0,0,.48);
        }

        .nts-hero h1 span { display: block; }
        .nts-hero h1 em { font-style: normal; color: rgba(255,255,255,.96); }
        .nts-hero h1 .accent { color: var(--orange); }

        .nts-hero__intro {
          margin: 25px 0 0;
          color: rgba(255,255,255,.92);
          font: 500 clamp(17px, 1.35vw, 21px)/1.35 Georgia, 'Times New Roman', serif;
          text-shadow: 0 5px 18px rgba(0,0,0,.7);
        }

        .nts-hero__categories {
          margin: 23px 0 0;
          color: rgba(255,255,255,.88);
          font: 800 10px/1 var(--font-mono);
          letter-spacing: .27em;
          text-transform: uppercase;
        }

        .nts-hero__categories i {
          display: inline-block;
          width: 4px;
          height: 4px;
          margin: 0 10px 2px;
          border-radius: 50%;
          background: var(--orange);
        }

        .nts-hero__actions {
          display: flex;
          gap: 18px;
          margin-top: 32px;
          flex-wrap: wrap;
        }

        .nts-hero__button {
          min-height: 52px;
          padding: 0 25px;
          display: inline-flex;
          align-items: center;
          gap: 22px;
          border-radius: 999px;
          font: 850 11px/1 var(--font-jd-condensed);
          letter-spacing: .13em;
          text-decoration: none;
          text-transform: uppercase;
          transition: transform .25s var(--ease), background .25s, border-color .25s;
        }

        .nts-hero__button:hover { transform: translateY(-3px); }

        .nts-hero__button span {
          font-size: 18px;
          line-height: 0;
          transition: transform .25s var(--ease);
        }

        .nts-hero__button:hover span { transform: translateX(4px); }

        .nts-hero__button--primary {
          color: #fff;
          background: var(--orange);
          border: 1px solid var(--orange);
          box-shadow: 0 12px 30px rgba(233,84,46,.25);
        }

        .nts-hero__button--ghost {
          color: #fff;
          background: rgba(0,0,0,.2);
          border: 1px solid rgba(255,255,255,.65);
          backdrop-filter: blur(5px);
        }

        .nts-hero__button--ghost:hover { background: rgba(255,255,255,.12); }

        .nts-hero__meta {
          position: absolute;
          left: 48px;
          right: 48px;
          bottom: 0;
          display: grid;
          grid-template-columns: 1fr 1fr 1.4fr;
          max-width: 1180px;
          min-height: 96px;
          padding-bottom: 20px;
        }

        .nts-hero-meta {
          position: relative;
          padding: 7px 40px 0 0;
          border-right: 1px solid rgba(255,255,255,.22);
        }

        .nts-hero-meta + .nts-hero-meta { padding-left: 48px; }
        .nts-hero-meta:last-child { border-right: 0; }

        .nts-hero-meta__eyebrow {
          display: block;
          margin-bottom: 8px;
          color: #fff;
          font: 850 13px/1 var(--font-mono);
          letter-spacing: .17em;
          text-transform: uppercase;
        }

        .nts-hero-meta strong {
          display: block;
          color: rgba(255,255,255,.56);
          font: 700 9px/1.2 var(--font-mono);
          letter-spacing: .16em;
          text-transform: uppercase;
        }

        .nts-hero__scroll {
          position: absolute;
          right: 48px;
          bottom: 24px;
          display: flex;
          align-items: center;
          gap: 25px;
          color: #fff;
          text-decoration: none;
          font: 700 9px/1 var(--font-mono);
          letter-spacing: .23em;
          text-transform: uppercase;
        }

        .nts-hero__scroll b {
          display: grid;
          place-items: center;
          width: 34px;
          height: 46px;
          border-left: 1px solid rgba(255,255,255,.45);
          font: 300 25px/1 var(--font-body);
          animation: ntsScroll 1.7s ease-in-out infinite;
        }

        @keyframes ntsHeroIn {
          from { opacity: 0; transform: scale(1.07); }
          to { opacity: 1; transform: scale(1.025); }
        }

        @keyframes ntsScroll {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(6px); }
        }

        @media (max-width: 900px) {
          .nts-hero {
            height: auto;
            min-height: calc(100svh - 104px);
          }

          .nts-hero__content {
            min-height: calc(100svh - 104px);
            padding: 58px 24px 126px;
            justify-content: flex-start;
          }

          .nts-hero__media img { object-position: 62% center; }
          .nts-hero__vignette {
            background:
              linear-gradient(90deg, rgba(0,0,0,.95), rgba(0,0,0,.65) 48%, rgba(0,0,0,.12)),
              linear-gradient(180deg, rgba(0,0,0,.25), transparent 45%, rgba(0,0,0,.88));
          }

          .nts-hero__copy { width: min(620px, 100%); margin-top: 0; }
          .nts-hero h1 { font-size: clamp(54px, 11vw, 92px); }
          .nts-hero__meta { left: 24px; right: 24px; }
          .nts-hero__scroll { display: none; }
        }

        @media (max-width: 640px) {
          .nts-hero { min-height: 760px; }
          .nts-hero__content { min-height: 760px; padding: 48px 20px 125px; }
          .nts-hero__media img { object-position: 63% center; }
          .nts-hero__kicker { font-size: 9px; letter-spacing: .2em; }
          .nts-hero h1 { font-size: clamp(48px, 14vw, 78px); }
          .nts-hero__intro { font-size: 16px; }
          .nts-hero__categories { font-size: 8px; letter-spacing: .16em; }
          .nts-hero__actions { gap: 10px; margin-top: 26px; }
          .nts-hero__button { min-height: 48px; padding: 0 17px; gap: 12px; font-size: 9px; }
          .nts-hero__meta {
            bottom: 0;
            grid-template-columns: 1fr 1fr;
            gap: 0;
            min-height: 108px;
            padding-bottom: 18px;
          }
          .nts-hero-meta { padding-right: 15px; }
          .nts-hero-meta + .nts-hero-meta { padding-left: 15px; }
          .nts-hero-meta:last-child {
            grid-column: 1 / -1;
            padding: 12px 0 0;
            border-top: 1px solid rgba(255,255,255,.18);
            border-right: 0;
          }
          .nts-hero-meta__eyebrow { font-size: 10px; letter-spacing: .12em; }
          .nts-hero-meta strong { font-size: 7px; }
        }

        @media (prefers-reduced-motion: reduce) {
          .nts-hero__media, .nts-hero__scroll b { animation: none; }
          .nts-hero__button { transition: none; }
        }
      `}</style>
    </section>
  )
}
