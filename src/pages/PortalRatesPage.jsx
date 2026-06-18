import { useEffect, useState } from 'react'
import { portalApi } from '../lib/portalApi'
import { useAuth } from '../context/AuthContext'

export default function PortalRatesPage() {
  const { token } = useAuth()
  const [users, setUsers] = useState([])
  const [message, setMessage] = useState('')

  useEffect(() => {
    portalApi
      .listUsers(token)
      .then((data) => setUsers(data.users.filter((user) => user.role === 'retailor')))
      .catch((error) => setMessage(error.message))
  }, [token])

  return (
    <section className="dashboard-page">
      <article className="dashboard-panel">
        <div className="dashboard-panel-head">
          <div>
            <span className="mini-label">Rate Setting</span>
            <h2>Current service charge cards</h2>
          </div>
        </div>

        {message ? <p className="dashboard-message">{message}</p> : null}

        <div className="dashboard-card-grid">
          {users.map((user) => (
            <article key={user.id} className="dashboard-rate-card">
              <strong>{user.name}</strong>
              <span>{user.code}</span>
              <p>Mobile: Rs {user.charges.mobile.toFixed(2)}</p>
              <p>DTH: Rs {user.charges.dth.toFixed(2)}</p>
              <p>PAN: Rs {user.charges.pan.toFixed(2)}</p>
            </article>
          ))}
        </div>
      </article>
    </section>
  )
}
