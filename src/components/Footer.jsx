export default function Footer({ switchSimTab }) {
  return (
    <footer className="footer reveal visible">
      <div className="footer-grid">
        <div className="footer-col brand-col">
          <div className="brand-mark">
            <span className="brand-dot" />
            <span className="brand-name">LPay</span>
          </div>
          <p className="footer-desc">
            Business-focused recharge software for admins and retailors who need faster service handling,
            simpler network creation, and cleaner charge visibility.
          </p>
          <div className="social-links">
            <a href="#" aria-label="Twitter">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
              </svg>
            </a>
            <a href="#" aria-label="LinkedIn">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect x="2" y="9" width="4" height="12" />
                <circle cx="4" cy="4" r="2" />
              </svg>
            </a>
            <a href="#" aria-label="Telegram">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m22 2-7 20-4-9-9-4Z" />
                <path d="M22 2 11 13" />
              </svg>
            </a>
          </div>
        </div>

        <div className="footer-col">
          <h3>Platform</h3>
          <ul className="footer-links-list">
            <li><a href="#services">Services</a></li>
            <li><a href="#hierarchy">Hierarchy</a></li>
            <li><a href="#about">About LPay</a></li>
            <li><a href="#faq">FAQ Hub</a></li>
          </ul>
        </div>

        <div className="footer-col">
          <h3>Workflows</h3>
          <ul className="footer-links-list">
            <li><a href="#simulator" onClick={(event) => { event.preventDefault(); switchSimTab('mobile') }}>Mobile Recharge</a></li>
            <li><a href="#simulator" onClick={(event) => { event.preventDefault(); switchSimTab('dth') }}>DTH Recharge</a></li>
            <li><a href="#simulator" onClick={(event) => { event.preventDefault(); switchSimTab('pan') }}>PAN Processing</a></li>
            <li><a href="#contact">Partner Callback</a></li>
          </ul>
        </div>

        <div className="footer-col">
          <h3>Operations Desk</h3>
          <p className="footer-contact-item">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <polyline points="22,6 12,13 2,6" />
            </svg>
            partnerdesk@lpay.in
          </p>
          <p className="footer-contact-item">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.21 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
            +91 1800-123-LPAY
          </p>
          <div className="compliance-badge">Secure partner onboarding</div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2026 LPay Services Private Limited. All rights reserved.</p>
        <div className="footer-bottom-links">
          <a href="#">Privacy Policy</a>
          <span className="bullet-divider">•</span>
          <a href="#">Terms of Service</a>
          <span className="bullet-divider">•</span>
          <a href="#">Sitemap</a>
        </div>
      </div>
    </footer>
  )
}
