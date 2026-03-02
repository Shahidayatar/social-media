import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { User } from '../types';

interface NetworkGraphProps {
  users: User[];
}

interface D3Node extends d3.SimulationNodeDatum {
  id: number;
  opinion: number;
  x?: number;
  y?: number;
}

interface D3Link extends d3.SimulationLinkDatum<D3Node> {
  source: number | D3Node;
  target: number | D3Node;
}

/**
 * D3-based network graph visualization showing users as nodes
 * Node colors represent political opinions (blue = left, red = right)
 */
export const NetworkGraph: React.FC<NetworkGraphProps> = ({ users }) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const simulationRef = useRef<d3.Simulation<D3Node, D3Link> | null>(null);

  useEffect(() => {
    if (!svgRef.current) return;
    
    const width = 800;
    const height = 600;

    // Clear previous content
    d3.select(svgRef.current).selectAll('*').remove();

    const svg = d3.select(svgRef.current)
      .attr('width', width)
      .attr('height', height)
      .attr('viewBox', [0, 0, width, height])
      .style('background', '#f9f9f9')
      .style('border', '1px solid #ddd')
      .style('borderRadius', '4px');

    // If no users, show message
    if (users.length === 0) {
      svg.append('text')
        .attr('x', width / 2)
        .attr('y', height / 2)
        .attr('text-anchor', 'middle')
        .attr('fill', '#999')
        .attr('font-size', '16px')
        .text('No users yet. Register some accounts to see the network!');
      return;
    }

    // Prepare data for D3
    const nodes: D3Node[] = users.map(user => ({
      id: user.id,
      opinion: user.opinion
    }));

    const links: D3Link[] = [];
    users.forEach(user => {
      user.connections.forEach(targetId => {
        // Only add link once (avoid duplicates)
        if (user.id < targetId) {
          links.push({
            source: user.id,
            target: targetId
          });
        }
      });
    });

    // Create force simulation with stronger forces for visibility
    const simulation = d3.forceSimulation<D3Node>(nodes)
      .force('link', d3.forceLink<D3Node, D3Link>(links)
        .id((d: D3Node) => d.id)
        .distance(100))
      .force('charge', d3.forceManyBody().strength(-300))
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force('collision', d3.forceCollide().radius(15));

    simulationRef.current = simulation;

    // Add links
    const link = svg.append('g')
      .selectAll('line')
      .data(links)
      .join('line')
      .attr('stroke', '#999')
      .attr('stroke-opacity', 0.3)
      .attr('stroke-width', 1);

    // Add nodes with better visibility
    const node = svg.append('g')
      .selectAll('circle')
      .data(nodes)
      .join('circle')
      .attr('r', 10)
      .attr('fill', (d: D3Node) => getOpinionColor(d.opinion))
      .attr('stroke', '#fff')
      .attr('stroke-width', 2);

    // Add tooltips
    node.append('title')
      .text((d: D3Node) => `User ${d.id}\nOpinion: ${d.opinion.toFixed(2)}`);

    // Add labels for user IDs
    const labels = svg.append('g')
      .selectAll('text')
      .data(nodes)
      .join('text')
      .attr('text-anchor', 'middle')
      .attr('dy', 4)
      .attr('font-size', '10px')
      .attr('font-weight', 'bold')
      .attr('fill', '#fff')
      .attr('pointer-events', 'none')
      .text((d: D3Node) => d.id);

    // Update positions on each tick
    simulation.on('tick', () => {
      link
        .attr('x1', (d: D3Link) => (d.source as D3Node).x ?? 0)
        .attr('y1', (d: D3Link) => (d.source as D3Node).y ?? 0)
        .attr('x2', (d: D3Link) => (d.target as D3Node).x ?? 0)
        .attr('y2', (d: D3Link) => (d.target as D3Node).y ?? 0);

      node
        .attr('cx', (d: D3Node) => d.x ?? 0)
        .attr('cy', (d: D3Node) => d.y ?? 0);

      labels
        .attr('x', (d: D3Node) => d.x ?? 0)
        .attr('y', (d: D3Node) => d.y ?? 0);
    });

    // Cleanup
    return () => {
      simulation.stop();
    };
  }, [users]);

  // Update node colors when opinions change
  useEffect(() => {
    if (!svgRef.current || users.length === 0) return;

    d3.select(svgRef.current)
      .selectAll<SVGCircleElement, D3Node>('circle')
      .data(users.map(u => ({ id: u.id, opinion: u.opinion })), (d: D3Node) => d.id.toString())
      .attr('fill', (d: D3Node) => getOpinionColor(d.opinion));
  }, [users]);

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Network Visualization ({users.length} users)</h2>
      <div style={styles.graphContainer}>
        <svg ref={svgRef} style={styles.svg}></svg>
        <div style={styles.legend}>
          <div style={styles.legendItem}>
            <div style={{ ...styles.legendColor, backgroundColor: '#1976D2' }}></div>
            <span>Left (-1)</span>
          </div>
          <div style={styles.legendItem}>
            <div style={{ ...styles.legendColor, backgroundColor: '#9E9E9E' }}></div>
            <span>Center (0)</span>
          </div>
          <div style={styles.legendItem}>
            <div style={{ ...styles.legendColor, backgroundColor: '#D32F2F' }}></div>
            <span>Right (+1)</span>
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * Maps opinion value to color (blue = left, red = right)
 */
function getOpinionColor(opinion: number): string {
  // Create gradient from blue (-1) to gray (0) to red (+1)
  const normalized = (opinion + 1) / 2; // Convert from [-1, 1] to [0, 1]
  
  if (normalized < 0.5) {
    // Blue to gray
    const t = normalized * 2;
    return d3.interpolateRgb('#1976D2', '#9E9E9E')(t);
  } else {
    // Gray to red
    const t = (normalized - 0.5) * 2;
    return d3.interpolateRgb('#9E9E9E', '#D32F2F')(t);
  }
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
    margin: '0 0 15px 0',
    fontSize: '20px',
    fontWeight: 'bold',
    color: '#333'
  },
  graphContainer: {
    backgroundColor: 'white',
    borderRadius: '6px',
    padding: '10px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  svg: {
    border: '1px solid #ddd',
    borderRadius: '4px'
  },
  legend: {
    display: 'flex',
    gap: '20px',
    marginTop: '15px',
    fontSize: '14px'
  },
  legendItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  },
  legendColor: {
    width: '20px',
    height: '20px',
    borderRadius: '50%',
    border: '2px solid #fff',
    boxShadow: '0 0 3px rgba(0,0,0,0.3)'
  }
};
