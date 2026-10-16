import { ArrowUpRight, Compass, HeartHandshake, Lightbulb, Rocket, Target } from 'lucide-react'
import { Link } from 'react-router-dom'
import Reveal from '../components/Reveal.jsx'

const values = [
  { icon: Lightbulb, title: 'Curiosity first', text: 'Ask better questions, explore ideas, and understand the why behind the code.' },
  { icon: Rocket, title: 'Practice over theory', text: 'Turn concepts into projects, and projects into proof of what you can do.' },
  { icon: HeartHandshake, title: 'Progress together', text: 'Learn with guidance, feedback, and a community that helps you keep moving.' },
]

export default function About() {
  return <div className="page-wrap">
    <section className="page-hero about-hero section-pad"><div className="container about-hero-grid">
      <Reveal><span className="eyebrow">WHO WE ARE</span><h1>Education for<br />the <span className="gradient-text">makers.</span></h1><p>ASTRA AI is a learning space for people who want to understand technology deeply and use it to make useful things for the world.</p><Link to="/courses" className="button button-primary">Explore our programs <ArrowUpRight size={16} /></Link></Reveal>
      <Reveal delay={0.14}><div className="about-art"><div className="about-art-ring ring-a" /><div className="about-art-ring ring-b" /><div className="about-art-center"><span>✳</span><b>LEARN</b><small>THEN CREATE</small></div><div className="art-note note-one"><Compass size={16} /> Find your direction</div><div className="art-note note-two"><Target size={16} /> Build with intention</div></div></Reveal>
    </div></section>
    <section className="section-pad"><div className="container story-grid"><Reveal><span className="eyebrow">OUR BELIEF</span><h2>Technology is a tool.<br /><span className="gradient-text">Your imagination</span><br />is the advantage.</h2></Reveal><Reveal delay={0.1}><div className="story-copy"><p>Learning to code should be more than memorizing syntax. It should help you break down problems, work through uncertainty, and bring your ideas to life.</p><p>That's why ASTRA AI focuses on a practical learning experience: strong fundamentals, real projects, thoughtful feedback, and the confidence to keep improving.</p><div className="quote-mark">“</div><blockquote>Don't just learn how the digital world works. Learn how to shape it.</blockquote></div></Reveal></div></section>
    <section className="section-pad values-section"><div className="container"><Reveal><div className="section-heading"><div><span className="eyebrow">WHAT GUIDES US</span><h2>Learning with<br /><span className="gradient-text">purpose.</span></h2></div><p>Every part of the experience is designed to help students move from understanding to independent problem-solving.</p></div></Reveal><div className="values-grid">{values.map((value, i) => <Reveal key={value.title} delay={i * 0.08}><article className="value-card"><div className="value-icon"><value.icon size={21} /></div><span className="value-index">0{i + 1}</span><h3>{value.title}</h3><p>{value.text}</p></article></Reveal>)}</div></div></section>
    <section className="section-pad"><div className="container inline-cta"><div><span className="eyebrow">READY TO BEGIN?</span><h2>Your future is a skill away.</h2><p>Start with a conversation about where you want to go.</p></div><Link to="/contact" className="button button-primary">Get in touch <ArrowUpRight size={16} /></Link></div></section>
  </div>
}