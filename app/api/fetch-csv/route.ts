import { NextResponse } from 'next/server';
import TrickService from '@/lib/services/trick-service';
import type { TricksResponse } from '@/lib/types/trick';

/**
 * GET /api/fetch-csv
 * Fetch and parse tricks from configured CSV file
 * 
 * Returns: TricksResponse with tricks data or error
 */
export async function GET(): Promise<NextResponse<TricksResponse>> {
  const result = await TrickService.getTricks();

  if (result.success) {
    return NextResponse.json(
      {
        success: true,
        data: result.data,
      } as TricksResponse,
      { status: 200 }
    );
  }

  return NextResponse.json(
    {
      success: false,
      error: result.error,
    } as TricksResponse,
    { status: 500 }
  );
}
