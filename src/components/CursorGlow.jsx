import { useEffect, useRef } from 'react'

export default function CursorGlow() {
  const glowRef = useRef(null)

  useEffect(() => {
    const finePointer = window.matchMedia('(pointer: fine)').matches
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!finePointer || reduced || !glowRef.current) return

    const glowEl = glowRef.current
    let rafId = null

    const move = (e) => {
      if (rafId) cancelAnimationFrame(rafId)
      rafId = requestAnimationFrame(() => {
        glowEl.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`
      })
    }

    window.addEventListener('pointermove', move, { passive: true })
    return () => {
      window.removeEventListener('pointermove', move)
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [])

  return <div ref={glowRef} className="cursor-glow" aria-hidden="true" />
}