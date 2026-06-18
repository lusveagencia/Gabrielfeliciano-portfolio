'use client'

import { useTranslations } from 'next-intl'

export function Footer() {
  const t = useTranslations('footer')

  return (
    <footer
      className="px-6 py-16 md:px-12 lg:px-20"
      style={{ backgroundColor: 'var(--color-primary)' }}
    >
      <div className="mx-auto max-w-7xl">
        {/* Top — 3 columns */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* Email */}
          <div>
            <span
              className="mb-2 block text-xs opacity-60"
              style={{ color: 'var(--color-neutral-950)' }}
            >
              {t('email_label')}
            </span>
            <a
              href="mailto:designer@example.com"
              className="text-lg font-bold transition-opacity hover:opacity-80 md:text-xl"
              style={{ color: 'var(--color-neutral-950)' }}
            >
              designer@example.com
            </a>
          </div>

          {/* Phone */}
          <div>
            <span
              className="mb-2 block text-xs opacity-60"
              style={{ color: 'var(--color-neutral-950)' }}
            >
              {t('phone_label')}
            </span>
            <a
              href="tel:+15551234567"
              className="text-lg font-bold transition-opacity hover:opacity-80 md:text-xl"
              style={{ color: 'var(--color-neutral-950)' }}
            >
              +1 (555) 123-4567
            </a>
          </div>

          {/* Social */}
          <div>
            <span
              className="mb-2 block text-xs opacity-60"
              style={{ color: 'var(--color-neutral-950)' }}
            >
              {t('social_label')}
            </span>
            <div className="flex gap-4">
              {/* X */}
              <a
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X (Twitter)"
                className="transition-transform hover:scale-110"
                style={{ color: 'var(--color-neutral-950)' }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>

              {/* Instagram */}
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="transition-transform hover:scale-110"
                style={{ color: 'var(--color-neutral-950)' }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <circle cx="12" cy="12" r="5" />
                  <circle cx="17.5" cy="6.5" r="1.5" />
                </svg>
              </a>

              {/* Behance */}
              <a
                href="https://behance.net"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Behance"
                className="transition-transform hover:scale-110"
                style={{ color: 'var(--color-neutral-950)' }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M7.5 11c1.38 0 2.5-1.12 2.5-2.5S8.88 6 7.5 6H3v5h4.5zm1 2H3v5h5.5c1.38 0 2.5-1.12 2.5-2.5S9.88 13 8.5 13zM3 4h5c2.21 0 4 1.79 4 4 0 1.28-.6 2.42-1.54 3.15C11.97 11.93 13 13.33 13 15c0 2.21-1.79 4-4 4H1V4h2zm13 0h6v1.5h-6V4zm3 3.5c-2.49 0-4.5 2.01-4.5 4.5s2.01 4.5 4.5 4.5c1.52 0 2.87-.76 3.69-1.92l-1.53-1.03c-.47.68-1.26 1.12-2.16 1.12-1.24 0-2.28-.82-2.63-1.95H22.5c.04-.24.06-.48.06-.72 0-2.49-2.01-4.5-4.5-4.5zm-2.6 3.57c.35-1.13 1.39-1.95 2.63-1.95s2.28.82 2.63 1.95H13.4z" />
                </svg>
              </a>

              {/* Dribbble */}
              <a
                href="https://dribbble.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Dribbble"
                className="transition-transform hover:scale-110"
                style={{ color: 'var(--color-neutral-950)' }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm6.6 4.83c1.16 1.43 1.88 3.24 1.96 5.2-.29-.06-3.15-.64-6.04-.28-.06-.14-.12-.29-.19-.43-.18-.42-.38-.84-.59-1.24 3.16-1.29 4.59-3.14 4.86-3.51v.26zM12 3.56c2.17 0 4.16.8 5.69 2.12-.23.33-1.52 2.07-4.55 3.2-1.42-2.61-3-4.74-3.24-5.06A8.47 8.47 0 0 1 12 3.56zM8.24 4.53c.24.31 1.79 2.45 3.23 4.99-4.07 1.08-7.66 1.07-8.06 1.06a8.5 8.5 0 0 1 4.83-6.05zM3.54 12.02v-.25c.39.01 4.59.06 8.93-1.24.25.49.49.99.71 1.49-.1.03-.2.05-.3.08-4.53 1.46-6.94 5.45-7.21 5.9a8.44 8.44 0 0 1-2.13-5.98zM12 20.44a8.42 8.42 0 0 1-5.22-1.81c.21-.42 1.99-3.8 6.94-5.55.02-.01.04-.01.06-.02 1.24 3.23 1.76 5.93 1.89 6.68A8.32 8.32 0 0 1 12 20.44zm3.24-.99c-.09-.52-.56-3.1-1.71-6.28 2.72-.43 5.1.28 5.4.38a8.47 8.47 0 0 1-3.69 5.9z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Separator */}
        <div
          className="my-12"
          style={{
            borderTop: '1px solid rgba(0, 0, 0, 0.2)',
          }}
        />

        {/* Bottom — Copyright + Credits */}
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <p
            className="text-sm"
            style={{ color: 'var(--color-neutral-950)' }}
          >
            {t('copyright')}
          </p>

          <div className="flex items-center gap-2">
            <span
              className="text-sm"
              style={{ color: 'var(--color-neutral-950)' }}
            >
              {t('created_by')}
            </span>
            <div
              className="h-6 w-6 overflow-hidden rounded-full"
              style={{ border: '1px solid rgba(0,0,0,0.2)' }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/avatar-gabriel.jpg"
                alt="Gabriel Feliciano"
                className="h-full w-full object-cover"
              />
            </div>
            <a
              href="#home"
              className="text-sm font-semibold underline"
              style={{ color: 'var(--color-neutral-950)' }}
            >
              Gabriel Feliciano
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
