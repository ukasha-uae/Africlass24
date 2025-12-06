// Push Notifications and Study Reminders System

export interface StudyReminder {
  id: string;
  type: 'daily' | 'lesson' | 'quiz' | 'streak' | 'achievement';
  title: string;
  message: string;
  scheduledTime: string; // ISO format
  enabled: boolean;
  recurrence?: 'daily' | 'weekly' | 'custom';
  days?: number[]; // 0-6 for Sunday-Saturday
}

export interface NotificationPreferences {
  enabled: boolean;
  dailyReminder: boolean;
  dailyReminderTime: string; // HH:MM format
  streakReminder: boolean;
  quizReminder: boolean;
  achievementNotifications: boolean;
  lessonCompletionReminder: boolean;
  sound: boolean;
  vibrate: boolean;
}

// Check if browser supports notifications
export const supportsNotifications = (): boolean => {
  if (typeof window === 'undefined') return false;
  return 'Notification' in window && 'serviceWorker' in navigator;
};

// Request notification permission
export const requestNotificationPermission = async (): Promise<NotificationPermission> => {
  if (!supportsNotifications()) {
    return 'denied';
  }

  if (Notification.permission === 'granted') {
    return 'granted';
  }

  if (Notification.permission !== 'denied') {
    const permission = await Notification.requestPermission();
    return permission;
  }

  return Notification.permission;
};

// Get current notification preferences
export const getNotificationPreferences = (): NotificationPreferences => {
  if (typeof window === 'undefined') {
    return getDefaultPreferences();
  }

  const stored = localStorage.getItem('notificationPreferences');
  if (stored) {
    return JSON.parse(stored);
  }

  return getDefaultPreferences();
};

const getDefaultPreferences = (): NotificationPreferences => ({
  enabled: false,
  dailyReminder: true,
  dailyReminderTime: '18:00',
  streakReminder: true,
  quizReminder: true,
  achievementNotifications: true,
  lessonCompletionReminder: false,
  sound: true,
  vibrate: true,
});

// Save notification preferences
export const saveNotificationPreferences = (preferences: NotificationPreferences) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem('notificationPreferences', JSON.stringify(preferences));
};

// Get all study reminders
export const getStudyReminders = (): StudyReminder[] => {
  if (typeof window === 'undefined') return [];
  const stored = localStorage.getItem('studyReminders');
  return stored ? JSON.parse(stored) : [];
};

// Save study reminders
export const saveStudyReminders = (reminders: StudyReminder[]) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem('studyReminders', JSON.stringify(reminders));
};

