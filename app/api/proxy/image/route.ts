import { NextRequest, NextResponse } from 'next/server';
import { ImageService } from '@/lib/services/image-service';
import { config } from '@/lib/config';

export async function GET(request: NextRequest) {
    const token = request.nextUrl.searchParams.get('token');

    if (!token) {
        return NextResponse.json({ error: 'Missing token' }, { status: 400 });
    }

    // Verify token and extract file ID
    const payload = ImageService.verifyToken(token);
    if (!payload) {
        return NextResponse.json({ error: 'Invalid or expired token' }, { status: 401 });
    }

    const { fileId } = payload;

    // Fetch image from Google Drive
    const driveUrl = `https://www.googleapis.com/drive/v3/files/${fileId}?alt=media&key=${config.drive.apiKey}`;
    const driveResponse = await fetch(driveUrl);

    if (!driveResponse.ok) {
        return NextResponse.json(
            { error: `Failed to fetch image: ${driveResponse.statusText}` },
            { status: driveResponse.status }
        );
    }

    const buffer = await driveResponse.arrayBuffer();
    const contentType = driveResponse.headers.get('content-type') || 'image/jpeg';

    // Return with aggressive cache headers
    return new NextResponse(buffer, {
        status: 200,
        headers: {
            'Content-Type': contentType,
            'Cache-Control': 'public, max-age=31536000, immutable', // Cache for 1 year
            'Content-Length': buffer.byteLength.toString(),
        },
    });

}
