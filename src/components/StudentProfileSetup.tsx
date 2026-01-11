"use client";

import React, { useEffect, useMemo, useState, useRef } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useFirebase, useDoc, useFirebaseApp } from '@/firebase';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { useToast } from '@/hooks/use-toast';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Camera } from 'lucide-react';
import SchoolSelector from './SchoolSelector';
import { School, updateSchoolStudentCount } from '@/lib/schools';

export default function StudentProfileSetup({ onSave }: { onSave?: () => void }) {
  const { firestore, user } = useFirebase();
  const firebaseApp = useFirebaseApp();
  const { toast } = useToast();
  const profileDocRef = useMemo(() => (firestore && user ? doc(firestore, `students/${user.uid}`) : null), [firestore, user]);
  const { data: profile, isLoading } = useDoc<any>(profileDocRef as any);

  // Form fields
  const [studentName, setStudentName] = useState('');
  const [schoolName, setSchoolName] = useState('');
  const [selectedSchool, setSelectedSchool] = useState<School | null>(null);
  const [studentClass, setStudentClass] = useState('');
  const [schoolAddress, setSchoolAddress] = useState('');
  const [parentPhoneNumber, setParentPhoneNumber] = useState('');
  const [whatsappNumber, setWhatsappNumber] = useState('');
  const [profilePictureUrl, setProfilePictureUrl] = useState('');
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState<{ code?: string; message?: string } | null>(null);
  const [permTestResult, setPermTestResult] = useState<{ ok: boolean; message: string } | null>(null);
  const hasInitialized = useRef(false);

  useEffect(() => {
    // Only initialize form fields once when profile first loads
    // This prevents overwriting user input while they're typing
    if (profile && !hasInitialized.current) {
      setStudentName(profile.studentName || '');
      setSchoolName(profile.schoolName || '');
      setStudentClass(profile.studentClass || '');
      setSchoolAddress(profile.schoolAddress || '');
      setParentPhoneNumber(profile.parentPhoneNumber || '');
      setWhatsappNumber(profile.whatsappNumber || profile.whatsapp || profile.phone || '');
      setProfilePictureUrl(profile.profilePictureUrl || '');
      hasInitialized.current = true;
    }
  }, [profile]);

  // Profile setup form is now enabled
  
  // Allow access without authentication for testing
  if (isLoading) return null; // Wait for doc check if user exists

  const saveProfile = async () => {
    // Only save to Firestore if authenticated
    if (!firestore || !user) {
      // Save locally for testing
      const localProfile = {
        studentName,
        studentClass,
        schoolName,
        schoolAddress,
        parentPhoneNumber,
        profilePictureUrl: profilePictureUrl || null,
        updatedAt: new Date().toISOString(),
      };
      localStorage.setItem('studentProfile', JSON.stringify(localProfile));
      toast({ 
        title: 'Profile Saved Locally', 
        description: 'Sign in to sync your profile across devices.' 
      });
      if (onSave) onSave();
      return;
    }
    
    setSaving(true);
    try {
      const payload = {
        studentName,
        studentClass,
        schoolName: selectedSchool?.name || schoolName,
        schoolId: selectedSchool?.id || null,
        schoolRegion: selectedSchool?.region || null,
        schoolType: selectedSchool?.type || null,
        schoolAddress,
        parentPhoneNumber,
        whatsappNumber: whatsappNumber || null,
        profilePictureUrl: profilePictureUrl || null,
        updatedAt: serverTimestamp(),
      } as any;
      
      // Log user id for debugging; do not keep in production logging
      console.debug('Saving profile for uid:', user.uid);
      
      await setDoc(doc(firestore, `students/${user.uid}`), payload, { merge: true });
      
      // Update school student count
      if (selectedSchool?.id) {
        updateSchoolStudentCount(selectedSchool.id, 1);
      }
      
      // Validate referral if user was referred (non-blocking)
      try {
        const { validateReferral } = await import('@/lib/referrals');
        // Check if user has completed at least one quiz/lesson (basic activity check)
        const { getUserProgress } = await import('@/lib/user-progress');
        const progress = getUserProgress();
        if (progress.quizzesTaken > 0 || progress.lessonsCompleted > 0) {
          await validateReferral(user.uid);
        }
      } catch (referralError) {
        // Non-critical - don't break profile save
        console.warn('[Referrals] Error validating referral (non-critical):', referralError);
      }
      
      if (onSave) onSave();
      toast({ title: 'Profile saved', description: 'Your student profile has been saved.' });
    } catch (err: any) {
      console.error('Failed to save profile', err);
      setSaveError({ code: err?.code || 'unknown', message: err?.message || String(err) });
      
      // Show detailed message when permission denied
      if (err?.code === 'permission-denied') {
        toast({
          title: 'Save failed — permissions',
          description: 'You do not have permission to save your profile. Troubleshooting: 1) Ensure you are signed in (account icon shows your email); 2) The UID in your account should match the profile path; 3) If developing locally, run the Firestore emulator or deploy the rules; 4) Confirm Firestore security rules allow your user to write to `students/{uid}`. See README for more.',
        });
      } else {
        toast({ title: 'Save failed', description: `[${err?.code}] ${err?.message || 'Could not save your profile to the server.'}` });
      }
    } finally {
      setSaving(false);
    }
  };

  const runPermissionCheck = async () => {
    setPermTestResult(null);
    if (!firestore || !user) {
      setPermTestResult({ ok: false, message: 'You must be signed in to test permissions.' });
      return;
    }
    const ref = doc(firestore, `students/${user.uid}`);
    try {
      await setDoc(ref, { __permissionCheck: serverTimestamp() }, { merge: true });
      setPermTestResult({ ok: true, message: 'Write succeeded — you have permission to write to your profile.' });
    } catch (err: any) {
      setPermTestResult({ ok: false, message: `[${err?.code}] ${err?.message || String(err)}` });
      console.error('Permission check failed', err);
    }
  };

  return (
    <div className="w-full">
      <Card className="w-full flex flex-col border-0 shadow-none">
        <CardHeader className="pb-4">
          <CardTitle className="text-xl">Welcome — Set up your student profile</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 overflow-y-auto">
          {/* Profile Picture Preview */}
          <div className="flex flex-col items-center gap-3 py-2">
            <Avatar className="w-24 h-24">
              <AvatarImage src={profilePictureUrl} alt={studentName || 'Student'} />
              <AvatarFallback className="bg-primary/10 text-primary text-2xl">
                {studentName ? studentName.charAt(0).toUpperCase() : <Camera className="w-8 h-8" />}
              </AvatarFallback>
            </Avatar>
          </div>

          <div>
            <Label className="text-sm">Student Name</Label>
            <Input value={studentName} onChange={(e: any) => setStudentName(e.target.value)} />
          </div>
          <div>
            <Label className="text-sm">Profile Picture URL (optional)</Label>
            <Input 
              placeholder="https://example.com/your-photo.jpg" 
              value={profilePictureUrl} 
              onChange={(e: any) => setProfilePictureUrl(e.target.value)} 
            />
            <p className="text-xs text-muted-foreground mt-1">Paste a link to your profile picture</p>
          </div>
          <SchoolSelector
            value={selectedSchool?.id}
            onChange={(school) => {
              setSelectedSchool(school);
              if (school) {
                setSchoolName(school.name);
              }
            }}
            required={false}
          />
          <div>
            <Label className="text-sm">Class / Year</Label>
            <Input value={studentClass} onChange={(e: any) => setStudentClass(e.target.value)} />
          </div>
          <div>
            <Label className="text-sm">School Address (optional)</Label>
            <Input value={schoolAddress} onChange={(e: any) => setSchoolAddress(e.target.value)} />
          </div>
          <div>
            <Label className="text-sm">Parent / Guardian Phone Number</Label>
            <Input value={parentPhoneNumber} onChange={(e: any) => setParentPhoneNumber(e.target.value)} />
          </div>
          <div>
            <Label className="text-sm">Your WhatsApp Number (for challenge notifications)</Label>
            <Input 
              type="tel"
              placeholder="e.g., 0244123456 or +233244123456"
              value={whatsappNumber} 
              onChange={(e: any) => setWhatsappNumber(e.target.value)} 
            />
            <p className="text-xs text-muted-foreground mt-1">Your WhatsApp number will be used to notify you about challenges when you're offline</p>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between gap-2 py-4 border-t bg-muted/30">
          <div className="flex items-center gap-2">
            {process.env.NODE_ENV === 'development' && (
              <>
                <Button onClick={runPermissionCheck} disabled={!user || !firestore} variant="ghost" size="sm">Test Permissions</Button>
                {permTestResult && (
                  <div className={`text-xs ${permTestResult?.ok ? 'text-green-600' : 'text-destructive'}`}>{permTestResult?.message}</div>
                )}
              </>
            )}
          </div>
          <div>
            <Button onClick={saveProfile} disabled={saving || studentName.trim().length === 0}>
              {saving ? 'Saving...' : 'Save Profile'}
            </Button>
          </div>
        </CardFooter>
        {saveError && (
          <div className="p-3 text-sm text-muted-foreground">
            <strong>Error:</strong> {saveError?.code} — {saveError?.message}
            {saveError?.code === 'permission-denied' && (
              <div className="mt-2 text-xs text-muted-foreground">
                <p className="mb-1">Troubleshooting steps:</p>
                <ol className="list-decimal list-inside">
                  <li>Confirm you are signed in.</li>
                  <li>If developing locally, start the Firebase emulator: <code>firebase emulators:start --only auth,firestore</code>.</li>
                  <li>Verify the Firestore security rules in <code>firestore.rules</code> match the intended protections, and deploy them: <code>firebase deploy --only firestore:rules</code>.</li>
                </ol>
              </div>
            )}
          </div>
        )}
      </Card>
    </div>
  );
}
