'use client';

import React, { useRef } from 'react';
import { LaserFlow } from '@/components/ui/laser-flow';
import { motion } from 'framer-motion';

export default function EmergencyCasePage() {
  const revealImgRef = useRef<HTMLImageElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    if (revealImgRef.current) {
      revealImgRef.current.style.setProperty('--mx', `${x}px`);
      revealImgRef.current.style.setProperty('--my', `${y + rect.height * 0.5}px`);
    }
  };

  const handleMouseLeave = () => {
    if (revealImgRef.current) {
      revealImgRef.current.style.setProperty('--mx', '-9999px');
      revealImgRef.current.style.setProperty('--my', '-9999px');
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-8 font-sans">
      
      {/* Main Showcase Container */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative w-full max-w-4xl h-[600px] rounded-3xl overflow-hidden shadow-[0_0_60px_-15px_rgba(255,0,0,0.25)] bg-[#000000] border border-red-500/10"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {/* The Laser Component - Bloody Red */}
        <LaserFlow
          horizontalBeamOffset={0.1}
          verticalBeamOffset={0.0}
          color="#ff0000"
          wispDensity={1.2}
          fogIntensity={0.6}
          className="absolute inset-0 z-0"
        />

        {/* Central Card with Border - Static UI */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[60%] flex items-center justify-center z-10 pointer-events-none">
          <div className="w-full h-full rounded-2xl border border-red-500/30 bg-black/40 backdrop-blur-[2px] flex flex-col items-center justify-center p-8 text-center relative overflow-hidden group">
            <h2 className="text-4xl font-light tracking-widest text-white uppercase mb-2">
              EMERGENCY CASE
            </h2>
            <div className="w-12 h-0.5 bg-red-600/50 mb-4"></div>
            <p className="text-xs text-white/70 tracking-[0.2em] font-medium uppercase">
              JOHN DOE - ID: 4829
            </p>
            
            {/* Decorative corners */}
            <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-red-500"></div>
            <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-red-500"></div>
            <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-red-500"></div>
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-red-500"></div>
          </div>
        </div>

        {/* Reveal Overlay - The "Flashlight" Effect */}
        <img
          ref={revealImgRef}
          src="https://placehold.co/1200x800/110000/FFFFFF/png?text=CRITICAL+VITALS+DETECTED&font=montserrat"
          alt="Reveal effect"
          className="absolute top-0 left-0 w-full h-full z-20 pointer-events-none mix-blend-color-dodge opacity-60"
          style={{
            '--mx': '-9999px',
            '--my': '-9999px',
            maskImage: 'radial-gradient(circle at var(--mx) var(--my), rgba(0,0,0,1) 0px, rgba(0,0,0,0.8) 80px, rgba(0,0,0,0) 200px)',
            WebkitMaskImage: 'radial-gradient(circle at var(--mx) var(--my), rgba(0,0,0,1) 0px, rgba(0,0,0,0.8) 80px, rgba(0,0,0,0) 200px)',
            maskRepeat: 'no-repeat',
            WebkitMaskRepeat: 'no-repeat',
          } as React.CSSProperties}
        />
        
        {/* Instruction Hint */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 text-xs text-white/50 tracking-widest uppercase pointer-events-none">
          Move cursor to analyze vitals
        </div>

      </motion.div>
    </div>
  );
}
