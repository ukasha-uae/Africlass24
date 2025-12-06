"use client";
import Link from 'next/link';
import { GraduationCap } from 'lucide-react';
import AuthModal from './AuthModal';
import { useFirebase, useDoc } from '@/firebase';
import { useHasMounted } from '@/hooks/use-has-mounted';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
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
        <div className="ml-auto flex items-center gap-3">
          {hasMounted && user && profile?.profilePictureUrl && (
            <Link href="/profile">
              <Avatar className="h-8 w-8 cursor-pointer hover:opacity-80 transition-opacity">
                <AvatarImage src={profile.profilePictureUrl} alt={profile.studentName || 'Student'} />
                <AvatarFallback>{profile.studentName?.charAt(0)?.toUpperCase() || 'S'}</AvatarFallback>
              </Avatar>
            </Link>
          )}
          {hasMounted ? <AuthModal /> : <div className="h-8 w-8" />}
        </div>
      </div>
    </header>
  );
}
