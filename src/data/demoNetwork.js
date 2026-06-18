export const demoNetwork = [
  {
    id: 'admin-1',
    name: 'Main Admin',
    code: 'ADM-001',
    role: 'admin',
    parentId: null,
    charges: { mobile: 0, dth: 0, pan: 0 },
  },
  {
    id: 'ret-1',
    name: 'Aarav Telecom',
    code: 'RTL-101',
    role: 'retailor',
    parentId: 'admin-1',
    charges: { mobile: 2.5, dth: 4, pan: 12 },
  },
  {
    id: 'ret-2',
    name: 'Saanvi Digital Point',
    code: 'RTL-102',
    role: 'retailor',
    parentId: 'admin-1',
    charges: { mobile: 3, dth: 5, pan: 10 },
  },
  {
    id: 'ret-3',
    name: 'Metro Recharge Hub',
    code: 'RTL-201',
    role: 'retailor',
    parentId: 'ret-1',
    charges: { mobile: 1.75, dth: 3, pan: 8 },
  },
]

export function getDemoSummary(network = demoNetwork) {
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
