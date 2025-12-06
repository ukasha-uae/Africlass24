'use client';

import { useState } from 'react';
import { useFirebase } from '@/firebase';
import { doc, deleteDoc, getDoc } from 'firebase/firestore';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, Trash2, CheckCircle, XCircle, AlertTriangle } from 'lucide-react';

export default function CleanupPage() {
  const { firestore } = useFirebase();
  const [isDeleting, setIsDeleting] = useState(false);
  const [result, setResult] = useState<{ success: boolean; message: string } | null>(null);
  const [lessonExists, setLessonExists] = useState<boolean | null>(null);

  // Path to the old "Introduction to Pronouns" lesson
  const oldLessonPath = 'subjects/english-language/topics/grammar-usage-1/lessons/introduction-to-pronouns';

  const checkIfExists = async () => {
    if (!firestore) {
      setResult({ success: false, message: 'Firestore not initialized' });
      return;
    }

    try {
      const lessonRef = doc(firestore, oldLessonPath);
      const lessonSnap = await getDoc(lessonRef);
      setLessonExists(lessonSnap.exists());
      
      if (lessonSnap.exists()) {
        const data = lessonSnap.data();
        setResult({ 
          success: true, 
          message: `Found lesson: "${data.title}" (ID: ${data.id}, Slug: ${lessonSnap.id})` 
        });
      } else {
        setResult({ 
          success: true, 
          message: 'Old "Introduction to Pronouns" lesson not found in database. It may have been already deleted.' 
        });
      }
    } catch (error) {
      setResult({ 
        success: false, 
        message: `Error checking lesson: ${error instanceof Error ? error.message : 'Unknown error'}` 
      });
    }
  };

  const handleDelete = async () => {
    if (!firestore) {
      setResult({ success: false, message: 'Firestore not initialized' });
      return;
    }

    setIsDeleting(true);
    setResult(null);

    try {
      const lessonRef = doc(firestore, oldLessonPath);
      
      // Check if it exists first
      const lessonSnap = await getDoc(lessonRef);
      if (!lessonSnap.exists()) {
        setResult({ 
          success: true, 
          message: 'Lesson not found. It may have been already deleted.' 
        });
        setLessonExists(false);
        return;
      }

      // Delete the document
      await deleteDoc(lessonRef);
      
      setResult({ 
        success: true, 
        message: 'Successfully deleted "Introduction to Pronouns" lesson! The duplicate is now removed.' 
      });
      setLessonExists(false);
    } catch (error) {
      setResult({ 
        success: false, 
        message: `Failed to delete lesson: ${error instanceof Error ? error.message : 'Unknown error'}` 
      });
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="container mx-auto p-4 md:p-6 lg:p-8 max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trash2 className="h-6 w-6 text-destructive" />
            Delete Old Lesson
          </CardTitle>
          <CardDescription>
            Remove the duplicate "Introduction to Pronouns" lesson from Firestore
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-yellow-50 dark:bg-yellow-950 border border-yellow-200 dark:border-yellow-800 p-4 rounded-lg space-y-2">
            <div className="flex items-start gap-2">
              <AlertTriangle className="h-5 w-5 text-yellow-600 dark:text-yellow-400 mt-0.5 flex-shrink-0" />
              <div className="space-y-2">
                <p className="text-sm font-medium text-yellow-800 dark:text-yellow-200">
                  Target for Deletion:
                </p>
                <ul className="text-sm space-y-1 text-yellow-700 dark:text-yellow-300">
                  <li><strong>Path:</strong> {oldLessonPath}</li>
                  <li><strong>Reason:</strong> Old lesson with slug "introduction-to-pronouns" that was replaced by the updated "pronouns" lesson (ID: eng104-3)</li>
                  <li><strong>Impact:</strong> This will permanently delete the document from Firestore</li>
                </ul>
              </div>
            </div>
          </div>

          {result && (
            <Alert variant={result.success ? 'default' : 'destructive'}>
              {result.success ? (
                <CheckCircle className="h-4 w-4" />
              ) : (
                <XCircle className="h-4 w-4" />
              )}
              <AlertDescription>{result.message}</AlertDescription>
            </Alert>
          )}

          <div className="flex gap-2">
            <Button 
              onClick={checkIfExists} 
              disabled={!firestore}
              variant="outline"
              className="flex-1"
            >
              <AlertTriangle className="mr-2 h-4 w-4" />
              Check if Exists
            </Button>

            <Button 
              onClick={handleDelete} 
              disabled={isDeleting || !firestore || lessonExists === false}
              variant="destructive"
              className="flex-1"
            >
              {isDeleting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Deleting...
                </>
              ) : (
                <>
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete Old Lesson
                </>
              )}
            </Button>
          </div>

          <div className="bg-muted p-4 rounded-lg space-y-2">
            <p className="text-sm font-medium">What happens after deletion:</p>
            <ul className="text-sm space-y-1 list-disc list-inside text-muted-foreground">
              <li>The "Introduction to Pronouns" entry will disappear from the lesson list</li>
              <li>Only the updated "Pronouns" lesson (eng104-3) will remain</li>
              <li>Lesson order will be: Parts of Speech → Nouns → Pronouns → Tenses</li>
              <li>This action cannot be undone (but you can re-seed if needed)</li>
            </ul>
          </div>

          <p className="text-xs text-muted-foreground">
            Note: Make sure you're logged in with Firebase authentication. The Firestore rules require authentication to delete documents.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
