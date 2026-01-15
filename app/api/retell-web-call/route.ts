import { NextResponse } from 'next/server';
import Retell from 'retell-sdk';

// Initialize Retell client with API key from environment
const client = new Retell({
  apiKey: process.env.RETELL_API_KEY || ''
});

export async function POST() {
  try {
    // Validate environment variables
    if (!process.env.RETELL_API_KEY) {
      return NextResponse.json(
        { error: 'RETELL_API_KEY is not configured' },
        { status: 500 }
      );
    }

    if (!process.env.RETELL_AGENT_ID) {
      return NextResponse.json(
        { error: 'RETELL_AGENT_ID is not configured' },
        { status: 500 }
      );
    }

    // Create a web call using Retell SDK
    const webCallResponse = await client.call.createWebCall({
      agent_id: process.env.RETELL_AGENT_ID
    });

    // Return the web call data (includes access_token, call_id, etc.)
    return NextResponse.json(webCallResponse);
  } catch (error: any) {
    console.error('Error creating Retell web call:', error);
    return NextResponse.json(
      {
        error: 'Failed to create web call',
        message: error?.message || 'Unknown error'
      },
      { status: 500 }
    );
  }
}
