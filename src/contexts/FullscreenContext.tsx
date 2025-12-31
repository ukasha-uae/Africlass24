'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

interface FullscreenContextType {
  isFullscreen: boolean;
  setFullscreen: (value: boolean) => void;
}

const FullscreenContext = createContext<FullscreenContextType | undefined>(undefined);

export function FullscreenProvider({ children }: { children: React.ReactNode }) {
  const [isFullscreen, setIsFullscreen] = useState(false);

  const setFullscreen = (value: boolean) => {
    setIsFullscreen(value);
    // Prevent body scroll when in fullscreen mode
    if (value) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  };

  return (
    <FullscreenContext.Provider value={{ isFullscreen, setFullscreen }}>
      {children}
    </FullscreenContext.Provider>
  );
}

export function useFullscreen() {
  const context = useContext(FullscreenContext);
  if (context === undefined) {
    throw new Error('useFullscreen must be used within a FullscreenProvider');
  }
  return context;
}

