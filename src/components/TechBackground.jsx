import { useEffect, useRef } from 'react'

export default function TechBackground() {
  const canvasRef = useRef(null)
  const containerRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d', { alpha: true })
    if (!ctx) return

    let animationId
    let isPaused = false
    let resizeRaf = null

    let width = (canvas.width = window.innerWidth)
    let height = (canvas.height = window.innerHeight)

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const speedFactor = prefersReducedMotion ? 0.2 : 1.0
    const colors = ['#8b72e5', '#5ee0b4', '#7eb8ff', '#a68cff']
    const createParticles = (particleWidth, particleHeight) => {
      const minNodeCount = particleWidth < 480 ? 28 : 50
      const nodeCount = Math.min(Math.max(Math.floor((particleWidth * particleHeight) / 16000), minNodeCount), 105)

      return Array.from({ length: nodeCount }, () => ({
        x: Math.random() * particleWidth,
        y: Math.random() * particleHeight,
        vx: (Math.random() - 0.5) * 0.45 * speedFactor,
        vy: (Math.random() - 0.5) * 0.45 * speedFactor,
        radius: Math.random() * 2.2 + 1.2,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: Math.random() * 0.45 + 0.45,
      }))
    }
    let particles = createParticles(width, height)

    const handleResize = () => {
      if (resizeRaf) cancelAnimationFrame(resizeRaf)
      resizeRaf = requestAnimationFrame(() => {
        if (!canvas) return
        width = canvas.width = window.innerWidth
        height = canvas.height = window.innerHeight
        particles = createParticles(width, height)
      })
    }
    window.addEventListener('resize', handleResize, { passive: true })

    // Mouse tracking for physics & interactive connections
    const mouse = {
      x: -1000,
      y: -1000,
      isHovered: false,
    }

    const handlePointerMove = (e) => {
      mouse.x = e.clientX
      mouse.y = e.clientY
      mouse.isHovered = true
    }

    const handlePointerLeave = () => {
      mouse.isHovered = false
      mouse.x = -1000
      mouse.y = -1000
    }

    const handlePointerEnter = () => {
      mouse.isHovered = true
    }

    window.addEventListener('pointermove', handlePointerMove, { passive: true })
    window.addEventListener('mouseleave', handlePointerLeave, { passive: true })
    window.addEventListener('mouseenter', handlePointerEnter, { passive: true })

    // Precomputed squared distances to eliminate thousands of Math.sqrt operations
    const maxLineDist = 145
    const maxLineDistSq = maxLineDist * maxLineDist

    const mouseTetherDist = 175
    const mouseTetherDistSq = mouseTetherDist * mouseTetherDist

    const mouseRepelDist = 115
    const mouseRepelDistSq = mouseRepelDist * mouseRepelDist

    const render = () => {
      if (isPaused) return

      ctx.clearRect(0, 0, width, height)

      // 1. Inter-particle hairline vector lines (Optimized with squared distance)
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i]
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j]
          const dx = p1.x - p2.x
          const dy = p1.y - p2.y
          const distSq = dx * dx + dy * dy

          if (distSq < maxLineDistSq) {
            const dist = Math.sqrt(distSq)
            const lineOpacity = (1 - dist / maxLineDist) * 0.32
            ctx.strokeStyle = `rgba(139, 114, 229, ${lineOpacity})`
            ctx.lineWidth = 0.85
            ctx.beginPath()
            ctx.moveTo(p1.x, p1.y)
            ctx.lineTo(p2.x, p2.y)
            ctx.stroke()
          }
        }
      }

      // 2. Cursor Tethering Lines
      if (mouse.isHovered) {
        for (let i = 0; i < particles.length; i++) {
          const p = particles[i]
          const dx = mouse.x - p.x
          const dy = mouse.y - p.y
          const distSq = dx * dx + dy * dy

          if (distSq < mouseTetherDistSq) {
            const dist = Math.sqrt(distSq)
            const tetherOpacity = (1 - dist / mouseTetherDist) * 0.72
            const grad = ctx.createLinearGradient(p.x, p.y, mouse.x, mouse.y)
            grad.addColorStop(0, `rgba(139, 114, 229, ${tetherOpacity})`)
            grad.addColorStop(1, `rgba(94, 224, 180, ${tetherOpacity * 1.15})`)

            ctx.strokeStyle = grad
            ctx.lineWidth = 1.15
            ctx.beginPath()
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(mouse.x, mouse.y)
            ctx.stroke()

            // Highlight connected node
            ctx.fillStyle = '#5ee0b4'
            ctx.globalAlpha = tetherOpacity
            ctx.beginPath()
            ctx.arc(p.x, p.y, p.radius * 1.75, 0, Math.PI * 2)
            ctx.fill()
            ctx.globalAlpha = 1.0
          }
        }

        // Draw glowing cursor center node indicator
        ctx.fillStyle = '#5ee0b4'
        ctx.beginPath()
        ctx.arc(mouse.x, mouse.y, 1.5, 0, Math.PI * 2)
        ctx.fill()
        ctx.strokeStyle = 'rgba(94, 224, 180, 0.45)'
        ctx.lineWidth = 1
        ctx.beginPath()
        ctx.arc(mouse.x, mouse.y, 3, 0, Math.PI * 2)
        ctx.stroke()
      }

      // 3. Particle Movement + Magnetic Repulsion Physics
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]

        // Soft magnetic repulsion when cursor passes through particles
        if (mouse.isHovered) {
          const dx = p.x - mouse.x
          const dy = p.y - mouse.y
          const distSq = dx * dx + dy * dy

          if (distSq < mouseRepelDistSq && distSq > 0) {
            const dist = Math.sqrt(distSq)
            const force = (1 - dist / mouseRepelDist) * 3.2
            const angle = Math.atan2(dy, dx)
            p.x += Math.cos(angle) * force
            p.y += Math.sin(angle) * force
          }
        }

        // Base velocity drift
        p.x += p.vx
        p.y += p.vy

        // Wrap around viewport edges
        if (p.x < 0) p.x = width
        if (p.x > width) p.x = 0
        if (p.y < 0) p.y = height
        if (p.y > height) p.y = 0

        // Render particle node
        ctx.fillStyle = p.color
        ctx.globalAlpha = p.alpha
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
        ctx.fill()

        // Outer glow halo for prominent nodes
        if (p.radius > 2.2) {
          ctx.globalAlpha = p.alpha * 0.35
          ctx.beginPath()
          ctx.arc(p.x, p.y, p.radius * 2.5, 0, Math.PI * 2)
          ctx.fill()
        }
      }
      ctx.globalAlpha = 1.0

      animationId = requestAnimationFrame(render)
    }

    render()

    // Battery / CPU Saver: Pause animation when user switches tabs
    const handleVisibilityChange = () => {
      if (document.hidden) {
        isPaused = true
        if (animationId) cancelAnimationFrame(animationId)
      } else {
        isPaused = false
        render()
      }
    }
    document.addEventListener('visibilitychange', handleVisibilityChange)

    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('pointermove', handlePointerMove)
      window.removeEventListener('mouseleave', handlePointerLeave)
      window.removeEventListener('mouseenter', handlePointerEnter)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      if (resizeRaf) cancelAnimationFrame(resizeRaf)
      if (animationId) cancelAnimationFrame(animationId)
    }
  }, [])

  return (
    <div ref={containerRef} className="tech-bg-container" aria-hidden="true">
      {/* Ambient Glowing Nebulae */}
      <div className="tech-bg-orb tech-bg-orb-1" />
      <div className="tech-bg-orb tech-bg-orb-2" />

      {/* Interactive Constellation / Neural Network Canvas */}
      <canvas ref={canvasRef} className="tech-bg-canvas" />

      {/* Floating Developer Glyphs drifting independently with organic CSS animations */}
      <div className="code-glyph glyph-tag-badge glyph-1">
        <span className="glyph-symbol">&lt; / &gt;</span>
      </div>

      <div className="code-glyph glyph-square-scope glyph-2" title="Object Scope">
        <span>&#123; &#125;</span>
      </div>

      <div className="code-glyph glyph-ide-snippet glyph-3">
        <span className="ide-status-dot" />
        <span className="syn-kw">const</span>
        <span className="syn-var">astra</span>
        <span className="syn-op">=</span>
        <span className="syn-kw">new</span>
        <span className="syn-cls">AI</span>
        <span className="syn-punct">();</span>
      </div>

      <div className="code-glyph glyph-fn-chip glyph-4">
        <span className="syn-arrow">=&gt;</span>
        <span className="syn-kw">async</span>
        <span className="syn-fn">run</span>
        <span className="syn-punct">()</span>
      </div>

      <div className="code-glyph glyph-square-array glyph-5" title="Tensor Matrix">
        <span>[ ]</span>
      </div>

      <div className="code-glyph glyph-term-chip glyph-6">
        <span className="term-prompt">$</span>
        <span className="term-cmd">git push origin main</span>
      </div>
    </div>
  )
}
