import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ArrowLeft, ArrowRight } from 'lucide-react'

const PRODUCTS = [
  {
    id: 'old-town-whisky',
    brandName: 'OLD TOWN',
    productText: 'Indian Blended Malt Whisky',
    name: 'OLD TOWN Indian Blended Malt Whisky',
    category: 'Whisky',
    style: 'Malt Blended',
    ghostWord: 'MALT WHISKY',
    origin: 'Canacona, Goa, India',
    tagline: 'A malt blended whisky, built to lead the shelf.',
    description: 'Old Town Indian Blended Malt Whisky leads the NTS semi-premium portfolio with a label-forward malt blended whisky presence.',
    image: '/portfolio-images/old-town.png',
    tones: ['#1c0f06', '#5C3412', '#a3703b'],
    accent: '#e9a355',
  },
  {
    id: 'east-coast-premium-malt-whisky',
    brandName: 'EAST COAST',
    productText: 'Premium Malt Whisky',
    name: 'EAST COAST Premium Malt Whisky',
    category: 'Whisky',
    style: 'Premium Malt',
    ghostWord: 'PREMIUM MALT',
    origin: 'Canacona, Goa, India',
    tagline: 'Premium malt, poured for the everyday table.',
    description: 'EAST COAST Premium Malt Whisky is part of the NTS semi-premium portfolio with a premium malt whisky identity.',
    image: '/portfolio-images/east-coast-premium-malt-whisky.png',
    tones: ['#08131a', '#1F3A4A', '#4d7f96'],
    accent: '#7fd1e6',
  },
  {
    id: 'east-coast-rum',
    brandName: 'EAST COAST',
    productText: 'xxx Rum',
    name: 'EAST COAST xxx Rum',
    category: 'Rum',
    style: 'XXX Rum',
    ghostWord: 'XXX RUM',
    origin: 'Canacona, Goa, India',
    tagline: 'Bold rum character, off the Goa line.',
    description: 'EAST COAST xxx Rum brings a bold rum expression to the NTS portfolio with strong shelf recognition.',
    image: '/portfolio-images/east-coast-xxx-rum.png',
    tones: ['#180705', '#4A1B12', '#8a3f24'],
    accent: '#e2833f',
  },
  {
    id: 'east-coast-brandy',
    brandName: 'EAST COAST',
    productText: 'Indian Blended Brandy',
    name: 'EAST COAST Indian Blended Brandy',
    category: 'Brandy',
    style: 'Blended Brandy',
    ghostWord: 'INDIAN BRANDY',
    origin: 'Canacona, Goa, India',
    tagline: 'A smooth blended brandy, East Coast style.',
    description: 'EAST COAST Indian Blended Brandy carries the East Coast range with a smooth blended brandy identity.',
    image: '/portfolio-images/east-coast-indian-blended-brandy.png',
    tones: ['#12040c', '#3A1228', '#6e2650'],
    accent: '#d9799b',
  },
  {
    id: 'wanted-999',
    brandName: 'WANTED 999',
    productText: 'Vsop Brandy',
    name: 'WANTED 999 Vsop Brandy',
    category: 'Brandy',
    style: 'VSOP Brandy',
    ghostWord: 'VSOP BRANDY',
    origin: 'Canacona, Goa, India',
    tagline: 'Rich VSOP brandy, built for recognition.',
    description: 'WANTED 999 Vsop Brandy is part of the NTS house portfolio, built around a rich VSOP brandy profile and strong shelf recognition.',
    image: '/portfolio-images/wanted.png',
    tones: ['#0b0804', '#221A0C', '#4a3a1c'],
    accent: '#c9a13b',
  },
]

const POSITIONS = {
  hero: { x: '0vw', y: '0vh', scale: 1.2, rotation: 0, opacity: 1, blur: 0, zIndex: 20 },
  next: { x: '35vw', y: '2vh', scale: 0.42, rotation: 8, opacity: 0.52, blur: 5, zIndex: 8 },
  prev: { x: '-35vw', y: '2vh', scale: 0.42, rotation: -8, opacity: 0.52, blur: 5, zIndex: 8 },
  hiddenRight: { x: '64vw', y: '6vh', scale: 0.25, rotation: 13, opacity: 0, blur: 12, zIndex: 2 },
  hiddenLeft: { x: '-64vw', y: '6vh', scale: 0.25, rotation: -13, opacity: 0, blur: 12, zIndex: 2 },
}

