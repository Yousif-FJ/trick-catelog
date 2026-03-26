import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    // Google Drive file ID from the shared link
    const fileId = '12m2jfAE2JQ_VMkAIerZILnb4S684uLM8';
    
    // Convert the Google Drive link to a direct download URL
    const driveUrl = `https://drive.google.com/uc?export=download&id=${fileId}`;
    
    // Fetch the CSV file from Google Drive
    const response = await fetch(driveUrl);
    
    if (!response.ok) {
      return NextResponse.json(
        { error: 'Failed to fetch CSV file from Google Drive' },
        { status: response.status }
      );
    }
    
    // Get the raw content as string
    const csvContent = await response.text();
    
    return NextResponse.json({
      success: true,
      data: csvContent,
    });
  } catch (error) {
    console.error('Error fetching CSV:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
