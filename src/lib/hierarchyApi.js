const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || ''

async function request(path, options = {}) {
  const response = await fetch(`${apiBaseUrl}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
    ...options,
  })

  const data = await response.json().catch(() => ({}))

  if (!response.ok) {
    throw new Error(data.message || 'Request failed.')
  }

  return data
}

export function fetchHierarchy() {
  return request('/api/hierarchy')
}

export function createRetailor(payload) {
  return request('/api/hierarchy/users', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}
