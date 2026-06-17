'use client'

import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { HiBadge } from '@/components/HiBadge'

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const nameRef = useRef<HTMLParagraphElement>(null)
  const digitalRef = useRef<HTMLSpanElement>(null)
  const designerRef = useRef<HTMLSpanElement>(null)
  const photoRef = useRef<HTMLDivElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const badgeRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Name: fade in + translateY
      gsap.from(nameRef.current, {
        y: 20,
        opacity: 0,
        duration: 0.8,
        delay: 0,
        ease: 'power3.out',
      })
      // 2. DIGITAL: slide in from left
      gsap.from(digitalRef.current, {
        x: -50,
        opacity: 0,
        duration: 0.8,
        delay: 0.2,
        ease: 'power3.out',
      })
      // 3. DESIGNER: slide in from right
      gsap.from(designerRef.current, {
        x: 50,
        opacity: 0,
        duration: 0.8,
        delay: 0.2,
        ease: 'power3.out',
      })
      // 4. Photo: scale up + fade
      gsap.from(photoRef.current, {
        scale: 0.8,
        opacity: 0,
        duration: 0.8,
        delay: 0.3,
        ease: 'power3.out',
      })
      // 5. Subtitle: fade in + translateY
      gsap.from(subtitleRef.current, {
        y: 20,
        opacity: 0,
        duration: 0.8,
        delay: 0.5,
        ease: 'power3.out',
      })
      // 6. Badge: bounce in
      gsap.from(badgeRef.current, {
        scale: 0,
        duration: 0.6,
        delay: 0.6,
        ease: 'back.out(1.7)',
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative flex min-h-screen items-center justify-center px-6 py-20 md:px-12 lg:px-20"
    >
      {/* ===== DESKTOP LAYOUT ===== */}
      <div className="hidden w-full max-w-7xl items-center justify-center md:flex">
        {/* Left: DIGITAL (name is absolute, doesn't affect alignment) */}
        <div className="relative">
          <p
            ref={nameRef}
            className="font-heading absolute uppercase"
            style={{
              color: 'var(--color-text-secondary)',
              fontSize: 'clamp(16px, 1.5vw, 22px)',
              fontWeight: 400,
              letterSpacing: '0.05em',
              lineHeight: 1,
              left: '0.15em',
              bottom: '100%',
              marginBottom: '6px',
            }}
          >
            GABRIEL FELICIANO
          </p>
          <span
            ref={digitalRef}
            className="font-heading font-bold uppercase"
            style={{
              fontSize: 'clamp(60px, 8vw, 120px)',
              letterSpacing: '-0.02em',
              lineHeight: 1,
              color: 'var(--color-text-primary)',
              display: 'block',
            }}
          >
            DIGITAL
          </span>
        </div>

        {/* Photo — center */}
        <div ref={photoRef} className="relative mx-5 flex-shrink-0 lg:mx-8">
          <div
            className="overflow-hidden rounded-3xl"
            style={{
              width: 'clamp(280px, 25vw, 344px)',
              aspectRatio: '344/479',
              backgroundColor: 'var(--color-surface-raised)',
              boxShadow: 'var(--shadow-lg)',
              border: '1px solid var(--color-border)',
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/hero-photo.jpg"
              alt="Gabriel Feliciano"
              className="h-full w-full object-cover"
            />
          </div>

          {/* Hi Badge */}
          <div ref={badgeRef} className="absolute -bottom-4 -left-4">
            <HiBadge />
          </div>
        </div>

        {/* Right: DESIGNER (subtitle is absolute, doesn't affect alignment) */}
        <div className="relative">
          <span
            ref={designerRef}
            className="font-heading font-bold uppercase"
            style={{
              fontSize: 'clamp(60px, 8vw, 120px)',
              letterSpacing: '-0.02em',
              lineHeight: 1,
              color: 'var(--color-text-primary)',
              display: 'block',
            }}
          >
            DESIGNER
          </span>
          <p
            ref={subtitleRef}
            className="absolute max-w-xs text-right text-base md:text-lg"
            style={{
              color: 'var(--color-text-secondary)',
              right: 0,
              top: '100%',
              marginTop: '12px',
            }}
          >
            I&apos;m a Brazil-based digital designer and Framer developer
          </p>
        </div>
      </div>

      {/* ===== MOBILE LAYOUT ===== */}
      <div className="flex flex-col items-center gap-6 md:hidden">
        {/* Name */}
        <p
          className="font-heading text-lg font-medium uppercase tracking-widest"
          style={{ color: 'var(--color-text-secondary)' }}
        >
          GABRIEL FELICIANO
        </p>

        {/* Title */}
        <h1
          className="font-heading text-center font-bold uppercase"
          style={{
            fontSize: 'clamp(2.5rem, 12vw, 4rem)',
            letterSpacing: '-0.02em',
            lineHeight: 1.1,
            color: 'var(--color-text-primary)',
          }}
        >
          DIGITAL
          <br />
          DESIGNER
        </h1>

        {/* Photo */}
        <div className="relative">
          <div
            className="flex items-center justify-center overflow-hidden rounded-3xl"
            style={{
              width: 220,
              aspectRatio: '3/4',
              backgroundColor: 'var(--color-surface-raised)',
              boxShadow: 'var(--shadow-md)',
              border: '1px solid var(--color-border)',
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/hero-photo.jpg"
              alt="Gabriel Feliciano"
              className="h-full w-full object-cover"
              onError={(e) => {
                e.currentTarget.style.display = 'none'
              }}
            />
            <span
              className="font-heading text-lg uppercase"
              style={{ color: 'var(--color-text-muted)' }}
            >
              Photo
            </span>
          </div>

          {/* Hi Badge mobile */}
          <div className="absolute -bottom-3 -left-3">
            <HiBadge />
          </div>
        </div>

        {/* Subtitle */}
        <p
          className="mt-2 max-w-xs text-center text-base"
          style={{ color: 'var(--color-text-secondary)' }}
        >
          I&apos;m a Brazil-based digital designer and Framer developer
        </p>
      </div>
    </section>
  )
}
