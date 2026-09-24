const SEEN_KEY = 'nts_loader_seen'
const AGE_KEY = 'nts_jd_age_verified'
const FAILSAFE_MS = 10000

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

// Decided once, at import time, so every reveal knows synchronously whether a
// loader is going to run (homepage, first visit this session, motion allowed).
export const LOADER_PENDING =
  typeof window !== 'undefined' &&
  window.location.pathname === '/' &&
  !prefersReducedMotion() &&
  !window.sessionStorage.getItem(SEEN_KEY)

if (typeof window !== 'undefined') window.__ntsLoaderDone = !LOADER_PENDING

export const markLoaderSeen = () => {
  window.sessionStorage.setItem(SEEN_KEY, '1')
  window.__ntsLoaderDone = true
  window.dispatchEvent(new Event('nts:loader-complete'))
}

const ageGateOpen = () => {
  const verified =
    window.localStorage.getItem(AGE_KEY) === 'true' || window.sessionStorage.getItem(AGE_KEY) === 'true'
  return document.body.classList.contains('age-gate-open') || !verified
}

const isReadyNow = () => window.__ntsLoaderDone !== false && !ageGateOpen()

/**
 * Calls `callback` once the loader has finished and the age gate is closed,
 * so entrance animations play where the visitor can actually see them. A long
 * fail-safe means text can never stay hidden. Returns a cancel function.
 */
export function onPageReady(callback) {
  let finished = false
  let observer
  let timer

  const cleanup = () => {
    observer?.disconnect()
    window.removeEventListener('nts:loader-complete', check)
    clearTimeout(timer)
  }
  const fire = () => {
    if (finished) return
    finished = true
    cleanup()
    callback()
  }
  function check() {
    if (isReadyNow()) fire()
  }

  if (isReadyNow()) {
    fire()
    return () => {}
  }

  observer = new MutationObserver(check)
  observer.observe(document.body, { attributes: true, attributeFilter: ['class'] })
  window.addEventListener('nts:loader-complete', check)
  timer = setTimeout(fire, FAILSAFE_MS)

  return () => {
    finished = true
    cleanup()
  }
}
