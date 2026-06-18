import { Link } from 'react-router-dom'
import PageHero from '../components/PageHero'
import FAQ from '../components/FAQ'

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
      <FAQ />
    </div>
  )
}
