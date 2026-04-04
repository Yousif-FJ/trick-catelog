'use client';

import React, { useState } from 'react';
import { TrickCard } from './TrickCard';
import { useTricks } from './TricksProvider';

type FilterDifficulty = 'all' | 'easy' | 'medium' | 'hard';

/**
 * Main catalog component displaying tricks with filtering and sorting
 */
export function TricksCatalog() {
  const { tricks, isLoading, error, refreshTricks } = useTricks();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDifficulty, setFilterDifficulty] = useState<FilterDifficulty>('all');

  // Filter tricks
  const filteredTricks = tricks.filter((trick) => {
    const matchesSearch =
      trick.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      trick.instructions.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDifficulty =
      filterDifficulty === 'all' || trick.difficulty === filterDifficulty;
    return matchesSearch && matchesDifficulty;
  });

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Tricks Catalog</h1>
          <p className="text-gray-600">
            Discover and learn amazing tricks
          </p>
        </div>

        {/* Status alerts */}
        {error && (
          <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg text-blue-800 flex justify-between items-center">
            <span>{error}</span>
            <button
              onClick={refreshTricks}
              className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
            >
              Retry
            </button>
          </div>
        )}

        {/* Controls */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Search */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Search tricks
              </label>
              <input
                type="text"
                placeholder="Search by name or instructions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Filter by difficulty */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Difficulty
              </label>
              <select
                value={filterDifficulty}
                onChange={(e) => setFilterDifficulty(e.target.value as FilterDifficulty)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All difficulties</option>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results info */}
        <div className="mb-4 text-sm text-gray-600">
          Showing {filteredTricks.length} of {tricks.length} tricks
        </div>

        {/* Loading state */}
        {isLoading && (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        )}

        {/* Empty state */}
        {!isLoading && filteredTricks.length === 0 && tricks.length === 0 && (
          <div className="text-center py-12 bg-white rounded-lg">
            <p className="text-gray-500">No tricks available</p>
            <button
              onClick={refreshTricks}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Try again
            </button>
          </div>
        )}

        {/* No results based on filters */}
        {!isLoading && tricks.length > 0 && filteredTricks.length === 0 && (
          <div className="text-center py-12 bg-white rounded-lg">
            <p className="text-gray-500">No tricks match your filters</p>
            <button
              onClick={() => {
                setSearchTerm('');
                setFilterDifficulty('all');
              }}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Clear filters
            </button>
          </div>
        )}

        {/* Tricks grid */}
        {!isLoading && filteredTricks.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTricks.map((trick) => (
              <TrickCard key={trick.id} trick={trick} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
