import { useState } from 'react'
import { Link } from 'react-router-dom'
import PageHero from '../components/PageHero'
import Services from '../components/Services'
import Simulator from '../components/Simulator'

const serviceHighlights = [
  {
    title: 'PAN Service Desk',
    copy: 'Handle new applications, corrections, reprints and status follow-up from a single customer-facing workflow.',
  },
  {
    title: 'Recharge Counter Flow',
    copy: 'Use the same interface for fast mobile and DTH transactions without switching tools between services.',
  },
  {
    title: 'Retailor-Friendly Operations',
    copy: 'Keep services simple enough for shop staff while still preparing the flow for future API and wallet integration.',
  },
]

const workflowSteps = [
  'Select the service type from the unified portal.',
  'Capture customer details with minimal friction.',
  'Apply charges according to admin or retailor-level configuration.',
  'Track output later from dashboard, support, and user-control pages.',
]

export default function ServicesPage() {
  const [activeSimTab, setActiveSimTab] = useState('mobile')

  return (
    <div className="page-stack">
      <PageHero
        eyebrow="Services"
        title="Separate service pages start here with PAN, mobile and DTH workflows."
        description="This page is dedicated to your core transaction services, so users do not need to scroll through the full landing page just to access recharge or PAN actions."
        actions={
          <>
            <Link className="primary-button" to="/hierarchy">Go To Hierarchy</Link>
            <Link className="secondary-button" to="/contact">Talk To Support</Link>
          </>
        }
      />

      <Services switchSimTab={setActiveSimTab} />

      <section className="section page-detail-section">
        <div className="section-heading">
          <span className="eyebrow-badge">Service Model</span>
          <h2>One page for discovery, one system for execution.</h2>
          <p>
            The public service page should help customers and partners understand what is available,
            while the logged-in portal handles actual transactions, pricing and day-to-day operational control.
          </p>
        </div>
        <div className="detail-card-grid three">
          {serviceHighlights.map((item) => (
            <article key={item.title} className="detail-card">
              <h3>{item.title}</h3>
              <p>{item.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="section-heading">
          <span className="eyebrow-badge">Service Portal</span>
          <h2>Try each service flow from its own dedicated route.</h2>
          <p>
            Your MERN app can now expose services as a proper page while still keeping the simulator ready for real API integration later.
          </p>
        </div>
        <div className="page-simulator-wrap">
          <Simulator activeSimTab={activeSimTab} setActiveSimTab={setActiveSimTab} />
        </div>
      </section>

      <section className="section page-detail-section">
        <div className="section-heading">
          <span className="eyebrow-badge">Workflow</span>
          <h2>How these service pages should evolve inside MERN.</h2>
        </div>
        <div className="process-strip">
          {workflowSteps.map((step, index) => (
            <article key={step} className="process-card">
              <span>0{index + 1}</span>
              <p>{step}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}
