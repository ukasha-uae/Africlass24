/**
 * Notification Sound Utilities
 * Provides audio feedback for notifications
 */

import { getNotificationPreferences } from './notifications';

export const isSoundEnabled = (): boolean => {
  if (typeof window === 'undefined') return true;
  const preferences = getNotificationPreferences();
  return preferences.sound !== false; // Default to true if not set
};

/**
 * Play a notification sound
 * Uses Web Audio API to generate a simple pleasant notification sound
 */
export const playNotificationSound = (): void => {
  if (!isSoundEnabled()) return;
  if (typeof window === 'undefined') return;

  try {
    // Try to use a sound file if available
    const audio = new Audio();
    
    // Attempt to load a notification sound file (optional - can be added later)
    // audio.src = '/sounds/notification.mp3';
    
    // Fallback: Generate a simple notification tone using Web Audio API
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    // Create a pleasant two-tone notification sound
    oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
    oscillator.frequency.setValueAtTime(1000, audioContext.currentTime + 0.1);
    
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.3);
  } catch (error) {
    // Silently fail if audio is not available (e.g., autoplay restrictions)
    console.debug('Could not play notification sound:', error);
  }
};

