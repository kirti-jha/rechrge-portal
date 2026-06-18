import {
  createRetailor,
  getStoreMode,
  listHierarchyUsers,
  listUsersForActor,
  updateUserCharges,
} from '../services/hierarchyStore.js'

function buildSummary(network) {
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

export async function getHierarchy(req, res, next) {
  try {
    const network = await listHierarchyUsers()
    res.json({
      mode: getStoreMode(),
      summary: buildSummary(network),
      network,
    })
  } catch (error) {
    next(error)
  }
}

export async function getUsers(req, res, next) {
  try {
    const data = await listUsersForActor(req.auth.user.id)
    res.json({
      mode: getStoreMode(),
      ...data,
    })
  } catch (error) {
    next(error)
  }
}

export async function postRetailor(req, res, next) {
  try {
    const { name, email, phone, code, password, charges } = req.body

    if (!name?.trim() || !email?.trim() || !code?.trim() || !password?.trim()) {
      return res.status(400).json({
        message: 'name, email, code, and password are required.',
      })
    }

    const chargeValues = {
      mobile: Number(charges?.mobile),
      dth: Number(charges?.dth),
      pan: Number(charges?.pan),
    }

    if (Object.values(chargeValues).some((value) => Number.isNaN(value) || value < 0)) {
      return res.status(400).json({ message: 'Charges must be non-negative numbers.' })
    }

    const result = await createRetailor({
      actorId: req.auth.user.id,
      name,
      email,
      phone,
      code,
      password,
      charges: chargeValues,
    })

    const data = await listUsersForActor(req.auth.user.id)

    res.status(201).json({
      message: `${result.retailor.name} created under ${result.creator.name}.`,
      mode: getStoreMode(),
      ...data,
      retailor: result.retailor,
    })
  } catch (error) {
    if (error.message.includes('exists') || error.message.includes('Only') || error.message.includes('Actor')) {
      return res.status(400).json({ message: error.message })
    }
    next(error)
  }
}

export async function patchUserCharges(req, res, next) {
  try {
    const { mobile, dth, pan } = req.body
    const user = await updateUserCharges({
      actorId: req.auth.user.id,
      targetUserId: req.params.userId,
      charges: { mobile, dth, pan },
    })

    res.json({
      message: 'Charges updated successfully.',
      user,
    })
  } catch (error) {
    if (error.message.includes('cannot') || error.message.includes('not found')) {
      return res.status(400).json({ message: error.message })
    }
    next(error)
  }
}
