import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { NetworkGraph } from './NetworkGraph';
import { useRealUsers } from '../hooks/useRealUsers';
import { Account } from '../types/social';
import { getInteractions } from '../utils/interactionTracker';

const STORAGE_KEY_ACCOUNTS = 'social_media_accounts';

/**
 * Admin Dashboard - Real-time visualization of user behavior
 */
export const AdminDashboard: React.FC = () => {
  const { logout, currentUser } = useAuth();
  const { users } = useRealUsers();
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalInteractions: 0,
    avgOpinion: 0,
    avgFuzzyLeft: 0,
    avgFuzzyNeutral: 0,
    avgFuzzyRight: 0,
    polarization: 0
  });

  useEffect(() => {
    const interval = setInterval(() => {
      loadStats();
    }, 1000);

    loadStats();

    return () => clearInterval(interval);
  }, []);

  const loadStats = () => {
    const stored = localStorage.getItem(STORAGE_KEY_ACCOUNTS);
    if (!stored) return;

    const accs: Account[] = JSON.parse(stored);
    setAccounts(accs);
    console.log('Loaded accounts from localStorage:', accs);

    const interactions = getInteractions();
    
    // Calculate average opinion
    const avgOpinion = accs.length > 0
      ? accs.reduce((sum, acc) => sum + acc.opinion, 0) / accs.length
      : 0;

    const avgFuzzyLeft = accs.length > 0
      ? accs.reduce((sum, acc) => sum + acc.fuzzyOpinion.left, 0) / accs.length
      : 0;

    const avgFuzzyNeutral = accs.length > 0
      ? accs.reduce((sum, acc) => sum + acc.fuzzyOpinion.neutral, 0) / accs.length
      : 0;

    const avgFuzzyRight = accs.length > 0
      ? accs.reduce((sum, acc) => sum + acc.fuzzyOpinion.right, 0) / accs.length
      : 0;

    // Calculate polarization (variance)
    const variance = accs.length > 0
      ? accs.reduce((sum, acc) => sum + Math.pow(acc.opinion - avgOpinion, 2), 0) / accs.length
      : 0;

    setStats({
      totalUsers: accs.length,
      totalInteractions: interactions.length,
      avgOpinion,
      avgFuzzyLeft,
      avgFuzzyNeutral,
      avgFuzzyRight,
      polarization: variance
    });
  };

  const getOpinionColor = (opinion: number) => {
    if (opinion < -0.3) return '#1976D2';
    if (opinion > 0.3) return '#D32F2F';
    return '#666';
  };

  const getOpinionLabel = (opinion: number) => {
    if (opinion < -0.3) return 'Left';
    if (opinion > 0.3) return 'Right';
    return 'Neutral';
  };

  return (
    <div style={styles.container}>
      {/* Header */}
      <header style={styles.header}>
        <div style={styles.headerContent}>
          <h1 style={styles.logo}>📊 Admin Dashboard</h1>
          <div style={styles.userInfo}>
            <span style={styles.username}>👤 {currentUser?.displayName}</span>
            <button onClick={logout} style={styles.logoutButton}>Logout</button>
          </div>
        </div>
      </header>

      <div style={styles.content}>
        {/* Stats Cards */}
        <div style={styles.statsGrid}>
          <div style={styles.statCard}>
            <div style={styles.statLabel}>Total Users</div>
            <div style={styles.statValue}>{stats.totalUsers}</div>
          </div>
          
          <div style={styles.statCard}>
            <div style={styles.statLabel}>Total Interactions</div>
            <div style={styles.statValue}>{stats.totalInteractions}</div>
          </div>
          
          <div style={styles.statCard}>
            <div style={styles.statLabel}>Average Opinion</div>
            <div style={{
              ...styles.statValue,
              color: getOpinionColor(stats.avgOpinion)
            }}>
              {stats.avgOpinion.toFixed(3)}
            </div>
          </div>

          <div style={styles.statCard}>
            <div style={styles.statLabel}>Fuzzy avg Left</div>
            <div style={{
              ...styles.statValue,
              color: getOpinionColor(-0.4)
            }}>
              {stats.avgFuzzyLeft.toFixed(3)}
            </div>
          </div>
          <div style={styles.statCard}>
            <div style={styles.statLabel}>Fuzzy avg Neutral</div>
            <div style={{
              ...styles.statValue,
              color: getOpinionColor(0)
            }}>
              {stats.avgFuzzyNeutral.toFixed(3)}
            </div>
          </div>
          <div style={styles.statCard}>
            <div style={styles.statLabel}>Fuzzy avg Right</div>
            <div style={{
              ...styles.statValue,
              color: getOpinionColor(0.4)
            }}>
              {stats.avgFuzzyRight.toFixed(3)}
            </div>
          </div>
          
          <div style={styles.statCard}>
            <div style={styles.statLabel}>Polarization Index</div>
            <div style={styles.statValue}>{stats.polarization.toFixed(3)}</div>
          </div>
        </div>

        {/* Network Visualization */}
        <div style={styles.section}>
          <NetworkGraph users={users} />
        </div>

        {/* User List */}
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>Active Users</h2>
          <div style={styles.userList}>
            {accounts.map((account) => (
              <div key={account.id} style={styles.userCard}>
                <div style={styles.userCardHeader}>
                  <span style={styles.userCardName}>{account.displayName}</span>
                  <span style={styles.userCardUsername}>@{account.username}</span>
                </div>
                <div style={styles.userCardOpinion}>
                  <span style={{ color: getOpinionColor(account.opinion), fontWeight: 'bold' }}>
                    ● {getOpinionLabel(account.opinion)}
                  </span>
                  <span style={styles.userCardScore}>
                    {account.opinion.toFixed(2)}
                  </span>
                </div>

                <div style={styles.userCardOpinion}>
                  <span style={{ color: getOpinionColor(-0.4), fontWeight: 'bold' }}>
                    ● {"left percentage: "}
                  </span>
                  <span style={styles.userCardScore}>
                    {account.fuzzyOpinion.left.toFixed(2)}
                  </span>
                </div>
                <div style={styles.userCardOpinion}>
                  <span style={{ color: getOpinionColor(0), fontWeight: 'bold' }}>
                    ● {"neutral percentage: "}
                  </span>
                  <span style={styles.userCardScore}>
                    {account.fuzzyOpinion.neutral.toFixed(2)}
                  </span>
                </div>
                <div style={styles.userCardOpinion}>
                  <span style={{ color: getOpinionColor(+0.4), fontWeight: 'bold' }}>
                    ● {"right percentage: "}
                  </span>
                  <span style={styles.userCardScore}>
                    {account.fuzzyOpinion.right.toFixed(2)}
                  </span>
                </div>
              </div>
            ))}
            
            {accounts.length === 0 && (
              <p style={styles.emptyState}>No users registered yet</p>
            )}
          </div>
        </div>

        {/* Info Box */}
        <div style={styles.infoBox}>
          <h3 style={styles.infoTitle}>ℹ️ About This Dashboard</h3>
          <p style={styles.infoText}>
            This dashboard shows real-time visualization of user behavior on the social media platform.
            User opinions are calculated based on their interactions with posts:
          </p>
          <ul style={styles.infoList}>
            <li>Viewing posts: Low influence (0.1x weight)</li>
            <li>Liking posts: Medium influence (0.5x weight)</li>
            <li>Commenting: High influence (0.8x weight)</li>
          </ul>
          <p style={styles.infoText}>
            The network graph shows connections between users with similar opinions.
            Watch as users naturally cluster into echo chambers based on the content they interact with!
          </p>
        </div>
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#f0f2f5'
  },
  header: {
    backgroundColor: 'white',
    borderBottom: '1px solid #ddd',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
  },
  headerContent: {
    maxWidth: '1400px',
    margin: '0 auto',
    padding: '15px 20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  logo: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#667eea',
    margin: 0
  },
  userInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px'
  },
  username: {
    fontSize: '14px',
    fontWeight: '500'
  },
  logoutButton: {
    padding: '8px 16px',
    backgroundColor: '#f44336',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '13px',
    fontWeight: '500'
  },
  content: {
    maxWidth: '1400px',
    margin: '0 auto',
    padding: '20px'
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '20px',
    marginBottom: '20px'
  },
  statCard: {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
  },
  statLabel: {
    fontSize: '14px',
    color: '#666',
    marginBottom: '8px'
  },
  statValue: {
    fontSize: '32px',
    fontWeight: 'bold',
    color: '#333'
  },
  section: {
    marginBottom: '20px'
  },
  sectionTitle: {
    fontSize: '20px',
    fontWeight: 'bold',
    color: '#333',
    marginBottom: '15px'
  },
  userList: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
    gap: '15px'
  },
  userCard: {
    backgroundColor: 'white',
    padding: '15px',
    borderRadius: '8px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
  },
  userCardHeader: {
    marginBottom: '10px'
  },
  userCardName: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#333',
    marginRight: '8px'
  },
  userCardUsername: {
    fontSize: '13px',
    color: '#888'
  },
  userCardOpinion: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: '14px'
  },
  userCardScore: {
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#555'
  },
  emptyState: {
    gridColumn: '1 / -1',
    textAlign: 'center',
    color: '#999',
    fontStyle: 'italic',
    padding: '40px'
  },
  infoBox: {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
    marginTop: '20px'
  },
  infoTitle: {
    fontSize: '18px',
    fontWeight: '600',
    color: '#333',
    marginBottom: '10px'
  },
  infoText: {
    fontSize: '14px',
    color: '#555',
    lineHeight: '1.6',
    marginBottom: '10px'
  },
  infoList: {
    marginLeft: '20px',
    marginBottom: '10px'
  }
};
