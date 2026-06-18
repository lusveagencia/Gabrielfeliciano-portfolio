'use client'

import { useRef, useEffect, useCallback } from 'react'
import gsap from 'gsap'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import Link from 'next/link'

export function BlogSection() {
  const t = useTranslations('blog')
  const sectionRef = useRef<HTMLElement>(null)
  const cursorRef = useRef<HTMLDivElement>(null)
  const xToRef = useRef<gsap.QuickToFunc | null>(null)
  const yToRef = useRef<gsap.QuickToFunc | null>(null)

  const posts = [
    {
      id: '5-design-trends-that-will-define-2024',
      category: t('p1_category'),
      date: t('p1_date'),
      title: t('p1_title'),
      excerpt: t('p1_excerpt'),
      image: '/placeholder-blog-1.jpg',
    },
    {
      id: 'how-to-streamline-your-design-workflow',
      category: t('p2_category'),
      date: t('p2_date'),
      title: t('p2_title'),
      excerpt: t('p2_excerpt'),
      image: '/placeholder-blog-2.jpg',
    },
  ]

  useEffect(() => {
    const canHover = window.matchMedia('(hover: hover)').matches
    if (!canHover || !cursorRef.current) return

    gsap.set(cursorRef.current, { xPercent: -50, yPercent: -50 })
    xToRef.current = gsap.quickTo(cursorRef.current, 'left', {
      duration: 0.4,
      ease: 'power3.out',
    })
    yToRef.current = gsap.quickTo(cursorRef.current, 'top', {
      duration: 0.4,
      ease: 'power3.out',
    })
  }, [])

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
      id="blogs"
      className="px-6 py-24 md:px-12 lg:px-20"
    >
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-16 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
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

          <Link
            href="/blogs"
            className="btn-fill-hover inline-block flex-shrink-0 cursor-pointer rounded-full font-bold"
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
              {t('view_all')}
            </span>
          </Link>
        </div>

        {/* Blog cards grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {posts.map((post) => (
            <Link
              key={post.id}
              href={`/blogs/${post.id}`}
              className="group block"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              onMouseMove={handleMouseMove}
            >
              {/* Image */}
              <div
                className="relative mb-5 aspect-video overflow-hidden rounded-3xl"
                style={{ backgroundColor: 'var(--color-neutral-800)' }}
              >
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 640px"
                />
              </div>

              {/* Meta */}
              <div className="mb-3 flex items-center gap-3">
                <span
                  className="rounded-full px-3 py-1 text-xs"
                  style={{
                    border: '1px solid var(--color-border)',
                    color: 'var(--color-text-primary)',
                  }}
                >
                  {post.category}
                </span>
                <span
                  className="text-xs"
                  style={{ color: 'var(--color-text-secondary)' }}
                >
                  {post.date}
                </span>
              </div>

              {/* Title */}
              <h3
                className="font-heading mb-2 text-xl font-bold uppercase"
                style={{ color: 'var(--color-text-primary)' }}
              >
                {post.title}
              </h3>

              {/* Excerpt */}
              <p
                className="line-clamp-3 text-sm"
                style={{ color: 'var(--color-text-secondary)' }}
              >
                {post.excerpt}
              </p>
            </Link>
          ))}
        </div>
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
