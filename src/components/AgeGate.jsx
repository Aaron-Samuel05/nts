import React, { useEffect, useMemo, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Globe, ChevronDown, Check, AlertCircle, Shield, X } from 'lucide-react'

const STORAGE_KEY = 'nts_jd_age_verified'
const REMEMBER_KEY = 'nts_jd_age_remember'

// Country Legal Drinking Age Registry
const COUNTRIES = [
  { code: 'US', name: 'United States', minAge: 21, flag: '🇺🇸', label: '21+' },
  { code: 'GB', name: 'United Kingdom', minAge: 18, flag: '🇬🇧', label: '18+' },
  { code: 'IN', name: 'India', minAge: 18, flag: '🇮🇳', label: '18+ (21/25 in some states)' },
  { code: 'CA', name: 'Canada', minAge: 19, flag: '🇨🇦', label: '19+ (18 in AB/MB/QC)' },
  { code: 'AU', name: 'Australia', minAge: 18, flag: '🇦🇺', label: '18+' },
  { code: 'DE', name: 'Germany', minAge: 18, flag: '🇩🇪', label: '18+' },
  { code: 'FR', name: 'France', minAge: 18, flag: '🇫🇷', label: '18+' },
  { code: 'JP', name: 'Japan', minAge: 20, flag: '🇯🇵', label: '20+' },
  { code: 'KR', name: 'South Korea', minAge: 19, flag: '🇰🇷', label: '19+' },
  { code: 'SE', name: 'Sweden', minAge: 20, flag: '🇸🇪', label: '20+' },
  { code: 'ES', name: 'Spain', minAge: 18, flag: '🇪🇸', label: '18+' },
  { code: 'IT', name: 'Italy', minAge: 18, flag: '🇮🇹', label: '18+' },
  { code: 'NL', name: 'Netherlands', minAge: 18, flag: '🇳🇱', label: '18+' },
  { code: 'BR', name: 'Brazil', minAge: 18, flag: '🇧🇷', label: '18+' },
  { code: 'MX', name: 'Mexico', minAge: 18, flag: '🇲🇽', label: '18+' },
  { code: 'ZA', name: 'South Africa', minAge: 18, flag: '🇿🇦', label: '18+' },
  { code: 'SG', name: 'Singapore', minAge: 18, flag: '🇸🇬', label: '18+' },
  { code: 'AE', name: 'United Arab Emirates', minAge: 21, flag: '🇦🇪', label: '21+' },
  { code: 'INT', name: 'International / Other', minAge: 18, flag: '🌐', label: '18+' },
]

const LEGAL_COPY = {
  terms: {
    eyebrow: 'Terms & Conditions',
    title: 'Website Terms of Use',
    fullPath: '/terms',
    intro:
      'This website is intended only for visitors who are legally permitted to view alcohol-related content in their country, state, or region.',
    sections: [
      'By entering, you confirm that the date of birth provided is accurate and that you meet the legal drinking age requirement for your location.',
      'Product information, facility details, images, and brand content are provided for general informational and trade conversation purposes only.',
      'NTS Blenders and Distillers supports responsible drinking. Do not use this website to encourage underage drinking, unsafe consumption, or unlawful activity.',
    ],
  },
  privacy: {
    eyebrow: 'Privacy Policy',
    title: 'How This Site Handles Information',
    fullPath: '/privacy',
    intro:
      'The age gate uses browser storage only to remember whether this device has passed age verification.',
    sections: [
      'If you choose "Remember me", the verification status is stored in localStorage. Otherwise, it is stored only for the current browser session.',
      'The age gate does not send your date of birth to a server from this screen. Contact links and future forms may collect only the information you choose to provide.',
      'You can clear browser storage from your browser settings or use the footer age-check control to re-open verification.',
    ],
  },
}

function calculateAge(day, month, year) {
  const birthDate = new Date(Number(year), Number(month) - 1, Number(day))
  const today = new Date()
  let age = today.getFullYear() - birthDate.getFullYear()
  const monthDiff = today.getMonth() - birthDate.getMonth()

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--
  }
  return age
}

