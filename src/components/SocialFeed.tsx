import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Post, Comment, PostLeaning, RecommendationStrategy } from '../types/social';
import { getPosts, savePosts } from '../data/seedPosts';
import { trackInteraction, getRecommendedPosts, getUserOpinion } from '../utils/interactionTracker';
import { getUserStrategy, updateUserStrategy } from '../utils/accountManager';

type ManualFilter = 'all' | 'left' | 'neutral' | 'right';

/**
 * Social Media Feed - Main user interface
 */
export const SocialFeed: React.FC = () => {
  const { currentUser, logout } = useAuth();
  const [posts, setPosts] = useState<Post[]>([]);
  const [userStrategy, setUserStrategy] = useState<RecommendationStrategy>('similarity');
  const [manualFilter, setManualFilter] = useState<ManualFilter>('all');
  const [userOpinion, setUserOpinion] = useState(0);

  useEffect(() => {
    if (currentUser) {
      const strategy = getUserStrategy(currentUser.userId);
      setUserStrategy(strategy);
      loadPosts(strategy, manualFilter);
      setUserOpinion(getUserOpinion(currentUser.userId));
    }
  }, [currentUser]);

  const loadPosts = (strategy: RecommendationStrategy, filter: ManualFilter) => {
    const allPosts = getPosts();
    let filteredPosts = allPosts;

    // Manual filter takes priority
    if (filter !== 'all') {
      switch (filter) {
        case 'left':
          filteredPosts = allPosts.filter(p => p.leaning === PostLeaning.LEFT);
          break;
        case 'neutral':
          filteredPosts = allPosts.filter(p => p.leaning === PostLeaning.NEUTRAL);
          break;
        case 'right':
          filteredPosts = allPosts.filter(p => p.leaning === PostLeaning.RIGHT);
          break;
      }
      // Just show chronologically when manually filtered
      filteredPosts.sort((a, b) => b.timestamp - a.timestamp);
    } else {
      // Use algorithm when no manual filter
      filteredPosts = getRecommendedPosts(currentUser!.userId, allPosts, strategy);
    }

    setPosts(filteredPosts);
  };

  const handleStrategyChange = (newStrategy: RecommendationStrategy) => {
    if (!currentUser) return;
    setUserStrategy(newStrategy);
    updateUserStrategy(currentUser.userId, newStrategy);
    loadPosts(newStrategy, manualFilter);
  };

  const handleFilterChange = (filter: ManualFilter) => {
    setManualFilter(filter);
    loadPosts(userStrategy, filter);
  };

  const handleView = (post: Post) => {
    if (!currentUser) return;
    trackInteraction(currentUser.userId, post.id, 'view', post.leaningScore);
    setUserOpinion(getUserOpinion(currentUser.userId));
  };

  const handleLike = (postId: string) => {
    if (!currentUser) return;
    
    const allPosts = getPosts();
    const postIndex = allPosts.findIndex(p => p.id === postId);
    if (postIndex === -1) return;
    
    const post = allPosts[postIndex];
    const hasLiked = post.likes.includes(currentUser.userId);
    
    if (hasLiked) {
      post.likes = post.likes.filter(id => id !== currentUser.userId);
    } else {
      post.likes.push(currentUser.userId);
      trackInteraction(currentUser.userId, postId, 'like', post.leaningScore);
    }
    
    allPosts[postIndex] = post;
    savePosts(allPosts);
    loadPosts(userStrategy, manualFilter);
    setUserOpinion(getUserOpinion(currentUser.userId));
  };

  const handleComment = (postId: string, content: string) => {
    if (!currentUser || !content.trim()) return;
    
    const allPosts = getPosts();
    const postIndex = allPosts.findIndex(p => p.id === postId);
    if (postIndex === -1) return;
    
    const post = allPosts[postIndex];
    const newComment: Comment = {
      id: `comment_${Date.now()}`,
      authorId: currentUser.userId,
      authorName: currentUser.displayName,
      content,
      timestamp: Date.now()
    };
    
    post.comments.push(newComment);
    allPosts[postIndex] = post;
    savePosts(allPosts);
    
    trackInteraction(currentUser.userId, postId, 'comment', post.leaningScore);
    loadPosts(userStrategy, manualFilter);
    setUserOpinion(getUserOpinion(currentUser.userId));
  };

  const getOpinionColor = (opinion: number) => {
    if (opinion < -0.3) return '#1976D2'; // Blue (left)
    if (opinion > 0.3) return '#D32F2F'; // Red (right)
    return '#666'; // Gray (neutral)
  };

  const getOpinionLabel = (opinion: number) => {
    if (opinion < -0.3) return 'Left-leaning';
    if (opinion > 0.3) return 'Right-leaning';
    return 'Neutral';
  };

  return (
    <div style={styles.container}>
      {/* Header */}
      <header style={styles.header}>
        <div style={styles.headerContent}>
          <h1 style={styles.logo}>🌐 Social Feed</h1>
          <div style={styles.userInfo}>
            <span style={styles.username}>👤 {currentUser?.displayName}</span>
            <div style={styles.opinionBadge}>
              <span style={{ color: getOpinionColor(userOpinion) }}>
                ● {getOpinionLabel(userOpinion)} ({userOpinion.toFixed(2)})
              </span>
            </div>
            <button onClick={logout} style={styles.logoutButton}>Logout</button>
          </div>
        </div>
      </header>

      {/* Strategy & Filter Controls */}
      <div style={styles.controlsContainer}>
        <div style={styles.controlsContent}>
          {/* Algorithm Strategy Selection */}
          <div style={styles.strategySection}>
            <label style={styles.strategyLabel}>
              🤖 Algorithm Strategy:
            </label>
            <select
              value={userStrategy}
              onChange={(e) => handleStrategyChange(e.target.value as RecommendationStrategy)}
              style={styles.strategySelect}
            >
              <option value="similarity">A) Similarity-Based (Echo Chamber)</option>
              <option value="random">B) Random Exposure (Break Bubble)</option>
              <option value="diversity">C) Diversity Intervention (70-30 Mix)</option>
            </select>
          </div>

          {/* Manual Filter Buttons */}
          <div style={styles.filterSection}>
            <span style={styles.filterLabel}>👤 Manual Filters:</span>
            <div style={styles.filterButtons}>
              <button
                onClick={() => handleFilterChange('all')}
                style={{
                  ...styles.filterButton,
                  ...(manualFilter === 'all' ? styles.filterButtonActive : {})
                }}
              >
                All Posts
              </button>
              <button
                onClick={() => handleFilterChange('left')}
                style={{
                  ...styles.filterButton,
                  ...(manualFilter === 'left' ? styles.filterButtonActiveLeft : {})
                }}
              >
                Left Only
              </button>
              <button
                onClick={() => handleFilterChange('neutral')}
                style={{
                  ...styles.filterButton,
                  ...(manualFilter === 'neutral' ? styles.filterButtonActiveNeutral : {})
                }}
              >
                Neutral Only
              </button>
              <button
                onClick={() => handleFilterChange('right')}
                style={{
                  ...styles.filterButton,
                  ...(manualFilter === 'right' ? styles.filterButtonActiveRight : {})
                }}
              >
                Right Only
              </button>
            </div>
          </div>

          {/* Active Mode Indicator */}
          <div style={styles.modeIndicator}>
            {manualFilter === 'all' ? (
              <span style={styles.modeAlgorithm}>
                🤖 Algorithm Mode Active: {getStrategyDescription(userStrategy)}
              </span>
            ) : (
              <span style={styles.modeManual}>
                👤 Manual Filter Active: Showing {manualFilter} posts only
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Feed */}
      <main style={styles.feed}>
        <div style={styles.feedContainer}>
          {posts.length === 0 ? (
            <div style={styles.emptyFeed}>
              <p>No posts match your current filter</p>
            </div>
          ) : (
            posts.map(post => (
              <PostCard
                key={post.id}
                post={post}
                currentUserId={currentUser?.userId || ''}
                onView={handleView}
                onLike={handleLike}
                onComment={handleComment}
              />
            ))
          )}
        </div>
      </main>
    </div>
  );
};

