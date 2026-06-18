import {
  createSupportTicket,
  listSupportTicketsForActor,
  updateSupportTicketStatus,
} from '../services/hierarchyStore.js'

export async function getSupportTickets(req, res, next) {
  try {
    const tickets = await listSupportTicketsForActor(req.auth.user.id)
    res.json({ tickets })
  } catch (error) {
    next(error)
  }
}

export async function postSupportTicket(req, res, next) {
  try {
    const { subject, message } = req.body
    if (!subject?.trim() || !message?.trim()) {
      return res.status(400).json({ message: 'Subject and message are required.' })
    }
    const ticket = await createSupportTicket({
      actorId: req.auth.user.id,
      subject,
      message,
    })
    res.status(201).json({
      message: 'Support request created.',
      ticket,
    })
  } catch (error) {
    next(error)
  }
}

export async function patchSupportTicket(req, res, next) {
  try {
    const { status, resolutionNote } = req.body
    if (!['open', 'in_progress', 'closed'].includes(status)) {
      return res.status(400).json({ message: 'Invalid support status.' })
    }
    const ticket = await updateSupportTicketStatus({
      actorId: req.auth.user.id,
      ticketId: req.params.ticketId,
      status,
      resolutionNote,
    })
    res.json({
      message: 'Support status updated.',
      ticket,
    })
  } catch (error) {
    if (error.message.includes('Only admin') || error.message.includes('not found')) {
      return res.status(400).json({ message: error.message })
    }
    next(error)
  }
}
