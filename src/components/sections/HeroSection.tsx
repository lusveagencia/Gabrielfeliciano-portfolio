'use client'

import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { HiBadge } from '@/components/HiBadge'
import { useTranslations } from 'next-intl'

export function HeroSection() {
  const t = useTranslations('hero')
  const tc = useTranslations('common')
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
              fontSize: 'clamp(20px, 1.8vw, 28px)',
              fontWeight: 500,
              letterSpacing: '0.05em',
              lineHeight: 1,
              left: '0.15em',
              bottom: '100%',
              marginBottom: '6px',
            }}
          >
            {t('name')}
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
            {t('title1')}
          </span>
        </div>

        {/* Photo — center (asymmetric: tighter on DESIGNER side) */}
        <div ref={photoRef} className="relative flex-shrink-0" style={{ marginLeft: 'clamp(12px, 1.5vw, 20px)', marginRight: 'clamp(4px, 0.5vw, 8px)' }}>
          <div
            data-hero-photo
            className="overflow-hidden rounded-3xl"
            style={{
              width: 'clamp(300px, 30vw, 400px)',
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

          {/* Hi Badge — lives in CardFlutuante on desktop, only show on mobile */}
          <div ref={badgeRef} className="absolute md:hidden" style={{ bottom: -40, left: -40 }}>
            <HiBadge text={tc('hi')} />
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
            {t('title2')}
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
            {t('subtitle')}
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
          {t('name')}
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
          {t('title1')}
          <br />
          {t('title2')}
        </h1>

        {/* Photo */}
        <div className="relative">
          <div
            className="overflow-hidden rounded-3xl"
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
            />
          </div>

          {/* Hi Badge mobile */}
          <div className="absolute" style={{ bottom: -40, left: -40 }}>
            <HiBadge text={tc('hi')} />
          </div>
        </div>

        {/* Subtitle */}
        <p
          className="mt-2 max-w-xs text-center text-base"
          style={{ color: 'var(--color-text-secondary)' }}
        >
          {t('subtitle')}
        </p>
      </div>
    </section>
  )
}