function getStrategyDescription(strategy: RecommendationStrategy): string {
  switch (strategy) {
    case 'similarity':
      return 'Showing posts similar to your opinion (Echo Chamber Effect)';
    case 'random':
      return 'Showing random posts (Breaking Filter Bubble)';
    case 'diversity':
      return 'Showing 70% similar + 30% diverse posts (Intervention)';
    default:
      return '';
  }
}

/**
 * Individual Post Card Component
 */
interface PostCardProps {
  post: Post;
  currentUserId: string;
  onView: (post: Post) => void;
  onLike: (postId: string) => void;
  onComment: (postId: string, content: string) => void;
}

const PostCard: React.FC<PostCardProps> = ({ post, currentUserId, onView, onLike, onComment }) => {
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [hasViewed, setHasViewed] = useState(false);

  useEffect(() => {
    if (!hasViewed) {
      onView(post);
      setHasViewed(true);
    }
  }, []);

  const hasLiked = post.likes.includes(currentUserId);

  const handleCommentSubmit = () => {
    if (commentText.trim()) {
      onComment(post.id, commentText);
      setCommentText('');
    }
  };

  const getTimeSince = (timestamp: number) => {
    const seconds = Math.floor((Date.now() - timestamp) / 1000);
    if (seconds < 60) return 'just now';
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    return `${days}d ago`;
  };

  return (
    <div style={styles.postCard}>
      <div style={styles.postHeader}>
        <span style={styles.authorName}>{post.authorName}</span>
        <span style={styles.postTime}>{getTimeSince(post.timestamp)}</span>
      </div>
      
      <div style={styles.postContent}>{post.content}</div>
      
      <div style={styles.postActions}>
        <button
          onClick={() => onLike(post.id)}
          style={{
            ...styles.actionButton,
            color: hasLiked ? '#E91E63' : '#666'
          }}
        >
          {hasLiked ? '❤️' : '🤍'} {post.likes.length}
        </button>
        
        <button
          onClick={() => setShowComments(!showComments)}
          style={styles.actionButton}
        >
          💬 {post.comments.length}
        </button>
      </div>

      {showComments && (
        <div style={styles.commentsSection}>
          {post.comments.map(comment => (
            <div key={comment.id} style={styles.comment}>
              <strong>{comment.authorName}:</strong> {comment.content}
            </div>
          ))}
          
          <div style={styles.commentInput}>
            <input
              type="text"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleCommentSubmit()}
              placeholder="Write a comment..."
              style={styles.input}
            />
            <button onClick={handleCommentSubmit} style={styles.commentButton}>
              Post
            </button>
          </div>
        </div>
      )}
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
    position: 'sticky',
    top: 0,
    zIndex: 100,
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
  },
  headerContent: {
    maxWidth: '800px',
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
  opinionBadge: {
    fontSize: '12px',
    fontWeight: '600'
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
  controlsContainer: {
    backgroundColor: '#fff',
    borderBottom: '1px solid #ddd',
    padding: '15px 20px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
  },
  controlsContent: {
    maxWidth: '800px',
    margin: '0 auto'
  },
  strategySection: {
    marginBottom: '15px',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    flexWrap: 'wrap'
  },
  strategyLabel: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#333'
  },
  strategySelect: {
    flex: 1,
    minWidth: '250px',
    padding: '8px 12px',
    fontSize: '14px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    backgroundColor: '#f9f9f9',
    cursor: 'pointer'
  },
  filterSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    flexWrap: 'wrap',
    marginBottom: '10px'
  },
  filterLabel: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#333'
  },
  filterButtons: {
    display: 'flex',
    gap: '8px',
    flexWrap: 'wrap'
  },
  filterButton: {
    padding: '6px 16px',
    fontSize: '13px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    backgroundColor: 'white',
    cursor: 'pointer',
    fontWeight: '500',
    transition: 'all 0.2s'
  },
  filterButtonActive: {
    backgroundColor: '#667eea',
    color: 'white',
    borderColor: '#667eea'
  },
  filterButtonActiveLeft: {
    backgroundColor: '#1976D2',
    color: 'white',
    borderColor: '#1976D2'
  },
  filterButtonActiveNeutral: {
    backgroundColor: '#666',
    color: 'white',
    borderColor: '#666'
  },
  filterButtonActiveRight: {
    backgroundColor: '#D32F2F',
    color: 'white',
    borderColor: '#D32F2F'
  },
  modeIndicator: {
    padding: '10px',
    borderRadius: '4px',
    backgroundColor: '#f0f8ff',
    fontSize: '13px',
    fontWeight: '500'
  },
  modeAlgorithm: {
    color: '#0066cc'
  },
  modeManual: {
    color: '#ff6600'
  },
  feed: {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '20px'
  },
  feedContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px'
  },
  emptyFeed: {
    textAlign: 'center',
    padding: '60px 20px',
    color: '#999',
    fontSize: '16px'
  },
  postCard: {
    backgroundColor: 'white',
    borderRadius: '8px',
    padding: '20px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
  },
  postHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '12px'
  },
  authorName: {
    fontWeight: '600',
    fontSize: '15px',
    color: '#333'
  },
  postTime: {
    fontSize: '13px',
    color: '#888'
  },
  postContent: {
    fontSize: '15px',
    lineHeight: '1.6',
    color: '#333',
    marginBottom: '15px'
  },
  postActions: {
    display: 'flex',
    gap: '20px',
    borderTop: '1px solid #eee',
    paddingTop: '12px'
  },
  actionButton: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '500',
    color: '#666',
    display: 'flex',
    alignItems: 'center',
    gap: '5px'
  },
  commentsSection: {
    marginTop: '15px',
    paddingTop: '15px',
    borderTop: '1px solid #eee'
  },
  comment: {
    fontSize: '14px',
    padding: '8px 12px',
    backgroundColor: '#f5f5f5',
    borderRadius: '12px',
    marginBottom: '8px'
  },
  commentInput: {
    display: 'flex',
    gap: '10px',
    marginTop: '12px'
  },
  input: {
    flex: 1,
    padding: '10px',
    border: '1px solid #ddd',
    borderRadius: '20px',
    fontSize: '14px',
    outline: 'none'
  },
  commentButton: {
    padding: '8px 20px',
    backgroundColor: '#667eea',
    color: 'white',
    border: 'none',
    borderRadius: '20px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '500'
  }
};
