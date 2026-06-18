import { Link } from 'react-router-dom'
import PageHero from '../components/PageHero'
import About from '../components/About'

const storyCards = [
  {
    title: 'Built For Daily Counters',
    copy: 'This product direction is for shops and small operators who need repeatable, low-friction services all day long.',
  },
  {
    title: 'Designed Around Trust',
    copy: 'PAN services and recharge flows only work when the interface feels reliable, clear and operationally mature.',
  },
  {
    title: 'Ready For MERN Growth',
    copy: 'The public pages build trust, while the MERN portal underneath grows into auth, wallet, support and user management.',
  },
]

const principles = [
  'Reduce confusion before reducing clicks.',
  'Give public visitors confidence before asking them to log in.',
  'Let admin and retailor workflows stay close, but not identical.',
  'Treat support and pricing as part of the product, not afterthoughts.',
]

export default function AboutPage() {
  return (
    <div className="page-stack">
      <PageHero
        eyebrow="About"
        title="Give the business story its own page instead of burying it between sections."
        description="This route focuses on the platform value, operational clarity, and why your PAN and recharge flow should feel more like a product than a generic portal."
        actions={
          <>
            <Link className="primary-button" to="/results">See Results</Link>
            <Link className="secondary-button" to="/faq">Read FAQ</Link>
          </>
        }
      />

      <section className="section page-detail-section">
        <div className="section-heading">
          <span className="eyebrow-badge">Business Story</span>
          <h2>Why this platform should feel more deliberate than a generic utility website.</h2>
          <p>
            The product should present PAN support, recharge services and retailor operations as a coherent system,
            not as unrelated widgets placed on the same screen.
          </p>
        </div>
        <div className="detail-card-grid three">
          {storyCards.map((item) => (
            <article key={item.title} className="detail-card">
              <h3>{item.title}</h3>
              <p>{item.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <About />

      <section className="section page-detail-section">
        <div className="section-heading">
          <span className="eyebrow-badge">Principles</span>
          <h2>The product decisions that matter most.</h2>
        </div>
        <div className="bullet-panel">
          {principles.map((item) => (
            <p key={item}>{item}</p>
          ))}
        </div>
      </section>
    </div>
  )
}
