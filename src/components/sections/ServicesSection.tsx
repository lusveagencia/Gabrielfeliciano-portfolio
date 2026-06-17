'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const servicesData = [
  {
    title: 'UI/UX Design',
    items: [
      'Wireframing and prototyping',
      'User Interface design for web and mobile apps',
      'Usability testing and user feedback analysis',
      'Interaction design and micro-animations',
    ],
  },
  {
    title: 'Graphic Design',
    items: [
      'Logo and brand identity design',
      'Social media graphics and ad creatives',
      'Infographics and data visualization',
      'Custom illustrations and icons',
    ],
  },
  {
    title: 'Web Design',
    items: [
      'Responsive website design',
      'Landing page design and optimization',
      'Webflow development and customization',
      'Website maintenance and updates',
    ],
  },
  {
    title: 'Branding',
    items: [
      'Brand strategy and identity development',
      'Visual style guide creation',
      'Typography and color scheme selection',
      'Brand storytelling and messaging',
    ],
  },
]

const imageUrls = [
  '/placeholder-service-1.jpg',
  '/placeholder-service-2.jpg',
  '/placeholder-service-3.jpg',
  '/placeholder-service-4.jpg',
]

export function ServicesSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)
  const sectionRef = useRef<HTMLElement>(null)
  const floatingImgRef = useRef<HTMLImageElement>(null)
  const xToRef = useRef<gsap.QuickToFunc | null>(null)
  const yToRef = useRef<gsap.QuickToFunc | null>(null)
  const titleRefs = useRef<(HTMLButtonElement | null)[]>([])
  const canHoverRef = useRef(false)

  const setTitleRef = useCallback(
    (index: number) => (el: HTMLButtonElement | null) => {
      titleRefs.current[index] = el
    },
    []
  )

  useEffect(() => {
    canHoverRef.current = window.matchMedia('(hover: hover)').matches

    const ctx = gsap.context(() => {
      if (!canHoverRef.current || !floatingImgRef.current) return

      xToRef.current = gsap.quickTo(floatingImgRef.current, 'x', {
        duration: 0.4,
        ease: 'power3.out',
      })
      yToRef.current = gsap.quickTo(floatingImgRef.current, 'y', {
        duration: 0.4,
        ease: 'power3.out',
      })

      titleRefs.current.forEach((btn, i) => {
        if (!btn) return

        const handleEnter = (e: MouseEvent) => {
          if (!floatingImgRef.current) return
          floatingImgRef.current.src = imageUrls[i]
          const rotation = (Math.random() - 0.5) * 10

          gsap.to(floatingImgRef.current, {
            opacity: 1,
            scale: 1,
            rotation,
            duration: 0.3,
            ease: 'power2.out',
          })

          xToRef.current?.(e.clientX - 125)
          yToRef.current?.(e.clientY - 200)
        }

        const handleMove = (e: MouseEvent) => {
          xToRef.current?.(e.clientX - 125)
          yToRef.current?.(e.clientY - 200)
        }

        const handleLeave = () => {
          if (!floatingImgRef.current) return
          gsap.to(floatingImgRef.current, {
            opacity: 0,
            scale: 0.8,
            duration: 0.3,
            ease: 'power2.in',
          })
        }

        btn.addEventListener('mouseenter', handleEnter)
        btn.addEventListener('mousemove', handleMove)
        btn.addEventListener('mouseleave', handleLeave)
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="services"
      className="relative min-h-screen px-6 py-20 md:px-12 lg:px-20"
    >
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 md:grid-cols-2">
        {/* Left side — Content */}
        <div>
          <h2
            className="font-heading mb-4 text-3xl font-bold uppercase md:text-4xl"
            style={{
              color: 'var(--color-text-primary)',
              letterSpacing: '-0.02em',
            }}
          >
            WHAT I CAN DO FOR YOU
          </h2>
          <p
            className="mb-10 max-w-lg text-base"
            style={{ color: 'var(--color-text-secondary)' }}
          >
            As a digital designer, I am a visual storyteller, crafting
            experiences that connect deeply and spark creativity.
          </p>

          {/* Accordion */}
          <div>
            {servicesData.map((service, index) => {
              const isOpen = openIndex === index

              return (
                <div
                  key={service.title}
                  style={{ borderTopColor: 'var(--color-border)' }}
                  className="border-t"
                >
                  <button
                    ref={setTitleRef(index)}
                    onClick={() =>
                      setOpenIndex(isOpen ? null : index)
                    }
                    className="flex w-full cursor-pointer items-center justify-between py-6 text-left"
                  >
                    <span
                      className="font-heading text-xl font-bold uppercase"
                      style={{ color: 'var(--color-text-primary)' }}
                    >
                      {service.title}
                    </span>
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      className="flex-shrink-0 transition-transform"
                      style={{
                        transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                        transitionDuration: 'var(--duration-slow)',
                        transitionTimingFunction: 'var(--ease-default)',
                        color: 'var(--color-text-secondary)',
                      }}
                    >
                      <path
                        d="M5 7.5L10 12.5L15 7.5"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>

                  <div
                    className="grid transition-all"
                    style={{
                      gridTemplateRows: isOpen ? '1fr' : '0fr',
                      opacity: isOpen ? 1 : 0,
                      transitionDuration: 'var(--duration-slow)',
                      transitionTimingFunction: 'var(--ease-default)',
                    }}
                  >
                    <div className="overflow-hidden">
                      <ul className="pb-6">
                        {service.items.map((item) => (
                          <li
                            key={item}
                            className="py-1 text-sm"
                            style={{ color: 'var(--color-text-secondary)' }}
                          >
                            &mdash; {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )
            })}
            {/* Bottom border for last item */}
            <div
              className="border-t"
              style={{ borderTopColor: 'var(--color-border)' }}
            />
          </div>
        </div>

        {/* Right side — Ghost zone */}
        <div className="hidden md:block" aria-hidden="true" />
      </div>

      {/* Floating image for mouse follow */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        ref={floatingImgRef}
        src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
        alt=""
        className="pointer-events-none fixed top-0 left-0 z-50 rounded-xl"
        style={{
          width: 250,
          height: 'auto',
          opacity: 0,
          scale: 0.5,
          boxShadow: 'var(--shadow-lg)',
          willChange: 'transform, opacity',
        }}
      />
    </section>
  )
}
