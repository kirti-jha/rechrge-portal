import jwt from 'jsonwebtoken'

const jwtSecret = process.env.JWT_SECRET || 'lpay-dev-secret'

export function signAccessToken(user) {
  return jwt.sign(
    {
      sub: user.id,
      role: user.role,
      code: user.code,
    },
    jwtSecret,
    { expiresIn: '7d' }
  )
}

export function verifyAccessToken(token) {
  return jwt.verify(token, jwtSecret)
}
