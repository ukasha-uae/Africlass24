'use client';

import { useFullscreen } from '@/contexts/FullscreenContext';
import { cn } from '@/lib/utils';

export function FullscreenMain({ children }: { children: React.ReactNode }) {
  const { isFullscreen } = useFullscreen();
  
  return (
    <main 
      className={cn(
        "flex-1",
        isFullscreen 
          ? "pb-0 pt-0" // No padding when fullscreen
          : "pb-20 md:pb-8 pt-16" // Normal padding
      )}
      id="main-content"
    >
      {children}
    </main>
  );
}

