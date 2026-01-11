/**
 * Referral System
 * Allows students to earn 1 month premium access by inviting 10 friends
 * 
 * Rules:
 * - 10 valid referral codes = 1 month premium
 * - Codes only become valid after referred user completes profile and activity
 * - No self-referrals
 * - One-time use only
 * - Each code tied to unique user
 */

import { initializeFirebase } from '@/firebase';
import { addSubscription, type UserSubscription } from './monetization';

export interface Referral {
  code: string;
  referrerUid: string;
  referredUid: string | null;
  isUsed: boolean;
  isValidated: boolean; // True after referred user completes profile + activity
  createdAt: string;
  validatedAt?: string;
}

export interface UserReferralStats {
  referralCount: number; // Valid, validated referrals
  totalReferrals: number; // All referrals (including unvalidated)
  codesRedeemed: number; // Codes this user has redeemed
  premiumEarned: boolean; // Whether premium was earned via referrals
}

/**
 * Generate a unique referral code for a user
 * Format: REF-{first 8 chars of UID}-{random 4 chars}
 */
export function generateReferralCode(userId: string): string {
  const uidPrefix = userId.substring(0, 8).toUpperCase();
  const randomSuffix = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `REF-${uidPrefix}-${randomSuffix}`;
}

/**
 * Get user's referral link
 */
export function getReferralLink(referrerUid: string): string {
  if (typeof window === 'undefined') {
    return `https://smartclass24.com/signup?ref=${referrerUid}`;
  }
  const baseUrl = window.location.origin;
  return `${baseUrl}/signup?ref=${referrerUid}`;
}

/**
 * Extract referrer UID from URL parameter
 */
export function getReferrerFromUrl(): string | null {
  if (typeof window === 'undefined') return null;
  const params = new URLSearchParams(window.location.search);
  return params.get('ref');
}

/**
 * Create a referral code for a new user after signup
 * This code can be shared by the new user to invite others
 */
export async function createUserReferralCode(
  userId: string,
  referrerUid: string | null
): Promise<string | null> {
  try {
    const { firestore } = initializeFirebase();
    if (!firestore) {
      console.error('[Referrals] Firestore not available');
      return null;
    }

    const { doc, setDoc, getDoc } = await import('firebase/firestore');
    
    // Generate unique code for this user
    const code = generateReferralCode(userId);
    
    // Check if code already exists (shouldn't happen, but safety check)
    const codeRef = doc(firestore, 'referrals', code);
    const codeSnap = await getDoc(codeRef);
    
    if (codeSnap.exists()) {
      // Code collision - try again with different random suffix
      const newCode = generateReferralCode(userId + Date.now().toString());
      const newCodeRef = doc(firestore, 'referrals', newCode);
      await setDoc(newCodeRef, {
        code: newCode,
        referrerUid: userId,
        referredUid: null,
        isUsed: false,
        isValidated: false,
        createdAt: new Date().toISOString(),
      });
      return newCode;
    }
    
    // Create the referral code document
    await setDoc(codeRef, {
      code,
      referrerUid: userId, // This user can share this code
      referredUid: null, // Will be set when someone uses this code
      isUsed: false,
      isValidated: false,
      createdAt: new Date().toISOString(),
    });
    
    // If user signed up via referral link, create the referral record
    if (referrerUid && referrerUid !== userId) {
      await createReferralRecord(referrerUid, userId, code);
    }
    
    return code;
  } catch (error: any) {
    console.error('[Referrals] Error creating referral code:', error);
    return null;
  }
}

/**
 * Create a referral record when user signs up via referral link
 */
export async function createReferralRecord(
  referrerUid: string,
  referredUid: string,
  code: string
): Promise<void> {
  try {
    const { firestore } = initializeFirebase();
    if (!firestore) return;

    const { collection, addDoc, query, where, getDocs } = await import('firebase/firestore');
    const referralsRef = collection(firestore, 'referrals');
    
    // Check if this referral already exists (prevent duplicates)
    const existingQuery = query(
      referralsRef,
      where('referrerUid', '==', referrerUid),
      where('referredUid', '==', referredUid)
    );
    const existingSnapshot = await getDocs(existingQuery);
    
    if (!existingSnapshot.empty) {
      // Referral already exists
      return;
    }
    
    // Create referral record (use auto-generated ID to allow multiple referrals per referrer)
    await addDoc(referralsRef, {
      referrerUid,
      referredUid,
      code,
      isUsed: true,
      isValidated: false,
      createdAt: new Date().toISOString(),
    });
  } catch (error: any) {
    console.error('[Referrals] Error creating referral record:', error);
  }
}

/**
 * Validate a referral (mark as validated after user completes activity)
 * Called after user completes profile setup and at least one quiz/lesson
 */
export async function validateReferral(
  referredUserId: string
): Promise<boolean> {
  try {
    const { firestore } = initializeFirebase();
    if (!firestore) return false;

    const { collection, query, where, getDocs, setDoc, doc } = await import('firebase/firestore');
    const referralsRef = collection(firestore, 'referrals');
    
    // Find referral where this user is the referred user
    const q = query(
      referralsRef,
      where('referredUid', '==', referredUserId),
      where('isUsed', '==', true),
      where('isValidated', '==', false)
    );
    const querySnapshot = await getDocs(q);
    
    if (querySnapshot.empty) {
      return false; // No referral to validate
    }
    
    // Validate the referral
    const referralDoc = querySnapshot.docs[0];
    await setDoc(referralDoc.ref, {
      isValidated: true,
      validatedAt: new Date().toISOString(),
    }, { merge: true });
    
    // Update referrer's referral count
    const referralData = referralDoc.data() as Referral;
    await updateReferralCount(referralData.referrerUid);
    
    return true;
  } catch (error: any) {
    console.error('[Referrals] Error validating referral:', error);
    return false;
  }
}

