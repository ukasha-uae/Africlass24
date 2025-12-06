'use client';

import { useRef, useState } from 'react';
import { useSwipeGesture } from '@/hooks/use-swipe-gesture';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';

interface SwipeableCardProps {
  children: React.ReactNode;
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  showNavigationHints?: boolean;
  currentIndex?: number;
  totalCount?: number;
  className?: string;
}

export function SwipeableCard({
  children,
  onSwipeLeft,
  onSwipeRight,
  showNavigationHints = true,
  currentIndex,
  totalCount,
  className,
}: SwipeableCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [swipeOffset, setSwipeOffset] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleSwipeLeft = () => {
    if (onSwipeLeft) {
      setIsAnimating(true);
      setSwipeOffset(-100);
      setTimeout(() => {
        onSwipeLeft();
        setSwipeOffset(0);
        setIsAnimating(false);
      }, 300);
    }
  };

  const handleSwipeRight = () => {
    if (onSwipeRight) {
      setIsAnimating(true);
      setSwipeOffset(100);
      setTimeout(() => {
        onSwipeRight();
        setSwipeOffset(0);
        setIsAnimating(false);
      }, 300);
    }
  };

  const swipeHandlers = useSwipeGesture(
    {
      onSwipeLeft: onSwipeLeft ? handleSwipeLeft : undefined,
      onSwipeRight: onSwipeRight ? handleSwipeRight : undefined,
    },
    {
      minSwipeDistance: 50,
      maxSwipeTime: 300,
    }
  );

  return (
    <div className="relative touch-pan-y">
      <div
        ref={cardRef}
        onTouchStart={(e) => swipeHandlers.onTouchStart(e.nativeEvent)}
        onTouchMove={(e) => swipeHandlers.onTouchMove(e.nativeEvent)}
        onTouchEnd={swipeHandlers.onTouchEnd}
        className={cn(
          'relative transition-transform',
          isAnimating && 'duration-300',
          className
        )}
        style={{
          transform: `translateX(${swipeOffset}%)`,
        }}
      >
        {children}
      </div>

      {showNavigationHints && (totalCount !== undefined && currentIndex !== undefined) && (
        <div className="flex items-center justify-between mt-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            {onSwipeRight && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleSwipeRight}
                disabled={isAnimating}
              >
                <ChevronLeft className="h-4 w-4 mr-1" />
                Previous
              </Button>
            )}
          </div>
          <div className="flex items-center gap-1">
            {Array.from({ length: totalCount }, (_, i) => (
              <div
                key={i}
                className={cn(
                  'h-2 rounded-full transition-all',
                  i === currentIndex
                    ? 'w-6 bg-primary'
                    : 'w-2 bg-muted-foreground/30'
                )}
              />
            ))}
          </div>
          <div className="flex items-center gap-2">
            {onSwipeLeft && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleSwipeLeft}
                disabled={isAnimating}
              >
                Next
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            )}
          </div>
        </div>
      )}

      {/* Swipe hint for first time users */}
      {showNavigationHints && !isAnimating && (
        <div className="absolute -bottom-12 left-0 right-0 text-center text-xs text-muted-foreground animate-pulse md:hidden">
          Swipe left or right to navigate
        </div>
      )}
    </div>
  );
}

// Carousel component for multiple swipeable items
interface SwipeableCarouselProps {
  items: React.ReactNode[];
  currentIndex: number;
  onIndexChange: (index: number) => void;
  className?: string;
}

export function SwipeableCarousel({
  items,
  currentIndex,
  onIndexChange,
  className,
}: SwipeableCarouselProps) {
  const handleNext = () => {
    if (currentIndex < items.length - 1) {
      onIndexChange(currentIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      onIndexChange(currentIndex - 1);
    }
  };

  return (
    <SwipeableCard
      onSwipeLeft={currentIndex < items.length - 1 ? handleNext : undefined}
      onSwipeRight={currentIndex > 0 ? handlePrevious : undefined}
      currentIndex={currentIndex}
      totalCount={items.length}
      className={className}
    >
      {items[currentIndex]}
    </SwipeableCard>
  );
}
