/**
 * Represents a single trick in the catalog
 */
export type TrickDifficulty = 'easy' | 'medium' | 'hard';
export type TrickPeople = '1' | '2' | '3' | '4' | 'more';

export interface Trick {
  id: string;
  name: string;
  difficulty?: TrickDifficulty | null;
  number_of_people?: TrickPeople | null;
  keywords?: string[] | null;
  instructions?: string | null;
  photo_0?: string | null; // Google Drive photo URL
  photo_1?: string | null;
  photo_2?: string | null;
  youtube_link?: string | null;
}

/**
 * Response type for trick API endpoints
 */
export interface TricksResponse {
  success: boolean;
  data?: Trick[];
  error?: string;
}