const wrap = (n) => (n + PRODUCTS.length) % PRODUCTS.length

const GRAIN_URL = "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.08'/%3E%3C/svg%3E\")"

function setBottlePosition(node, position) {
  if (!node) return
  gsap.set(node, {
    left: '50%',
    '--detail-left': '50%',
    '--base-x': position.x,
    '--base-y': position.y,
    '--base-scale': position.scale,
    '--base-rotation': `${position.rotation}deg`,
    opacity: position.opacity,
    filter: `drop-shadow(0 28px 22px rgba(0,0,0,.36)) blur(${position.blur}px)`,
    zIndex: position.zIndex,
  })
}

function animateBottlePosition(timeline, node, position, duration, at = 0) {
  if (!node) return
  timeline.to(node, {
    '--base-x': position.x,
    '--base-y': position.y,
    '--base-scale': position.scale,
    '--base-rotation': `${position.rotation}deg`,
    opacity: position.opacity,
    filter: `drop-shadow(0 28px 22px rgba(0,0,0,.36)) blur(${position.blur}px)`,
    zIndex: position.zIndex,
    duration,
  }, at)
}

const bottleStyle = {
  position: 'absolute',
  top: '50%',
  width: 'clamp(250px, 25vw, 420px)',
  maxWidth: '42vw',
  maxHeight: '68vh',
  objectFit: 'contain',
  transform: 'translate(-50%, -50%) translate3d(calc(var(--base-x, 0vw) + var(--parallax-x, 0px)), calc(var(--base-y, 0vh) + var(--parallax-y, 0px)), 0) scale(var(--base-scale, 1)) rotate(var(--base-rotation, 0deg)) rotateX(var(--parallax-rx, 0deg)) rotateY(var(--parallax-ry, 0deg))',
  transformOrigin: 'center center',
  willChange: 'transform, opacity, filter',
  userSelect: 'none',
  pointerEvents: 'none',
}

