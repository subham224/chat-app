// app/chat/[slug]/page.jsx
'use client';

import { use, useEffect, useState } from 'react'; // 1. Import 'use'
import { useUser } from '@clerk/nextjs';
import { StreamChat } from 'stream-chat';
import {
  Chat,
  Channel,
  ChannelHeader,
  MessageInput,
  MessageList,
  Thread,
  Window,
} from 'stream-chat-react';
import 'stream-chat-react/dist/css/v2/index.css';

const chatClient = StreamChat.getInstance(process.env.NEXT_PUBLIC_STREAM_API_KEY);

export default function ChatPage({ params }) {
  const { slug } = use(params); // 2. Unwrap params using React.use()
  
  const { user, isLoaded } = useUser();
  const [clientReady, setClientReady] = useState(false);
  const [channel, setChannel] = useState(null);

  useEffect(() => {
    if (!isLoaded || !user) return;

    const setupChat = async () => {
      try {
        const response = await fetch('/api/token');
        const data = await response.json();
        
        if (data.error) {
           console.error("Token Error:", data.error);
           return;
        }

        await chatClient.connectUser(
          {
            id: user.id,
            name: user.fullName || user.username,
            image: user.imageUrl,
          },
          data.token
        );

        const newChannel = chatClient.channel('livestream', slug, {
          name: `${slug} Room`,
        });

        await newChannel.watch();
        setChannel(newChannel);
        setClientReady(true);
        
      } catch (error) {
        console.error("Error connecting to chat:", error);
      }
    };

    setupChat();

    return () => {
      if (clientReady) {
        chatClient.disconnectUser();
        setClientReady(false);
      }
    };
  }, [user, isLoaded, slug]);

  if (!clientReady || !channel) return <div className="p-10">Loading Chat...</div>;

  return (
    <div className="h-[90vh] w-full">
      <Chat client={chatClient} theme="messaging light">
        <Channel channel={channel}>
          <Window>
            <ChannelHeader />
            <MessageList />
            <MessageInput />
          </Window>
          <Thread />
        </Channel>
      </Chat>
    </div>
  );
}