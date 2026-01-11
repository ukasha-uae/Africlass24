'use client';

import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useFirebase, useDoc } from '@/firebase';
import { doc } from 'firebase/firestore';
import { useMemo } from 'react';
import StudentProfileSetup from './StudentProfileSetup';
import { UserPlus } from 'lucide-react';

/**
 * FirstTimeProfileModal - Shows profile setup form to new users after login
 * 
 * This modal appears when:
 * - User is authenticated (signed in)
 * - User's student profile doesn't exist or is incomplete (no studentName)
 * - User hasn't dismissed this modal yet (stored in localStorage)
 */
export default function FirstTimeProfileModal() {
  const { user, firestore } = useFirebase();
  const [open, setOpen] = useState(false);
  const [profileComplete, setProfileComplete] = useState(false);

  const profileDocRef = useMemo(() => 
    (firestore && user ? doc(firestore, `students/${user.uid}`) : null), 
    [firestore, user]
  );
  const { data: profile, isLoading } = useDoc<any>(profileDocRef as any);

  useEffect(() => {
    // Wait for profile to load before checking
    if (!user || !firestore || isLoading) {
      setOpen(false);
      return;
    }

    // CRITICAL: Only show modal for authenticated (non-anonymous) users
    // Anonymous users should not be prompted to complete profile
    if (user.isAnonymous) {
      setOpen(false);
      return;
    }

    // Check if user has already completed their profile at least once
    const completedKey = `profileCompleted_${user.uid}`;
    const hasCompletedBefore = typeof window !== 'undefined' && localStorage.getItem(completedKey) === 'true';

    // Check if profile exists and is complete (has studentName)
    const profileExists = profile && profile.studentName && profile.studentName.trim().length > 0;
    setProfileComplete(profileExists);

    // If profile is complete, mark it as completed (for future checks)
    if (profileExists && !hasCompletedBefore) {
      localStorage.setItem(completedKey, 'true');
    }

    // Only show modal if:
    // 1. User hasn't completed profile before (not even once)
    // 2. Profile doesn't currently exist or is incomplete
    if (!hasCompletedBefore && !profileExists) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [user, firestore, profile, isLoading]);


  const handleClose = () => {
    setOpen(false);
    // Don't do anything special - if they close without saving, modal can show again later
  };

  const handleSave = () => {
    // Profile was saved, close the modal and mark as completed permanently
    setOpen(false);
    if (user?.uid && typeof window !== 'undefined') {
      // Mark profile as completed - this prevents the modal from showing again
      localStorage.setItem(`profileCompleted_${user.uid}`, 'true');
    }
  };

  // Don't show if:
  // - No user
  // - Still loading
  // - Profile is already complete
  // - Modal is closed
  if (!user || isLoading || profileComplete || !open) {
    return null;
  }

  return (
    <Dialog open={open} onOpenChange={(isOpen) => {
      if (!isOpen) {
        handleClose();
      }
    }}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-hidden flex flex-col p-0">
        <DialogHeader className="px-6 pt-6 pb-4 border-b">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-full">
              <UserPlus className="h-5 w-5 text-primary" />
            </div>
            <div>
              <DialogTitle className="text-2xl">Complete Your Profile</DialogTitle>
              <DialogDescription className="text-base mt-1">
                Set up your student profile to personalize your experience and see your name throughout the app
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>
        <div className="overflow-y-auto flex-1 px-6">
          <StudentProfileSetup onSave={handleSave} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
