import { useEffect, useState } from 'react'
import { portalApi } from '../lib/portalApi'
import { useAuth } from '../context/AuthContext'

export default function PortalSupportPage() {
  const { token, user } = useAuth()
  const [tickets, setTickets] = useState([])
  const [form, setForm] = useState({ subject: '', message: '' })
  const [notice, setNotice] = useState('')

  const loadTickets = () => {
    portalApi.listTickets(token).then((data) => setTickets(data.tickets)).catch((error) => setNotice(error.message))
  }

  useEffect(() => {
    loadTickets()
  }, [token])

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      await portalApi.createTicket(form, token)
      setForm({ subject: '', message: '' })
      setNotice('Support request created.')
      loadTickets()
    } catch (error) {
      setNotice(error.message)
    }
  }

  const updateStatus = async (ticketId, status) => {
    try {
      await portalApi.updateTicket(ticketId, { status, resolutionNote: '' }, token)
      setNotice('Support status updated.')
      loadTickets()
    } catch (error) {
      setNotice(error.message)
    }
  }

  return (
    <section className="dashboard-page dashboard-split">
      <form className="dashboard-panel dashboard-form-panel" onSubmit={handleSubmit}>
        <span className="mini-label">Support</span>
        <h2>Raise a support request</h2>
        <label>
          Subject
          <input value={form.subject} onChange={(e) => setForm((c) => ({ ...c, subject: e.target.value }))} />
        </label>
        <label>
          Message
          <textarea value={form.message} onChange={(e) => setForm((c) => ({ ...c, message: e.target.value }))} rows="6" />
        </label>
        {notice ? <p className="dashboard-message">{notice}</p> : null}
        <button className="primary-button" type="submit">Submit Ticket</button>
      </form>

      <article className="dashboard-panel">
        <span className="mini-label">Tickets</span>
        <h2>Visible support queue</h2>
        <div className="simple-list">
          {tickets.map((ticket) => (
            <div key={ticket.id} className="simple-list-item ticket-item">
              <strong>{ticket.subject}</strong>
              <span>{ticket.status}</span>
              <p>{ticket.message}</p>
              {user?.role === 'admin' ? (
                <div className="ticket-actions">
                  <button className="secondary-button small" type="button" onClick={() => updateStatus(ticket.id, 'in_progress')}>Mark In Progress</button>
                  <button className="secondary-button small" type="button" onClick={() => updateStatus(ticket.id, 'closed')}>Close</button>
                </div>
              ) : null}
            </div>
          ))}
        </div>
      </article>
    </section>
  )
}
