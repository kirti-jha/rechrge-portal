import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'

const navItems = [
  { to: '/services', label: 'Services' },
  { to: '/hierarchy', label: 'Hierarchy' },
  { to: '/about', label: 'About' },
  { to: '/results', label: 'Why Choose Us' },
  { to: '/faq', label: 'FAQ' },
  { to: '/contact', label: 'Contact' },
]

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  const closeMenu = () => setMenuOpen(false)

  return (
    <header className={`topbar${menuOpen ? ' open' : ''}`}>
      <Link className="brand-mark" to="/" onClick={closeMenu}>
        <span className="brand-dot" />
        <div>
          <p className="brand-name">LPay</p>
          <p className="brand-subtitle">Recharge &amp; PAN Services</p>
        </div>
      </Link>

      <button
        className="nav-toggle"
        type="button"
        aria-label="Toggle navigation"
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen((open) => !open)}
      >
        <span />
        <span />
        <span />
      </button>

      <nav className="nav">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            onClick={closeMenu}
            className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
          >
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="nav-actions">
        <NavLink className="text-link" to="/login" onClick={closeMenu}>Partner Login</NavLink>
        <NavLink className="primary-button small" to="/portal" onClick={closeMenu}>Open Portal</NavLink>
      </div>
    </header>
  )
}