export default function SpiritCarousel() {
  const [active, setActive] = useState(0)
  const [detailOpen, setDetailOpen] = useState(false)
  const activeRef = useRef(0)
  const lockedRef = useRef(false)
  const stageRef = useRef(null)
  const bottleRefs = useRef([])
  const titleRef = useRef(null)
  const infoRef = useRef(null)
  const counterRef = useRef(null)
  const actionRef = useRef(null)
  const detailRef = useRef(null)
  const detailInfoRef = useRef(null)
  const detailButtonRef = useRef(null)
  const gestureRef = useRef({ pointerId: null, startX: 0, startY: 0, lastX: 0, lastY: 0, active: false })
  const current = PRODUCTS[active]

  useLayoutEffect(() => {
    bottleRefs.current.forEach((node, i) => {
      if (!node) return
      const position = i === activeRef.current
        ? POSITIONS.hero
        : i === wrap(activeRef.current + 1)
          ? POSITIONS.next
          : i === wrap(activeRef.current - 1)
            ? POSITIONS.prev
            : POSITIONS.hiddenRight
      setBottlePosition(node, position)
      gsap.set(node, { '--parallax-x': '0px', '--parallax-y': '0px', '--parallax-rx': '0deg', '--parallax-ry': '0deg' })
    })
    if (titleRef.current) gsap.set(titleRef.current, { '--parallax-x': '0px', '--parallax-y': '0px', '--parallax-rx': '0deg', '--parallax-ry': '0deg', opacity: 0.18 })
    if (detailInfoRef.current) gsap.set(detailInfoRef.current, { '--parallax-x': '0px', '--parallax-y': '0px', '--parallax-rx': '0deg', '--parallax-ry': '0deg' })
  }, [])

  useEffect(() => {
    const preload = PRODUCTS.map(({ image }) => { const img = new Image(); img.src = image; return img })
    return () => preload.forEach((img) => { img.src = '' })
  }, [])

  useEffect(() => {
    const onKey = (event) => {
      if (detailOpen) {
        if (event.key === 'Escape') closeDetail()
        return
      }
      if (event.key === 'ArrowRight') changeProduct(1)
      if (event.key === 'ArrowLeft') changeProduct(-1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  })

  function resetParallax(immediate = true) {
    const targets = [titleRef.current, detailInfoRef.current, ...bottleRefs.current].filter(Boolean)
    gsap.killTweensOf(targets)
    const vars = { '--parallax-x': '0px', '--parallax-y': '0px', '--parallax-rx': '0deg', '--parallax-ry': '0deg', duration: immediate ? 0 : 0.45, ease: 'power3.out', overwrite: 'auto' }
    targets.forEach((node) => immediate ? gsap.set(node, vars) : gsap.to(node, vars))
  }

  function changeProduct(direction) {
    if (lockedRef.current || detailOpen) return
    lockedRef.current = true
    resetParallax(true)
    const old = activeRef.current
    const next = wrap(old + direction)
    const oldHero = bottleRefs.current[old]
    const incoming = bottleRefs.current[next]
    const entering = bottleRefs.current[wrap(old + direction * 2)]
    const exiting = bottleRefs.current[wrap(old - direction)]

    setBottlePosition(entering, direction > 0 ? POSITIONS.hiddenRight : POSITIONS.hiddenLeft)
    setBottlePosition(incoming, direction > 0 ? POSITIONS.hiddenRight : POSITIONS.hiddenLeft)
    gsap.killTweensOf([titleRef.current, infoRef.current, counterRef.current, actionRef.current, oldHero, incoming, entering, exiting])

    const timeline = gsap.timeline({
      defaults: { ease: 'power4.inOut' },
      onComplete: () => {
        activeRef.current = next
        setActive(next)
        resetParallax(true)
        lockedRef.current = false
      },
    })

    timeline.to(stageRef.current, {
      '--tone-1': PRODUCTS[next].tones[0],
      '--tone-2': PRODUCTS[next].tones[1],
      '--tone-3': PRODUCTS[next].tones[2],
      '--accent': PRODUCTS[next].accent,
      duration: 0.95,
    }, 0)
    animateBottlePosition(timeline, oldHero, direction > 0 ? POSITIONS.prev : POSITIONS.next, 0.92, 0)
    animateBottlePosition(timeline, incoming, POSITIONS.hero, 0.98, 0.03)
    animateBottlePosition(timeline, entering, direction > 0 ? POSITIONS.next : POSITIONS.prev, 0.9, 0.08)
    animateBottlePosition(timeline, exiting, direction > 0 ? POSITIONS.hiddenLeft : POSITIONS.hiddenRight, 0.72, 0)

    timeline.to([titleRef.current, infoRef.current, counterRef.current, actionRef.current], { opacity: 0, y: -12, filter: 'blur(5px)', duration: 0.28, stagger: 0.025 }, 0)
      .call(() => { activeRef.current = next; setActive(next) }, [], 0.38)
      .fromTo([infoRef.current, counterRef.current, actionRef.current], { opacity: 0, y: 15, filter: 'blur(5px)' }, { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.5, stagger: 0.04, ease: 'power3.out' }, 0.5)
      .fromTo(titleRef.current, { opacity: 0, y: 15, filter: 'blur(5px)' }, { opacity: 0.18, y: 0, filter: 'blur(0px)', duration: 0.5, ease: 'power3.out' }, 0.5)
  }

  const onPointerMove = (event) => {
    if (!stageRef.current || lockedRef.current) return
    const rect = stageRef.current.getBoundingClientRect()
    const x = Math.max(-1, Math.min(1, ((event.clientX - rect.left) / rect.width - 0.5) * 2))
    const y = Math.max(-1, Math.min(1, ((event.clientY - rect.top) / rect.height - 0.5) * 2))
    gsap.to(stageRef.current, { '--parallax-x': `${x * 3}px`, '--parallax-y': `${y * 2}px`, '--glow-x': `${50 + x * 8}%`, '--glow-y': `${46 + y * 6}%`, duration: 0.65, ease: 'power3.out', overwrite: 'auto' })
    if (!detailOpen && titleRef.current) gsap.to(titleRef.current, { '--parallax-x': `${x * 8}px`, '--parallax-y': `${y * 5}px`, '--parallax-rx': `${-y * 0.45}deg`, '--parallax-ry': `${x * 0.65}deg`, duration: 0.65, ease: 'power3.out', overwrite: 'auto' })
    const hero = bottleRefs.current[activeRef.current]
    if (hero) gsap.to(hero, { '--parallax-x': `${x * (detailOpen ? 5 : 7)}px`, '--parallax-y': `${y * (detailOpen ? 3 : 4)}px`, '--parallax-rx': `${-y * 1.1}deg`, '--parallax-ry': `${x * 1.6}deg`, duration: 0.65, ease: 'power3.out', overwrite: 'auto' })
    if (detailOpen && detailInfoRef.current) gsap.to(detailInfoRef.current, { '--parallax-x': `${x * 6}px`, '--parallax-y': `${y * 4}px`, '--parallax-rx': `${-y * 0.35}deg`, '--parallax-ry': `${x * 0.55}deg`, duration: 0.65, ease: 'power3.out', overwrite: 'auto' })
  }

  const onPointerLeave = () => {
    if (lockedRef.current) return
    resetParallax(false)
    gsap.to(stageRef.current, { '--parallax-x': '0px', '--parallax-y': '0px', '--glow-x': '50%', '--glow-y': '46%', duration: 0.5, ease: 'power3.out', overwrite: 'auto' })
  }

  const onWheel = (event) => {
    if (!detailOpen) {
      event.preventDefault()
      if (Math.abs(event.deltaY) < 8) return
      changeProduct(event.deltaY > 0 ? 1 : -1)
    }
  }

  const isInteractiveTarget = (target) => Boolean(target?.closest?.('button, a, input, textarea, select, [data-no-swipe]'))

  const onPointerDown = (event) => {
    if (detailOpen || lockedRef.current || !event.isPrimary || event.button !== 0 || isInteractiveTarget(event.target)) return
    gestureRef.current = { pointerId: event.pointerId, startX: event.clientX, startY: event.clientY, lastX: event.clientX, lastY: event.clientY, active: true }
    event.currentTarget.setPointerCapture?.(event.pointerId)
  }

  const onPointerGestureMove = (event) => {
    const gesture = gestureRef.current
    if (!gesture.active || gesture.pointerId !== event.pointerId || detailOpen || lockedRef.current) return
    gesture.lastX = event.clientX
    gesture.lastY = event.clientY
    const dx = event.clientX - gesture.startX
    const dy = event.clientY - gesture.startY
    if (Math.abs(dx) > Math.abs(dy) * 1.15 && Math.abs(dx) > 12) event.preventDefault()
  }

  const finishPointerGesture = (event) => {
    const gesture = gestureRef.current
    if (!gesture.active || gesture.pointerId !== event.pointerId) return
    const dx = gesture.lastX - gesture.startX
    const dy = gesture.lastY - gesture.startY
    const threshold = Math.max(48, Math.min(110, (stageRef.current?.clientWidth || window.innerWidth) * 0.075))
    const shouldSwipe = Math.abs(dx) > Math.abs(dy) * 1.15 && Math.abs(dx) >= threshold && !detailOpen && !lockedRef.current
    gestureRef.current = { pointerId: null, startX: 0, startY: 0, lastX: 0, lastY: 0, active: false }
    if (event.currentTarget.hasPointerCapture?.(event.pointerId)) event.currentTarget.releasePointerCapture?.(event.pointerId)
    if (shouldSwipe) changeProduct(dx < 0 ? 1 : -1)
  }

  const onPointerCancel = (event) => {
    if (gestureRef.current.pointerId === event.pointerId) gestureRef.current = { pointerId: null, startX: 0, startY: 0, lastX: 0, lastY: 0, active: false }
  }

  const openDetail = () => {
    if (lockedRef.current || detailOpen) return
    lockedRef.current = true
    resetParallax(true)
    const hero = bottleRefs.current[activeRef.current]
    const otherBottles = bottleRefs.current.filter((node) => node && node !== hero)
    gsap.killTweensOf([hero, ...otherBottles, detailRef.current, detailInfoRef.current, detailButtonRef.current, titleRef.current, infoRef.current, counterRef.current, actionRef.current])
    gsap.set(detailRef.current, { opacity: 0 })
    gsap.set(detailInfoRef.current, { opacity: 0, filter: 'blur(8px)', '--parallax-x': '0px', '--parallax-y': '0px', '--parallax-rx': '0deg', '--parallax-ry': '0deg' })
    gsap.set(detailButtonRef.current, { opacity: 0, y: -6, filter: 'blur(4px)' })
    gsap.set(titleRef.current, { opacity: 0, y: -12, filter: 'blur(6px)' })
    gsap.set(infoRef.current, { opacity: 0, y: 12, filter: 'blur(6px)' })
    gsap.set(counterRef.current, { opacity: 0, y: 12, filter: 'blur(6px)' })
    gsap.set(actionRef.current, { opacity: 0, y: 12, filter: 'blur(6px)' })
    gsap.set(otherBottles, { opacity: 0, filter: 'blur(12px)', zIndex: 1 })
    gsap.set(hero, { left: '50%', '--detail-left': '50%' })
    setDetailOpen(true)
    requestAnimationFrame(() => {
      if (!hero || !detailRef.current || !detailInfoRef.current || !detailButtonRef.current) { lockedRef.current = false; return }
      const detailTarget = window.matchMedia('(max-width: 800px)').matches ? '50%' : '75%'
      const timeline = gsap.timeline({ defaults: { ease: 'power3.out' }, onComplete: () => { lockedRef.current = false } })
      timeline.to(detailRef.current, { opacity: 1, duration: 0.32 }, 0)
        .to(hero, { '--detail-left': detailTarget, '--base-x': '0vw', '--base-y': '0vh', '--base-scale': 1.28, '--base-rotation': '0deg', opacity: 1, filter: 'drop-shadow(0 28px 22px rgba(0,0,0,.36)) blur(0px)', zIndex: 90, duration: 0.82, ease: 'power4.inOut' }, 0)
        .to(detailButtonRef.current, { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.34 }, 0.08)
        .to(detailInfoRef.current, { opacity: 1, filter: 'blur(0px)', duration: 0.55 }, 0.12)
    })
  }

  const closeDetail = () => {
    if (!detailOpen || lockedRef.current) return
    lockedRef.current = true
    resetParallax(true)
    const hero = bottleRefs.current[activeRef.current]
    if (!hero || !detailRef.current || !detailInfoRef.current || !detailButtonRef.current) { lockedRef.current = false; return }
    gsap.killTweensOf([hero, detailRef.current, detailInfoRef.current, detailButtonRef.current, titleRef.current, infoRef.current, counterRef.current, actionRef.current])
    gsap.set(titleRef.current, { opacity: 0, y: -12, filter: 'blur(6px)' })
    gsap.set(infoRef.current, { opacity: 0, y: 12, filter: 'blur(6px)' })
    gsap.set(counterRef.current, { opacity: 0, y: 12, filter: 'blur(6px)' })
    gsap.set(actionRef.current, { opacity: 0, y: 12, filter: 'blur(6px)' })
    const timeline = gsap.timeline({ defaults: { ease: 'power4.inOut' }, onComplete: () => { setDetailOpen(false); setBottlePosition(hero, POSITIONS.hero); lockedRef.current = false } })
    timeline.to(detailInfoRef.current, { opacity: 0, filter: 'blur(8px)', duration: 0.28 }, 0)
      .to(detailButtonRef.current, { opacity: 0, y: -6, filter: 'blur(4px)', duration: 0.24 }, 0)
      .to(hero, { '--detail-left': '50%', '--base-x': '0vw', '--base-y': '0vh', '--base-scale': POSITIONS.hero.scale, '--base-rotation': '0deg', opacity: 1, filter: 'drop-shadow(0 28px 22px rgba(0,0,0,.36)) blur(0px)', zIndex: 20, duration: 0.72 }, 0.02)
      .to(detailRef.current, { opacity: 0, duration: 0.32 }, 0.42)
      .to([titleRef.current, infoRef.current, counterRef.current, actionRef.current], { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.42, stagger: 0.035, ease: 'power3.out' }, 0.22)
  }

  return (
    <section id="flavors" className="relative w-full overflow-hidden select-none border-t border-white/10">
      <div
        ref={stageRef}
        className="relative w-full"
        style={{
          height: '100svh',
          minHeight: 660,
          overflow: 'hidden',
          touchAction: detailOpen ? 'auto' : 'pan-y',
          perspective: '1100px',
          background: 'radial-gradient(circle at var(--glow-x,50%) var(--glow-y,46%), color-mix(in srgb, var(--tone-3,#a3703b) 25%, transparent), transparent 30%), linear-gradient(135deg, var(--tone-1,#1c0f06), var(--tone-2,#5C3412) 52%, var(--tone-1,#1c0f06))',
          '--tone-1': current.tones[0],
          '--tone-2': current.tones[1],
          '--tone-3': current.tones[2],
          '--accent': current.accent,
        }}
        onPointerMove={onPointerMove}
        onPointerLeave={onPointerLeave}
        onPointerDown={onPointerDown}
        onPointerMoveCapture={onPointerGestureMove}
        onPointerUp={finishPointerGesture}
        onPointerCancel={onPointerCancel}
        onWheel={onWheel}
      >
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: GRAIN_URL, backgroundSize: '200px 200px', opacity: 0.28, zIndex: 1 }} />
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(circle at 50% 55%, transparent 20%, rgba(0,0,0,.28) 70%, rgba(0,0,0,.7) 100%)', zIndex: 2 }} />

        <div ref={titleRef} className="absolute left-0 right-0 top-[13%] pointer-events-none" style={{ zIndex: 3, transform: 'translate3d(var(--parallax-x,0px),var(--parallax-y,0px),0) rotateX(var(--parallax-rx,0deg)) rotateY(var(--parallax-ry,0deg))', willChange: 'transform,opacity' }}>
          <div style={{ fontFamily: 'var(--font-jd-display,Arial Black,sans-serif)', fontWeight: 950, fontSize: 'clamp(72px, 13vw, 220px)', lineHeight: 0.78, letterSpacing: '-0.055em', textAlign: 'center', whiteSpace: 'nowrap', color: '#fff', opacity: 0.72 }}>{current.ghostWord}</div>
        </div>

        <div className="absolute left-5 sm:left-8 top-7 sm:top-9 z-30" style={{ fontFamily: 'var(--font-mono,monospace)', fontSize: 11, fontWeight: 800, letterSpacing: '.24em', textTransform: 'uppercase', color: 'rgba(255,255,255,.82)' }}>Proprietary Distillation</div>

        <div className="absolute inset-x-0 top-0 bottom-0" style={{ zIndex: 10 }}>
          {PRODUCTS.map((product, index) => (
            <img
              key={product.id}
              ref={(node) => { bottleRefs.current[index] = node }}
              src={product.image}
              alt={product.name}
              draggable={false}
              style={bottleStyle}
            />
          ))}
        </div>

        <div className="absolute left-5 right-5 sm:left-8 sm:right-8 bottom-7 sm:bottom-10 flex items-end justify-between gap-6" style={{ zIndex: 30 }}>
          <div ref={infoRef} style={{ maxWidth: 360 }}>
            <p style={{ margin: 0, color: '#fff', fontFamily: 'var(--font-jd-display,Arial Black,sans-serif)', fontSize: 'clamp(20px,2.5vw,30px)', fontWeight: 950, lineHeight: .95 }}>{current.brandName}</p>
            <p style={{ margin: '8px 0 10px', color: 'rgba(255,255,255,.88)', fontSize: 'clamp(13px,1.3vw,16px)', fontWeight: 750 }}>{current.productText}</p>
            <p className="hidden sm:block" style={{ margin: '0 0 20px', maxWidth: 330, color: 'rgba(255,255,255,.72)', fontSize: 13, lineHeight: 1.55 }}>{current.description}</p>
            <div className="flex items-center gap-3">
              <button type="button" onClick={() => changeProduct(-1)} aria-label="Previous spirit" style={{ width: 54, height: 54, borderRadius: '50%', border: '2px solid rgba(255,255,255,.78)', background: 'transparent', color: '#fff', display: 'grid', placeItems: 'center', cursor: 'pointer' }}><ArrowLeft size={21} /></button>
              <button type="button" onClick={() => changeProduct(1)} aria-label="Next spirit" style={{ width: 54, height: 54, borderRadius: '50%', border: '2px solid rgba(255,255,255,.78)', background: 'transparent', color: '#fff', display: 'grid', placeItems: 'center', cursor: 'pointer' }}><ArrowRight size={21} /></button>
              <span ref={counterRef} style={{ fontFamily: 'var(--font-mono,monospace)', color: 'rgba(255,255,255,.62)', fontSize: 11, marginLeft: 3 }}>{String(active + 1).padStart(2, '0')} / {String(PRODUCTS.length).padStart(2, '0')}</span>
            </div>
          </div>

          <button ref={actionRef} type="button" onClick={openDetail} className="hidden sm:flex items-center gap-2" style={{ border: 0, background: 'transparent', color: '#fff', cursor: 'pointer', fontFamily: 'var(--font-jd-display,Arial Black,sans-serif)', fontWeight: 950, fontSize: 'clamp(18px,2.6vw,34px)', textTransform: 'uppercase', letterSpacing: '-.025em' }}>
            <span>View details</span><ArrowRight size={28} />
          </button>
        </div>

        <div ref={detailRef} aria-hidden={!detailOpen} style={{ position: 'absolute', inset: 0, zIndex: 80, opacity: 0, overflowY: 'auto', overflowX: 'hidden', background: 'rgba(4,4,4,.94)', backdropFilter: 'blur(18px)' }}>
          <button ref={detailButtonRef} type="button" onClick={closeDetail} style={{ position: 'sticky', top: 28, left: 28, zIndex: 100, margin: '28px 0 0 28px', display: 'inline-flex', alignItems: 'center', gap: 8, color: '#fff', background: 'rgba(255,255,255,.08)', border: '1px solid rgba(255,255,255,.22)', borderRadius: 999, padding: '11px 16px', cursor: 'pointer', fontWeight: 800 }}><ArrowLeft size={16} /> Back</button>
          <div ref={detailInfoRef} style={{ minHeight: '100%', padding: '7vh 7vw 12vh', display: 'grid', alignItems: 'center', gridTemplateColumns: 'minmax(280px, .8fr) minmax(300px, 1.2fr)', gap: '6vw' }}>
            <div style={{ position: 'relative' }}>
              <p style={{ margin: '0 0 12px', color: 'var(--accent)', fontFamily: 'var(--font-mono,monospace)', fontSize: 11, fontWeight: 800, letterSpacing: '.24em', textTransform: 'uppercase' }}>{current.category}</p>
              <h2 style={{ margin: 0, color: '#fff', fontFamily: 'var(--font-jd-display,Arial Black,sans-serif)', fontSize: 'clamp(52px,8vw,120px)', fontWeight: 950, lineHeight: .82, letterSpacing: '-.05em', textTransform: 'uppercase' }}>{current.ghostWord}</h2>
              <p style={{ maxWidth: 560, color: 'rgba(255,255,255,.72)', fontSize: 'clamp(15px,1.5vw,19px)', lineHeight: 1.6, marginTop: 28 }}>{current.description}</p>
              <div className="grid grid-cols-2 gap-6" style={{ marginTop: 34, maxWidth: 520 }}>
                <div><span style={{ display: 'block', color: 'rgba(255,255,255,.42)', fontFamily: 'var(--font-mono,monospace)', fontSize: 10, textTransform: 'uppercase', letterSpacing: '.18em' }}>Style</span><strong style={{ color: '#fff', display: 'block', marginTop: 7 }}>{current.style}</strong></div>
                <div><span style={{ display: 'block', color: 'rgba(255,255,255,.42)', fontFamily: 'var(--font-mono,monospace)', fontSize: 10, textTransform: 'uppercase', letterSpacing: '.18em' }}>Origin</span><strong style={{ color: '#fff', display: 'block', marginTop: 7 }}>{current.origin}</strong></div>
              </div>
            </div>
            <div style={{ display: 'grid', gap: 28 }}>
              <div style={{ borderTop: '1px solid rgba(255,255,255,.16)', paddingTop: 28 }}>
                <p style={{ color: 'rgba(255,255,255,.45)', fontFamily: 'var(--font-mono,monospace)', fontSize: 10, letterSpacing: '.18em', textTransform: 'uppercase', margin: 0 }}>01 / The story</p>
                <h3 style={{ color: '#fff', fontFamily: 'var(--font-jd-display,Arial Black,sans-serif)', fontSize: 'clamp(28px,4vw,58px)', lineHeight: .92, margin: '12px 0' }}>{current.tagline}</h3>
                <p style={{ color: 'rgba(255,255,255,.68)', lineHeight: 1.65, maxWidth: 620, margin: 0 }}>{current.description}</p>
              </div>
              <div style={{ borderTop: '1px solid rgba(255,255,255,.16)', paddingTop: 28 }}>
                <p style={{ color: 'rgba(255,255,255,.45)', fontFamily: 'var(--font-mono,monospace)', fontSize: 10, letterSpacing: '.18em', textTransform: 'uppercase', margin: 0 }}>02 / Heritage</p>
                <h3 style={{ color: '#fff', fontFamily: 'var(--font-jd-display,Arial Black,sans-serif)', fontSize: 'clamp(28px,4vw,58px)', lineHeight: .92, margin: '12px 0' }}>Built in Goa, rooted in 1980.</h3>
                <p style={{ color: 'rgba(255,255,255,.68)', lineHeight: 1.65, maxWidth: 620, margin: 0 }}>NTS began in 1980 in Pondicherry and grew into a spirits operation anchored by its production facility in Canacona Industrial Estate, Goa.</p>
              </div>
              <div style={{ borderTop: '1px solid rgba(255,255,255,.16)', paddingTop: 28, minHeight: 240 }}>
                <p style={{ color: 'rgba(255,255,255,.45)', fontFamily: 'var(--font-mono,monospace)', fontSize: 10, letterSpacing: '.18em', textTransform: 'uppercase', margin: 0 }}>03 / Character</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end', gap: 20, marginTop: 24, flexWrap: 'wrap' }}><h3 style={{ color: '#fff', fontFamily: 'var(--font-jd-display,Arial Black,sans-serif)', fontSize: 'clamp(40px,6vw,90px)', lineHeight: .82, margin: 0 }}>{current.brandName}</h3><div style={{ color: 'rgba(255,255,255,.72)', lineHeight: 1.8 }}><div>{current.style}</div><div>{current.origin}</div><div>{current.category}</div></div></div>
              </div>
              <div style={{ minHeight: '35vh', display: 'grid', placeItems: 'center', textAlign: 'center', border-top: '1px solid rgba(255,255,255,.16)' }}>
                <div><p style={{ color: 'rgba(255,255,255,.45)', fontFamily: 'var(--font-mono,monospace)', fontSize: 10, letterSpacing: '.18em', textTransform: 'uppercase' }}>End of edition</p><h3 style={{ color: '#fff', fontFamily: 'var(--font-jd-display,Arial Black,sans-serif)', fontSize: 'clamp(30px,5vw,70px)', margin: '12px 0', lineHeight: .9 }}>{current.name}</h3></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
