import React, { useEffect, useState } from 'react'
import { X } from 'lucide-react'
import AgeGate from './AgeGate'
import FooterRedesign from './FooterRedesign'
import { setPageSeo } from '../lib/seo'
import { getSeoRoute } from '../data/seoRoutes'

const legalPages = {
  terms: {
    eyebrow: 'Terms & Conditions',
    title: 'Terms of Website Use',
    intro:
      'These terms govern access to and use of the NTS Distillers website. By continuing to browse this site, you agree to use it responsibly and in accordance with applicable laws.',
    updated: 'Last updated: August 21, 2026',
    sections: [
      {
        heading: 'Legal drinking age',
        body:
          'This website is intended only for visitors who are of legal drinking age in their country, state, or region. If you are not legally permitted to view alcohol-related content, you must leave the site immediately.',
      },
      {
        heading: 'Website content',
        body:
          'Product information, brand descriptions, facility details, images, and other materials are provided for general informational and business contact purposes. Availability, specifications, packaging, and regulatory requirements may vary by market.',
      },
      {
        heading: 'Responsible use',
        body:
          'NTS Distillers supports responsible drinking. The website must not be used to encourage underage drinking, excessive consumption, unsafe behavior, or any activity prohibited by law.',
      },
      {
        heading: 'Business contact',
        body:
          'Forms and contact links on this site are provided for legitimate trade, distribution, partnership, and manufacturing conversations. Sending a message does not create a binding agreement, commercial obligation, or supply commitment.',
      },
      {
        heading: 'Intellectual property',
        body:
          'All logos, brand names, text, product visuals, layouts, and other website materials belong to NTS Distillers or their respective owners. They may not be copied, modified, distributed, or used commercially without written permission.',
      },
      {
        heading: 'Limitation of liability',
        body:
          'The website is provided on an as-is basis. NTS Distillers is not responsible for losses arising from website interruptions, errors, outdated information, or decisions made based on website content.',
      },
      {
        heading: 'Changes to these terms',
        body:
          'NTS Distillers may update these terms from time to time. Continued use of the website after changes are posted means you accept the updated terms.',
      },
    ],
  },
  privacy: {
    eyebrow: 'Privacy Policy',
    title: 'How We Handle Your Information',
    intro:
      'This policy explains the types of information the NTS Distillers website may collect and how that information may be used to operate the site, respond to messages, and improve visitor experience.',
    updated: 'Last updated: August 21, 2026',
    sections: [
      {
        heading: 'Information you provide',
        body:
          'When you contact us, we may collect details such as your name, company, email address, phone number, and the message or requirements you choose to share.',
      },
      {
        heading: 'Age verification',
        body:
          'The site uses age-gate information only to confirm that you are legally permitted to access alcohol-related content. Age-gate confirmation may be stored in your browser through local or session storage depending on your selection.',
      },
      {
        heading: 'How information is used',
        body:
          'We may use submitted information to respond to your request, evaluate business opportunities, provide product or facility information, maintain site security, and improve our website experience.',
      },
      {
        heading: 'Cookies and browser storage',
        body:
          'The website may use browser storage and similar technologies for age-gate status, basic preferences, performance, and usability. You can clear this information through your browser settings.',
      },
      {
        heading: 'Sharing information',
        body:
          'We do not sell personal information. Information may be shared only with trusted service providers, internal teams, or authorities when required to respond to messages, operate the site, protect rights, or comply with law.',
      },
      {
        heading: 'Data security',
        body:
          'We use reasonable administrative and technical safeguards to protect submitted information, but no internet transmission or storage system can be guaranteed to be completely secure.',
      },
      {
        heading: 'Contact and updates',
        body:
          'For privacy-related questions or requests, contact NTS Distillers using the email or phone details in the website footer. This policy may be updated as the website and business processes evolve.',
      },
    ],
  },
}

function LegalHeader() {
  const [isOpen, setIsOpen] = useState(false)
  const links = [
    { label: 'Home', href: '/' },
    { label: 'Products', href: '/products' },
    { label: 'Terms', href: '/terms' },
    { label: 'Privacy', href: '/privacy' },
    { label: 'Contact', href: '/contact' },
  ]

  return (
    <header className="legal-page-nav" id="top">
      <a className="legal-page-nav__brand" href="/" aria-label="NTS Distillers home">
        <img src="/logo.png" alt="" className="nav-logo-seal" />
        <span>NTS Distillers</span>
      </a>
      <nav aria-label="Legal page navigation">
        {links.map((link) => (
          <a key={link.href} href={link.href}>{link.label}</a>
        ))}
      </nav>
      <button
        className="legal-page-nav__toggle"
        type="button"
        aria-expanded={isOpen}
        aria-controls="legal-mobile-nav"
        aria-label={isOpen ? 'Close navigation' : 'Open navigation'}
        onClick={() => setIsOpen((open) => !open)}
      >
        {isOpen ? <X className="h-5 w-5" aria-hidden="true" /> : <span aria-hidden="true" />}
      </button>
      <div className={`legal-page-nav__mobile ${isOpen ? 'is-open' : ''}`} id="legal-mobile-nav">
        {links.map((link) => (
          <a key={link.href} href={link.href} onClick={() => setIsOpen(false)}>
            {link.label}
          </a>
        ))}
      </div>
    </header>
  )
}

export default function LegalPage({ page = 'terms' }) {
  const content = legalPages[page] || legalPages.terms

  useEffect(() => {
    const path = page === 'privacy' ? '/privacy' : '/terms'

    setPageSeo(getSeoRoute(path))
  }, [content])

  return (
    <div className="legal-page">
      <AgeGate />
      <LegalHeader />

      <main className="legal-page__main" id="main">
        <section className="legal-page__hero" aria-labelledby="legal-page-title">
          <p>{content.eyebrow}</p>
          <h1 id="legal-page-title">{content.title}</h1>
          <span>{content.updated}</span>
        </section>

        <section className="legal-page__content" aria-label={content.eyebrow}>
          <p className="legal-page__intro">{content.intro}</p>

          <div className="legal-page__sections">
            {content.sections.map((section) => (
              <article key={section.heading} className="legal-page__section">
                <h2>{section.heading}</h2>
                <p>{section.body}</p>
              </article>
            ))}
          </div>

          <div className="legal-page__notice">
            <p>
              This page is intended as general website information and should be reviewed against
              applicable legal and regulatory requirements before commercial publication.
            </p>
          </div>
        </section>
      </main>

      <FooterRedesign />
    </div>
  )
}
