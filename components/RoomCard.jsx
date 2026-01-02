'use client';

import { useUser, useClerk } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import TiltCard from './TiltCard';
import DeleteButton from './DeleteButton';

export default function RoomCard({ channel, currentUserId }) {
  const { isSignedIn } = useUser();
  const { openSignIn } = useClerk();
  const router = useRouter();

  const handleEnterRoom = () => {
    if (!isSignedIn) {
      toast.info("Please sign in to join the conversation");
      openSignIn(); // Opens the popup
    } else {
      router.push(`/chat/${channel.id}`);
    }
  };

  return (
    <div onClick={handleEnterRoom} className="cursor-pointer">
      <TiltCard>
        <div className="flex flex-col h-full justify-between">
          <div>
            <div className="flex justify-between items-start">
              <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-900 leading-tight">
                {channel.data.name || "Untitled Room"}
              </h3>
              
              {/* Delete Button - Only renders if owner */}
              {/* We stopPropagation so clicking delete doesn't open the room */}
              {currentUserId && channel.data.created_by?.id === currentUserId && (
                <div onClick={(e) => e.stopPropagation()}>
                  <DeleteButton channelId={channel.id} />
                </div>
              )}
            </div>
            <p className="text-sm text-gray-800 mt-2 font-medium">
              Created by: {channel.data.created_by?.name || "Unknown"}
            </p>
          </div>
          
          <div className="mt-6 flex items-center justify-between">
            <span className="text-xs font-bold text-blue-600 uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full">
              Live
            </span>
            <span className="text-sm font-bold text-gray-400 group-hover:text-blue-500 transition-colors">
              Enter →
            </span>
          </div>
        </div>
      </TiltCard>
    </div>
  );
}