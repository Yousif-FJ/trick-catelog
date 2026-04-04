# Tricks Catalog App

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

**Column Details:**

- `id` - Unique identifier for the trick
- `name` - Name of the trick
- `difficulty` - Level: `easy`, `medium`, or `hard`
- `instructions` - Step-by-step instructions
- `photo_0` - Google Drive photo URL

## Scripts

```bash
pnpm dev        # Start development server
pnpm build      # Build for production
pnpm start      # Start production server
pnpm lint       # Run ESLint
```

## Offline Support

The app automatically caches data on first load:

1. **First Load**: Fetches tricks from your CSV URL
2. **Storage**: Saves data to browser's localStorage (24-hour TTL)
3. **Offline**: Uses cached data when network unavailable
4. **Indicator**: UI shows status (online/offline/cached)
5. **Refresh**: Manual refresh button to update data

## 📦 Deployment

### Vercel

```bash
vercel deploy
```

Then set environment variables in Vercel

### Other Platforms

1. Run `pnpm build`
2. Set environment variables
3. Start with `pnpm start`

**Ready to get started?** Check out the [Quick Start Guide](./QUICKSTART.md)!

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.
