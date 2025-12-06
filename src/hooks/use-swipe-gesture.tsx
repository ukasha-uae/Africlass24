import { useEffect, useRef, useState, RefObject } from 'react';

export interface SwipeHandlers {
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  onSwipeUp?: () => void;
  onSwipeDown?: () => void;
}

export interface SwipeConfig {
  minSwipeDistance?: number;
  maxSwipeTime?: number;
  preventDefaultTouchmoveEvent?: boolean;
}

interface TouchPosition {
  x: number;
  y: number;
  time: number;
}

export function useSwipeGesture(
  handlers: SwipeHandlers,
  config: SwipeConfig = {}
) {
  const {
    minSwipeDistance = 50,
    maxSwipeTime = 300,
    preventDefaultTouchmoveEvent = false,
  } = config;

  const touchStart = useRef<TouchPosition | null>(null);
  const touchEnd = useRef<TouchPosition | null>(null);

  const handleTouchStart = (e: TouchEvent) => {
    touchEnd.current = null;
    touchStart.current = {
      x: e.targetTouches[0].clientX,
      y: e.targetTouches[0].clientY,
      time: Date.now(),
    };
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (preventDefaultTouchmoveEvent && touchStart.current) {
      e.preventDefault();
    }
    touchEnd.current = {
      x: e.targetTouches[0].clientX,
      y: e.targetTouches[0].clientY,
      time: Date.now(),
    };
  };

  const handleTouchEnd = () => {
    if (!touchStart.current || !touchEnd.current) return;

    const distanceX = touchStart.current.x - touchEnd.current.x;
    const distanceY = touchStart.current.y - touchEnd.current.y;
    const duration = touchEnd.current.time - touchStart.current.time;

    const absDistanceX = Math.abs(distanceX);
    const absDistanceY = Math.abs(distanceY);

    // Check if swipe was fast enough
    if (duration > maxSwipeTime) return;

    // Determine swipe direction based on larger distance
    if (absDistanceX > absDistanceY) {
      // Horizontal swipe
      if (absDistanceX > minSwipeDistance) {
        if (distanceX > 0) {
          handlers.onSwipeLeft?.();
        } else {
          handlers.onSwipeRight?.();
        }
      }
    } else {
      // Vertical swipe
      if (absDistanceY > minSwipeDistance) {
        if (distanceY > 0) {
          handlers.onSwipeUp?.();
        } else {
          handlers.onSwipeDown?.();
        }
      }
    }

    touchStart.current = null;
    touchEnd.current = null;
  };

  return {
    onTouchStart: handleTouchStart,
    onTouchMove: handleTouchMove,
    onTouchEnd: handleTouchEnd,
  };
}

// Hook version that attaches to a ref
export function useSwipeGestureRef<T extends HTMLElement>(
  ref: RefObject<T>,
  handlers: SwipeHandlers,
  config?: SwipeConfig
) {
  const swipeHandlers = useSwipeGesture(handlers, config);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    element.addEventListener('touchstart', swipeHandlers.onTouchStart);
    element.addEventListener('touchmove', swipeHandlers.onTouchMove);
    element.addEventListener('touchend', swipeHandlers.onTouchEnd);

    return () => {
      element.removeEventListener('touchstart', swipeHandlers.onTouchStart);
      element.removeEventListener('touchmove', swipeHandlers.onTouchMove);
      element.removeEventListener('touchend', swipeHandlers.onTouchEnd);
    };
  }, [ref, swipeHandlers]);
}

// Hook for page navigation with visual feedback
export function useSwipeNavigation(options: {
  onNext?: () => void;
  onPrevious?: () => void;
  onRefresh?: () => void;
  threshold?: number;
}) {
  const { onNext, onPrevious, onRefresh, threshold = 100 } = options;
  const [swipeProgress, setSwipeProgress] = useState(0);
  const [swipeDirection, setSwipeDirection] = useState<'left' | 'right' | 'down' | null>(null);
  
  const touchStart = useRef<TouchPosition | null>(null);
  const isScrolling = useRef<boolean>(false);

  const handleTouchStart = (e: TouchEvent) => {
    touchStart.current = {
      x: e.targetTouches[0].clientX,
      y: e.targetTouches[0].clientY,
      time: Date.now(),
    };
    isScrolling.current = false;
    setSwipeDirection(null);
    setSwipeProgress(0);
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (!touchStart.current) return;

    const currentX = e.targetTouches[0].clientX;
    const currentY = e.targetTouches[0].clientY;
    const diffX = currentX - touchStart.current.x;
    const diffY = currentY - touchStart.current.y;

    // Detect if user is scrolling vertically
    if (Math.abs(diffY) > Math.abs(diffX) && !isScrolling.current) {
      isScrolling.current = true;
    }

    if (isScrolling.current && diffY > threshold && window.scrollY === 0) {
      // Pull to refresh
      setSwipeDirection('down');
      setSwipeProgress(Math.min((diffY / threshold) * 100, 100));
    } else if (!isScrolling.current) {
      // Horizontal navigation
      if (Math.abs(diffX) > 10) {
        const direction = diffX > 0 ? 'right' : 'left';
        setSwipeDirection(direction);
        setSwipeProgress(Math.min((Math.abs(diffX) / threshold) * 100, 100));
      }
    }
  };

  const handleTouchEnd = () => {
    if (!touchStart.current) return;

    const progress = swipeProgress;
    const direction = swipeDirection;

    setSwipeProgress(0);
    setSwipeDirection(null);

    if (progress >= 100) {
      if (direction === 'left' && onNext) {
        onNext();
      } else if (direction === 'right' && onPrevious) {
        onPrevious();
      } else if (direction === 'down' && onRefresh) {
        onRefresh();
      }
    }

    touchStart.current = null;
    isScrolling.current = false;
  };

  useEffect(() => {
    document.addEventListener('touchstart', handleTouchStart);
    document.addEventListener('touchmove', handleTouchMove);
    document.addEventListener('touchend', handleTouchEnd);

    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [swipeProgress, swipeDirection]);

  return {
    swipeProgress,
    swipeDirection,
    isActive: swipeProgress > 0,
  };
}

// Visual feedback component for swipe gestures
export function SwipeIndicator({
  direction,
  progress,
}: {
  direction: 'left' | 'right' | 'down' | null;
  progress: number;
}) {
  if (!direction || progress === 0) return null;

  const icons = {
    left: '→',
    right: '←',
    down: '↓',
  };

  const positions = {
    left: 'right-4',
    right: 'left-4',
    down: 'top-20 left-1/2 -translate-x-1/2',
  };

  return (
    <div
      className={`fixed ${positions[direction]} top-1/2 -translate-y-1/2 z-50 pointer-events-none transition-opacity`}
      style={{ opacity: progress / 100 }}
    >
      <div className="bg-primary text-primary-foreground rounded-full p-4 shadow-lg">
        <span className="text-2xl">{icons[direction]}</span>
      </div>
    </div>
  );
}
