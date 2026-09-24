import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ArrowLeft, ArrowRight } from 'lucide-react'

const CAROUSEL_ITEMS = [
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
    description:
      'Old Town Indian Blended Malt Whisky leads the NTS semi-premium portfolio with a label-forward malt blended whisky presence.',
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
    description:
      'EAST COAST Premium Malt Whisky is part of the NTS semi-premium portfolio with a premium malt whisky identity.',
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
    description:
      'EAST COAST xxx Rum brings a bold rum expression to the NTS portfolio with strong shelf recognition.',
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
    description:
      'EAST COAST Indian Blended Brandy carries the East Coast range with a smooth blended brandy identity.',
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
    description:
      'WANTED 999 Vsop Brandy is part of the NTS house portfolio, built around a rich VSOP brandy profile and strong shelf recognition.',
    image: '/portfolio-images/wanted.png',
    tones: ['#0b0804', '#221A0C', '#4a3a1c'],
    accent: '#c9a13b',
  },
]

// Real NTS heritage facts (see src/data/siteData.js companyFacts/facilityStats
// and AboutUs.jsx) — shared across every product rather than invented
// per-brand history, since NTS's origin story sits at the company level.
const HERITAGE = {
  title: 'Built in Goa, rooted in 1980.',
  lead:
    'NTS began in 1980 in Pondicherry as NTS Wines under Mr. N.T. Sambath, growing through decades of IMFL and beer distribution before anchoring production at a purpose-built facility.',
  body:
    'That facility now runs from a three-acre site in Canacona Industrial Estate, Goa — rotary washers, 8-head vacuum fillers, ROPP and Guala cap systems, and an R&D lab behind every bottle that carries the NTS name.',
  image: '/images/Canacona_vodka_bottles_orange_ba…_202607231523.jpeg',
  imageAlt: 'NTS manufacturing facility at Canacona Industrial Estate, Goa',
  imageLabel: 'CANACONA / GOA',
}

const COUNT = CAROUSEL_ITEMS.length
const wrap = (n) => (n + COUNT) % COUNT

const GRAIN_URL =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.08'/%3E%3C/svg%3E\")"

// Diagonal cascade: every bottle sits on a slot relative to the active one
// (-2..+2). Slots step up to the right, tilt further each step, and the
// outer ones are cropped by the stage edge. x is in vw, y in vh (positive is
// down), measured from the focused bottle's resting foot position.
const HERO_DETAIL_SCALE = 1.3
const SLOTS_DESKTOP = {
  '-2': { x: -45, y: 6, scale: 0.5, rotation: -18, opacity: 0.35, z: 3 },
  '-1': { x: -22, y: 3, scale: 0.74, rotation: -9, opacity: 0.9, z: 6 },
  '0': { x: 4, y: 0, scale: 1, rotation: 0, opacity: 1, z: 10 },
  '1': { x: 30, y: -5, scale: 0.74, rotation: 9, opacity: 0.9, z: 6 },
  '2': { x: 49, y: -10, scale: 0.5, rotation: 18, opacity: 0.6, z: 3 },
}
const SLOTS_MOBILE = {
  '-2': { x: -70, y: 8, scale: 0.5, rotation: -20, opacity: 0, z: 3 },
  '-1': { x: -42, y: 5, scale: 0.7, rotation: -12, opacity: 0.85, z: 6 },
  '0': { x: 0, y: 0, scale: 1, rotation: 0, opacity: 1, z: 10 },
  '1': { x: 42, y: -5, scale: 0.7, rotation: 12, opacity: 0.85, z: 6 },
  '2': { x: 70, y: -8, scale: 0.5, rotation: 20, opacity: 0, z: 3 },
}

const getSlots = () =>
  typeof window !== 'undefined' && window.matchMedia('(max-width: 640px)').matches ? SLOTS_MOBILE : SLOTS_DESKTOP

// Signed, wrapped offset of item `index` from the active item, in [-2, 2].
const slotOf = (index, activeIndex) => {
  const half = Math.floor(COUNT / 2)
  return ((((index - activeIndex + half) % COUNT) + COUNT) % COUNT) - half
}

