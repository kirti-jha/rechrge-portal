import { useState } from 'react'
import Reveal from './Reveal'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', tel: '' })
  const [submitted, setSubmitted] = useState(false)

  const update = (field, value) => setForm((current) => ({ ...current, [field]: value }))

  const handleSubmit = () => {
    if (!form.name.trim() || !form.email.trim() || !form.tel.trim()) {
      alert('Please fill in all contact fields.')
      return
    }

    alert(`Thank you, ${form.name}! Your callback request is registered. A representative will contact you at ${form.tel} shortly.`)
    setForm({ name: '', email: '', tel: '' })
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 3000)
  }

  return (
    <section className="section contact-wrap" id="contact">
      <Reveal className="cta-band">
        <div className="cta-copy">
          <span className="eyebrow-badge">Connect With LPay</span>
          <h2>Need a partner account, API access, or retailor onboarding help?</h2>
          <p>
            Share your business details and we will help you launch a smoother recharge and hierarchy workflow.
            This is ideal for admins building a new network or retailors expanding their own downlines.
          </p>
          <div className="cta-support-badge">
            <div className="support-avatars">
              <span className="avatar-dot" />
              <span className="online-indicator" />
            </div>
            <div className="support-text">
              <strong>Partner desk online</strong>
              <span>Average response time: 12 minutes</span>
            </div>
          </div>
        </div>

        <form className="contact-card" onSubmit={(event) => event.preventDefault()}>
          <p className="contact-card-kicker">Request a callback</p>
          <label htmlFor="contact-name">
            Full Name
            <input
              type="text"
              id="contact-name"
              placeholder="Your name"
              value={form.name}
              onChange={(event) => update('name', event.target.value)}
            />
          </label>
          <label htmlFor="contact-email">
            Business Email
            <input
              type="email"
              id="contact-email"
              placeholder="you@company.com"
              value={form.email}
              onChange={(event) => update('email', event.target.value)}
            />
          </label>
          <label htmlFor="contact-tel">
            Phone Number
            <input
              type="tel"
              id="contact-tel"
              placeholder="+91 98765 43210"
              value={form.tel}
              onChange={(event) => update('tel', event.target.value)}
            />
          </label>
          <button
            className="primary-button"
            type="button"
            id="contact-submit-btn"
            onClick={handleSubmit}
          >
            {submitted ? 'Request Sent' : 'Request Callback'}
          </button>
        </form>
      </Reveal>
    </section>
  )
}
