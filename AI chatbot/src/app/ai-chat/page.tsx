'use client';

import React, { useState } from 'react';
import { RadiantPromptInput } from '@/components/ui/radiant-prompt-input';

export default function AIChatPage() {
  const [lastSubmitted, setLastSubmitted] = useState<string | null>(null);

  const handleSubmit = (value: string) => {
    setLastSubmitted(value);
    console.log("Submitted:", value);
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-black p-4 md:p-8 font-sans transition-colors duration-300">
      
      {/* Background decoration for the backdrop blur */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-violet-600/20 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 w-full max-w-4xl flex flex-col items-center gap-12">
        
        {/* Header Text */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-white to-purple-300 pb-2">
            How can I help?
          </h1>
          <p className="text-purple-200/80 text-lg md:text-xl font-light max-w-lg mx-auto">
            Speak with our AI health assistant and get personalized support whenever you need it.
          </p>
        </div>

        {/* The Component */}
        <div className="w-full px-4">
          <RadiantPromptInput 
            onSubmit={handleSubmit} 
            placeholder="Ask anything..."
          />
        </div>

        {/* Feedback / State Display */}
        <div className="h-12 flex items-center justify-center">
          {lastSubmitted && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <span className="px-4 py-2 rounded-full bg-purple-900/50 text-sm text-purple-200 border border-purple-500/30">
                You asked: <span className="text-white font-medium">{lastSubmitted}</span>
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
