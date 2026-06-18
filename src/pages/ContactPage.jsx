import { Link } from 'react-router-dom'
import PageHero from '../components/PageHero'
import Contact from '../components/Contact'

export default function ContactPage() {
  return (
    <div className="page-stack">
      <PageHero
        eyebrow="Contact"
        title="Use a dedicated contact page for onboarding, support, and partner callbacks."
        description="This route is where admins, retailors, and service partners can request help without needing to reach the bottom of the homepage."
        actions={
          <>
            <Link className="primary-button" to="/hierarchy">Open Hierarchy</Link>
            <Link className="secondary-button" to="/services">Go To Services</Link>
          </>
        }
      />
      <Contact />
    </div>
  )
}
