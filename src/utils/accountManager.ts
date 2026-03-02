import { Account, RecommendationStrategy } from '../types/social';

const STORAGE_KEY_ACCOUNTS = 'social_media_accounts';

/**
 * Get user's current strategy
 */
export function getUserStrategy(userId: string): RecommendationStrategy {
  const stored = localStorage.getItem(STORAGE_KEY_ACCOUNTS);
  if (!stored) return 'similarity';
  
  const accounts: Account[] = JSON.parse(stored);
  const account = accounts.find(acc => acc.id === userId);
  return account?.strategy ?? 'similarity';
}

/**
 * Update user's strategy
 */
export function updateUserStrategy(userId: string, strategy: RecommendationStrategy): void {
  const stored = localStorage.getItem(STORAGE_KEY_ACCOUNTS);
  if (!stored) return;
  
  const accounts: Account[] = JSON.parse(stored);
  const account = accounts.find(acc => acc.id === userId);
  if (account) {
    account.strategy = strategy;
    localStorage.setItem(STORAGE_KEY_ACCOUNTS, JSON.stringify(accounts));
  }
}
