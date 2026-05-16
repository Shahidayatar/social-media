import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Account, Session } from '../types/social';

interface AuthContextType {
  currentUser: Session | null;
  login: (username: string, password: string) => boolean;
  register: (username: string, password: string, displayName: string) => boolean;
  logout: () => void;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const STORAGE_KEY_ACCOUNTS = 'social_media_accounts';
const STORAGE_KEY_SESSION = 'social_media_session';

/**
 * Simple hash function for passwords (NOT for production use!)
 */
function simpleHash(str: string): string {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return hash.toString(36);
}

/**
 * Get all accounts from localStorage
 */
function getAccounts(): Account[] {
  const stored = localStorage.getItem(STORAGE_KEY_ACCOUNTS);
  return stored ? JSON.parse(stored) : [];
}

/**
 * Save accounts to localStorage
 */
function saveAccounts(accounts: Account[]): void {
  localStorage.setItem(STORAGE_KEY_ACCOUNTS, JSON.stringify(accounts));
}

/**
 * Authentication provider component
 */
export function AuthProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<Session | null>(null);

  // Load session on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY_SESSION);
    if (stored) {
      setCurrentUser(JSON.parse(stored));
    }
  }, []);

  /**
   * Register a new user
   */
  const register = (username: string, password: string, displayName: string): boolean => {
    const accounts = getAccounts();
    
    // Check if username exists
    if (accounts.some(acc => acc.username === username)) {
      return false;
    }

    const newAccount: Account = {
      id: `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      username,
      passwordHash: simpleHash(password),
      displayName,
      registeredAt: Date.now(),
      opinion: 0, // Start neutral
      fuzzyOpinion: { left: 0, neutral: 1, right: 0 }, // Start fully neutral
      strategiesOpinionDistribution: {
        similarity: { left: 0, neutral: 1, right: 0 },
        random: { left: 0, neutral: 1, right: 0 },
        diversity: { left: 0, neutral: 1, right: 0 }
      },
      strategy: 'similarity', // Default strategy
      role: username === 'admin' ? 'admin' : 'user' // First registered user with username 'admin' becomes admin, others are regular users
    };

    console.log('✅ New account created:', newAccount);

    accounts.push(newAccount);
    saveAccounts(accounts);
    return true;
  };

  /**
   * Login a user
   */
  const login = (username: string, password: string): boolean => {
    const accounts = getAccounts();
    const account = accounts.find(
      acc => acc.username === username && acc.passwordHash === simpleHash(password)
    );

    if (!account) {
      return false;
    }

    const session: Session = {
      userId: account.id,
      username: account.username,
      displayName: account.displayName,
      loginTime: Date.now()
    };

    setCurrentUser(session);
    localStorage.setItem(STORAGE_KEY_SESSION, JSON.stringify(session));
    return true;
  };

  /**
   * Logout current user
   */
  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem(STORAGE_KEY_SESSION);
  };

  /**
   * Check if current user is admin
   */
  const isAdmin = currentUser?.username === 'admin';

  return (
    <AuthContext.Provider value={{ currentUser, login, register, logout, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
}

/**
 * Hook to use auth context
 */
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
