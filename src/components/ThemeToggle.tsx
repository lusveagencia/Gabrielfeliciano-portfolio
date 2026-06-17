'use client'

import { useTheme } from '@/components/ThemeProvider'
import { useEffect, useState } from 'react'
import { useLocale } from 'next-intl'
import { useRouter, usePathname } from '@/i18n/navigation'

function BrazilFlag({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100">
      <circle cx="50" cy="50" r="50" fill="#009c3b" />
      <polygon points="50,15 90,50 50,85 10,50" fill="#ffdf00" />
      <circle cx="50" cy="50" r="20" fill="#002776" />
      <path d="M30,52 Q50,42 70,52" stroke="#fff" strokeWidth="2.5" fill="none" />
    </svg>
  )
}

function USFlag({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100">
      <circle cx="50" cy="50" r="50" fill="#fff" />
      <g clipPath="url(#usCircle)">
        <rect y="0" width="100" height="7.7" fill="#b22234" />
        <rect y="15.4" width="100" height="7.7" fill="#b22234" />
        <rect y="30.8" width="100" height="7.7" fill="#b22234" />
        <rect y="46.2" width="100" height="7.7" fill="#b22234" />
        <rect y="61.5" width="100" height="7.7" fill="#b22234" />
        <rect y="76.9" width="100" height="7.7" fill="#b22234" />
        <rect y="92.3" width="100" height="7.7" fill="#b22234" />
        <rect width="45" height="53.8" fill="#3c3b6e" />
      </g>
      <clipPath id="usCircle">
        <circle cx="50" cy="50" r="50" />
      </clipPath>
    </svg>
  )
}

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const locale = useLocale() as 'pt' | 'en'
  const router = useRouter()
  const pathname = usePathname()

  function switchLocale(newLocale: 'pt' | 'en') {
    window.scrollTo({ top: 0 })
    router.replace(pathname, { locale: newLocale })
  }

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const isDark = resolvedTheme === 'dark'

  return (
    <div
      className="fixed bottom-6 left-1/2 z-40 flex -translate-x-1/2 items-center gap-3 rounded-full px-4 py-2 backdrop-blur-sm"
      style={{
        backgroundColor: 'var(--color-surface-raised)',
        border: '1px solid var(--color-border)',
        boxShadow: 'var(--shadow-md)',
      }}
    >
      {/* Theme toggle */}
      <button
        onClick={() => setTheme(isDark ? 'light' : 'dark')}
        className="relative cursor-pointer rounded-full"
        style={{
          width: '36px',
          height: '20px',
          backgroundColor: 'var(--color-primary)',
          transition: `background-color var(--duration-normal) var(--ease-default)`,
        }}
        aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      >
        <div
          className="absolute top-1 rounded-full bg-white"
          style={{
            width: '12px',
            height: '12px',
            left: isDark ? '20px' : '4px',
            transition: `left var(--duration-normal) var(--ease-spring)`,
          }}
        />
      </button>

      {/* Separator */}
      <div
        className="h-5 w-px shrink-0"
        style={{ backgroundColor: 'var(--color-border)' }}
      />

      {/* Language selector */}
      <div className="flex items-center gap-1.5">
        <button
          onClick={() => switchLocale('pt')}
          className="cursor-pointer rounded-full transition-all"
          style={{
            opacity: locale === 'pt' ? 1 : 0.35,
            transform: locale === 'pt' ? 'scale(1.1)' : 'scale(1)',
            transition: `opacity var(--duration-normal) var(--ease-default), transform var(--duration-normal) var(--ease-default)`,
          }}
          aria-label="Português"
          title="Português"
        >
          <BrazilFlag />
        </button>

        <button
          onClick={() => switchLocale('en')}
          className="cursor-pointer rounded-full transition-all"
          style={{
            opacity: locale === 'en' ? 1 : 0.35,
            transform: locale === 'en' ? 'scale(1.1)' : 'scale(1)',
            transition: `opacity var(--duration-normal) var(--ease-default), transform var(--duration-normal) var(--ease-default)`,
          }}
          aria-label="English"
          title="English"
        >
          <USFlag />
        </button>
      </div>
    </div>
  )
}
