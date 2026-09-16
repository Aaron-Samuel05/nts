import { useCallback, useEffect, useRef, useState } from 'react'
import { AXIS, SLOT_LENGTH } from './geometry'

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

/**
 * Drives one continuous `progress` value, in slots, shared by auto-advance
 * and by scrolling. Both only ever move the *target*; a single spring
 * chases it, so scrolling fast and waiting for the timer produce the same
 * motion — just at different speeds.
 */
export function useCarouselTrack({
  count,
  interval = 2600,
  autoPlay = true,
  ease = 0.14,
  sensitivity = 2.4,
  captureWheel = true,
}) {
  const surfaceRef = useRef(null)

  const target = useRef(0)
  const current = useRef(0)
  const lastStep = useRef(0)
  const scrubEnd = useRef(0)
  const settled = useRef(true)

  const [auto, setAuto] = useState(autoPlay && !prefersReducedMotion())
  const [progress, setProgress] = useState(0)
  const [centerIndex, setCenterIndex] = useState(0)

  const autoRef = useRef(auto)
  autoRef.current = auto

  const advance = useCallback((slots) => {
    target.current += slots
  }, [])

  useEffect(() => {
    let raf = 0
    let last = performance.now()
    lastStep.current = last

    const frame = (now) => {
      const dt = Math.min(64, now - last)
      last = now

      const scrubbingNow = now - scrubEnd.current < 140

      // Auto-advance: one whole slot per interval, never mid-scrub.
      if (autoRef.current && !scrubbingNow) {
        if (now - lastStep.current >= interval && settled.current) {
          lastStep.current = now
          target.current += 1
        }
      } else {
        lastStep.current = now
      }

      // Frame-rate independent exponential ease toward the target.
      const k = 1 - Math.pow(1 - ease, dt / (1000 / 60))
      const delta = target.current - current.current
      current.current += delta * k
      settled.current = Math.abs(delta) < 0.02

      setProgress(current.current)

      const nearest = Math.round(current.current)
      const idx = ((nearest % count) + count) % count
      setCenterIndex((prev) => (prev === idx ? prev : idx))

      raf = requestAnimationFrame(frame)
    }

    raf = requestAnimationFrame(frame)
    return () => cancelAnimationFrame(raf)
  }, [count, interval, ease])

  // Wheel / trackpad, projected onto the track axis.
  useEffect(() => {
    const el = surfaceRef.current
    if (!el) return

    let snap
    const onWheel = (e) => {
      const along = e.deltaY * AXIS.y + e.deltaX * AXIS.x
      if (captureWheel) e.preventDefault()
      target.current += (along / SLOT_LENGTH) * sensitivity
      scrubEnd.current = performance.now()
      clearTimeout(snap)
      // Rest on a whole slot so the centre item ends up upright.
      snap = setTimeout(() => {
        target.current = Math.round(target.current)
      }, 150)
    }

    el.addEventListener('wheel', onWheel, { passive: !captureWheel })
    return () => {
      el.removeEventListener('wheel', onWheel)
      clearTimeout(snap)
    }
  }, [sensitivity, captureWheel])

  // Touch drag, also projected onto the axis.
  useEffect(() => {
    const el = surfaceRef.current
    if (!el) return

    let lastX = 0
    let lastY = 0
    let active = false

    const start = (e) => {
      active = true
      lastX = e.touches[0].clientX
      lastY = e.touches[0].clientY
      scrubEnd.current = performance.now()
    }
    const move = (e) => {
      if (!active) return
      const x = e.touches[0].clientX
      const y = e.touches[0].clientY
      // Dragging up-left pulls the track forward, so the sign is inverted.
      const along = -((x - lastX) * AXIS.x + (y - lastY) * AXIS.y)
      lastX = x
      lastY = y
      target.current += (along / SLOT_LENGTH) * sensitivity * 1.8
      scrubEnd.current = performance.now()
      if (captureWheel) e.preventDefault()
    }
    const end = () => {
      active = false
      target.current = Math.round(target.current)
    }

    el.addEventListener('touchstart', start, { passive: true })
    el.addEventListener('touchmove', move, { passive: !captureWheel })
    el.addEventListener('touchend', end)
    el.addEventListener('touchcancel', end)
    return () => {
      el.removeEventListener('touchstart', start)
      el.removeEventListener('touchmove', move)
      el.removeEventListener('touchend', end)
      el.removeEventListener('touchcancel', end)
    }
  }, [sensitivity, captureWheel])

  return [{ progress, centerIndex, auto, setAuto, advance }, surfaceRef]
}
