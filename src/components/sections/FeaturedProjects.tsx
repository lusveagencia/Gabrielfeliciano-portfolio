'use client'

import { useRef, useEffect, useCallback } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import Link from 'next/link'

gsap.registerPlugin(ScrollTrigger)

const projectImages = [
  '/placeholder-project-1.jpg',
  '/placeholder-project-2.jpg',
  '/placeholder-project-3.jpg',
  '/placeholder-project-4.jpg',
]

export function FeaturedProjects() {
  const t = useTranslations('projects')

  const projects = [
    {
      id: 'black-geometric-prisms',
      category: t('p1_category'),
      title: t('p1_title'),
      subtitle: t('p1_subtitle'),
    },
    {
      id: 'luminous-brand-identity',
      category: t('p2_category'),
      title: t('p2_title'),
      subtitle: t('p2_subtitle'),
    },
    {
      id: 'horizon-dashboard',
      category: t('p3_category'),
      title: t('p3_title'),
      subtitle: t('p3_subtitle'),
    },
    {
      id: 'echo-mobile-app',
      category: t('p4_category'),
      title: t('p4_title'),
      subtitle: t('p4_subtitle'),
    },
  ]

  const sectionRef = useRef<HTMLElement>(null)
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])
  const cursorRef = useRef<HTMLDivElement>(null)
  const xToRef = useRef<gsap.QuickToFunc | null>(null)
  const yToRef = useRef<gsap.QuickToFunc | null>(null)

  const setCardRef = useCallback(
    (index: number) => (el: HTMLDivElement | null) => {
      cardsRef.current[index] = el
    },
    []
  )

  useEffect(() => {
    const canHover = window.matchMedia('(hover: hover)').matches

    const stickyTop = 80 // matches sticky top-20 (80px)

    const ctx = gsap.context(() => {
      // Zoom-out + darken + slide down: starts immediately when card is sticky
      cardsRef.current.forEach((card, i) => {
        if (i >= projects.length - 1 || !card) return

        gsap.fromTo(card,
          { scale: 1, y: 0, filter: 'brightness(1)' },
          {
            scale: 0.85,
            y: 40,
            filter: 'brightness(0.6)',
            ease: 'none',
            scrollTrigger: {
              trigger: card,
              start: () => `top ${stickyTop}px`,
              end: () => `bottom ${stickyTop}px`,
              scrub: true,
            },
          }
        )
      })

      // Custom cursor (desktop only)
      if (canHover && cursorRef.current) {
        gsap.set(cursorRef.current, { xPercent: -50, yPercent: -50 })
        xToRef.current = gsap.quickTo(cursorRef.current, 'left', {
          duration: 0.4,
          ease: 'power3.out',
        })
        yToRef.current = gsap.quickTo(cursorRef.current, 'top', {
          duration: 0.4,
          ease: 'power3.out',
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [projects.length])

  const handleMouseEnter = useCallback(() => {
    if (!cursorRef.current) return
    gsap.to(cursorRef.current, {
      scale: 1,
      opacity: 1,
      duration: 0.15,
      ease: 'power2.out',
    })
  }, [])

  const handleMouseLeave = useCallback(() => {
    if (!cursorRef.current) return
    gsap.to(cursorRef.current, {
      scale: 0,
      opacity: 0,
      duration: 0.15,
      ease: 'power2.in',
    })
  }, [])

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    xToRef.current?.(e.clientX)
    yToRef.current?.(e.clientY)
  }, [])

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative px-6 py-24 md:px-12 lg:px-20"
    >
      {/* Header */}
      <div className="mx-auto mb-16 max-w-7xl">
        <h2
          className="font-heading mb-4 text-3xl font-bold uppercase md:text-4xl"
          style={{
            color: 'var(--color-text-primary)',
            letterSpacing: '-0.02em',
          }}
        >
          {t('title')}
        </h2>
        <p
          className="max-w-2xl text-base"
          style={{ color: 'var(--color-text-secondary)' }}
        >
          {t('subtitle')}
        </p>
      </div>

      {/* Stacked Cards */}
      <div className="mx-auto max-w-7xl">
        {projects.map((project, index) => (
          <div
            key={project.id}
            ref={setCardRef(index)}
            className="sticky top-20 mb-6 overflow-hidden rounded-3xl"
            style={{
              zIndex: index + 1,
              height: '80vh',
              willChange: 'transform',
              backgroundColor: 'var(--color-neutral-800)',
            }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onMouseMove={handleMouseMove}
          >
            <Link
              href={`/projects/${project.id}`}
              className="relative block h-full w-full"
            >
              {/* Background image */}
              <Image
                src={projectImages[index]}
                alt={project.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 1280px"
              />

              {/* Dark gradient overlay */}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0.1) 100%)',
                }}
              />

              {/* Content */}
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 px-6 text-center">
                {/* Category badge */}
                <span
                  className="rounded-full px-4 py-1.5 text-xs font-medium"
                  style={{
                    backgroundColor: 'var(--color-primary)',
                    color: 'var(--color-neutral-950)',
                  }}
                >
                  {project.category}
                </span>

                {/* Title */}
                <h3
                  className="font-heading text-4xl font-bold uppercase text-white md:text-5xl"
                  style={{
                    textShadow: '0 2px 20px rgba(0,0,0,0.4)',
                    letterSpacing: '-0.02em',
                  }}
                >
                  {project.title}
                </h3>

                {/* Subtitle */}
                <p className="max-w-md text-base text-white/70">
                  {project.subtitle}
                </p>
              </div>
            </Link>
          </div>
        ))}
      </div>

      {/* Browse All Projects button */}
      <div className="mx-auto mt-16 max-w-7xl text-center">
        <Link
          href="/projects"
          className="btn-fill-hover inline-block cursor-pointer rounded-full font-bold"
          style={{
            border: '2px solid var(--color-primary)',
            padding: 'var(--space-3) var(--space-8)',
            color: 'var(--color-primary)',
          }}
        >
          <span
            className="font-heading text-sm font-bold uppercase"
            style={{ color: 'inherit' }}
          >
            {t('browse_all')}
          </span>
        </Link>
      </div>

      {/* Custom cursor */}
      <div
        ref={cursorRef}
        className="pointer-events-none fixed z-50 flex items-center justify-center rounded-full"
        style={{
          width: 64,
          height: 64,
          backgroundColor: 'var(--color-primary)',
          opacity: 0,
          willChange: 'transform, opacity',
          top: -64,
          left: -64,
        }}
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="var(--color-neutral-950)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="7" y1="17" x2="17" y2="7" />
          <polyline points="7 7 17 7 17 17" />
        </svg>
      </div>
    </section>
  )
}
