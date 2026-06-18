import { useState } from 'react'

const TABS = [
  {
    id: 'mobile',
    label: 'Mobile',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/>
      </svg>
    ),
  },
  {
    id: 'dth',
    label: 'DTH',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="2" y="2" width="20" height="14" rx="2" ry="2"/><line x1="12" y1="22" x2="12" y2="16"/><line x1="8" y1="22" x2="16" y2="22"/>
      </svg>
    ),
  },
  {
    id: 'pan',
    label: 'PAN Card',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
        <polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/>
        <line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/>
      </svg>
    ),
  },
]

const initialForms = {
  mobile: { number: '', operator: '', circle: '', amount: '' },
  dth: { operator: '', id: '', amount: '' },
  pan: { type: '', name: '', email: '' },
}

export default function Simulator({ activeSimTab, setActiveSimTab }) {
  const [forms, setForms] = useState(initialForms)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [successMsg, setSuccessMsg] = useState('')
  const [txnRef, setTxnRef] = useState('')

  const updateField = (tab, field, value) =>
    setForms(f => ({ ...f, [tab]: { ...f[tab], [field]: value } }))

  const handleSubmit = () => {
    const { mobile, dth, pan } = forms
    let error = ''
    let msg = ''

    if (activeSimTab === 'mobile') {
      if (!/^\d{10}$/.test(mobile.number)) error = 'Please enter a valid 10-digit mobile number.'
      else if (!mobile.operator) error = 'Please select a mobile operator.'
      else if (!mobile.circle) error = 'Please select your regional circle.'
      else if (!mobile.amount) error = 'Please select a recharge plan.'
      else msg = `Recharge of ₹${mobile.amount} successfully completed for +91 ${mobile.number} (${mobile.operator.toUpperCase()}).`
    } else if (activeSimTab === 'dth') {
      if (!dth.operator) error = 'Please select a DTH operator.'
      else if (!dth.id.trim()) error = 'Please enter your Customer ID.'
      else if (!dth.amount || Number(dth.amount) <= 0) error = 'Please enter a valid recharge amount.'
      else msg = `DTH recharge of ₹${dth.amount} completed for ID ${dth.id} (${dth.operator.toUpperCase()}).`
    } else if (activeSimTab === 'pan') {
      const names = { new: 'New PAN Card Application', correct: 'PAN Correction Form', duplicate: 'Duplicate PAN Card Reprint' }
      if (!pan.type) error = 'Please choose a PAN card application type.'
      else if (pan.name.trim().length < 3) error = "Please enter the applicant's full name (min 3 characters)."
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(pan.email)) error = 'Please enter a valid email address.'
      else msg = `Your ${names[pan.type]} has been registered for ${pan.name}. Check confirmation email at ${pan.email}.`
    }

    if (error) { alert(error); return }

    setSuccessMsg(msg)
    setTxnRef('TXN' + Math.floor(10000000 + Math.random() * 90000000))
    setLoading(true)
    setTimeout(() => { setLoading(false); setSuccess(true) }, 2000)
  }

  const handleReset = () => {
    setSuccess(false)
    setForms(initialForms)
  }

  return (
    <div className="simulator-card spotlight" id="simulator">
      {/* Header */}
      <div className="simulator-header">
        <div className="window-dots">
          <span className="dot-red" /><span className="dot-yellow" /><span className="dot-green" />
        </div>
        <div className="simulator-title">LPay Instant Portal</div>
      </div>

      {/* Tabs */}
      <div className="simulator-tabs">
        {TABS.map(tab => (
          <button
            key={tab.id}
            className={`sim-tab${activeSimTab === tab.id ? ' active' : ''}`}
            onClick={() => setActiveSimTab(tab.id)}
            type="button"
          >
            {tab.icon}{tab.label}
          </button>
        ))}
      </div>

      {/* Body */}
      <div className="simulator-body">
        {/* Mobile */}
        <div className={`sim-content${activeSimTab === 'mobile' ? ' active' : ''}`}>
          <div className="form-group">
            <label htmlFor="mob-number">Mobile Number</label>
            <div className="input-wrapper">
              <span className="input-prefix">+91</span>
              <input type="tel" id="mob-number" placeholder="Enter 10-digit number" maxLength="10"
                value={forms.mobile.number} onChange={e => updateField('mobile', 'number', e.target.value)} />
            </div>
          </div>
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="mob-operator">Operator</label>
              <select id="mob-operator" value={forms.mobile.operator} onChange={e => updateField('mobile', 'operator', e.target.value)}>
                <option value="">Select Operator</option>
                <option value="jio">Jio Prepaid</option>
                <option value="airtel">Airtel Prepaid</option>
                <option value="vi">Vi Prepaid</option>
                <option value="bsnl">BSNL Prepaid</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="mob-circle">Circle</label>
              <select id="mob-circle" value={forms.mobile.circle} onChange={e => updateField('mobile', 'circle', e.target.value)}>
                <option value="">Select Circle</option>
                <option value="del">Delhi NCR</option>
                <option value="mum">Mumbai</option>
                <option value="kar">Karnataka</option>
                <option value="mah">Maharashtra</option>
                <option value="up">Uttar Pradesh</option>
              </select>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="mob-amount">Select Recharge Plan</label>
            <select id="mob-amount" value={forms.mobile.amount} onChange={e => updateField('mobile', 'amount', e.target.value)}>
              <option value="">Choose a Plan</option>
              <option value="239">₹239 - 1.5 GB/Day, Unlimited Calls (28 Days)</option>
              <option value="299">₹299 - 2.0 GB/Day, Unlimited Calls (28 Days)</option>
              <option value="666">₹666 - 1.5 GB/Day, Unlimited Calls (84 Days)</option>
              <option value="749">₹749 - 2.0 GB/Day, Unlimited Calls (90 Days)</option>
              <option value="2999">₹2999 - 2.5 GB/Day, Unlimited Calls (365 Days)</option>
            </select>
          </div>
        </div>

        {/* DTH */}
        <div className={`sim-content${activeSimTab === 'dth' ? ' active' : ''}`}>
          <div className="form-group">
            <label htmlFor="dth-operator">DTH Operator</label>
            <select id="dth-operator" value={forms.dth.operator} onChange={e => updateField('dth', 'operator', e.target.value)}>
              <option value="">Select Operator</option>
              <option value="tataplay">Tata Play</option>
              <option value="dishtv">Dish TV</option>
              <option value="airteldth">Airtel Digital TV</option>
              <option value="sundirect">Sun Direct</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="dth-id">Customer ID / Subscriber Number</label>
            <input type="text" id="dth-id" placeholder="Enter Subscriber ID"
              value={forms.dth.id} onChange={e => updateField('dth', 'id', e.target.value)} />
          </div>
          <div className="form-group">
            <label htmlFor="dth-amount">Recharge Amount (₹)</label>
            <input type="number" id="dth-amount" placeholder="Enter amount e.g. 350"
              value={forms.dth.amount} onChange={e => updateField('dth', 'amount', e.target.value)} />
          </div>
        </div>

        {/* PAN */}
        <div className={`sim-content${activeSimTab === 'pan' ? ' active' : ''}`}>
          <div className="form-group">
            <label htmlFor="pan-type">Application Type</label>
            <select id="pan-type" value={forms.pan.type} onChange={e => updateField('pan', 'type', e.target.value)}>
              <option value="">Choose Service</option>
              <option value="new">New PAN Card (Form 49A)</option>
              <option value="correct">Correction in PAN Details</option>
              <option value="duplicate">Reprint / Lost PAN Card</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="pan-name">Applicant Full Name</label>
            <input type="text" id="pan-name" placeholder="As per Aadhaar Card"
              value={forms.pan.name} onChange={e => updateField('pan', 'name', e.target.value)} />
          </div>
          <div className="form-group">
            <label htmlFor="pan-email">Email Address</label>
            <input type="email" id="pan-email" placeholder="you@example.com"
              value={forms.pan.email} onChange={e => updateField('pan', 'email', e.target.value)} />
          </div>
        </div>

        {/* Submit */}
        <button className="primary-button full-width sim-submit-btn" type="button" onClick={handleSubmit}>
          <span>{activeSimTab === 'pan' ? 'Submit Application' : 'Proceed to Pay'}</span>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
          </svg>
        </button>

        {/* Loader */}
        <div className={`sim-overlay${loading ? ' active' : ''}`} aria-hidden={!loading}>
          <div className="spinner" />
          <p>Securing your connection...</p>
          <span className="sub-loader-text">Verifying details with operator...</span>
        </div>

        {/* Success */}
        <div className={`sim-overlay success${success ? ' active' : ''}`} aria-hidden={!success}>
          <div className="success-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
          </div>
          <h3>Transaction Success!</h3>
          <p>{successMsg}</p>
          <div className="receipt-details">
            <div><span>Reference:</span><strong>{txnRef}</strong></div>
            <div><span>Status:</span><strong className="badge-success">Completed</strong></div>
          </div>
          <button className="secondary-button small" type="button" onClick={handleReset}>New Transaction</button>
        </div>
      </div>
    </div>
  )
}
