import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <section className="page-hero not-found-page">
      <div className="page-hero-copy">
        <span className="eyebrow-badge">404</span>
        <h1>This page does not exist yet.</h1>
        <p>The route is missing, but the rest of the app is still available.</p>
        <div className="page-hero-actions">
          <Link className="primary-button" to="/">Go Home</Link>
          <Link className="secondary-button" to="/services">Open Services</Link>
        </div>
      </div>
    </section>
  )
}
