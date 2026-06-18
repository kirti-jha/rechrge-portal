import { Link } from 'react-router-dom'

const panServices = [
  { title: 'New PAN Card', copy: 'Individual, company, LLP, HUF and trust applications', price: 'Rs 107', tone: 'saffron' },
  { title: 'PAN Correction', copy: 'Name, DOB, address, photo and signature updates', price: 'Rs 107', tone: 'blue' },
  { title: 'Minor PAN Card', copy: 'Applications for children below 18 years', price: 'Rs 107', tone: 'green' },
  { title: 'Lost PAN Recovery', copy: 'Retrieve forgotten PAN details quickly', price: 'Rs 50', tone: 'purple' },
  { title: 'e-PAN Download', copy: 'Instant digital PAN support and guidance', price: 'Free', tone: 'red' },
  { title: 'Reprint / Duplicate', copy: 'Physical replacement for damaged or lost PAN cards', price: 'Rs 107', tone: 'yellow' },
  { title: 'Smart QR-PAN 2.0', copy: 'Modern QR-ready PAN service support', price: 'New', tone: 'teal' },
  { title: 'Retailor Portal', copy: 'Create retailors and manage charges from your portal', price: 'MERN Ready', tone: 'pink' },
]

const utilityServices = [
  { title: 'Mobile Recharge', copy: 'Fast prepaid and utility recharge service for daily customer flow' },
  { title: 'DTH Recharge', copy: 'Instant DTH recharge for all major operator networks' },
  { title: 'Bill Collection', copy: 'Add daily-value customer services to your local shop counter' },
  { title: 'Retailor Earnings', copy: 'Grow through your own downline and service commissions' },
]

const panCategories = [
  {
    title: 'Apply New PAN',
    tone: 'saffron',
    items: ['New Individual PAN Card', 'Paperless PAN Card', 'New Minor PAN Card', 'Child PAN Card (Age 5+)', 'Trust and NGO PAN Card', 'School and society PAN Card'],
  },
  {
    title: 'Corrections',
    tone: 'blue',
    items: ['Name change after marriage', 'Minor to major PAN', 'Add signature in PAN', 'Date of birth change', 'Father name update', 'Photo and address correction'],
  },
  {
    title: 'Reprint / Physical',
    tone: 'green',
    items: ['e-PAN to physical PAN', 'Duplicate PAN card', 'Reprint lost PAN', 'Reprint damaged PAN', 'Get PVC / smart PAN', 'Below 18 years PAN'],
  },
  {
    title: 'Special Categories',
    tone: 'purple',
    items: ['Partnership firm PAN', 'Business PAN card', 'HUF PAN card', 'LLP PAN card', 'Company / corporate PAN', 'Educational society PAN'],
  },
]

const trustPoints = [
  'अनपढ़ व्यक्ति का पैन कार्ड भी आसानी से बन सकता है',
  '18 साल से कम उम्र के बच्चों के लिए भी PAN support',
  'महिला हो या पुरुष, सभी के लिए आसान सेवा',
  'नाम, DOB, फोटो और सिग्नेचर अपडेट available',
  'Email पर तेजी से e-PAN guidance',
  'घर तक physical PAN delivery assistance',
]

const trainingCards = [
  { title: 'Training Video', copy: 'Watch the full step-by-step PAN flow before onboarding your team.' },
  { title: 'Document Checklist', copy: 'Keep standard verification rules ready for new and correction requests.' },
  { title: 'Sample Forms', copy: 'Use ready examples for men, women, child and correction form cases.' },
]

const pricingPlans = [
  {
    title: 'Basic PAN',
    price: 'Rs 107',
    subtitle: 'Individual applicants',
    features: ['New PAN application', 'PAN correction', 'e-PAN guidance', 'Email support'],
    featured: false,
  },
  {
    title: 'Premium Pack',
    price: 'Rs 199',
    subtitle: 'Complete solution',
    features: ['New + correction + reprint', 'Priority processing flow', 'WhatsApp support', 'Document verification help'],
    featured: true,
  },
  {
    title: 'Retailor Plan',
    price: 'Rs 499',
    subtitle: 'Business owners',
    features: ['Portal access', 'Commission support', 'Create sub-retailors', 'Rate and downline visibility'],
    featured: false,
  },
]

const testimonials = [
  {
    quote: 'PAN CENTER style flow works because local retailers understand it instantly. A React MERN version like this can bring both service trust and daily business value.',
    name: 'Rajesh Kumar',
    meta: 'Retailor · Delhi',
  },
  {
    quote: 'After joining the service portal, our counter became known for PAN and recharge support. A clear frontend and real dashboard makes the business easier to run.',
    name: 'Sunita Devi',
    meta: 'Shop Owner · Bihar',
  },
  {
    quote: 'The biggest difference is operational simplicity. Admin and retailor structure, support flow and charge control all belong in one connected product.',
    name: 'Imran Ali',
    meta: 'Agent Partner · Uttar Pradesh',
  },
]

