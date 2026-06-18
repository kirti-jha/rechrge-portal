import { useState } from 'react'

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  const handleNavClick = () => setMenuOpen(false)

  return (
    <header className={`topbar${menuOpen ? ' open' : ''}`}>
      <div className="brand-mark">
        <span className="brand-dot" />
        <div>
          <p className="brand-name">LPay</p>
          <p className="brand-subtitle">Recharge &amp; PAN Services</p>
        </div>
      </div>

      <button
        className="nav-toggle"
        type="button"
        aria-label="Toggle navigation"
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen(o => !o)}
      >
        <span />
        <span />
        <span />
      </button>

      <nav className="nav">
        <a href="#services" onClick={handleNavClick}>Services</a>
        <a href="#hierarchy" onClick={handleNavClick}>Hierarchy</a>
        <a href="#about" onClick={handleNavClick}>About</a>
        <a href="#results" onClick={handleNavClick}>Why Choose Us</a>
        <a href="#faq" onClick={handleNavClick}>FAQ</a>
        <a href="#contact" onClick={handleNavClick}>Contact</a>
      </nav>

      <div className="nav-actions">
        <a className="text-link" href="#contact" onClick={handleNavClick}>Partner Login</a>
        <a className="primary-button small" href="#hierarchy" onClick={handleNavClick}>View Network</a>
      </div>
    </header>
  )
}
