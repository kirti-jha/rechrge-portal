import {
  createRetailor,
  getStoreMode,
  listHierarchyUsers,
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

export async function postRetailor(req, res, next) {
  try {
    const { creatorId, name, code, charges } = req.body

    if (!creatorId || !name?.trim() || !code?.trim()) {
      return res.status(400).json({
        message: 'creatorId, name, and code are required.',
      })
    }

    const chargeValues = {
      mobile: Number(charges?.mobile),
      dth: Number(charges?.dth),
      pan: Number(charges?.pan),
    }

    if (Object.values(chargeValues).some((value) => Number.isNaN(value) || value < 0)) {
      return res.status(400).json({
        message: 'Charges must be non-negative numbers.',
      })
    }

    const result = await createRetailor({
      creatorId,
      name,
      code,
      charges: chargeValues,
    })

    const network = await listHierarchyUsers()

    res.status(201).json({
      message: `${result.retailor.name} created under ${result.creator.name}.`,
      mode: getStoreMode(),
      summary: buildSummary(network),
      network,
      retailor: result.retailor,
    })
  } catch (error) {
    if (error.message.includes('exists') || error.message.includes('not found')) {
      return res.status(400).json({ message: error.message })
    }

    next(error)
  }
}