const slotVars = (slot) => ({
  '--base-x': `${slot.x}vw`,
  '--base-y': `${slot.y}vh`,
  '--base-scale': slot.scale,
  '--base-rotation': `${slot.rotation}deg`,
  opacity: slot.opacity,
  zIndex: slot.z,
})

/**
 * Bottle showcase ported from github.com/Aaron-Samuel05/alcshowcase: the
 * five-slot wheel, pointer-follow 3D tilt, and an "explore bottle" detail
 * view that grows the hero bottle and slides tasting/origin copy in beside
 * it. Adapted to NTS's real product data and design system — kept out of
 * this port: the "wheel" of peeking neighbour bottles (a single hero
 * bottle reads as a cleaner, more premium product shot) and the
 * reference's scroll-driven "story/heritage" deep-dive, which hardcodes
 * invented history and hotlinks photos of other real liquor brands (New
 * Amsterdam, Captain Morgan, Hendrick's, Appleton Estate) — NTS's own
 * heritage-scroll below uses the company's real 1980/Goa history instead.
 */
export default function SpiritCarousel() {
  const [active, setActive] = useState(0)
  const [detailOpen, setDetailOpen] = useState(false)
  const [detailScrolled, setDetailScrolled] = useState(false)

  const activeRef = useRef(0)
  const lockedRef = useRef(false)
  const stageRef = useRef(null)
  const bottleRefs = useRef([])
  // The active bottle's element — the one the tilt, detail view and scroll fade act on.
  const heroRef = { get current() { return bottleRefs.current[activeRef.current] || null } }
  const dragRef = useRef(null)
  const titleRef = useRef(null)
  const infoRef = useRef(null)
  const actionRef = useRef(null)
  const detailViewRef = useRef(null)
  const detailCopyRef = useRef(null)
  const detailBackRef = useRef(null)

  const current = CAROUSEL_ITEMS[active]

  // Place every bottle on its slot; re-run on resize so crossing the mobile
  // breakpoint swaps slot tables (skipped while the detail view is open).
  const placeAll = (activeIndex) => {
    const slots = getSlots()
    bottleRefs.current.forEach((node, i) => {
      if (node) gsap.set(node, { ...slotVars(slots[slotOf(i, activeIndex)]), '--parallax-x': '0px', '--parallax-y': '0px', '--parallax-rx': '0deg', '--parallax-ry': '0deg' })
    })
  }

  useLayoutEffect(() => {
    placeAll(0)
    if (titleRef.current) gsap.set(titleRef.current, { opacity: 1, '--parallax-x': '0px', '--parallax-y': '0px', '--parallax-rx': '0deg', '--parallax-ry': '0deg' })
    if (detailCopyRef.current) gsap.set(detailCopyRef.current, { '--parallax-x': '0px', '--parallax-y': '0px', '--parallax-rx': '0deg', '--parallax-ry': '0deg' })
  }, [])

  useEffect(() => {
    const onResize = () => {
      if (!detailOpen && !lockedRef.current) placeAll(activeRef.current)
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  })

  useEffect(() => {
    const preload =CAROUSEL_ITEMS.map(({ image }) => {
      const img = new Image()
      img.src = image
      return img
    })
    return () => preload.forEach((img) => { img.src = '' })
  }, [])

  // Navigation is button/keyboard only — no wheel/scroll hijacking, so
  // scrolling the page past this section behaves like any other section.
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
    const targets = [titleRef.current, detailCopyRef.current, heroRef.current].filter(Boolean)
    gsap.killTweensOf(targets)
    const vars = {
      '--parallax-x': '0px',
      '--parallax-y': '0px',
      '--parallax-rx': '0deg',
      '--parallax-ry': '0deg',
      duration: immediate ? 0 : 0.45,
      ease: 'power3.out',
      overwrite: 'auto',
    }
    targets.forEach((node) => (immediate ? gsap.set(node, vars) : gsap.to(node, vars)))
  }

  // Moves every bottle one slot along the diagonal. The bottle that wraps
  // from one end to the other fades out, jumps while invisible, and fades
  // back in, so it never slides back across the frame.
  function changeProduct(direction) {
    if (lockedRef.current || detailOpen) return
    lockedRef.current = true
    resetParallax(true)

    const old = activeRef.current
    const next = wrap(old + direction)
    const nextItem = CAROUSEL_ITEMS[next]
    const slots = getSlots()
    gsap.killTweensOf([titleRef.current, infoRef.current, actionRef.current, ...bottleRefs.current])

    const timeline = gsap.timeline({
      defaults: { ease: 'power3.inOut' },
      onComplete: () => {
        activeRef.current = next
        setActive(next)
        resetParallax(true)
        lockedRef.current = false
      },
    })

    timeline.to(
      stageRef.current,
      {
        '--tone-1': nextItem.tones[0],
        '--tone-2': nextItem.tones[1],
        '--tone-3': nextItem.tones[2],
        '--accent': nextItem.accent,
        duration: 0.95,
      },
      0
    )

    bottleRefs.current.forEach((node, i) => {
      if (!node) return
      const from = slotOf(i, old)
      const to = slotOf(i, next)
      const target = slotVars(slots[to])
      if (Math.abs(to - from) > 1) {
        timeline
          .to(node, { opacity: 0, duration: 0.25, ease: 'power2.out' }, 0)
          .set(node, { ...target, opacity: 0 }, 0.3)
          .to(node, { opacity: slots[to].opacity, duration: 0.4, ease: 'power2.out' }, 0.36)
      } else {
        const { zIndex, ...tween } = target
        timeline.set(node, { zIndex }, 0.3).to(node, { ...tween, duration: 0.8, ease: 'power3.inOut' }, 0)
      }
    })

    timeline
      .to([titleRef.current, infoRef.current, actionRef.current], { opacity: 0, y: -12, filter: 'blur(5px)', duration: 0.28, stagger: 0.025 }, 0)
      .call(() => { activeRef.current = next; setActive(next) }, [], 0.38)
      .fromTo(
        [infoRef.current, actionRef.current],
        { opacity: 0, y: 15, filter: 'blur(5px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.5, stagger: 0.04, ease: 'power3.out' },
        0.5
      )
      .fromTo(
        titleRef.current,
        { opacity: 0, y: 15, filter: 'blur(5px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.5, ease: 'power3.out' },
        0.5
      )
  }

  // Pointer-follow tilt: background glow, headline, and the hero bottle
  // each drift toward the cursor by a different amount. Skipped on touch
  // devices via the `(hover: none)` rule in index.css.
  const onPointerMove = (event) => {
    if (!stageRef.current || lockedRef.current) return
    const rect = stageRef.current.getBoundingClientRect()
    const x = Math.max(-1, Math.min(1, ((event.clientX - rect.left) / rect.width - 0.5) * 2))
    const y = Math.max(-1, Math.min(1, ((event.clientY - rect.top) / rect.height - 0.5) * 2))

    gsap.to(stageRef.current, {
      '--glow-x': `${50 + x * 8}%`,
      '--glow-y': `${46 + y * 6}%`,
      duration: 0.65,
      ease: 'power3.out',
      overwrite: 'auto',
    })

    if (!detailOpen && titleRef.current) {
      gsap.to(titleRef.current, {
        '--parallax-x': `${x * 8}px`,
        '--parallax-y': `${y * 5}px`,
        '--parallax-rx': `${-y * 0.45}deg`,
        '--parallax-ry': `${x * 0.65}deg`,
        duration: 0.65,
        ease: 'power3.out',
        overwrite: 'auto',
      })
    }

    const hero = heroRef.current
    if (hero) {
      gsap.to(hero, {
        '--parallax-x': `${x * (detailOpen ? 5 : 7)}px`,
        '--parallax-y': `${y * (detailOpen ? 3 : 4)}px`,
        '--parallax-rx': `${-y * 1.1}deg`,
        '--parallax-ry': `${x * 1.6}deg`,
        duration: 0.65,
        ease: 'power3.out',
        overwrite: 'auto',
      })
    }

    if (detailOpen && detailCopyRef.current) {
      gsap.to(detailCopyRef.current, {
        '--parallax-x': `${x * 6}px`,
        '--parallax-y': `${y * 4}px`,
        '--parallax-rx': `${-y * 0.35}deg`,
        '--parallax-ry': `${x * 0.55}deg`,
        duration: 0.65,
        ease: 'power3.out',
        overwrite: 'auto',
      })
    }
  }

  const onPointerLeave = () => {
    if (lockedRef.current) return
    resetParallax(false)
    gsap.to(stageRef.current, { '--glow-x': '50%', '--glow-y': '46%', duration: 0.5, ease: 'power3.out', overwrite: 'auto' })
  }

  // Swipe/drag to change product — pointer events cover touch (mobile
  // swipe) and mouse (desktop drag) with one handler. Only fires on a
  // mostly-horizontal drag past a distance threshold, so a vertical page
  // scroll or a tap on a button/nav control (tiny or vertical movement)
  // isn't mistaken for a swipe.
  const SWIPE_THRESHOLD = 48
  const onStageDragStart = (event) => {
    dragRef.current = { x: event.clientX, y: event.clientY }
  }
  const onStageDragEnd = (event) => {
    const start = dragRef.current
    dragRef.current = null
    if (!start || detailOpen || lockedRef.current) return
    const dx = event.clientX - start.x
    const dy = event.clientY - start.y
    if (Math.abs(dx) > SWIPE_THRESHOLD && Math.abs(dx) > Math.abs(dy)) {
      changeProduct(dx < 0 ? 1 : -1)
    }
  }

  // The detail view scrolls internally (see .spirit-detail-view) to reveal
  // the story/heritage/character sections below the initial facts panel.
  // The hero bottle is a sibling of this panel, not a child of it, so it
  // doesn't scroll away on its own — fade it out by hand as the panel scrolls
  // past it, same as the alcshowcase reference's detail-scroll.js does.
  const onDetailScroll = (event) => {
    if (lockedRef.current) return
    const el = event.currentTarget
    const progress = Math.min(1, el.scrollTop / Math.max(1, window.innerHeight * 0.9))
    const hero = heroRef.current
    if (hero) {
      hero.style.opacity = String(1 - progress)
      hero.style.visibility = progress > 0.98 ? 'hidden' : 'visible'
    }
    if (detailCopyRef.current) detailCopyRef.current.style.opacity = String(1 - progress)
    setDetailScrolled(progress > 0.02)
  }

  // "Explore bottle": the hero bottle grows in place and a detail panel
  // (tasting note + style/origin facts) slides in beside it — an inline
  // expansion rather than a popup modal.
  const openDetail = () => {
    if (lockedRef.current || detailOpen) return
    lockedRef.current = true
    resetParallax(true)

    const hero = heroRef.current
    gsap.killTweensOf([hero, detailViewRef.current, detailCopyRef.current, detailBackRef.current, titleRef.current, infoRef.current, actionRef.current])

    gsap.set(detailViewRef.current, { opacity: 0 })
    gsap.set(detailCopyRef.current, { opacity: 0, filter: 'blur(8px)', '--parallax-x': '0px', '--parallax-y': '0px', '--parallax-rx': '0deg', '--parallax-ry': '0deg' })
    gsap.set(detailBackRef.current, { opacity: 0, y: -6, filter: 'blur(4px)' })
    gsap.set(titleRef.current, { opacity: 0, y: -12, filter: 'blur(6px)' })
    gsap.set(infoRef.current, { opacity: 0, y: 12, filter: 'blur(6px)' })
    gsap.set(actionRef.current, { opacity: 0, y: 12, filter: 'blur(6px)' })

    setDetailOpen(true)
    setDetailScrolled(false)
    if (detailViewRef.current) detailViewRef.current.scrollTop = 0

    requestAnimationFrame(() => {
      if (!hero || !detailViewRef.current || !detailCopyRef.current || !detailBackRef.current) {
        lockedRef.current = false
        return
      }
      // Shifted right of centre on wide viewports — the base bottle is big
      // enough now that staying dead-centre at detail scale would run
      // under the tasting-note column on the left. On narrow viewports the
      // panel stacks below the bottle instead (see the 760px CSS
      // breakpoint), so there's nothing to shift away from.
      const detailShiftX = window.matchMedia('(max-width: 760px)').matches ? '0vw' : '14vw'
      const timeline = gsap.timeline({ defaults: { ease: 'power3.out' }, onComplete: () => { lockedRef.current = false } })
      timeline
        .to(detailViewRef.current, { opacity: 1, duration: 0.32 }, 0)
        .to(
          hero,
          {
            '--base-x': detailShiftX,
            '--base-y': '0vh',
            '--base-scale': HERO_DETAIL_SCALE,
            '--base-rotation': '0deg',
            opacity: 1,
            filter: 'drop-shadow(0 34px 40px rgba(0,0,0,.45))',
            zIndex: 90,
            duration: 0.82,
            ease: 'power4.inOut',
          },
          0
        )
        .to(bottleRefs.current.filter((node) => node && node !== hero), { opacity: 0, duration: 0.4, ease: 'power2.out' }, 0)
        .to(detailBackRef.current, { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.34 }, 0.08)
        .to(detailCopyRef.current, { opacity: 1, filter: 'blur(0px)', duration: 0.55 }, 0.12)
    })
  }

  const closeDetail = () => {
    if (!detailOpen || lockedRef.current) return
    lockedRef.current = true
    resetParallax(true)

    const hero = heroRef.current
    if (!hero || !detailViewRef.current || !detailCopyRef.current || !detailBackRef.current) {
      lockedRef.current = false
      return
    }
    gsap.killTweensOf([hero, detailViewRef.current, detailCopyRef.current, detailBackRef.current, titleRef.current, infoRef.current, actionRef.current])
    gsap.set(titleRef.current, { opacity: 0, y: -12, filter: 'blur(6px)' })
    gsap.set(infoRef.current, { opacity: 0, y: 12, filter: 'blur(6px)' })
    gsap.set(actionRef.current, { opacity: 0, y: 12, filter: 'blur(6px)' })
    hero.style.visibility = 'visible'
    setDetailScrolled(false)

    const timeline = gsap.timeline({
      defaults: { ease: 'power3.inOut' },
      onComplete: () => {
        setDetailOpen(false)
        gsap.set(detailViewRef.current, { opacity: 0 })
        placeAll(activeRef.current)
        lockedRef.current = false
      },
    })
    const slots = getSlots()
    const restingSlot = slotVars(slots['0'])
    timeline
      .to(detailCopyRef.current, { opacity: 0, filter: 'blur(8px)', duration: 0.28 }, 0)
      .to(detailBackRef.current, { opacity: 0, y: -6, filter: 'blur(4px)', duration: 0.24 }, 0)
      .to(hero, { ...restingSlot, duration: 0.72 }, 0.02)
    bottleRefs.current.forEach((node, i) => {
      if (!node || node === hero) return
      timeline.to(node, { opacity: slots[slotOf(i, activeRef.current)].opacity, duration: 0.5, ease: 'power2.out' }, 0.3)
    })
    timeline
      .to(detailViewRef.current, { opacity: 0, duration: 0.32 }, 0.42)
      .to(
        [titleRef.current, infoRef.current, actionRef.current],
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.42, stagger: 0.035, ease: 'power3.out' },
        0.22
      )
  }

  return (
    <section
      id="flavors"
      data-od-id="spirit-carousel"
      className="relative w-full overflow-hidden select-none border-t border-white/10"
    >
      <div
        ref={stageRef}
        className="spirit-stage relative w-full"
        style={{
          height: '100svh',
          minHeight: 660,
          overflow: 'hidden',
          '--tone-1': current.tones[0],
          '--tone-2': current.tones[1],
          '--tone-3': current.tones[2],
          '--accent': current.accent,
        }}
        onPointerMove={onPointerMove}
        onPointerLeave={onPointerLeave}
        onPointerDown={onStageDragStart}
        onPointerUp={onStageDragEnd}
        onPointerCancel={() => { dragRef.current = null }}
      >
        <div className="spirit-stage-bg" />

        {/* Grain overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            zIndex: 46,
            opacity: 0.4,
            backgroundImage: GRAIN_URL,
            backgroundSize: '200px 200px',
            backgroundRepeat: 'repeat',
          }}
        />

        <div className="spirit-stage-vignette" />

        {/* Giant headline, tilts toward the cursor via its own --parallax-* vars.
            Opacity is GSAP-owned (see the mount effect and changeProduct/openDetail
            timelines) — not set here, so a React re-render can't fight GSAP's writes. */}
        <div ref={titleRef} className="spirit-headline-layer pointer-events-none select-none font-serif">
          <span className="spirit-headline-text uppercase text-white text-center block">
            {current.ghostWord}
          </span>
        </div>

        {/* Warm pool of light behind the bottle's foot — the spotlit
            product-shot treatment premium spirits brands use for their
            hero bottle, in place of a wheel of other bottles at the edges. */}
        <div className="spirit-bottle-spotlight" aria-hidden="true" />

        {/* Diagonal cascade: one image per spirit, positioned by slot
            (see SLOTS_DESKTOP / SLOTS_MOBILE); GSAP owns their transforms. */}
        {CAROUSEL_ITEMS.map((item, i) => (
          <img
            key={item.id}
            ref={(node) => { bottleRefs.current[i] = node }}
            src={item.image}
            alt={item.name}
            draggable={false}
            className="spirit-bottle-img"
          />
        ))}

        {/* Bottom row: spirit info + nav on the left, explore on the right,
            both anchored to one flex row so they always share the same baseline.
            infoRef/actionRef are true siblings (not nested) so GSAP fades each
            independently instead of compounding opacity through a shared parent. */}
        <div className="spirit-bottom-row">
          <div ref={infoRef} style={{ maxWidth: 340 }}>
            <p
              className="font-serif uppercase text-white mb-1 sm:mb-2"
              style={{ fontSize: 'clamp(18px, 2.4vw, 26px)', fontWeight: 900, letterSpacing: '0.01em' }}
            >
              {current.brandName}
            </p>
            <p
              className="text-white/85 mb-2 sm:mb-3"
              style={{ fontSize: 'clamp(13px, 1.3vw, 16px)', fontWeight: 700 }}
            >
              {current.productText}
            </p>
            <p className="hidden sm:block text-white/80 mb-5" style={{ fontSize: 13, lineHeight: 1.6, maxWidth: 300 }}>
              {current.description}
            </p>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => changeProduct(-1)}
                aria-label="Previous spirit"
                className="flex h-11 w-11 sm:h-14 sm:w-14 items-center justify-center rounded-full border-2 border-white/70 text-white transition-all duration-150 hover:scale-[1.08] hover:border-accent hover:bg-accent/15"
              >
                <ArrowLeft size={20} strokeWidth={2.25} />
              </button>
              <button
                type="button"
                onClick={() => changeProduct(1)}
                aria-label="Next spirit"
                className="flex h-11 w-11 sm:h-14 sm:w-14 items-center justify-center rounded-full border-2 border-white/70 text-white transition-all duration-150 hover:scale-[1.08] hover:border-accent hover:bg-accent/15"
              >
                <ArrowRight size={20} strokeWidth={2.25} />
              </button>
              <span className="font-mono text-[11px] text-white/60 ml-1">
                {String(active + 1).padStart(2, '0')} / {String(COUNT).padStart(2, '0')}
              </span>
            </div>
          </div>

          <button
            ref={actionRef}
            type="button"
            onClick={openDetail}
            className="hidden sm:flex items-center gap-2 font-serif uppercase text-white group shrink-0"
            style={{ fontSize: 'clamp(15px, 2.4vw, 32px)', fontWeight: 900, letterSpacing: '-0.02em', lineHeight: 1 }}
          >
            <span className="opacity-95 transition-opacity duration-200 group-hover:opacity-100">View details</span>
            <ArrowRight
              className="h-4 w-4 sm:h-7 sm:w-7 transition-transform duration-200 group-hover:translate-x-1"
              strokeWidth={2.25}
            />
          </button>
        </div>

        {/* Explore bottle: the hero bottle above grows and this panel slides
            in beside it with the full tasting note and style/origin facts. */}
        <div
          ref={detailViewRef}
          className="spirit-detail-view"
          aria-hidden={!detailOpen}
          aria-label={`${current.name} details`}
          onScroll={onDetailScroll}
        >
          <button ref={detailBackRef} type="button" onClick={closeDetail} className="spirit-detail-back">
            <ArrowLeft size={16} strokeWidth={2.5} />
            <span>Back</span>
          </button>
          <div ref={detailCopyRef} className="spirit-detail-copy">
            <p className="font-mono text-[11px] font-bold uppercase tracking-[0.24em]" style={{ color: 'var(--accent)' }}>
              {current.category}
            </p>
            <h2 className="font-serif uppercase text-white spirit-detail-title">{current.ghostWord}</h2>
            <p className="spirit-detail-description">{current.description}</p>
            <dl className="spirit-detail-facts">
              <div>
                <dt>Style</dt>
                <dd>{current.style}</dd>
              </div>
              <div>
                <dt>Origin</dt>
                <dd>{current.origin}</dd>
              </div>
            </dl>
          </div>

          {/* Story/heritage/character deep-dive, ported from alcshowcase's
              detail-scroll.js — but built from NTS's real 1980/Goa history
              (siteData.js companyFacts, AboutUs.jsx) and the site's own
              product photography, not invented brand lore or hotlinked
              photos of other distillers' bottles. */}
          <div className="spirit-heritage-scroll">
            <section className="spirit-heritage-section spirit-heritage-section--story">
              <div className="spirit-heritage-copy">
                <p className="spirit-heritage-kicker">01 / The story</p>
                <h3 className="spirit-heritage-title">{current.tagline}</h3>
                <p className="spirit-heritage-body">{current.description}</p>
                <div className="spirit-heritage-fact">
                  <span>Origin</span>
                  <strong>{current.origin}</strong>
                </div>
              </div>
              <figure className="spirit-heritage-visual">
                <img
                  src="/images/about-nts-bottle-collection.jpeg"
                  alt="NTS Blenders and Distillers premium spirits collection"
                  loading="lazy"
                  decoding="async"
                />
                <figcaption>
                  <span>NTS collection</span>
                </figcaption>
              </figure>
            </section>

            <section className="spirit-heritage-section spirit-heritage-section--heritage">
              <figure className="spirit-heritage-visual">
                <img src={HERITAGE.image} alt={HERITAGE.imageAlt} loading="lazy" decoding="async" />
                <figcaption>
                  <span>{HERITAGE.imageLabel}</span>
                </figcaption>
              </figure>
              <div className="spirit-heritage-copy">
                <p className="spirit-heritage-kicker">02 / Heritage</p>
                <h3 className="spirit-heritage-title">{HERITAGE.title}</h3>
                <p className="spirit-heritage-lead">{HERITAGE.lead}</p>
                <p className="spirit-heritage-body">{HERITAGE.body}</p>
              </div>
            </section>

            <section
              className="spirit-heritage-section spirit-heritage-section--character"
              style={{ backgroundImage: `url(${current.image})` }}
            >
              <div className="spirit-heritage-character-overlay" />
              <div className="spirit-heritage-character-content">
                <p className="spirit-heritage-kicker">03 / Character</p>
                <div className="spirit-heritage-character-row">
                  <h3>{current.brandName}</h3>
                  <div>
                    <span>Style</span>
                    <strong>{current.style}</strong>
                    <span>Origin</span>
                    <strong>{current.origin}</strong>
                    <span>Category</span>
                    <strong>{current.category}</strong>
                  </div>
                </div>
              </div>
            </section>

            <section className="spirit-heritage-end">
              <div>
                <p>End of edition</p>
                <h3>{current.name}</h3>
                <div className="spirit-heritage-end-meta">
                  <span>{current.category}</span>
                  <span>{current.origin}</span>
                  <span>{current.style}</span>
                </div>
              </div>
            </section>
          </div>

          <div className="spirit-heritage-hint" style={{ opacity: detailScrolled ? 0 : 1 }}>
            Scroll to discover
            <span>↓</span>
          </div>
        </div>
      </div>
    </section>
  )
}
