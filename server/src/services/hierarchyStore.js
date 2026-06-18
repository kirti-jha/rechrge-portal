import { randomUUID } from 'node:crypto'
import bcrypt from 'bcryptjs'
import { User } from '../models/User.js'
import { SupportTicket } from '../models/SupportTicket.js'
import { seedSupportTickets, seedUsers } from '../data/seedNetwork.js'

let activeMode = 'memory'
let memoryUsers = []
let memoryTickets = []

function normalizeCharges(charges = {}) {
  return {
    mobile: Number(charges.mobile ?? 0),
    dth: Number(charges.dth ?? 0),
    pan: Number(charges.pan ?? 0),
  }
}

function serializeUser(user) {
  return {
    id: String(user._id ?? user.id),
    name: user.name,
    email: user.email,
    code: user.code,
    phone: user.phone ?? '',
    role: user.role,
    parentId: user.parentId ? String(user.parentId) : null,
    createdById: user.createdById ? String(user.createdById) : null,
    charges: normalizeCharges(user.charges),
    themePreference: user.themePreference ?? 'dark',
    isActive: user.isActive ?? true,
    lastLoginAt: user.lastLoginAt ?? null,
    createdAt: user.createdAt ?? new Date().toISOString(),
  }
}

function serializeTicket(ticket) {
  return {
    id: String(ticket._id ?? ticket.id),
    subject: ticket.subject,
    message: ticket.message,
    status: ticket.status,
    createdById: String(ticket.createdById),
    resolutionNote: ticket.resolutionNote ?? '',
    createdAt: ticket.createdAt ?? new Date().toISOString(),
  }
}

function buildDescendantIds(network, rootId) {
  const descendants = new Set([rootId])
  let expanded = true

  while (expanded) {
    expanded = false
    for (const user of network) {
      if (user.parentId && descendants.has(String(user.parentId)) && !descendants.has(String(user.id ?? user._id))) {
        descendants.add(String(user.id ?? user._id))
        expanded = true
      }
    }
  }

  return descendants
}

function getVisibleUsersForActor(network, actor) {
  if (actor.role === 'admin') {
    return network
  }

  const allowedIds = buildDescendantIds(network, String(actor.id ?? actor._id))
  return network.filter((user) => allowedIds.has(String(user.id ?? user._id)))
}

function getSummary(network) {
  const rootAdmin = network.find((member) => member.role === 'admin')
  const totalRetailors = network.filter((member) => member.role === 'retailor').length
  const adminDirectRetailors = network.filter((member) => member.parentId === rootAdmin?.id).length
  const retailerCreatedRetailors = network.filter((member) => {
    const parent = network.find((entry) => entry.id === member.parentId)
    return member.role === 'retailor' && parent?.role === 'retailor'
  }).length

  return {
    totalUsers: network.length,
    totalRetailors,
    adminDirectRetailors,
    retailerCreatedRetailors,
  }
}

