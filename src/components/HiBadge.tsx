'use client'

import { DotLottieReact } from '@lottiefiles/dotlottie-react'

interface HiBadgeProps {
  className?: string
  size?: number
}

export function HiBadge({ className = '', size = 96 }: HiBadgeProps) {
  const lottieSize = Math.round(size * 0.55)

  return (
    <>
      <style>{`
        @keyframes hi-cycle {
          0%, 15% {
            transform: translateY(0);
            opacity: 1;
          }
          18%, 22% {
            transform: translateY(-120%);
            opacity: 0;
          }
          /* Hidden while wave plays 2 full loops */
          22%, 82% {
            transform: translateY(120%);
            opacity: 0;
          }
          85%, 100% {
            transform: translateY(0);
            opacity: 1;
          }
        }
        @keyframes wave-cycle {
          0%, 18% {
            transform: translateY(120%);
            opacity: 0;
          }
          22%, 78% {
            transform: translateY(0);
            opacity: 1;
          }
          82%, 85% {
            transform: translateY(-120%);
            opacity: 0;
          }
          85%, 100% {
            transform: translateY(120%);
            opacity: 0;
          }
        }
      `}</style>
      <div
        className={`flex items-center justify-center rounded-full ${className}`}
        style={{
          width: size,
          height: size,
          backgroundColor: 'var(--color-primary)',
        }}
      >
        <div className="relative flex items-center justify-center"
          style={{ width: size, height: size }}
        >
          {/* "Hi" text */}
          <span
            className="absolute"
            style={{
              color: 'var(--color-neutral-950)',
              fontFamily: 'var(--font-heading)',
              fontSize: size * 0.28,
              fontWeight: 700,
              letterSpacing: '-0.02em',
              animation: 'hi-cycle 8s ease-in-out infinite',
            }}
          >
            Hi
          </span>

          {/* Lottie hand wave */}
          <div
            className="absolute"
            style={{
              width: lottieSize,
              height: lottieSize,
              animation: 'wave-cycle 8s ease-in-out infinite',
            }}
          >
            <DotLottieReact
              src="/hand-wave.lottie"
              loop
              autoplay
              width={lottieSize}
              height={lottieSize}
            />
          </div>
        </div>
      </div>
    </>
  )
}
