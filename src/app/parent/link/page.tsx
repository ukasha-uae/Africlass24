'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useFirebase } from '@/firebase';
import { useToast } from '@/hooks/use-toast';
import { UserPlus, Link as LinkIcon, ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function LinkStudentPage() {
  const [linkingCode, setLinkingCode] = useState('');
  const [loading, setLoading] = useState(false);
  const { user, firestore } = useFirebase();
  const { toast } = useToast();
  const router = useRouter();

  const handleLinkStudent = async () => {
    if (!linkingCode.trim()) {
      toast({
        title: "Code Required",
        description: "Please enter the 6-digit code from your child's profile",
        variant: "destructive"
      });
      return;
    }

    if (linkingCode.length < 6) {
      toast({
        title: "Code Too Short",
        description: `Please enter all 6 characters (${linkingCode.length}/6 entered)`,
        variant: "destructive"
      });
      return;
    }

    if (linkingCode.length > 6) {
      toast({
        title: "Code Too Long",
        description: "Linking code should be exactly 6 characters",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);

    try {
      // Store linking code mapping in localStorage
      const linkingCodes = JSON.parse(localStorage.getItem('studentLinkingCodes') || '{}');
      
      // Check if this code exists
      const studentId = linkingCodes[linkingCode];
      
      if (!studentId) {
        throw new Error('Invalid code');
      }

      // Store parent's linked students
      const linkedStudents = JSON.parse(localStorage.getItem('parentLinkedStudents') || '[]');
      if (!linkedStudents.includes(studentId)) {
        linkedStudents.push(studentId);
        localStorage.setItem('parentLinkedStudents', JSON.stringify(linkedStudents));
      }
      
      console.log('Successfully linked with student:', studentId);
      
      toast({
        title: "Successfully Linked!",
        description: "You can now monitor your child's progress",
      });

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      router.push('/parent/dashboard');
    } catch (error) {
      console.error('Linking error:', error);
      toast({
        title: "Linking Failed",
        description: "Could not find a student with that code. Please verify and try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4 md:p-6 lg:p-8">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold mb-2">Link Student Account</h1>
          <p className="text-muted-foreground">
            Connect with your child's account to monitor their learning progress
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <LinkIcon className="h-5 w-5" />
              Enter Linking Code
            </CardTitle>
            <CardDescription>
              Ask your child to share their 6-digit linking code from their profile page
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="linkingCode">Linking Code</Label>
              <Input
                id="linkingCode"
                placeholder="ABC123"
                value={linkingCode}
                onChange={(e) => setLinkingCode(e.target.value.toUpperCase())}
                maxLength={6}
                className="text-center text-2xl font-mono tracking-widest uppercase"
              />
              <p className="text-xs text-muted-foreground">
                The code is case-insensitive and should be 6 characters long
              </p>
            </div>

            <Button 
              onClick={handleLinkStudent} 
              disabled={loading}
              size="lg"
              className="w-full"
            >
              {loading ? (
                "Linking..."
              ) : (
                <>
                  <UserPlus className="mr-2 h-4 w-4" />
                  Link Student Account
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
            {linkingCode.length > 0 && linkingCode.length < 6 && (
              <p className="text-sm text-amber-600 dark:text-amber-400 text-center">
                {6 - linkingCode.length} more character{6 - linkingCode.length !== 1 ? 's' : ''} needed
              </p>
            )}

            <div className="mt-6 p-4 bg-muted rounded-lg">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <UserPlus className="h-4 w-4" />
                How it works:
              </h3>
              <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
                <li>Ask your child to log in to their SmartJHS account</li>
                <li>Have them go to their Profile page</li>
                <li>Find the "Link to Parent/Guardian" section</li>
                <li>Copy the 6-digit code shown there</li>
                <li>Enter the code above and click "Link Student Account"</li>
                <li>You'll be instantly connected (sharing the code means approval)</li>
              </ol>
            </div>

            <div className="p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-800">
              <p className="text-sm text-blue-900 dark:text-blue-100">
                <strong>Privacy & Security:</strong> By sharing their code, your child is granting you access to their academic progress, quiz scores, and study statistics. Personal information and messages remain private. Your child can revoke access at any time from their profile settings.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
