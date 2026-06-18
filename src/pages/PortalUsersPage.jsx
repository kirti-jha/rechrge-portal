import { useEffect, useState } from 'react'
import { portalApi } from '../lib/portalApi'
import { useAuth } from '../context/AuthContext'

export default function PortalUsersPage() {
  const { token } = useAuth()
  const [data, setData] = useState(null)
  const [editingId, setEditingId] = useState('')
  const [chargeForm, setChargeForm] = useState({ mobile: '', dth: '', pan: '' })
  const [message, setMessage] = useState('')

  const loadUsers = () => {
    portalApi.listUsers(token).then(setData).catch((error) => setMessage(error.message))
  }

  useEffect(() => {
    loadUsers()
  }, [token])

  const startEdit = (user) => {
    setEditingId(user.id)
    setChargeForm({
      mobile: String(user.charges.mobile),
      dth: String(user.charges.dth),
      pan: String(user.charges.pan),
    })
  }

  const saveCharges = async (userId) => {
    try {
      const payload = {
        mobile: Number(chargeForm.mobile),
        dth: Number(chargeForm.dth),
        pan: Number(chargeForm.pan),
      }
      const result = await portalApi.updateCharges(userId, payload, token)
      setMessage(result.message)
      setEditingId('')
      loadUsers()
    } catch (error) {
      setMessage(error.message)
    }
  }

  if (!data) {
    return <section className="dashboard-panel">Loading users...</section>
  }

  return (
    <section className="dashboard-page">
      <article className="dashboard-panel">
        <div className="dashboard-panel-head">
          <div>
            <span className="mini-label">User List</span>
            <h2>Visible users and hierarchy charges</h2>
          </div>
          <span className="downline-chip">{data.summary.totalUsers} users</span>
        </div>

        {message ? <p className="dashboard-message">{message}</p> : null}

        <div className="dashboard-table">
          <div className="dashboard-table-row dashboard-table-head">
            <span>Name</span>
            <span>Role</span>
            <span>Code</span>
            <span>Charges</span>
            <span>Action</span>
          </div>
          {data.users.map((user) => (
            <div key={user.id} className="dashboard-table-row">
              <span>{user.name}</span>
              <span>{user.role}</span>
              <span>{user.code}</span>
              <span>
                {editingId === user.id ? (
                  <div className="charge-edit-grid">
                    <input value={chargeForm.mobile} onChange={(e) => setChargeForm((c) => ({ ...c, mobile: e.target.value }))} />
                    <input value={chargeForm.dth} onChange={(e) => setChargeForm((c) => ({ ...c, dth: e.target.value }))} />
                    <input value={chargeForm.pan} onChange={(e) => setChargeForm((c) => ({ ...c, pan: e.target.value }))} />
                  </div>
                ) : (
                  `M ${user.charges.mobile} | D ${user.charges.dth} | P ${user.charges.pan}`
                )}
              </span>
              <span>
                {editingId === user.id ? (
                  <button className="primary-button small" type="button" onClick={() => saveCharges(user.id)}>
                    Save
                  </button>
                ) : (
                  <button className="secondary-button small" type="button" onClick={() => startEdit(user)}>
                    Edit Rates
                  </button>
                )}
              </span>
            </div>
          ))}
        </div>
      </article>
    </section>
  )
}
