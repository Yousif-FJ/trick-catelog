'use client';

import React, { useMemo, useState } from 'react';
import { TrickCard } from './TrickCard';
import { useTricks } from './TricksProvider';
import { TrickFilters, type DifficultyFilter, type KeywordFilter, type PeopleFilter } from './TrickFilters';
import { TrickDetailsView } from './TrickDetailsView';
import type { Trick } from '@/lib/types/trick';

/**
 * Main catalog component displaying tricks with filtering and sorting
 */
export function TricksCatalog() {
  const { tricks, isLoading, error, refreshTricks } = useTricks();
  const [filterDifficulty, setFilterDifficulty] = useState<DifficultyFilter>('all');
  const [filterPeople, setFilterPeople] = useState<PeopleFilter>('all');
  const [filterKeyword, setFilterKeyword] = useState<KeywordFilter>('all');
  const [openTrick, setOpenTrick] = useState<Trick | null>(null);

  const keywordOptions = useMemo(() => {
    return Array.from(new Set(tricks.flatMap((trick) => trick.keywords || []))).sort((a, b) => a.localeCompare(b));
  }, [tricks]);

  // Filter tricks
  const filteredTricks = tricks.filter((trick) => {
    const matchesDifficulty =
      filterDifficulty === 'all' || trick.difficulty === filterDifficulty;
    const matchesPeople =
      filterPeople === 'all' || trick.number_of_people === filterPeople;
    const matchesKeyword =
      filterKeyword === 'all' || (trick.keywords || []).includes(filterKeyword);

    return matchesDifficulty && matchesPeople && matchesKeyword;
  });

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Tricks Catalog</h1>
          <p className="text-gray-600">
            TaTSi trick bank
          </p>
        </div>

        <TrickDetailsView trick={openTrick} onClose={() => setOpenTrick(null)} />

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

        <TrickFilters
          difficulty={filterDifficulty}
          people={filterPeople}
          keyword={filterKeyword}
          keywordOptions={keywordOptions}
          onDifficultyChange={setFilterDifficulty}
          onPeopleChange={setFilterPeople}
          onKeywordChange={setFilterKeyword}
          onClear={() => {
            setFilterDifficulty('all');
            setFilterPeople('all');
            setFilterKeyword('all');
          }}
        />

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
                setFilterDifficulty('all');
                setFilterPeople('all');
                setFilterKeyword('all');
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
              <TrickCard key={trick.id} trick={trick} onOpen={setOpenTrick} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
