import CreateChannel from "@/components/CreateChannel";
import HeroBackground from "@/components/HeroBackground";
import RoomCard from "@/components/RoomCard"; 
import { StreamChat } from 'stream-chat';
import { currentUser } from '@clerk/nextjs/server';

export const dynamic = 'force-dynamic';

export default async function Home() {
  const user = await currentUser();
  const client = StreamChat.getInstance(
    process.env.NEXT_PUBLIC_STREAM_API_KEY,
    process.env.STREAM_SECRET_KEY
  );

  const channels = await client.queryChannels(
    { type: 'livestream' }, 
    [{ last_message_at: -1 }, { created_at: -1 }], 
    { limit: 20 }
  );

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden font-sans">
      <HeroBackground />

      <main className="relative z-10 w-full max-w-6xl p-4 md:p-8">
        <div className="backdrop-blur-xl bg-white/10 border border-white/20 p-8 md:p-12 rounded-3xl shadow-2xl ring-1 ring-white/10">
          
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-br from-white to-gray-400 drop-shadow-2xl mb-6 tracking-tight">
              NextChat <span className="text-blue-400">3D</span>
            </h1>
            <p className="text-xl text-blue-100/80 mb-8 max-w-2xl mx-auto">
              Experience spatial conversation. Depth, motion, and clarity combined.
            </p>
            <div className="flex justify-center scale-110">
              <CreateChannel />
            </div>
          </div>

          <div className="border-t border-white/10 my-8"></div>

          <h2 className="text-2xl font-bold text-white mb-6 pl-2 border-l-4 border-blue-500">
            Active Rooms
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {channels.length > 0 ? (
              channels.map((channel) => (
                <RoomCard 
                  key={channel.id} 
                  // FIX: We create a simple object here instead of passing the whole 'channel' class
                  channel={{
                    id: channel.id,
                    data: {
                      name: channel.data.name,
                      created_by: channel.data.created_by
                    }
                  }} 
                  currentUserId={user?.id} 
                />
              ))
            ) : (
              <div className="col-span-full text-center py-20 bg-white/5 rounded-2xl border border-white/10">
                <p className="text-white/60 text-lg">No rooms active. Create one above!</p>
              </div>
            )}
          </div>

        </div>
      </main>
    </div>
  );
}