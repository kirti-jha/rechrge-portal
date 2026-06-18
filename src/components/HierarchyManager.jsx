import { useEffect, useState } from 'react'
import Reveal from './Reveal'
import { createRetailor, fetchHierarchy } from '../lib/hierarchyApi'
import { demoNetwork, getDemoSummary } from '../data/demoNetwork'

const emptyForm = {
  creatorId: 'admin-1',
  name: '',
  code: '',
  mobileCharge: '',
  dthCharge: '',
  panCharge: '',
}

function getChildren(network, parentId) {
  return network.filter((member) => member.parentId === parentId)
}

function getLevel(network, member) {
  let level = 0
  let currentParentId = member.parentId

  while (currentParentId) {
    const parent = network.find((entry) => entry.id === currentParentId)
    if (!parent) break
    level += 1
    currentParentId = parent.parentId
  }

  return level
}

function ChargePill({ label, value }) {
  return (
    <span className="charge-pill">
      <strong>{label}</strong>
      <span>Rs {value.toFixed(2)}</span>
    </span>
  )
}

function TreeNode({ member, network }) {
  const children = getChildren(network, member.id)
  const level = getLevel(network, member)

  return (
    <li className="tree-node">
      <article className="tree-card">
        <div className="tree-card-top">
          <div>
            <div className="tree-title-row">
              <h3>{member.name}</h3>
              <span className={`role-badge ${member.role}`}>{member.role}</span>
            </div>
            <p>{member.code} · Level {level}</p>
          </div>
          <span className="downline-chip">{children.length} downline</span>
        </div>

        <div className="tree-charges">
          <ChargePill label="Mobile" value={member.charges.mobile} />
          <ChargePill label="DTH" value={member.charges.dth} />
          <ChargePill label="PAN" value={member.charges.pan} />
        </div>
      </article>

      {children.length > 0 ? (
        <ul className="tree-children">
          {children.map((child) => (
            <TreeNode key={child.id} member={child} network={network} />
          ))}
        </ul>
      ) : null}
    </li>
  )
}

function fallbackCreateRetailor(network, payload) {
  const creator = network.find((member) => member.id === payload.creatorId)

  if (!creator) {
    throw new Error('Selected creator was not found.')
  }

  if (network.some((member) => member.code.toLowerCase() === payload.code.trim().toLowerCase())) {
    throw new Error('That retailor code already exists.')
  }

  const nextRetailor = {
    id: `ret-${Date.now()}`,
    name: payload.name.trim(),
    code: payload.code.trim().toUpperCase(),
    role: 'retailor',
    parentId: creator.id,
    charges: payload.charges,
  }

  const nextNetwork = [...network, nextRetailor]
  return {
    message: `${nextRetailor.name} created under ${creator.name}.`,
    mode: 'demo',
    network: nextNetwork,
    summary: getDemoSummary(nextNetwork),
  }
}

