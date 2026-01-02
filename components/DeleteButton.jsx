'use client'; 

import { deleteChannel } from "@/app/actions";
import { toast } from 'sonner';
import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

export default function DeleteButton({ channelId }) {
  const [showModal, setShowModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Needed for Portal to work safely in Next.js
  useEffect(() => {
    setMounted(true);
  }, []);

  const handleDelete = async () => {
    setIsDeleting(true);
    const result = await deleteChannel(channelId);
       
    if (result?.error) {
      toast.error(result.error);
      setIsDeleting(false);
    } else {
      toast.success("Room deleted successfully");
      setShowModal(false);
      // No need to reset isDeleting, page will revalidate
    }
  };

  return (
    <>
      {/* 1. THE TRIGGER BUTTON (Trash Icon) */}
      <button 
        onClick={(e) => {
          e.stopPropagation(); // Stop clicking the card
          e.preventDefault();
          setShowModal(true); // Open our custom modal
        }}
        className="pointer-events-auto relative p-2 bg-gray-100 dark:bg-gray-800 rounded-full hover:bg-red-100 dark:hover:bg-red-900/50 transition-colors duration-200 group shadow-lg border border-gray-200 dark:border-gray-700"
        title="Delete Room"
        type="button"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500 group-hover:text-red-600 dark:text-gray-400 dark:group-hover:text-red-400 transition-colors">
          <polyline points="3 6 5 6 21 6"></polyline>
          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
        </svg>
      </button>

      {/* 2. THE CUSTOM MODAL (Teleported to Body) */}
      {mounted && showModal && createPortal(
        <div 
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setShowModal(false)} // Click outside to close
        >
          {/* Modal Content */}
          <div 
            className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-2xl max-w-sm w-full p-6 transform scale-100 animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
          >
            <div className="flex flex-col items-center text-center">
              {/* Warning Icon */}
              <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mb-4 text-red-600 dark:text-red-500">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                  <line x1="12" y1="9" x2="12" y2="13"></line>
                  <line x1="12" y1="17" x2="12.01" y2="17"></line>
                </svg>
              </div>

              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                Delete Room?
              </h3>
              <p className="text-gray-500 dark:text-gray-400 mb-6 text-sm">
                This action is permanent and cannot be undone. Are you sure you want to delete this room?
              </p>

              {/* Action Buttons */}
              <div className="flex gap-3 w-full">
                <button
                  onClick={() => setShowModal(false)}
                  disabled={isDeleting}
                  className="flex-1 px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-xl font-medium hover:bg-gray-200 dark:hover:bg-gray-700 transition disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  disabled={isDeleting}
                  className="flex-1 px-4 py-2 bg-red-600 text-white rounded-xl font-medium hover:bg-red-700 transition shadow-lg shadow-red-500/20 disabled:opacity-50 flex justify-center items-center gap-2"
                >
                  {isDeleting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Deleting...
                    </>
                  ) : (
                    "Delete"
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>,
        document.body // <-- This puts the modal on top of EVERYTHING
      )}
    </>
  );
}