import Reveal from './Reveal'

const CheckIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="list-check">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
)

export default function About() {
  return (
    <section className="section platform" id="about">
      <div className="platform-grid">
        <Reveal>
          <div className="platform-copy">
            <span className="eyebrow-badge">About LPay</span>
            <h2>A focused platform built around digital trust.</h2>
            <p>
              Traditional recharge portals are crowded with banner advertisements, unrelated lottery schemes,
              and confusing checkout paths. LPay stands apart with a clean layout that values your time.
            </p>
            <ul className="feature-list">
              <li><CheckIcon />Dedicated interfaces for mobile, DTH, and PAN card services.</li>
              <li><CheckIcon />Zero-friction flows with immediate verification checks.</li>
              <li><CheckIcon />Polished and modern user experience accessible across all screens.</li>
              <li><CheckIcon />24/7 dedicated callback support for complex PAN processing.</li>
            </ul>
          </div>
        </Reveal>

        <Reveal>
          <div className="platform-board">
            <article className="board-row">
              <p>Simple Mobile Recharge</p>
              <strong>Fast operator top-ups with immediate plan updates.</strong>
            </article>
            <article className="board-row accent-row">
              <p>Reliable DTH Top-ups</p>
              <strong>Direct API connections for real-time status settlement.</strong>
            </article>
            <article className="board-row">
              <p>Professional PAN Services</p>
              <strong>Hassle-free guided applications reviewed by verification experts.</strong>
            </article>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
