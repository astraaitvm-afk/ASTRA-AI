import { ArrowUpRight, Clock3, Sparkles, Code2 } from "lucide-react"
import { Link } from "react-router-dom"
import { courses } from "../data/courses.js"

const marqueeItems = [...courses, ...courses, ...courses]

function MarqueeCard({ course }) {
  return (
    <article className={`marquee-card accent-${course.accent}`}>
      {course.image && (
        <div className="marquee-card-image">
          <img src={course.image} alt={course.title} loading="lazy" decoding="async" />
        </div>
      )}
      <div className="marquee-card-content">
        <div className="marquee-card-top">
          <span className="course-icon">
            {course.iconImg
              ? <img src={course.iconImg} alt={course.title + ' icon'} className="course-icon-img" loading="lazy" decoding="async" />
              : <Code2 size={22} />}
          </span>
          {course.featured && (
            <span className="popular-tag">
              <Sparkles size={12} /> POPULAR
            </span>
          )}
        </div>
        <span className="eyebrow">{course.category}</span>
        <h3>{course.title}</h3>
        <p>{course.description}</p>
        <div className="course-meta">
          <span><Clock3 size={14} /> {course.duration}</span>
          <span>{course.level}</span>
        </div>
        <div className="skill-list">
          {course.skills.map(skill => <span key={skill}>{skill}</span>)}
        </div>
        <Link to="/contact" className="course-link">
          Explore course <ArrowUpRight size={16} />
        </Link>
      </div>
    </article>
  )
}

export default function CourseMarquee() {
  return (
    <div className="marquee-viewport" aria-label="Available courses">
      <div className="marquee-track">
        {marqueeItems.map((course, i) => (
          <MarqueeCard key={`${course.id}-${i}`} course={course} />
        ))}
      </div>
    </div>
  )
}
