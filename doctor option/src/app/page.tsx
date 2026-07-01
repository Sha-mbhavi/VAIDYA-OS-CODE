'use client';

import React from 'react';
import { HeroSection } from '@/components/ui/feature-carousel';
import { SplineScene } from "@/components/ui/splite";
import { Card } from "@/components/ui/card"
import { Spotlight } from "@/components/ui/spotlight"

export default function Home() {
  const images = [
    {
      src: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=900&auto=format&fit=crop&q=60',
      alt: 'Doctors in discussion',
    },
    {
      src: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=900&auto=format&fit=crop&q=60',
      alt: 'Stethoscope on a laptop with medical records',
    },
    {
      src: 'https://images.unsplash.com/photo-1581056771107-24ca5f033842?w=900&auto=format&fit=crop&q=60',
      alt: 'Doctor showing patient data on a tablet',
    },
    {
      src: 'https://images.unsplash.com/photo-1638202993928-7267aad84c31?w=900&auto=format&fit=crop&q=60',
      alt: 'Medical professional team looking at charts',
    },
    {
      src: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=900&auto=format&fit=crop&q=60',
      alt: 'Doctor taking clinical notes during an appointment',
    },
  ];

  const title = (
    <>
      Manage Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">Patients</span> & Appointments
    </>
  );

  return (
    <div className="w-full dark">
      <HeroSection
        title={title}
        subtitle="Track total appointments, review incoming patients, and manage your daily clinic."
        images={images}
      />
      <div className="w-full max-w-7xl mx-auto px-4 py-20">
        <SplineSceneBasic />
      </div>
    </div>
  );
}

function SplineSceneBasic() {
  return (
    <Card className="w-full h-[500px] bg-black/[0.96] relative overflow-hidden border-zinc-800">
      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        fill="white"
      />
      
      <div className="flex h-full flex-col md:flex-row">
        {/* Left content */}
        <div className="flex-1 p-8 md:p-12 relative z-10 flex flex-col justify-center">
          <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-blue-400 to-indigo-600">
            AI Voice Assistant
          </h2>
          <p className="mt-6 text-neutral-300 text-lg max-w-lg leading-relaxed">
            An intelligent ambient scribe that listens to patient problems in real-time. 
            It automatically captures symptoms, asks relevant follow-up questions, 
            and generates structured clinical notes so you can focus on care.
          </p>
        </div>

        {/* Right content */}
        <div className="flex-1 relative min-h-[300px]">
          <SplineScene 
            scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
            className="w-full h-full"
          />
        </div>
      </div>
    </Card>
  )
}
