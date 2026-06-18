export const seedNetwork = [
  {
    name: 'Main Admin',
    code: 'ADM-001',
    role: 'admin',
    parentId: null,
    charges: { mobile: 0, dth: 0, pan: 0 },
  },
  {
    name: 'Aarav Telecom',
    code: 'RTL-101',
    role: 'retailor',
    parentCode: 'ADM-001',
    charges: { mobile: 2.5, dth: 4, pan: 12 },
  },
  {
    name: 'Saanvi Digital Point',
    code: 'RTL-102',
    role: 'retailor',
    parentCode: 'ADM-001',
    charges: { mobile: 3, dth: 5, pan: 10 },
  },
  {
    name: 'Metro Recharge Hub',
    code: 'RTL-201',
    role: 'retailor',
    parentCode: 'RTL-101',
    charges: { mobile: 1.75, dth: 3, pan: 8 },
  },
]
