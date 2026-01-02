'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

export default function TiltCard({ children, onClick }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth physics for the tilt
  const mouseX = useSpring(x, { stiffness: 150, damping: 15 });
  const mouseY = useSpring(y, { stiffness: 150, damping: 15 });

  const rotateX = useTransform(mouseY, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-7deg", "7deg"]);

  function handleMouseMove({ currentTarget, clientX, clientY }) {
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    x.set((clientX - left) / width - 0.5);
    y.set((clientY - top) / height - 0.5);
  }

  return (
    <motion.div
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      onClick={onClick}
      className="relative cursor-pointer group perspective-1000"
    >
      <div className="relative bg-white light:bg-gray-800 rounded-2xl p-6 shadow-xl border border-gray-100 dark:border-gray-700 transition-shadow duration-300 group-hover:shadow-2xl group-hover:shadow-blue-500/20">
        
        {/* Inner Z-Depth Element */}
        <div style={{ transform: "translateZ(20px)" }} className="pointer-events-none">
          {children}
        </div>
        
        {/* Glossy Reflection Gradient */}
        <div className="absolute inset-0 rounded-2xl bg-linear-to-br from-white/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      </div>
    </motion.div>
  );
}