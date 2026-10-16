import { ArrowUpRight, Github, Instagram, Linkedin } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-top">
        <div>
          <Link className="brand footer-brand" to="/">
            <span className="brand-mark"><span /></span>
            <span className="brand-copy">ASTRA <b>AI</b><small>LEARNING, REIMAGINED</small></span>
          </Link>
          <p className="footer-intro">A launchpad for curious minds and future builders.</p>
        </div>
        <div className="footer-links">
          <div><span className="footer-label">EXPLORE</span><Link to="/courses">Courses</Link><Link to="/about">Our approach</Link><Link to="/contact">Contact</Link></div>
          <div><span className="footer-label">CONNECT</span><a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer"><Linkedin size={15} /> LinkedIn</a><a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer"><Instagram size={15} /> Instagram</a><a href="https://github.com" target="_blank" rel="noopener noreferrer"><Github size={15} /> GitHub</a></div>
        </div>
      </div>
      <div className="container footer-bottom"><span>© {new Date().getFullYear()} ASTRA AI Academy</span><span>Built for what comes next <ArrowUpRight size={14} /></span></div>
    </footer>
  )
}