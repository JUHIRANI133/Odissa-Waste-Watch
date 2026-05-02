'use client';

import { cn } from "@/lib/utils";
import React, { useState, useEffect } from 'react';

export function OdishaLogo({ className }: { className?: string }) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 200 200"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("h-10 w-10 text-primary", className)}
      aria-label="Government of Odisha Logo"
    >
      <circle cx="100" cy="100" r="90" fill="none" stroke="currentColor" strokeWidth="12" />
      <circle cx="100" cy="100" r="30" fill="none" stroke="currentColor" strokeWidth="12" />
      {isMounted && Array.from({ length: 24 }).map((_, i) => (
        <line
          key={i}
          x1="100"
          y1="100"
          x2={100 + 75 * Math.cos((i * 15) * (Math.PI / 180))}
          y2={100 + 75 * Math.sin((i * 15) * (Math.PI / 180))}
          stroke="currentColor"
          strokeWidth="6"
          transform={`rotate(7.5, 100, 100)`}
        />
      ))}
    </svg>
  );
}
