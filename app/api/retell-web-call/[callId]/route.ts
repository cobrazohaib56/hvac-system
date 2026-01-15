import { NextResponse } from 'next/server';
import Retell from 'retell-sdk';

// Initialize Retell client with API key from environment
const client = new Retell({
  apiKey: process.env.RETELL_API_KEY || ''
});

export async function GET(
  request: Request,
  { params }: { params: { callId: string } }
) {
  try {
    // Validate environment variables
    if (!process.env.RETELL_API_KEY) {
      return NextResponse.json(
        { error: 'RETELL_API_KEY is not configured' },
        { status: 500 }
      );
    }

    const { callId } = params;

    if (!callId) {
      return NextResponse.json(
        { error: 'Call ID is required' },
        { status: 400 }
      );
    }

    // Get call details including transcript
    const callResponse = await client.call.retrieve(callId);

    // Return the call data (includes transcript, transcript_object, etc.)
    return NextResponse.json(callResponse);
  } catch (error: any) {
    console.error('Error fetching Retell call:', error);
    return NextResponse.json(
      {
        error: 'Failed to fetch call data',
        message: error?.message || 'Unknown error'
      },
      { status: 500 }
    );
  }
}
