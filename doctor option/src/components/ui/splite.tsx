'use client'

interface SplineSceneProps {
  scene?: string
  className?: string
}

export function SplineScene({ className }: SplineSceneProps) {
  // Replacing the heavy 3D WebGL canvas with a lightweight CSS animation 
  // to fix the infinite loading/freezing issues on the user's computer.
  return (
    <div className={`flex items-center justify-center w-full h-full ${className}`}>
      <div className="flex gap-2 items-center justify-center h-32">
        {[1, 2, 3, 4, 5, 6, 7].map((i) => (
          <div
            key={i}
            className="w-3 bg-blue-500 rounded-full animate-pulse"
            style={{
              height: `${Math.max(20, Math.random() * 100)}%`,
              animationDelay: `${i * 0.15}s`,
              animationDuration: '1s'
            }}
          />
        ))}
      </div>
      <div className="absolute bottom-10 text-blue-400 font-mono text-sm animate-pulse">
        AI is Listening...
      </div>
    </div>
  )
}
