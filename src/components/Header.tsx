'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useTranslations, useLocale } from 'next-intl'

export function Header() {
  const t = useTranslations('header')
  const locale = useLocale()
  const headerRef = useRef<HTMLElement>(null)
  const navRef = useRef<HTMLDivElement>(null)
  const contactRef = useRef<HTMLAnchorElement>(null)
  const separatorRef = useRef<HTMLDivElement>(null)
  const availableRef = useRef<HTMLDivElement>(null)

  const NAV_LINKS = [
    { label: t('home'), href: '#home' },
    { label: t('about'), href: '#about' },
    { label: t('projects'), href: '#projects' },
    { label: t('blogs'), href: '#blogs' },
  ]

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const ctx = gsap.context(() => {
      const header = headerRef.current
      const nav = navRef.current
      const contact = contactRef.current
      const separator = separatorRef.current
      const available = availableRef.current

      if (!header || !nav || !contact || !separator || !available) return

      gsap.from(header, {
        y: -60,
        opacity: 0,
        duration: 0.8,
        delay: 0.4,
        ease: 'power3.out',
      })

      const fullWidth = header.offsetWidth
      gsap.set(header, { width: fullWidth })
      gsap.set(available, { autoAlpha: 0, scale: 0.8 })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: document.body,
          start: 'top -100px',
          end: '+=150',
          scrub: 0.3,
        },
      })

      tl.to(
        [separator, nav, contact],
        { autoAlpha: 0, scale: 0.8, duration: 0.4 },
        0
      )

      tl.to(header, { width: 250, duration: 0.5 }, 0)

      tl.to(available, { autoAlpha: 1, scale: 1, duration: 0.3 }, 0.3)

      // Refresh after a frame to sync with current scroll position
      requestAnimationFrame(() => ScrollTrigger.refresh())
    })

    return () => ctx.revert()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locale])

  return (
    <header
      ref={headerRef}
      className="fixed left-1/2 z-50 mt-6 flex -translate-x-1/2 items-center gap-3 overflow-hidden rounded-full px-3 py-2 backdrop-blur-md"
      style={{
        backgroundColor: 'color-mix(in srgb, var(--color-surface-raised) 80%, transparent)',
        border: '1px solid var(--color-border)',
        willChange: 'width',
      }}
    >
      <div
        className="h-8 w-8 shrink-0 overflow-hidden rounded-full"
        style={{ border: '1px solid var(--color-border-muted)' }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/avatar-gabriel.jpg"
          alt="Gabriel Feliciano"
          className="h-full w-full object-cover"
          onError={(e) => {
            const target = e.currentTarget.parentElement!
            target.innerHTML =
              '<span style="display:flex;align-items:center;justify-content:center;width:100%;height:100%;font-size:0.75rem;font-weight:600;background:var(--color-primary-light);color:var(--color-primary)">GF</span>'
          }}
        />
      </div>

      <div
        ref={separatorRef}
        className="h-5 w-px shrink-0"
        style={{ backgroundColor: 'var(--color-border)' }}
      />

      <nav ref={navRef} className="hidden items-center gap-6 md:flex">
        {NAV_LINKS.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="font-body text-sm font-medium whitespace-nowrap transition-colors"
            style={{
              color: 'var(--color-text-secondary)',
              transitionDuration: 'var(--duration-fast)',
              transitionTimingFunction: 'var(--ease-default)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = 'var(--color-text-primary)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = 'var(--color-text-secondary)'
            }}
          >
            {link.label}
          </a>
        ))}
      </nav>

      <a
        ref={contactRef}
        href="#contact"
        className="btn-fill-hover hidden rounded-full border px-4 py-1.5 font-body text-sm font-medium whitespace-nowrap md:inline-flex"
        style={{
          borderColor: 'var(--color-primary)',
          color: 'var(--color-primary)',
          transitionDuration: 'var(--duration-normal)',
          transitionTimingFunction: 'var(--ease-default)',
        }}
      >
        <span>{t('contact')}</span>
      </a>

      <div
        ref={availableRef}
        className="absolute inset-0 flex items-center justify-center gap-2"
        style={{
          visibility: 'hidden',
          paddingLeft: 40,
        }}
      >
        <span
          className="font-body text-xs font-medium whitespace-nowrap"
          style={{ color: 'var(--color-text-secondary)' }}
        >
          {t('available')}
        </span>
        <div
          className="h-2 w-2 shrink-0 animate-pulse rounded-full"
          style={{ backgroundColor: 'var(--color-primary)' }}
        />
      </div>
    </header>
  )
}
