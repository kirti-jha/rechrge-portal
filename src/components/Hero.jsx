import Reveal from './Reveal'
import Simulator from './Simulator'
import { Link } from 'react-router-dom'

export default function Hero({ activeSimTab, setActiveSimTab }) {
  return (
    <section className="hero">
      <Reveal className="hero-intro">
        <div className="badge-container">
          <span className="eyebrow-badge">Trusted PAN, Recharge and Retailor Services</span>
        </div>
        <h1>Build your PAN and recharge business with admin and retailor control in one place.</h1>
        <p className="hero-text">
          Inspired by high-conversion PAN service landing pages, this experience combines new PAN support,
          correction workflows, mobile and DTH services, plus a retailor hierarchy that can grow from admin to unlimited downlines.
        </p>
        <div className="hero-actions">
          <Link className="primary-button" to="/hierarchy">Free Retailor Setup</Link>
          <Link className="secondary-button" to="/services">Explore Services</Link>
        </div>
        <div className="hero-signal-grid">
          <article className="hero-signal-card">
            <span>Retailor Chain</span>
            <strong>Admin to unlimited downline</strong>
          </article>
          <article className="hero-signal-card">
            <span>Service Coverage</span>
            <strong>New PAN, correction, recharge</strong>
          </article>
          <article className="hero-signal-card">
            <span>Charge Control</span>
            <strong>Per downline pricing rules</strong>
          </article>
        </div>
        <div className="security-highlights">
          <div className="security-item">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
            <span>Secure PAN and recharge workflows</span>
          </div>
          <div className="security-item">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
            <span>Fast retailor onboarding and support</span>
          </div>
        </div>
      </Reveal>

      <Reveal className="hero-simulator-container" id="simulator">
        <div className="hero-side-stack">
          <div className="hero-float-chip hero-float-top">
            <span>Applications Processed</span>
            <strong>50K+</strong>
          </div>
          <Simulator activeSimTab={activeSimTab} setActiveSimTab={setActiveSimTab} />
          <div className="hero-float-chip hero-float-bottom">
            <span>Support Desk</span>
            <strong>24/7 Active</strong>
          </div>
          <div className="hero-ops-card">
            <div className="hero-ops-head">
              <span className="mini-label">Operations Snapshot</span>
              <strong>PAN-center inspired network flow</strong>
            </div>
            <div className="hero-ops-grid">
              <article>
                <span>Direct retailors</span>
                <strong>24</strong>
              </article>
              <article>
                <span>Downline charges</span>
                <strong>Service-wise</strong>
              </article>
              <article>
                <span>Settlement window</span>
                <strong>Near real-time</strong>
              </article>
            </div>
            <p className="hero-ops-note">
              Admin creates retailors, retailors create more retailors, and every direct downline can have its own service charge structure.
            </p>
          </div>
        </div>
      </Reveal>
    </section>
  )
}
