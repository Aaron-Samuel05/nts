import { gsap } from 'gsap'

// Mobile-only interactive swipe enhancement for the NTS spirits carousel.
// Keeps the existing GSAP carousel intact and only replaces the touch gesture
// with a frame-synchronised, finger-following interaction on <=700px screens.

const MOBILE = 700
const SWIPE_TRIGGER = 55
const SWIPE_LOCK = 4

function initNativeSwipe() {
  const stage = document.querySelector('.nts-spirit-stage')
  if (!stage || stage.dataset.nativeSwipeReady === 'true') return
  stage.dataset.nativeSwipeReady = 'true'

  let gesture = null
  let raf = 0
  let lastWidth = 0

  const isMobile = () => window.innerWidth <= MOBILE
  const bottles = () => Array.from(stage.querySelectorAll('.nts-spirit-bottle'))
  const activeIndex = (items) => items.findIndex((node) => getComputedStyle(node).pointerEvents !== 'none')
  const wrap = (n, length) => (n + length) % length

  const setBottle = (node, vars) => {
    if (!node) return
    Object.entries(vars).forEach(([key, value]) => node.style.setProperty(key, value))
  }

  const render = () => {
    raf = 0
    if (!gesture || !gesture.horizontal || !isMobile()) return

    const items = bottles()
    const active = activeIndex(items)
    if (active < 0 || items.length < 2) return

    const width = stage.getBoundingClientRect().width || window.innerWidth
    lastWidth = width
    const dx = gesture.x - gesture.startX
    const percent = Math.max(-78, Math.min(78, (dx / width) * 100))
    const direction = dx < 0 ? 1 : -1
    const incomingIndex = wrap(active + direction, items.length)
    const hero = items[active]
    const incoming = items[incomingIndex]

    // Follow the finger directly through requestAnimationFrame. The browser
    // schedules this at the display's available refresh cadence (including 120Hz).
    setBottle(hero, {
      '--x': `${percent}vw`,
      '--px': '0px',
      '--py': '0px',
      '--rx': '0deg',
      '--ry': '0deg',
      '--rotation': '0deg',
      filter: 'drop-shadow(0 28px 22px rgba(0,0,0,.36)) blur(0px)',
    })

    const incomingStart = direction > 0 ? 100 : -100
    const incomingPercent = incomingStart + percent
    setBottle(incoming, {
      '--x': `${incomingPercent}vw`,
      '--y': '-6vh',
      '--scale': '0.70',
      '--rotation': '0deg',
      '--px': '0px',
      '--py': '0px',
      '--rx': '0deg',
      '--ry': '0deg',
      opacity: Math.min(1, Math.max(0, Math.abs(percent) / 42)),
      filter: 'drop-shadow(0 28px 22px rgba(0,0,0,.36)) blur(0px)',
      zIndex: '21',
      pointerEvents: 'none',
    })
  }

  const scheduleRender = () => {
    if (!raf) raf = requestAnimationFrame(render)
  }

  const finish = (event) => {
    if (!gesture || gesture.pointerId !== event.pointerId) return
    const current = gesture
    gesture = null
    if (raf) {
      cancelAnimationFrame(raf)
      raf = 0
    }

    if (!current.horizontal) return

    const dx = current.x - current.startX
    const dy = current.y - current.startY
    const distance = Math.abs(dx)
    const horizontal = distance > Math.abs(dy) * 1.15

    if (distance >= SWIPE_TRIGGER && horizontal) {
      event.preventDefault()
      event.stopPropagation()
      const buttons = stage.querySelectorAll('.nts-spirit-arrow')
      const button = dx < 0 ? buttons[1] : buttons[0]
      button?.click()
      return
    }

    if (distance > SWIPE_LOCK) {
      event.preventDefault()
      event.stopPropagation()
    }

    const items = bottles()
    const active = activeIndex(items)
    if (active < 0) return
    const hero = items[active]
    const direction = dx < 0 ? 1 : -1
    const incoming = items[wrap(active + direction, items.length)]

    gsap.to(hero, { '--x': '0vw', duration: 0.24, ease: 'power3.out', overwrite: 'auto' })
    if (incoming) {
      gsap.to(incoming, {
        '--x': direction > 0 ? '68vw' : '-68vw',
        opacity: 0,
        duration: 0.24,
        ease: 'power3.out',
        overwrite: 'auto',
      })
    }
  }

  const onDown = (event) => {
    if (!isMobile()) return
    if (event.button !== undefined && event.button !== 0) return
    if (event.target.closest('button, a, .nts-spirit-detail')) return

    gesture = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      x: event.clientX,
      y: event.clientY,
      horizontal: false,
    }
    stage.setPointerCapture?.(event.pointerId)
  }

  const onMove = (event) => {
    if (!gesture || gesture.pointerId !== event.pointerId || !isMobile()) return
    gesture.x = event.clientX
    gesture.y = event.clientY

    const dx = gesture.x - gesture.startX
    const dy = gesture.y - gesture.startY
    if (!gesture.horizontal && Math.abs(dx) > SWIPE_LOCK) {
      if (Math.abs(dx) > Math.abs(dy) * 1.08) {
        gesture.horizontal = true
        event.preventDefault()
        event.stopPropagation()
      } else if (Math.abs(dy) > SWIPE_LOCK) {
        gesture = null
        return
      }
    }

    if (gesture.horizontal) {
      event.preventDefault()
      event.stopPropagation()
      scheduleRender()
    }
  }

  const onUp = (event) => finish(event)
  const onCancel = (event) => finish(event)

  stage.addEventListener('pointerdown', onDown, { passive: true })
  stage.addEventListener('pointermove', onMove, { passive: false })
  stage.addEventListener('pointerup', onUp, { passive: false })
  stage.addEventListener('pointercancel', onCancel, { passive: false })
}

const observer = new MutationObserver(() => initNativeSwipe())
observer.observe(document.documentElement, { childList: true, subtree: true })
initNativeSwipe()
