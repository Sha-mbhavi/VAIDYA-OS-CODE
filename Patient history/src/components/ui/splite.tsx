'use client'

import { motion } from 'framer-motion';
import { Bot } from 'lucide-react';

interface SplineSceneProps {
  scene?: string
  className?: string
}

export function SplineScene({ className }: SplineSceneProps) {
  return (
    <div className={`flex flex-col items-center justify-center w-full h-full gap-8 ${className}`}>
      
      {/* Floating Robot Icon / Visual */}
      <motion.div
        animate={{ y: [0, -15, 0] }}
        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
        className="relative flex items-center justify-center w-48 h-48 rounded-full bg-blue-900/20 border border-blue-500/30 shadow-[0_0_60px_-15px_rgba(59,130,246,0.5)]"
      >
        <Bot className="w-24 h-24 text-blue-400" strokeWidth={1.5} />
        
        {/* Glow behind the robot */}
        <div className="absolute inset-0 rounded-full bg-blue-500/10 blur-xl animate-pulse" />
      </motion.div>

      {/* Listening Soundwave */}
      <div className="flex gap-2 items-center justify-center h-16">
        {[1, 2, 3, 4, 5, 6, 7].map((i) => (
          <div
            key={i}
            className="w-2 bg-indigo-500 rounded-full animate-pulse"
            style={{
              height: `${Math.max(20, Math.random() * 100)}%`,
              animationDelay: `${i * 0.15}s`,
              animationDuration: '1s'
            }}
          />
        ))}
      </div>
      
      <div className="text-indigo-400 font-mono text-sm animate-pulse mt-2 tracking-widest uppercase">
        Robot is Listening...
      </div>
    </div>
  )
}
