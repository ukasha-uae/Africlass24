
// In-App Notifications System

export interface InAppNotification {
  id: string;
  userId: string;
  type: 'challenge_invite' | 'friend_request' | 'achievement_unlock' | 'system_message' | 'challenge_result';
  title: string;
  message: string;
  data?: any; // e.g., challengeId, friendId
  read: boolean;
  createdAt: string;
  actionUrl?: string;
}

export const getInAppNotifications = (userId: string): InAppNotification[] => {
  if (typeof window === 'undefined') return [];
  const allNotifications = JSON.parse(localStorage.getItem('inAppNotifications') || '[]');
  return allNotifications
    .filter((n: InAppNotification) => n.userId === userId)
    .sort((a: InAppNotification, b: InAppNotification) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
};

export const getUnreadNotificationCount = (userId: string): number => {
  const notifications = getInAppNotifications(userId);
  return notifications.filter(n => !n.read).length;
};

export const markNotificationAsRead = (notificationId: string) => {
  if (typeof window === 'undefined') return;
  const allNotifications = JSON.parse(localStorage.getItem('inAppNotifications') || '[]');
  const index = allNotifications.findIndex((n: InAppNotification) => n.id === notificationId);
  
  if (index > -1) {
    allNotifications[index].read = true;
    localStorage.setItem('inAppNotifications', JSON.stringify(allNotifications));
    // Trigger a storage event for cross-tab/component updates
    window.dispatchEvent(new Event('notifications-updated'));
  }
};

export const markAllNotificationsAsRead = (userId: string) => {
  if (typeof window === 'undefined') return;
  const allNotifications = JSON.parse(localStorage.getItem('inAppNotifications') || '[]');
  
  let updated = false;
  allNotifications.forEach((n: InAppNotification) => {
    if (n.userId === userId && !n.read) {
      n.read = true;
      updated = true;
    }
  });
  
  if (updated) {
    localStorage.setItem('inAppNotifications', JSON.stringify(allNotifications));
    window.dispatchEvent(new Event('notifications-updated'));
  }
};

export const createInAppNotification = (notification: Omit<InAppNotification, 'id' | 'createdAt' | 'read'>) => {
  if (typeof window === 'undefined') return;
  const allNotifications = JSON.parse(localStorage.getItem('inAppNotifications') || '[]');
  
  const newNotification: InAppNotification = {
    ...notification,
    id: `notif-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    read: false,
    createdAt: new Date().toISOString(),
  };
  
  allNotifications.push(newNotification);
  localStorage.setItem('inAppNotifications', JSON.stringify(allNotifications));
  window.dispatchEvent(new Event('notifications-updated'));
  
  return newNotification;
};

export const deleteNotification = (notificationId: string) => {
  if (typeof window === 'undefined') return;
  const allNotifications = JSON.parse(localStorage.getItem('inAppNotifications') || '[]');
  const filtered = allNotifications.filter((n: InAppNotification) => n.id !== notificationId);
  
  if (allNotifications.length !== filtered.length) {
    localStorage.setItem('inAppNotifications', JSON.stringify(filtered));
    window.dispatchEvent(new Event('notifications-updated'));
  }
};
