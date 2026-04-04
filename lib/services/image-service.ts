import jwt from 'jsonwebtoken';
import { config } from '../config';

interface ImageToken {
    fileId: string;
}

/**
 * Service for generating and validating signed image URLs
 */
export class ImageService {
    /**
     * Extract Google Drive file ID from various URL formats
     * Supports:
     * - https://drive.google.com/file/d/{fileId}/view
     * - https://drive.google.com/uc?id={fileId}
     * - Direct file ID
     */
    static extractFileId(url: string): string | null {
        // Check if it's already just a file ID (no URL)
        if (!url.includes('/') && !url.includes('?')) {
            return url;
        }

        // Extract from /file/d/{id}/view format
        const match1 = url.match(/\/file\/d\/([a-zA-Z0-9-_]+)/);
        if (match1) return match1[1];

        // Extract from ?id={id} format
        const match2 = url.match(/[\?&]id=([a-zA-Z0-9-_]+)/);
        if (match2) return match2[1];

        return null;
    }

    /**
     * Generate a signed URL for proxying Google Drive images
     */
    static generateSignedUrl(photoUrl: string): string | null {
        const fileId = this.extractFileId(photoUrl);
        if (!fileId) {
            console.warn('Could not extract file ID from URL:', photoUrl);
            return null;
        }

        try {
            const token = jwt.sign(
                { fileId } as ImageToken,
                config.jwt.secret,
                { noTimestamp: true }
            );

            return `/api/proxy/image?token=${token}`;
        } catch (error) {
            console.error('Error generating signed URL:', error);
            return null;
        }
    }

    /**
     * Verify a signed token and extract the file ID
     */
    static verifyToken(token: string): ImageToken | null {
        try {
            const payload = jwt.verify(token, config.jwt.secret) as ImageToken;
            return payload;
        } catch (error) {
            console.error('Token verification failed:', error);
            return null;
        }
    }

    /**
     * Check if URL is a Google Drive URL
     */
    static isGoogleDriveUrl(url: string): boolean {
        return url.includes('drive.google.com') || url.includes('googleapis.com');
    }
}

export default ImageService;
