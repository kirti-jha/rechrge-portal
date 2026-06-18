import { useEffect, useState } from 'react'
import { portalApi } from '../lib/portalApi'
import { useAuth } from '../context/AuthContext'

const initialForm = {
  name: '',
  email: '',
  phone: '',
  code: '',
  password: '',
  mobile: '',
  dth: '',
  pan: '',
}

export default function PortalUserCreatePage() {
  const { token } = useAuth()
  const [form, setForm] = useState(initialForm)
  const [message, setMessage] = useState('')
  const [usersData, setUsersData] = useState(null)

  useEffect(() => {
    portalApi.listUsers(token).then(setUsersData).catch((error) => setMessage(error.message))
  }, [token])

  const handleChange = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const result = await portalApi.createUser(
        {
          name: form.name,
          email: form.email,
          phone: form.phone,
          code: form.code,
          password: form.password,
          charges: {
            mobile: Number(form.mobile),
            dth: Number(form.dth),
            pan: Number(form.pan),
          },
        },
        token
      )
      setMessage(result.message)
      setForm(initialForm)
      setUsersData({ users: result.users, summary: result.summary })
    } catch (error) {
      setMessage(error.message)
    }
  }

  return (
    <section className="dashboard-page dashboard-split">
      <form className="dashboard-panel dashboard-form-panel" onSubmit={handleSubmit}>
        <div className="dashboard-panel-head">
          <div>
            <span className="mini-label">Create Retailor</span>
            <h2>Add a downline user</h2>
          </div>
        </div>

        <div className="dashboard-form-grid">
          <label>
            Name
            <input value={form.name} onChange={(e) => handleChange('name', e.target.value)} />
          </label>
          <label>
            Email
            <input value={form.email} onChange={(e) => handleChange('email', e.target.value)} />
          </label>
          <label>
            Phone
            <input value={form.phone} onChange={(e) => handleChange('phone', e.target.value)} />
          </label>
          <label>
            Code
            <input value={form.code} onChange={(e) => handleChange('code', e.target.value)} />
          </label>
          <label>
            Password
            <input type="password" value={form.password} onChange={(e) => handleChange('password', e.target.value)} />
          </label>
        </div>

        <div className="dashboard-form-grid three">
          <label>
            Mobile Charge
            <input value={form.mobile} onChange={(e) => handleChange('mobile', e.target.value)} />
          </label>
          <label>
            DTH Charge
            <input value={form.dth} onChange={(e) => handleChange('dth', e.target.value)} />
          </label>
          <label>
            PAN Charge
            <input value={form.pan} onChange={(e) => handleChange('pan', e.target.value)} />
          </label>
        </div>

        {message ? <p className="dashboard-message">{message}</p> : null}

        <button className="primary-button" type="submit">Create Retailor</button>
      </form>

      <article className="dashboard-panel">
        <span className="mini-label">Visible Network</span>
        <h2>Who can you manage?</h2>
        <p className="dashboard-copy">
          Admins can create any retailor. Retailors can create more retailors beneath themselves.
        </p>
        <div className="simple-list">
          {usersData?.users?.map((user) => (
            <div key={user.id} className="simple-list-item">
              <strong>{user.name}</strong>
              <span>{user.role} · {user.code}</span>
            </div>
          ))}
        </div>
      </article>
    </section>
  )
}
