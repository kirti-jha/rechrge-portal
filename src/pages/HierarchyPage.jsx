import { Link } from 'react-router-dom'
import PageHero from '../components/PageHero'
import HierarchyManager from '../components/HierarchyManager'

const hierarchyNotes = [
  {
    title: 'Admin Control',
    copy: 'Admin can create first-level retailors, review the full tree and set the initial operational rules for the network.',
  },
  {
    title: 'Retailor Expansion',
    copy: 'Every retailor can create additional retailors beneath themselves, allowing local business networks to grow naturally.',
  },
  {
    title: 'Charge Ownership',
    copy: 'Charges should belong to each direct parent-child relationship so pricing remains flexible across the tree.',
  },
]

const hierarchyUseCases = [
  'Local PAN and recharge distributor managing city-level shops.',
  'Admin onboarding district-level retailors with separate service charges.',
  'Retailor expanding into sub-retailors without needing new system roles.',
]

export default function HierarchyPage() {
  return (
    <div className="page-stack">
      <PageHero
        eyebrow="Hierarchy"
        title="Manage admin and retailor pages without mixing them into the landing page."
        description="This route is dedicated to partner creation, downline structure, and service-wise charge rules. It is a better fit for a real MERN dashboard flow."
        actions={
          <>
            <Link className="primary-button" to="/services">Open Services</Link>
            <Link className="secondary-button" to="/contact">Request Backend Setup</Link>
          </>
        }
      />

      <section className="section page-detail-section">
        <div className="section-heading">
          <span className="eyebrow-badge">Network Logic</span>
          <h2>Keep the hierarchy simple, but make the rules strong.</h2>
          <p>
            A two-level role model does not mean the business is shallow. It means the permissions stay understandable
            while the downline can keep expanding through parent-child creation rules.
          </p>
        </div>
        <div className="detail-card-grid three">
          {hierarchyNotes.map((item) => (
            <article key={item.title} className="detail-card">
              <h3>{item.title}</h3>
              <p>{item.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <HierarchyManager />

      <section className="section page-detail-section">
        <div className="section-heading">
          <span className="eyebrow-badge">Real Use Cases</span>
          <h2>Where this hierarchy model actually helps.</h2>
        </div>
        <div className="bullet-panel">
          {hierarchyUseCases.map((item) => (
            <p key={item}>{item}</p>
          ))}
        </div>
      </section>
    </div>
  )
}
