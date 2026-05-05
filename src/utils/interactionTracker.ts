import { Interaction, Account } from '../types/social';
import { Post } from '../types/social';
import { OpinionDistribution } from '../types';

const STORAGE_KEY_INTERACTIONS = 'social_media_interactions';
const STORAGE_KEY_ACCOUNTS = 'social_media_accounts';

/**
 * Get all interactions from localStorage
 */
export function getInteractions(): Interaction[] {
  const stored = localStorage.getItem(STORAGE_KEY_INTERACTIONS);
  return stored ? JSON.parse(stored) : [];
}

/**
 * Save interactions to localStorage
 */
export function saveInteractions(interactions: Interaction[]): void {
  localStorage.setItem(STORAGE_KEY_INTERACTIONS, JSON.stringify(interactions));
}

/**
 * Track a user interaction with a post
 */
export function trackInteraction(
  userId: string,
  postId: string,
  type: 'view' | 'like' | 'comment',
  postLeaning: number
): void {
  const interactions = getInteractions();
  
  const newInteraction: Interaction = {
    userId,
    postId,
    type,
    timestamp: Date.now(),
    postLeaning
  };
  
  interactions.push(newInteraction);
  saveInteractions(interactions);
  
  // Update user opinion based on interaction
  updateUserOpinion(userId);
  updateUserOpinionFuzzy(userId);
}

/**
 * Calculate user's opinion based on their interactions
 */
export function updateUserOpinion(userId: string): void {
  const interactions = getInteractions().filter(i => i.userId === userId);
  
  if (interactions.length === 0) return;
  
  // Weight different interaction types
  const weights = {
    view: 0.1,
    like: 0.5,
    comment: 0.8
  };
  
  let weightedSum = 0;
  let totalWeight = 0;
  
  // Calculate weighted average of post leanings
  interactions.forEach(interaction => {
    const weight = weights[interaction.type];
    weightedSum += interaction.postLeaning * weight;
    totalWeight += weight;
  });
  
  const calculatedOpinion = totalWeight > 0 ? weightedSum / totalWeight : 0;
  
  // Clamp to [-1, 1]
  const opinion = Math.max(-1, Math.min(1, calculatedOpinion));
  
  // Update account
  const stored = localStorage.getItem(STORAGE_KEY_ACCOUNTS);
  if (stored) {
    const accounts: Account[] = JSON.parse(stored);
    const account = accounts.find(acc => acc.id === userId);
    if (account) {
      account.opinion = opinion;
      localStorage.setItem(STORAGE_KEY_ACCOUNTS, JSON.stringify(accounts));
    }
  }
}

function fuzzify(x: number) {
  return {
    left: Math.max(0, Math.min(1, (-x + 1) / 2)),
    right: Math.max(0, Math.min(1, (x + 1) / 2)),
    neutral: Math.max(0, 1 - Math.abs(x)),
  };
}

/** Get fuzzy opinion */
export function updateUserOpinionFuzzy(userId: string): void {
  const interactions = getInteractions().filter(i => i.userId === userId);
  if (interactions.length === 0) return;

  const weights = {
    view: 0.1,
    like: 0.5,
    comment: 0.8
  };

  let agg = { left: 0, neutral: 0, right: 0 };
  let totalWeight = 0;

  interactions.forEach(interaction => {
    const weight = weights[interaction.type];
    const fuzzy = fuzzify(interaction.postLeaning);

    agg.left += fuzzy.left * weight;
    agg.neutral += fuzzy.neutral * weight;
    agg.right += fuzzy.right * weight;

    totalWeight += weight;
  });

  if (totalWeight === 0) return;

  // normalize to get a distribution
  const fuzzyOpinion = {
    left: agg.left / totalWeight,
    neutral: agg.neutral / totalWeight,
    right: agg.right / totalWeight,
  };

  // storage
  const stored = localStorage.getItem(STORAGE_KEY_ACCOUNTS);
  if (stored) {
    const accounts: Account[] = JSON.parse(stored);
    const account = accounts.find(acc => acc.id === userId);
    if (account) {
      account.fuzzyOpinion = fuzzyOpinion; 
      localStorage.setItem(STORAGE_KEY_ACCOUNTS, JSON.stringify(accounts));
    }
  }
}

/**
 * Get recommended posts for a user based on their opinion and strategy
 */
export function getRecommendedPosts(
  userId: string,
  allPosts: Post[],
  strategy: 'similarity' | 'random' | 'diversity' | 'all' = 'similarity'
): Post[] {
  const stored = localStorage.getItem(STORAGE_KEY_ACCOUNTS);
  if (!stored) return allPosts;
  
  const accounts: Account[] = JSON.parse(stored);
  const account = accounts.find(acc => acc.id === userId);
  if (!account) return allPosts;
  
  const userOpinion = account.opinion;
  
  // Sort posts by timestamp (newest first)
  const sortedPosts = [...allPosts].sort((a, b) => b.timestamp - a.timestamp);
  
  switch (strategy) {
    case 'similarity':
      // Show posts similar to user's opinion (Echo Chamber)
      return sortedPosts.sort((a, b) => {
        const diffA = Math.abs(a.leaningScore - userOpinion);
        const diffB = Math.abs(b.leaningScore - userOpinion);
        return diffA - diffB;
      });
    
    case 'random':
      // Random shuffle (Break Filter Bubble)
      return sortedPosts.sort(() => Math.random() - 0.5);
    
    case 'diversity':
      // Mix: 70% similar, 30% diverse (Intervention Strategy)
      const similar = sortedPosts
        .filter(p => Math.abs(p.leaningScore - userOpinion) < 0.5)
        .slice(0, 8);
      const diverse = sortedPosts
        .filter(p => Math.abs(p.leaningScore - userOpinion) >= 0.5)
        .slice(0, 4);
      return [...similar, ...diverse].sort(() => Math.random() - 0.5);
    
    case 'all':
      // Show all posts chronologically
      return sortedPosts;
    
    default:
      return sortedPosts;
  }
}

/**
 * Get user's current opinion score
 */
export function getUserOpinion(userId: string): number {
  const stored = localStorage.getItem(STORAGE_KEY_ACCOUNTS);
  if (!stored) return 0;
  
  const accounts: Account[] = JSON.parse(stored);
  const account = accounts.find(acc => acc.id === userId);
  return account?.opinion ?? 0;
}

/**
 * Get user's current fuzzy opinion score
 */
export function getUserFuzzyOpinion(userId: string): OpinionDistribution {
  const stored = localStorage.getItem(STORAGE_KEY_ACCOUNTS);
  if (!stored) return { left: 0, neutral: 0, right: 0 };
  
  const accounts: Account[] = JSON.parse(stored);
  const account = accounts.find(acc => acc.id === userId);
  return account?.fuzzyOpinion ?? { left: 0, neutral: 0, right: 0 };
}
