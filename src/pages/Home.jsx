import { ArrowDownRight, ArrowRight, ArrowUpRight, Code2, GraduationCap, Layers3, Sparkles, Terminal, Workflow } from 'lucide-react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Reveal from '../components/Reveal.jsx'
import CourseMarquee from '../components/CourseMarquee.jsx'

const steps = [
  { n: '01', title: 'Learn the foundations', text: 'Build a strong base with guided lessons, mentor support, and a clear learning path.', icon: GraduationCap },
  { n: '02', title: 'Build real projects', text: 'Turn concepts into portfolio-ready projects that demonstrate how you think and build.', icon: Code2 },
  { n: '03', title: 'Grow with confidence', text: 'Practice collaboration, code reviews, and interview skills that prepare you for the next step.', icon: Workflow },
]

export default function Home() {
  return (
    <>
      {/* 1. Hero Section */}
      <section className="hero section-pad">
        <div className="hero-grid container">
          <div className="hero-copy">
            <motion.div className="pill-label" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
              <span className="live-dot" /> THE FUTURE IS BUILT, NOT WAITED FOR
            </motion.div>
            <motion.h1 initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.16, duration: 0.65 }}>
              Turn curiosity<br />into <span className="gradient-text">capability.</span>
            </motion.h1>
            <motion.p className="hero-description" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25, duration: 0.6 }}>
              Learn to build the digital world with practical, mentor-guided programs in web development, MERN Stack, and Python.
            </motion.p>
            <motion.div className="hero-actions" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.34 }}>
              <Link to="/courses" className="button button-primary">Explore programs <ArrowUpRight size={17} /></Link>
              <Link to="/about" className="text-link">Discover ASTRA <ArrowRight size={16} /></Link>
            </motion.div>
            <motion.div className="hero-proof" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.55 }}>
              <div className="avatar-stack"><span>A</span><span>S</span><span>T</span><span>+</span></div>
              <div><strong>Made for future builders</strong><small>Learn by doing. Grow by building.</small></div>
            </motion.div>
          </div>
          <motion.div className="hero-visual" initial={{ opacity: 0, scale: 0.94, rotate: 1.5 }} animate={{ opacity: 1, scale: 1, rotate: 0 }} transition={{ duration: 0.85, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}>
            <div className="visual-orbit orbit-one" /><div className="visual-orbit orbit-two" />
            <div className="visual-core"><div className="core-star">✳</div><span>ASTRA</span><small>BUILD YOUR NEXT</small></div>
            <div className="float-card code-float"><div className="mini-window"><i /><i /><i /></div><code><span>const</span> future = <b>you.build()</b>;</code><div className="code-status"><span /> compiled with purpose</div></div>
            <div className="float-card stack-float"><div className="stack-icon"><Layers3 size={19} /></div><div><b>Full-stack thinking</b><small>Frontend → Backend → Beyond</small></div></div>
            <div className="float-card progress-float"><span className="progress-ring">↗</span><div><b>Learn by building</b><small>One project at a time</small></div></div>
            <div className="visual-caption"><span>01 / YOUR JOURNEY</span><span>SCROLL TO EXPLORE <ArrowDownRight size={14} /></span></div>
          </motion.div>
        </div>
        <div className="hero-bottom container">
          <span>YOUR IDEAS DESERVE TO EXIST</span>
          <div className="hero-line" />
          <span>SCROLL TO BEGIN <ArrowDownRight size={14} /></span>
        </div>
      </section>

      {/* 2. Trust Strip */}
      <section className="trust-strip">
        <div className="container trust-inner">
          <span>SKILLS THAT MOVE YOU FORWARD</span>
          <b><Code2 size={18} /> CODE WITH PURPOSE</b>
          <b><Terminal size={18} /> THINK IN SYSTEMS</b>
          <b><Sparkles size={18} /> CREATE WHAT'S NEXT</b>
        </div>
      </section>

      {/* 3. Courses Marquee Showcase (Full-Bleed Edge-to-Edge) */}
      <section className="section-pad section-block">
        <div className="container">
          <Reveal>
            <div className="section-heading">
              <div>
                <span className="eyebrow">THE LEARNING PATH</span>
                <h2>Skills for a world<br />that never <span className="gradient-text">stands still.</span></h2>
              </div>
              <p>From your first line of code to shipping complete applications, learn with a path designed around doing—not just watching.</p>
            </div>
          </Reveal>
        </div>

        {/* Full-bleed track stretching edge-to-edge */}
        <div className="marquee-full-bleed">
          <CourseMarquee />
        </div>

        <div className="container">
          <Reveal>
            <div className="center-action">
              <Link to="/courses" className="button button-outline">
                View all programs <ArrowRight size={16} />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 4. Method Section */}
      <section className="section-pad method-section">
        <div className="container method-layout">
          <Reveal>
            <div className="method-intro">
              <span className="eyebrow">A BETTER WAY TO LEARN</span>
              <h2>Understand it.<br /><span className="gradient-text">Build it.</span> Own it.</h2>
              <p>Real confidence comes from making things work, solving problems, and learning how to find your way when the answer isn't obvious.</p>
              <Link to="/about" className="text-link">Our learning philosophy <ArrowUpRight size={16} /></Link>
            </div>
          </Reveal>
          <div className="steps-list">
            {steps.map((step, i) => (
              <Reveal key={step.n} delay={i * 0.1}>
                <div className="step-item">
                  <span className="step-number">{step.n}</span>
                  <div className="step-icon"><step.icon size={20} /></div>
                  <div className="step-copy">
                    <h3>{step.title}</h3>
                    <p>{step.text}</p>
                  </div>
                  <ArrowUpRight className="step-arrow" size={18} />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 5. CTA Section (Clean Nested Panel inside Fluid Container) */}
      <section className="section-pad cta-section">
        <div className="container">
          <Reveal>
            <div className="cta-panel">
              <div className="cta-orb" />
              <span className="eyebrow">YOUR NEXT CHAPTER STARTS HERE</span>
              <h2>Have an idea?<br /><span className="gradient-text">Let's build it.</span></h2>
              <p>Find the right learning path and take your first step toward creating something real.</p>
              <Link to="/contact" className="button button-primary">
                Talk to our team <ArrowUpRight size={17} />
              </Link>
              <span className="cta-index">ASTRA AI / 2026</span>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}