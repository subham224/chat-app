'use client';

import { motion } from 'framer-motion';

export default function HeroBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden -z-10 transition-colors duration-700 bg-slate-50 dark:bg-gray-950">
      
      {/* 1. Base Gradient: Gentle Morning Sky (Light) vs Deep Void (Dark) */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-50 via-indigo-50/50 to-white dark:from-gray-900 dark:via-purple-950 dark:to-black opacity-80 transition-colors duration-700" />

      {/* 2. Floating Orb 1: Soft Sky Blue Cloud */}
      <motion.div 
        animate={{ 
          x: [0, 100, -50, 0], 
          y: [0, -100, 50, 0],
          scale: [1, 1.2, 0.9, 1],
          opacity: [0.4, 0.7, 0.4]
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full blur-[100px] transition-colors duration-700
          bg-sky-200/60 mix-blend-multiply dark:bg-blue-500 dark:mix-blend-screen"
      />

      {/* 3. Floating Orb 2: Gentle Lavender Mist */}
      <motion.div 
        animate={{ 
          x: [0, -70, 30, 0], 
          y: [0, 80, -40, 0],
          scale: [1, 1.3, 0.8, 1],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute bottom-0 right-1/4 w-[600px] h-[600px] rounded-full blur-[120px] transition-colors duration-700
          bg-purple-200/60 mix-blend-multiply dark:bg-purple-600 dark:mix-blend-screen"
      />

      {/* 4. Floating Orb 3: Subtle Mint Calm (Adds freshness) */}
      <motion.div 
        animate={{ 
          x: [0, 50, -50, 0], 
          y: [0, -50, 50, 0],
          scale: [1, 1.1, 0.9, 1],
        }}
        transition={{ duration: 30, repeat: Infinity, ease: "easeInOut", delay: 5 }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full blur-[130px] transition-colors duration-700
          bg-teal-100/40 mix-blend-multiply dark:bg-indigo-900 dark:mix-blend-screen dark:opacity-40"
      />
      
      {/* 5. Texture: Soft Grain (Makes it feel like paper/canvas) */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 brightness-100 contrast-150 mix-blend-overlay"></div>
    </div>
  );
}