function isValidDayMonthYear(d, m, y) {
  const day = Number(d)
  const month = Number(m)
  const year = Number(y)

  if (isNaN(day) || isNaN(month) || isNaN(year)) return false
  if (year < 1900 || year > new Date().getFullYear()) return false
  if (month < 1 || month > 12) return false
  if (day < 1 || day > 31) return false

  const date = new Date(year, month - 1, day)
  return (
    date.getFullYear() === year &&
    date.getMonth() === month - 1 &&
    date.getDate() === day
  )
}

export default function AgeGate() {
  const [isVerified, setIsVerified] = useState(() => {
    if (typeof window === 'undefined') return true
    return (
      localStorage.getItem(STORAGE_KEY) === 'true' ||
      sessionStorage.getItem(STORAGE_KEY) === 'true'
    )
  })

  const [selectedCountry, setSelectedCountry] = useState(COUNTRIES[0])
  const [isCountryModalOpen, setIsCountryModalOpen] = useState(false)
  const [countrySearch, setCountrySearch] = useState('')

  const [dob, setDob] = useState({ day: '', month: '', year: '' })
  const [rememberMe, setRememberMe] = useState(false)
  const [error, setError] = useState('')
  const [isUnderage, setIsUnderage] = useState(false)
  const [legalPanel, setLegalPanel] = useState(null)

  const dayRef = useRef(null)
  const monthRef = useRef(null)
  const yearRef = useRef(null)

  // Listen for the footer control that lets visitors reopen age verification.
  useEffect(() => {
    const handleReopen = () => {
      setIsVerified(false)
      setError('')
      setIsUnderage(false)
    }
    window.addEventListener('reopen-age-gate', handleReopen)
    return () => window.removeEventListener('reopen-age-gate', handleReopen)
  }, [])

  useEffect(() => {
    if (isVerified) {
      document.body.classList.remove('age-gate-open')
      return
    }

    document.body.classList.add('age-gate-open')
    return () => document.body.classList.remove('age-gate-open')
  }, [isVerified])

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key !== 'Escape') return
      setLegalPanel(null)
      setIsCountryModalOpen(false)
    }

    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [])

  const filteredCountries = useMemo(() => {
    if (!countrySearch.trim()) return COUNTRIES
    const q = countrySearch.toLowerCase()
    return COUNTRIES.filter(
      (c) => c.name.toLowerCase().includes(q) || c.code.toLowerCase().includes(q)
    )
  }, [countrySearch])
  const activeLegalCopy = legalPanel ? LEGAL_COPY[legalPanel] : null

  const handleInputChange = (field, value) => {
    // Only accept numeric digits
    const cleaned = value.replace(/\D/g, '')
    setError('')
    setIsUnderage(false)

    if (field === 'day') {
      const truncated = cleaned.slice(0, 2)
      setDob((prev) => ({ ...prev, day: truncated }))
      if (truncated.length === 2) {
        monthRef.current?.focus()
      }
    } else if (field === 'month') {
      const truncated = cleaned.slice(0, 2)
      setDob((prev) => ({ ...prev, month: truncated }))
      if (truncated.length === 2) {
        yearRef.current?.focus()
      }
    } else if (field === 'year') {
      const truncated = cleaned.slice(0, 4)
      setDob((prev) => ({ ...prev, year: truncated }))
    }
  }

  const handleKeyDown = (field, e) => {
    if (e.key === 'Backspace' && !dob[field]) {
      if (field === 'year') monthRef.current?.focus()
      if (field === 'month') dayRef.current?.focus()
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!dob.day || !dob.month || !dob.year) {
      setError('Please enter your full date of birth (Day, Month, Year).')
      return
    }

    if (!isValidDayMonthYear(dob.day, dob.month, dob.year)) {
      setError('Please enter a valid calendar date.')
      return
    }

    const age = calculateAge(dob.day, dob.month, dob.year)
    const requiredAge = selectedCountry.minAge

    if (age < requiredAge) {
      setIsUnderage(true)
      setError(
        `You must be at least ${requiredAge} years of age to enter in ${selectedCountry.name}. Access is restricted.`
      )
      return
    }

    // Success
    if (rememberMe) {
      localStorage.setItem(STORAGE_KEY, 'true')
    } else {
      sessionStorage.setItem(STORAGE_KEY, 'true')
    }

    setIsVerified(true)
  }

  if (isVerified) return null

  return (
    <div
      className="fixed inset-0 z-[999] flex flex-col justify-between overflow-y-auto bg-surface-black text-pure-white selection:bg-pure-white selection:text-surface-black backdrop-blur-[12px]"
      role="dialog"
      aria-modal="true"
      aria-labelledby="age-gate-heading"
    >
      {/* Background texture */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(180deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:54px_54px] opacity-30" />
        <div className="absolute inset-x-0 top-0 h-1 bg-[#E9542E]" />
      </div>

      {/* Top Header / Region Pill Bar */}
      <header className="relative z-10 mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-4 py-5 sm:px-8">
        <div className="flex items-center gap-2">
          <span className="font-mono text-[10px] font-black uppercase tracking-[0.26em] text-white sm:text-[11px]">
            NTS BLENDERS &amp; DISTILLERS
          </span>
        </div>

        {/* Country Selector Pill */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setIsCountryModalOpen(true)}
            className="group flex min-h-11 items-center gap-2 border border-white/20 bg-[#050505] px-3 py-2 text-xs transition-all duration-300 hover:border-[#E9542E] active:scale-95 sm:px-4"
            aria-haspopup="dialog"
            aria-expanded={isCountryModalOpen}
          >
            <span className="text-sm">{selectedCountry.flag}</span>
            <span className="font-sans text-[12px] font-black text-pure-white">
              {selectedCountry.name}
            </span>
            <span className="hidden font-mono text-[10px] font-bold tracking-wider text-white/55 sm:inline">
              ({selectedCountry.label})
            </span>
            <ChevronDown className="w-3.5 h-3.5 text-mid-grey-text transition-transform duration-200 group-hover:text-pure-white group-hover:translate-y-0.5" />
          </button>
        </div>
      </header>

      {/* Main Ceremonial Container */}
      <main className="relative z-10 my-auto flex w-full flex-col items-center justify-center px-4 py-4 sm:px-6 sm:py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-[560px] border border-white/15 bg-[#030303]/95 p-6 text-center shadow-[0_24px_80px_rgba(0,0,0,0.75)] backdrop-blur-xl sm:p-10"
        >
          <div className="absolute inset-x-6 top-0 h-px bg-[#E9542E]/80 sm:inset-x-10" />
          {/* NTS Distillers medallion crest */}
          <div className="mx-auto mb-7 flex flex-col items-center">
            <div className="relative flex items-center justify-center">
              <div className="age-gate-logo-seal">
                <img
                  src="/logo.png"
                  alt="NTS Blenders and Distillers logo"
                  className="h-full w-full object-contain"
                />
              </div>
            </div>

            {/* Overline Condensed Lg */}
            <p className="mt-5 font-serif text-[22px] font-black uppercase leading-[1.02] tracking-normal text-pure-white sm:text-[30px]">
              NTS BLENDERS &amp; DISTILLERS
            </p>
            <p className="mt-2 font-mono text-[10px] font-black uppercase tracking-[0.36em] text-[#E9542E] sm:text-[11px]">
              Premium spirits portfolio
            </p>
          </div>

          {/* Display Heading */}
          <h1
            id="age-gate-heading"
            className="font-serif text-[27px] font-black uppercase leading-[1.02] tracking-normal text-pure-white sm:text-[36px]"
          >
            Please Enter Your Date of Birth
          </h1>

          {/* Subheading & Instruction */}
          <p className="mx-auto mt-3 max-w-md font-sans text-[13px] font-semibold leading-[21px] text-white/65 sm:text-[15px]">
            You must be of legal drinking age in your country of residence to enter this site.
          </p>

          {/* Form Zone */}
          <form onSubmit={handleSubmit} className="mt-7 space-y-6" noValidate>
            {/* 3 Date Input Blocks */}
            <div className="grid grid-cols-3 gap-3 sm:gap-4" aria-label="Date of birth">
              {/* Day Input */}
              <div className="space-y-1.5 text-left">
                <label
                  htmlFor="dob-day"
                  className="block font-mono text-[11px] font-black uppercase tracking-[0.14em] text-white/68"
                >
                  Day
                </label>
                <div className="relative">
                  <input
                    ref={dayRef}
                    id="dob-day"
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    maxLength={2}
                    placeholder="DD"
                    value={dob.day}
                    onChange={(e) => handleInputChange('day', e.target.value)}
                    onKeyDown={(e) => handleKeyDown('day', e)}
                    aria-label="Day of birth"
                    className="h-14 w-full border border-white/18 bg-white/[0.075] px-2 text-center font-serif text-[28px] font-black leading-none text-pure-white outline-none transition-all duration-200 placeholder:text-white/28 focus:border-[#E9542E] focus:ring-2 focus:ring-[#E9542E]/30 sm:h-16 sm:text-[32px]"
                  />
                </div>
              </div>

              {/* Month Input */}
              <div className="space-y-1.5 text-left">
                <label
                  htmlFor="dob-month"
                  className="block font-mono text-[11px] font-black uppercase tracking-[0.14em] text-white/68"
                >
                  Month
                </label>
                <div className="relative">
                  <input
                    ref={monthRef}
                    id="dob-month"
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    maxLength={2}
                    placeholder="MM"
                    value={dob.month}
                    onChange={(e) => handleInputChange('month', e.target.value)}
                    onKeyDown={(e) => handleKeyDown('month', e)}
                    aria-label="Month of birth"
                    className="h-14 w-full border border-white/18 bg-white/[0.075] px-2 text-center font-serif text-[28px] font-black leading-none text-pure-white outline-none transition-all duration-200 placeholder:text-white/28 focus:border-[#E9542E] focus:ring-2 focus:ring-[#E9542E]/30 sm:h-16 sm:text-[32px]"
                  />
                </div>
              </div>

              {/* Year Input */}
              <div className="space-y-1.5 text-left">
                <label
                  htmlFor="dob-year"
                  className="block font-mono text-[11px] font-black uppercase tracking-[0.14em] text-white/68"
                >
                  Year
                </label>
                <div className="relative">
                  <input
                    ref={yearRef}
                    id="dob-year"
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    maxLength={4}
                    placeholder="YYYY"
                    value={dob.year}
                    onChange={(e) => handleInputChange('year', e.target.value)}
                    onKeyDown={(e) => handleKeyDown('year', e)}
                    aria-label="Year of birth"
                    className="h-14 w-full border border-white/18 bg-white/[0.075] px-2 text-center font-serif text-[28px] font-black leading-none text-pure-white outline-none transition-all duration-200 placeholder:text-white/28 focus:border-[#E9542E] focus:ring-2 focus:ring-[#E9542E]/30 sm:h-16 sm:text-[32px]"
                  />
                </div>
              </div>
            </div>

            {/* Error Message with Red Accent */}
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden"
                >
                  <div
                    className="flex items-center gap-2.5 rounded-input border border-error-red/50 bg-error-red/10 p-3 text-left font-amiko text-xs font-semibold text-error-red"
                    role="alert"
                  >
                    <AlertCircle className="h-4 w-4 shrink-0" />
                    <span>{error}</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Remember Me Checkbox */}
            <div className="flex items-start gap-3 text-left pt-1">
              <input
                type="checkbox"
                id="remember-me"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="mt-0.5 h-4 w-4 rounded-[4px] border border-light-grey-border/60 bg-input-surface accent-pure-white focus:ring-0 focus:ring-offset-0 cursor-pointer"
              />
              <label
                htmlFor="remember-me"
                className="cursor-pointer select-none font-sans text-[11px] font-semibold leading-[16px] text-white/62 sm:text-[12px]"
              >
                Remember me on this device{' '}
                <span className="font-normal text-white/38">
                  (Do not check if using a shared or public computer)
                </span>
              </label>
            </div>

            {/* Primary Action Button (ENTER) */}
            <div className="pt-2">
              <button
                type="submit"
                className="group relative inline-flex w-full items-center justify-center border-2 border-pure-white bg-surface-black px-8 py-4 font-mono text-[15px] font-black uppercase tracking-[0.26em] text-pure-white transition-all duration-300 hover:border-[#E9542E] hover:bg-[#E9542E] active:scale-[0.98] sm:text-[17px]"
              >
                <span>ENTER SITE</span>
              </button>
            </div>
          </form>

          {/* Fine Print Note */}
          <div className="mt-8 border-t border-white/10 pt-4">
            <p className="font-sans text-[12px] font-semibold leading-[18px] text-white/42">
              By entering this website, you accept our{' '}
              <button
                type="button"
                onClick={() => setLegalPanel('terms')}
                className="font-bold text-white/75 underline underline-offset-2 hover:text-[#E9542E]"
              >
                Terms of Use
              </button>{' '}
              and{' '}
              <button
                type="button"
                onClick={() => setLegalPanel('privacy')}
                className="font-bold text-white/75 underline underline-offset-2 hover:text-[#E9542E]"
              >
                Privacy Policy
              </button>
              . This site uses cookies to ensure optimal experience.
            </p>
          </div>
        </motion.div>
      </main>

      {/* Ceremonial Dark Footer Surface */}
      <footer className="relative z-10 w-full border-t border-white/10 bg-[#050505] px-5 py-5 sm:px-8">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 text-center sm:flex-row sm:text-left">
          <div className="flex items-center gap-2">
            <Shield className="h-4 w-4 text-mid-grey-text" />
            <p className="font-mono text-[10px] font-black uppercase tracking-[0.16em] text-white/62 sm:text-[11px]">
              NTS BLENDERS &amp; DISTILLERS REMINDS YOU TO DRINK RESPONSIBLY
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 font-sans text-[11px] font-semibold text-white/42">
            <a
              href="https://www.responsibility.org"
              target="_blank"
              rel="noreferrer"
              className="hover:text-pure-white transition-colors"
            >
              Responsibility.org
            </a>
            <span>•</span>
            <a
              href="https://www.drinkaware.co.uk"
              target="_blank"
              rel="noreferrer"
              className="hover:text-pure-white transition-colors"
            >
              DrinkAware
            </a>
            <span>•</span>
            <button
              onClick={() => {
                setDob({ day: '', month: '', year: '' })
                setError('')
              }}
              className="hover:text-pure-white transition-colors underline"
            >
              Clear Inputs
            </button>
          </div>
        </div>
      </footer>

      {/* Country Selector Modal */}
      <AnimatePresence>
        {isCountryModalOpen && (
          <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCountryModalOpen(false)}
              className="absolute inset-0 bg-surface-black/80 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="relative w-full max-w-md rounded-card border border-light-grey-border/30 bg-dark-footer-surface p-6 shadow-2xl z-10"
            >
              <div className="flex items-center justify-between border-b border-light-grey-border/10 pb-4">
                <div className="flex items-center gap-2">
                  <Globe className="h-5 w-5 text-pure-white" />
                  <h2 className="font-jdSansCondensed text-[20px] font-semibold uppercase tracking-wider text-pure-white">
                    Select Your Country / Region
                  </h2>
                </div>
                <button
                  onClick={() => setIsCountryModalOpen(false)}
                  className="rounded-full p-1 text-mid-grey-text hover:bg-input-surface hover:text-pure-white transition-colors"
                  aria-label="Close country selector"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Search Bar */}
              <div className="mt-4">
                <input
                  type="text"
                  placeholder="Search countries..."
                  value={countrySearch}
                  onChange={(e) => setCountrySearch(e.target.value)}
                  className="w-full rounded-input border border-light-grey-border/20 bg-input-surface px-4 py-2.5 font-amiko text-sm text-pure-white placeholder-charcoal-text outline-none focus:border-pure-white"
                />
              </div>

              {/* Country List */}
              <div className="mt-4 max-h-[300px] overflow-y-auto space-y-1 pr-1 custom-scrollbar">
                {filteredCountries.map((c) => {
                  const isSelected = selectedCountry.code === c.code
                  return (
                    <button
                      key={c.code}
                      type="button"
                      onClick={() => {
                        setSelectedCountry(c)
                        setIsCountryModalOpen(false)
                        setError('')
                        setIsUnderage(false)
                      }}
                      className={`flex w-full items-center justify-between rounded-input px-3.5 py-2.5 text-left transition-colors ${
                        isSelected
                          ? 'bg-pure-white text-surface-black'
                          : 'hover:bg-input-surface text-pure-white'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-lg">{c.flag}</span>
                        <div>
                          <p
                            className={`font-amiko text-sm ${
                              isSelected ? 'font-bold' : 'font-normal'
                            }`}
                          >
                            {c.name}
                          </p>
                          <p
                            className={`font-jdSansCondensed text-xs ${
                              isSelected ? 'text-charcoal-text' : 'text-mid-grey-text'
                            }`}
                          >
                            Legal Drinking Age: {c.label}
                          </p>
                        </div>
                      </div>
                      {isSelected && <Check className="h-4 w-4 shrink-0 text-surface-black" />}
                    </button>
                  )
                })}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Terms / Privacy Modal */}
      <AnimatePresence>
        {activeLegalCopy && (
          <div className="fixed inset-0 z-[1001] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setLegalPanel(null)}
              className="absolute inset-0 bg-black/86 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, y: 18, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.97 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              role="dialog"
              aria-modal="true"
              aria-labelledby="age-gate-legal-title"
              className="relative z-10 flex max-h-[86vh] w-full max-w-2xl flex-col border border-white/16 bg-[#030303] text-white shadow-[0_28px_90px_rgba(0,0,0,0.9)]"
            >
              <div className="flex items-start justify-between gap-4 border-b border-white/10 p-5 sm:p-7">
                <div>
                  <p className="font-mono text-[10px] font-black uppercase tracking-[0.28em] text-[#E9542E]">
                    {activeLegalCopy.eyebrow}
                  </p>
                  <h2 id="age-gate-legal-title" className="mt-2 font-serif text-2xl font-black uppercase leading-tight sm:text-4xl">
                    {activeLegalCopy.title}
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={() => setLegalPanel(null)}
                  className="flex h-10 w-10 shrink-0 items-center justify-center border border-white/20 text-white/72 transition-colors hover:border-[#E9542E] hover:bg-[#E9542E] hover:text-white"
                  aria-label={`Close ${activeLegalCopy.eyebrow}`}
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="overflow-y-auto p-5 sm:p-7">
                <p className="max-w-xl font-sans text-sm font-semibold leading-6 text-white/72">
                  {activeLegalCopy.intro}
                </p>
                <div className="mt-6 space-y-4">
                  {activeLegalCopy.sections.map((section, index) => (
                    <article key={section} className="border-l-2 border-[#E9542E] pl-4">
                      <p className="font-mono text-[10px] font-black uppercase tracking-[0.22em] text-white/38">
                        {String(index + 1).padStart(2, '0')}
                      </p>
                      <p className="mt-1 font-sans text-sm font-semibold leading-6 text-white/76">
                        {section}
                      </p>
                    </article>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-3 border-t border-white/10 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-7">
                <a
                  href={activeLegalCopy.fullPath}
                  className="inline-flex min-h-11 items-center justify-center border border-white/22 px-5 font-mono text-[11px] font-black uppercase tracking-[0.2em] text-white transition-colors hover:border-white hover:bg-white hover:text-black"
                >
                  Open full page
                </a>
                <button
                  type="button"
                  onClick={() => setLegalPanel(null)}
                  className="inline-flex min-h-11 items-center justify-center bg-[#E9542E] px-5 font-mono text-[11px] font-black uppercase tracking-[0.2em] text-white transition-colors hover:bg-white hover:text-black"
                >
                  Back to age check
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
