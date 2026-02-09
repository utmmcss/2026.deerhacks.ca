'use client'

import { memo, useEffect, useRef } from 'react'

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
      size: s3 * 3 + 1, // Reduced base size for smaller stars
      brightness: s4 * 0.8 + 0.2,
    })
  }

  return stars
}

/**
 * Draws stars to a canvas using a cached star sprite for performance.
 */
function drawStarsToCanvas(
  canvas: HTMLCanvasElement,
  stars: Star[],
  dpr: number
) {
  const ctx = canvas.getContext('2d', { alpha: true })
  if (!ctx) return

  ctx.clearRect(0, 0, canvas.width, canvas.height)
  ctx.save()
  ctx.scale(dpr, dpr)

  // Create a cached star sprite to avoid expensive radial gradients in the loop
  const spriteSize = 64
  const offCanvas = document.createElement('canvas')
  offCanvas.width = spriteSize * dpr
  offCanvas.height = spriteSize * dpr
  const offCtx = offCanvas.getContext('2d')
  
  if (offCtx) {
    offCtx.scale(dpr, dpr)
    const centerX = spriteSize / 2
    const centerY = spriteSize / 2
    const radius = 16 // Further reduced glow radius

    const gradient = offCtx.createRadialGradient(centerX, centerY, 0, centerX, centerY, radius)
    gradient.addColorStop(0, 'rgba(255, 255, 255, 1)')
    gradient.addColorStop(0.1, 'rgba(255, 245, 220, 1)')
    gradient.addColorStop(0.2, 'rgba(255, 215, 100, 0.8)')
    gradient.addColorStop(0.4, 'rgba(255, 215, 100, 0.4)')
    gradient.addColorStop(0.7, 'rgba(255, 215, 100, 0.1)')
    gradient.addColorStop(1, 'rgba(255, 215, 100, 0)')

    offCtx.fillStyle = gradient
    offCtx.beginPath()
    offCtx.arc(centerX, centerY, radius, 0, Math.PI * 2)
    offCtx.fill()

    // Vibrant Core
    offCtx.fillStyle = 'rgba(255, 255, 255, 1)'
    offCtx.beginPath()
    offCtx.arc(centerX, centerY, 2, 0, Math.PI * 2)
    offCtx.fill()
  }

  stars.forEach((star) => {
    const size = star.size * 5 // Reduced rendering multiplier
    ctx.globalAlpha = Math.min(star.brightness + 0.4, 1) 
    ctx.drawImage(
      offCanvas,
      star.x - size / 2,
      star.y - size / 2,
      size,
      size
    )
  })

  ctx.restore()
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
      const isMobile = width < 768
      const area = width * height
      
      // Reduce density and layers on mobile
      const densityDivider = isMobile ? 8000 : 4000
      const activeLayers = isMobile ? 2 : LAYER_COUNT
      
      const totalStars = Math.floor(area / densityDivider)
      const starsPerLayer = Math.floor(totalStars / activeLayers)

      // Reset all canvases first
      canvasRefs.current.forEach(canvas => {
        if (canvas) {
          const ctx = canvas.getContext('2d')
          ctx?.clearRect(0, 0, canvas.width, canvas.height)
        }
      })

      for (let i = 0; i < activeLayers; i++) {
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
