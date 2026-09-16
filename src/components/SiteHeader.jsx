import React, { useState } from 'react'
import { X } from 'lucide-react'

export default function SiteHeader({ current }) {
  const [isOpen, setIsOpen] = useState(false)
  const links = [
    { label: 'Home', href: '/' },
    { label: 'Products', href: '/products' },
    { label: 'About', href: '/about' },
    { label: 'Distillery', href: '/distillery' },
    { label: 'Achievements', href: '/achievements' },
    { label: 'Contact', href: '/contact' },
  ]

  return (
    <header className="inner-page-nav" id="top">
      <a className="inner-page-nav__brand" href="/" aria-label="NTS Distillers home">
        <img src="/logo.png" alt="" className="nav-logo-seal" />
        <span>NTS Distillers</span>
      </a>
      <nav aria-label="Site navigation">
        {links.map((link) => (
          <a key={link.href} href={link.href} aria-current={current === link.href ? 'page' : undefined}>
            {link.label}
          </a>
        ))}
      </nav>
      <a className="inner-page-nav__cta" href="/contact">
        Contact
      </a>
      <button
        className="inner-page-nav__toggle"
        type="button"
        aria-expanded={isOpen}
        aria-controls="inner-mobile-nav"
        aria-label={isOpen ? 'Close navigation' : 'Open navigation'}
        onClick={() => setIsOpen((open) => !open)}
      >
        {isOpen ? <X className="h-5 w-5" aria-hidden="true" /> : <span aria-hidden="true" />}
      </button>
      <div className={`inner-page-nav__mobile ${isOpen ? 'is-open' : ''}`} id="inner-mobile-nav">
        {links.map((link) => (
          <a
            key={link.href}
            href={link.href}
            aria-current={current === link.href ? 'page' : undefined}
            onClick={() => setIsOpen(false)}
          >
            {link.label}
          </a>
        ))}
        <a className="inner-page-nav__mobile-cta" href="/contact" onClick={() => setIsOpen(false)}>
          Contact
        </a>
      </div>
    </header>
  )
}
