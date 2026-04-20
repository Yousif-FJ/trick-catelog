import type { Trick, TrickDifficulty, TrickPeople } from '../types/trick';
import { config } from '../config';
import { ImageService } from './image-service';

type TrickResult =
  | { success: true; data: Trick[] }
  | { success: false; error: string };

interface GoogleSheetsResponse {
  values?: string[][];
}

function optionalValue(value?: string): string | undefined {
  if (!value) {
    return undefined;
  }

  const trimmed = value.trim();
  if (!trimmed || trimmed.toLowerCase() === 'null') {
    return undefined;
  }

  return trimmed;
}

function normalizeDifficulty(value?: string): TrickDifficulty | undefined {
  if (!value) {
    return undefined;
  }

  const normalized = value.toLowerCase();
  if (normalized === 'easy' || normalized === 'medium' || normalized === 'hard') {
    return normalized;
  }
  return undefined;
}

function normalizePeople(value?: string): TrickPeople | undefined {
  if (!value) {
    return undefined;
  }

  const normalized = value.toLowerCase();
  if (
    normalized === '1' ||
    normalized === '2' ||
    normalized === '3' ||
    normalized === '4' ||
    normalized === 'more'
  ) {
    return normalized;
  }
  return undefined;
}

function parseKeywords(value?: string): string[] | undefined {
  if (!value) {
    return undefined;
  }

  const keywords = value
    .split(',')
    .map((keyword: string) => keyword.trim())
    .filter(Boolean);

  return keywords.length > 0 ? keywords : undefined;
}

function signPhotoUrl(url?: string): string | undefined {
  if (!url || !ImageService.isGoogleDriveUrl(url)) {
    return url;
  }

  const signedUrl = ImageService.generateSignedUrl(url);
  return signedUrl || url;
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
      const tricks: Trick[] = data.values
        .slice(1)
        .map((row: string[]) => {
          const obj: Record<string, string> = {};
          headers.forEach((header: string, index: number) => {
            obj[header] = row[index] || '';
          });

          return {
            id: optionalValue(obj.id) || '',
            name: optionalValue(obj.name) || '',
            difficulty: normalizeDifficulty(optionalValue(obj.difficulty)),
            number_of_people: normalizePeople(optionalValue(obj.number_of_people)),
            keywords: parseKeywords(optionalValue(obj.keywords)),
            instructions: optionalValue(obj.instructions),
            photo_0: signPhotoUrl(optionalValue(obj.photo_0)),
            photo_1: signPhotoUrl(optionalValue(obj.photo_1)),
            photo_2: signPhotoUrl(optionalValue(obj.photo_2)),
            youtube_link: optionalValue(obj.youtube_link),
          };
        })
        .filter((trick: Trick) => {
          return trick.id && trick.name;
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
