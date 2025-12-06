'use client';

import { useState } from 'react';
import { useFirebase } from '@/firebase';
import { seedDatabase } from '@/lib/seed';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, Database, CheckCircle, XCircle } from 'lucide-react';

export default function SeedPage() {
  const { firestore } = useFirebase();
  const [isSeeding, setIsSeeding] = useState(false);
  const [result, setResult] = useState<{ success: boolean; message: string } | null>(null);

  const handleSeed = async () => {
    if (!firestore) {
      setResult({ success: false, message: 'Firestore not initialized' });
      return;
    }

    setIsSeeding(true);
    setResult(null);

    try {
      await seedDatabase(firestore);
      setResult({ success: true, message: 'Database seeded successfully! All lessons have been updated with the latest content.' });
    } catch (error) {
      setResult({ 
        success: false, 
        message: `Failed to seed database: ${error instanceof Error ? error.message : 'Unknown error'}` 
      });
    } finally {
      setIsSeeding(false);
    }
  };

  return (
    <div className="container mx-auto p-4 md:p-6 lg:p-8 max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="h-6 w-6" />
            Database Seeding
          </CardTitle>
          <CardDescription>
            Re-seed the Firestore database with the latest lesson content from jhs-data.ts
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-muted p-4 rounded-lg space-y-2">
            <p className="text-sm font-medium">What this does:</p>
            <ul className="text-sm space-y-1 list-disc list-inside">
              <li>Reads all subjects, topics, and lessons from jhs-data.ts</li>
              <li>Writes them to Firestore database</li>
              <li>Updates existing lessons with new content (like the expanded Nouns lesson)</li>
              <li>Creates quiz collections for lessons with quizzes</li>
            </ul>
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

          <Button 
            onClick={handleSeed} 
            disabled={isSeeding || !firestore}
            className="w-full"
            size="lg"
          >
            {isSeeding ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Seeding Database...
              </>
            ) : (
              <>
                <Database className="mr-2 h-4 w-4" />
                Seed Database Now
              </>
            )}
          </Button>

          <p className="text-xs text-muted-foreground">
            Note: This operation will update all lessons in Firestore. Make sure you have the necessary permissions.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
