import { useState } from 'react'
import { portalApi } from '../lib/portalApi'
import { useAuth } from '../context/AuthContext'

export default function PortalSettingsPage() {
  const { token, user, updateUser } = useAuth()
  const [notice, setNotice] = useState('')

  const changeTheme = async (themePreference) => {
    try {
      const data = await portalApi.updateTheme(themePreference, token)
      updateUser(data.user)
      setNotice(data.message)
    } catch (error) {
      setNotice(error.message)
    }
  }

  return (
    <section className="dashboard-page">
      <article className="dashboard-panel">
        <span className="mini-label">Settings</span>
        <h2>Theme and account preferences</h2>
        <p className="dashboard-copy">
          The current backend stores theme preference per user, so admin and retailor dashboards can keep different light or dark preferences.
        </p>
        <div className="settings-theme-actions">
          <button
            className={user?.themePreference === 'dark' ? 'primary-button' : 'secondary-button'}
            type="button"
            onClick={() => changeTheme('dark')}
          >
            Dark Theme
          </button>
          <button
            className={user?.themePreference === 'light' ? 'primary-button' : 'secondary-button'}
            type="button"
            onClick={() => changeTheme('light')}
          >
            Light Theme
          </button>
        </div>
        {notice ? <p className="dashboard-message">{notice}</p> : null}
      </article>
    </section>
  )
}
