'use client'

import { memo, useEffect, useRef, useState } from 'react'

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
    stars.push({
      x: seededRandom(seed + i * 4) * width,
      y: seededRandom(seed + i * 4 + 1) * height,
      size: seededRandom(seed + i * 4 + 2) * 3 + 1,
      brightness: seededRandom(seed + i * 4 + 3) * 0.8 + 0.2,
    })
  }
  return stars
}

/**
 * Renders stars into a temporary off-DOM canvas and returns a data URL.
 * The canvas is created and discarded after encoding — no persistent canvas
 * memory or compositor overhead in the live DOM.
 */
function renderStarsToDataUrl(
  width: number,
  height: number,
  count: number,
  seed: number,
  dpr: number
): string {
  const canvas = document.createElement('canvas')
  canvas.width = width * dpr
  canvas.height = height * dpr

  const ctx = canvas.getContext('2d', { alpha: true })
  if (!ctx) return ''

  ctx.clearRect(0, 0, canvas.width, canvas.height)
  ctx.save()
  ctx.scale(dpr, dpr)

  // Build a reusable star glow sprite once per render call
  const spriteSize = 64
  const offCanvas = document.createElement('canvas')
  offCanvas.width = spriteSize * dpr
  offCanvas.height = spriteSize * dpr
  const offCtx = offCanvas.getContext('2d')

  if (offCtx) {
    offCtx.scale(dpr, dpr)
    const cx = spriteSize / 2
    const cy = spriteSize / 2
    const radius = 16

    const gradient = offCtx.createRadialGradient(cx, cy, 0, cx, cy, radius)
    gradient.addColorStop(0, 'rgba(255, 255, 255, 1)')
    gradient.addColorStop(0.1, 'rgba(255, 245, 220, 1)')
    gradient.addColorStop(0.2, 'rgba(255, 215, 100, 0.8)')
    gradient.addColorStop(0.4, 'rgba(255, 215, 100, 0.4)')
    gradient.addColorStop(0.7, 'rgba(255, 215, 100, 0.1)')
    gradient.addColorStop(1, 'rgba(255, 215, 100, 0)')

    offCtx.fillStyle = gradient
    offCtx.beginPath()
    offCtx.arc(cx, cy, radius, 0, Math.PI * 2)
    offCtx.fill()

    offCtx.fillStyle = 'rgba(255, 255, 255, 1)'
    offCtx.beginPath()
    offCtx.arc(cx, cy, 2, 0, Math.PI * 2)
    offCtx.fill()
  }

  const stars = generateStars(width, height, count, seed)
  stars.forEach((star) => {
    const size = star.size * 5
    ctx.globalAlpha = Math.min(star.brightness + 0.4, 1)
    ctx.drawImage(offCanvas, star.x - size / 2, star.y - size / 2, size, size)
  })

  ctx.restore()
  return canvas.toDataURL('image/png')
}

// 2 layers on desktop; crossfade creates the same twinkling depth as 4 layers
// with half the compositor work. Mobile uses 1 static layer (no animation).
const DESKTOP_LAYERS = 2

const Starfield = memo(function Starfield() {
  const [dataUrls, setDataUrls] = useState<string[]>([])
  const dimensionsRef = useRef({ width: 0, height: 0 })

  useEffect(() => {
    const setup = () => {
      const width = window.innerWidth
      const height = window.innerHeight

      if (
        dimensionsRef.current.width === width &&
        dimensionsRef.current.height === height
      ) {
        return
      }

      const isMobile = width < 768
      // Cap DPR at 2 on desktop, 1.5 on mobile — stars have soft glow so
      // sub-pixel sharpness is unnecessary and halves the texture memory cost.
      const dpr = isMobile
        ? Math.min(window.devicePixelRatio || 1, 1.5)
        : Math.min(window.devicePixelRatio || 1, 2)

      const area = width * height
      // More aggressive thinning on mobile; still looks dense enough
      const densityDivider = isMobile ? 15000 : 4500
      const activeLayers = isMobile ? 1 : DESKTOP_LAYERS
      const starsPerLayer = Math.floor(area / densityDivider / activeLayers)

      // Render to temporary canvases, encode to PNG, then discard the canvases.
      // The browser caches the decoded image as a GPU texture via background-image,
      // which is cheaper than keeping live canvas backing stores in the compositor.
      const urls: string[] = []
      for (let i = 0; i < activeLayers; i++) {
        urls.push(
          renderStarsToDataUrl(width, height, starsPerLayer, 12345 + i * 1000, dpr)
        )
      }

      setDataUrls(urls)
      dimensionsRef.current = { width, height }
    }

    setup()

    let resizeTimeout: number
    const handleResize = () => {
      clearTimeout(resizeTimeout)
      resizeTimeout = window.setTimeout(() => {
        dimensionsRef.current = { width: 0, height: 0 }
        setup()
      }, 200)
    }

    window.addEventListener('resize', handleResize, { passive: true })
    return () => {
      window.removeEventListener('resize', handleResize)
      clearTimeout(resizeTimeout)
    }
  }, [])

  return (
    <div
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
      aria-hidden="true"
    >
      {dataUrls.map((url, i) => (
        <div
          key={i}
          className="absolute inset-0 animate-star-layer"
          style={{
            backgroundImage: `url(${url})`,
            backgroundSize: '100% 100%',
            // Layers are perfectly out of phase (0s and 4s in an 8s cycle),
            // so one brightens while the other dims — mimicking twinkling depth.
            animationDelay: `${i * 4}s`,
          }}
        />
      ))}
    </div>
  )
})

export default Starfield