async function seedMemoryStore() {
  if (memoryUsers.length > 0) {
    return
  }

  const codeToId = new Map()

  for (const entry of seedUsers) {
    const id = randomUUID()
    codeToId.set(entry.code, id)
    memoryUsers.push({
      id,
      name: entry.name,
      email: entry.email,
      code: entry.code,
      phone: entry.phone,
      role: entry.role,
      passwordHash: await bcrypt.hash(entry.password, 10),
      parentId: null,
      createdById: null,
      charges: normalizeCharges(entry.charges),
      themePreference: entry.themePreference,
      isActive: true,
      lastLoginAt: null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    })
  }

  memoryUsers = memoryUsers.map((entry) => {
    const source = seedUsers.find((seed) => seed.code === entry.code)
    if (!source?.parentCode) return entry
    const parentId = codeToId.get(source.parentCode) ?? null
    return {
      ...entry,
      parentId,
      createdById: parentId,
    }
  })

  memoryTickets = seedSupportTickets.map((entry) => {
    const createdById = codeToId.get(entry.createdByCode)
    return {
      id: randomUUID(),
      subject: entry.subject,
      message: entry.message,
      status: entry.status,
      createdById,
      resolutionNote: '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
  })
}

async function seedMongoStore() {
  const userCount = await User.countDocuments()
  if (userCount === 0) {
    const insertedByCode = new Map()

    for (const entry of seedUsers) {
      const parentDoc = entry.parentCode ? insertedByCode.get(entry.parentCode) : null
      const created = await User.create({
        name: entry.name,
        email: entry.email,
        code: entry.code,
        phone: entry.phone,
        role: entry.role,
        passwordHash: await bcrypt.hash(entry.password, 10),
        parentId: parentDoc?._id ?? null,
        createdById: parentDoc?._id ?? null,
        charges: normalizeCharges(entry.charges),
        themePreference: entry.themePreference,
        isActive: true,
      })
      insertedByCode.set(entry.code, created)
    }
  }

  const ticketCount = await SupportTicket.countDocuments()
  if (ticketCount === 0) {
    for (const entry of seedSupportTickets) {
      const user = await User.findOne({ code: entry.createdByCode })
      if (!user) continue
      await SupportTicket.create({
        subject: entry.subject,
        message: entry.message,
        status: entry.status,
        createdById: user._id,
      })
    }
  }
}

async function getAllUsersRaw() {
  if (activeMode === 'mongo') {
    return User.find().sort({ createdAt: 1 }).lean()
  }
  return memoryUsers
}

async function getAllTicketsRaw() {
  if (activeMode === 'mongo') {
    return SupportTicket.find().sort({ createdAt: -1 }).lean()
  }
  return memoryTickets
}

async function findUserByIdRaw(userId) {
  if (activeMode === 'mongo') {
    return User.findById(userId)
  }
  return memoryUsers.find((entry) => entry.id === userId) ?? null
}

async function findUserByLoginRaw(login) {
  const normalized = login.trim().toLowerCase()
  if (activeMode === 'mongo') {
    return User.findOne({
      $or: [{ email: normalized }, { code: normalized.toUpperCase() }],
    })
  }
  return (
    memoryUsers.find(
      (entry) => entry.email.toLowerCase() === normalized || entry.code.toLowerCase() === normalized
    ) ?? null
  )
}

export async function initializeHierarchyStore(mode) {
  activeMode = mode
  if (mode === 'mongo') {
    await seedMongoStore()
    return
  }
  await seedMemoryStore()
}

export function getStoreMode() {
  return activeMode
}

export async function listHierarchyUsers() {
  const users = await getAllUsersRaw()
  return users.map(serializeUser)
}

export async function authenticateUser({ login, password }) {
  const user = await findUserByLoginRaw(login)
  if (!user || !user.isActive) {
    throw new Error('Invalid login or password.')
  }

  const isValid = await bcrypt.compare(password, user.passwordHash)
  if (!isValid) {
    throw new Error('Invalid login or password.')
  }

  if (activeMode === 'mongo') {
    user.lastLoginAt = new Date()
    await user.save()
  } else {
    memoryUsers = memoryUsers.map((entry) =>
      entry.id === user.id ? { ...entry, lastLoginAt: new Date().toISOString() } : entry
    )
  }

  const updatedUser = await findUserByIdRaw(String(user._id ?? user.id))
  return serializeUser(updatedUser)
}

export async function getUserProfile(userId) {
  const user = await findUserByIdRaw(userId)
  if (!user) {
    throw new Error('User not found.')
  }
  return serializeUser(user)
}

export async function listUsersForActor(actorId) {
  const actor = await findUserByIdRaw(actorId)
  if (!actor) throw new Error('Actor not found.')
  const network = (await getAllUsersRaw()).map(serializeUser)
  const visibleUsers = getVisibleUsersForActor(network, serializeUser(actor))
  return {
    users: visibleUsers,
    summary: getSummary(visibleUsers),
  }
}

export async function createRetailor({ actorId, name, email, phone, code, charges, password }) {
  const actor = await findUserByIdRaw(actorId)
  if (!actor) throw new Error('Actor not found.')
  if (!['admin', 'retailor'].includes(actor.role)) {
    throw new Error('Only admin or retailor can create a retailor.')
  }

  const normalizedCode = code.trim().toUpperCase()
  const normalizedEmail = email.trim().toLowerCase()
  const normalizedCharges = normalizeCharges(charges)

  const allUsers = await getAllUsersRaw()
  const codeExists = allUsers.find((entry) => entry.code === normalizedCode)
  const emailExists = allUsers.find((entry) => entry.email === normalizedEmail)
  if (codeExists) throw new Error('That retailor code already exists.')
  if (emailExists) throw new Error('That email already exists.')

  if (activeMode === 'mongo') {
    const created = await User.create({
      name: name.trim(),
      email: normalizedEmail,
      phone: phone?.trim() ?? '',
      code: normalizedCode,
      role: 'retailor',
      passwordHash: await bcrypt.hash(password, 10),
      parentId: actor._id,
      createdById: actor._id,
      charges: normalizedCharges,
      themePreference: 'dark',
      isActive: true,
    })

    return {
      creator: serializeUser(actor),
      retailor: serializeUser(created),
    }
  }

  const retailor = {
    id: randomUUID(),
    name: name.trim(),
    email: normalizedEmail,
    phone: phone?.trim() ?? '',
    code: normalizedCode,
    role: 'retailor',
    passwordHash: await bcrypt.hash(password, 10),
    parentId: actor.id,
    createdById: actor.id,
    charges: normalizedCharges,
    themePreference: 'dark',
    isActive: true,
    lastLoginAt: null,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }

  memoryUsers.push(retailor)
  return {
    creator: serializeUser(actor),
    retailor: serializeUser(retailor),
  }
}

export async function updateUserCharges({ actorId, targetUserId, charges }) {
  const actorRecord = await findUserByIdRaw(actorId)
  if (!actorRecord) throw new Error('Actor not found.')
  const actor = serializeUser(actorRecord)
  const network = (await getAllUsersRaw()).map(serializeUser)
  const visibleUsers = getVisibleUsersForActor(network, actor)
  const allowed = visibleUsers.find((entry) => entry.id === targetUserId)
  if (!allowed) throw new Error('You cannot update this user.')

  const normalizedCharges = normalizeCharges(charges)

  if (activeMode === 'mongo') {
    const user = await User.findById(targetUserId)
    user.charges = normalizedCharges
    await user.save()
    return serializeUser(user)
  }

  memoryUsers = memoryUsers.map((entry) =>
    entry.id === targetUserId ? { ...entry, charges: normalizedCharges, updatedAt: new Date().toISOString() } : entry
  )
  return serializeUser(memoryUsers.find((entry) => entry.id === targetUserId))
}

export async function updateUserTheme({ userId, themePreference }) {
  if (activeMode === 'mongo') {
    const user = await User.findById(userId)
    if (!user) throw new Error('User not found.')
    user.themePreference = themePreference
    await user.save()
    return serializeUser(user)
  }

  memoryUsers = memoryUsers.map((entry) =>
    entry.id === userId ? { ...entry, themePreference, updatedAt: new Date().toISOString() } : entry
  )
  return serializeUser(memoryUsers.find((entry) => entry.id === userId))
}

export async function changePassword({ userId, currentPassword, newPassword }) {
  const user = await findUserByIdRaw(userId)
  if (!user) throw new Error('User not found.')

  const matches = await bcrypt.compare(currentPassword, user.passwordHash)
  if (!matches) throw new Error('Current password is incorrect.')

  const passwordHash = await bcrypt.hash(newPassword, 10)

  if (activeMode === 'mongo') {
    user.passwordHash = passwordHash
    await user.save()
    return
  }

  memoryUsers = memoryUsers.map((entry) =>
    entry.id === userId ? { ...entry, passwordHash, updatedAt: new Date().toISOString() } : entry
  )
}

export async function listSupportTicketsForActor(actorId) {
  const actorRecord = await findUserByIdRaw(actorId)
  if (!actorRecord) throw new Error('Actor not found.')
  const actor = serializeUser(actorRecord)
  const users = (await getAllUsersRaw()).map(serializeUser)
  const visibleUsers = getVisibleUsersForActor(users, actor)
  const visibleIds = new Set(visibleUsers.map((entry) => entry.id))
  const tickets = (await getAllTicketsRaw()).map(serializeTicket)

  return actor.role === 'admin'
    ? tickets
    : tickets.filter((ticket) => visibleIds.has(ticket.createdById))
}

export async function createSupportTicket({ actorId, subject, message }) {
  const actor = await findUserByIdRaw(actorId)
  if (!actor) throw new Error('Actor not found.')

  if (activeMode === 'mongo') {
    const ticket = await SupportTicket.create({
      subject: subject.trim(),
      message: message.trim(),
      createdById: actor._id,
      status: 'open',
    })
    return serializeTicket(ticket)
  }

  const ticket = {
    id: randomUUID(),
    subject: subject.trim(),
    message: message.trim(),
    status: 'open',
    createdById: actor.id,
    resolutionNote: '',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
  memoryTickets.unshift(ticket)
  return serializeTicket(ticket)
}

export async function updateSupportTicketStatus({ actorId, ticketId, status, resolutionNote }) {
  const actor = await findUserByIdRaw(actorId)
  if (!actor || actor.role !== 'admin') {
    throw new Error('Only admin can update ticket status.')
  }

  if (activeMode === 'mongo') {
    const ticket = await SupportTicket.findById(ticketId)
    if (!ticket) throw new Error('Ticket not found.')
    ticket.status = status
    ticket.resolutionNote = resolutionNote?.trim() ?? ''
    await ticket.save()
    return serializeTicket(ticket)
  }

  const existing = memoryTickets.find((entry) => entry.id === ticketId)
  if (!existing) throw new Error('Ticket not found.')
  memoryTickets = memoryTickets.map((entry) =>
    entry.id === ticketId
      ? { ...entry, status, resolutionNote: resolutionNote?.trim() ?? '', updatedAt: new Date().toISOString() }
      : entry
  )
  return serializeTicket(memoryTickets.find((entry) => entry.id === ticketId))
}

export async function getDashboardSummary(actorId) {
  const actorRecord = await findUserByIdRaw(actorId)
  if (!actorRecord) throw new Error('Actor not found.')
  const actor = serializeUser(actorRecord)
  const allUsers = (await getAllUsersRaw()).map(serializeUser)
  const visibleUsers = getVisibleUsersForActor(allUsers, actor)
  const tickets = await listSupportTicketsForActor(actorId)

  return {
    user: actor,
    summary: getSummary(visibleUsers),
    support: {
      totalTickets: tickets.length,
      openTickets: tickets.filter((ticket) => ticket.status === 'open').length,
      inProgressTickets: tickets.filter((ticket) => ticket.status === 'in_progress').length,
    },
  }
}
