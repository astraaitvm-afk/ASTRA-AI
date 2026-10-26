import { Suspense, lazy, useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Route, Routes, useLocation } from 'react-router-dom'
import { Analytics } from '@vercel/analytics/react'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import CursorGlow from './components/CursorGlow.jsx'
import TechBackground from './components/TechBackground.jsx'
import WhatsAppButton from './components/WhatsAppButton.jsx'
import Home from './pages/Home.jsx'

// Code splitting: Lazy load secondary routes to optimize initial bundle size & LCP
const Courses = lazy(() => import('./pages/Courses.jsx'))
const About = lazy(() => import('./pages/About.jsx'))
const Contact = lazy(() => import('./pages/Contact.jsx'))

// Secure theme validator (prevents arbitrary injection into DOM dataset)
function getSanitizedTheme() {
  try {
    const saved = localStorage.getItem('astra-theme')
    return saved === 'light' ? 'light' : 'dark'
  } catch {
    return 'dark'
  }
}

const PAGE_TITLES = {
  '/': 'ASTRA AI — Build What Comes Next',
  '/courses': 'Courses & Programs | ASTRA AI Academy',
  '/about': 'About Us & Learning Philosophy | ASTRA AI Academy',
  '/contact': 'Contact & Admissions | ASTRA AI Academy',
}

export default function App() {
  const [theme, setTheme] = useState(getSanitizedTheme)
  const location = useLocation()
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    const safeTheme = theme === 'light' ? 'light' : 'dark'
    document.documentElement.dataset.theme = safeTheme
    try {
      localStorage.setItem('astra-theme', safeTheme)
    } catch {
      // Handle private browsing or storage quota errors safely
    }
  }, [theme])

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' })
    document.title = PAGE_TITLES[location.pathname] || 'ASTRA AI — Build What Comes Next'
  }, [location.pathname, reduceMotion])

  return (
    <div className="app-shell">
      <TechBackground />
      <CursorGlow />
      <Header theme={theme} onToggleTheme={() => setTheme(prev => (prev === 'dark' ? 'light' : 'dark'))} />
      <AnimatePresence mode="wait">
        <motion.main
          key={location.pathname}
          initial={reduceMotion ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduceMotion ? {} : { opacity: 0, y: -8 }}
          transition={{ duration: 0.24, ease: 'easeOut' }}
        >
          <Suspense fallback={<div className="page-loading-skeleton" aria-label="Loading page..." />}>
            <Routes location={location}>
              <Route path="/" element={<Home />} />
              <Route path="/courses" element={<Courses />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="*" element={<Home />} />
            </Routes>
          </Suspense>
        </motion.main>
      </AnimatePresence>
      <Footer />
      <WhatsAppButton />
      <Analytics />
    </div>
  )
}