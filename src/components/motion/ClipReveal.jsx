import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { prefersReducedMotion } from './pageReady'

gsap.registerPlugin(ScrollTrigger)

const SHAPES = {
  inset: { from: 'inset(0% 0% 100% 0%)', to: 'inset(0% 0% 0% 0%)' },
  ellipse: { from: 'ellipse(75% 0% at 50% -5%)', to: 'ellipse(120% 145% at 50% -5%)' },
}

/**
 * Wraps its content and reveals it through a growing clip-path when it
 * scrolls into view. The hidden starting shape comes from CSS ([data-clip],
 * index.css) so there is no flash before JS runs; once played the inline
 * `clip-path: none` keeps it visible.
 */
export default function ClipReveal({
  as: Tag = 'div',
  shape = 'inset',
  duration = 1.1,
  delay = 0,
  start = 'top 85%',
  children,
  ...rest
}) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return undefined
    if (prefersReducedMotion()) {
      gsap.set(el, { clipPath: 'none' })
      return undefined
    }
    const { from, to } = SHAPES[shape]
    const tween = gsap.fromTo(
      el,
      { clipPath: from },
      {
        clipPath: to,
        duration,
        delay,
        ease: 'power3.inOut',
        scrollTrigger: { trigger: el, start, once: true },
        onComplete: () => gsap.set(el, { clipPath: 'none' }),
      }
    )
    return () => {
      tween.scrollTrigger?.kill()
      tween.kill()
      gsap.set(el, { clipPath: 'none' })
    }
  }, [shape, duration, delay, start])

  return (
    <Tag ref={ref} data-clip={shape} {...rest}>
      {children}
    </Tag>
  )
}
