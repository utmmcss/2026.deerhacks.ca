import { useEffect, useState } from 'react'

const DeerConstellation = () => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 500)
    return () => clearTimeout(timer)
  }, [])

  const constellationPoints = [
    { x: 80, y: 30, size: 3, delay: 0 },
    { x: 95, y: 50, size: 2.5, delay: 0.1 },
    { x: 110, y: 70, size: 2, delay: 0.2 },
    { x: 70, y: 55, size: 2, delay: 0.15 },
    { x: 55, y: 45, size: 2.5, delay: 0.25 },
    { x: 220, y: 30, size: 3, delay: 0.3 },
    { x: 205, y: 50, size: 2.5, delay: 0.4 },
    { x: 190, y: 70, size: 2, delay: 0.5 },
    { x: 230, y: 55, size: 2, delay: 0.45 },
    { x: 245, y: 45, size: 2.5, delay: 0.55 },
    { x: 130, y: 85, size: 2.5, delay: 0.6 },
    { x: 150, y: 75, size: 3, delay: 0.65 },
    { x: 170, y: 85, size: 2.5, delay: 0.7 },
    { x: 125, y: 110, size: 3.5, delay: 0.75 },
    { x: 175, y: 110, size: 3.5, delay: 0.8 },
    { x: 150, y: 145, size: 4, delay: 0.85 },
    { x: 115, y: 135, size: 2, delay: 0.9 },
    { x: 185, y: 135, size: 2, delay: 0.95 },
    { x: 130, y: 160, size: 2.5, delay: 1 },
    { x: 170, y: 160, size: 2.5, delay: 1.05 },
    { x: 150, y: 175, size: 3, delay: 1.1 },
  ]

  const connections = [
    [0, 1],
    [1, 2],
    [1, 3],
    [3, 4],
    [5, 6],
    [6, 7],
    [6, 8],
    [8, 9],
    [2, 10],
    [7, 12],
    [10, 11],
    [11, 12],
    [10, 13],
    [12, 14],
    [13, 15],
    [14, 15],
    [13, 16],
    [14, 17],
    [16, 18],
    [17, 19],
    [18, 20],
    [19, 20],
    [15, 20],
  ]

  return (
    <div className="relative w-[300px] h-[200px] animate-float">
      <svg
        viewBox="0 0 300 200"
        className={`w-full h-full transition-opacity duration-1000 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <g className="animate-constellation">
          {connections.map(([from, to], index) => (
            <line
              key={`line-${index}`}
              x1={constellationPoints[from].x}
              y1={constellationPoints[from].y}
              x2={constellationPoints[to].x}
              y2={constellationPoints[to].y}
              stroke="hsl(42 90% 60%)"
              strokeWidth="1"
              strokeOpacity="0.4"
              style={{
                animationDelay: `${Math.max(
                  constellationPoints[from].delay,
                  constellationPoints[to].delay
                )}s`,
              }}
            />
          ))}
        </g>

        {constellationPoints.map((point, index) => (
          <g key={`star-${index}`}>
            <circle
              cx={point.x}
              cy={point.y}
              r={point.size * 4}
              fill="url(#starGlow)"
              className="animate-twinkle"
              style={{ animationDelay: `${point.delay + 0.5}s` }}
            />
            <circle
              cx={point.x}
              cy={point.y}
              r={point.size}
              fill="hsl(45 100% 95%)"
              className="animate-twinkle"
              style={{ animationDelay: `${point.delay}s` }}
            />
          </g>
        ))}

        <defs>
          <radialGradient id="starGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="hsl(42 100% 70%)" stopOpacity="0.6" />
            <stop offset="50%" stopColor="hsl(42 100% 60%)" stopOpacity="0.2" />
            <stop offset="100%" stopColor="hsl(42 100% 55%)" stopOpacity="0" />
          </radialGradient>
        </defs>
      </svg>
    </div>
  )
}

export default DeerConstellation
