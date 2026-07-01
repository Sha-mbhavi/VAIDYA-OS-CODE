'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

export default function RegistrationJourneyPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Smooth out the drawing animation slightly
  const pathLength = useSpring(scrollYProgress, {
    stiffness: 400,
    damping: 90
  });

  const steps = [
    {
      title: "Enter Name, Category, Age",
      description: "Provide the fundamental demographic details for the patient record."
    },
    {
      title: "Address, Mobile Number",
      description: "Ensure we have the correct location and direct contact line for the patient."
    },
    {
      title: "E-mail Address",
      description: "Digital correspondence and secure document delivery setup."
    },
    {
      title: "Proceed and Save",
      description: "Verify all entered information and finalize the registration securely."
    }
  ];

  return (
    <div className="min-h-[300vh] bg-black text-white relative font-sans" ref={containerRef}>
      {/* Deep Violet/Purple Radial Highlights */}
      <div className="fixed top-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-900/30 rounded-full blur-[120px] pointer-events-none z-0" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-violet-900/20 rounded-full blur-[150px] pointer-events-none z-0" />

      {/* Main Heading Section */}
      <div className="h-screen flex flex-col items-center justify-center relative z-10 sticky top-0 -mb-[100vh] pointer-events-none">
        <h1 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-indigo-500 tracking-tight text-center mb-6">
          Registration
        </h1>
        <p className="text-purple-300/50 text-xl tracking-wide max-w-xl text-center">
          Scroll down to unfold the registration path.
        </p>
      </div>

      {/* The Scroll Journey Container */}
      <div className="relative w-full max-w-4xl mx-auto pt-[100vh] pb-[50vh] z-20">
        
        {/* The SVG Line */}
        <div className="absolute left-8 md:left-1/2 top-[100vh] bottom-[50vh] w-2 -translate-x-1/2 overflow-visible">
          <svg
            width="40"
            height="100%"
            viewBox="0 0 40 1000"
            preserveAspectRatio="none"
            className="absolute top-0 left-1/2 -translate-x-1/2 w-4 h-full"
          >
            {/* Background Line */}
            <path
              d="M 20 0 L 20 1000"
              fill="none"
              stroke="rgba(147, 51, 234, 0.2)"
              strokeWidth="4"
              vectorEffect="non-scaling-stroke"
            />
            {/* Animated Draw Line */}
            <motion.path
              d="M 20 0 L 20 1000"
              fill="none"
              stroke="#a855f7" // Purple-500
              strokeWidth="4"
              vectorEffect="non-scaling-stroke"
              style={{ pathLength }}
              className="drop-shadow-[0_0_10px_rgba(168,85,247,0.8)]"
            />
          </svg>
        </div>

        {/* The Steps Content */}
        <div className="flex flex-col justify-between h-full relative z-30" style={{ height: '150vh' }}>
          {steps.map((step, idx) => (
            <div 
              key={idx} 
              className={`flex w-full items-center ${
                idx % 2 === 0 ? 'md:justify-start' : 'md:justify-end'
              } pl-20 md:pl-0 mb-32`}
            >
              {/* Dot on the timeline */}
              <div className="absolute left-8 md:left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-black border-4 border-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.6)]" />
              
              {/* Card */}
              <div className={`w-full md:w-5/12 ${idx % 2 === 0 ? 'md:pr-16 md:text-right' : 'md:pl-16 md:text-left'} text-left`}>
                <div className="p-8 rounded-2xl bg-zinc-900/50 backdrop-blur-md border border-purple-500/20 shadow-2xl hover:border-purple-500/50 transition-colors">
                  <h3 className="text-2xl font-bold text-white mb-3 tracking-wide">{step.title}</h3>
                  <p className="text-zinc-400 leading-relaxed text-sm">
                    {step.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
