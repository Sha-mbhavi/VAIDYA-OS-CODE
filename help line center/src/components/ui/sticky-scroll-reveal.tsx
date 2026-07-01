'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ContentItem {
  title: string;
  description: string;
  content?: React.ReactNode;
}

export function StickyScroll({
  content,
  contentClassName,
}: {
  content: ContentItem[];
  contentClassName?: string;
}) {
  const [activeCard, setActiveCard] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    container: ref,
    offset: ["start start", "end start"],
  });

  const cardLength = content.length;

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const cardsBreakpoints = content.map((_, index) => index / cardLength);
    const closestBreakpointIndex = cardsBreakpoints.reduce(
      (acc, breakpoint, index) => {
        const distance = Math.abs(latest - breakpoint);
        if (distance < Math.abs(latest - cardsBreakpoints[acc])) {
          return index;
        }
        return acc;
      },
      0
    );
    setActiveCard(closestBreakpointIndex);
  });

  return (
    <motion.div
      className="h-[30rem] overflow-y-auto flex justify-center relative space-x-10 rounded-md p-10 scrollbar-hide w-full max-w-6xl mx-auto"
      ref={ref}
    >
      <div className="div relative flex items-start px-4 w-1/2">
        <div className="max-w-2xl sticky top-10">
          {content.map((item, index) => (
            <motion.div
              key={item.title + index}
              initial={{ opacity: 0 }}
              animate={{
                opacity: activeCard === index ? 1 : 0.3,
              }}
              className="my-20"
            >
              <motion.h2
                className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-indigo-500 mb-6"
              >
                {item.title}
              </motion.h2>
              <motion.p
                className="text-lg text-purple-200/70 max-w-sm mt-10 leading-relaxed font-light"
              >
                {item.description}
              </motion.p>
            </motion.div>
          ))}
          <div className="h-40" />
        </div>
      </div>
      <div
        className={cn(
          "hidden lg:block w-1/2 rounded-md bg-white/5 border border-purple-500/20 sticky top-10 overflow-hidden shadow-[0_0_30px_rgba(147,51,234,0.15)]",
          contentClassName
        )}
        style={{ height: "400px" }}
      >
        {content[activeCard].content ?? null}
      </div>
    </motion.div>
  );
}
