import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { MetricsDataPoint } from '../types';

interface MetricsChartProps {
  data: MetricsDataPoint[];
}

/**
 * Line chart component displaying metrics over time
 */
export const MetricsChart: React.FC<MetricsChartProps> = ({ data }) => {
  if (data.length === 0) {
    return (
      <div style={styles.container}>
        <h2 style={styles.title}>Metrics Over Time</h2>
        <p style={styles.noData}>Start the simulation to see metrics trends</p>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Metrics Over Time</h2>
      
      {/* Polarization Index Chart */}
      <div style={styles.chartContainer}>
        <h3 style={styles.chartTitle}>Polarization Index</h3>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="step" 
              label={{ value: 'Simulation Step', position: 'insideBottom', offset: -5 }}
            />
            <YAxis 
              label={{ value: 'Polarization Index', angle: -90, position: 'insideLeft' }}
              domain={[0, 'auto']}
            />
            <Tooltip />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="polarizationIndex" 
              stroke="#8884d8" 
              strokeWidth={2}
              name="Polarization"
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Average Opinion Chart */}
      <div style={styles.chartContainer}>
        <h3 style={styles.chartTitle}>Average Opinion</h3>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="step" 
              label={{ value: 'Simulation Step', position: 'insideBottom', offset: -5 }}
            />
            <YAxis 
              label={{ value: 'Average Opinion', angle: -90, position: 'insideLeft' }}
              domain={[-1, 1]}
            />
            <Tooltip />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="averageOpinion" 
              stroke="#82ca9d" 
              strokeWidth={2}
              name="Avg Opinion"
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Cross-Group Interaction Chart */}
      <div style={styles.chartContainer}>
        <h3 style={styles.chartTitle}>Cross-Group Interaction Ratio</h3>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="step" 
              label={{ value: 'Simulation Step', position: 'insideBottom', offset: -5 }}
            />
            <YAxis 
              label={{ value: 'Cross-Group Ratio', angle: -90, position: 'insideLeft' }}
              domain={[0, 1]}
            />
            <Tooltip />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="crossGroupInteractionRatio" 
              stroke="#ff7300" 
              strokeWidth={2}
              name="Cross-Group"
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
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
  noData: {
    color: '#999',
    fontStyle: 'italic',
    textAlign: 'center',
    padding: '40px'
  },
  chartContainer: {
    backgroundColor: 'white',
    borderRadius: '6px',
    padding: '20px',
    marginBottom: '20px'
  },
  chartTitle: {
    margin: '0 0 15px 0',
    fontSize: '16px',
    fontWeight: '500',
    color: '#555'
  }
};
