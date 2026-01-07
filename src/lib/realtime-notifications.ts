import { initializeFirebase } from '@/firebase';
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  serverTimestamp,
} from 'firebase/firestore';

// Firestore-backed user notifications (cross-device, realtime via onSnapshot)

export type NotificationType =
  | 'challenge_invite'
  | 'friend_request'
  | 'achievement_unlock'
  | 'system_message'
  | 'challenge_result';

export interface UserNotificationPayload {
  type: NotificationType;
  title: string;
  message: string;
  data?: any;
  actionUrl?: string;
}

export interface UserNotification extends UserNotificationPayload {
  read: boolean;
  createdAt: string | Date;
}

function getNotificationsCollection(userId: string) {
  const { firestore } = initializeFirebase();
  return collection(firestore, 'users', userId, 'notifications');
}

export async function createUserNotification(
  userId: string,
  payload: UserNotificationPayload
) {
  if (!userId) return;
  const colRef = getNotificationsCollection(userId);
  await addDoc(colRef, {
    ...payload,
    read: false,
    createdAt: serverTimestamp(),
  });
}

export async function markUserNotificationAsRead(
  userId: string,
  notificationId: string
) {
  if (!userId || !notificationId) return;
  const { firestore } = initializeFirebase();
  const ref = doc(firestore, 'users', userId, 'notifications', notificationId);
  await updateDoc(ref, { read: true });
}

export async function markAllUserNotificationsAsRead(userId: string) {
  // Optional: can be implemented with a Cloud Function or batched writes
  // For now we rely on client marking individual notifications as read.
  void userId;
}

export async function deleteUserNotification(
  userId: string,
  notificationId: string
) {
  if (!userId || !notificationId) return;
  const { firestore } = initializeFirebase();
  const ref = doc(firestore, 'users', userId, 'notifications', notificationId);
  await deleteDoc(ref);
}


