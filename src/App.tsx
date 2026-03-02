import { useEffect } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { AuthPage } from './components/AuthPage';
import { SocialFeed } from './components/SocialFeed';
import { AdminDashboard } from './components/AdminDashboard';
import { initializePosts } from './data/seedPosts';
import './App.css';

/**
 * Main application component for the Social Media Platform
 * 
 * Two modes:
 * 1. Regular User Mode: Social media feed where users interact with posts
 * 2. Admin Mode: Real-time visualization dashboard showing user behavior
 * 
 * User opinions are tracked based on their interactions with political content
 */
function AppContent() {
  const { currentUser, isAdmin } = useAuth();

  // Initialize seed posts on first load
  useEffect(() => {
    initializePosts();
  }, []);

  // Show auth page if not logged in
  if (!currentUser) {
    return <AuthPage />;
  }

  // Show admin dashboard for admin users
  if (isAdmin) {
    return <AdminDashboard />;
  }

  // Show social feed for regular users
  return <SocialFeed />;
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
