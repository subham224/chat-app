'use server';

import { StreamChat } from 'stream-chat';
import { auth } from '@clerk/nextjs/server';
import { revalidatePath } from 'next/cache';

// 1. Create Channel Action (Unchanged)
export async function createChannelAction(formData) {
  const { userId } = await auth();
  
  if (!userId) {
    return { error: "You must be logged in to create a channel." };
  }

  const channelName = formData.get('channelName');
  
  if (!channelName || channelName.trim().length === 0) {
    return { error: "Channel name is required." };
  }

  const slug = channelName.replace(/\s+/g, '-').toLowerCase();

  try {
    const streamClient = StreamChat.getInstance(
      process.env.NEXT_PUBLIC_STREAM_API_KEY,
      process.env.STREAM_SECRET_KEY
    );

    const channel = streamClient.channel('livestream', slug, {
      name: channelName,
      created_by_id: userId,
    });

    await channel.create();
    await channel.addMembers([userId]);

    revalidatePath('/');
    return { success: true, slug };

  } catch (e) {
    console.error(e);
    return { error: "Failed to create channel. Try a different name." };
  }
}

// 2. Delete Channel Action (THE FIX)
export async function deleteChannel(channelId) {
  const { userId } = await auth();
  
  if (!userId) {
    return { error: "Unauthorized" };
  }

  try {
    // Initialize Admin Client (Server-Side)
    const client = StreamChat.getInstance(
      process.env.NEXT_PUBLIC_STREAM_API_KEY,
      process.env.STREAM_SECRET_KEY
    );

    // FIX: Stream needs the full CID (e.g., 'livestream:room-id')
    // We check if the ID already has 'livestream:' prefix; if not, we add it.
    const cid = channelId.startsWith('livestream:') ? channelId : `livestream:${channelId}`;

    // Admin Delete
    await client.deleteChannels([cid], { hard_delete: true });

    revalidatePath('/');
    return { success: true };
    
  } catch (error) {
    console.error("Delete Error:", error);
    // Return the actual error message for debugging
    return { error: error.message || "Failed to delete channel." };
  }
}