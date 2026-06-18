import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { portalApi } from '../lib/portalApi'

const AuthContext = createContext(null)
const storageKey = 'lpay-auth'

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => {
    const stored = localStorage.getItem(storageKey)
    return stored ? JSON.parse(stored).token : ''
  })
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem(storageKey)
    return stored ? JSON.parse(stored).user : null
  })
  const [ready, setReady] = useState(false)

  useEffect(() => {
    if (!token) {
      setReady(true)
      return
    }

    let cancelled = false

    portalApi
      .me(token)
      .then((data) => {
        if (!cancelled) {
          setUser(data.user)
          localStorage.setItem(storageKey, JSON.stringify({ token, user: data.user }))
        }
      })
      .catch(() => {
        if (!cancelled) {
          setToken('')
          setUser(null)
          localStorage.removeItem(storageKey)
        }
      })
      .finally(() => {
        if (!cancelled) {
          setReady(true)
        }
      })

    return () => {
      cancelled = true
    }
  }, [token])

  const value = useMemo(
    () => ({
      token,
      user,
      ready,
      isAuthenticated: Boolean(token && user),
      async login(payload) {
        const data = await portalApi.login(payload)
        setToken(data.token)
        setUser(data.user)
        localStorage.setItem(storageKey, JSON.stringify({ token: data.token, user: data.user }))
        return data
      },
      logout() {
        setToken('')
        setUser(null)
        localStorage.removeItem(storageKey)
      },
      updateUser(nextUser) {
        setUser(nextUser)
        localStorage.setItem(storageKey, JSON.stringify({ token, user: nextUser }))
      },
    }),
    [token, user, ready]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
