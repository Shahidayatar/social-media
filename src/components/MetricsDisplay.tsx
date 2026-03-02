import React from 'react';
import { SimulationMetrics } from '../types';

interface MetricsDisplayProps {
  metrics: SimulationMetrics | null;
}

/**
 * Displays current simulation metrics
 */
export const MetricsDisplay: React.FC<MetricsDisplayProps> = ({ metrics }) => {
  if (!metrics) {
    return (
      <div style={styles.container}>
        <h2 style={styles.title}>Metrics</h2>
        <p style={styles.noData}>No metrics available yet</p>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Current Metrics (Step {metrics.step})</h2>
      
      <div style={styles.metricsGrid}>
        <div style={styles.metricCard}>
          <div style={styles.metricLabel}>Average Opinion</div>
          <div style={{
            ...styles.metricValue,
            color: getOpinionColor(metrics.averageOpinion)
          }}>
            {metrics.averageOpinion.toFixed(3)}
          </div>
          <div style={styles.metricSubtext}>
            Range: -1 (left) to +1 (right)
          </div>
        </div>

        <div style={styles.metricCard}>
          <div style={styles.metricLabel}>Standard Deviation</div>
          <div style={styles.metricValue}>
            {metrics.standardDeviation.toFixed(3)}
          </div>
          <div style={styles.metricSubtext}>
            Spread of opinions
          </div>
        </div>

        <div style={styles.metricCard}>
          <div style={styles.metricLabel}>Polarization Index</div>
          <div style={{
            ...styles.metricValue,
            color: getPolarizationColor(metrics.polarizationIndex)
          }}>
            {metrics.polarizationIndex.toFixed(3)}
          </div>
          <div style={styles.metricSubtext}>
            Variance of opinions
          </div>
        </div>

        <div style={styles.metricCard}>
          <div style={styles.metricLabel}>Cross-Group Interaction</div>
          <div style={{
            ...styles.metricValue,
            color: getCrossGroupColor(metrics.crossGroupInteractionRatio)
          }}>
            {(metrics.crossGroupInteractionRatio * 100).toFixed(1)}%
          </div>
          <div style={styles.metricSubtext}>
            Interactions across opinion divide
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * Gets color based on opinion value
 */
function getOpinionColor(opinion: number): string {
  if (opinion < -0.3) return '#1976D2'; // Blue for left
  if (opinion > 0.3) return '#D32F2F'; // Red for right
  return '#666'; // Gray for center
}

/**
 * Gets color based on polarization level
 */
function getPolarizationColor(polarization: number): string {
  if (polarization > 0.4) return '#D32F2F'; // High polarization
  if (polarization > 0.2) return '#F57C00'; // Medium polarization
  return '#388E3C'; // Low polarization
}

/**
 * Gets color based on cross-group interaction ratio
 */
function getCrossGroupColor(ratio: number): string {
  if (ratio > 0.4) return '#388E3C'; // Good cross-group interaction
  if (ratio > 0.2) return '#F57C00'; // Medium cross-group interaction
  return '#D32F2F'; // Low cross-group interaction
}

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
  noData: {
    color: '#999',
    fontStyle: 'italic'
  },
  metricsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '15px'
  },
  metricCard: {
    backgroundColor: 'white',
    padding: '15px',
    borderRadius: '6px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
  },
  metricLabel: {
    fontSize: '14px',
    color: '#666',
    marginBottom: '8px',
    fontWeight: '500'
  },
  metricValue: {
    fontSize: '28px',
    fontWeight: 'bold',
    marginBottom: '5px'
  },
  metricSubtext: {
    fontSize: '12px',
    color: '#999'
  }
};
