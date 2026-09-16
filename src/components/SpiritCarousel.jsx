import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ArrowLeft, ArrowRight, X } from 'lucide-react'

const PRODUCTS = [
  { id: 'old-town', brand: 'OLD TOWN', product: 'Indian Blended Malt Whisky', name: 'OLD TOWN Indian Blended Malt Whisky', category: 'Whisky', style: 'Malt Blended', ghost: 'MALT WHISKY', origin: 'Canacona, Goa, India', image: '/portfolio-images/old-town.png', tone: ['#1c0f06', '#5c3412', '#a3703b'], accent: '#e9a355', tagline: 'A malt blended whisky, built to lead the shelf.', description: 'Old Town Indian Blended Malt Whisky leads the NTS semi-premium portfolio with a label-forward malt blended whisky presence.' },
  { id: 'east-coast-malt', brand: 'EAST COAST', product: 'Premium Malt Whisky', name: 'EAST COAST Premium Malt Whisky', category: 'Whisky', style: 'Premium Malt', ghost: 'PREMIUM MALT', origin: 'Canacona, Goa, India', image: '/portfolio-images/east-coast-premium-malt-whisky.png', tone: ['#08131a', '#1f3a4a', '#4d7f96'], accent: '#7fd1e6', tagline: 'Premium malt, poured for the everyday table.', description: 'EAST COAST Premium Malt Whisky is part of the NTS semi-premium portfolio with a premium malt whisky identity.' },
  { id: 'east-coast-rum', brand: 'EAST COAST', product: 'xxx Rum', name: 'EAST COAST xxx Rum', category: 'Rum', style: 'XXX Rum', ghost: 'XXX RUM', origin: 'Canacona, Goa, India', image: '/portfolio-images/east-coast-xxx-rum.png', tone: ['#180705', '#4a1b12', '#8a3f24'], accent: '#e2833f', tagline: 'Bold rum character, off the Goa line.', description: 'EAST COAST xxx Rum brings a bold rum expression to the NTS portfolio with strong shelf recognition.' },
  { id: 'east-coast-brandy', brand: 'EAST COAST', product: 'Indian Blended Brandy', name: 'EAST COAST Indian Blended Brandy', category: 'Brandy', style: 'Blended Brandy', ghost: 'INDIAN BRANDY', origin: 'Canacona, Goa, India', image: '/portfolio-images/east-coast-indian-blended-brandy.png', tone: ['#12040c', '#3a1228', '#6e2650'], accent: '#d9799b', tagline: 'A smooth blended brandy, East Coast style.', description: 'EAST COAST Indian Blended Brandy carries the East Coast range with a smooth blended brandy identity.' },
  { id: 'wanted-999', brand: 'WANTED 999', product: 'Vsop Brandy', name: 'WANTED 999 Vsop Brandy', category: 'Brandy', style: 'VSOP Brandy', ghost: 'VSOP BRANDY', origin: 'Canacona, Goa, India', image: '/portfolio-images/wanted.png', tone: ['#0b0804', '#221a0c', '#4a3a1c'], accent: '#c9a13b', tagline: 'Rich VSOP brandy, built for recognition.', description: 'WANTED 999 Vsop Brandy is part of the NTS house portfolio, built around a rich VSOP brandy profile and strong shelf recognition.' },
]

const POSITIONS = {
  hero: { x: '0vw', y: '0vh', scale: 1.2, rotation: 0, opacity: 1, blur: 0, z: 20 },
  next: { x: '35vw', y: '2vh', scale: 0.42, rotation: 8, opacity: 0.52, blur: 5, z: 8 },
  prev: { x: '-35vw', y: '2vh', scale: 0.42, rotation: -8, opacity: 0.52, blur: 5, z: 8 },
  hiddenRight: { x: '64vw', y: '6vh', scale: 0.25, rotation: 13, opacity: 0, blur: 12, z: 2 },
  hiddenLeft: { x: '-64vw', y: '6vh', scale: 0.25, rotation: -13, opacity: 0, blur: 12, z: 2 },
}

