/**
 * Environment configuration for the tricks catalog app
 */

// Validate required environment variables
function validateEnv() {
  const required = {
    GOOGLE_SHEETS_API_KEY: process.env.GOOGLE_SHEETS_API_KEY,
    JWT_SECRET: process.env.JWT_SECRET,
    GOOGLE_SHEETS_ID: process.env.GOOGLE_SHEETS_ID,
  };

  const missing = Object.entries(required)
    .filter(([, value]) => !value)
    .map(([key]) => key);

  if (missing.length > 0) {
    throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
  }
}

// Validate on module load (server-side only)
if (typeof window === 'undefined') {
  validateEnv();
}

export const config = {
  /**
   * Google Sheets configuration
   */
  sheets: {
    spreadsheetId: process.env.GOOGLE_SHEETS_ID!,
    apiKey: process.env.GOOGLE_SHEETS_API_KEY!,
    range: 'Sheet1',
  },

  /**
   * Google Drive configuration (for proxying images)
   */
  drive: {
    apiKey: process.env.GOOGLE_SHEETS_API_KEY!,
  },

  /**
   * JWT configuration (for signing image URLs)
   */
  jwt: {
    secret: process.env.JWT_SECRET!,
  },

  /**
   * Cache configuration for offline support
   */
  cache: {
    storageKey: 'tricks-catalog-cache',
  },
};

export default config;
