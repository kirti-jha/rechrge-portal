export default function MarqueeStrip() {
  const items = [
    'Mobile recharge operations',
    'Admin-to-retailor onboarding',
    'Retailor downline creation',
    'Service-wise charge control',
    'Business-first portal experience',
    'PAN and DTH workflow support',
    'Mobile recharge operations',
    'Admin-to-retailor onboarding',
  ]

  return (
    <section className="marquee-strip reveal visible">
      <div className="marquee-track">
        {items.map((item, index) => (
          <span key={index}>{item}</span>
        ))}
      </div>
    </section>
  )
}
