import { Link } from 'react-router-dom'
import PageHero from '../components/PageHero'
import Results from '../components/Results'

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
      <Results />
    </div>
  )
}
