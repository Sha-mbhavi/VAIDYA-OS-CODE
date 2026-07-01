'use client';

import React from 'react';
import { SplineScene } from "@/components/ui/splite";
import { Card } from "@/components/ui/card"
import { Spotlight } from "@/components/ui/spotlight"

export default function VoiceAssistantPage() {
  return (
    <div className="w-full min-h-screen bg-black flex items-center justify-center p-4">
      <Card className="w-full max-w-6xl h-[600px] bg-black/[0.96] relative overflow-hidden border-zinc-800">
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
              Your symptoms are more than words — they are signals. Our AI listens, understands, and guides you toward better health
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
    </div>
  );
}
