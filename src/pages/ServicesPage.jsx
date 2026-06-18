import { useState } from 'react'
import { Link } from 'react-router-dom'
import PageHero from '../components/PageHero'
import Services from '../components/Services'
import Simulator from '../components/Simulator'

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
    </div>
  )
}
