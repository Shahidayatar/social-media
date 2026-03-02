/**
 * Represents a user in the social media network simulation
 */
export interface User {
  /** Unique identifier for the user */
  id: number;
  /** Political opinion ranging from -1 (left) to +1 (right) */
  opinion: number;
  /** Array of user IDs that this user is connected to */
  connections: number[];
}

/**
 * Available recommendation strategies for user interactions
 */
export enum RecommendationStrategy {
  SIMILARITY = 'similarity',
  RANDOM = 'random',
  DIVERSITY = 'diversity'
}

/**
 * Metrics calculated at each simulation step
 */
export interface SimulationMetrics {
  /** Mean opinion value across all users */
  averageOpinion: number;
  /** Standard deviation of opinion values */
  standardDeviation: number;
  /** Variance of opinion distribution (polarization index) */
  polarizationIndex: number;
  /** Ratio of interactions between users with different opinions */
  crossGroupInteractionRatio: number;
  /** Current simulation step/time */
  step: number;
}

/**
 * Configuration for simulation parameters
 */
export interface SimulationConfig {
  /** Number of users in the simulation */
  userCount: number;
  /** Learning rate for opinion updates (0-1) */
  learningRate: number;
  /** Active recommendation strategy */
  strategy: RecommendationStrategy;
  /** Percentage of diverse interactions (for diversity strategy) */
  diversityPercentage: number;
  /** Similarity threshold for connections */
  similarityThreshold: number;
}

/**
 * Data point for time-series visualization
 */
export interface MetricsDataPoint {
  step: number;
  polarizationIndex: number;
  averageOpinion: number;
  crossGroupInteractionRatio: number;
}
