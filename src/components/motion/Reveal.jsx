import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import { onPageReady, prefersReducedMotion } from './pageReady'

gsap.registerPlugin(ScrollTrigger, SplitText)

let refreshQueued = false
const queueRefresh = () => {
  if (refreshQueued) return
  refreshQueued = true
  requestAnimationFrame(() =>
    requestAnimationFrame(() => {
      refreshQueued = false
      ScrollTrigger.refresh()
    })
  )
}

/**
 * Masked text reveal. Headings slide up character by character out of a line
 * mask; paragraphs slide up line by line. Plays once when the element reaches
 * `start`, after the page loader / age gate are out of the way. Text is hidden
 * only by CSS ([data-reveal], see index.css), never removed from the DOM.
 */
export default function Reveal({
  as: Tag = 'span',
  variant,
  delay = 0,
  stagger,
  from = 'start',
  duration,
  start = 'top 88%',
  children,
  ...rest
}) {
  const ref = useRef(null)
  const mode = variant || (/^h[1-6]$/.test(Tag) ? 'heading' : 'lines')

  useEffect(() => {
    const el = ref.current
    if (!el) return undefined
    if (prefersReducedMotion()) {
      gsap.set(el, { autoAlpha: 1 })
      return undefined
    }

    let split = null
    let tween = null
    let finished = false
    let cancelled = false
    let cancelReady = () => {}
    let width = window.innerWidth
    let resizeTimer

    const teardown = () => {
      tween?.scrollTrigger?.kill()
      tween?.kill()
      tween = null
      split?.revert()
      split = null
    }

    const build = () => {
      if (cancelled || finished) return
      try {
        split = new SplitText(el, mode === 'heading' ? { type: 'lines,words,chars', mask: 'lines' } : { type: 'lines,words', mask: 'lines' })
        const targets = mode === 'heading' ? split.chars : split.lines
        // Long headings would otherwise take seconds to finish: cap the whole stagger at ~1.2s.
        const each = Math.min(stagger || (mode === 'heading' ? 0.035 : 0.08), 1.2 / Math.max(1, targets.length))
        gsap.set(targets, mode === 'heading' ? { yPercent: 140 } : { yPercent: 140, opacity: 0 })
        gsap.set(el, { autoAlpha: 1 })
        tween = gsap.to(targets, {
          yPercent: 0,
          opacity: 1,
          duration: duration || (mode === 'heading' ? 0.85 : 0.8),
          ease: mode === 'heading' ? 'power3.out' : 'power2.out',
          stagger: { each, from },
          delay,
          scrollTrigger: { trigger: el, start, once: true },
          onComplete: () => {
            finished = true
            split?.revert()
            split = null
            gsap.set(el, { autoAlpha: 1, clearProps: 'transform' })
          },
        })
      } catch {
        teardown()
        gsap.set(el, { autoAlpha: 1 })
      }
    }

    const onResize = () => {
      if (finished || window.innerWidth === width) return
      width = window.innerWidth
      clearTimeout(resizeTimer)
      resizeTimer = setTimeout(() => {
        teardown()
        build()
        queueRefresh()
      }, 150)
    }

    // Wait for fonts so lines break where they will finally sit.
    Promise.resolve(document.fonts?.ready).then(() => {
      if (cancelled) return
      cancelReady = onPageReady(() => {
        build()
        queueRefresh()
      })
    })
    window.addEventListener('resize', onResize)

    return () => {
      cancelled = true
      cancelReady()
      clearTimeout(resizeTimer)
      window.removeEventListener('resize', onResize)
      teardown()
    }
  }, [mode, delay, stagger, from, duration, start])

  return (
    <Tag ref={ref} data-reveal="" {...rest}>
      {children}
    </Tag>
  )
}
