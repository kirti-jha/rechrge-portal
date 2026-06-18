import { useState } from 'react'
import { portalApi } from '../lib/portalApi'
import { useAuth } from '../context/AuthContext'

export default function PortalPasswordPage() {
  const { token } = useAuth()
  const [form, setForm] = useState({ currentPassword: '', newPassword: '' })
  const [notice, setNotice] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const result = await portalApi.changePassword(form, token)
      setNotice(result.message)
      setForm({ currentPassword: '', newPassword: '' })
    } catch (error) {
      setNotice(error.message)
    }
  }

  return (
    <section className="dashboard-page">
      <form className="dashboard-panel dashboard-form-panel narrow" onSubmit={handleSubmit}>
        <span className="mini-label">Password</span>
        <h2>Change your password</h2>
        <label>
          Current Password
          <input
            type="password"
            value={form.currentPassword}
            onChange={(e) => setForm((c) => ({ ...c, currentPassword: e.target.value }))}
          />
        </label>
        <label>
          New Password
          <input
            type="password"
            value={form.newPassword}
            onChange={(e) => setForm((c) => ({ ...c, newPassword: e.target.value }))}
          />
        </label>
        {notice ? <p className="dashboard-message">{notice}</p> : null}
        <button className="primary-button" type="submit">Update Password</button>
      </form>
    </section>
  )
}
