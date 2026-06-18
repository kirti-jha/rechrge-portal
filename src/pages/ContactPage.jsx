import { Link } from 'react-router-dom'
import PageHero from '../components/PageHero'
import Contact from '../components/Contact'

const contactReasons = [
  {
    title: 'New Admin Setup',
    copy: 'For business owners who want to launch a new PAN and recharge network with top-level portal access.',
  },
  {
    title: 'Retailor Onboarding',
    copy: 'For existing partners who need credentials, downline access, support help or role clarification.',
  },
  {
    title: 'Technical Integration',
    copy: 'For teams preparing wallet, API, reporting or transaction integrations inside the MERN product.',
  },
]

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

      <section className="section page-detail-section">
        <div className="section-heading">
          <span className="eyebrow-badge">When To Contact Us</span>
          <h2>Make this page useful before the form even starts.</h2>
          <p>
            A strong contact page tells users why they should reach out, not just where to type their name.
            That matters even more in a partner-driven product like this one.
          </p>
        </div>
        <div className="detail-card-grid three">
          {contactReasons.map((item) => (
            <article key={item.title} className="detail-card">
              <h3>{item.title}</h3>
              <p>{item.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <Contact />
    </div>
  )
}
