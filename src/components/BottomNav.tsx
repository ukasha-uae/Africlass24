"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BookCopy, User, BrainCircuit, Swords, Users } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/subjects', label: 'Learn', icon: BookCopy },
  { href: '/challenge-arena', label: 'Arena', icon: Swords },
  { href: '/past-questions', label: 'Practice', icon: BrainCircuit },
  { href: '/study-groups', label: 'Social', icon: Users },
  { href: '/profile', label: 'Profile', icon: User },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t bg-background/95 backdrop-blur-sm">
      <div className="grid h-16 grid-cols-5 max-w-2xl mx-auto">
        {navItems.map(({ href, label, icon: Icon }) => {
          const isActive = (pathname === '/' && href === '/') || (pathname !== '/' && href !== '/' && pathname.startsWith(href));
          return (
            <Link
              key={label}
              href={href}
              className={cn(
                'flex flex-col items-center justify-center gap-1 text-sm font-medium transition-colors',
                isActive
                  ? 'text-primary'
                  : 'text-muted-foreground hover:text-primary'
              )}
            >
              <Icon className="h-6 w-6" />
              <span>{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