const wrap = (n) => (n + PRODUCTS.length) % PRODUCTS.length

function setPosition(node, pos) {
  if (!node) return
  gsap.set(node, {
    '--base-x': pos.x,
    '--base-y': pos.y,
    '--base-scale': pos.scale,
    '--base-rotation': `${pos.rotation}deg`,
    opacity: pos.opacity,
    filter: `drop-shadow(0 28px 22px rgba(0,0,0,.36)) blur(${pos.blur}px)`,
    zIndex: pos.z,
  })
}

function animatePosition(tl, node, pos, duration, at = 0) {
  if (!node) return
  tl.to(node, {
    '--base-x': pos.x,
    '--base-y': pos.y,
    '--base-scale': pos.scale,
    '--base-rotation': `${pos.rotation}deg`,
    opacity: pos.opacity,
    filter: `drop-shadow(0 28px 22px rgba(0,0,0,.36)) blur(${pos.blur}px)`,
    zIndex: pos.z,
    duration,
  }, at)
}

const bottleBase = {
  position: 'absolute',
  left: '50%',
  top: '50%',
  width: 'clamp(250px, 25vw, 420px)',
  maxWidth: '42vw',
  maxHeight: '68vh',
  objectFit: 'contain',
  transform: 'translate(-50%, -50%) translate3d(calc(var(--base-x,0vw) + var(--parallax-x,0px)),calc(var(--base-y,0vh) + var(--parallax-y,0px)),0) scale(var(--base-scale,1)) rotate(var(--base-rotation,0deg)) rotateX(var(--parallax-rx,0deg)) rotateY(var(--parallax-ry,0deg))',
  transformOrigin: 'center center',
  willChange: 'transform,opacity,filter',
  userSelect: 'none',
  pointerEvents: 'none',
}

const buttonBase = {
  width: 48,
  height: 48,
  borderRadius: '50%',
  border: '1px solid rgba(255,255,255,.22)',
  background: 'rgba(0,0,0,.16)',
  color: '#fff',
  display: 'grid',
  placeItems: 'center',
  cursor: 'pointer',
}

