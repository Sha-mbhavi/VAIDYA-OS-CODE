import React from "react";
import { cn } from "@/lib/utils";

type SpotlightProps = {
  className?: string;
  fill?: string;
};

export const Spotlight = ({ className, fill = "white" }: SpotlightProps) => {
  return (
    <div
      className={cn(
        "pointer-events-none absolute z-[1] w-[600px] h-[600px] rounded-full blur-[80px] opacity-20",
        className
      )}
      style={{
        background: `radial-gradient(circle, ${fill} 0%, transparent 70%)`,
      }}
    />
  );
};
