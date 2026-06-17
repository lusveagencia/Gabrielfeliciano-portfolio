'use client'

import { useRef, useEffect } from 'react'
import { DotLottieReact } from '@lottiefiles/dotlottie-react'
import gsap from 'gsap'

interface HiBadgeProps {
  className?: string
  size?: number
  text?: string
}

export function HiBadge({ className = '', size = 120, text = 'Hi' }: HiBadgeProps) {
  const lottieSize = Math.round(size * 0.55)
  const hiRef = useRef<HTMLSpanElement>(null)
  const waveRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const hi = hiRef.current
    const wave = waveRef.current
    if (!hi || !wave) return

    // Use pixel offset equal to container size to fully push out of view
    const offset = size

    gsap.set(hi, { y: 0, opacity: 1 })
    gsap.set(wave, { y: offset, opacity: 0 })

    const tl = gsap.timeline({ repeat: -1, repeatDelay: 2 })

    // Step 1: Hi rolls UP out, wave rolls UP in
    tl.to(hi, { y: -offset, opacity: 0, duration: 0.45, ease: 'power2.inOut' }, 0)
    tl.to(wave, { y: 0, opacity: 1, duration: 0.45, ease: 'power2.inOut' }, 0)

    // Pause on wave
    tl.to({}, { duration: 2 })

    // Step 2: Wave rolls DOWN out, Hi rolls DOWN in
    tl.to(wave, { y: offset, opacity: 0, duration: 0.45, ease: 'power2.inOut' })
    tl.to(hi, { y: 0, opacity: 1, duration: 0.45, ease: 'power2.inOut' }, '<')

    return () => { tl.kill() }
  }, [size])

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden rounded-full ${className}`}
      style={{
        width: size,
        height: size,
        backgroundColor: 'var(--color-primary)',
      }}
    >
      {/* Centered content area */}
      <div className="absolute inset-0 flex items-center justify-center">
        <span
          ref={hiRef}
          style={{
            color: 'var(--color-neutral-950)',
            fontFamily: 'var(--font-heading)',
            fontSize: size * 0.28,
            fontWeight: 700,
            letterSpacing: '-0.02em',
          }}
        >
          {text}
        </span>
      </div>

      <div className="absolute inset-0 flex items-center justify-center">
        <div
          ref={waveRef}
          style={{ width: lottieSize, height: lottieSize }}
        >
          <DotLottieReact
            src="/hand-wave.lottie"
            loop
            autoplay
            width={lottieSize}
            height={lottieSize}
          />
        </div>
      </div>
    </div>
  )
}
