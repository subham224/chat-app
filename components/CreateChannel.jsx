'use client';

import { createChannelAction } from '@/app/actions';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { useClerk, useUser } from '@clerk/nextjs';

export default function CreateChannel() {
  const router = useRouter();
  const { openSignIn } = useClerk();
  const { isSignedIn } = useUser();

  const handleSubmit = async (formData) => {
    if (!isSignedIn) {
      toast.error("Please sign in to create a room");
      openSignIn();
      return;
    }

    const result = await createChannelAction(formData);

    if (result?.error) {
      toast.error(result.error);
    } else if (result?.success) {
      toast.success("Room created successfully! 🚀");
      router.push(`/chat/${result.slug}`);
    }
  };

  return (
    <div className="my-8 w-full px-4"> 
      {/* FIX: 
         1. 'flex-col': Stacks items vertically by default (Mobile)
         2. 'sm:flex-row': Switches to horizontal on tablets/desktop
         3. 'w-full max-w-md': Ensures it fits mobile screen but doesn't get too wide on desktop
      */}
      <form action={handleSubmit} className="flex flex-col sm:flex-row gap-3 justify-center items-center w-full max-w-md mx-auto">
        
        <input 
          type="text" 
          name="channelName"
          placeholder="Enter room name..." 
          required
          // FIX: 'w-full' makes it fill the mobile screen width
          className="w-full sm:w-64 border border-white/20 bg-white/10 backdrop-blur-md rounded-lg px-4 py-3 text-white placeholder-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-inner"
        />
        
        <button 
          type="submit" 
          // FIX: 'w-full sm:w-auto' makes button easy to tap on mobile
          className="w-full sm:w-auto bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-lg font-bold transition shadow-lg hover:scale-105 active:scale-95"
        >
          Create
        </button>
      </form>
    </div>
  );
}