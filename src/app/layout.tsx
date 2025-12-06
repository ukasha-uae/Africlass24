import type { Metadata } from 'next';
import './globals.css';
import { cn } from '@/lib/utils';
import Header from '@/components/Header';
import BottomNav from '@/components/BottomNav';
import { Toaster } from "@/components/ui/toaster"
import { FirebaseClientProvider } from '@/firebase';
import StudentProfileSetup from '@/components/StudentProfileSetup';
import InstallPrompt from '@/components/InstallPrompt';

export const metadata: Metadata = {
  title: 'SmartJHS',
  description: 'A Junior High School Learning App for Ghana',
  manifest: '/manifest.json',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=PT+Sans:ital,wght@0,400;0,700;1,400;1,700&display=swap"
          rel="stylesheet"
        />
         <meta name="theme-color" content="#0ea5e9" />
      </head>
      <body className={cn('font-body antialiased bg-background h-full')}>
        <FirebaseClientProvider>
          <div className="relative flex min-h-screen w-full flex-col">
            <Header />
            <main className="flex-1 pb-20 pt-16">{children}</main>
            <StudentProfileSetup />
            <InstallPrompt />
            <BottomNav />
            <Toaster />
          </div>
        </FirebaseClientProvider>
      </body>
    </html>
  );
}
