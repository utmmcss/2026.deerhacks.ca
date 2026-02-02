'use client'

import { useEffect, useRef, memo } from 'react'

type Star = {
  x: number
  y: number
  size: number
  brightness: number
}

function seededRandom(seed: number) {
  const x = Math.sin(seed) * 10000
  return x - Math.floor(x)
}

function generateStars(
  width: number,
  height: number,
  count: number,
  seed: number
): Star[] {
  const stars: Star[] = []

  for (let i = 0; i < count; i++) {
    const s1 = seededRandom(seed + i * 4)
    const s2 = seededRandom(seed + i * 4 + 1)
    const s3 = seededRandom(seed + i * 4 + 2)
    const s4 = seededRandom(seed + i * 4 + 3)

    stars.push({
      x: s1 * width,
      y: s2 * height,
      size: s3 * 2 + 0.5,
      brightness: s4 * 0.8 + 0.2,
    })
  }

  return stars
}

function drawStarsToCanvas(
  canvas: HTMLCanvasElement,
  stars: Star[],
  dpr: number
) {
  const ctx = canvas.getContext('2d', { alpha: true })
  if (!ctx) return

  ctx.clearRect(0, 0, canvas.width, canvas.height)
  ctx.scale(dpr, dpr)

  stars.forEach((star) => {
    const gradient = ctx.createRadialGradient(
      star.x,
      star.y,
      0,
      star.x,
      star.y,
      star.size * 3
    )
    gradient.addColorStop(0, `rgba(255, 248, 220, ${star.brightness})`)
    gradient.addColorStop(0.5, `rgba(255, 215, 100, ${star.brightness * 0.3})`)
    gradient.addColorStop(1, 'rgba(255, 215, 100, 0)')

    ctx.beginPath()
    ctx.arc(star.x, star.y, star.size * 3, 0, Math.PI * 2)
    ctx.fillStyle = gradient
    ctx.fill()

    ctx.beginPath()
    ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2)
    ctx.fillStyle = `rgba(255, 252, 245, ${star.brightness})`
    ctx.fill()
  })
}

const LAYER_COUNT = 4

const Starfield = memo(function Starfield() {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRefs = useRef<(HTMLCanvasElement | null)[]>([])
  const isDrawnRef = useRef(false)
  const dimensionsRef = useRef({ width: 0, height: 0 })

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const setupCanvases = () => {
      const width = window.innerWidth
      const height = window.innerHeight

      if (
        dimensionsRef.current.width === width &&
        dimensionsRef.current.height === height &&
        isDrawnRef.current
      ) {
        return
      }

      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const area = width * height
      const totalStars = Math.floor(area / 4000) // Same density as original
      const starsPerLayer = Math.floor(totalStars / LAYER_COUNT)

      for (let i = 0; i < LAYER_COUNT; i++) {
        const canvas = canvasRefs.current[i]
        if (!canvas) continue

        canvas.width = width * dpr
        canvas.height = height * dpr
        canvas.style.width = `${width}px`
        canvas.style.height = `${height}px`

        const stars = generateStars(width, height, starsPerLayer, 12345 + i * 1000)
        drawStarsToCanvas(canvas, stars, dpr)
      }

      dimensionsRef.current = { width, height }
      isDrawnRef.current = true
    }

    setupCanvases()

    let resizeTimeout: number
    const handleResize = () => {
      window.clearTimeout(resizeTimeout)
      resizeTimeout = window.setTimeout(() => {
        isDrawnRef.current = false
        setupCanvases()
      }, 150)
    }

    window.addEventListener('resize', handleResize, { passive: true })

    return () => {
      window.removeEventListener('resize', handleResize)
      window.clearTimeout(resizeTimeout)
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
      aria-hidden="true"
    >
      {Array.from({ length: LAYER_COUNT }).map((_, i) => (
        <canvas
          key={i}
          ref={(el) => {
            canvasRefs.current[i] = el
          }}
          className="absolute inset-0 animate-star-layer"
          style={{
            animationDelay: `${(i * 3) / LAYER_COUNT}s`,
          }}
        />
      ))}
    </div>
  )
})

export default Starfield
