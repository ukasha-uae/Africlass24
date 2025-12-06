'use client';

import { useRouter } from 'next/navigation';
import { useSwipeNavigation, SwipeIndicator } from '@/hooks/use-swipe-gesture';
import { ReactNode } from 'react';

interface GestureNavigationWrapperProps {
  children: ReactNode;
  nextUrl?: string;
  previousUrl?: string;
  onRefresh?: () => void;
}

export function GestureNavigationWrapper({
  children,
  nextUrl,
  previousUrl,
  onRefresh,
}: GestureNavigationWrapperProps) {
  const router = useRouter();
  
  const { swipeProgress, swipeDirection } = useSwipeNavigation({
    onNext: nextUrl ? () => router.push(nextUrl) : undefined,
    onPrevious: previousUrl ? () => router.push(previousUrl) : undefined,
    onRefresh: onRefresh || (() => window.location.reload()),
    threshold: 100,
  });

  return (
    <>
      {children}
      <SwipeIndicator direction={swipeDirection} progress={swipeProgress} />
    </>
  );
}
