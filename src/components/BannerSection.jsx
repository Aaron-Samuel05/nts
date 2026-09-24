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
    <section className="nts-hero" id="top" aria-labelledby="home-hero-title">
      <div className="nts-hero__media" aria-hidden="true">
        <picture>
          <source media="(max-width: 1100px)" srcSet="/banner/east-coast-bottle-lineup-hero-mobile.png" />
          <img src={heroImage} alt="" loading="eager" />
        </picture>
      </div>

      <div className="nts-hero__shade" aria-hidden="true" />
      <div className="nts-hero__glow" aria-hidden="true" />

      <div className="nts-hero__inner">
        <div className="nts-hero__copy">
          <p className="nts-hero__eyebrow">GOA MANUFACTURING <span>/</span> PROPRIETARY IMFL BRANDS</p>

          <h1 id="home-hero-title">
            <span>NTS</span>
            <span>BLENDERS <i>&amp;</i></span>
            <span className="accent">DISTILLERS</span>
          </h1>

          <p className="nts-hero__intro">
            Goa-based manufacturing.<br />
            Contract bottling. Proprietary spirits.
          </p>

          <p className="nts-hero__types">
            WHISKY <b /> BRANDY <b /> RUM <b /> VODKA
          </p>

          <div className="nts-hero__actions">
            <a href="#flavors" className="nts-hero__cta nts-hero__cta--primary">EXPLORE OUR BRANDS <span>↗</span></a>
            <a href="/distillery" className="nts-hero__cta nts-hero__cta--secondary">OUR CAPABILITIES <span>↗</span></a>
          </div>
        </div>

        <div className="nts-hero__bottom">
          <div className="nts-hero__facts">
            <div><strong>GOA, INDIA</strong><small>OUR HOME, OUR CRAFT</small></div>
            <div><strong>15+</strong><small>PROPRIETARY IMFL BRANDS</small></div>
            <div><strong>CONTRACT BOTTLING</strong><small>FROM PRODUCTION TO BOTTLE</small></div>
          </div>
          <a href="#flavors" className="nts-hero__scroll"><span>SCROLL TO EXPLORE</span><b>↓</b></a>
        </div>
      </div>

      <style>{`
        .nts-hero {
          --orange:#E9542E;
          position:relative;
          width:100%;
          height:clamp(620px, 68vw, 790px);
          max-height:calc(100svh - 105px);
          min-height:620px;
          overflow:hidden;
          isolation:isolate;
          background:#050505;
          color:#fff;
        }
        .nts-hero__media,.nts-hero__media picture,.nts-hero__media img{position:absolute;inset:0;width:100%;height:100%}
        .nts-hero__media{z-index:-3;animation:ntsHeroReveal 1.1s cubic-bezier(.16,1,.3,1) both}
        .nts-hero__media img{object-fit:cover;object-position:center center;filter:saturate(.94) contrast(1.03)}
        .nts-hero__shade{
          position:absolute;inset:0;z-index:-2;pointer-events:none;
          background:
            linear-gradient(90deg,rgba(3,3,3,.97) 0%,rgba(3,3,3,.91) 17%,rgba(3,3,3,.64) 34%,rgba(3,3,3,.20) 54%,rgba(3,3,3,.02) 72%),
            linear-gradient(180deg,rgba(0,0,0,.18) 0%,transparent 42%,rgba(0,0,0,.18) 72%,rgba(0,0,0,.86) 100%);
        }
        .nts-hero__glow{
          position:absolute;inset:0;z-index:-1;pointer-events:none;
          background:radial-gradient(circle at 72% 58%,rgba(233,84,46,.10),transparent 30%);
          mix-blend-mode:screen;
        }
        .nts-hero__inner{
          position:relative;width:min(1440px,100%);height:100%;margin:auto;
          padding:clamp(56px,7vw,88px) 48px 0;display:flex;flex-direction:column;
        }
        .nts-hero__copy{width:min(560px,44vw);margin-top:clamp(8px,3vh,35px)}
        .nts-hero__eyebrow{
          margin:0 0 21px;color:var(--orange);font:800 10px/1.55 var(--font-mono);
          letter-spacing:.26em;text-transform:uppercase;
        }
        .nts-hero__eyebrow span{color:rgba(255,255,255,.55);padding:0 8px}
        .nts-hero h1{
          margin:0;font-family:var(--font-display);font-size:clamp(50px,5.25vw,82px);
          font-weight:950;line-height:.88;letter-spacing:-.025em;text-transform:uppercase;
          text-shadow:0 10px 30px rgba(0,0,0,.48);
        }
        .nts-hero h1 span{display:block;white-space:nowrap}
        .nts-hero h1 i{font-style:normal;color:#fff}
        .nts-hero h1 .accent{color:var(--orange)}
        .nts-hero__intro{
          margin:25px 0 0;color:rgba(255,255,255,.92);
          font:500 clamp(16px,1.25vw,20px)/1.42 Georgia,"Times New Roman",serif;
          text-shadow:0 4px 18px rgba(0,0,0,.65)
        }
        .nts-hero__types{
          margin:21px 0 0;color:rgba(255,255,255,.88);
          font:800 9px/1 var(--font-mono);letter-spacing:.27em
        }
        .nts-hero__types b{display:inline-block;width:4px;height:4px;margin:0 10px 2px;border-radius:50%;background:var(--orange)}
        .nts-hero__actions{display:flex;gap:12px;flex-wrap:wrap;margin-top:30px}
        .nts-hero__cta{
          display:inline-flex;align-items:center;gap:18px;min-height:48px;padding:0 21px;
          border-radius:999px;font:850 10px/1 var(--font-jd-condensed);letter-spacing:.13em;
          text-decoration:none;text-transform:uppercase;transition:.25s var(--ease)
        }
        .nts-hero__cta:hover{transform:translateY(-2px)}
        .nts-hero__cta span{font-size:16px}
        .nts-hero__cta--primary{color:#fff;background:var(--orange);border:1px solid var(--orange);box-shadow:0 12px 28px rgba(233,84,46,.22)}
        .nts-hero__cta--secondary{color:#fff;background:rgba(0,0,0,.18);border:1px solid rgba(255,255,255,.58);backdrop-filter:blur(5px)}
        .nts-hero__cta--secondary:hover{background:rgba(255,255,255,.12)}
        .nts-hero__bottom{
          position:absolute;left:48px;right:48px;bottom:0;display:flex;align-items:flex-end;
          justify-content:space-between;border-top:1px solid rgba(255,255,255,.20);padding:17px 0 20px;
        }
        .nts-hero__facts{display:flex}
        .nts-hero__facts>div{min-width:185px;padding:0 34px;border-right:1px solid rgba(255,255,255,.20)}
        .nts-hero__facts>div:first-child{padding-left:0}
        .nts-hero__facts>div:last-child{border:0}
        .nts-hero__facts strong{display:block;color:#fff;font:800 11px/1.2 var(--font-mono);letter-spacing:.17em}
        .nts-hero__facts small{display:block;margin-top:6px;color:rgba(255,255,255,.46);font:700 8px/1.2 var(--font-mono);letter-spacing:.13em}
        .nts-hero__scroll{display:flex;align-items:center;gap:16px;color:#fff;text-decoration:none;font:700 8px/1 var(--font-mono);letter-spacing:.22em;text-transform:uppercase}
        .nts-hero__scroll b{display:grid;place-items:center;width:32px;height:42px;border-left:1px solid rgba(255,255,255,.4);font:300 22px/1 var(--font-body);animation:ntsScroll 1.7s ease-in-out infinite}
        @keyframes ntsHeroReveal{from{opacity:0;transform:scale(1.045)}to{opacity:1;transform:scale(1)}}
        @keyframes ntsScroll{0%,100%{transform:translateY(0)}50%{transform:translateY(5px)}}

        @media(max-width:1100px){
          .nts-hero__inner{padding-left:30px;padding-right:30px}
          .nts-hero__copy{width:min(590px,58vw)}
          .nts-hero h1{font-size:clamp(48px,6vw,72px)}
          .nts-hero__bottom{left:30px;right:30px}
        }
        @media(max-width:700px){
          .nts-hero{height:760px;max-height:none;min-height:760px}
          .nts-hero__media img{object-position:63% center}
          .nts-hero__shade{background:linear-gradient(90deg,rgba(3,3,3,.94),rgba(3,3,3,.68) 55%,rgba(3,3,3,.15)),linear-gradient(180deg,rgba(0,0,0,.2),transparent 38%,rgba(0,0,0,.92))}
          .nts-hero__inner{padding:44px 20px 125px}
          .nts-hero__copy{width:100%;margin-top:0}
          .nts-hero__eyebrow{font-size:8px;letter-spacing:.19em}
          .nts-hero h1{font-size:clamp(45px,13vw,70px)}
          .nts-hero__intro{font-size:15px;margin-top:20px}
          .nts-hero__types{font-size:7px;letter-spacing:.13em}
          .nts-hero__actions{margin-top:24px}
          .nts-hero__cta{min-height:46px;padding:0 16px;gap:10px;font-size:8px}
          .nts-hero__bottom{left:20px;right:20px;padding:14px 0 16px;display:block}
          .nts-hero__facts{display:grid;grid-template-columns:1fr 1fr}
          .nts-hero__facts>div{min-width:0;padding:0 12px}
          .nts-hero__facts>div:first-child{padding-left:0}
          .nts-hero__facts>div:last-child{grid-column:1/-1;padding:11px 0 0;margin-top:11px;border-top:1px solid rgba(255,255,255,.16);border-right:0}
          .nts-hero__scroll{display:none}
        }
        @media(prefers-reduced-motion:reduce){.nts-hero__media,.nts-hero__scroll b{animation:none}}
      `}</style>
    </section>
  )
}
