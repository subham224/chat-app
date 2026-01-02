'use client';

import { use, useEffect, useState } from 'react';
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
import { useSearchParams, useRouter } from 'next/navigation'; // Import useRouter
import 'stream-chat-react/dist/css/v2/index.css';
import HeroBackground from '@/components/HeroBackground';
import { motion } from 'framer-motion';
import Link from 'next/link'; // Import Link

const chatClient = StreamChat.getInstance(process.env.NEXT_PUBLIC_STREAM_API_KEY);

export default function ChatPage({ params }) {
  const { slug } = use(params);
  const searchParams = useSearchParams();
  const router = useRouter();
  const channelType = searchParams.get('type') || 'livestream';

  const { user, isLoaded } = useUser();
  const [clientReady, setClientReady] = useState(false);
  const [channel, setChannel] = useState(null);

  useEffect(() => {
    if (!isLoaded || !user) return;

    const setupChat = async () => {
      try {
        const response = await fetch('/api/token');
        const data = await response.json();
        
        if (data.error) return;

        await chatClient.connectUser(
          {
            id: user.id,
            name: user.fullName || user.username,
            image: user.imageUrl,
          },
          data.token
        );

        const newChannel = chatClient.channel(channelType, slug, {
           name: channelType === 'livestream' ? `${slug} Room` : undefined,
        });

        await newChannel.watch();
        setChannel(newChannel);
        setClientReady(true);
        
      } catch (error) {
        console.error("Error connecting to chat:", error);
      }
    };

    setupChat();
  }, [user, isLoaded, slug, channelType]);

  if (!clientReady || !channel) return (
    <div className="flex items-center justify-center h-screen bg-gray-900 text-blue-400">
      <div className="animate-pulse text-2xl font-bold tracking-widest">INITIALIZING UPLINK...</div>
    </div>
  );

  
    // FIX 1: 'h-[100dvh]' forces it to fit the mobile screen exactly
   return (
    // FIX 1: Subtract Navbar height (64px) so it fits perfectly without scrolling
    // We use 'h-[calc(100dvh-64px)]' instead of 'h-[100dvh]'
    <div className="relative h-[calc(100dvh-64px)] w-full overflow-hidden flex items-center justify-center bg-transparent">
      
      <HeroBackground />

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "circOut" }}
        // INNER: Must use 'flex flex-col' and 'overflow-hidden'
        className="relative z-10 w-full h-full md:w-[95%] md:h-[90%] md:rounded-3xl shadow-2xl ring-1 ring-white/10 backdrop-blur-xl bg-white/30 dark:bg-black/40 flex flex-col overflow-hidden" >
        
        {/* Back Button */}
        <div className="absolute top-4 left-4 z-50">
          <Link 
            href="/"
            className="group flex items-center justify-center w-10 h-10 bg-white/20 dark:bg-black/40 backdrop-blur-md rounded-full border border-white/10 shadow-lg hover:bg-blue-600 hover:border-blue-500 transition-all duration-300"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5 text-white group-hover:scale-110 transition-transform">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
          </Link>
        </div>


      <div className="w-full h-full flex flex-col">
        <Chat client={chatClient} theme={typeof window !== 'undefined' && document.documentElement.classList.contains('dark') ? 'messaging dark' : 'messaging light'}>
          <Channel channel={channel}>
            <Window>
              {/* Header */}
              <div className="bg-white/10 dark:bg-black/20 p-2 pl-16 border-b border-white/10 backdrop-blur-md shrink-0">
                 <ChannelHeader />
              </div>
              
              {/* Message List (Takes all remaining space) */}
              <MessageList />
              
              {/* Input (Fixed at bottom) */}
              <div className="bg-white/20 dark:bg-black/30 p-2 md:p-4 border-t border-white/10 shrink-0">
                 <MessageInput />
              </div>
            </Window>
            <Thread />
          </Channel>
        </Chat>
        </div>

      </motion.div>
    </div>
  );
 
}