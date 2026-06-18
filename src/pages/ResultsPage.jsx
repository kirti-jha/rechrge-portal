import { Link } from 'react-router-dom'
import PageHero from '../components/PageHero'
import Results from '../components/Results'

const resultNarratives = [
  {
    title: 'Public Trust',
    copy: 'Landing-page proof points reduce hesitation for PAN applicants and retailor prospects before they ever reach login.',
  },
  {
    title: 'Partner Confidence',
    copy: 'Once a retailor signs in, the same credibility should continue through rates, support, user visibility and ticket handling.',
  },
  {
    title: 'Operational Reporting',
    copy: 'These static metrics can later become real dashboard stats coming from service requests, tickets and commission models.',
  },
]

export default function ResultsPage() {
  return (
    <div className="page-stack">
      <PageHero
        eyebrow="Results"
        title="Metrics and credibility now live on a dedicated page."
        description="Use this route for trust-building content, platform performance, retailer growth proof, and future reporting widgets from your MERN backend."
        actions={
          <>
            <Link className="primary-button" to="/about">Why LPay</Link>
            <Link className="secondary-button" to="/hierarchy">Partner Network</Link>
          </>
        }
      />

      <section className="section page-detail-section">
        <div className="section-heading">
          <span className="eyebrow-badge">Credibility Layer</span>
          <h2>Results are not decoration. They shape conversion.</h2>
          <p>
            This page should explain why performance metrics matter both for end customers and for retailor partners
            who are deciding whether this system feels dependable enough to run their local operations.
          </p>
        </div>
        <div className="detail-card-grid three">
          {resultNarratives.map((item) => (
            <article key={item.title} className="detail-card">
              <h3>{item.title}</h3>
              <p>{item.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <Results />
    </div>
  )
}