/**
 * Get user's referral statistics
 */
export async function getUserReferralStats(userId: string): Promise<UserReferralStats | null> {
  try {
    const { firestore } = initializeFirebase();
    if (!firestore) return null;

    const { collection, query, where, getDocs } = await import('firebase/firestore');
    const referralsRef = collection(firestore, 'referrals');
    
    // Get validated referrals (counts toward premium)
    const validatedQuery = query(
      referralsRef,
      where('referrerUid', '==', userId),
      where('isValidated', '==', true)
    );
    const validatedSnapshot = await getDocs(validatedQuery);
    const referralCount = validatedSnapshot.size;
    
    // Get total referrals (all referrals by this user)
    const totalQuery = query(
      referralsRef,
      where('referrerUid', '==', userId)
    );
    const totalSnapshot = await getDocs(totalQuery);
    const totalReferrals = totalSnapshot.size;
    
    // Get codes redeemed by this user
    const redeemedQuery = query(
      referralsRef,
      where('referredUid', '==', userId),
      where('isUsed', '==', true)
    );
    const redeemedSnapshot = await getDocs(redeemedQuery);
    const codesRedeemed = redeemedSnapshot.size;
    
    // Check if premium was earned via referrals
    const premiumEarned = referralCount >= 10;
    
    return {
      referralCount,
      totalReferrals,
      codesRedeemed,
      premiumEarned,
    };
  } catch (error: any) {
    console.error('[Referrals] Error getting referral stats:', error);
    return null;
  }
}

/**
 * Update referral count for a user
 * Checks if threshold reached and grants premium if needed
 */
async function updateReferralCount(userId: string): Promise<void> {
  try {
    const stats = await getUserReferralStats(userId);
    if (!stats) return;
    
    // If user has 10+ validated referrals, grant premium
    if (stats.referralCount >= 10 && !stats.premiumEarned) {
      await grantPremiumFromReferrals(userId);
    }
  } catch (error: any) {
    console.error('[Referrals] Error updating referral count:', error);
  }
}

/**
 * Grant 1 month premium access from referrals
 */
async function grantPremiumFromReferrals(userId: string): Promise<boolean> {
  try {
    const { firestore } = initializeFirebase();
    if (!firestore) return false;

    // Check if user already has premium (paid subscription takes precedence)
    const { isPremiumUser } = await import('./monetization');
    if (isPremiumUser(userId)) {
      // User already has premium, don't override
      return false;
    }
    
    // Grant 1 month premium
    const now = new Date();
    const endDate = new Date(now);
    endDate.setMonth(endDate.getMonth() + 1);
    
    const subscription: UserSubscription = {
      userId,
      tier: 'premium',
      startDate: now.toISOString(),
      endDate: endDate.toISOString(),
      isActive: true,
      features: ['boss_battle', 'tournaments', 'school_battle', 'challenge_arena'],
      planId: 'referral_premium',
    };
    
    const { setUserSubscription } = await import('./monetization');
    setUserSubscription(userId, subscription, firestore);
    
    // Mark premium as earned in user stats (we'll track this in Firestore)
    const { doc, setDoc } = await import('firebase/firestore');
    const userRef = doc(firestore, 'users', userId);
    await setDoc(userRef, {
      referralPremiumEarned: true,
      referralPremiumEarnedAt: now.toISOString(),
    }, { merge: true });
    
    return true;
  } catch (error: any) {
    console.error('[Referrals] Error granting premium:', error);
    return false;
  }
}

/**
 * Redeem a referral code (manual entry)
 */
export async function redeemReferralCode(
  userId: string,
  code: string
): Promise<{ success: boolean; message: string }> {
  try {
    const { firestore } = initializeFirebase();
    if (!firestore) {
      return { success: false, message: 'System error. Please try again.' };
    }

    const { doc, getDoc, collection, query, where, getDocs } = await import('firebase/firestore');
    
    // Check if code exists (codes are stored as documents in referrals collection)
    const codeRef = doc(firestore, 'referrals', code);
    const codeSnap = await getDoc(codeRef);
    
    if (!codeSnap.exists()) {
      return { success: false, message: 'Invalid code. Please check and try again.' };
    }
    
    const codeData = codeSnap.data() as Referral;
    
    // Check if user is trying to use their own code
    if (codeData.referrerUid === userId) {
      return { success: false, message: 'You cannot use your own referral code.' };
    }
    
    // Check if user has already used this code (check for existing referral record)
    const referralsRef = collection(firestore, 'referrals');
    const existingQuery = query(
      referralsRef,
      where('referrerUid', '==', codeData.referrerUid),
      where('referredUid', '==', userId)
    );
    const existingSnapshot = await getDocs(existingQuery);
    if (!existingSnapshot.empty) {
      return { success: false, message: 'You have already used this code.' };
    }
    
    // Create referral record (code is now used by this user)
    const { addDoc } = await import('firebase/firestore');
    await addDoc(referralsRef, {
      referrerUid: codeData.referrerUid,
      referredUid: userId,
      code: code,
      isUsed: true,
      isValidated: false, // Will be validated after user completes activity
      createdAt: new Date().toISOString(),
    });
    
    return { 
      success: true, 
      message: 'Code redeemed! Complete your profile and finish your first activity to activate it.' 
    };
  } catch (error: any) {
    console.error('[Referrals] Error redeeming code:', error);
    return { success: false, message: 'Error redeeming code. Please try again.' };
  }
}
