import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Reveal from './motion/Reveal'

const newsletterBottleA = '/portfolio-images/old-town.png'
const newsletterBottleB = '/bottle-2/bottle (1).png'

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const query = window.matchMedia('(max-width: 767px)')
    const update = () => setIsMobile(query.matches)

    update()
    query.addEventListener('change', update)
    return () => query.removeEventListener('change', update)
  }, [])

  return isMobile
}

export default function Newsletter() {
  const bottleEase = [0.22, 1, 0.36, 1]
  const isMobile = useIsMobile()
  const [email, setEmail] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState('')

  const handleChatRequest = (event) => {
    event.preventDefault()
    const value = email.trim()
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)

    if (!isValidEmail) {
      setError('Enter a valid email address.')
      setIsSubmitted(false)
      return
    }

    setError('')
    setIsSubmitted(true)
  }

  // One anchor bottle per side, pushed toward the edge so it clears the
  // headline's max-width column instead of crowding behind the letters.
  const leftBottles = [
    {
      image: newsletterBottleA,
      className: 'hidden sm:block sm:left-[4px] sm:bottom-[22px] sm:w-[190px] md:left-[8px] md:bottom-[28px] md:w-[240px] lg:left-[16px] lg:bottom-[34px] lg:w-[290px] xl:left-[32px] xl:bottom-[38px] xl:w-[330px]',
      rotation: -8,
      x: isMobile ? -40 : -70,
      scale: 0.85,
      opacity: 0.98,
      delay: 0,
      float: [-6, 0, -6],
      duration: 9,
      z: 'z-[5]',
      blur: '',
    },
  ]

  const rightBottles = [
    {
      image: newsletterBottleB,
      className: 'hidden sm:block sm:right-[4px] sm:bottom-[22px] sm:w-[190px] md:right-[8px] md:bottom-[28px] md:w-[240px] lg:right-[16px] lg:bottom-[34px] lg:w-[290px] xl:right-[32px] xl:bottom-[38px] xl:w-[330px]',
      rotation: 8,
      x: isMobile ? 40 : 70,
      scale: 0.85,
      opacity: 0.98,
      delay: 0.12,
      float: [0, -6, 0],
      duration: 9.5,
      z: 'z-[5]',
      blur: '',
    },
  ]

  const bottleShadow = isMobile
    ? 'drop-shadow(0 14px 24px rgba(0,0,0,0.85))'
    : 'drop-shadow(0 22px 46px rgba(0,0,0,0.95))'

  return (
    <section
      id="partner-notes"
      className="relative min-h-[560px] sm:min-h-[700px] lg:min-h-[780px] overflow-hidden bg-black text-white px-4 py-20 sm:py-28 md:px-8 border-t border-white/10 flex items-center justify-center select-none"
      data-od-id="partner-notes-newsletter"
    >
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-[10vw] bg-gradient-to-r from-black/80 to-transparent" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-[10vw] bg-gradient-to-l from-black/80 to-transparent" aria-hidden="true" />

      {/* Floating Animated Bottles on Left & Right */}
      {[...leftBottles, ...rightBottles].map((bottle, index) => (
        <motion.div
          key={`${bottle.className}-${index}`}
          className={`pointer-events-none absolute ${bottle.z} ${bottle.className}`}
          initial={{ opacity: 0, x: bottle.x, y: 24, rotate: bottle.rotation, scale: bottle.scale }}
          whileInView={{ opacity: bottle.opacity, x: 0, y: 0, rotate: bottle.rotation, scale: 1 }}
          transition={{ duration: 0.9, delay: bottle.delay, ease: bottleEase }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.img
            src={bottle.image}
            alt=""
            aria-hidden="true"
            className={`w-full select-none object-contain will-change-transform ${bottle.blur}`}
            animate={{ y: bottle.float }}
            transition={{ duration: bottle.duration, ease: 'easeInOut', repeat: Infinity, delay: 1.05 + bottle.delay }}
            style={{ filter: bottleShadow }}
          />
        </motion.div>
      ))}

      {/* Center Main Stage Content */}
      <div className="relative z-20 mx-auto w-full max-w-[900px] text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: bottleEase }}
          viewport={{ once: true, amount: 0.3 }}
        >
          {/* Eyebrow Capsule */}
          <div className="flex justify-center">
            <span className="inline-flex rounded-full border border-white/20 bg-white/5 px-5 py-2 font-mono text-[11px] font-bold uppercase tracking-[0.25em] text-[#E9542E] shadow-sm backdrop-blur-md">
              PARTNER NOTES
            </span>
          </div>

          {/* Bold Serif Headline */}
          <Reveal as="h2" className="mx-auto mt-6 max-w-[850px] font-serif text-[clamp(2.1rem,11vw,4.4rem)] font-black uppercase leading-[1.02] tracking-tight text-white sm:leading-[1.04]">
            TRADE-READY SPIRITS, BOTTLING CAPACITY, AND PARTNERSHIP OPPORTUNITIES.
          </Reveal>

        </motion.div>

        {/* Contact Prompt */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.2, ease: bottleEase }}
          viewport={{ once: true, amount: 0.2 }}
          className="mt-10"
        >
          <form onSubmit={handleChatRequest} className="mx-auto w-full max-w-xl" noValidate>
            <div className="relative flex flex-col items-center gap-2 rounded-3xl border border-white/20 bg-white/[0.06] p-2 shadow-[0_20px_60px_rgba(0,0,0,0.72)] backdrop-blur-md transition-all focus-within:border-[#E9542E] focus-within:ring-2 focus-within:ring-[#E9542E]/30 sm:flex-row sm:rounded-full sm:pl-7">
              <label htmlFor="partner-chat-email" className="sr-only">
                Email address
              </label>
              <input
                id="partner-chat-email"
                type="email"
                required
                aria-describedby={error ? 'partner-chat-error' : isSubmitted ? 'partner-chat-success' : undefined}
                aria-invalid={error ? 'true' : undefined}
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value)
                  if (error) setError('')
                  if (isSubmitted) setIsSubmitted(false)
                }}
                placeholder="Enter your email address"
                className="w-full bg-transparent px-3 py-3 font-sans text-sm text-white outline-none placeholder:text-white/60 sm:py-2 sm:text-base"
              />
              <button
                type="submit"
                className="min-h-12 w-full shrink-0 rounded-full bg-[#050505] px-8 py-3.5 font-mono text-xs font-bold uppercase tracking-[0.18em] text-white shadow-lg transition-all duration-300 hover:bg-[#E9542E] hover:shadow-2xl active:scale-95 sm:w-auto"
              >
                Start chat
              </button>
            </div>
            {error && (
              <p id="partner-chat-error" className="mt-3 text-left font-sans text-sm font-semibold text-[#ff8f73]" role="alert">
                {error}
              </p>
            )}
            {isSubmitted && (
              <p id="partner-chat-success" className="mt-3 text-center font-sans text-sm font-semibold text-white/70" aria-live="polite">
                Thanks. We have your email and can follow up on the right trade conversation.
              </p>
            )}
          </form>
        </motion.div>
      </div>
    </section>
  )
}
