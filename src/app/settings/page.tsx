'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  Settings as SettingsIcon,
  Trash2,
  Database,
  Bell,
  Moon,
  Sun,
  Globe,
  Shield,
  Download,
  AlertTriangle,
  CheckCircle2,
  HardDrive,
} from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { useToast } from '@/hooks/use-toast';

export default function SettingsPage() {
  const router = useRouter();
  const { toast } = useToast();
  
  // Settings state
  const [notifications, setNotifications] = useState({
    challenges: true,
    studyReminders: true,
    achievements: true,
    groupMessages: true,
  });
  
  const [privacy, setPrivacy] = useState({
    profileVisible: true,
    showRank: true,
    allowChallenges: 'everyone' as 'everyone' | 'school' | 'friends',
  });

  const [storageInfo, setStorageInfo] = useState({
    total: 0,
    challenges: 0,
    progress: 0,
    social: 0,
    cache: 0,
  });

  useEffect(() => {
    calculateStorageUsage();
    loadSettings();
  }, []);

  const loadSettings = () => {
    const savedNotifications = localStorage.getItem('settings-notifications');
    const savedPrivacy = localStorage.getItem('settings-privacy');
    
    if (savedNotifications) {
      setNotifications(JSON.parse(savedNotifications));
    }
    if (savedPrivacy) {
      setPrivacy(JSON.parse(savedPrivacy));
    }
  };

  const calculateStorageUsage = () => {
    let total = 0;
    let challenges = 0;
    let progress = 0;
    let social = 0;
    let cache = 0;

    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (!key) continue;
      
      const value = localStorage.getItem(key) || '';
      const size = new Blob([value]).size;
      total += size;

      if (key.includes('challenge') || key.includes('match')) {
        challenges += size;
      } else if (key.includes('progress') || key.includes('quiz-attempts')) {
        progress += size;
      } else if (key.includes('social') || key.includes('group') || key.includes('achievement')) {
        social += size;
      } else {
        cache += size;
      }
    }

    setStorageInfo({
      total,
      challenges,
      progress,
      social,
      cache,
    });
  };

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
  };

  const saveNotificationSettings = () => {
    localStorage.setItem('settings-notifications', JSON.stringify(notifications));
    toast({
      title: 'Settings saved',
      description: 'Notification preferences updated',
    });
  };

  const savePrivacySettings = () => {
    localStorage.setItem('settings-privacy', JSON.stringify(privacy));
    toast({
      title: 'Settings saved',
      description: 'Privacy settings updated',
    });
  };

  const clearChallengeHistory = () => {
    const keys = Object.keys(localStorage);
    keys.forEach(key => {
      if (key.includes('challenge') || key.includes('match')) {
        localStorage.removeItem(key);
      }
    });
    calculateStorageUsage();
    toast({
      title: 'Challenge history cleared',
      description: 'Old challenge data has been removed',
    });
  };

  const clearSocialData = () => {
    const keys = Object.keys(localStorage);
    keys.forEach(key => {
      if (key.includes('social') || key.includes('group') || key.includes('achievement') || key.includes('question')) {
        localStorage.removeItem(key);
      }
    });
    calculateStorageUsage();
    toast({
      title: 'Social data cleared',
      description: 'Study groups and community data removed',
    });
  };

  const clearAllCache = () => {
    const keysToKeep = ['settings-notifications', 'settings-privacy', 'user-profile', 'firebase-auth'];
    const keys = Object.keys(localStorage);
    keys.forEach(key => {
      if (!keysToKeep.includes(key)) {
        localStorage.removeItem(key);
      }
    });
    calculateStorageUsage();
    toast({
      title: 'Cache cleared',
      description: 'All temporary data has been removed',
    });
  };

  const exportData = () => {
    const data = {
      profile: JSON.parse(localStorage.getItem('user-profile') || '{}'),
      progress: JSON.parse(localStorage.getItem('user-progress') || '{}'),
      challenges: JSON.parse(localStorage.getItem('challengePlayers') || '[]'),
      exportDate: new Date().toISOString(),
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `smartjhs-data-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);

    toast({
      title: 'Data exported',
      description: 'Your data has been downloaded',
    });
  };

  return (
    <div className="container mx-auto p-3 sm:p-4 md:p-6 lg:p-8 pb-20">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <Button
            variant="ghost"
            onClick={() => router.push('/profile')}
            className="mb-4"
          >
            ← Back to Profile
          </Button>
          <div className="flex items-center gap-3 mb-2">
            <SettingsIcon className="h-8 w-8" />
            <h1 className="text-3xl font-bold">Settings</h1>
          </div>
          <p className="text-muted-foreground">
            Manage your account and app preferences
          </p>
        </div>

        {/* Storage Usage */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HardDrive className="h-5 w-5" />
              Storage Usage
            </CardTitle>
            <CardDescription>
              {formatBytes(storageInfo.total)} of local storage used
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Challenge History</span>
                <Badge variant="outline">{formatBytes(storageInfo.challenges)}</Badge>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Learning Progress</span>
                <Badge variant="outline">{formatBytes(storageInfo.progress)}</Badge>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Social Data</span>
                <Badge variant="outline">{formatBytes(storageInfo.social)}</Badge>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Cache & Other</span>
                <Badge variant="outline">{formatBytes(storageInfo.cache)}</Badge>
              </div>
            </div>

            <Separator />

            <div className="space-y-2">
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="outline" className="w-full justify-start">
                    <Trash2 className="h-4 w-4 mr-2" />
                    Clear Challenge History
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Clear Challenge History?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This will remove all completed challenges and match history. Your rating and stats will be preserved.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={clearChallengeHistory}>
                      Clear History
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>

              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="outline" className="w-full justify-start">
                    <Trash2 className="h-4 w-4 mr-2" />
                    Clear Social Data
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Clear Social Data?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This will remove study group posts, achievements, and Q&A data. You can reload it from the server.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={clearSocialData}>
                      Clear Social Data
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>

              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive" className="w-full justify-start">
                    <AlertTriangle className="h-4 w-4 mr-2" />
                    Clear All Cache
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Clear All Cache?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This will remove all temporary data except your account settings. You'll need to reload content when you use the app.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={clearAllCache}>
                      Clear Everything
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Notifications
            </CardTitle>
            <CardDescription>
              Choose what notifications you want to receive
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Challenge Invitations</Label>
                <p className="text-sm text-muted-foreground">
                  When someone challenges you to a game
                </p>
              </div>
              <Switch
                checked={notifications.challenges}
                onCheckedChange={(checked) => {
                  setNotifications(prev => ({ ...prev, challenges: checked }));
                  saveNotificationSettings();
                }}
              />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Study Reminders</Label>
                <p className="text-sm text-muted-foreground">
                  Daily reminders to study and practice
                </p>
              </div>
              <Switch
                checked={notifications.studyReminders}
                onCheckedChange={(checked) => {
                  setNotifications(prev => ({ ...prev, studyReminders: checked }));
                  saveNotificationSettings();
                }}
              />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Achievements</Label>
                <p className="text-sm text-muted-foreground">
                  When you unlock badges and milestones
                </p>
              </div>
              <Switch
                checked={notifications.achievements}
                onCheckedChange={(checked) => {
                  setNotifications(prev => ({ ...prev, achievements: checked }));
                  saveNotificationSettings();
                }}
              />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Group Messages</Label>
                <p className="text-sm text-muted-foreground">
                  New posts in your study groups
                </p>
              </div>
              <Switch
                checked={notifications.groupMessages}
                onCheckedChange={(checked) => {
                  setNotifications(prev => ({ ...prev, groupMessages: checked }));
                  saveNotificationSettings();
                }}
              />
            </div>
          </CardContent>
        </Card>

        {/* Privacy */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Privacy
            </CardTitle>
            <CardDescription>
              Control who can see your profile and challenge you
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Profile Visible</Label>
                <p className="text-sm text-muted-foreground">
                  Other students can view your profile
                </p>
              </div>
              <Switch
                checked={privacy.profileVisible}
                onCheckedChange={(checked) => {
                  setPrivacy(prev => ({ ...prev, profileVisible: checked }));
                  savePrivacySettings();
                }}
              />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Show Rank on Leaderboards</Label>
                <p className="text-sm text-muted-foreground">
                  Display your position in school rankings
                </p>
              </div>
              <Switch
                checked={privacy.showRank}
                onCheckedChange={(checked) => {
                  setPrivacy(prev => ({ ...prev, showRank: checked }));
                  savePrivacySettings();
                }}
              />
            </div>
          </CardContent>
        </Card>

        {/* Data Export */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Download className="h-5 w-5" />
              Data Export
            </CardTitle>
            <CardDescription>
              Download your data for backup or transfer
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={exportData} variant="outline" className="w-full">
              <Download className="h-4 w-4 mr-2" />
              Export My Data
            </Button>
            <p className="text-xs text-muted-foreground mt-2">
              Downloads a JSON file with your profile, progress, and statistics
            </p>
          </CardContent>
        </Card>

        {/* About */}
        <Card>
          <CardHeader>
            <CardTitle>About SmartJHS</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-muted-foreground">
            <p>Version 1.0.0</p>
            <p>© 2025 SmartJHS. All rights reserved.</p>
            <div className="flex flex-wrap gap-2 mt-4">
              <Link href="/about">
                <Button variant="link" className="h-auto p-0">About Us</Button>
              </Link>
              <Link href="/privacy-policy">
                <Button variant="link" className="h-auto p-0">Privacy Policy</Button>
              </Link>
              <Link href="/terms-of-service">
                <Button variant="link" className="h-auto p-0">Terms of Service</Button>
              </Link>
              <Button variant="link" className="h-auto p-0" asChild>
                <a href="mailto:support@smartjhs.edu.gh">Support</a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
