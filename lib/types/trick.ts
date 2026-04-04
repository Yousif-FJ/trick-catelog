/**
 * Represents a single trick in the catalog
 */
export interface Trick {
  id: string;
  name: string;
  difficulty: 'easy' | 'medium' | 'hard';
  instructions: string;
  photo_0: string; // Google Drive photo URL
  createdAt?: string;
  updatedAt?: string;
}

/**
 * Response type for trick API endpoints
 */
export interface TricksResponse {
  success: boolean;
  data?: Trick[];
  error?: string;
}
