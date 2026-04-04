'use client';

import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import type { Trick, TricksResponse } from '@/lib/types/trick';

interface TricksContextType {
  tricks: Trick[];
  isLoading: boolean;
  error: string | null;
  refreshTricks: () => Promise<void>;
}

const TricksContext = createContext<TricksContextType | undefined>(undefined);

export interface TricksProviderProps {
  children: ReactNode;
  apiUrl?: string;
}

/**
 * Provider component for managing tricks state
 */
export function TricksProvider({ children, apiUrl = '/api/fetch-csv' }: TricksProviderProps) {
  const [tricks, setTricks] = useState<Trick[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTricks = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(apiUrl);
      const data: TricksResponse = await response.json();

      if (data.success && data.data) {
        setTricks(data.data);
      } else {
        throw new Error(data.error || 'Failed to fetch tricks');
      }
    } catch (err) {
      console.error('Error fetching tricks:', err);
      setError(
        err instanceof Error
          ? err.message
          : 'Failed to load tricks'
      );
      setTricks([]);
    } finally {
      setIsLoading(false);
    }
  }, [apiUrl]);

  useEffect(() => {
    fetchTricks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiUrl]);

  return (
    <TricksContext.Provider
      value={{
        tricks,
        isLoading,
        error,
        refreshTricks: fetchTricks,
      }}
    >
      {children}
    </TricksContext.Provider>
  );
}

/**
 * Hook to use tricks context
 */
export function useTricks(): TricksContextType {
  const context = useContext(TricksContext);
  if (!context) {
    throw new Error('useTricks must be used within a TricksProvider');
  }
  return context;
}