export default function SpiritCarousel() {
  const [active, setActive] = useState(0)
  const [detailOpen, setDetailOpen] = useState(false)
  const activeRef = useRef(0)
  const locked = useRef(false)
  const stageRef = useRef(null)
  const bottles = useRef([])
  const titleRef = useRef(null)
  const infoRef = useRef(null)
  const counterRef = useRef(null)
  const actionRef = useRef(null)
  const detailRef = useRef(null)
  const detailInfoRef = useRef(null)
  const drag = useRef({ id: null, startX: 0, startY: 0, active: false })
  const current = PRODUCTS[active]

  useLayoutEffect(() => {
    bottles.current.forEach((node, i) => {
      if (!node) return
      const a = activeRef.current
      const pos = i === a ? POSITIONS.hero : i === wrap(a + 1) ? POSITIONS.next : i === wrap(a - 1) ? POSITIONS.prev : POSITIONS.hiddenRight
      setPosition(node, pos)
      gsap.set(node, { '--parallax-x': '0px', '--parallax-y': '0px', '--parallax-rx': '0deg', '--parallax-ry': '0deg' })
    })
  }, [])

  useEffect(() => {
    const images = PRODUCTS.map((p) => { const img = new Image(); img.src = p.image; return img })
    return () => images.forEach((img) => { img.src = '' })
  }, [])

  useEffect(() => {
    const key = (e) => {
      if (detailOpen) { if (e.key === 'Escape') closeDetail(); return }
      if (e.key === 'ArrowRight') changeProduct(1)
      if (e.key === 'ArrowLeft') changeProduct(-1)
    }
    window.addEventListener('keydown', key)
    return () => window.removeEventListener('keydown', key)
  })

  function resetParallax(animated = false) {
    const targets = [stageRef.current, titleRef.current, detailInfoRef.current, ...bottles.current].filter(Boolean)
    const vars = { '--parallax-x': '0px', '--parallax-y': '0px', '--parallax-rx': '0deg', '--parallax-ry': '0deg', duration: animated ? 0.45 : 0, ease: 'power3.out', overwrite: 'auto' }
    targets.forEach((node) => animated ? gsap.to(node, vars) : gsap.set(node, vars))
  }

  function changeProduct(direction) {
    if (locked.current || detailOpen) return
    locked.current = true
    const old = activeRef.current
    const next = wrap(old + direction)
    const oldHero = bottles.current[old]
    const incoming = bottles.current[next]
    const entering = bottles.current[wrap(old + direction * 2)]
    const exiting = bottles.current[wrap(old - direction)]
    setPosition(incoming, direction > 0 ? POSITIONS.hiddenRight : POSITIONS.hiddenLeft)
    setPosition(entering, direction > 0 ? POSITIONS.hiddenRight : POSITIONS.hiddenLeft)
    gsap.killTweensOf([oldHero, incoming, entering, exiting, titleRef.current, infoRef.current, counterRef.current, actionRef.current])

    const tl = gsap.timeline({ defaults: { ease: 'power4.inOut' }, onComplete: () => { activeRef.current = next; setActive(next); resetParallax(); locked.current = false } })
    tl.to(stageRef.current, { '--tone-1': PRODUCTS[next].tone[0], '--tone-2': PRODUCTS[next].tone[1], '--tone-3': PRODUCTS[next].tone[2], '--accent': PRODUCTS[next].accent, duration: 0.95 }, 0)
    animatePosition(tl, oldHero, direction > 0 ? POSITIONS.prev : POSITIONS.next, 0.92, 0)
    animatePosition(tl, incoming, POSITIONS.hero, 0.98, 0.03)
    animatePosition(tl, entering, direction > 0 ? POSITIONS.next : POSITIONS.prev, 0.9, 0.08)
    animatePosition(tl, exiting, direction > 0 ? POSITIONS.hiddenLeft : POSITIONS.hiddenRight, 0.72, 0)
    tl.to([titleRef.current, infoRef.current, counterRef.current, actionRef.current], { opacity: 0, y: -12, filter: 'blur(5px)', duration: 0.28, stagger: 0.025 }, 0)
      .call(() => { activeRef.current = next; setActive(next) }, [], 0.38)
      .fromTo([infoRef.current, counterRef.current, actionRef.current], { opacity: 0, y: 15, filter: 'blur(5px)' }, { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.5, stagger: 0.04, ease: 'power3.out' }, 0.5)
      .fromTo(titleRef.current, { opacity: 0, y: 15, filter: 'blur(5px)' }, { opacity: 0.18, y: 0, filter: 'blur(0px)', duration: 0.5 }, 0.5)
  }

  function onPointerMove(e) {
    if (!stageRef.current || locked.current) return
    const r = stageRef.current.getBoundingClientRect()
    const x = Math.max(-1, Math.min(1, ((e.clientX - r.left) / r.width - 0.5) * 2))
    const y = Math.max(-1, Math.min(1, ((e.clientY - r.top) / r.height - 0.5) * 2))
    gsap.to(stageRef.current, { '--glow-x': `${50 + x * 8}%`, '--glow-y': `${46 + y * 6}%`, duration: 0.6, overwrite: 'auto' })
    if (titleRef.current) gsap.to(titleRef.current, { '--parallax-x': `${x * 8}px`, '--parallax-y': `${y * 5}px`, '--parallax-rx': `${-y * .45}deg`, '--parallax-ry': `${x * .65}deg`, duration: .6, overwrite: 'auto' })
    const hero = bottles.current[activeRef.current]
    if (hero) gsap.to(hero, { '--parallax-x': `${x * 7}px`, '--parallax-y': `${y * 4}px`, '--parallax-rx': `${-y * 1.1}deg`, '--parallax-ry': `${x * 1.6}deg`, duration: .6, overwrite: 'auto' })
    if (detailOpen && detailInfoRef.current) gsap.to(detailInfoRef.current, { '--parallax-x': `${x * 6}px`, '--parallax-y': `${y * 4}px`, duration: .6, overwrite: 'auto' })
  }

  function onPointerDown(e) {
    if (locked.current || detailOpen) return
    drag.current = { id: e.pointerId, startX: e.clientX, startY: e.clientY, active: true }
    e.currentTarget.setPointerCapture?.(e.pointerId)
  }

  function onPointerUp(e) {
    const g = drag.current
    if (!g.active || g.id !== e.pointerId) return
    g.active = false
    const dx = e.clientX - g.startX
    const dy = e.clientY - g.startY
    if (Math.abs(dx) > 55 && Math.abs(dx) > Math.abs(dy) * 1.15) changeProduct(dx < 0 ? 1 : -1)
  }

  function onWheel(e) {
    if (detailOpen || locked.current) return
    if (Math.abs(e.deltaY) < 10) return
    e.preventDefault()
    changeProduct(e.deltaY > 0 ? 1 : -1)
  }

  function openDetail() {
    if (locked.current || detailOpen) return
    setDetailOpen(true)
    requestAnimationFrame(() => {
      const hero = bottles.current[activeRef.current]
      gsap.killTweensOf([hero, titleRef.current, infoRef.current, counterRef.current, actionRef.current])
      const tl = gsap.timeline({ defaults: { ease: 'power4.inOut' } })
      tl.to([titleRef.current, infoRef.current, counterRef.current, actionRef.current], { opacity: 0, y: -24, filter: 'blur(8px)', duration: .4, stagger: .025 }, 0)
        .to(hero, { '--base-x': '-22vw', '--base-y': '0vh', '--base-scale': 1.12, '--base-rotation': '0deg', duration: .85 }, .08)
        .fromTo(detailRef.current, { opacity: 0, yPercent: 8 }, { opacity: 1, yPercent: 0, duration: .8 }, .2)
        .fromTo(detailInfoRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: .55 }, .48)
    })
  }

  function closeDetail() {
    if (!detailOpen) return
    const hero = bottles.current[activeRef.current]
    const tl = gsap.timeline({ onComplete: () => { setDetailOpen(false); resetParallax() }, defaults: { ease: 'power4.inOut' } })
    tl.to(detailInfoRef.current, { opacity: 0, y: 25, duration: .3 }, 0)
      .to(detailRef.current, { opacity: 0, yPercent: 8, duration: .55 }, 0)
      .to(hero, { '--base-x': '0vw', '--base-y': '0vh', '--base-scale': 1.2, duration: .8 }, .05)
      .to([titleRef.current, infoRef.current, counterRef.current, actionRef.current], { opacity: 1, y: 0, filter: 'blur(0px)', duration: .55, stagger: .04 }, .28)
  }

  return (
    <section
      ref={stageRef}
      onPointerMove={onPointerMove}
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
      onWheel={onWheel}
      style={{
        '--tone-1': current.tone[0], '--tone-2': current.tone[1], '--tone-3': current.tone[2], '--accent': current.accent,
        '--glow-x': '50%', '--glow-y': '46%', position: 'relative', minHeight: '100vh', overflow: 'hidden', background: 'radial-gradient(circle at var(--glow-x) var(--glow-y), color-mix(in srgb, var(--tone-3) 25%, transparent), transparent 34%), linear-gradient(135deg, var(--tone-1), var(--tone-2) 55%, #070707)', color: '#fff', isolation: 'isolate', touchAction: 'pan-y', transition: 'background .3s ease',
      }}
    >
      <div style={{ position: 'absolute', inset: 0, opacity: .13, backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence baseFrequency='.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")', pointerEvents: 'none', zIndex: 0 }} />
      <div ref={titleRef} style={{ position: 'absolute', inset: '5% -5% auto', textAlign: 'center', fontFamily: 'var(--font-jd-display,Arial Black,sans-serif)', fontSize: 'clamp(80px,17vw,270px)', lineHeight: .78, fontWeight: 900, letterSpacing: '-.07em', whiteSpace: 'nowrap', color: '#fff', opacity: .18, transform: 'translate3d(var(--parallax-x,0px),var(--parallax-y,0px),0) rotateX(var(--parallax-rx,0deg)) rotateY(var(--parallax-ry,0deg))', pointerEvents: 'none', zIndex: 1 }}>{current.ghost}</div>

      {PRODUCTS.map((product, i) => (
        <img key={product.id} ref={(el) => { bottles.current[i] = el }} src={product.image} alt={product.name} draggable="false" style={{ ...bottleBase, zIndex: i === active ? 20 : 5 }} />
      ))}

      <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: 'clamp(28px,5vw,72px)', zIndex: 30, pointerEvents: 'none' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div style={{ fontFamily: 'var(--font-mono,monospace)', fontSize: 10, letterSpacing: '.22em', textTransform: 'uppercase', opacity: .58 }}>NTS / Spirits Collection</div>
          <div style={{ fontFamily: 'var(--font-mono,monospace)', fontSize: 10, letterSpacing: '.16em', opacity: .5 }}>GOA · INDIA</div>
        </div>

        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 24 }}>
          <div ref={infoRef} style={{ maxWidth: 430 }}>
            <div style={{ fontFamily: 'var(--font-mono,monospace)', fontSize: 11, letterSpacing: '.2em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 10 }}>{current.category} / {current.style}</div>
            <h2 style={{ margin: 0, fontFamily: 'var(--font-jd-display,Arial Black,sans-serif)', fontSize: 'clamp(36px,5vw,72px)', lineHeight: .86, letterSpacing: '-.045em', textTransform: 'uppercase' }}>{current.brand}</h2>
            <p style={{ margin: '12px 0 0', color: 'rgba(255,255,255,.68)', fontSize: 14, lineHeight: 1.45 }}>{current.product}</p>
          </div>
          <div ref={counterRef} style={{ display: 'flex', alignItems: 'center', gap: 12, pointerEvents: 'auto' }}>
            <button aria-label="Previous bottle" onClick={() => changeProduct(-1)} style={buttonBase}><ArrowLeft size={18} /></button>
            <span style={{ fontFamily: 'var(--font-mono,monospace)', fontSize: 11, letterSpacing: '.12em', minWidth: 46, textAlign: 'center' }}>{String(active + 1).padStart(2, '0')} / {String(PRODUCTS.length).padStart(2, '0')}</span>
            <button aria-label="Next bottle" onClick={() => changeProduct(1)} style={buttonBase}><ArrowRight size={18} /></button>
          </div>
          <button ref={actionRef} onClick={openDetail} style={{ ...buttonBase, width: 'auto', minWidth: 150, borderRadius: 28, padding: '0 22px', fontFamily: 'var(--font-mono,monospace)', fontSize: 10, letterSpacing: '.16em', textTransform: 'uppercase', pointerEvents: 'auto' }}>View Details</button>
        </div>
      </div>

      <div ref={detailRef} style={{ position: 'absolute', inset: 0, zIndex: 50, opacity: 0, pointerEvents: detailOpen ? 'auto' : 'none', overflowY: 'auto', background: 'linear-gradient(180deg, rgba(5,5,5,.05), rgba(5,5,5,.94) 72%)' }}>
        <button aria-label="Close details" onClick={closeDetail} style={{ ...buttonBase, position: 'absolute', top: 28, right: 28, zIndex: 60 }}><X size={20} /></button>
        <div ref={detailInfoRef} style={{ minHeight: '100%', padding: '12vh clamp(28px,8vw,120px) 8vh', display: 'grid', gridTemplateColumns: 'minmax(260px,1fr) minmax(300px,1.1fr)', alignItems: 'end', gap: 'clamp(30px,7vw,120px)', transform: 'translate3d(var(--parallax-x,0px),var(--parallax-y,0px),0)' }}>
          <div>
            <div style={{ fontFamily: 'var(--font-mono,monospace)', fontSize: 10, letterSpacing: '.2em', color: 'var(--accent)', textTransform: 'uppercase' }}>NTS / Product {String(active + 1).padStart(2, '0')}</div>
            <h2 style={{ fontFamily: 'var(--font-jd-display,Arial Black,sans-serif)', fontSize: 'clamp(48px,7vw,110px)', lineHeight: .82, letterSpacing: '-.055em', margin: '16px 0' }}>{current.brand}</h2>
            <p style={{ color: 'rgba(255,255,255,.68)', fontSize: 16, lineHeight: 1.6, maxWidth: 500 }}>{current.description}</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,minmax(120px,1fr))', gap: 22, marginTop: 35, fontFamily: 'var(--font-mono,monospace)', fontSize: 11 }}>
              <div><span style={{ display: 'block', opacity: .4, textTransform: 'uppercase', letterSpacing: '.14em' }}>Style</span><strong style={{ display: 'block', marginTop: 6 }}>{current.style}</strong></div>
              <div><span style={{ display: 'block', opacity: .4, textTransform: 'uppercase', letterSpacing: '.14em' }}>Origin</span><strong style={{ display: 'block', marginTop: 6 }}>{current.origin}</strong></div>
            </div>
          </div>
          <div style={{ display: 'grid', gap: 28 }}>
            <div style={{ borderTop: '1px solid rgba(255,255,255,.16)', paddingTop: 28 }}>
              <p style={{ opacity: .42, fontFamily: 'var(--font-mono,monospace)', fontSize: 10, letterSpacing: '.18em', textTransform: 'uppercase', margin: 0 }}>01 / The story</p>
              <h3 style={{ fontFamily: 'var(--font-jd-display,Arial Black,sans-serif)', fontSize: 'clamp(28px,4vw,58px)', lineHeight: .92, margin: '12px 0' }}>{current.tagline}</h3>
            </div>
            <div style={{ borderTop: '1px solid rgba(255,255,255,.16)', paddingTop: 28 }}>
              <p style={{ opacity: .42, fontFamily: 'var(--font-mono,monospace)', fontSize: 10, letterSpacing: '.18em', textTransform: 'uppercase', margin: 0 }}>02 / Heritage</p>
              <h3 style={{ fontFamily: 'var(--font-jd-display,Arial Black,sans-serif)', fontSize: 'clamp(28px,4vw,58px)', lineHeight: .92, margin: '12px 0' }}>Built in Goa, rooted in 1980.</h3>
              <p style={{ color: 'rgba(255,255,255,.65)', lineHeight: 1.65, maxWidth: 620, margin: 0 }}>NTS began in 1980 in Pondicherry and grew into a spirits operation anchored by its production facility in Canacona Industrial Estate, Goa.</p>
            </div>
            <div style={{ borderTop: '1px solid rgba(255,255,255,.16)', paddingTop: 28, minHeight: 220 }}>
              <p style={{ opacity: .42, fontFamily: 'var(--font-mono,monospace)', fontSize: 10, letterSpacing: '.18em', textTransform: 'uppercase', margin: 0 }}>03 / Character</p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 20, marginTop: 24, flexWrap: 'wrap' }}><h3 style={{ fontFamily: 'var(--font-jd-display,Arial Black,sans-serif)', fontSize: 'clamp(40px,6vw,90px)', lineHeight: .82, margin: 0 }}>{current.brand}</h3><div style={{ opacity: .7, lineHeight: 1.8 }}>{current.style}<br />{current.category}<br />{current.origin}</div></div>
            </div>
            <div style={{ minHeight: '35vh', display: 'grid', placeItems: 'center', textAlign: 'center', borderTop: '1px solid rgba(255,255,255,.16)' }}>
              <div><p style={{ opacity: .42, fontFamily: 'var(--font-mono,monospace)', fontSize: 10, letterSpacing: '.18em', textTransform: 'uppercase' }}>End of edition</p><h3 style={{ fontFamily: 'var(--font-jd-display,Arial Black,sans-serif)', fontSize: 'clamp(30px,5vw,70px)', margin: '12px 0', lineHeight: .9 }}>{current.name}</h3></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
