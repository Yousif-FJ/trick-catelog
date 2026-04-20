'use client';

import React from 'react';
import type { Trick } from '@/lib/types/trick';

interface TrickDetailsViewProps {
    trick: Trick | null;
    onClose: () => void;
}

function toYoutubeEmbedUrl(url?: string | null): string | null {
    if (!url) return null;

    if (url.includes('youtube.com/embed/')) {
        return url;
    }

    const shortMatch = url.match(/youtu\.be\/([^?&]+)/);
    if (shortMatch) {
        return `https://www.youtube.com/embed/${shortMatch[1]}`;
    }

    const watchMatch = url.match(/[?&]v=([^?&]+)/);
    if (watchMatch) {
        return `https://www.youtube.com/embed/${watchMatch[1]}`;
    }

    return null;
}

export function TrickDetailsView({ trick, onClose }: TrickDetailsViewProps) {
    if (!trick) {
        return null;
    }

    const photos = [trick.photo_0, trick.photo_1, trick.photo_2].filter(
        (photo): photo is string => Boolean(photo)
    );
    const youtubeEmbedUrl = toYoutubeEmbedUrl(trick.youtube_link);

    return (
        <div className="fixed inset-0 z-50 bg-black/60 p-4 overflow-y-auto">
            <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-xl overflow-hidden">
                <div className="flex items-center justify-between p-4 border-b border-gray-200">
                    <h2 className="text-2xl font-bold text-gray-900">{trick.name}</h2>
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-3 py-1 rounded bg-gray-100 text-gray-700 hover:bg-gray-200"
                    >
                        Close
                    </button>
                </div>

                <div className="p-4 space-y-6">
                    {photos.length > 0 && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {photos.map((photoUrl, index) => (
                                <div key={`${trick.id}-photo-${index}`} className="bg-gray-200 rounded-lg overflow-hidden">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                        src={photoUrl}
                                        alt={`${trick.name} photo ${index + 1}`}
                                        className="w-full h-auto object-contain"
                                    />
                                </div>
                            ))}
                        </div>
                    )}

                    {youtubeEmbedUrl && (
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">Video</h3>
                            <div className="aspect-video rounded-lg overflow-hidden bg-black">
                                <iframe
                                    src={youtubeEmbedUrl}
                                    title={`${trick.name} video`}
                                    className="w-full h-full"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                    referrerPolicy="strict-origin-when-cross-origin"
                                    allowFullScreen
                                />
                            </div>
                        </div>
                    )}

                    {trick.instructions && (
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">Instructions</h3>
                            <p className="text-gray-700 whitespace-pre-wrap">{trick.instructions}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
