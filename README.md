# Tricks Catalog App

App for TaTSi circus club in Tampere university, hosting a catalog of tricks. To make it easy to find inspiration.

### Installation

```bash
# Install dependencies
pnpm install

# Configure environment
cp .env.example .env

# Run development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## How to Use

1. **Create a Google Sheet** - Set up your tricks data with columns: id, name, difficulty, instructions, photo_0
2. **Get API credentials** - Enable Google Sheets API and create an API key
3. **Configure environment** - Set env variable. See example file.
4. **Start the app** - Run `pnpm dev`
5. **Browse** - Search, filter, and learn tricks!

## Google sheet

Use Sheet1 with this exact header row:

id, name, difficulty, number_of_people, keywords, instructions, photo_0, photo_1, photo_2, youtube_link

Column details:

- id: required, unique trick ID
- name: required, trick name
- difficulty: optional, one of easy, medium, hard
- number_of_people: optional, one of 1, 2, 3, 4, more
- keywords: optional, comma-separated text values
- instructions: optional, shown in the open trick view
- photo_0: optional, image URL (Google Drive URL or file ID supported)
- photo_1: optional, image URL
- photo_2: optional, image URL
- youtube_link: optional, YouTube URL

Only id and name are required. All other fields can be empty.

## Scripts

```bash
pnpm dev        # Start development server
pnpm build      # Build for production
pnpm start      # Start production server
pnpm lint       # Run ESLint
```

## 📦 Deployment

### Vercel

```bash
vercel deploy
```

Then set environment variables in Vercel.

Or use the UI to link the repository to Vercel.