// Add a new study reminder
export const addStudyReminder = (reminder: Omit<StudyReminder, 'id'>): StudyReminder => {
  const reminders = getStudyReminders();
  const newReminder: StudyReminder = {
    ...reminder,
    id: `reminder-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
  };
  reminders.push(newReminder);
  saveStudyReminders(reminders);
  
  // Schedule the notification
  if (newReminder.enabled) {
    scheduleNotification(newReminder);
  }
  
  return newReminder;
};

// Update a study reminder
export const updateStudyReminder = (id: string, updates: Partial<StudyReminder>) => {
  const reminders = getStudyReminders();
  const index = reminders.findIndex(r => r.id === id);
  
  if (index >= 0) {
    reminders[index] = { ...reminders[index], ...updates };
    saveStudyReminders(reminders);
    
    // Reschedule if enabled
    if (reminders[index].enabled) {
      scheduleNotification(reminders[index]);
    }
  }
};

// Delete a study reminder
export const deleteStudyReminder = (id: string) => {
  const reminders = getStudyReminders();
  const filtered = reminders.filter(r => r.id !== id);
  saveStudyReminders(filtered);
};

// Toggle reminder on/off
export const toggleStudyReminder = (id: string) => {
  const reminders = getStudyReminders();
  const reminder = reminders.find(r => r.id === id);
  
  if (reminder) {
    updateStudyReminder(id, { enabled: !reminder.enabled });
  }
};

// Schedule a notification
const scheduleNotification = (reminder: StudyReminder) => {
  if (!supportsNotifications() || Notification.permission !== 'granted') {
    return;
  }

  const scheduledDate = new Date(reminder.scheduledTime);
  const now = new Date();
  const delay = scheduledDate.getTime() - now.getTime();

  if (delay > 0) {
    setTimeout(() => {
      showNotification(reminder.title, reminder.message, reminder.type);
      
      // Reschedule if recurring
      if (reminder.recurrence === 'daily') {
        const nextDay = new Date(scheduledDate);
        nextDay.setDate(nextDay.getDate() + 1);
        updateStudyReminder(reminder.id, { scheduledTime: nextDay.toISOString() });
      }
    }, delay);
  }
};

// Show a notification
export const showNotification = async (
  title: string,
  body: string,
  type: StudyReminder['type'] = 'daily',
  data?: any
) => {
  if (!supportsNotifications() || Notification.permission !== 'granted') {
    return;
  }

  const preferences = getNotificationPreferences();
  if (!preferences.enabled) return;

  // Choose icon based on type
  const icons = {
    daily: '📚',
    lesson: '📖',
    quiz: '🧠',
    streak: '🔥',
    achievement: '🏆',
  };

  const options: any = {
    body,
    icon: '/icon-192x192.png',
    badge: '/icon-192x192.png',
    tag: type,
    silent: !preferences.sound,
    data: { type, ...data },
    vibrate: preferences.vibrate ? [200, 100, 200] : undefined,
    actions: [
      { action: 'open', title: 'Open App' },
      { action: 'dismiss', title: 'Dismiss' },
    ],
  };

  // Use service worker if available
  if ('serviceWorker' in navigator) {
    const registration = await navigator.serviceWorker.ready;
    registration.showNotification(`${icons[type]} ${title}`, options);
  } else {
    new Notification(`${icons[type]} ${title}`, options);
  }
};

// Setup default daily study reminder
export const setupDefaultReminders = async () => {
  const preferences = getNotificationPreferences();
  const reminders = getStudyReminders();

  // Add daily study reminder if not exists
  const hasDailyReminder = reminders.some(r => r.type === 'daily');
  if (!hasDailyReminder && preferences.dailyReminder) {
    const [hours, minutes] = preferences.dailyReminderTime.split(':');
    const scheduledTime = new Date();
    scheduledTime.setHours(parseInt(hours), parseInt(minutes), 0, 0);
    
    // If time has passed today, schedule for tomorrow
    if (scheduledTime.getTime() < Date.now()) {
      scheduledTime.setDate(scheduledTime.getDate() + 1);
    }

    addStudyReminder({
      type: 'daily',
      title: 'Time to Study! 📚',
      message: 'Complete a lesson or take a quiz to maintain your streak',
      scheduledTime: scheduledTime.toISOString(),
      enabled: true,
      recurrence: 'daily',
    });
  }
};

// Check and send streak reminder
export const checkStreakReminder = () => {
  const preferences = getNotificationPreferences();
  if (!preferences.streakReminder) return;

  const lastActivity = localStorage.getItem('lastActivityDate');
  const today = new Date().toDateString();

  if (lastActivity !== today) {
    // User hasn't studied today
    const now = new Date();
    if (now.getHours() >= 20) { // After 8 PM
      showNotification(
        "Don't Break Your Streak! 🔥",
        "You haven't studied today. Complete a quick lesson to keep your streak alive!",
        'streak'
      );
    }
  }
};

// Send achievement notification
export const notifyAchievement = (achievementName: string, xpReward: number) => {
  const preferences = getNotificationPreferences();
  if (!preferences.achievementNotifications) return;

  showNotification(
    'Achievement Unlocked! 🏆',
    `You earned "${achievementName}" and gained ${xpReward} XP!`,
    'achievement'
  );
};

// Send lesson completion reminder
export const notifyLessonCompletion = (lessonTitle: string, nextLesson?: string) => {
  const preferences = getNotificationPreferences();
  if (!preferences.lessonCompletionReminder) return;

  const message = nextLesson 
    ? `Great job! Ready for "${nextLesson}"?`
    : 'Excellent work! Check out more lessons to continue learning.';

  showNotification(
    'Lesson Complete! ✅',
    message,
    'lesson'
  );
};

// Initialize notification system
export const initializeNotifications = async () => {
  if (!supportsNotifications()) {
    console.log('Notifications not supported in this browser');
    return false;
  }

  const permission = await requestNotificationPermission();
  
  if (permission === 'granted') {
    setupDefaultReminders();
    
    // Check streak reminder daily
    setInterval(checkStreakReminder, 60 * 60 * 1000); // Every hour
    checkStreakReminder(); // Check immediately
    
    return true;
  }

  return false;
};

// Get notification statistics
export const getNotificationStats = () => {
  const reminders = getStudyReminders();
  const preferences = getNotificationPreferences();

  return {
    totalReminders: reminders.length,
    activeReminders: reminders.filter(r => r.enabled).length,
    notificationsEnabled: preferences.enabled,
    permission: typeof window !== 'undefined' ? Notification.permission : 'default',
    supported: supportsNotifications(),
  };
};
