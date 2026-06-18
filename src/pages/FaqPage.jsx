import { Link } from 'react-router-dom'
import PageHero from '../components/PageHero'
import FAQ from '../components/FAQ'

const faqTopics = [
  'PAN application timing and document flow',
  'Admin and retailor roles inside the portal',
  'Downline charge logic and rate control',
  'Support requests, password changes and theme settings',
]

export default function FaqPage() {
  return (
    <div className="page-stack">
      <PageHero
        eyebrow="FAQ"
        title="Keep support questions on their own route for a cleaner user journey."
        description="This page is ready for common PAN, recharge, hierarchy, and commission questions, and later can be connected to CMS or admin-managed content."
        actions={
          <>
            <Link className="primary-button" to="/contact">Ask Support</Link>
            <Link className="secondary-button" to="/services">Browse Services</Link>
          </>
        }
      />

      <section className="section page-detail-section">
        <div className="section-heading">
          <span className="eyebrow-badge">Support Focus</span>
          <h2>This page should answer both public and partner questions.</h2>
          <p>
            FAQ is more useful when it bridges the public site and the logged-in product,
            because many questions start before login and continue after a retailor joins the network.
          </p>
        </div>
        <div className="bullet-panel">
          {faqTopics.map((item) => (
            <p key={item}>{item}</p>
          ))}
        </div>
      </section>

      <FAQ />
    </div>
  )
}
