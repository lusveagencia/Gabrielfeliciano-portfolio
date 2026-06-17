'use client'

import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLocale, useTranslations } from 'next-intl'
import { HiBadge } from '@/components/HiBadge'

gsap.registerPlugin(ScrollTrigger)

export function CardFlutuante() {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)
  const imgRef = useRef<HTMLImageElement>(null)
  const badgeRef = useRef<HTMLDivElement>(null)
  const hasPlayedEntrance = useRef(false)
  const locale = useLocale()
  const t = useTranslations('common')

  useEffect(() => {
    const wrapper = wrapperRef.current
    const card = cardRef.current
    const img = imgRef.current
    const badge = badgeRef.current
    if (!wrapper || !card || !img || !badge) return

    if (window.innerWidth < 768) return

    let cancelled = false
    let entranceTl: gsap.core.Timeline | null = null
    const scrollTriggers: ScrollTrigger[] = []
    let heroPhotoEl: HTMLElement | null = null
    let timeoutId: number | undefined

    function setup() {
      if (cancelled) return

      const heroPhoto = document.querySelector('[data-hero-photo]') as HTMLElement
      const servicesSection = document.getElementById('services')
      const aboutSection = document.getElementById('about')

      if (!heroPhoto || !servicesSection || !aboutSection) return
      heroPhotoEl = heroPhoto

      window.scrollTo(0, 0)

      // Double-rAF: wait for scroll reset + layout settle
      requestAnimationFrame(() => {
        if (cancelled) return
        requestAnimationFrame(() => {
          if (cancelled) return
          buildAnimations(heroPhoto, servicesSection, aboutSection)
        })
      })
    }

    function buildAnimations(
      heroPhoto: HTMLElement,
      servicesSection: HTMLElement,
      aboutSection: HTMLElement
    ) {
      const rect = heroPhoto.getBoundingClientRect()

      const containerMaxWidth = Math.min(1280, window.innerWidth - 80)
      const containerLeft = (window.innerWidth - containerMaxWidth) / 2
      const ghostZoneCenterX = containerLeft + containerMaxWidth * 0.75
      const startCenterX = rect.left + rect.width / 2
      const deltaX = ghostZoneCenterX - startCenterX
      const viewportCenterY = window.innerHeight / 2 - rect.height / 2

      // Clear any leftover GSAP state
      gsap.set(wrapper!, { clearProps: 'all' })
      gsap.set(card!, { clearProps: 'all' })
      gsap.set(badge!, { clearProps: 'all' })

      // Position wrapper and badge
      gsap.set(wrapper!, {
        position: 'fixed',
        top: rect.top,
        left: rect.left,
        width: rect.width,
        visibility: 'visible',
      })

      gsap.set(badge!, {
        position: 'fixed',
        top: rect.bottom - 40,
        left: rect.left - 40,
        visibility: 'visible',
      })

      heroPhoto.style.opacity = '0'

      // Preload service image
      const preload = new Image()
      preload.src = '/placeholder-service-1.jpg'

      // --- Image swap logic ---
      let currentSrc: 'hero' | 'service' = 'hero'
      function swapImage(src: string, label: 'hero' | 'service') {
        if (cancelled || currentSrc === label || !img) return
        img.src = src
        currentSrc = label
      }

      // --- Scroll animations builder ---
      function createScrollAnimations() {
        const deltaY = viewportCenterY - rect.top

        // Phase 1: Hero → Services
        const phase1Tl = gsap.timeline()
        phase1Tl.to(wrapper!, { x: deltaX, y: deltaY, duration: 1, ease: 'none' }, 0)
        phase1Tl.to(card!, { rotateY: 180, duration: 1, ease: 'none' }, 0)
        phase1Tl.to(badge!, {
          x: deltaX, y: deltaY, opacity: 0, scale: 0,
          duration: 0.6, ease: 'none',
        }, 0)

        const st1 = ScrollTrigger.create({
          trigger: servicesSection,
          start: 'top bottom',
          end: 'top 20%',
          scrub: 0.3,
          animation: phase1Tl,
          onUpdate: (self) => {
            if (self.progress >= 0.5) {
              swapImage('/placeholder-service-1.jpg', 'service')
            } else {
              swapImage('/hero-photo.jpg', 'hero')
            }
          },
        })
        scrollTriggers.push(st1)

        // Phase 2: Services → About
        const st2 = ScrollTrigger.create({
          trigger: aboutSection,
          start: 'top bottom',
          end: 'top 40%',
          scrub: 0.3,
          animation: gsap.fromTo(card!,
            { rotateY: 180, rotateX: 0 },
            { rotateY: 348, rotateX: 5, ease: 'none', immediateRender: false }
          ),
          onUpdate: (self) => {
            if (self.progress >= 0.536) {
              swapImage('/hero-photo.jpg', 'hero')
            } else if (self.progress > 0.01) {
              swapImage('/placeholder-service-1.jpg', 'service')
            }
          },
        })
        scrollTriggers.push(st2)

        ScrollTrigger.refresh()
      }

      // First visit: play entrance, THEN create scroll animations
      // Locale switch: skip entrance, create scroll animations immediately
      if (!hasPlayedEntrance.current) {
        hasPlayedEntrance.current = true

        entranceTl = gsap.timeline()
        entranceTl.from(card!, {
          scale: 0.8,
          opacity: 0,
          duration: 0.8,
          delay: 0.3,
          ease: 'power3.out',
        }, 0)
        entranceTl.from(badge!, {
          opacity: 0,
          duration: 0.6,
          delay: 0.6,
          ease: 'power3.out',
        }, 0)

        entranceTl.then(() => {
          if (!cancelled) createScrollAnimations()
        })
      } else {
        // Locale switch — no entrance, just scroll animations
        createScrollAnimations()
      }
    }

    timeoutId = window.setTimeout(() => {
      if (!cancelled) setup()
    }, 50)

    return () => {
      cancelled = true
      if (timeoutId) clearTimeout(timeoutId)
      if (entranceTl) entranceTl.kill()
      scrollTriggers.forEach((st) => st.kill())
      gsap.set([wrapper, card, badge], { clearProps: 'all' })
      if (heroPhotoEl) heroPhotoEl.style.opacity = ''
      if (img) img.src = '/hero-photo.jpg'
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locale])

  return (
    <>
      <div
        ref={wrapperRef}
        className="pointer-events-none hidden md:block"
        style={{ zIndex: 30, perspective: '1200px', visibility: 'hidden' }}
      >
        <div
          ref={cardRef}
          className="overflow-hidden rounded-3xl"
          style={{
            aspectRatio: '344/479',
            willChange: 'transform',
            boxShadow: 'var(--shadow-lg)',
            border: '1px solid var(--color-border)',
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            ref={imgRef}
            src="/hero-photo.jpg"
            alt="Gabriel Feliciano"
            className="h-full w-full object-cover"
          />
        </div>
      </div>

      <div
        ref={badgeRef}
        className="pointer-events-none hidden md:block"
        style={{ zIndex: 40, visibility: 'hidden' }}
      >
        <HiBadge text={t('hi')} />
      </div>
    </>
  )
}
