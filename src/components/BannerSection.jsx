import React from 'react'

const heroImage = '/banner/east-coast-bottle-lineup-hero-desktop.png'

export default function BannerSection() {
  return (
    <section className="nts-hero" id="top" aria-labelledby="home-hero-title">
      <div className="nts-hero__media" aria-hidden="true">
        <picture>
          <source media="(max-width: 700px)" srcSet="/banner/east-coast-bottle-lineup-hero-mobile.png" />
          <img src={heroImage} alt="" loading="eager" />
        </picture>
      </div>

      <div className="nts-hero__shade" aria-hidden="true" />

      <div className="nts-hero__copy">
        <p className="nts-hero__eyebrow">
          GOA MANUFACTURING <span>/</span> PROPRIETARY<br />
          IMFL BRANDS
        </p>

        <h1 id="home-hero-title">
          <span>NTS</span>
          <span>BLENDERS,</span>
          <span>BUILT TO</span>
          <span>POUR</span>
        </h1>

        <p className="nts-hero__intro">
          Goa production and contract bottling.<br />
          Whisky, brandy, rum and vodka labels.
        </p>
      </div>
    </section>
  )
}

<style data-nts-hero-css>{`
        .nts-hero{
          position:relative;
          width:100%;
          height:clamp(620px, calc(100svh - 105px), 704px);
          min-height:620px;
          overflow:hidden;
          isolation:isolate;
          background:#080808;
          color:#fff;
        }
        .nts-hero__media,
        .nts-hero__media picture,
        .nts-hero__media img{
          position:absolute;
          inset:0;
          width:100%;
          height:100%;
        }
        .nts-hero__media{
          z-index:-3;
          animation:ntsHeroReveal .9s cubic-bezier(.16,1,.3,1) both;
        }
        .nts-hero__media img{
          display:block;
          object-fit:cover;
          object-position:center center;
          filter:saturate(.96) contrast(1.02);
        }
        .nts-hero__shade{
          position:absolute;
          inset:0;
          z-index:-2;
          pointer-events:none;
          background:
            linear-gradient(90deg,
              rgba(0,0,0,.88) 0%,
              rgba(0,0,0,.72) 19%,
              rgba(0,0,0,.38) 35%,
              rgba(0,0,0,.10) 54%,
              rgba(0,0,0,0) 73%),
            linear-gradient(180deg,
              rgba(0,0,0,.10) 0%,
              rgba(0,0,0,0) 52%,
              rgba(0,0,0,.12) 82%,
              rgba(0,0,0,.22) 100%);
        }
        .nts-hero__copy{
          position:absolute;
          left:clamp(40px, 3.15vw, 52px);
          top:clamp(58px, 6.1vh, 70px);
          width:min(520px, 34vw);
        }
        .nts-hero__eyebrow{
          margin:0 0 20px;
          color:#f25a2c;
          font:800 10px/1.55 var(--font-mono);
          letter-spacing:.27em;
          text-transform:uppercase;
          text-shadow:0 2px 10px rgba(0,0,0,.55);
        }
        .nts-hero__eyebrow span{
          color:rgba(255,255,255,.7);
          padding:0 7px;
        }
        .nts-hero h1{
          margin:0;
          font-family:var(--font-display);
          font-size:clamp(66px, 5.2vw, 88px);
          font-weight:950;
          line-height:.88;
          letter-spacing:-.035em;
          text-transform:uppercase;
          text-shadow:0 7px 24px rgba(0,0,0,.42);
        }
        .nts-hero h1 span{
          display:block;
          white-space:nowrap;
        }
        .nts-hero__intro{
          margin:27px 0 0;
          color:#f5f5f5;
          font:600 clamp(17px, 1.3vw, 21px)/1.38 var(--font-body);
          letter-spacing:-.015em;
          text-shadow:0 4px 15px rgba(0,0,0,.7);
        }
        @keyframes ntsHeroReveal{
          from{opacity:0;transform:scale(1.018)}
          to{opacity:1;transform:scale(1)}
        }

        @media(max-width:1100px){
          .nts-hero{height:clamp(600px, calc(100svh - 105px), 704px)}
          .nts-hero__copy{left:32px;width:46vw}
          .nts-hero h1{font-size:clamp(58px, 7vw, 78px)}
        }
        @media(max-width:700px){
          .nts-hero{height:calc(100svh - 104px);min-height:650px;max-height:none}
          .nts-hero__media img{object-position:62% center}
          .nts-hero__shade{
            background:
              linear-gradient(90deg,rgba(0,0,0,.9),rgba(0,0,0,.62) 60%,rgba(0,0,0,.12)),
              linear-gradient(180deg,rgba(0,0,0,.1),transparent 48%,rgba(0,0,0,.55));
          }
          .nts-hero__copy{left:20px;right:20px;top:54px;width:auto}
          .nts-hero__eyebrow{font-size:8px;letter-spacing:.2em;margin-bottom:17px}
          .nts-hero h1{font-size:clamp(48px, 13.5vw, 72px);line-height:.88}
          .nts-hero__intro{font-size:15px;margin-top:21px}
        }
        @media(prefers-reduced-motion:reduce){.nts-hero__media{animation:none}}
`}</style>
