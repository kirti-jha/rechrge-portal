import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function LoginPage() {
  const { isAuthenticated, login } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ login: 'admin@lpay.in', password: 'admin123' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  if (isAuthenticated) {
    return <Navigate to="/portal" replace />
  }

  const handleChange = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')
    setLoading(true)
    try {
      await login(form)
      navigate('/portal')
    } catch (nextError) {
      setError(nextError.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-shell">
      <form className="auth-card" onSubmit={handleSubmit}>
        <span className="eyebrow-badge">Portal Login</span>
        <h1>Login as admin or retailor.</h1>
        <p>Use the seeded credentials now, then replace them with Mongo-backed users later.</p>

        <label>
          Email or Code
          <input
            type="text"
            value={form.login}
            onChange={(event) => handleChange('login', event.target.value)}
            placeholder="admin@lpay.in or ADM-001"
          />
        </label>

        <label>
          Password
          <input
            type="password"
            value={form.password}
            onChange={(event) => handleChange('password', event.target.value)}
            placeholder="Enter password"
          />
        </label>

        {error ? <p className="form-error">{error}</p> : null}

        <button className="primary-button full-width" type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>

        <div className="login-hints">
          <strong>Seeded access</strong>
          <span>Admin: `admin@lpay.in` / `admin123`</span>
          <span>Retailor: `aarav@lpay.in` / `retailor123`</span>
        </div>
      </form>
    </div>
  )
}
