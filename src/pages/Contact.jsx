import { useState } from 'react'
import { ArrowUpRight, CheckCircle2, Clock, Compass, Loader2, Mail, MapPin, MessageCircle, Navigation, Send } from 'lucide-react'
import Reveal from '../components/Reveal.jsx'

const MAPS_URL = "https://www.google.com/maps?cid=7825101273847178520"
const MAP_EMBED_SRC = "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d414.76534614736136!2d76.90846791277646!3d8.505672507142718!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b05bdcd406d5789%3A0x6c9858263f1e2518!2sUnicorn's%20Coworking%20Space%20Trivandrum!5e0!3m2!1sen!2sin!4v1792139314799!5m2!1sen!2sin"

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', interest: 'MERN Stack Development', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')
  const update = event => setForm({ ...form, [event.target.name]: event.target.value })

  async function handleSubmit(event) {
    event.preventDefault()
    if (!form.name.trim() || !form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setError('Please enter your name and a valid email address.')
      return
    }

    if (!form.phone.trim() || !/^[+]?[\d\s-]{7,18}$/.test(form.phone.trim())) {
      setError('Please enter a valid contact phone number.')
      return
    }

    const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || '89fa59bd-8076-4117-8c08-17b8f29fad7a'

    if (!accessKey) {
      setError('Web3Forms Access Key is not configured yet. Please paste the Access Key from your email into the .env file.')
      return
    }

    setIsSubmitting(true)
    setError('')

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify({
          access_key: accessKey,
          subject: `New ASTRA AI Application from ${form.name} (${form.phone})`,
          from_name: 'ASTRA AI Academy Admissions',
          Name: form.name,
          Email: form.email,
          'Contact Number': form.phone,
          'Program / Course': form.interest,
          Message: form.message
        })
      })

      const data = await response.json()
      if (data.success) {
        setSubmitted(true)
      } else {
        setError(data.message || 'Something went wrong while sending your message. Please try again.')
      }
    } catch {
      setError('Network error. Please check your internet connection and try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="page-wrap">
      <section className="page-hero section-pad contact-hero">
        <div className="container">
          <Reveal>
            <span className="eyebrow">LET'S START A CONVERSATION</span>
            <h1>
              Your next step<br />starts <span className="gradient-text">here.</span>
            </h1>
            <p>Questions about a program, your career goals, or where to begin? We're here to help.</p>
          </Reveal>

          <div className="contact-layout">
            <Reveal>
              <aside className="contact-aside">
                <h2>Let's find your direction.</h2>
                <p>No pressure, no complicated process. Just a conversation about what you want to learn and build.</p>

                <div className="contact-detail">
                  <span><Mail size={18} /></span>
                  <div>
                    <small>EMAIL</small>
                    <b>
                      <a href="mailto:astraaitvm@gmail.com" style={{ color: 'inherit', textDecoration: 'none' }}>
                        astraaitvm@gmail.com
                      </a>
                    </b>
                  </div>
                </div>

                <div className="contact-detail">
                  <span><MessageCircle size={18} /></span>
                  <div>
                    <small>CONTACT NUMBER</small>
                    <b>
                      <a href="tel:+919778117516" style={{ color: 'inherit', textDecoration: 'none' }}>
                        +91 9778117516
                      </a>
                    </b>
                  </div>
                </div>

                <div className="contact-detail contact-detail-whatsapp">
                  <span className="whatsapp-aside-icon">
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.888 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                    </svg>
                  </span>
                  <div>
                    <small>INSTANT WHATSAPP</small>
                    <b>
                      <a
                        href="https://wa.me/919778117516?text=Hi%20ASTRA%20AI%20Academy%2C%20I%20would%20like%20to%20know%20more%20about%20your%20courses."
                        target="_blank"
                        rel="noopener noreferrer"
                        className="whatsapp-contact-link"
                      >
                        Chat with Admissions <ArrowUpRight size={13} />
                      </a>
                    </b>
                  </div>
                </div>

                <div className="contact-detail contact-detail-location">
                  <span><MapPin size={18} /></span>
                  <div>
                    <small>CAMPUS LOCATION</small>
                    <b>ASTRA AI Academy @ Unicorn's Coworking Space</b>
                    <p className="campus-address-text">
                      2nd Floor, CPS Plaza, Venpalavattom, Thiruvananthapuram, Kerala 695029
                    </p>
                    <a
                      href={MAPS_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="directions-link"
                    >
                      <Navigation size={13} /> Get Directions on Google Maps <ArrowUpRight size={13} />
                    </a>
                  </div>
                </div>

                <div className="contact-aside-note">
                  <span className="live-dot" /> Campus open for offline counseling & lab visits.
                </div>
              </aside>
            </Reveal>

            <Reveal delay={0.12}>
              <div className="contact-form-card">
                {submitted ? (
                  <div className="success-state">
                    <div className="success-icon"><CheckCircle2 size={30} /></div>
                    <span className="eyebrow">MESSAGE PREPARED</span>
                    <h2>Thanks, {form.name.trim().split(' ')[0]}.</h2>
                    <p>Your inquiry was submitted. Our team will get back to you shortly with course details and advisor guidance.</p>
                    <div className="success-actions">
                      <button
                        className="button button-outline"
                        onClick={() => {
                          setSubmitted(false)
                          setForm({ name: '', email: '', phone: '', interest: 'MERN Stack Development', message: '' })
                        }}
                      >
                        Send another message
                      </button>
                      <a
                        href="https://wa.me/919778117516?text=Hi%20ASTRA%20AI%20Academy%2C%20I%20just%20submitted%20my%20application%20and%20would%20like%20to%20connect%20on%20WhatsApp."
                        target="_blank"
                        rel="noopener noreferrer"
                        className="button whatsapp-success-btn"
                      >
                        Chat on WhatsApp <ArrowUpRight size={14} />
                      </a>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} noValidate>
                    <div className="form-heading">
                      <span className="eyebrow">CONTACT FORM</span>
                      <h2>Tell us about your goals.</h2>
                    </div>

                    <label className="field-label" htmlFor="contact-name">
                      Your name
                      <input
                        id="contact-name"
                        name="name"
                        maxLength={80}
                        required
                        value={form.name}
                        onChange={update}
                        placeholder="e.g. Alex Thomas"
                        autoComplete="name"
                      />
                    </label>

                    <label className="field-label" htmlFor="contact-email">
                      Email address
                      <input
                        id="contact-email"
                        name="email"
                        type="email"
                        maxLength={120}
                        required
                        value={form.email}
                        onChange={update}
                        placeholder="you@example.com"
                        autoComplete="email"
                      />
                    </label>

                    <label className="field-label" htmlFor="contact-phone">
                      Contact number
                      <input
                        id="contact-phone"
                        name="phone"
                        type="tel"
                        maxLength={20}
                        required
                        value={form.phone}
                        onChange={update}
                        placeholder="+91 98765 43210"
                        autoComplete="tel"
                      />
                    </label>

                    <label className="field-label" htmlFor="contact-interest">
                      Program you're interested in
                      <select id="contact-interest" name="interest" value={form.interest} onChange={update}>
                        <option>MERN Stack Development</option>
                        <option>Python Development</option>
                        <option>Frontend Engineering</option>
                        <option>Backend with Node.js</option>
                        <option>Not sure yet</option>
                      </select>
                    </label>

                    <label className="field-label" htmlFor="contact-message">
                      Anything you'd like us to know? <span className="optional-label">OPTIONAL</span>
                      <textarea
                        id="contact-message"
                        name="message"
                        maxLength={1000}
                        value={form.message}
                        onChange={update}
                        placeholder="Tell us what you'd like to build..."
                        rows="4"
                      />
                    </label>

                    {error && <p className="form-error" role="alert">{error}</p>}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="button button-primary submit-button"
                      style={isSubmitting ? { opacity: 0.8, cursor: 'not-allowed' } : undefined}
                    >
                      {isSubmitting ? (
                        <>
                          Sending application... <Loader2 size={16} className="spin-loader" />
                        </>
                      ) : (
                        <>
                          Send your message <Send size={16} />
                        </>
                      )}
                    </button>
                    <small className="form-privacy">Your details are only used to respond to your inquiry.</small>
                  </form>
                )}
              </div>
            </Reveal>
          </div>

          {/* Dedicated Campus Interactive Map Showcase */}
          <div className="campus-map-section">
            <Reveal delay={0.16}>
              <div className="campus-map-card">
                <div className="campus-map-header">
                  <div>
                    <span className="eyebrow">ACADEMY CAMPUS & LABS</span>
                    <h2>Visit ASTRA AI Academy</h2>
                    <p>Join us at Unicorn's Coworking Space in Trivandrum for collaborative developer sessions, mentor counseling, and hands-on project reviews.</p>
                  </div>
                  <a
                    href={MAPS_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="button button-primary map-hero-button"
                  >
                    Open in Google Maps <ArrowUpRight size={16} />
                  </a>
                </div>

                <div className="campus-map-embed-wrapper">
                  <iframe
                    title="ASTRA AI Academy @ Unicorn's Coworking Space Trivandrum"
                    src={MAP_EMBED_SRC}
                    width="100%"
                    height="420"
                    loading="lazy"
                    allowFullScreen=""
                    referrerPolicy="strict-origin-when-cross-origin"
                  />
                </div>

                <div className="campus-info-grid">
                  <div className="campus-info-card">
                    <div className="campus-info-icon"><MapPin size={18} /></div>
                    <div>
                      <strong>Full Address</strong>
                      <p>2nd Floor, CPS Plaza, Venpalavattom, Thiruvananthapuram, Kerala 695029</p>
                    </div>
                  </div>

                  <div className="campus-info-card">
                    <div className="campus-info-icon"><Clock size={18} /></div>
                    <div>
                      <strong>Visiting & Lab Hours</strong>
                      <p>Monday – Saturday: 9:00 AM – 5:00 PM<br /><small>Sunday: Prior appointment only</small></p>
                    </div>
                  </div>

                  <div className="campus-info-card">
                    <div className="campus-info-icon"><Compass size={18} /></div>
                    <div>
                      <strong>Location & Access</strong>
                      <p><b>Trivandrum City Centre</b><br /><small>Readily accessible with visitor parking available</small></p>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  )
}