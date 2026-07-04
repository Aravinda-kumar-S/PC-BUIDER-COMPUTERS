import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Check, Phone, ChevronRight, ArrowRight } from 'lucide-react';
import pcBuilderLogo from './assets/PCBUILDER.png';

const WHATSAPP_NUMBER = '918807621978';

const benefits = [
  'GST-Compliant Billing', 'Easy Accounting Management', 'Smart Inventory Control',
  'Fast Invoice Generation', 'Financial Reports & Analytics', 'Multi-Company Management',
  'Barcode Billing Support', 'Secure Data Backup', 'User-Friendly Dashboard',
  'High Performance & Reliability',
];

const ourServices = [
  'Genuine BookKeeper License', 'Software Installation', 'Company Setup',
  'GST Configuration', 'Data Migration', 'Employee Training',
  'Technical Support', 'Software Updates', 'Annual License Renewal',
  'Remote Assistance', 'Business Consultation',
];

const industries = [
  'Retail Stores', 'Wholesale Businesses', 'Manufacturing Companies', 'Medical Stores',
  'Pharmacies', 'Supermarkets', 'Restaurants', 'Textile Businesses', 'Electronics Shops',
  'Hardware Stores', 'Automobile Businesses', 'Educational Institutions',
  'Service Providers', 'Chartered Accountants', 'Startups', 'Small & Medium Enterprises',
];

const steps = [
  { n: '01', t: 'Share Requirements', d: 'Share your business requirements with our team.' },
  { n: '02', t: 'Expert Recommendation', d: 'Our experts recommend the right BookKeeper edition.' },
  { n: '03', t: 'Purchase License', d: 'Purchase your genuine software license.' },
  { n: '04', t: 'Installation', d: 'Professional installation & configuration.' },
  { n: '05', t: 'Setup & Migration', d: 'Business setup & data migration.' },
  { n: '06', t: 'Training & Demo', d: 'User training & live demo session.' },
  { n: '07', t: 'Go Live', d: 'Start managing your business with confidence.' },
];

const faqs = [
  { q: 'What is BookKeeper Accounting Software?', a: 'BookKeeper is a comprehensive accounting and GST billing software that helps businesses manage invoices, inventory, accounting, taxation, and financial reports.' },
  { q: 'Is BookKeeper suitable for small businesses?', a: 'Yes. It is designed for startups, retailers, wholesalers, manufacturers, service providers, and SMEs.' },
  { q: 'Does BookKeeper support GST billing?', a: 'Yes. It supports GST-compliant invoices, tax calculations, GST reports, and return preparation.' },
  { q: 'Can I manage inventory?', a: 'Yes. BookKeeper includes advanced inventory management with barcode support and stock tracking.' },
  { q: 'Do you provide installation and training?', a: 'Yes. We provide installation, setup, user training, data migration, and ongoing technical support.' },
  { q: 'Is technical support available?', a: 'Yes. Our team offers remote assistance, software updates, troubleshooting, and annual renewal support.' },
];

const trustPoints = [
  'Easy to Learn & Use', 'GST-Compliant Accounting', 'Fast & Accurate Billing',
  'Complete Inventory Control', 'Powerful Business Reports', 'Secure Data Management',
  'Reliable Technical Support', 'Scalable for Growing Businesses',
];

const businessTypes = [
  'Retail Shop', 'Wholesale Business', 'Manufacturing Company', 'Distributor',
  'Medical Store', 'Pharmacy', 'Supermarket', 'Restaurant', 'Textile Business',
  'Electronics Store', 'Hardware Shop', 'Automobile Business', 'Construction Company',
  'Educational Institution', 'Service Business', 'Chartered Accountant', 'Startup',
  'Freelancer', 'Other',
];

