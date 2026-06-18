'use client'

import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useTranslations } from 'next-intl'

gsap.registerPlugin(ScrollTrigger)

export function TestimonialsSection() {
  const t = useTranslations('testimonials')
  const sectionRef = useRef<HTMLElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const numberRefs = useRef<(HTMLSpanElement | null)[]>([])

  const items = [
    {
      type: 'testimonial' as const,
      quote: t('t1_quote'),
      name: t('t1_name'),
      role: t('t1_role'),
    },
    {
      type: 'stat' as const,
      variant: 'white' as const,
      label: t('s1_label'),
      value: 98,
      suffix: '%',
      sublabel: t('s1_sublabel'),
    },
    {
      type: 'testimonial' as const,
      quote: t('t2_quote'),
      name: t('t2_name'),
      role: t('t2_role'),
    },
    {
      type: 'stat' as const,
      variant: 'accent' as const,
      label: t('s2_label'),
      value: 200,
      suffix: '%',
      sublabel: t('s2_sublabel'),
    },
    {
      type: 'testimonial' as const,
      quote: t('t3_quote'),
      name: t('t3_name'),
      role: t('t3_role'),
    },
    {
      type: 'testimonial' as const,
      quote: t('t4_quote'),
      name: t('t4_name'),
      role: t('t4_role'),
    },
  ]

  const statIndices = items
    .map((item, i) => (item.type === 'stat' ? i : -1))
    .filter((i) => i !== -1)

  useEffect(() => {
    const section = sectionRef.current
    const track = trackRef.current
    if (!section || !track) return

    const ctx = gsap.context(() => {
      const endPadding = 80
      const getScrollDistance = () => track.scrollWidth - window.innerWidth + endPadding

      // Horizontal scroll driven by vertical scroll
      const scrollTween = gsap.to(track, {
        x: () => -(track.scrollWidth - window.innerWidth + endPadding),
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `+=${getScrollDistance()}`,
          scrub: 0.6,
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          fastScrollEnd: true,
        },
      })

      // Animated counters for stat cards
      let statRefIndex = 0
      items.forEach((item, i) => {
        if (item.type !== 'stat') return
        const refIdx = statRefIndex++
        const el = numberRefs.current[refIdx]
        if (!el) return

        const obj = { val: 0 }
        gsap.to(obj, {
          val: item.value,
          duration: 2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            once: true,
          },
          onUpdate: () => {
            el.textContent = Math.floor(obj.val) + item.suffix
          },
        })
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  let statRefCount = 0

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      className="relative overflow-hidden"
    >
      {/* Header - visible at start */}
      <div
        ref={trackRef}
        className="flex items-center gap-2"
        style={{ willChange: 'transform' }}
      >
        {/* Intro — title on the left, cards peek from the right */}
        <div
          className="flex h-screen flex-shrink-0 flex-col justify-center px-6 md:px-20"
          style={{ width: '42vw', minWidth: 340 }}
        >
          <h2
            className="font-heading mb-4 text-3xl font-bold uppercase md:text-4xl lg:text-5xl"
            style={{
              color: 'var(--color-text-primary)',
              letterSpacing: '-0.02em',
            }}
          >
            {t('title')}
          </h2>
          <p
            className="max-w-md text-base md:text-lg"
            style={{ color: 'var(--color-text-secondary)' }}
          >
            {t('subtitle')}
          </p>
        </div>

        {/* Cards */}
        {items.map((item, i) => {
          if (item.type === 'testimonial') {
            return (
              <div
                key={i}
                className="flex w-[85vw] flex-shrink-0 items-center px-4 md:w-[500px]"
              >
                <div
                  className="flex h-[70vh] max-h-[500px] w-full flex-col justify-between rounded-3xl p-8"
                  style={{
                    backgroundColor: 'var(--color-surface-raised, #1a1a1a)',
                    border: '1px solid var(--color-border)',
                  }}
                >
                  {/* Stars */}
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, s) => (
                      <svg
                        key={s}
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="var(--color-primary)"
                      >
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                    ))}
                  </div>

                  {/* Quote */}
                  <p
                    className="my-6 flex-1 text-base leading-relaxed md:text-lg"
                    style={{ color: 'var(--color-text-primary)' }}
                  >
                    &ldquo;{item.quote}&rdquo;
                  </p>

                  {/* Author */}
                  <div className="flex items-center gap-3">
                    <div
                      className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full text-sm font-bold"
                      style={{
                        backgroundColor: 'var(--color-primary)',
                        color: 'var(--color-neutral-950)',
                      }}
                    >
                      {item.name.charAt(0)}
                    </div>
                    <div>
                      <span
                        className="block text-sm font-semibold"
                        style={{ color: 'var(--color-text-primary)' }}
                      >
                        {item.name}
                      </span>
                      <span
                        className="block text-xs"
                        style={{ color: 'var(--color-text-secondary)' }}
                      >
                        {item.role}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )
          }

          // Stat card
          const isAccent = item.variant === 'accent'
          const currentStatRef = statRefCount++

          return (
            <div
              key={i}
              className="flex w-[85vw] flex-shrink-0 items-center px-4 md:w-[400px]"
            >
              <div
                className="flex h-[70vh] max-h-[500px] w-full flex-col justify-between rounded-3xl p-8"
                style={{
                  backgroundColor: isAccent
                    ? 'var(--color-primary)'
                    : '#ffffff',
                  color: isAccent
                    ? 'var(--color-neutral-950)'
                    : 'var(--color-neutral-900)',
                }}
              >
                {/* Top indicator (white card only) */}
                {!isAccent && (
                  <div
                    className="mb-4 h-2 w-2 rounded-full"
                    style={{ backgroundColor: 'var(--color-primary)' }}
                  />
                )}

                {/* Label */}
                <p className="text-sm opacity-80">
                  {item.label}
                </p>

                {/* Big number */}
                <span
                  ref={(el) => {
                    numberRefs.current[currentStatRef] = el
                  }}
                  className="font-heading my-auto text-center text-5xl font-bold md:text-6xl"
                >
                  0{item.suffix}
                </span>

                {/* Sublabel */}
                <p className="text-sm opacity-60">
                  {item.sublabel}
                </p>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
