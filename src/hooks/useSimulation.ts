import { useState, useEffect, useCallback, useRef } from 'react';
import { User, SimulationConfig, SimulationMetrics, MetricsDataPoint, RecommendationStrategy } from '../types';
import { generateUsers } from '../utils/calculations';
import { simulationStep } from '../simulation/engine';
import {
  calculateAverageOpinion,
  calculatePolarizationIndex,
  calculateStandardDeviation,
  calculateCrossGroupInteractionRatio
} from '../utils/calculations';

/**
 * Default simulation configuration
 */
const defaultConfig: SimulationConfig = {
  userCount: 100,
  learningRate: 0.05,
  strategy: RecommendationStrategy.SIMILARITY,
  diversityPercentage: 30,
  similarityThreshold: 0.3
};

/**
 * Custom hook for managing simulation state and controls
 */
export function useSimulation() {
  const [users, setUsers] = useState<User[]>([]);
  const [config, setConfig] = useState<SimulationConfig>(defaultConfig);
  const [isRunning, setIsRunning] = useState(false);
  const [step, setStep] = useState(0);
  const [metrics, setMetrics] = useState<SimulationMetrics | null>(null);
  const [metricsHistory, setMetricsHistory] = useState<MetricsDataPoint[]>([]);
  const intervalRef = useRef<number | null>(null);

  /**
   * Initialize users on mount
   */
  useEffect(() => {
    const initialUsers = generateUsers(config);
    setUsers(initialUsers);
    updateMetrics(initialUsers, new Map(), 0);
  }, []);

  /**
   * Updates metrics based on current user state
   */
  const updateMetrics = useCallback((
    currentUsers: User[],
    interactions: Map<number, number[]>,
    currentStep: number
  ) => {
    const newMetrics: SimulationMetrics = {
      averageOpinion: calculateAverageOpinion(currentUsers),
      standardDeviation: calculateStandardDeviation(currentUsers),
      polarizationIndex: calculatePolarizationIndex(currentUsers),
      crossGroupInteractionRatio: calculateCrossGroupInteractionRatio(currentUsers, interactions),
      step: currentStep
    };

    setMetrics(newMetrics);

    // Add to history (keep last 100 data points)
    setMetricsHistory(prev => {
      const newHistory = [...prev, {
        step: currentStep,
        polarizationIndex: newMetrics.polarizationIndex,
        averageOpinion: newMetrics.averageOpinion,
        crossGroupInteractionRatio: newMetrics.crossGroupInteractionRatio
      }];
      return newHistory.slice(-100);
    });
  }, []);

  /**
   * Runs one step of the simulation
   */
  const runStep = useCallback(() => {
    setUsers(currentUsers => {
      const { users: newUsers, interactions } = simulationStep(currentUsers, config);
      const newStep = step + 1;
      setStep(newStep);
      updateMetrics(newUsers, interactions, newStep);
      return newUsers;
    });
  }, [config, step, updateMetrics]);

  /**
   * Starts the simulation
   */
  const startSimulation = useCallback(() => {
    if (isRunning) return;
    
    setIsRunning(true);
    intervalRef.current = window.setInterval(() => {
      runStep();
    }, 500); // Run step every 500ms
  }, [isRunning, runStep]);

  /**
   * Stops the simulation
   */
  const stopSimulation = useCallback(() => {
    setIsRunning(false);
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  /**
   * Resets the simulation to initial state
   */
  const resetSimulation = useCallback(() => {
    stopSimulation();
    const newUsers = generateUsers(config);
    setUsers(newUsers);
    setStep(0);
    setMetricsHistory([]);
    updateMetrics(newUsers, new Map(), 0);
  }, [config, stopSimulation, updateMetrics]);

  /**
   * Updates simulation configuration
   */
  const updateConfig = useCallback((updates: Partial<SimulationConfig>) => {
    setConfig(prev => ({ ...prev, ...updates }));
  }, []);

  /**
   * Cleanup interval on unmount
   */
  useEffect(() => {
    return () => {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return {
    users,
    config,
    isRunning,
    step,
    metrics,
    metricsHistory,
    startSimulation,
    stopSimulation,
    resetSimulation,
    updateConfig
  };
}