export default function BookKeeperPage() {
  const [form, setForm] = useState({
    name: '', phone: '', business: '', location: '', type: '', requirement: '',
  });
  const [openFaq, setOpenFaq] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const msg = `Hello BookKeeper Team,\n\n*New Enquiry*\n\nName: ${form.name}\nBusiness: ${form.business}\nLocation: ${form.location}\nPhone: ${form.phone}\nBusiness Type: ${form.type}\nRequirement: ${form.requirement || 'Not specified'}`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <div className="bk-page">

      {/* ── Floating Action Buttons ── */}
      <a href="tel:+918807621978" className="bkp-fab bkp-fab-call" aria-label="Call BookKeeper Support">
        <Phone size={22} />
      </a>
      <a
        href={`https://wa.me/${WHATSAPP_NUMBER}?text=Hi%2C%20I%27m%20interested%20in%20BookKeeper%20Accounting%20Software`}
        target="_blank"
        rel="noopener noreferrer"
        className="bkp-fab bkp-fab-wa animate-pulse-glow"
        aria-label="WhatsApp BookKeeper Support"
      >
        {/* WhatsApp SVG icon */}
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
          <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.553 4.117 1.52 5.847L0 24l6.335-1.495A11.935 11.935 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.885 0-3.652-.51-5.17-1.399l-.371-.22-3.762.888.944-3.653-.242-.384A9.944 9.944 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
        </svg>
      </a>

      {/* ── Navbar ── */}
      <nav className="navbar scrolled">
        <div className="nav-container">
          <Link to="/" className="navbar-brand">
            <img src={pcBuilderLogo} alt="PCBUILDER Computers" className="navbar-logo" />
          </Link>
          <Link to="/" className="bk-back-btn">← Back to Home</Link>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="bkp-hero">
        <div className="bkp-hero-badge">We Authorized Sales Partner</div>

        {/* BookKeeper logo — inline SVG (no external file dependency) */}
        <div className="bkp-logo-wrap">
          <div className="bk-inline-logo bk-inline-logo--large">
            <svg width="64" height="64" viewBox="0 0 52 52" xmlns="http://www.w3.org/2000/svg">
              <circle cx="26" cy="26" r="26" fill="#1a5c38"/>
              <text x="26" y="34" textAnchor="middle" fill="white" fontFamily="Georgia, serif" fontSize="22" fontWeight="bold">bk</text>
            </svg>
            <span className="bk-inline-logo-text">
              BookKeeper<sup className="bk-inline-logo-reg">®</sup>
            </span>
          </div>
        </div>

        <h1 className="bkp-hero-h1">BookKeeper Accounting Software</h1>
        <p className="bkp-hero-sub">Authorized BookKeeper Sales Partner in Tamil Nadu</p>
        <p className="bkp-hero-tagline">
          Smart GST Billing, Accounting &amp; Inventory Management Software for Every Business
        </p>

        {/* Product info banner — replaces missing screenshot */}
        <div className="bkp-product-wrap">
          <div className="bk-product-banner">
            <div className="bk-product-banner-left">
              <div className="bk-product-banner-badge">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" stroke="#34A853" strokeWidth="2" strokeLinecap="round"/>
                  <polyline points="9 22 9 12 15 12 15 22" stroke="#34A853" strokeWidth="2" strokeLinecap="round"/>
                </svg>
                Google Play &nbsp;<span className="bk-product-stars">4.5 ★★★★½</span>
              </div>
              <p className="bk-product-banner-title">GST Billing &amp; Accounting Software</p>
              <p className="bk-product-banner-sub">India's Most Trusted Business Management Solution</p>
            </div>
            <div className="bk-product-banner-right">
              <p className="bk-product-banner-countries">🌍 Now in 30+ Countries</p>
              <div className="bk-product-features">
                {['GST Billing','Inventory','Accounting','Financial Reports','Barcode Billing','Multi-Company'].map((f,i) => (
                  <span key={i} className="bk-product-feat-pill">{f}</span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <p className="bkp-hero-desc">
          Grow your business with <span className="bkp-green">BookKeeper Accounting Software</span>, a trusted
          GST-ready business management solution designed for Retail Shops, Wholesale Businesses, Manufacturers,
          Distributors, Medical Stores, Service Providers, Startups, and Small &amp; Medium Enterprises (SMEs).
        </p>
        <p className="bkp-hero-desc">
          As an <span className="bkp-green">Authorized BookKeeper Sales Partner</span>, we provide genuine software
          licenses, professional installation, complete setup, user training, technical support, and annual renewal
          services. Whether you're starting a new business or upgrading your accounting system, BookKeeper helps
          streamline your operations with accuracy, speed, and compliance.
        </p>

        <div className="bkp-cta-row">
          <a href="#demo-form" className="bkp-btn-primary">
            Book Now <ChevronRight size={18} />
          </a>
          <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer" className="bkp-btn-wa">
            <Phone size={16} /> WhatsApp Us
          </a>
        </div>
      </section>

      {/* ── WHY CHOOSE ── */}
      <section className="bkp-section">
        <div className="container">
          <h2 className="bkp-section-title">Why Choose BookKeeper?</h2>
          <p className="bkp-section-desc">
            Managing business accounts manually or using spreadsheets can be time-consuming and error-prone.
            BookKeeper simplifies accounting, billing, inventory, taxation, and reporting with a user-friendly
            interface and powerful automation tools.
          </p>
          <div className="bkp-benefits-grid">
            {benefits.map((b, i) => (
              <div key={i} className="bkp-benefit-card glass-card">
                <Check size={18} className="bkp-check" />
                <span>{b}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── POWERFUL FEATURES ── */}
      <section className="bkp-section bkp-section--alt">
        <div className="container">
          <h2 className="bkp-section-title">Powerful Features</h2>
          <div className="bkp-features-grid">

            {/* GST Billing */}
            <div className="bkp-feat-card glass-card">
              <h3 className="bkp-feat-title bkp-feat-title--green">GST Billing &amp; Invoicing</h3>
              <p className="bkp-feat-desc">Create professional GST invoices with automatic tax calculations, HSN/SAC codes, and customer management.</p>
              {['GST Tax Invoice','Retail Invoice','Purchase Invoice','Credit Note','Debit Note','GST Reports'].map((f,i) => (
                <div key={i} className="bkp-feat-item"><Check size={14} className="bkp-check" /><span>{f}</span></div>
              ))}
            </div>

            {/* Accounting */}
            <div className="bkp-feat-card glass-card">
              <h3 className="bkp-feat-title bkp-feat-title--blue">Complete Accounting</h3>
              <p className="bkp-feat-desc">Manage all your financial transactions from one platform.</p>
              {['Sales & Purchases','Payments & Receipts','Expenses & Income','Ledger Management','Journal Entries','Bank Reconciliation'].map((f,i) => (
                <div key={i} className="bkp-feat-item"><Check size={14} className="bkp-check" /><span>{f}</span></div>
              ))}
            </div>

            {/* Inventory */}
            <div className="bkp-feat-card glass-card">
              <h3 className="bkp-feat-title bkp-feat-title--green">Inventory Management</h3>
              <p className="bkp-feat-desc">Track your stock efficiently with real-time inventory management.</p>
              {['Product Management','Stock Availability','Batch & Serial Number Tracking','Warehouse Management','Low Stock Alerts','Barcode Support'].map((f,i) => (
                <div key={i} className="bkp-feat-item"><Check size={14} className="bkp-check" /><span>{f}</span></div>
              ))}
            </div>

            {/* Reports */}
            <div className="bkp-feat-card glass-card">
              <h3 className="bkp-feat-title bkp-feat-title--blue">Financial Reports</h3>
              <p className="bkp-feat-desc">Generate detailed business reports instantly.</p>
              {['Profit & Loss Statement','Balance Sheet','Trial Balance','Cash Flow Statement','GST Reports','Sales & Purchase Reports','Outstanding Reports','Ledger Reports'].map((f,i) => (
                <div key={i} className="bkp-feat-item"><Check size={14} className="bkp-check" /><span>{f}</span></div>
              ))}
            </div>

            {/* Multi-Company */}
            <div className="bkp-feat-card glass-card">
              <h3 className="bkp-feat-title bkp-feat-title--green">Multi-Company Management</h3>
              <p className="bkp-feat-desc">Manage multiple businesses under one software with separate accounting records and reporting.</p>
            </div>

            {/* Secure */}
            <div className="bkp-feat-card glass-card">
              <h3 className="bkp-feat-title bkp-feat-title--blue">Secure Business Data</h3>
              <p className="bkp-feat-desc">Your business information is protected with secure backup and user access controls.</p>
              {['Password Protection','Automatic Backup','User Permissions','Data Recovery Support'].map((f,i) => (
                <div key={i} className="bkp-feat-item"><Check size={14} className="bkp-check" /><span>{f}</span></div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* ── INDUSTRIES ── */}
      <section className="bkp-section">
        <div className="container">
          <h2 className="bkp-section-title">Industries We Serve</h2>
          <p className="bkp-section-desc">BookKeeper is ideal for:</p>
          <div className="bkp-industries">
            {industries.map((ind, i) => (
              <span key={i} className="bkp-industry-tag">{ind}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY BUY FROM US ── */}
      <section className="bkp-section bkp-section--alt">
        <div className="container">
          <h2 className="bkp-section-title">Why Buy from an Authorized Partner?</h2>
          <p className="bkp-section-desc">When you purchase through us, you receive complete support before and after installation.</p>
          <div className="bkp-services-grid">
            {ourServices.map((s, i) => (
              <div key={i} className="bkp-service-item glass-card">
                <Check size={16} className="bkp-check" />
                <span>{s}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── STEPS ── */}
      <section className="bkp-section">
        <div className="container">
          <h2 className="bkp-section-title">Our Implementation Process</h2>
          <div className="bkp-steps">
            {steps.map((s, i) => (
              <div key={i} className="bkp-step glass-card">
                <div className="bkp-step-num">{s.n}</div>
                <div>
                  <div className="bkp-step-title">{s.t}</div>
                  <div className="bkp-step-desc">{s.d}</div>
                </div>
                {i < steps.length - 1 && <ArrowRight size={18} className="bkp-step-arrow" />}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── DEMO FORM ── */}
      <section className="bkp-section bkp-section--alt" id="demo-form">
        <div className="container">
          <h2 className="bkp-section-title">Book Now — BookKeeper Enquiry</h2>
          <p className="bkp-section-desc">Fill the form below and our BookKeeper expert will contact you with the best solution for your business.</p>

          <form className="bkp-form glass-card" onSubmit={handleSubmit}>
            <div className="bkp-form-grid">
              <div className="bkp-form-group">
                <label>Full Name *</label>
                <input required className="bkp-input" placeholder="Enter your name"
                  value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
              </div>
              <div className="bkp-form-group">
                <label>Mobile Number *</label>
                <input required type="tel" className="bkp-input" placeholder="+91 XXXXX XXXXX"
                  value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} />
              </div>
              <div className="bkp-form-group">
                <label>Business Name *</label>
                <input required className="bkp-input" placeholder="Your business name"
                  value={form.business} onChange={e => setForm({...form, business: e.target.value})} />
              </div>
              <div className="bkp-form-group">
                <label>Location / City *</label>
                <input required className="bkp-input" placeholder="Your city"
                  value={form.location} onChange={e => setForm({...form, location: e.target.value})} />
              </div>
              <div className="bkp-form-group form-full">
                <label>Business Type *</label>
                <select required className="bkp-input"
                  value={form.type} onChange={e => setForm({...form, type: e.target.value})}>
                  <option value="">-- Select Business Type --</option>
                  {businessTypes.map((t, i) => <option key={i} value={t}>{t}</option>)}
                </select>
              </div>
              <div className="bkp-form-group form-full">
                <label>Business Requirement <span className="bkp-optional">(Optional)</span></label>
                <textarea className="bkp-input bkp-textarea"
                  placeholder="e.g. Looking for GST billing, inventory management, and multi-user accounting."
                  value={form.requirement} onChange={e => setForm({...form, requirement: e.target.value})} />
              </div>
            </div>
            <button type="submit" className="bkp-btn-submit">
              🚀 Book Now on WhatsApp
            </button>
          </form>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="bkp-section">
        <div className="container">
          <h2 className="bkp-section-title">Frequently Asked Questions</h2>
          <div className="bkp-faq-list">
            {faqs.map((faq, i) => (
              <div key={i} className={`bkp-faq-item glass-card ${openFaq === i ? 'open' : ''}`}>
                <button className="bkp-faq-q" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                  <span>{faq.q}</span>
                  <span className="bkp-faq-icon">{openFaq === i ? '−' : '+'}</span>
                </button>
                {openFaq === i && <p className="bkp-faq-a">{faq.a}</p>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TRUST ── */}
      <section className="bkp-section bkp-section--alt">
        <div className="container">
          <h2 className="bkp-section-title">Why Businesses Trust BookKeeper</h2>
          <div className="bkp-trust-grid">
            {trustPoints.map((t, i) => (
              <div key={i} className="bkp-trust-item glass-card">
                <Check size={18} className="bkp-check" />
                <span>{t}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section className="bkp-section">
        <div className="container">
          <h2 className="bkp-section-title">Contact Us</h2>
          <div className="bkp-contact-card glass-card">
            <p className="bkp-contact-label">Authorized BookKeeper Sales Partner</p>

            <div className="bkp-contact-list">

              <div className="bkp-contact-row">
                <div className="bkp-contact-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                </div>
                <div className="bkp-contact-details">
                  <h4 className="bkp-contact-h4">Address</h4>
                  <p>KTR Complex, 229-230, E Veli St,</p>
                  <p>near HDFC Bank, Nelpettai,</p>
                  <p>Madurai Main, Madurai,</p>
                  <p>Tamil Nadu 625001</p>
                </div>
              </div>

              <div className="bkp-contact-row">
                <div className="bkp-contact-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.68 13.6 19.79 19.79 0 0 1 1.5 5.05 2 2 0 0 1 3.5 2.87h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 10.9a16 16 0 0 0 6.29 6.29l1.31-1.31a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 18.13z"/></svg>
                </div>
                <div className="bkp-contact-details">
                  <h4 className="bkp-contact-h4">Phone Number</h4>
                  <p><a href="tel:+918807621978" className="bkp-contact-link">+91 88076 21978</a></p>
                </div>
              </div>

              <div className="bkp-contact-row">
                <div className="bkp-contact-icon bkp-contact-icon--wa">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.553 4.117 1.52 5.847L0 24l6.335-1.495A11.935 11.935 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.885 0-3.652-.51-5.17-1.399l-.371-.22-3.762.888.944-3.653-.242-.384A9.944 9.944 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/></svg>
                </div>
                <div className="bkp-contact-details">
                  <h4 className="bkp-contact-h4">WhatsApp</h4>
                  <p>
                    <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer" className="bkp-contact-link">
                      +91 88076 21978
                    </a>
                  </p>
                </div>
              </div>

              <div className="bkp-contact-row">
                <div className="bkp-contact-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                </div>
                <div className="bkp-contact-details">
                  <h4 className="bkp-contact-h4">Business Hours</h4>
                  <p>Monday – Saturday: 9:00 AM to 7:00 PM</p>
                  <p>Sunday: Closed</p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="bkp-final-cta">
        <div className="container">
          <h2 className="bkp-final-title">Ready to Transform Your Business?</h2>
          <p className="bkp-final-desc">
            Whether you're launching a new business or upgrading your accounting system, BookKeeper gives you
            the tools to manage billing, GST, inventory, and finances with confidence.
          </p>
          <div className="bkp-final-pills">
            {['Genuine BookKeeper License','Book Now & Get Started','Professional Installation','User Training','Technical Support'].map((p,i) => (
              <span key={i} className="bkp-final-pill"><Check size={14} />{p}</span>
            ))}
          </div>
          <div className="bkp-cta-row">
            <a href="#demo-form" className="bkp-btn-primary">🚀 Book Now</a>
            <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer" className="bkp-btn-wa">
              <Phone size={16} /> WhatsApp Now
            </a>
          </div>
        </div>
      </section>

      <div className="bk-footer-note">
        <Link to="/" className="bk-back-btn">← Back to PCBUILDER Computers</Link>
      </div>

    </div>
  );
}
