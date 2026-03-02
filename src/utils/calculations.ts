import { User, SimulationConfig } from '../types';

/**
 * Generates initial set of users with random opinions and homophily-based connections
 * @param config - Simulation configuration
 * @returns Array of users with opinions and connections
 */
export function generateUsers(config: SimulationConfig): User[] {
  const users: User[] = [];

  // Generate users with random opinions
  for (let i = 0; i < config.userCount; i++) {
    users.push({
      id: i,
      opinion: Math.random() * 2 - 1, // Random value between -1 and 1
      connections: []
    });
  }

  // Create connections based on homophily (similar opinions connect more)
  for (let i = 0; i < users.length; i++) {
    for (let j = i + 1; j < users.length; j++) {
      const opinionDiff = Math.abs(users[i].opinion - users[j].opinion);
      
      // Probability of connection decreases with opinion difference
      // Users with similar opinions are more likely to connect
      const connectionProbability = Math.exp(-opinionDiff * 3);
      
      if (Math.random() < connectionProbability * 0.15) { // Base connection rate
        users[i].connections.push(j);
        users[j].connections.push(i);
      }
    }
  }

  return users;
}

/**
 * Calculates the mean of an array of numbers
 */
function mean(values: number[]): number {
  return values.reduce((sum, val) => sum + val, 0) / values.length;
}

/**
 * Calculates the variance of an array of numbers
 */
function variance(values: number[]): number {
  const avg = mean(values);
  return values.reduce((sum, val) => sum + Math.pow(val - avg, 2), 0) / values.length;
}

/**
 * Calculates the standard deviation of an array of numbers
 */
export function standardDeviation(values: number[]): number {
  return Math.sqrt(variance(values));
}

/**
 * Calculates average opinion across all users
 */
export function calculateAverageOpinion(users: User[]): number {
  const opinions = users.map(u => u.opinion);
  return mean(opinions);
}

/**
 * Calculates polarization index (variance of opinions)
 */
export function calculatePolarizationIndex(users: User[]): number {
  const opinions = users.map(u => u.opinion);
  return variance(opinions);
}

/**
 * Calculates standard deviation of opinions
 */
export function calculateStandardDeviation(users: User[]): number {
  const opinions = users.map(u => u.opinion);
  return standardDeviation(opinions);
}

/**
 * Calculates cross-group interaction ratio
 * Measures interactions between users with opinions on opposite sides of the spectrum
 */
export function calculateCrossGroupInteractionRatio(
  users: User[],
  interactions: Map<number, number[]>
): number {
  let crossGroupCount = 0;
  let totalInteractions = 0;

  interactions.forEach((interactedWith, userId) => {
    const user = users[userId];
    interactedWith.forEach(targetId => {
      const target = users[targetId];
      totalInteractions++;
      
      // Check if users are on opposite sides (different signs of opinion)
      if (user.opinion * target.opinion < 0) {
        crossGroupCount++;
      }
    });
  });

  return totalInteractions > 0 ? crossGroupCount / totalInteractions : 0;
}

/**
 * Clamps a value between -1 and 1
 */
export function clampOpinion(value: number): number {
  return Math.max(-1, Math.min(1, value));
}
