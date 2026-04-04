import type { Trick } from '../types/trick';
import { config } from '../config';
import { ImageService } from './image-service';

type TrickResult =
  | { success: true; data: Trick[] }
  | { success: false; error: string };

interface GoogleSheetsResponse {
  values?: string[][];
}

/**
 * Service for fetching and parsing tricks from Google Sheets
 */

export class TrickService {
  /**
   * Fetch and parse tricks from configured Google Sheet
   * Returns either the tricks data or an error message
   */
  static async getTricks(): Promise<TrickResult> {
    try {
      const { spreadsheetId, apiKey, range } = config.sheets;

      if (!spreadsheetId || !apiKey) {
        return {
          success: false,
          error: 'Google Sheets configuration not set',
        };
      }

      // Fetch data from Google Sheets API
      const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}?key=${apiKey}`;
      const response = await fetch(url);

      if (!response.ok) {
        return {
          success: false,
          error: `Failed to fetch from Google Sheets: ${response.statusText}`,
        };
      }

      const data: GoogleSheetsResponse = await response.json();

      if (!data.values || data.values.length < 2) {
        return {
          success: true,
          data: [],
        };
      }

      // Parse header row
      const headers = data.values[0].map((h: string) => h.trim().toLowerCase());

      // Parse data rows
      const tricks: Trick[] = data.values.slice(1).map((row: string[]) => {
        const obj: Record<string, string> = {};
        headers.forEach((header: string, index: number) => {
          obj[header] = row[index] || '';
        });

        // Sign Google Drive photo URL if it's a direct Google Drive link
        let photo_0 = obj.photo_0;
        if (photo_0 && ImageService.isGoogleDriveUrl(photo_0)) {
          const signedUrl = ImageService.generateSignedUrl(photo_0);
          if (signedUrl) {
            photo_0 = signedUrl;
          }
        }

        return {
          id: obj.id,
          name: obj.name,
          difficulty: (obj.difficulty || 'medium') as 'easy' | 'medium' | 'hard',
          instructions: obj.instructions,
          photo_0,
          createdAt: obj.createdat,
          updatedAt: obj.updatedat,
        };
      }).filter((trick: Trick) => {
        return trick.id && trick.name && trick.difficulty && trick.instructions && trick.photo_0;
      });

      return {
        success: true,
        data: tricks,
      };
    } catch (error) {
      console.error('Error fetching/parsing tricks:', error);
      return {
        success: false,
        error: 'Failed to get data',
      };
    }
  }
}

export default TrickService;
