/**
 * Types for the social media platform
 */

import { OpinionDistribution } from ".";

/**
 * Recommendation strategy types
 */
export type RecommendationStrategy = 'similarity' | 'random' | 'diversity';

/**
 * Registered user account
 */
export interface Account {
  id: string;
  username: string;
  passwordHash: string;
  displayName: string;
  registeredAt: number;
  opinion: number; // Calculated based on interactions (-1 to 1)
  strategy: RecommendationStrategy; // User's selected algorithm strategy
  fuzzyOpinion: OpinionDistribution; // Fuzzy opinion distribution
  role: 'user' | 'admin'; // Role of the account
}

/**
 * Political leaning of a post
 */
export enum PostLeaning {
  LEFT = 'left',
  NEUTRAL = 'neutral',
  RIGHT = 'right'
}

/**
 * Social media post
 */
export interface Post {
  id: string;
  authorId: string;
  authorName: string;
  content: string;
  leaning: PostLeaning;
  leaningScore: number; // -1 (left) to 1 (right)
  fuzzyLeaning: {
  left: number;
  neutral: number;
  right: number;
  };
  timestamp: number;
  likes: string[]; // User IDs who liked
  comments: Comment[];
}

/**
 * Comment on a post
 */
export interface Comment {
  id: string;
  authorId: string;
  authorName: string;
  content: string;
  timestamp: number;
}

/**
 * User interaction with a post
 */
export interface Interaction {
  userId: string;
  postId: string;
  type: 'view' | 'like' | 'comment';
  timestamp: number;
  postLeaning: number;
  postFuzzyLeaning?: OpinionDistribution;
  strategy: 'similarity' | 'random' | 'diversity';
}

/**
 * Current session
 */
export interface Session {
  userId: string;
  username: string;
  displayName: string;
  loginTime: number;
}
