import { Link } from 'react-router-dom'
import PageHero from '../components/PageHero'
import About from '../components/About'

export default function AboutPage() {
  return (
    <div className="page-stack">
      <PageHero
        eyebrow="About"
        title="Give the business story its own page instead of burying it between sections."
        description="This route focuses on the platform value, operational clarity, and why your PAN and recharge flow should feel more like a product than a generic portal."
        actions={
          <>
            <Link className="primary-button" to="/results">See Results</Link>
            <Link className="secondary-button" to="/faq">Read FAQ</Link>
          </>
        }
      />
      <About />
    </div>
  )
}
