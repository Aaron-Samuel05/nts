import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ArrowLeft, ArrowRight, X } from 'lucide-react'

const PRODUCTS = [
  { brand: 'OLD TOWN', product: 'Indian Blended Malt Whisky', name: 'OLD TOWN Indian Blended Malt Whisky', category: 'Whisky', style: 'Malt Blended', ghost: 'MALT WHISKY', origin: 'Canacona, Goa, India', image: '/portfolio-images/old-town.png', tones: ['#1c0f06', '#5c3412', '#a3703b'], accent: '#e9a355', tagline: 'A malt blended whisky, built to lead the shelf.', description: 'Old Town Indian Blended Malt Whisky leads the NTS semi-premium portfolio with a label-forward malt blended whisky presence.' },
  { brand: 'EAST COAST', product: 'Premium Malt Whisky', name: 'EAST COAST Premium Malt Whisky', category: 'Whisky', style: 'Premium Malt', ghost: 'PREMIUM MALT', origin: 'Canacona, Goa, India', image: '/portfolio-images/east-coast-premium-malt-whisky.png', tones: ['#08131a', '#1f3a4a', '#4d7f96'], accent: '#7fd1e6', tagline: 'Premium malt, poured for the everyday table.', description: 'EAST COAST Premium Malt Whisky is part of the NTS semi-premium portfolio with a premium malt whisky identity.' },
  { brand: 'EAST COAST', product: 'xxx Rum', name: 'EAST COAST xxx Rum', category: 'Rum', style: 'XXX Rum', ghost: 'XXX RUM', origin: 'Canacona, Goa, India', image: '/portfolio-images/east-coast-xxx-rum.png', tones: ['#180705', '#4a1b12', '#8a3f24'], accent: '#e2833f', tagline: 'Bold rum character, off the Goa line.', description: 'EAST COAST xxx Rum brings a bold rum expression to the NTS portfolio with strong shelf recognition.' },
  { brand: 'EAST COAST', product: 'Indian Blended Brandy', name: 'EAST COAST Indian Blended Brandy', category: 'Brandy', style: 'Blended Brandy', ghost: 'INDIAN BRANDY', origin: 'Canacona, Goa, India', image: '/portfolio-images/east-coast-indian-blended-brandy.png', tones: ['#12040c', '#3a1228', '#6e2650'], accent: '#d9799b', tagline: 'A smooth blended brandy, East Coast style.', description: 'EAST COAST Indian Blended Brandy carries the East Coast range with a smooth blended brandy identity.' },
  { brand: 'WANTED 999', product: 'Vsop Brandy', name: 'WANTED 999 Vsop Brandy', category: 'Brandy', style: 'VSOP Brandy', ghost: 'VSOP BRANDY', origin: 'Canacona, Goa, India', image: '/portfolio-images/wanted.png', tones: ['#0b0804', '#221a0c', '#4a3a1c'], accent: '#c9a13b', tagline: 'Rich VSOP brandy, built for recognition.', description: 'WANTED 999 Vsop Brandy is part of the NTS house portfolio, built around a rich VSOP brandy profile and strong shelf recognition.' },
]

const POSITIONS = {
  hero: { x: '0vw', y: '-1vh', scale: 1.1, rotation: 0, opacity: 1, blur: 0, z: 20 },
  next: { x: '37vw', y: '1vh', scale: 0.48, rotation: 7, opacity: 0.68, blur: 2.5, z: 8 },
  prev: { x: '-37vw', y: '1vh', scale: 0.48, rotation: -7, opacity: 0.68, blur: 2.5, z: 8 },
  hiddenRight: { x: '66vw', y: '5vh', scale: 0.25, rotation: 13, opacity: 0, blur: 12, z: 2 },
  hiddenLeft: { x: '-66vw', y: '5vh', scale: 0.25, rotation: -13, opacity: 0, blur: 12, z: 2 },
}

const wrap = (n) => (n + PRODUCTS.length) % PRODUCTS.length

