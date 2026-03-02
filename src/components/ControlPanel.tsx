import React from 'react';
import { SimulationConfig, RecommendationStrategy } from '../types';

interface ControlPanelProps {
  config: SimulationConfig;
  isRunning: boolean;
  onStart: () => void;
  onStop: () => void;
  onReset: () => void;
  onConfigChange: (updates: Partial<SimulationConfig>) => void;
}

/**
 * Control panel component for simulation controls and configuration
 */
export const ControlPanel: React.FC<ControlPanelProps> = ({
  config,
  isRunning,
  onStart,
  onStop,
  onReset,
  onConfigChange
}) => {
  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Simulation Controls</h2>
      
      {/* Action Buttons */}
      <div style={styles.buttonGroup}>
        <button
          onClick={onStart}
          disabled={isRunning}
          style={{
            ...styles.button,
            ...styles.startButton,
            ...(isRunning ? styles.disabledButton : {})
          }}
        >
          Start Simulation
        </button>
        
        <button
          onClick={onStop}
          disabled={!isRunning}
          style={{
            ...styles.button,
            ...styles.stopButton,
            ...(!isRunning ? styles.disabledButton : {})
          }}
        >
          Stop Simulation
        </button>
        
        <button
          onClick={onReset}
          style={{
            ...styles.button,
            ...styles.resetButton
          }}
        >
          Reset
        </button>
      </div>

      {/* Strategy Selection */}
      <div style={styles.control}>
        <label style={styles.label}>Recommendation Strategy:</label>
        <select
          value={config.strategy}
          onChange={(e) => onConfigChange({ strategy: e.target.value as RecommendationStrategy })}
          style={styles.select}
        >
          <option value={RecommendationStrategy.SIMILARITY}>
            A) Similarity-Based (Echo Chamber)
          </option>
          <option value={RecommendationStrategy.RANDOM}>
            B) Random Exposure
          </option>
          <option value={RecommendationStrategy.DIVERSITY}>
            C) Diversity Intervention
          </option>
        </select>
      </div>

      {/* Diversity Percentage Slider (only for diversity strategy) */}
      {config.strategy === RecommendationStrategy.DIVERSITY && (
        <div style={styles.control}>
          <label style={styles.label}>
            Diversity Percentage: {config.diversityPercentage}%
          </label>
          <input
            type="range"
            min="0"
            max="100"
            value={config.diversityPercentage}
            onChange={(e) => onConfigChange({ diversityPercentage: Number(e.target.value) })}
            style={styles.slider}
          />
          <div style={styles.sliderLabels}>
            <span>0% (All Similar)</span>
            <span>100% (All Diverse)</span>
          </div>
        </div>
      )}

      {/* Learning Rate Control */}
      <div style={styles.control}>
        <label style={styles.label}>
          Learning Rate: {config.learningRate.toFixed(2)}
        </label>
        <input
          type="range"
          min="0.01"
          max="0.20"
          step="0.01"
          value={config.learningRate}
          onChange={(e) => onConfigChange({ learningRate: Number(e.target.value) })}
          style={styles.slider}
        />
      </div>

      {/* Similarity Threshold Control */}
      <div style={styles.control}>
        <label style={styles.label}>
          Similarity Threshold: {config.similarityThreshold.toFixed(2)}
        </label>
        <input
          type="range"
          min="0.1"
          max="1.0"
          step="0.05"
          value={config.similarityThreshold}
          onChange={(e) => onConfigChange({ similarityThreshold: Number(e.target.value) })}
          style={styles.slider}
        />
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    padding: '20px',
    backgroundColor: '#f5f5f5',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    marginBottom: '20px'
  },
  title: {
    margin: '0 0 20px 0',
    fontSize: '20px',
    fontWeight: 'bold',
    color: '#333'
  },
  buttonGroup: {
    display: 'flex',
    gap: '10px',
    marginBottom: '20px'
  },
  button: {
    padding: '10px 20px',
    fontSize: '14px',
    fontWeight: 'bold',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'all 0.2s'
  },
  startButton: {
    backgroundColor: '#4CAF50',
    color: 'white',
  },
  stopButton: {
    backgroundColor: '#f44336',
    color: 'white',
  },
  resetButton: {
    backgroundColor: '#2196F3',
    color: 'white',
  },
  disabledButton: {
    opacity: 0.5,
    cursor: 'not-allowed',
  },
  control: {
    marginBottom: '15px'
  },
  label: {
    display: 'block',
    marginBottom: '5px',
    fontSize: '14px',
    fontWeight: '500',
    color: '#555'
  },
  select: {
    width: '100%',
    padding: '8px',
    fontSize: '14px',
    borderRadius: '4px',
    border: '1px solid #ddd',
    backgroundColor: 'white'
  },
  slider: {
    width: '100%',
    cursor: 'pointer'
  },
  sliderLabels: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '12px',
    color: '#777',
    marginTop: '5px'
  }
};
