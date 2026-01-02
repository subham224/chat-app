'use client';

import { motion } from 'framer-motion';
import clsx from 'clsx';

export default function Message3D({ isMyMessage, message, userImage }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95, rotateX: 10 }}
      animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={clsx(
        "flex items-end gap-3 mb-4 perspective-500",
        isMyMessage ? "justify-end" : "justify-start"
      )}
    >
      {!isMyMessage && (
        <img 
          src={userImage || "https://github.com/shadcn.png"} 
          className="w-8 h-8 rounded-full shadow-md mb-1" 
        />
      )}

      <div
        className={clsx(
          "relative px-5 py-3 rounded-2xl max-w-[80%] shadow-lg", // Standard Shadow
          "border-b-4", // Thick bottom border simulates 3D thickness
          isMyMessage 
            ? "bg-blue-600 text-white border-blue-800 rounded-br-sm" 
            : "bg-white text-gray-800 border-gray-200 rounded-bl-sm"
        )}
      >
        <p className="text-sm leading-relaxed">{message}</p>
        
        {/* Subtle highlight for plastic/glass feel */}
        <div className="absolute top-0 left-0 right-0 h-px bg-white/30 rounded-full" />
      </div>
    </motion.div>
  );
}