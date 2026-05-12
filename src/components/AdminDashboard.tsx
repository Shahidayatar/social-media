import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { NetworkGraph } from './NetworkGraph';
import { useRealUsers } from '../hooks/useRealUsers';
import { Account } from '../types/social';
import { getInteractions, getMetricsByStrategy} from '../utils/interactionTracker';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Label } from 'recharts';

function toFuzzy(score: number) {
  const clamped = Math.max(-1, Math.min(1, score));

  const left = Math.max(0, -clamped);
  const right = Math.max(0, clamped);
  const neutral = 1 - Math.abs(clamped);

  return {
    left,
    neutral,
    right
  };
}
const STORAGE_KEY_ACCOUNTS = 'social_media_accounts';

/**
 * Admin Dashboard - Real-time visualization of user behavior
 */
export const AdminDashboard: React.FC = () => {
  const { logout, currentUser } = useAuth();
  const { users } = useRealUsers();
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [statsByStrategy, setStatsByStrategy] = useState<any[]>([]);
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

    const accsWithAdmin: Account[] = JSON.parse(stored);
    // filter out admin accounts from stats
    const accs = accsWithAdmin.filter(acc => acc.role !== 'admin');

    setAccounts(accs);
    console.log('Loaded accounts from localStorage:', accs);

    const groupedByStrategy = accs.reduce((acc, user) => {
    const key = user.strategy || 'unknown';
    if (!acc[key]) acc[key] = [];
    acc[key].push(user);
    return acc;
  }, {} as Record<string, Account[]>);

  const statsByStrategy = Object.entries(groupedByStrategy).map(([strategy, users]) => {
    const size = users.length || 1;

    return {
      strategy,
      users: size,

      avgOpinion:
        users.reduce((s, u) => s + u.opinion, 0) / size,

      avgFuzzyLeft:
        users.reduce((s, u) => s + u.fuzzyOpinion.left, 0) / size,

      avgFuzzyNeutral:
        users.reduce((s, u) => s + u.fuzzyOpinion.neutral, 0) / size,

      avgFuzzyRight:
        users.reduce((s, u) => s + u.fuzzyOpinion.right, 0) / size
    };
  });
  setStatsByStrategy(statsByStrategy);

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

  const FuzzyBar = ({ left, neutral, right }: { left: number; neutral: number; right: number }) => {
  return (
    <div style={{
      display: 'flex',
      height: 20,
      borderRadius: 10,
      overflow: 'hidden',
      background: '#eee'
    }}>
      <div style={{ width: `${left * 100}%`, background: '#1976D2' }} />
      <div style={{ width: `${neutral * 100}%`, background: '#888' }} />
      <div style={{ width: `${right * 100}%`, background: '#D32F2F' }} />
    </div>
  );
};


  const strategyMetrics = {
    similarity: getMetricsByStrategy('similarity'),
    random: getMetricsByStrategy('random'),
    diversity: getMetricsByStrategy('diversity')
  };

  const strategyChartData = Object.entries(strategyMetrics).map(
    ([strategy, data]) => ({
      strategy,
      avg: data.avgOpinion,
      polarization: data.polarization
    })
  );


  const fuzzyGraphData = [];

    for (let x = -1; x <= 1; x += 0.05) {
      const fuzzy = toFuzzy(x);

      fuzzyGraphData.push({
        opinion: x,
        left: fuzzy.left,
        neutral: fuzzy.neutral,
        right: fuzzy.right
      });
    }


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
            <div style={styles.statLabel}>Fuzzy Opinion Distribution</div>

            <FuzzyBar
              left={stats.avgFuzzyLeft}
              neutral={stats.avgFuzzyNeutral}
              right={stats.avgFuzzyRight}
            />

            <div style={{ fontSize: 12, marginTop: 8 }}>
              L {stats.avgFuzzyLeft.toFixed(2)} | 
              N {stats.avgFuzzyNeutral.toFixed(2)} | 
              R {stats.avgFuzzyRight.toFixed(2)}
            </div>
        </div>
          
          <div style={styles.statCard}>
            <div style={styles.statLabel}>Polarization Index</div>
            <div style={styles.statValue}>{stats.polarization.toFixed(3)}</div>
          </div>
        </div>

        <div style={styles.section}>
          <h2>Strategy Comparison</h2>

          {Object.entries(strategyMetrics).map(([key, value]) => (
            <div key={key} style={{ marginBottom: 10 }}>
              <b>{key}</b>
              <div>avg: {value.avgOpinion.toFixed(3)}</div>
              <div>polarization: {value.polarization.toFixed(3)}</div>
              <div>users: {value.users}</div>
            </div>
          ))}
        </div>

        
        <LineChart width={500} height={300} data={strategyChartData}>
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="strategy">
            <Label value="Strategy" position="insideBottom" offset={-5} />
          </XAxis>

          <YAxis>
            <Label
              value="Polarization"
              angle={-90}
              position="insideLeft"
              style={{ textAnchor: 'middle' }}
            />
          </YAxis>

          <Tooltip />

          <Line type="monotone" dataKey="polarization" stroke="#D32F2F" />
        </LineChart>

        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>Stats par stratégie</h2>

          <div style={styles.userList}>
            {statsByStrategy.map((s) => (
              <div key={s.strategy} style={styles.userCard}>

                <div style={styles.userCardHeader}>
                  <span style={styles.userCardName}>
                    {s.strategy.toUpperCase()}
                  </span>
                  <span style={styles.userCardUsername}>
                    {s.users} users
                  </span>
                </div>

                <div style={styles.userCardOpinion}>
                  <span>Avg opinion</span>
                  <span style={styles.userCardScore}>
                    {s.avgOpinion.toFixed(3)}
                  </span>
                </div>

                <div style={{ marginTop: 10 }}>
                  <FuzzyBar
                    left={s.avgFuzzyLeft}
                    neutral={s.avgFuzzyNeutral}
                    right={s.avgFuzzyRight}
                  />
                </div>
                <div style={{ fontSize: 12, marginTop: 8 }}>
                  L {s.avgFuzzyLeft.toFixed(2)} | 
                  N {s.avgFuzzyNeutral.toFixed(2)} | 
                  R {s.avgFuzzyRight.toFixed(2)}
                </div>

              </div>
            ))}
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
                <FuzzyBar
                    left={account.fuzzyOpinion.left}
                    neutral={account.fuzzyOpinion.neutral}
                    right={account.fuzzyOpinion.right}
                  />
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
