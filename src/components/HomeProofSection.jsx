import React from 'react'
import { ArrowUpRight } from 'lucide-react'
import { companyFacts, facilityStats, machineryList } from '../data/siteData'

const operatingSteps = [
  {
    label: '01',
    title: 'Prepare',
    body: 'The Canacona facility is organized for disciplined production flow, quality checks, and practical batch control.',
  },
  {
    label: '02',
    title: 'Bottle',
    body: 'The machinery schedule includes rotary washing, vacuum filling, cap sealing, inspection, labelling, printing, and packing support.',
  },
  {
    label: '03',
    title: 'Dispatch',
    body: 'The Canacona unit is supported by bonded warehousing and highway access through Goa.',
  },
]

export default function HomeProofSection() {
  return (
    <section className="home-proof-section" aria-labelledby="home-proof-title">
      <div className="home-proof-section__inner">
        <div className="home-proof-section__intro">
          <p>Operating Proof</p>
          <h2 id="home-proof-title">From trade history to Goa production discipline.</h2>
          <span>
            NTS began as NTS Wines in {companyFacts.origin} in {companyFacts.founded} under {companyFacts.founder}. The current website presents the
            company as a manufacturing and portfolio house based around {companyFacts.facility}.
          </span>
          <div className="home-proof-section__intro-ledger" aria-label="Operating proof summary">
            <article>
              <strong>Canacona</strong>
              <small>Goa manufacturing base with highway access through the state route and NH 66.</small>
            </article>
            <article>
              <strong>Portfolio House</strong>
              <small>Owned whisky, brandy, rum, vodka, and flavored vodka labels built for trade conversations.</small>
            </article>
            <article>
              <strong>Expansion Ready</strong>
              <small>Future plans list production growth toward 2,50,000 cases per month.</small>
            </article>
          </div>
        </div>

        <div className="home-proof-section__media">
          <video
            src="/videos/operating-proof-bottle.mp4"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-label="NTS bottle product video"
          />
        </div>

        <div className="home-proof-section__stats" aria-label="NTS facility facts">
          {facilityStats.slice(0, 5).map((stat) => (
            <article key={stat.label}>
              <strong>{stat.value}</strong>
              <span>{stat.label}</span>
            </article>
          ))}
        </div>

        <div className="home-proof-section__process" aria-label="NTS manufacturing process summary">
          {operatingSteps.map((step) => (
            <article key={step.label}>
              <span>{step.label}</span>
              <div>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </div>
            </article>
          ))}
        </div>

        <div className="home-proof-section__machinery">
          <p>Machinery Base</p>
          <ul>
            {machineryList.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <a href="/distillery">
            View Distillery
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  )
}
