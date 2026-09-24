import { useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { prefersReducedMotion } from './pageReady'

gsap.registerPlugin(ScrollTrigger)

/**
 * Runs `build({ gsap, mobile })` inside a gsap.context scoped to `scopeRef`,
 * for animations whose progress is tied directly to scroll position. Skipped
 * entirely under prefers-reduced-motion; everything is reverted on unmount.
 */
export function useScrub(scopeRef, build) {
  useEffect(() => {
    if (!scopeRef.current || prefersReducedMotion()) return undefined
    const mobile = window.matchMedia('(max-width: 640px)').matches
    const ctx = gsap.context(() => build({ gsap, mobile }), scopeRef)
    return () => ctx.revert()
  }, [scopeRef])
}
