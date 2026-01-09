/**
 * User Presence System
 * Tracks user online status for challenge targeting
 */

import { initializeFirebase } from '@/firebase';
import { doc, setDoc, serverTimestamp, getDoc } from 'firebase/firestore';

export interface UserPresence {
  userId: string;
  isOnline: boolean;
  lastSeen: Date | null;
  status?: 'online' | 'away' | 'offline';
}

const PRESENCE_TIMEOUT = 60 * 1000; // 60 seconds - user is considered online if lastSeen is within this time
const HEARTBEAT_INTERVAL = 30 * 1000; // Update presence every 30 seconds

/**
 * Update user's presence (last seen timestamp)
 * Stores lastSeen directly in the students collection for simplicity
 */
export async function updateUserPresence(userId: string): Promise<void> {
  try {
    const { firestore } = initializeFirebase();
    if (!firestore || !userId) return;
    
    // Store lastSeen directly in students document
    const studentRef = doc(firestore, 'students', userId);
    await setDoc(studentRef, {
      lastSeen: serverTimestamp(),
    }, { merge: true });
  } catch (error) {
    console.error('Failed to update user presence:', error);
  }
}

/**
 * Get user's presence status from students collection
 */
export async function getUserPresence(userId: string): Promise<UserPresence | null> {
  try {
    const { firestore } = initializeFirebase();
    if (!firestore || !userId) return null;
    
    const studentRef = doc(firestore, 'students', userId);
    const snapshot = await getDoc(studentRef);
    
    if (!snapshot.exists()) return null;
    
    const data = snapshot.data();
    const lastSeen = data.lastSeen?.toDate?.() || null;
    const isOnline = isUserOnline(lastSeen);
    
    return {
      userId,
      isOnline,
      lastSeen,
      status: isOnline ? 'online' : 'offline',
    };
  } catch (error) {
    console.error('Failed to get user presence:', error);
    return null;
  }
}

/**
 * Start heartbeat to keep user presence active
 * Returns cleanup function to stop heartbeat
 */
export function startPresenceHeartbeat(userId: string): () => void {
  if (!userId) return () => {};
  
  // Update immediately
  updateUserPresence(userId);
  
  // Then update periodically
  const interval = setInterval(() => {
    updateUserPresence(userId);
  }, HEARTBEAT_INTERVAL);
  
  // Also update on page visibility change (when user returns to tab)
  const handleVisibilityChange = () => {
    if (!document.hidden) {
      updateUserPresence(userId);
    }
  };
  
  document.addEventListener('visibilitychange', handleVisibilityChange);
  
  // Cleanup function
  return () => {
    clearInterval(interval);
    document.removeEventListener('visibilitychange', handleVisibilityChange);
  };
}

/**
 * Check if a user is online based on lastSeen timestamp
 */
export function isUserOnline(lastSeen: Date | null | undefined): boolean {
  if (!lastSeen) return false;
  const now = new Date();
  return (now.getTime() - lastSeen.getTime()) < PRESENCE_TIMEOUT;
}

