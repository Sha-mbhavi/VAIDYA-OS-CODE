'use client';
import { cn } from '@/lib/utils';
import React from 'react';

type InfiniteSliderProps = {
  children: React.ReactNode;
  gap?: number;
  duration?: number;
  durationOnHover?: number;
  direction?: 'horizontal' | 'vertical';
  reverse?: boolean;
  className?: string;
};

export function InfiniteSlider({
  children,
  gap = 16,
  duration = 25,
  direction = 'horizontal',
  reverse = false,
  className,
}: InfiniteSliderProps) {
  return (
    <div className={cn('flex overflow-hidden w-full', className)} style={{ gap }}>
      <div
        className={cn(
          "flex shrink-0 min-w-full justify-around",
          direction === 'horizontal' ? "flex-row" : "flex-col"
        )}
        style={{
          gap,
          animation: `marquee ${duration}s linear infinite ${reverse ? 'reverse' : 'normal'}`,
        }}
      >
        {children}
      </div>
      <div
        className={cn(
          "flex shrink-0 min-w-full justify-around",
          direction === 'horizontal' ? "flex-row" : "flex-col"
        )}
        style={{
          gap,
          animation: `marquee ${duration}s linear infinite ${reverse ? 'reverse' : 'normal'}`,
        }}
      >
        {children}
      </div>
      <style>{`
        @keyframes marquee {
          0% { transform: translate${direction === 'horizontal' ? 'X' : 'Y'}(0); }
          100% { transform: translate${direction === 'horizontal' ? 'X' : 'Y'}(calc(-100% - ${gap}px)); }
        }
      `}</style>
    </div>
  );
}
