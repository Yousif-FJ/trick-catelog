'use client';

import React from 'react';
import type { Trick } from '@/lib/types/trick';

interface TrickCardProps {
  trick: Trick;
  onOpen: (trick: Trick) => void;
}

/**
 * Individual trick card component
 * Displays trick summary on the home screen
 */
export function TrickCard({ trick, onOpen }: TrickCardProps) {
  const difficultyColors = {
    easy: 'bg-green-100 text-green-800',
    medium: 'bg-yellow-100 text-yellow-800',
    hard: 'bg-red-100 text-red-800',
  };
  const keywords = trick.keywords || [];
  const peopleLabel =
    trick.number_of_people === 'more'
      ? 'A lot of people'
      : trick.number_of_people === '1'
        ? '1 person'
        : trick.number_of_people
          ? `${trick.number_of_people} people`
          : null;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      {/* Photo */}
      {trick.photo_0 && (
        <div className="relative bg-gray-200 h-48 overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={trick.photo_0}
            alt={trick.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              // Fallback if image fails to load
              e.currentTarget.src =
                'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect fill="%23ddd" width="400" height="300"/%3E%3Ctext x="50%25" y="50%25" font-size="24" fill="%23999" text-anchor="middle" dy=".3em"%3EImage not available%3C/text%3E%3C/svg%3E';
            }}
          />
        </div>
      )}

      {/* Content */}
      <div className="p-4">
        {/* Title */}
        <h3 className="text-lg font-bold text-gray-900 mb-2">{trick.name}</h3>

        {/* Badges */}
        {(trick.difficulty || trick.number_of_people) && (
          <div className="mb-3 flex flex-wrap gap-2">
            {trick.difficulty && (
              <span
                className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${difficultyColors[trick.difficulty]}`}
              >
                {trick.difficulty.charAt(0).toUpperCase() + trick.difficulty.slice(1)}
              </span>
            )}
            {peopleLabel && (
              <span className="inline-block px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                {peopleLabel}
              </span>
            )}
          </div>
        )}

        {/* Keywords */}
        {keywords.length > 0 && (
          <div className="mb-4 flex flex-wrap gap-2">
            {keywords.map((keyword) => (
              <span
                key={`${trick.id}-${keyword}`}
                className="inline-block px-2 py-1 rounded bg-gray-100 text-gray-700 text-xs"
              >
                {keyword}
              </span>
            ))}
          </div>
        )}

        <button
          type="button"
          onClick={() => onOpen(trick)}
          className="w-full px-4 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700"
        >
          Open trick
        </button>
      </div>
    </div>
  );
}
