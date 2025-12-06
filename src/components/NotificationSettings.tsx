'use client';

import { useState, useEffect } from 'react';
import { Bell, BellOff, Clock, Trophy, Flame, BookOpen, Volume2, VolumeX, Smartphone } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';
import {
  getNotificationPreferences,
  saveNotificationPreferences,
  requestNotificationPermission,
  supportsNotifications,
  initializeNotifications,
  getNotificationStats,
  showNotification,
  NotificationPreferences,
} from '@/lib/notifications';
import { createInAppNotification } from '@/lib/in-app-notifications';

export default function NotificationSettings() {
  const [preferences, setPreferences] = useState<NotificationPreferences | null>(null);
  const [permission, setPermission] = useState<NotificationPermission>('default');
  const [stats, setStats] = useState({ totalReminders: 0, activeReminders: 0, notificationsEnabled: false, permission: 'default', supported: false });
  const { toast } = useToast();

  useEffect(() => {
    const prefs = getNotificationPreferences();
    setPreferences(prefs);
    setStats(getNotificationStats());
    
    if (typeof window !== 'undefined' && 'Notification' in window) {
      setPermission(Notification.permission);
    }
  }, []);

  const handleEnableNotifications = async () => {
    const perm = await requestNotificationPermission();
    setPermission(perm);

    if (perm === 'granted') {
      const newPrefs = { ...preferences!, enabled: true };
      setPreferences(newPrefs);
      saveNotificationPreferences(newPrefs);
      await initializeNotifications();
      
      toast({
        title: 'Notifications Enabled! 🔔',
        description: 'You will now receive study reminders',
      });

      // Show a test notification
      showNotification(
        'Notifications Active!',
        'You will receive study reminders at your chosen times',
        'daily'
      );
    } else {
      toast({
        title: 'Permission Denied',
        description: 'Please enable notifications in your browser settings',
        variant: 'destructive',
      });
    }
  };

  const handleUpdatePreference = (key: keyof NotificationPreferences, value: any) => {
    if (!preferences) return;
    
    const newPrefs = { ...preferences, [key]: value };
    setPreferences(newPrefs);
    saveNotificationPreferences(newPrefs);
    
    toast({
      title: 'Settings Updated',
      description: 'Your notification preferences have been saved',
    });
  };

  const handleTestNotification = () => {
    showNotification(
      'Test Notification 🔔',
      'This is how your study reminders will look!',
      'daily'
    );
    
    toast({
      title: 'Push Notification Sent',
      description: 'Check your device for the test notification',
    });
  };

  const handleTestInAppNotification = () => {
    createInAppNotification({
      userId: 'user-1', // Hardcoded for now
      type: 'system_message',
      title: 'Test In-App Notification',
      message: 'This is a test notification to verify the system is working correctly.',
      data: { test: true }
    });

    toast({
      title: 'In-App Notification Sent',
      description: 'Check your inbox tab to see it!',
    });
  };

  if (!preferences) {
    return <div className="p-8">Loading settings...</div>;
  }

  return (
    <div className="space-y-6">
      {!supportsNotifications() && (
        <Alert className="mb-6">
          <Smartphone className="h-4 w-4" />
          <AlertDescription>
            Your browser doesn't support push notifications. Try using Chrome, Firefox, or Safari.
          </AlertDescription>
        </Alert>
      )}

      {permission === 'denied' && (
        <Alert variant="destructive" className="mb-6">
          <BellOff className="h-4 w-4" />
          <AlertDescription>
            Notifications are blocked. Please enable them in your browser settings.
          </AlertDescription>
        </Alert>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <Bell className="h-8 w-8 text-primary" />
              <div>
                <p className="text-2xl font-bold">{stats.activeReminders}</p>
                <p className="text-sm text-muted-foreground">Active Reminders</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <Badge variant={permission === 'granted' ? 'default' : 'secondary'} className="text-lg px-3 py-1">
                {permission === 'granted' ? '✓' : '✗'}
              </Badge>
              <div>
                <p className="text-sm font-medium capitalize">{permission}</p>
                <p className="text-sm text-muted-foreground">Permission</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Enable Notifications */}
      {permission !== 'granted' && supportsNotifications() && (
        <Card className="border-2 border-primary">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-6 w-6" />
              Enable Push Notifications
            </CardTitle>
            <CardDescription>
              Get timely reminders to maintain your study streak and achieve your learning goals
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={handleEnableNotifications} size="lg" className="w-full">
              <Bell className="h-5 w-5 mr-2" />
              Enable Notifications
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Notification Settings */}
      {permission === 'granted' && (
        <>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Bell className="h-6 w-6 text-primary" />
                  Master Control
                </div>
                <Switch
                  checked={preferences.enabled}
                  onCheckedChange={(checked) => handleUpdatePreference('enabled', checked)}
                />
              </CardTitle>
              <CardDescription>
                Turn all notifications on or off
              </CardDescription>
            </CardHeader>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Study Reminders */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-primary" />
                  Study Reminders
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="daily-reminder">Daily Study Reminder</Label>
                      <p className="text-sm text-muted-foreground">
                        Get notified to study every day
                      </p>
                    </div>
                    <Switch
                      id="daily-reminder"
                      checked={preferences.dailyReminder}
                      onCheckedChange={(checked) => handleUpdatePreference('dailyReminder', checked)}
                      disabled={!preferences.enabled}
                    />
                  </div>
                  
                  {preferences.dailyReminder && (
                    <div className="pl-4 border-l-2 border-primary/20 space-y-2">
                      <Label htmlFor="reminder-time" className="text-sm">
                        Reminder Time
                      </Label>
                      <div className="flex items-center gap-2">
                        <input
                          id="reminder-time"
                          type="time"
                          value={preferences.dailyReminderTime}
                          onChange={(e) => handleUpdatePreference('dailyReminderTime', e.target.value)}
                          disabled={!preferences.enabled}
                          className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                        />
                        <Badge variant="secondary" className="text-xs whitespace-nowrap">
                          {new Date(`2000-01-01T${preferences.dailyReminderTime}`).toLocaleTimeString('en-US', { 
                            hour: 'numeric', 
                            minute: '2-digit',
                            hour12: true 
                          })}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        You'll receive a notification at this time daily
                      </p>
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="streak-reminder" className="flex items-center gap-2">
                      <Flame className="h-4 w-4 text-orange-500" />
                      Streak Reminder
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Alert if you haven't studied today
                    </p>
                  </div>
                  <Switch
                    id="streak-reminder"
                    checked={preferences.streakReminder}
                    onCheckedChange={(checked) => handleUpdatePreference('streakReminder', checked)}
                    disabled={!preferences.enabled}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="quiz-reminder" className="flex items-center gap-2">
                      <BookOpen className="h-4 w-4 text-blue-500" />
                      Quiz Reminder
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Remind to take quizzes
                    </p>
                  </div>
                  <Switch
                    id="quiz-reminder"
                    checked={preferences.quizReminder}
                    onCheckedChange={(checked) => handleUpdatePreference('quizReminder', checked)}
                    disabled={!preferences.enabled}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Achievement & Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-primary" />
                  Achievement Alerts
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="achievement-notifs">Achievement Unlocked</Label>
                    <p className="text-sm text-muted-foreground">
                      Celebrate your milestones
                    </p>
                  </div>
                  <Switch
                    id="achievement-notifs"
                    checked={preferences.achievementNotifications}
                    onCheckedChange={(checked) => handleUpdatePreference('achievementNotifications', checked)}
                    disabled={!preferences.enabled}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="lesson-complete">Lesson Completion</Label>
                    <p className="text-sm text-muted-foreground">
                      Suggest next lesson after completing one
                    </p>
                  </div>
                  <Switch
                    id="lesson-complete"
                    checked={preferences.lessonCompletionReminder}
                    onCheckedChange={(checked) => handleUpdatePreference('lessonCompletionReminder', checked)}
                    disabled={!preferences.enabled}
                  />
                </div>

                <div className="pt-4 border-t">
                  <h4 className="font-semibold mb-3">Notification Style</h4>
                  
                  <div className="flex items-center justify-between mb-3">
                    <Label htmlFor="sound" className="flex items-center gap-2">
                      {preferences.sound ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
                      Sound
                    </Label>
                    <Switch
                      id="sound"
                      checked={preferences.sound}
                      onCheckedChange={(checked) => handleUpdatePreference('sound', checked)}
                      disabled={!preferences.enabled}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label htmlFor="vibrate" className="flex items-center gap-2">
                      <Smartphone className="h-4 w-4" />
                      Vibration
                    </Label>
                    <Switch
                      id="vibrate"
                      checked={preferences.vibrate}
                      onCheckedChange={(checked) => handleUpdatePreference('vibrate', checked)}
                      disabled={!preferences.enabled}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Test Notification */}
          <Card>
            <CardHeader>
              <CardTitle>Test Notifications</CardTitle>
              <CardDescription>
                Send test notifications to verify everything is working
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col sm:flex-row gap-4">
              <Button 
                onClick={handleTestNotification} 
                variant="outline"
                disabled={!preferences.enabled}
              >
                <Bell className="h-4 w-4 mr-2" />
                Test Push Notification
              </Button>
              
              <Button 
                onClick={handleTestInAppNotification} 
                variant="outline"
              >
                <Bell className="h-4 w-4 mr-2" />
                Test In-App Notification
              </Button>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}
