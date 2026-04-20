'use client';

import React from 'react';
import type { TrickDifficulty, TrickPeople } from '@/lib/types/trick';

export type DifficultyFilter = 'all' | TrickDifficulty;
export type PeopleFilter = 'all' | TrickPeople;
export type KeywordFilter = 'all' | string;

interface TrickFiltersProps {
    difficulty: DifficultyFilter;
    people: PeopleFilter;
    keyword: KeywordFilter;
    keywordOptions: string[];
    onDifficultyChange: (value: DifficultyFilter) => void;
    onPeopleChange: (value: PeopleFilter) => void;
    onKeywordChange: (value: KeywordFilter) => void;
    onClear: () => void;
}

export function TrickFilters({
    difficulty,
    people,
    keyword,
    keywordOptions,
    onDifficultyChange,
    onPeopleChange,
    onKeywordChange,
    onClear,
}: TrickFiltersProps) {
    return (
        <div className="bg-white rounded-lg shadow p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Difficulty
                    </label>
                    <select
                        value={difficulty}
                        onChange={(e) => onDifficultyChange(e.target.value as DifficultyFilter)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="all">All difficulties</option>
                        <option value="easy">Easy</option>
                        <option value="medium">Medium</option>
                        <option value="hard">Hard</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Number of people
                    </label>
                    <select
                        value={people}
                        onChange={(e) => onPeopleChange(e.target.value as PeopleFilter)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="all">Any</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="more">More</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Keyword
                    </label>
                    <select
                        value={keyword}
                        onChange={(e) => onKeywordChange(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="all">All keywords</option>
                        {keywordOptions.map((option) => (
                            <option key={option} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="mt-4">
                <button
                    type="button"
                    onClick={onClear}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                    Clear filters
                </button>
            </div>
        </div>
    );
}
