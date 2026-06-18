import {
  authenticateUser,
  changePassword,
  getDashboardSummary,
  getUserProfile,
  updateUserTheme,
} from '../services/hierarchyStore.js'
import { signAccessToken } from '../utils/tokens.js'

export async function login(req, res, next) {
  try {
    const { login: loginInput, password } = req.body

    if (!loginInput?.trim() || !password?.trim()) {
      return res.status(400).json({ message: 'Login and password are required.' })
    }

    const user = await authenticateUser({
      login: loginInput,
      password,
    })

    const token = signAccessToken(user)

    res.json({
      token,
      user,
      message: `Logged in as ${user.role}.`,
    })
  } catch (error) {
    if (error.message.includes('Invalid')) {
      return res.status(401).json({ message: error.message })
    }
    next(error)
  }
}

export async function me(req, res, next) {
  try {
    const user = await getUserProfile(req.auth.user.id)
    res.json({ user })
  } catch (error) {
    next(error)
  }
}

export async function dashboardSummary(req, res, next) {
  try {
    const data = await getDashboardSummary(req.auth.user.id)
    res.json(data)
  } catch (error) {
    next(error)
  }
}

export async function updateTheme(req, res, next) {
  try {
    const { themePreference } = req.body
    if (!['light', 'dark'].includes(themePreference)) {
      return res.status(400).json({ message: 'Theme must be light or dark.' })
    }
    const user = await updateUserTheme({
      userId: req.auth.user.id,
      themePreference,
    })
    res.json({
      message: 'Theme preference updated.',
      user,
    })
  } catch (error) {
    next(error)
  }
}

export async function updatePassword(req, res, next) {
  try {
    const { currentPassword, newPassword } = req.body
    if (!currentPassword?.trim() || !newPassword?.trim()) {
      return res.status(400).json({ message: 'Current and new password are required.' })
    }
    if (newPassword.trim().length < 6) {
      return res.status(400).json({ message: 'New password must be at least 6 characters.' })
    }

    await changePassword({
      userId: req.auth.user.id,
      currentPassword,
      newPassword,
    })

    res.json({ message: 'Password updated successfully.' })
  } catch (error) {
    if (error.message.includes('Current password')) {
      return res.status(400).json({ message: error.message })
    }
    next(error)
  }
}
