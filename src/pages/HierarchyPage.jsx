import { Link } from 'react-router-dom'
import PageHero from '../components/PageHero'
import HierarchyManager from '../components/HierarchyManager'

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
      <HierarchyManager />
    </div>
  )
}
