import { ArrowUpRight, Clock3, Sparkles, Code2 } from 'lucide-react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

export default function CourseCard({ course, index = 0 }) {
  return (
    <motion.article className={`course-card accent-${course.accent}`} whileHover={{ y: -7 }} transition={{ duration: 0.22 }}>
      {course.image && (
        <div className="course-card-image">
          <img src={course.image} alt={course.title} loading="lazy" decoding="async" />
        </div>
      )}
      <div className="course-card-content">
        <div className="course-card-top">
          <span className="course-icon">
            {course.iconImg
              ? <img src={course.iconImg} alt={course.title + ' icon'} className="course-icon-img" loading="lazy" decoding="async" />
              : <Code2 size={22} />}
          </span>
          {course.featured && <span className="popular-tag"><Sparkles size={12} /> POPULAR</span>}
        </div>
        <span className="eyebrow">{course.category}</span>
        <h3>{course.title}</h3>
        <p>{course.description}</p>
        <div className="course-meta"><span><Clock3 size={14} /> {course.duration}</span><span>{course.level}</span></div>
        <div className="skill-list">{course.skills.map(skill => <span key={skill}>{skill}</span>)}</div>
        <Link to="/contact" className="course-link">Explore course <ArrowUpRight size={16} /></Link>
      </div>
    </motion.article>
  )
}