import { useState, useEffect } from 'react';
import { Account } from '../types/social';
import { User } from '../types';

const STORAGE_KEY_ACCOUNTS = 'social_media_accounts';

/**
 * Hook to get real users for visualization
 */
export function useRealUsers() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      loadUsers();
    }, 1000); // Refresh every second

    loadUsers();

    return () => clearInterval(interval);
  }, []);

  const loadUsers = () => {
    const stored = localStorage.getItem(STORAGE_KEY_ACCOUNTS);
    if (!stored) return;

    const accounts: Account[] = JSON.parse(stored);

    // Convert accounts to User format for visualization
    const visualUsers: User[] = accounts.map((account, index) => {
      // Calculate connections based on similar opinions
      const connections: number[] = [];
      accounts.forEach((otherAccount, otherIndex) => {
        if (index !== otherIndex) {
          const opinionDiff = Math.abs(account.opinion - otherAccount.opinion);
          // Connect if opinions are similar (within 0.4)
          if (opinionDiff < 0.4) {
            connections.push(otherIndex);
          }
        }
      });

      return {
        id: index,
        opinion: account.opinion,
        connections
      };
    });

    setUsers(visualUsers);
  };

  return { users };
}