export default function HierarchyManager() {
  const [network, setNetwork] = useState(demoNetwork)
  const [summary, setSummary] = useState(getDemoSummary(demoNetwork))
  const [form, setForm] = useState(emptyForm)
  const [notice, setNotice] = useState('Admin can create retailors, and every retailor can create more retailors with separate downline charges.')
  const [mode, setMode] = useState('demo')
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    let cancelled = false

    async function loadHierarchy() {
      try {
        const data = await fetchHierarchy()
        if (cancelled) return

        setNetwork(data.network)
        setSummary(data.summary)
        setMode(data.mode)
        setForm((current) => ({
          ...current,
          creatorId: data.network.find((member) => member.role === 'admin')?.id || current.creatorId,
        }))
        setNotice(
          data.mode === 'mongo'
            ? 'Connected to Mongo-backed hierarchy data.'
            : 'Server is running in memory mode. Add MONGO_URI to use MongoDB persistence.'
        )
      } catch (error) {
        if (cancelled) return

        setMode('demo')
        setNotice('Backend not reachable yet, so the hierarchy is running in frontend demo mode.')
      } finally {
        if (!cancelled) {
          setLoading(false)
        }
      }
    }

    loadHierarchy()

    return () => {
      cancelled = true
    }
  }, [])

  const rootAdmin = network.find((member) => member.role === 'admin')

  const handleChange = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (!form.name.trim()) {
      setNotice('Retailor name is required before creating a downline.')
      return
    }

    if (!form.code.trim()) {
      setNotice('Please add a unique retailor code or shop code.')
      return
    }

    const charges = {
      mobile: Number(form.mobileCharge),
      dth: Number(form.dthCharge),
      pan: Number(form.panCharge),
    }

    if (Object.values(charges).some((value) => Number.isNaN(value) || value < 0)) {
      setNotice('Charges must be valid non-negative numbers for every service.')
      return
    }

    setSubmitting(true)

    try {
      const data = await createRetailor({
        creatorId: form.creatorId,
        name: form.name,
        code: form.code,
        charges,
      })

      setNetwork(data.network)
      setSummary(data.summary)
      setMode(data.mode)
      setNotice(data.message)
    } catch (error) {
      try {
        const fallback = fallbackCreateRetailor(network, {
          creatorId: form.creatorId,
          name: form.name,
          code: form.code,
          charges,
        })

        setNetwork(fallback.network)
        setSummary(fallback.summary)
        setMode('demo')
        setNotice(`${fallback.message} Saved in demo mode because the API is not available.`)
      } catch (fallbackError) {
        setNotice(fallbackError.message || error.message)
        setSubmitting(false)
        return
      }
    }

    setForm((current) => ({ ...emptyForm, creatorId: current.creatorId }))
    setSubmitting(false)
  }

  return (
    <section className="section hierarchy" id="hierarchy">
      <Reveal>
        <div className="section-heading">
          <span className="eyebrow-badge">Hierarchy Control</span>
          <h2>MERN-ready network management for admin and retailors.</h2>
          <p>
            This screen is now prepared to work with an Express API and MongoDB-backed user model.
            Admins create retailors, retailors build their own downlines, and every direct downline gets separate service charges.
          </p>
        </div>
      </Reveal>

      <div className="hierarchy-stats">
        <Reveal>
          <article className="hierarchy-stat-card">
            <strong>{summary.totalUsers}</strong>
            <span>Total network users</span>
          </article>
        </Reveal>
        <Reveal>
          <article className="hierarchy-stat-card">
            <strong>{summary.adminDirectRetailors}</strong>
            <span>Retailors directly under admin</span>
          </article>
        </Reveal>
        <Reveal>
          <article className="hierarchy-stat-card">
            <strong>{summary.retailerCreatedRetailors}</strong>
            <span>Retailors created by retailors</span>
          </article>
        </Reveal>
        <Reveal>
          <article className="hierarchy-stat-card">
            <strong>{summary.totalRetailors}</strong>
            <span>Total retailors with charge profiles</span>
          </article>
        </Reveal>
      </div>

      <div className="hierarchy-layout">
        <Reveal>
          <form className="hierarchy-form-card" onSubmit={handleSubmit}>
            <div className="hierarchy-card-head">
              <div>
                <span className="mini-label">Create Downline</span>
                <h3>Add a new retailor</h3>
              </div>
              <span className={`role-badge ${mode === 'mongo' ? 'admin' : 'retailor'}`}>
                {loading ? 'loading' : mode}
              </span>
            </div>

            <div className="form-group">
              <label htmlFor="creatorId">Created By</label>
              <select
                id="creatorId"
                value={form.creatorId}
                onChange={(event) => handleChange('creatorId', event.target.value)}
                disabled={loading}
              >
                {network.map((member) => (
                  <option key={member.id} value={member.id}>
                    {member.name} ({member.role})
                  </option>
                ))}
              </select>
            </div>

            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="retailorName">Retailor Name</label>
                <input
                  id="retailorName"
                  type="text"
                  placeholder="Enter retailor name"
                  value={form.name}
                  onChange={(event) => handleChange('name', event.target.value)}
                  disabled={loading}
                />
              </div>
              <div className="form-group">
                <label htmlFor="retailorCode">Retailor Code</label>
                <input
                  id="retailorCode"
                  type="text"
                  placeholder="RTL-301"
                  value={form.code}
                  onChange={(event) => handleChange('code', event.target.value)}
                  disabled={loading}
                />
              </div>
            </div>

            <div className="hierarchy-charge-grid">
              <div className="form-group">
                <label htmlFor="mobileCharge">Mobile Charge</label>
                <input
                  id="mobileCharge"
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="2.50"
                  value={form.mobileCharge}
                  onChange={(event) => handleChange('mobileCharge', event.target.value)}
                  disabled={loading}
                />
              </div>
              <div className="form-group">
                <label htmlFor="dthCharge">DTH Charge</label>
                <input
                  id="dthCharge"
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="4.00"
                  value={form.dthCharge}
                  onChange={(event) => handleChange('dthCharge', event.target.value)}
                  disabled={loading}
                />
              </div>
              <div className="form-group">
                <label htmlFor="panCharge">PAN Charge</label>
                <input
                  id="panCharge"
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="10.00"
                  value={form.panCharge}
                  onChange={(event) => handleChange('panCharge', event.target.value)}
                  disabled={loading}
                />
              </div>
            </div>

            <div className="hierarchy-note">
              <strong>API behavior:</strong>
              <span>
                When the Express server is available, this form posts to `/api/hierarchy/users`.
                If the backend is offline, the same action still works in local demo mode for frontend testing.
              </span>
            </div>

            <button className="primary-button full-width" type="submit" disabled={loading || submitting}>
              {submitting ? 'Saving Retailor...' : 'Create Retailor Downline'}
            </button>

            <p className="hierarchy-notice">{notice}</p>
          </form>
        </Reveal>

        <Reveal>
          <div className="hierarchy-tree-card">
            <div className="hierarchy-card-head">
              <div>
                <span className="mini-label">Live Structure</span>
                <h3>Admin and retailor tree</h3>
              </div>
              <span className="downline-chip">
                {mode === 'mongo' ? 'Mongo persistence' : mode === 'memory' ? 'Server memory mode' : 'Frontend demo mode'}
              </span>
            </div>

            {rootAdmin ? (
              <ul className="tree-root">
                <TreeNode member={rootAdmin} network={network} />
              </ul>
            ) : (
              <p className="hierarchy-empty">No admin found in the hierarchy.</p>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
