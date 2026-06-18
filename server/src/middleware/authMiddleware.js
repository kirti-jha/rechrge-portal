import { getUserProfile } from '../services/hierarchyStore.js'
import { verifyAccessToken } from '../utils/tokens.js'

export async function requireAuth(req, res, next) {
  try {
    const header = req.headers.authorization || ''
    const token = header.startsWith('Bearer ') ? header.slice(7) : null

    if (!token) {
      return res.status(401).json({ message: 'Authentication required.' })
    }

    const payload = verifyAccessToken(token)
    const user = await getUserProfile(payload.sub)

    req.auth = {
      user,
      tokenPayload: payload,
    }

    next()
  } catch (error) {
    return res.status(401).json({ message: 'Invalid or expired token.' })
  }
}

export function requireRole(...roles) {
  return (req, res, next) => {
    const role = req.auth?.user?.role

    if (!role || !roles.includes(role)) {
      return res.status(403).json({ message: 'You do not have access to this action.' })
    }

    next()
  }
}
