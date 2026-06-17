'use client'

import { useEffect, useRef } from 'react'

export function NoiseBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animId: number

    function resize() {
      // Lower resolution for performance (scaled up via CSS)
      canvas!.width = window.innerWidth / 3
      canvas!.height = window.innerHeight / 3
    }

    function renderNoise() {
      const { width, height } = canvas!
      const imageData = ctx!.createImageData(width, height)
      const data = imageData.data

      for (let i = 0; i < data.length; i += 4) {
        const v = Math.random() * 255
        data[i] = v
        data[i + 1] = v
        data[i + 2] = v
        data[i + 3] = 255
      }

      ctx!.putImageData(imageData, 0, 0)
      animId = requestAnimationFrame(renderNoise)
    }

    resize()
    renderNoise()
    window.addEventListener('resize', resize)

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-50"
      style={{ opacity: 0.03, width: '100%', height: '100%' }}
      aria-hidden="true"
    />
  )
}
