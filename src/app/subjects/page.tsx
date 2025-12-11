
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function SubjectsPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to appropriate level based on localStorage
    if (typeof window !== 'undefined') {
      const storedLevel = localStorage.getItem('userEducationLevel');
      const level = storedLevel?.toLowerCase() || 'jhs';
      router.replace(`/subjects/${level}`);
    }
  }, [router]);

  return (
    <div className="container mx-auto p-4 md:p-6 lg:p-8 flex items-center justify-center min-h-[50vh]">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
        <p className="mt-4 text-muted-foreground">Loading subjects...</p>
      </div>
    </div>
  );
}