const bottleStyle = {
  position: 'absolute', left: '50%', top: '50%', width: 'clamp(240px, 26vw, 410px)', maxWidth: '42vw', maxHeight: '64vh', objectFit: 'contain',
  transform: 'translate(-50%, -50%) translate3d(calc(var(--x, 0vw) + var(--px, 0px)), calc(var(--y, 0vh) + var(--py, 0px)), 0) scale(var(--scale, 1)) rotate(var(--rotation, 0deg)) rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg))',
  transformOrigin: 'center center', willChange: 'transform, opacity, filter', userSelect: 'none', cursor: 'pointer', pointerEvents: 'auto',
}

function applyPosition(node, pos) {
  if (!node) return
  gsap.set(node, { '--x': pos.x, '--y': pos.y, '--scale': pos.scale, '--rotation': `${pos.rotation}deg`, '--px': '0px', '--py': '0px', '--rx': '0deg', '--ry': '0deg', opacity: pos.opacity, filter: `drop-shadow(0 28px 22px rgba(0,0,0,.36)) blur(${pos.blur}px)`, zIndex: pos.z })
}

function moveTo(timeline, node, pos, duration, at = 0) {
  if (!node) return
  timeline.to(node, { '--x': pos.x, '--y': pos.y, '--scale': pos.scale, '--rotation': `${pos.rotation}deg`, opacity: pos.opacity, filter: `drop-shadow(0 28px 22px rgba(0,0,0,.36)) blur(${pos.blur}px)`, zIndex: pos.z, duration }, at)
}

const arrowButton = { width: 46, height: 46, borderRadius: '50%', border: '1px solid rgba(255,255,255,.28)', background: 'rgba(0,0,0,.18)', color: '#fff', display: 'grid', placeItems: 'center', cursor: 'pointer', transition: 'background .2s ease, border-color .2s ease, transform .2s ease' }

