'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'

export function FaqSection() {
  const t = useTranslations('faq')
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const faqData = [
    { question: t('q1'), answer: t('a1') },
    { question: t('q2'), answer: t('a2') },
    { question: t('q3'), answer: t('a3') },
    { question: t('q4'), answer: t('a4') },
    { question: t('q5'), answer: t('a5') },
    { question: t('q6'), answer: t('a6') },
  ]

  return (
    <section id="faq" className="px-6 py-24 md:px-12 lg:px-20">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 lg:grid-cols-12">
        {/* Left — Sticky title */}
        <div className="self-start lg:sticky lg:top-32 lg:col-span-4">
          <h2
            className="font-heading mb-4 text-3xl font-bold uppercase"
            style={{
              color: 'var(--color-text-primary)',
              letterSpacing: '-0.02em',
            }}
          >
            {t('title')}
          </h2>
          <p
            className="text-base"
            style={{ color: 'var(--color-text-secondary)' }}
          >
            {t('subtitle')}
          </p>
        </div>

        {/* Right — Accordion */}
        <div className="lg:col-span-8">
          {faqData.map((item, index) => {
            const isOpen = openIndex === index

            return (
              <div
                key={index}
                className="border-t"
                style={{ borderTopColor: 'var(--color-border)' }}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="flex w-full cursor-pointer items-center justify-between py-6 text-left"
                >
                  <span className="flex items-center gap-3">
                    <span
                      className="text-sm"
                      style={{ color: 'var(--color-text-muted)' }}
                    >
                      {index + 1}.
                    </span>
                    <span
                      className="text-lg font-semibold"
                      style={{ color: 'var(--color-text-primary)' }}
                    >
                      {item.question}
                    </span>
                  </span>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    className="flex-shrink-0"
                    style={{
                      transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition:
                        'transform var(--duration-slow) var(--ease-default)',
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

                {/* Answer — grid-rows transition */}
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
                    <p
                      className="pb-6 text-base leading-relaxed"
                      style={{ color: 'var(--color-text-secondary)' }}
                    >
                      {item.answer}
                    </p>
                  </div>
                </div>
              </div>
            )
          })}
          {/* Bottom border */}
          <div
            className="border-t"
            style={{ borderTopColor: 'var(--color-border)' }}
          />
        </div>
      </div>
    </section>
  )
}
