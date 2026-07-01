'use client';

import React from 'react';
import ElectricBorder from '@/components/ui/electric-border';
import { Zap, Activity } from 'lucide-react';

export default function CriticalCasesPage() {
  return (
    <div className="min-h-screen bg-black text-white p-8 md:p-16 flex flex-col items-center justify-center font-sans relative overflow-hidden">
      
      {/* Deep Violet/Purple Radial Highlights */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-900/30 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-violet-900/20 rounded-full blur-[150px] pointer-events-none" />
      
      <div className="relative z-10 max-w-4xl w-full mx-auto flex flex-col items-center gap-16">
        
        {/* Showcase: Critical Cases (Red Energy) */}
        <div className="flex flex-col items-center gap-8">
          <div className="relative">
            <ElectricBorder
              color="#ff0055"
              speed={2.0}
              chaos={0.35}
              borderRadius={24}
              className="bg-zinc-900/80 backdrop-blur-sm"
            >
              <div className="p-8 w-64 h-64 flex flex-col items-center justify-center text-center gap-4">
                <div className="p-4 bg-red-950/50 rounded-full text-[#ff0055]">
                  <Zap size={32} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#ff0055] tracking-wider mb-2 uppercase">Critical Cases</h3>
                  <p className="text-zinc-400 text-sm leading-relaxed">
                    High priority patient emergencies.
                  </p>
                </div>
              </div>
            </ElectricBorder>
          </div>
        </div>

        {/* Button Style Demo */}
        <div className="mt-8 flex justify-center">
          <ElectricBorder
            color="#ff0055"
            speed={2.5}
            chaos={0.4}
            borderRadius={9999}
          >
            <button className="px-8 py-3 bg-zinc-900 rounded-full font-bold text-[#ff0055] tracking-widest hover:bg-zinc-800 transition-colors uppercase text-sm flex items-center gap-2">
              <Activity size={16} />
              Condition Occurs
            </button>
          </ElectricBorder>
        </div>

      </div>
    </div>
  );
}
