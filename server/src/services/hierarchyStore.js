import { randomUUID } from 'node:crypto'
import { User } from '../models/User.js'
import { seedNetwork } from '../data/seedNetwork.js'

let activeMode = 'memory'
let memoryUsers = []

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
    code: user.code,
    role: user.role,
    parentId: user.parentId ? String(user.parentId) : null,
    createdById: user.createdById ? String(user.createdById) : null,
    charges: normalizeCharges(user.charges),
    isActive: user.isActive ?? true,
    createdAt: user.createdAt ?? new Date().toISOString(),
  }
}

async function seedMemoryStore() {
  if (memoryUsers.length > 0) {
    return
  }

  const codeToId = new Map()

  seedNetwork.forEach((entry) => {
    const id = randomUUID()
    codeToId.set(entry.code, id)
    memoryUsers.push({
      id,
      name: entry.name,
      code: entry.code,
      role: entry.role,
      parentId: null,
      createdById: null,
      charges: normalizeCharges(entry.charges),
      isActive: true,
      createdAt: new Date().toISOString(),
    })
  })

  memoryUsers = memoryUsers.map((entry) => {
    const source = seedNetwork.find((seed) => seed.code === entry.code)
    if (!source?.parentCode) {
      return entry
    }

    const parentId = codeToId.get(source.parentCode) ?? null
    return {
      ...entry,
      parentId,
      createdById: parentId,
    }
  })
}

async function seedMongoStore() {
  const existingCount = await User.countDocuments()
  if (existingCount > 0) {
    return
  }

  const insertedByCode = new Map()

  for (const entry of seedNetwork) {
    const parentDoc = entry.parentCode ? insertedByCode.get(entry.parentCode) : null
    const created = await User.create({
      name: entry.name,
      code: entry.code,
      role: entry.role,
      parentId: parentDoc?._id ?? null,
      createdById: parentDoc?._id ?? null,
      charges: normalizeCharges(entry.charges),
      isActive: true,
    })
    insertedByCode.set(entry.code, created)
  }
}

export async function initializeHierarchyStore(mode) {
  activeMode = mode

  if (mode === 'mongo') {
    await seedMongoStore()
    return
  }

  await seedMemoryStore()
}

export async function listHierarchyUsers() {
  if (activeMode === 'mongo') {
    const users = await User.find().sort({ createdAt: 1 }).lean()
    return users.map(serializeUser)
  }

  return memoryUsers.map(serializeUser)
}

export async function createRetailor({ creatorId, name, code, charges }) {
  const normalizedCode = code.trim().toUpperCase()
  const normalizedCharges = normalizeCharges(charges)

  if (activeMode === 'mongo') {
    const creator = await User.findById(creatorId)
    if (!creator) {
      throw new Error('Selected creator was not found.')
    }

    const existingCode = await User.findOne({ code: normalizedCode })
    if (existingCode) {
      throw new Error('That retailor code already exists.')
    }

    const created = await User.create({
      name: name.trim(),
      code: normalizedCode,
      role: 'retailor',
      parentId: creator._id,
      createdById: creator._id,
      charges: normalizedCharges,
      isActive: true,
    })

    return { creator: serializeUser(creator), retailor: serializeUser(created) }
  }

  const creator = memoryUsers.find((entry) => entry.id === creatorId)
  if (!creator) {
    throw new Error('Selected creator was not found.')
  }

  const existingCode = memoryUsers.find((entry) => entry.code === normalizedCode)
  if (existingCode) {
    throw new Error('That retailor code already exists.')
  }

  const retailor = {
    id: randomUUID(),
    name: name.trim(),
    code: normalizedCode,
    role: 'retailor',
    parentId: creator.id,
    createdById: creator.id,
    charges: normalizedCharges,
    isActive: true,
    createdAt: new Date().toISOString(),
  }

  memoryUsers.push(retailor)
  return { creator: serializeUser(creator), retailor: serializeUser(retailor) }
}

export function getStoreMode() {
  return activeMode
}
