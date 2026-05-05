import { User, RecommendationStrategy, SimulationConfig, OpinionDistribution } from '../types';
import { clampOpinion } from '../utils/calculations';

/**
 * Selects users for interaction based on similarity strategy
 * Users mostly interact with others whose opinion difference < 0.3
 */
function selectUsersBySimilarity(
  user: User,
  allUsers: User[],
  config: SimulationConfig
): number[] {
  const similarUsers = allUsers.filter(other => {
    if (other.id === user.id) return false;
    const opinionDiff = Math.abs(user.opinion - other.opinion);
    return opinionDiff < config.similarityThreshold;
  });

  // Select 3-5 random users from similar users
  const count = Math.min(similarUsers.length, Math.floor(Math.random() * 3) + 3);
  const shuffled = [...similarUsers].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count).map(u => u.id);
}

/**
 * Selects users for interaction randomly
 * Users interact with random users regardless of opinion
 */
function selectUsersRandomly(
  user: User,
  allUsers: User[],
  _config: SimulationConfig
): number[] {
  const otherUsers = allUsers.filter(other => other.id !== user.id);
  
  // Select 3-5 random users
  const count = Math.min(otherUsers.length, Math.floor(Math.random() * 3) + 3);
  const shuffled = [...otherUsers].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count).map(u => u.id);
}

/**
 * Selects users for interaction with diversity intervention
 * 70% similar users, 30% opposite/opinion-distant users
 */
function selectUsersWithDiversity(
  user: User,
  allUsers: User[],
  config: SimulationConfig
): number[] {
  const similarUsers: User[] = [];
  const diverseUsers: User[] = [];

  allUsers.forEach(other => {
    if (other.id === user.id) return;
    
    const opinionDiff = Math.abs(user.opinion - other.opinion);
    if (opinionDiff < config.similarityThreshold) {
      similarUsers.push(other);
    } else {
      diverseUsers.push(other);
    }
  });

  const totalCount = 5;
  const diverseCount = Math.floor(totalCount * (config.diversityPercentage / 100));
  const similarCount = totalCount - diverseCount;

  const selected: number[] = [];

  // Select similar users
  const shuffledSimilar = [...similarUsers].sort(() => Math.random() - 0.5);
  selected.push(...shuffledSimilar.slice(0, similarCount).map(u => u.id));

  // Select diverse users
  const shuffledDiverse = [...diverseUsers].sort(() => Math.random() - 0.5);
  selected.push(...shuffledDiverse.slice(0, diverseCount).map(u => u.id));

  return selected;
}

/**
 * Selects users for interaction based on the current recommendation strategy
 */
export function selectUsersForInteraction(
  user: User,
  allUsers: User[],
  config: SimulationConfig
): number[] {
  switch (config.strategy) {
    case RecommendationStrategy.SIMILARITY:
      return selectUsersBySimilarity(user, allUsers, config);
    
    case RecommendationStrategy.RANDOM:
      return selectUsersRandomly(user, allUsers, config);
    
    case RecommendationStrategy.DIVERSITY:
      return selectUsersWithDiversity(user, allUsers, config);
    
    default:
      return selectUsersBySimilarity(user, allUsers, config);
  }
}

/**
 * Updates a user's opinion based on interactions
 * User shifts opinion toward the average opinion of interacted users
 * @param user - The user whose opinion will be updated
 * @param interactedUsers - Users that the user interacted with
 * @param learningRate - Rate at which opinion changes (0-1)
 * @returns New opinion value
 */
export function updateUserOpinion(
  user: User,
  interactedUsers: User[],
  learningRate: number
): number {
  if (interactedUsers.length === 0) return user.opinion;

  // Calculate average opinion of interacted users
  const avgOpinion = interactedUsers.reduce((sum, u) => sum + u.opinion, 0) / interactedUsers.length;

  // Shift current opinion toward average opinion
  const newOpinion = user.opinion + learningRate * (avgOpinion - user.opinion);

  return clampOpinion(newOpinion);
}

/**
 * Normalizes an opinion distribution to ensure the values sum to 1
 */
function normalize(op: OpinionDistribution): OpinionDistribution {
  const sum = op.left + op.neutral + op.right;

  return {
    left: op.left / sum,
    neutral: op.neutral / sum,
    right: op.right / sum,
  };
}

/** Update user fuzzy opinion */
export function updateUserFuzzyOpinion(
  user: User,
  interactedUsers: User[],
  learningRate: number
): OpinionDistribution {
  if (interactedUsers.length === 0) return user.fuzzyOpinion;

  // Calculate average fuzzy opinion of interacted users
  const avg = interactedUsers.reduce(
    (acc, u) => ({
      left: acc.left + u.fuzzyOpinion.left,
      neutral: acc.neutral + u.fuzzyOpinion.neutral,
      right: acc.right + u.fuzzyOpinion.right,
    }),
    { left: 0, neutral: 0, right: 0 }
  );

  avg.left /= interactedUsers.length;
  avg.neutral /= interactedUsers.length;
  avg.right /= interactedUsers.length;

  // Interpolation towards the average fuzzy opinion of interacted users
  const newOpinion = {
    left: user.fuzzyOpinion.left + learningRate * (avg.left - user.fuzzyOpinion.left),
    neutral: user.fuzzyOpinion.neutral + learningRate * (avg.neutral - user.fuzzyOpinion.neutral),
    right: user.fuzzyOpinion.right + learningRate * (avg.right - user.fuzzyOpinion.right),
  };

  return normalize(newOpinion);
}

/**
 * Performs one step of the simulation
 * Updates all users' opinions based on their interactions
 */
export function simulationStep(
  users: User[],
  config: SimulationConfig
): { users: User[], interactions: Map<number, number[]> } {
  const newUsers = users.map(user => ({ ...user }));
  const interactions = new Map<number, number[]>();

  // For each user, select interaction targets and update opinion
  users.forEach((user, index) => {
    // Select users to interact with based on strategy
    const interactionIds = selectUsersForInteraction(user, users, config);
    interactions.set(user.id, interactionIds);

    // Get the actual user objects
    const interactedUsers = interactionIds.map(id => users[id]);

    // Update opinion based on interactions
    newUsers[index].opinion = updateUserOpinion(user, interactedUsers, config.learningRate);
    newUsers[index].fuzzyOpinion = updateUserFuzzyOpinion(user, interactedUsers, config.learningRate);
  });

  return { users: newUsers, interactions };
}
