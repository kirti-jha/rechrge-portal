const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || ''

function buildHeaders(token, headers = {}) {
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...headers,
  }
}

async function request(path, options = {}, token) {
  const response = await fetch(`${apiBaseUrl}${path}`, {
    ...options,
    headers: buildHeaders(token, options.headers),
  })

  const data = await response.json().catch(() => ({}))

  if (!response.ok) {
    throw new Error(data.message || 'Request failed.')
  }

  return data
}

export const portalApi = {
  login(payload) {
    return request('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify(payload),
    })
  },
  me(token) {
    return request('/api/auth/me', {}, token)
  },
  summary(token) {
    return request('/api/auth/summary', {}, token)
  },
  changePassword(payload, token) {
    return request(
      '/api/auth/change-password',
      {
        method: 'POST',
        body: JSON.stringify(payload),
      },
      token
    )
  },
  updateTheme(themePreference, token) {
    return request(
      '/api/auth/theme',
      {
        method: 'PATCH',
        body: JSON.stringify({ themePreference }),
      },
      token
    )
  },
  listUsers(token) {
    return request('/api/hierarchy/users', {}, token)
  },
  createUser(payload, token) {
    return request(
      '/api/hierarchy/users',
      {
        method: 'POST',
        body: JSON.stringify(payload),
      },
      token
    )
  },
  updateCharges(userId, charges, token) {
    return request(
      `/api/hierarchy/users/${userId}/charges`,
      {
        method: 'PATCH',
        body: JSON.stringify(charges),
      },
      token
    )
  },
  listTickets(token) {
    return request('/api/support', {}, token)
  },
  createTicket(payload, token) {
    return request(
      '/api/support',
      {
        method: 'POST',
        body: JSON.stringify(payload),
      },
      token
    )
  },
  updateTicket(ticketId, payload, token) {
    return request(
      `/api/support/${ticketId}`,
      {
        method: 'PATCH',
        body: JSON.stringify(payload),
      },
      token
    )
  },
}