export default function SpiritCarousel() {
  const [active, setActive] = useState(0)
  const [detailOpen, setDetailOpen] = useState(false)
  const activeRef = useRef(0), lockedRef = useRef(false), stageRef = useRef(null), bottleRefs = useRef([]), titleRef = useRef(null), infoRef = useRef(null), controlsRef = useRef(null), actionRef = useRef(null), detailRef = useRef(null), detailInfoRef = useRef(null)
  const dragRef = useRef({ id: null, x: 0, y: 0, active: false })
  const current = PRODUCTS[active]

  useLayoutEffect(() => {
    bottleRefs.current.forEach((node, index) => {
      if (!node) return
      const a = activeRef.current
      const position = index === a ? POSITIONS.hero : index === wrap(a + 1) ? POSITIONS.next : index === wrap(a - 1) ? POSITIONS.prev : POSITIONS.hiddenRight
      applyPosition(node, position)
    })
    if (stageRef.current) gsap.set(stageRef.current, { '--tone1': PRODUCTS[0].tones[0], '--tone2': PRODUCTS[0].tones[1], '--tone3': PRODUCTS[0].tones[2], '--accent': PRODUCTS[0].accent, '--glowX': '50%', '--glowY': '46%' })
  }, [])

  useEffect(() => {
    const preloaded = PRODUCTS.map((product) => { const image = new Image(); image.src = product.image; return image })
    return () => preloaded.forEach((image) => { image.src = '' })
  }, [])

  useEffect(() => {
    const onKeyDown = (event) => {
      if (detailOpen) { if (event.key === 'Escape') closeDetail(); return }
      if (event.key === 'ArrowRight') changeProduct(1)
      if (event.key === 'ArrowLeft') changeProduct(-1)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  })

  function resetParallax(animated = false) {
    const targets = [stageRef.current, titleRef.current, ...bottleRefs.current].filter(Boolean)
    const vars = { '--px': '0px', '--py': '0px', '--rx': '0deg', '--ry': '0deg', duration: animated ? 0.45 : 0, ease: 'power3.out', overwrite: 'auto' }
    targets.forEach((node) => animated ? gsap.to(node, vars) : gsap.set(node, vars))
  }

  function changeProduct(direction) {
    if (lockedRef.current || detailOpen) return
    lockedRef.current = true
    const old = activeRef.current, next = wrap(old + direction), oldHero = bottleRefs.current[old], incoming = bottleRefs.current[next], entering = bottleRefs.current[wrap(old + direction * 2)], exiting = bottleRefs.current[wrap(old - direction)]
    applyPosition(incoming, direction > 0 ? POSITIONS.hiddenRight : POSITIONS.hiddenLeft)
    applyPosition(entering, direction > 0 ? POSITIONS.hiddenRight : POSITIONS.hiddenLeft)
    gsap.killTweensOf([oldHero, incoming, entering, exiting, titleRef.current, infoRef.current, controlsRef.current, actionRef.current])
    const timeline = gsap.timeline({ defaults: { ease: 'power4.inOut' }, onComplete: () => { activeRef.current = next; setActive(next); resetParallax(); lockedRef.current = false } })
    timeline.to(stageRef.current, { '--tone1': PRODUCTS[next].tones[0], '--tone2': PRODUCTS[next].tones[1], '--tone3': PRODUCTS[next].tones[2], '--accent': PRODUCTS[next].accent, duration: 0.95 }, 0)
    moveTo(timeline, oldHero, direction > 0 ? POSITIONS.prev : POSITIONS.next, 0.92, 0)
    moveTo(timeline, incoming, POSITIONS.hero, 0.98, 0.03)
    moveTo(timeline, entering, direction > 0 ? POSITIONS.next : POSITIONS.prev, 0.9, 0.08)
    moveTo(timeline, exiting, direction > 0 ? POSITIONS.hiddenLeft : POSITIONS.hiddenRight, 0.72, 0)
    timeline.to([titleRef.current, infoRef.current, controlsRef.current, actionRef.current], { opacity: 0, y: -12, filter: 'blur(5px)', duration: 0.28, stagger: 0.025 }, 0)
      .call(() => { activeRef.current = next; setActive(next) }, [], 0.38)
      .fromTo([infoRef.current, controlsRef.current, actionRef.current], { opacity: 0, y: 15, filter: 'blur(5px)' }, { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.5, stagger: 0.04, ease: 'power3.out' }, 0.5)
      .fromTo(titleRef.current, { opacity: 0, y: 15, filter: 'blur(5px)' }, { opacity: 0.27, y: 0, filter: 'blur(0px)', duration: 0.5, ease: 'power3.out' }, 0.5)
  }

  function onPointerMove(event) {
    if (!stageRef.current || lockedRef.current) return
    const rect = stageRef.current.getBoundingClientRect(), x = Math.max(-1, Math.min(1, ((event.clientX - rect.left) / rect.width - 0.5) * 2)), y = Math.max(-1, Math.min(1, ((event.clientY - rect.top) / rect.height - 0.5) * 2))
    gsap.to(stageRef.current, { '--glowX': `${50 + x * 8}%`, '--glowY': `${46 + y * 6}%`, duration: 0.6, overwrite: 'auto' })
    if (titleRef.current) gsap.to(titleRef.current, { '--px': `${x * 8}px`, '--py': `${y * 5}px`, duration: 0.6, overwrite: 'auto' })
    const hero = bottleRefs.current[activeRef.current]
    if (hero) gsap.to(hero, { '--px': `${x * 7}px`, '--py': `${y * 4}px`, '--rx': `${-y * 1.1}deg`, '--ry': `${x * 1.6}deg`, duration: 0.6, overwrite: 'auto' })
  }

  function onPointerDown(event) {
    if (lockedRef.current || detailOpen) return
    dragRef.current = { id: event.pointerId, x: event.clientX, y: event.clientY, active: true }
    event.currentTarget.setPointerCapture?.(event.pointerId)
  }

  function onPointerUp(event) {
    const gesture = dragRef.current
    if (!gesture.active || gesture.id !== event.pointerId) return
    gesture.active = false
    const dx = event.clientX - gesture.x, dy = event.clientY - gesture.y
    if (Math.abs(dx) > 55 && Math.abs(dx) > Math.abs(dy) * 1.15) changeProduct(dx < 0 ? 1 : -1)
  }

  function openDetail() {
    if (lockedRef.current || detailOpen) return
    setDetailOpen(true)
    requestAnimationFrame(() => {
      const hero = bottleRefs.current[activeRef.current]
      gsap.killTweensOf([hero, titleRef.current, infoRef.current, controlsRef.current, actionRef.current])
      gsap.timeline({ defaults: { ease: 'power4.inOut' } })
        .to([titleRef.current, infoRef.current, controlsRef.current, actionRef.current], { opacity: 0, y: -24, filter: 'blur(8px)', duration: 0.4, stagger: 0.025 }, 0)
        .to(hero, { '--x': '-22vw', '--y': '0vh', '--scale': 1.08, '--rotation': '0deg', filter: 'brightness(1.2) drop-shadow(0 28px 22px rgba(0,0,0,.42))', duration: 0.85 }, 0.08)
        .fromTo(detailRef.current, { opacity: 0, yPercent: 7 }, { opacity: 1, yPercent: 0, duration: 0.8 }, 0.2)
        .fromTo(detailInfoRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.55 }, 0.48)
    })
  }

  function closeDetail() {
    if (!detailOpen) return
    const hero = bottleRefs.current[activeRef.current]
    gsap.timeline({ defaults: { ease: 'power4.inOut' }, onComplete: () => { setDetailOpen(false); resetParallax() } })
      .to(detailInfoRef.current, { opacity: 0, y: 25, duration: 0.3 }, 0)
      .to(detailRef.current, { opacity: 0, yPercent: 7, duration: 0.55 }, 0)
      .to(hero, { '--x': '0vw', '--y': '-1vh', '--scale': 1.1, filter: 'drop-shadow(0 28px 22px rgba(0,0,0,.36))', duration: 0.8 }, 0.05)
      .to([titleRef.current, infoRef.current, controlsRef.current, actionRef.current], { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.5, stagger: 0.04 }, 0.42)
  }

  return (
    <section ref={stageRef} onPointerMove={onPointerMove} onPointerLeave={() => resetParallax(true)} onPointerDown={onPointerDown} onPointerUp={onPointerUp} style={{ position: 'relative', minHeight: 'calc(100vh - 110px)', overflow: 'hidden', isolation: 'isolate', color: '#fff', background: 'radial-gradient(circle at var(--glowX,50%) var(--glowY,46%), color-mix(in srgb, var(--tone3,#555) 45%, transparent), transparent 28%), linear-gradient(135deg, var(--tone1,#111), var(--tone2,#222) 55%, #050505)', transition: 'background 0.25s ease', touchAction: 'pan-y' }}>
      <div style={{ position: 'absolute', inset: 0, zIndex: -1, background: 'linear-gradient(90deg, rgba(0,0,0,.24), transparent 45%, rgba(0,0,0,.34))' }} />
      <div style={{ position: 'absolute', inset: 0, zIndex: -1, opacity: 0.06, backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cfilter id=%27n%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%270.9%27 numOctaves=%274%27/%3E%3C/filter%3E%3Crect width=%27100%25%27 height=%27100%25%27 filter=%27url(%23n)%27/%3E%3C/svg%3E")', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', left: '50%', bottom: '13%', width: 'min(620px, 62vw)', height: '90px', transform: 'translateX(-50%)', borderRadius: '50%', background: 'radial-gradient(ellipse, color-mix(in srgb, var(--accent,#fff) 22%, transparent), transparent 68%)', filter: 'blur(18px)', opacity: 0.65, pointerEvents: 'none', zIndex: 1 }} />
      <div style={{ position: 'absolute', top: 'clamp(24px, 4vh, 48px)', left: 'clamp(28px, 3.5vw, 60px)', zIndex: 30, pointerEvents: 'none' }}><div style={{ display: 'flex', alignItems: 'center', gap: 10, fontFamily: 'monospace', fontSize: 10, letterSpacing: '.22em', color: 'rgba(255,255,255,.7)', fontWeight: 700 }}><span style={{ width: 28, height: 1, background: 'var(--accent,#fff)', display: 'block' }} />OUR SPIRITS</div></div>
      <div style={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center', pointerEvents: 'none', zIndex: 2 }}><div ref={titleRef} style={{ color: 'rgba(255,255,255,.27)', fontFamily: 'var(--font-jd-display, Arial Black, sans-serif)', fontSize: 'clamp(72px, 13.5vw, 215px)', lineHeight: 0.78, letterSpacing: '-.045em', whiteSpace: 'nowrap', transform: 'translate3d(var(--px,0px),var(--py,0px),0)', userSelect: 'none', textShadow: '0 0 32px rgba(255,255,255,.035)' }}>{current.ghost}</div></div>
      {PRODUCTS.map((product, index) => <img key={product.name} ref={(node) => { bottleRefs.current[index] = node }} src={product.image} alt={product.name} draggable="false" onClick={openDetail} style={bottleStyle} />)}
      <div ref={infoRef} style={{ position: 'absolute', left: 'clamp(28px, 3.5vw, 60px)', bottom: 'clamp(112px, 14vh, 152px)', width: 'min(390px, 34vw)', maxWidth: 'calc(100vw - 56px)', zIndex: 30 }}><div style={{ fontFamily: 'monospace', fontSize: 10, letterSpacing: '.22em', color: 'rgba(255,255,255,.58)', marginBottom: 13 }}>PROPRIETARY DISTILLATION</div><h2 style={{ margin: 0, fontFamily: 'var(--font-jd-display, Arial Black, sans-serif)', fontSize: 'clamp(28px, 2.5vw, 40px)', lineHeight: 0.92, fontWeight: 900, letterSpacing: '-.02em' }}>{current.brand}</h2><div style={{ marginTop: 12, fontSize: 'clamp(14px, 1.05vw, 17px)', lineHeight: 1.25, fontWeight: 700 }}>{current.product}</div><p style={{ margin: '12px 0 0', color: 'rgba(255,255,255,.72)', fontSize: 12, lineHeight: 1.55, maxWidth: 350 }}>{current.description}</p></div>
      <div ref={controlsRef} style={{ position: 'absolute', left: 'clamp(28px, 3.5vw, 60px)', bottom: 'clamp(24px, 3.5vh, 42px)', display: 'flex', alignItems: 'center', gap: 10, zIndex: 40 }}><button type="button" aria-label="Previous product" onPointerDown={(event) => event.stopPropagation()} onClick={() => changeProduct(-1)} style={arrowButton}><ArrowLeft size={18} /></button><button type="button" aria-label="Next product" onPointerDown={(event) => event.stopPropagation()} onClick={() => changeProduct(1)} style={arrowButton}><ArrowRight size={18} /></button><div style={{ marginLeft: 6, display: 'flex', alignItems: 'center', gap: 10 }}><span style={{ fontFamily: 'monospace', fontSize: 10, letterSpacing: '.18em', color: 'rgba(255,255,255,.8)' }}>{String(active + 1).padStart(2, '0')}</span><span style={{ width: 'clamp(54px, 6vw, 86px)', height: 1, background: 'rgba(255,255,255,.25)', position: 'relative', overflow: 'hidden' }}><span style={{ position: 'absolute', inset: 0, width: `${((active + 1) / PRODUCTS.length) * 100}%`, background: 'var(--accent,#fff)', transition: 'width .45s ease' }} /></span><span style={{ fontFamily: 'monospace', fontSize: 10, letterSpacing: '.18em', color: 'rgba(255,255,255,.48)' }}>{String(PRODUCTS.length).padStart(2, '0')}</span></div></div>
      <button ref={actionRef} type="button" onPointerDown={(event) => event.stopPropagation()} onClick={openDetail} style={{ position: 'absolute', right: 'clamp(28px, 3.5vw, 60px)', bottom: 'clamp(26px, 4vh, 48px)', zIndex: 40, border: 0, background: 'none', color: '#fff', cursor: 'pointer', fontFamily: 'var(--font-jd-display, Arial Black, sans-serif)', fontSize: 'clamp(22px, 2.1vw, 34px)', fontWeight: 900, letterSpacing: '-.035em', padding: 0, display: 'inline-flex', alignItems: 'center', gap: 8 }}>EXPLORE {current.category.toUpperCase()} <ArrowRight size={25} strokeWidth={2.5} /></button>
      <div ref={detailRef} style={{ position: 'absolute', inset: 0, zIndex: 35, overflowY: 'auto', opacity: 0, pointerEvents: detailOpen ? 'auto' : 'none', background: 'linear-gradient(180deg, rgba(0,0,0,.08), rgba(0,0,0,.86) 45%, #050505)', padding: '12vh clamp(28px, 7vw, 120px) 12vh' }}><button type="button" onClick={closeDetail} aria-label="Close details" style={{ position: 'fixed', top: 28, right: 32, zIndex: 50, width: 48, height: 48, borderRadius: '50%', border: '1px solid rgba(255,255,255,.25)', background: 'rgba(0,0,0,.3)', color: '#fff', cursor: 'pointer', display: 'grid', placeItems: 'center' }}><X size={20} /></button><div ref={detailInfoRef} style={{ marginLeft: '48%', maxWidth: 620, paddingTop: '10vh', paddingBottom: '10vh' }}><div style={{ fontFamily: 'monospace', fontSize: 10, letterSpacing: '.22em', color: 'rgba(255,255,255,.5)' }}>PRODUCT {String(active + 1).padStart(2, '0')}</div><h2 style={{ margin: '12px 0 10px', fontFamily: 'Arial Black, sans-serif', fontSize: 'clamp(42px, 7vw, 92px)', lineHeight: .82, letterSpacing: '-.05em' }}>{current.brand}</h2><p style={{ margin: 0, fontSize: 'clamp(20px, 2vw, 30px)', fontWeight: 700 }}>{current.product}</p><div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20, margin: '50px 0', padding: '24px 0', borderTop: '1px solid rgba(255,255,255,.18)', borderBottom: '1px solid rgba(255,255,255,.18)' }}><div><span style={{ display: 'block', color: 'rgba(255,255,255,.42)', fontFamily: 'monospace', fontSize: 10, letterSpacing: '.15em' }}>STYLE</span><strong style={{ display: 'block', marginTop: 8 }}>{current.style}</strong></div><div><span style={{ display: 'block', color: 'rgba(255,255,255,.42)', fontFamily: 'monospace', fontSize: 10, letterSpacing: '.15em' }}>CATEGORY</span><strong style={{ display: 'block', marginTop: 8 }}>{current.category}</strong></div><div><span style={{ display: 'block', color: 'rgba(255,255,255,.42)', fontFamily: 'monospace', fontSize: 10, letterSpacing: '.15em' }}>ORIGIN</span><strong style={{ display: 'block', marginTop: 8 }}>{current.origin}</strong></div></div><div style={{ borderTop: '1px solid rgba(255,255,255,.16)', paddingTop: 28 }}><div style={{ color: 'rgba(255,255,255,.45)', fontFamily: 'monospace', fontSize: 10, letterSpacing: '.18em' }}>01 / THE STORY</div><h3 style={{ margin: '12px 0', fontSize: 'clamp(28px, 4vw, 58px)', lineHeight: .92 }}>{current.tagline}</h3><p style={{ color: 'rgba(255,255,255,.68)', lineHeight: 1.7, maxWidth: 600 }}>{current.description}</p></div><div style={{ borderTop: '1px solid rgba(255,255,255,.16)', marginTop: 42, paddingTop: 28 }}><div style={{ color: 'rgba(255,255,255,.45)', fontFamily: 'monospace', fontSize: 10, letterSpacing: '.18em' }}>02 / HERITAGE</div><h3 style={{ margin: '12px 0', fontSize: 'clamp(28px, 4vw, 58px)', lineHeight: .92 }}>Built in Goa, rooted in 1980.</h3><p style={{ color: 'rgba(255,255,255,.68)', lineHeight: 1.7, maxWidth: 600 }}>NTS began in 1980 in Pondicherry and grew into a spirits operation anchored by its production facility in Canacona Industrial Estate, Goa.</p></div><div style={{ marginTop: 60, minHeight: '30vh', display: 'grid', placeItems: 'center', textAlign: 'center', borderTop: '1px solid rgba(255,255,255,.16)' }}><div><div style={{ color: 'rgba(255,255,255,.45)', fontFamily: 'monospace', fontSize: 10, letterSpacing: '.18em' }}>END OF EDITION</div><h3 style={{ margin: '12px 0', fontSize: 'clamp(30px, 5vw, 70px)', lineHeight: .9 }}>{current.name}</h3></div></div></div></div>
    </section>
  )
}
