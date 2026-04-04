'use client';

import type { Trick } from '../types/trick';
import { config } from '../config';

/**
 * Client-side caching service for offline support
 * Uses localStorage to cache tricks data
 */

export class CacheService {
  private static readonly storageKey = config.cache.storageKey;

  /**
   * Save tricks to localStorage cache
   */
  static saveTricksToCache(tricks: Trick[]): void {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(tricks));
    } catch {
      console.warn('Failed to save tricks to cache');
      // Silently fail - caching is not critical
    }
  }

  /**
   * Get tricks from localStorage cache
   * Returns null if cache is expired or doesn't exist
   */
  static getTricksFromCache(): Trick[] | null {
    try {
      const cached = localStorage.getItem(this.storageKey);
      if (!cached) {
        return null;
      }

      const cacheData: Trick[] = JSON.parse(cached);

      return cacheData || [];
    } catch {
      console.warn('Failed to retrieve tricks from cache');
      this.clearCache();
      return null;
    }
  }

  /**
   * Clear cache
   */
  static clearCache(): void {
    try {
      localStorage.removeItem(this.storageKey);
    } catch {
      console.warn('Failed to clear cache');
    }
  }
}

export default CacheService;
