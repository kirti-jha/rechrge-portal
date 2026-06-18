import Reveal from './Reveal'

const ChevronIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="accordion-chevron">
    <polyline points="6 9 12 15 18 9"/>
  </svg>
)

const faqs = [
  {
    question: 'What services are highlighted on LPay?',
    answer: 'LPay specializes specifically in Mobile Recharge, DTH Recharge, and PAN Card Services, allowing us to maintain robust API pipelines and rapid processing speeds.',
    defaultOpen: true,
  },
  {
    question: 'Why is a focused platform better than a multi-payment portal?',
    answer: 'Many portals cram utility bills, travel tickets, and shopping into one place. This creates massive navigation bloat and higher payment failure rates. LPay targets core essentials for better performance and speed.',
  },
  {
    question: 'How secure are my payments on LPay?',
    answer: 'We use state-of-the-art 256-bit SSL encryption to handle your transactions. No payment details are stored on our servers, aligning with the highest PCI-DSS security protocols.',
  },
  {
    question: 'How long does PAN card application processing take?',
    answer: 'Once you submit your application through LPay guidance, our processing partners verify it. Typically, your digital e-PAN is generated within 3-4 working days, and the physical card is dispatched shortly after.',
  },
]

export default function FAQ() {
  return (
    <section className="section faq" id="faq">
      <div className="faq-shell">
        <Reveal>
          <div className="section-heading">
            <span className="eyebrow-badge">FAQ</span>
            <h2>Frequently Asked Questions.</h2>
            <p>Everything you need to know about utilizing LPay for your personal and commercial recharge operations.</p>
          </div>
        </Reveal>

        <div className="faq-list">
          {faqs.map((faq, i) => (
            <Reveal key={i}>
              <details open={faq.defaultOpen || undefined}>
                <summary>
                  <span>{faq.question}</span>
                  <ChevronIcon />
                </summary>
                <p>{faq.answer}</p>
              </details>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
