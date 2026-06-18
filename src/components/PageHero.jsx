export default function PageHero({ eyebrow, title, description, actions }) {
  return (
    <section className="page-hero">
      <div className="page-hero-copy">
        {eyebrow ? <span className="eyebrow-badge">{eyebrow}</span> : null}
        <h1>{title}</h1>
        <p>{description}</p>
        {actions ? <div className="page-hero-actions">{actions}</div> : null}
      </div>
    </section>
  )
}
