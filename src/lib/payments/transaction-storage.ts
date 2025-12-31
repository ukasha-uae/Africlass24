/**
 * Transaction Storage System
 * Stores payment transactions locally and prepares for backend sync
 */

import { PaymentResponse } from '../payments';

export interface TransactionRecord extends PaymentResponse {
  userId: string;
  packageId?: string;
  packageName?: string;
  type: 'coin_purchase' | 'subscription';
  coinsAwarded?: number;
  subscriptionTier?: 'premium';
  subscriptionDuration?: 'monthly' | 'annual';
  flutterwaveRef?: string;
  verified: boolean;
  createdAt: string;
  updatedAt: string;
}

/**
 * Store transaction record
 */
export function storeTransaction(transaction: TransactionRecord): void {
  if (typeof window === 'undefined') return;

  const transactions = getStoredTransactions();
  transactions[transaction.transactionId] = {
    ...transaction,
    updatedAt: new Date().toISOString(),
  };
  localStorage.setItem('paymentTransactions', JSON.stringify(transactions));
}

/**
 * Get transaction by ID
 */
export function getTransaction(transactionId: string): TransactionRecord | null {
  if (typeof window === 'undefined') return null;

  const transactions = getStoredTransactions();
  return transactions[transactionId] || null;
}

/**
 * Get all transactions for a user
 */
export function getUserTransactions(userId: string): TransactionRecord[] {
  if (typeof window === 'undefined') return [];

  const transactions = getStoredTransactions();
  return Object.values(transactions)
    .filter(t => t.userId === userId)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

/**
 * Get all stored transactions
 */
function getStoredTransactions(): Record<string, TransactionRecord> {
  if (typeof window === 'undefined') return {};

  const stored = localStorage.getItem('paymentTransactions');
  return stored ? JSON.parse(stored) : {};
}

/**
 * Update transaction status
 */
export function updateTransactionStatus(
  transactionId: string,
  status: PaymentResponse['status'],
  flutterwaveRef?: string
): void {
  if (typeof window === 'undefined') return;

  const transactions = getStoredTransactions();
  const transaction = transactions[transactionId];

  if (transaction) {
    transactions[transactionId] = {
      ...transaction,
      status,
      flutterwaveRef: flutterwaveRef || transaction.flutterwaveRef,
      verified: status === 'completed',
      updatedAt: new Date().toISOString(),
    };
    localStorage.setItem('paymentTransactions', JSON.stringify(transactions));
  }
}

/**
 * Check for duplicate pending transactions
 */
export function hasPendingTransaction(
  userId: string,
  packageId: string,
  type: 'coin_purchase' | 'subscription'
): boolean {
  if (typeof window === 'undefined') return false;

  const transactions = getUserTransactions(userId);
  return transactions.some(
    t =>
      t.packageId === packageId &&
      t.type === type &&
      (t.status === 'pending' || t.status === 'processing')
  );
}

/**
 * Get transaction statistics for a user
 */
export function getTransactionStats(userId: string): {
  totalSpent: number;
  totalTransactions: number;
  successfulTransactions: number;
  failedTransactions: number;
  totalCoinsPurchased: number;
  hasActiveSubscription: boolean;
} {
  if (typeof window === 'undefined') {
    return {
      totalSpent: 0,
      totalTransactions: 0,
      successfulTransactions: 0,
      failedTransactions: 0,
      totalCoinsPurchased: 0,
      hasActiveSubscription: false,
    };
  }

  const transactions = getUserTransactions(userId);
  const successful = transactions.filter(t => t.status === 'completed');
  const failed = transactions.filter(t => t.status === 'failed');

  return {
    totalSpent: successful.reduce((sum, t) => sum + t.amount, 0),
    totalTransactions: transactions.length,
    successfulTransactions: successful.length,
    failedTransactions: failed.length,
    totalCoinsPurchased: successful
      .filter(t => t.type === 'coin_purchase')
      .reduce((sum, t) => sum + (t.coinsAwarded || 0), 0),
    hasActiveSubscription: successful.some(
      t => t.type === 'subscription' && t.status === 'completed'
    ),
  };
}

