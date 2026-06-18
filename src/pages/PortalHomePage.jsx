import { useEffect, useState } from 'react'
import { portalApi } from '../lib/portalApi'
import { useAuth } from '../context/AuthContext'

export default function PortalHomePage() {
  const { token } = useAuth()
  const [data, setData] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => {
    portalApi
      .summary(token)
      .then(setData)
      .catch((nextError) => setError(nextError.message))
  }, [token])

  if (error) {
    return <section className="dashboard-panel"><p className="form-error">{error}</p></section>
  }

  if (!data) {
    return <section className="dashboard-panel">Loading dashboard...</section>
  }

  return (
    <section className="dashboard-page">
      <div className="dashboard-card-grid">
        <article className="dashboard-stat-card">
          <span>Total visible users</span>
          <strong>{data.summary.totalUsers}</strong>
        </article>
        <article className="dashboard-stat-card">
          <span>Total retailors</span>
          <strong>{data.summary.totalRetailors}</strong>
        </article>
        <article className="dashboard-stat-card">
          <span>Open tickets</span>
          <strong>{data.support.openTickets}</strong>
        </article>
        <article className="dashboard-stat-card">
          <span>In progress tickets</span>
          <strong>{data.support.inProgressTickets}</strong>
        </article>
      </div>

      <article className="dashboard-panel">
        <span className="mini-label">Current Access</span>
        <h2>{data.user.role === 'admin' ? 'Admin control panel' : 'Retailor control panel'}</h2>
        <p className="dashboard-copy">
          Admins can see the full network. Retailors can create retailors under themselves, manage direct charges,
          raise support requests, change theme, and update passwords.
        </p>
      </article>
    </section>
  )
}
