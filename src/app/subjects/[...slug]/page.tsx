'use client';

import { useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';

export default function SubjectsCatchAll() {
  const router = useRouter();
  const params = useParams();
  const slug = params.slug as string[];

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedLevel = localStorage.getItem('userEducationLevel');
      const level = storedLevel?.toLowerCase() || 'jhs';
      
      // If accessing /subjects/something, redirect to /subjects/{level}/something
      if (slug && slug.length > 0) {
        const path = slug.join('/');
        router.replace(`/subjects/${level}/${path}`);
      } else {
        router.replace(`/subjects/${level}`);
      }
    }
  }, [router, slug]);

  return (
    <div className="container mx-auto p-4 md:p-6 lg:p-8 flex items-center justify-center min-h-[50vh]">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
        <p className="mt-4 text-muted-foreground">Redirecting...</p>
      </div>
    </div>
  );
}
