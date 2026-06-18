import { NavLink, Outlet } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const links = [
  { to: '/portal', end: true, label: 'Overview' },
  { to: '/portal/users', label: 'User List' },
  { to: '/portal/users/create', label: 'Create User' },
  { to: '/portal/rates', label: 'Rate Setting' },
  { to: '/portal/support', label: 'Support' },
  { to: '/portal/settings', label: 'Settings' },
  { to: '/portal/password', label: 'Password' },
]

export default function DashboardLayout() {
  const { user, logout } = useAuth()
  const themeClass = user?.themePreference === 'light' ? 'theme-light' : 'theme-dark'

  return (
    <div className={`dashboard-shell ${themeClass}`}>
      <aside className="dashboard-sidebar">
        <div className="dashboard-brand">
          <span className="brand-dot" />
          <div>
            <strong>LPay Portal</strong>
            <span>{user?.role}</span>
          </div>
        </div>

        <nav className="dashboard-nav">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              className={({ isActive }) => (isActive ? 'dashboard-nav-link active' : 'dashboard-nav-link')}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <button className="secondary-button dashboard-logout" type="button" onClick={logout}>
          Logout
        </button>
      </aside>

      <div className="dashboard-content">
        <header className="dashboard-topbar">
          <div>
            <p className="dashboard-kicker">Signed in</p>
            <h1>{user?.name}</h1>
          </div>
          <div className="dashboard-top-meta">
            <span>{user?.code}</span>
            <strong>{user?.email}</strong>
          </div>
        </header>

        <Outlet />
      </div>
    </div>
  )
}
