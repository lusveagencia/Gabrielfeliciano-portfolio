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

      // Wait for fonts, images and layout to fully settle before measuring
      if (document.fonts?.ready) {
        document.fonts.ready.then(() => {
          if (cancelled) return
          requestAnimationFrame(() => {
            if (cancelled) return
            requestAnimationFrame(() => {
              if (cancelled) return
              buildAnimations(heroPhoto, servicesSection, aboutSection)
            })
          })
        })
      } else {
        requestAnimationFrame(() => {
          if (cancelled) return
          requestAnimationFrame(() => {
            if (cancelled) return
            buildAnimations(heroPhoto, servicesSection, aboutSection)
          })
        })
      }
    }

    function buildAnimations(
      heroPhoto: HTMLElement,
      servicesSection: HTMLElement,
      aboutSection: HTMLElement
    ) {
      const rawRect = heroPhoto.getBoundingClientRect()

      // Compensate for parent's scale animation (HeroSection animates from scale 0.8)
      let scale = 1
      const parentTransform = window.getComputedStyle(heroPhoto.parentElement!).transform
      if (parentTransform && parentTransform !== 'none') {
        const match = parentTransform.match(/matrix\(([^,]+)/)
        if (match) scale = parseFloat(match[1])
      }

      // Calculate true dimensions (at scale 1)
      const trueWidth = rawRect.width / scale
      const trueHeight = rawRect.height / scale
      const centerX = rawRect.left + rawRect.width / 2
      const centerY = rawRect.top + rawRect.height / 2
      const rect = {
        width: trueWidth,
        height: trueHeight,
        top: centerY - trueHeight / 2,
        left: centerX - trueWidth / 2,
        bottom: centerY + trueHeight / 2,
      }

      const containerMaxWidth = Math.min(1280, window.innerWidth - 80)
      const containerLeft = (window.innerWidth - containerMaxWidth) / 2
      const ghostZoneCenterX = containerLeft + containerMaxWidth * 0.75
      const startCenterX = rect.left + rect.width / 2
      const deltaX = ghostZoneCenterX - startCenterX
      const serviceDeltaY = (window.innerHeight / 2 - rect.height / 2) - rect.top
      const aboutTargetY = (window.innerHeight * 0.15) - rect.top

      // Kill previous state
      gsap.killTweensOf(wrapper!)
      gsap.killTweensOf(card!)
      gsap.killTweensOf(badge!)
      gsap.set(wrapper!, { clearProps: 'all' })
      gsap.set(card!, { clearProps: 'all' })
      gsap.set(badge!, { clearProps: 'all' })

      // Re-apply JSX styles cleared by clearProps
      gsap.set(card!, {
        aspectRatio: '344/479',
        willChange: 'transform',
        boxShadow: 'var(--shadow-lg)',
        border: '1px solid var(--color-border)',
      })

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

      const preload = new Image()
      preload.src = '/placeholder-service-1.jpg'

      let currentSrc: 'hero' | 'service' = 'hero'
      function swapImage(src: string, label: 'hero' | 'service') {
        if (cancelled || currentSrc === label || !img) return
        img.src = src
        currentSrc = label
      }

      function createScrollAnimations() {
        window.scrollTo(0, 0)

        // Single master timeline — ALL phases sequenced, NO conflicting fromTo
        // Timeline total duration: 3 seconds (mapped to scroll via scrub)
        //   0.0–1.0: Phase 1 — Hero→Services (move + flip 0→190°)
        //   1.0–2.0: Phase 2 — During Services (drift 190→210°)
        //   2.0–3.0: Phase 3 — Services→About (flip 210→348° + move up, lands at -12deg tilt)
        const masterTl = gsap.timeline({ paused: true })

        // Phase 1: move wrapper + rotate card + hide badge
        masterTl.fromTo(wrapper!,
          { x: 0, y: 0 },
          { x: deltaX, y: serviceDeltaY, duration: 1, ease: 'none' },
        0)
        masterTl.fromTo(card!,
          { rotateY: 0, rotateX: 0 },
          { rotateY: 190, rotateX: 3, duration: 1, ease: 'none' },
        0)
        masterTl.fromTo(badge!,
          { x: 0, y: 0, opacity: 1, scale: 1 },
          { x: deltaX, y: serviceDeltaY, opacity: 0, scale: 0, duration: 0.6, ease: 'none' },
        0)

        // Phase 2: slow drift (continues card rotation)
        masterTl.to(card!, { rotateY: 210, rotateX: 2, duration: 1, ease: 'none' }, 1)

        // Phase 3: move wrapper up + flip card back
        masterTl.to(wrapper!, { y: aboutTargetY, duration: 1, ease: 'none' }, 2)
        masterTl.to(card!, { rotateY: 348, rotateX: 5, duration: 1, ease: 'none' }, 2)

        // Keep timeline paused — we drive it manually via onUpdate
        // to avoid fromTo conflicts from multiple ScrollTriggers
        let perspectiveSet = false

        const st = ScrollTrigger.create({
          trigger: servicesSection,
          start: 'top bottom',
          endTrigger: aboutSection,
          end: 'top 30%',
          scrub: 0.6,
          onUpdate: (self) => {
            const p = self.progress // 0→1 across the entire range

            // Map overall progress to master timeline (0→3)
            masterTl.progress(p)

            // Perspective only when scrolling
            if (p > 0 && !perspectiveSet) {
              perspectiveSet = true
              wrapper!.style.perspective = '1200px'
            }

            // Image swap: at ~90° (Phase 1 midpoint ≈ overall ~15%)
            // and back at ~270° (Phase 3 midpoint ≈ overall ~85%)
            if (p < 0.15) {
              swapImage('/hero-photo.jpg', 'hero')
            } else if (p < 0.8) {
              swapImage('/placeholder-service-1.jpg', 'service')
            } else {
              swapImage('/hero-photo.jpg', 'hero')
            }
          },
        })
        scrollTriggers.push(st)

        // After About: card scrolls away with the page (stays in About visually)
        const exitSt = ScrollTrigger.create({
          trigger: aboutSection,
          start: 'bottom bottom',
          end: 'bottom top',
          scrub: true,
          onUpdate: (self) => {
            // Move the fixed card upward at scroll speed so it looks pinned to About
            const scrollDistance = window.innerHeight * self.progress
            gsap.set(wrapper!, { yPercent: 0, y: aboutTargetY - scrollDistance })
          },
        })
        scrollTriggers.push(exitSt)
      }

      if (!hasPlayedEntrance.current) {
        hasPlayedEntrance.current = true

        // Card appears instantly (no fade) to avoid size jump with hero photo
        // Only the badge gets an entrance animation
        entranceTl = gsap.timeline()
        entranceTl.from(badge!, {
          opacity: 0,
          duration: 0.6,
          delay: 0.6,
          ease: 'power3.out',
        }, 0)

        createScrollAnimations()
      } else {
        createScrollAnimations()
      }
    }

    timeoutId = window.setTimeout(() => {
      if (!cancelled) setup()
    }, 50)

    // Rebuild on resize (positions change)
    let resizeTimer: number | undefined
    function handleResize() {
      clearTimeout(resizeTimer)
      resizeTimer = window.setTimeout(() => {
        if (cancelled) return

        // Clean up current animations
        if (entranceTl) entranceTl.kill()
        scrollTriggers.forEach((st) => st.kill())
        scrollTriggers.length = 0
        gsap.killTweensOf(wrapper)
        gsap.killTweensOf(card)
        gsap.killTweensOf(badge)
        gsap.set([wrapper, card, badge], { clearProps: 'all' })
        if (heroPhotoEl) heroPhotoEl.style.opacity = ''
        if (img) img.src = '/hero-photo.jpg'

        // Rebuild from scratch (skip entrance on rebuild)
        hasPlayedEntrance.current = true
        setup()
      }, 200)
    }
    window.addEventListener('resize', handleResize)

    return () => {
      cancelled = true
      if (timeoutId) clearTimeout(timeoutId)
      if (resizeTimer) clearTimeout(resizeTimer)
      window.removeEventListener('resize', handleResize)
      if (entranceTl) entranceTl.kill()
      scrollTriggers.forEach((st) => st.kill())
      gsap.killTweensOf(wrapper)
      gsap.killTweensOf(card)
      gsap.killTweensOf(badge)
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
        style={{ zIndex: 30, visibility: 'hidden' }}
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
