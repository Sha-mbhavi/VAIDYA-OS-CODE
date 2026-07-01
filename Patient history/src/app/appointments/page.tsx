'use client';

import React from 'react';
import { InteractiveFolder } from '@/components/ui/interactive-folder';
import { FileText, Calendar, Users } from 'lucide-react';

export default function AppointmentsFolderPage() {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-20 gap-24 relative overflow-hidden">
      {/* Deep Violet/Purple Radial Highlights */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-900/30 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-violet-900/20 rounded-full blur-[150px] pointer-events-none" />

      {/* Header */}
      <div className="relative z-50 flex flex-col items-center mt-8">
        <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-indigo-500 tracking-tight text-center">
          Total Appointments
        </h1>
        <p className="text-purple-300/50 text-lg tracking-wide">
          Manage and review your patient schedule
        </p>
      </div>

      {/* Centered Showcase Section */}
      <div className="relative group z-10 mt-48">
        <div className="absolute -inset-20 bg-gradient-to-tr from-purple-500/10 via-transparent to-indigo-500/10 rounded-full blur-3xl opacity-80" />
        <InteractiveFolder 
          size={3.5} 
          color="#1E3A8A" // Dark blue effect exactly as requested
          items={[
            <Calendar key="1" className="w-6 h-6 text-indigo-500" />,
            <Users key="2" className="w-6 h-6 text-purple-500" />,
            <FileText key="3" className="w-6 h-6 text-blue-500" />
          ]}
        />
      </div>

      {/* Footer Info */}
      <div className="mt-16 text-center z-10">
        <p className="text-purple-400/50 text-sm tracking-widest uppercase font-semibold">
          Click the folder to reveal contents
        </p>
      </div>
    </div>
  );
}
