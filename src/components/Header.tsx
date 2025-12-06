"use client";
import Link from 'next/link';
import { GraduationCap, Users, MessagesSquare, Trophy, HelpCircle, ChevronDown } from 'lucide-react';
import AuthModal from './AuthModal';
import { ThemeToggle } from './ThemeToggle';
import NotificationBell from './NotificationBell';
import { useFirebase, useDoc } from '@/firebase';
import { useHasMounted } from '@/hooks/use-has-mounted';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { doc } from 'firebase/firestore';
import { useMemo } from 'react';

export default function Header() {
  const { user, firestore } = useFirebase();
  const hasMounted = useHasMounted();
  const profileRef = useMemo(() => (user && firestore) ? doc(firestore, `students/${user.uid}`) : null, [user, firestore]);
  const { data: profile } = useDoc<any>(profileRef as any);
  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b bg-background/95 backdrop-blur-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2">
          <GraduationCap className="h-7 w-7 text-primary" />
          <span className="text-xl font-bold font-headline">SmartJHS</span>
        </Link>
        <div className="ml-auto flex items-center gap-2">
          <ThemeToggle />
          {hasMounted && user && (
            <>
              {/* Social Menu Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="flex items-center gap-1">
                    <MessagesSquare className="h-4 w-4" />
                    <span className="hidden sm:inline">Social</span>
                    <ChevronDown className="h-3 w-3" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuLabel>Community</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <Link href="/study-groups">
                    <DropdownMenuItem className="cursor-pointer">
                      <MessagesSquare className="h-4 w-4 mr-2" />
                      Study Groups
                    </DropdownMenuItem>
                  </Link>
                  <Link href="/achievements-feed">
                    <DropdownMenuItem className="cursor-pointer">
                      <Trophy className="h-4 w-4 mr-2" />
                      Achievements
                    </DropdownMenuItem>
                  </Link>
                  <Link href="/community">
                    <DropdownMenuItem className="cursor-pointer">
                      <HelpCircle className="h-4 w-4 mr-2" />
                      Q&A Community
                    </DropdownMenuItem>
                  </Link>
                </DropdownMenuContent>
              </DropdownMenu>

              <Link href="/challenge-arena" className="hidden md:block">
                <Button variant="ghost" size="sm" className="flex items-center gap-2 text-primary">
                  <Trophy className="h-4 w-4" />
                  <span className="font-semibold">Arena</span>
                </Button>
              </Link>
              <Link href="/study-schedule" className="hidden lg:block">
                <Button variant="ghost" size="sm" className="flex items-center gap-2">
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span>Schedule</span>
                </Button>
              </Link>
              <NotificationBell />
              <Link href="/teacher/dashboard" className="hidden lg:block">
                <Button variant="ghost" size="sm" className="flex items-center gap-2">
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                  <span>Teacher</span>
                </Button>
              </Link>
              <Link href="/parent/dashboard" className="hidden md:block">
                <Button variant="ghost" size="sm" className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  <span>Parent Portal</span>
                </Button>
              </Link>
              {profile?.profilePictureUrl && (
                <Link href="/profile">
                  <Avatar className="h-8 w-8 cursor-pointer hover:opacity-80 transition-opacity">
                    <AvatarImage src={profile.profilePictureUrl} alt={profile.studentName || 'Student'} />
                    <AvatarFallback>{profile.studentName?.charAt(0)?.toUpperCase() || 'S'}</AvatarFallback>
                  </Avatar>
                </Link>
              )}
            </>
          )}
          {hasMounted ? <AuthModal /> : <div className="h-8 w-8" />}
        </div>
      </div>
    </header>
  );
}
