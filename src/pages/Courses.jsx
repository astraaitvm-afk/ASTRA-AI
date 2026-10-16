import { useMemo, useState } from 'react'
import { Search, SlidersHorizontal, ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import Reveal from '../components/Reveal.jsx'
import CourseCard from '../components/CourseCard.jsx'
import { courses } from '../data/courses.js'

export default function Courses() {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('All programs')
  const categories = ['All programs', ...new Set(courses.map(course => course.category))]
  const filtered = useMemo(() => courses.filter(course => {
    const matchesCategory = category === 'All programs' || course.category === category
    const haystack = `${course.title} ${course.description} ${course.skills.join(' ')}`.toLowerCase()
    return matchesCategory && haystack.includes(query.toLowerCase())
  }), [query, category])

  return <div className="page-wrap">
    <section className="page-hero section-pad"><div className="container">
      <Reveal><span className="eyebrow">EXPLORE THE POSSIBILITIES</span><h1>Choose your next<br /><span className="gradient-text">big skill.</span></h1><p>Practical programs for curious minds, career switchers, and future software builders.</p></Reveal>
      <Reveal delay={0.12}><div className="course-toolbar"><label className="search-box"><Search size={18} /><input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search courses or skills..." aria-label="Search courses" /></label><div className="filter-label"><SlidersHorizontal size={16} /> Filter by</div><div className="category-tabs">{categories.map(item => <button key={item} className={category === item ? 'active' : ''} onClick={() => setCategory(item)}>{item}</button>)}</div></div></Reveal>
      <div className="course-grid page-course-grid">{filtered.map((course, i) => <Reveal key={course.id} delay={i * 0.04} className="course-grid-item"><CourseCard course={course} index={i} /></Reveal>)}</div>
      {filtered.length === 0 && <div className="empty-state"><h3>No programs found</h3><p>Try another search term or choose a different category.</p><button className="button button-outline" onClick={() => { setQuery(''); setCategory('All programs') }}>Reset filters</button></div>}
    </div></section>
    <section className="section-pad"><div className="container"><div className="inline-cta"><div><span className="eyebrow">NOT SURE WHERE TO START?</span><h2>We'll help you find your path.</h2><p>Tell us what you want to create. We'll help you choose a program that fits.</p></div><Link to="/contact" className="button button-primary">Talk to an advisor <ArrowUpRight size={16} /></Link></div></div></section>
  </div>
}