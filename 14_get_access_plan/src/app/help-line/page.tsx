'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Phone } from 'lucide-react';

export default function HelpLinePage() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Track scroll progress within this container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Smooth the scroll progress for springy animations
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Expand the central circle significantly as you scroll
  const scale = useTransform(smoothProgress, [0, 1], [1, 15]);
  
  // Fade out the phone icon itself as it gets too huge, or keep it.
  // Let's fade in the text as you scroll down
  const textOpacity = useTransform(smoothProgress, [0.3, 0.7], [0, 1]);
  const textY = useTransform(smoothProgress, [0.3, 0.7], [50, 0]);

  // We'll also have a connecting line that draws from the center to the text
  const lineHeight = useTransform(smoothProgress, [0, 0.5], ["0%", "100%"]);

  return (
    <div ref={containerRef} className="bg-black text-white relative" style={{ height: '250vh' }}>
      
      {/* Sticky container that stays in view while scrolling */}
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden">
        
        {/* Background ambient glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40vw] h-[40vw] bg-green-900/10 rounded-full blur-[100px] pointer-events-none" />

        {/* Central Expanding Shape */}
        <motion.div 
          className="absolute top-1/2 left-1/2 w-24 h-24 rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center shadow-[0_0_30px_rgba(34,197,94,0.3)] z-10 origin-center"
          style={{ 
            scale, 
            x: '-50%', 
            y: '-50%' 
          }}
        >
          {/* We keep the icon inside the expanding shape. As it scales to 15x, it gets huge. 
              Let's counter-scale the icon so it stays crisp and relatively normal sized, 
              or let it be a huge background watermark. Let's make it a watermark! */}
          <Phone className="w-10 h-10 text-green-500 opacity-20" />
        </motion.div>

        {/* The fixed size icon in the center */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex items-center justify-center w-24 h-24">
          <Phone className="w-10 h-10 text-green-400 drop-shadow-[0_0_15px_rgba(34,197,94,1)]" />
          
          {/* Ping animation to draw attention before scrolling */}
          <div className="absolute inset-0 rounded-full border border-green-400 animate-ping opacity-20" />
        </div>

        {/* The Connecting Line to the single option */}
        <div className="absolute top-[50%] left-1/2 w-0.5 h-64 -translate-x-1/2 z-20 overflow-hidden">
          <motion.div 
            className="w-full bg-gradient-to-b from-green-500 to-transparent"
            style={{ height: lineHeight }}
          />
        </div>

        {/* The Single Option (Help Line Number) */}
        <motion.div 
          className="absolute top-[calc(50%+16rem)] left-1/2 -translate-x-1/2 z-30 flex flex-col items-center whitespace-nowrap"
          style={{ 
            opacity: textOpacity, 
            y: textY 
          }}
        >
          <div className="p-8 rounded-3xl bg-black/40 backdrop-blur-xl border border-green-500/20 shadow-[0_0_50px_rgba(34,197,94,0.15)] flex flex-col items-center">
            <h2 className="text-xl md:text-2xl font-light tracking-[0.2em] text-zinc-400 uppercase mb-4">
              Help Line Number
            </h2>
            <div className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-emerald-600 tracking-tight">
              1800-482-9999
            </div>
            <p className="mt-6 text-sm text-green-400/60 tracking-wider">
              Available 24/7 for emergency support
            </p>
          </div>
        </motion.div>

        {/* Scroll down indicator */}
        <motion.div 
          className="absolute bottom-12 left-1/2 -translate-x-1/2 text-zinc-500 text-xs tracking-[0.3em] uppercase flex flex-col items-center gap-2"
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <span>Scroll to Connect</span>
          <div className="w-px h-8 bg-gradient-to-b from-zinc-500 to-transparent" />
        </motion.div>

      </div>
    </div>
  );
}
