// app/api/token/route.js
import { StreamChat } from 'stream-chat';
import { auth, currentUser } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic'; // Prevents caching issues

export async function GET() {
  try {
    // 1. Get the user from Clerk (MUST AWAIT IN NEXT.JS 16)
    const { userId } = await auth(); 
    const user = await currentUser();

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // 2. Initialize Stream Client
    const streamClient = StreamChat.getInstance(
      process.env.NEXT_PUBLIC_STREAM_API_KEY,
      process.env.STREAM_SECRET_KEY
    );

    // 3. Register User
    await streamClient.upsertUser({
      id: userId,
      name: user.firstName || user.username || 'User',
      image: user.imageUrl,
    });

    // 4. Generate Token
    const token = streamClient.createToken(userId);

    return NextResponse.json({ token });
    
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}