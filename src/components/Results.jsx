import { useEffect, useRef, useState } from 'react'

function CounterCard({ target, suffix, label }) {
  const [display, setDisplay] = useState('0')
  const ref = useRef(null)
  const started = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true
          const duration = 1500
          const hasDecimal = String(target).includes('.')
          const startTime = performance.now()

          const update = (now) => {
            const progress = Math.min((now - startTime) / duration, 1)
            const eased = 1 - Math.pow(1 - progress, 3)
            const value = target * eased
            setDisplay(hasDecimal ? value.toFixed(1) : Math.round(value).toLocaleString('en-IN'))
            if (progress < 1) requestAnimationFrame(update)
          }

          requestAnimationFrame(update)
          observer.unobserve(el)
        }
      },
      { threshold: 0.45 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [target])

  return (
    <article className="result-card reveal visible" ref={ref}>
      <strong>{display}{suffix}</strong>
      <span>{label}</span>
    </article>
  )
}

export default function Results() {
  return (
    <section className="section results" id="results">
      <div className="results-header reveal visible">
        <span className="eyebrow-badge">Business Signals</span>
        <h2>Metrics that support a real retailor network.</h2>
        <p>
          The platform experience is now centered around partner operations, quick service execution,
          and cleaner visibility into growth across the hierarchy.
        </p>
      </div>
      <div className="results-grid">
        <CounterCard target={99.9} suffix="%" label="Successful transaction processing" />
        <CounterCard target={24} suffix="/7" label="Operational support availability" />
        <CounterCard target={15000} suffix="+" label="Monthly service actions handled" />

        <article className="result-quote reveal visible">
          <p>"The new LPay layout feels less like a generic recharge site and more like an actual operator desk for managing my downline."</p>
          <span className="quote-author">Rajesh K., merchant network owner</span>
        </article>
      </div>
    </section>
  )
}