const faqs = [
  {
    q: 'How long does it take to get a new PAN card?',
    a: 'Physical PAN generally takes 7 to 15 working days, while e-PAN guidance can begin much earlier depending on the case.',
  },
  {
    q: 'Can retailors create other retailors in this system?',
    a: 'Yes. Admin can create retailors, and every retailor can create more retailors under themselves with direct downline charges.',
  },
  {
    q: 'Does this MERN version support login and portal pages?',
    a: 'Yes. This version already includes admin and retailor login, protected portal routes, user creation pages, rates, support, settings and password change flows.',
  },
]

function ServiceCard({ title, copy, price, tone }) {
  return (
    <article className={`pc-service-card tone-${tone}`}>
      <div className="pc-service-icon" />
      <h3>{title}</h3>
      <p>{copy}</p>
      <span>{price}</span>
    </article>
  )
}

export default function HomePage() {
  return (
    <div className="pc-home">
      <section className="pc-hero">
        <div className="pc-hero-grid">
          <div className="pc-hero-copy">
            <div className="pc-tag">
              <span className="pc-tag-dot" />
              <span>Government authorized inspired layout · Trusted PAN service flow</span>
            </div>
            <h1>
              Your trusted partner for
              <br />
              <span>PAN card services</span>
            </h1>
            <p>
              India-focused PAN support, correction, minor PAN, mobile and DTH recharge,
              plus free retailor onboarding and MERN portal management with admin and downline control.
            </p>
            <div className="pc-hero-actions">
              <Link className="primary-button" to="/login">Free Register Now</Link>
              <Link className="secondary-button" to="/services">Explore Services</Link>
            </div>
            <div className="pc-trust-row">
              <div><strong>100%</strong><span>Secure</span></div>
              <div><strong>48h</strong><span>Fast flow</span></div>
              <div><strong>24/7</strong><span>Support</span></div>
            </div>
          </div>

          <div className="pc-hero-card-wrap">
            <div className="pc-float-chip chip-top">
              <span>Completed</span>
              <strong>50K+</strong>
            </div>
            <div className="pc-hero-card">
              <div className="pc-hero-card-head">
                <div className="pc-logo-badge">PC</div>
                <span className="pc-status">Active</span>
              </div>
              <h2>Instant PAN Services</h2>
              <p>Get your PAN flow moving with a faster React + MERN business experience.</p>
              <div className="pc-price-list">
                <div><span>New PAN Application</span><strong>Rs 107</strong></div>
                <div><span>PAN Correction</span><strong>Rs 107</strong></div>
                <div><span>e-PAN Download</span><strong>Free</strong></div>
              </div>
              <Link className="primary-button full-width" to="/portal">Open Portal</Link>
            </div>
            <div className="pc-float-chip chip-bottom">
              <span>Rating</span>
              <strong>4.9 Star</strong>
            </div>
          </div>
        </div>
        <div className="pc-wave" aria-hidden="true" />
      </section>

      <section className="pc-stats">
        <div className="pc-stats-grid">
          <article><strong>50K+</strong><span>Applications Done</span></article>
          <article><strong>10K+</strong><span>Happy Customers</span></article>
          <article><strong>10+</strong><span>Years Experience</span></article>
          <article><strong>29</strong><span>States Covered</span></article>
        </div>
      </section>

      <section className="pc-section pc-services">
        <div className="pc-section-head center">
          <span className="pc-pill">Our Services</span>
          <h2>Comprehensive PAN and utility services</h2>
          <p>One-stop solution for PAN services, recharges, partner onboarding and local retailor growth.</p>
        </div>

        <h3 className="pc-subhead">Core PAN Services</h3>
        <div className="pc-service-grid">
          {panServices.map((service) => (
            <ServiceCard key={service.title} {...service} />
          ))}
        </div>

        <h3 className="pc-subhead alt">Utility and business support</h3>
        <div className="pc-utility-grid">
          {utilityServices.map((service) => (
            <article key={service.title} className="pc-utility-card">
              <h4>{service.title}</h4>
              <p>{service.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="pc-section pc-types">
        <div className="pc-section-head center">
          <span className="pc-pill green">Type of PAN Card</span>
          <h2>All types of PAN cards available</h2>
          <p>We provide the full breadth of PAN-related service categories from new applications to special business entities.</p>
        </div>
        <div className="pc-type-grid">
          {panCategories.map((group) => (
            <article key={group.title} className={`pc-type-card tone-${group.tone}`}>
              <h3>{group.title}</h3>
              <ul>
                {group.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="pc-section pc-why">
        <div className="pc-section-head center light">
          <span className="pc-pill dark">PAN Card Support Highlights</span>
          <h2>Why choose this PAN-center style experience?</h2>
        </div>
        <div className="pc-why-grid">
          {trustPoints.map((item) => (
            <article key={item} className="pc-why-card">
              <h3>{item}</h3>
              <p>Fast, guided and retail-friendly service support with a practical operational flow.</p>
            </article>
          ))}
        </div>
        <div className="pc-guarantee">
          <strong>100% PAN-card guidance focused experience</strong>
          <span>Easy · secure · fast service · expert support</span>
        </div>
      </section>

      <section className="pc-section pc-training">
        <div className="pc-section-head center">
          <span className="pc-pill violet">Training and Support</span>
          <h2>PAN training and support resources</h2>
          <p>Everything needed for onboarding new staff, guiding retailors and running daily service operations with less confusion.</p>
        </div>
        <div className="pc-training-grid">
          {trainingCards.map((card) => (
            <article key={card.title} className="pc-training-card">
              <h3>{card.title}</h3>
              <p>{card.copy}</p>
              <Link to="/contact">Learn More</Link>
            </article>
          ))}
        </div>
      </section>

      <section className="pc-section pc-register">
        <div className="pc-register-shell">
          <div className="pc-section-head center">
            <span className="pc-pill white">Free Registration · Earn up to Rs 50K / month</span>
            <h2>Free retailor agent registration</h2>
            <p>Use the MERN login and portal flow instead of a static OTP form. This is the same business intent with a real product path.</p>
          </div>
          <div className="pc-register-card">
            <div className="pc-register-grid">
              <label>
                Mobile Number
                <input placeholder="+91 Enter 10-digit mobile number" />
              </label>
              <label>
                Preferred Role
                <select defaultValue="retailor">
                  <option value="retailor">Retailor</option>
                  <option value="admin">Admin</option>
                </select>
              </label>
            </div>
            <div className="pc-register-checks">
              <label><input type="checkbox" defaultChecked /> I agree to receive PAN CENTER style service updates.</label>
              <label><input type="checkbox" defaultChecked /> I agree to terms, privacy and eKYC related consent.</label>
              <label><input type="checkbox" defaultChecked /> I confirm the information I provide is correct.</label>
            </div>
            <div className="pc-register-actions">
              <Link className="primary-button" to="/login">Login To Register</Link>
              <Link className="secondary-button" to="/portal">Open Partner Portal</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="pc-section pc-pricing">
        <div className="pc-section-head center">
          <span className="pc-pill">Transparent Pricing</span>
          <h2>Simple and affordable pricing</h2>
          <p>No hidden charges. Keep the public offer simple and push logged-in partners toward the real portal workflow.</p>
        </div>
        <div className="pc-pricing-grid">
          {pricingPlans.map((plan) => (
            <article key={plan.title} className={`pc-price-card${plan.featured ? ' featured' : ''}`}>
              <h3>{plan.title}</h3>
              <p>{plan.subtitle}</p>
              <strong>{plan.price}</strong>
              <ul>
                {plan.features.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
              <Link className={plan.featured ? 'secondary-button' : 'primary-button'} to="/login">
                {plan.featured ? 'Get Premium' : 'Get Started'}
              </Link>
            </article>
          ))}
        </div>
        <div className="pc-note">
          <strong>Important note:</strong>
          <span>Issuance is done by official authorities. This MERN product helps manage application assistance, partner operations and retailor workflows.</span>
        </div>
      </section>

      <section className="pc-section pc-testimonials">
        <div className="pc-section-head center">
          <span className="pc-pill green">Customer Feedback</span>
          <h2>What our customers say</h2>
        </div>
        <div className="pc-testimonial-grid">
          {testimonials.map((item) => (
            <article key={item.name} className="pc-testimonial-card">
              <p>{item.quote}</p>
              <strong>{item.name}</strong>
              <span>{item.meta}</span>
            </article>
          ))}
        </div>
      </section>

      <section className="pc-section pc-faq-contact">
        <div className="pc-faq-contact-grid">
          <div className="pc-faq-block">
            <div className="pc-section-head">
              <span className="pc-pill violet">FAQ</span>
              <h2>Common questions</h2>
            </div>
            <div className="pc-faq-list">
              {faqs.map((faq) => (
                <details key={faq.q} open={faq.q === faqs[0].q}>
                  <summary>{faq.q}</summary>
                  <p>{faq.a}</p>
                </details>
              ))}
            </div>
          </div>

          <div className="pc-contact-block">
            <div className="pc-section-head">
              <span className="pc-pill">Contact</span>
              <h2>Need help with PAN or retailor onboarding?</h2>
            </div>
            <p>Use the support and portal flow for the real MERN experience, or contact the operations desk directly.</p>
            <div className="pc-contact-actions">
              <Link className="primary-button" to="/contact">Contact Team</Link>
              <Link className="secondary-button" to="/portal/support">Open Support Page</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
