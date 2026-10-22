import { Link, NavLink } from 'react-router-dom'
import { ArrowUpRight, Menu, Moon, Sun, X } from 'lucide-react'
import { useEffect, useState } from 'react'

const navItems = [
  { label: 'Home', to: '/' },
  { label: 'Courses', to: '/courses' },
  { label: 'About us', to: '/about' },
  { label: 'Contact', to: '/contact' },
]

export default function Header({ theme, onToggleTheme }) {
  const [menuOpen, setMenuOpen] = useState(false)

  // Lock background scrolling and close on Escape key when mobile menu is open
  useEffect(() => {
    if (!menuOpen) return

    document.body.style.overflow = 'hidden'

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setMenuOpen(false)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [menuOpen])

  return (
    <header className="site-header">
      <div className="nav-wrap container">
        <Link className="brand" to="/" aria-label="ASTRA AI home" onClick={() => setMenuOpen(false)}>
          <span className="brand-mark"><span /></span>
          <span className="brand-copy">ASTRA <b>AI</b><small>LEARNING, REIMAGINED</small></span>
        </Link>
        <nav id="main-nav" className={`nav-links ${menuOpen ? 'is-open' : ''}`} aria-label="Main navigation">
          {navItems.map(item => (
            <NavLink key={item.to} to={item.to} end={item.to === '/'} onClick={() => setMenuOpen(false)}>
              {item.label}
            </NavLink>
          ))}
          <Link className="mobile-cta" to="/contact" onClick={() => setMenuOpen(false)}>Talk to an advisor <ArrowUpRight size={16} /></Link>
        </nav>
        <div className="nav-actions">
          <button className="icon-button theme-toggle" onClick={onToggleTheme} aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}>
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <Link className="button button-small button-primary desktop-cta" to="/contact">Get started <ArrowUpRight size={16} /></Link>
          <button 
            className="icon-button menu-toggle" 
            onClick={() => setMenuOpen(prev => !prev)} 
            aria-expanded={menuOpen} 
            aria-controls="main-nav"
            aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>
    </header>
  )
}