import Reveal from './Reveal'

const ArrowIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
  </svg>
)

export default function Services({ switchSimTab }) {
  return (
    <section className="section services" id="services">
      <Reveal>
        <div className="section-heading">
          <span className="eyebrow-badge font-accent">What We Offer</span>
          <h2>Clear &amp; focused digital services with high security.</h2>
          <p>We believe in doing a few things exceptionally well instead of overloading you with choices. Experience speed and design precision in our core offerings.</p>
        </div>
      </Reveal>

      <div className="services-layout">
        {/* Mobile Recharge */}
        <Reveal>
          <article className="feature-panel">
            <div className="panel-image-wrapper">
              <img className="service-image" src="/assets/service-mobile.png" alt="Mobile recharge illustration" />
            </div>
            <div className="panel-content">
              <span className="panel-number">01</span>
              <h3>Mobile Recharge</h3>
              <p>Simple prepaid and postpaid recharge experience with a clean, grid-aligned operator selector to get you reloaded in under 10 seconds.</p>
              <a href="#simulator" className="panel-link" onClick={e => { e.preventDefault(); switchSimTab('mobile') }}>
                <span>Try Simulator</span><ArrowIcon />
              </a>
            </div>
          </article>
        </Reveal>

        {/* DTH */}
        <Reveal>
          <article className="feature-panel">
            <div className="panel-image-wrapper">
              <img className="service-image compact" src="/assets/service-dth.png" alt="DTH recharge illustration" />
            </div>
            <div className="panel-content">
              <span className="panel-number">02</span>
              <h3>DTH Connections</h3>
              <p>Instant DTH refills across all premium operators with automated verification checks to ensure your plans are activated instantly.</p>
              <a href="#simulator" className="panel-link" onClick={e => { e.preventDefault(); switchSimTab('dth') }}>
                <span>Try Simulator</span><ArrowIcon />
              </a>
            </div>
          </article>
        </Reveal>

        {/* PAN Card */}
        <Reveal>
          <article className="feature-panel">
            <div className="panel-image-wrapper">
              <img className="service-image compact" src="/assets/service-pan.png" alt="PAN card service illustration" />
            </div>
            <div className="panel-content">
              <span className="panel-number">03</span>
              <h3>PAN Card Support</h3>
              <p>Expert guidance on new PAN card registrations, correction forms, and digital reprint assistance without complex government portal redirects.</p>
              <a href="#simulator" className="panel-link" onClick={e => { e.preventDefault(); switchSimTab('pan') }}>
                <span>Try Simulator</span><ArrowIcon />
              </a>
            </div>
          </article>
        </Reveal>

        {/* Why LPay */}
        <Reveal>
          <article className="feature-panel dark-panel">
            <div className="panel-content">
              <span className="panel-number alt">04</span>
              <h3>Why LPay works better</h3>
              <p>By eliminating clutter and focusing purely on the three services customers use daily, we maintain a 99.9% success rate and provide immediate response times.</p>
              <div className="mini-metrics">
                <div className="metric">
                  <strong>99.9%</strong>
                  <span>Uptime</span>
                </div>
                <div className="metric">
                  <strong>&lt; 3s</strong>
                  <span>Checkout</span>
                </div>
              </div>
            </div>
          </article>
        </Reveal>
      </div>
    </section>
  )
}
