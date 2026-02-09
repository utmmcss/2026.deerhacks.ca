import { useEffect, useState } from 'react'

const DeerConstellation = () => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 300)
    return () => clearTimeout(timer)
  }, [])

  // Deer constellation points - representing antlers, head, and body
  const constellationPoints = [
    // Left antler
    { x: 80, y: 25, size: 3.5, delay: 0 },
    { x: 95, y: 45, size: 3, delay: 0.1 },
    { x: 110, y: 65, size: 2.5, delay: 0.2 },
    { x: 70, y: 50, size: 2.5, delay: 0.15 },
    { x: 55, y: 38, size: 3, delay: 0.25 },
    // Right antler
    { x: 220, y: 25, size: 3.5, delay: 0.3 },
    { x: 205, y: 45, size: 3, delay: 0.4 },
    { x: 190, y: 65, size: 2.5, delay: 0.5 },
    { x: 230, y: 50, size: 2.5, delay: 0.45 },
    { x: 245, y: 38, size: 3, delay: 0.55 },
    // Head/face
    { x: 130, y: 82, size: 3, delay: 0.6 },
    { x: 150, y: 72, size: 4, delay: 0.65 }, // Nose - larger star
    { x: 170, y: 82, size: 3, delay: 0.7 },
    // Eyes
    { x: 135, y: 95, size: 3.5, delay: 0.72 },
    { x: 165, y: 95, size: 3.5, delay: 0.74 },
    // Neck/body
    { x: 125, y: 115, size: 3, delay: 0.75 },
    { x: 175, y: 115, size: 3, delay: 0.8 },
    { x: 150, y: 145, size: 4.5, delay: 0.85 }, // Chest - prominent star
    { x: 115, y: 138, size: 2.5, delay: 0.9 },
    { x: 185, y: 138, size: 2.5, delay: 0.95 },
    { x: 130, y: 165, size: 3, delay: 1 },
    { x: 170, y: 165, size: 3, delay: 1.05 },
    { x: 150, y: 180, size: 3.5, delay: 1.1 },
  ]

  const connections = [
    // Left antler
    [0, 1], [1, 2], [1, 3], [3, 4],
    // Right antler
    [5, 6], [6, 7], [6, 8], [8, 9],
    // Antlers to head
    [2, 10], [7, 12],
    // Face
    [10, 11], [11, 12],
    [10, 13], [12, 14], // Eyes connection
    // Neck
    [10, 15], [12, 16],
    [13, 15], [14, 16],
    // Body
    [15, 17], [16, 17],
    [15, 18], [16, 19],
    [18, 20], [19, 21],
    [20, 22], [21, 22],
    [17, 22],
  ]

  return (
    <div className="relative w-[320px] h-[220px] sm:w-[380px] sm:h-[260px] md:w-[420px] md:h-[280px] animate-float overflow-visible">
      <svg
        viewBox="0 0 300 200"
        className={`w-full h-full transition-all duration-1000 overflow-visible ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {/* Connection lines with gradient */}
        <defs>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(42 100% 70%)" stopOpacity="0.6" />
            <stop offset="100%" stopColor="hsl(42 90% 55%)" stopOpacity="0.3" />
          </linearGradient>
          <radialGradient id="starGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="hsl(42 100% 85%)" stopOpacity="0.8" />
            <stop offset="40%" stopColor="hsl(42 100% 65%)" stopOpacity="0.4" />
            <stop offset="100%" stopColor="hsl(42 100% 55%)" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="starCore" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="hsl(45 100% 98%)" stopOpacity="1" />
            <stop offset="70%" stopColor="hsl(42 100% 90%)" stopOpacity="0.9" />
            <stop offset="100%" stopColor="hsl(42 100% 75%)" stopOpacity="0.7" />
          </radialGradient>
        </defs>

        <g className="animate-constellation">
          {connections.map(([from, to], index) => (
            <line
              key={`line-${index}`}
              x1={constellationPoints[from].x}
              y1={constellationPoints[from].y}
              x2={constellationPoints[to].x}
              y2={constellationPoints[to].y}
              stroke="url(#lineGradient)"
              strokeWidth="1.5"
              strokeLinecap="round"
              style={{
                animationDelay: `${Math.max(
                  constellationPoints[from].delay,
                  constellationPoints[to].delay
                )}s`,
              }}
            />
          ))}
        </g>

        {/* Stars with glow effect */}
        {constellationPoints.map((point, index) => (
          <g key={`star-${index}`}>
            {/* Outer glow */}
            <circle
              cx={point.x}
              cy={point.y}
              r={point.size * 5}
              fill="url(#starGlow)"
              className="animate-twinkle"
              style={{ animationDelay: `${point.delay + 0.5}s` }}
            />
            {/* Inner core */}
            <circle
              cx={point.x}
              cy={point.y}
              r={point.size}
              fill="url(#starCore)"
              className="animate-twinkle"
              style={{ animationDelay: `${point.delay}s` }}
            />
          </g>
        ))}
      </svg>
    </div>
  )
}

export default DeerConstellation
