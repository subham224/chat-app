'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="relative w-14 h-8 bg-gray-200 dark:bg-gray-700 rounded-full shadow-inner transition-colors duration-300 focus:outline-none"
    >
      <div
        className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full shadow-md transform transition-transform duration-300 flex items-center justify-center
          ${theme === 'dark' ? 'translate-x-6 bg-blue-500' : 'translate-x-0'}
        `}
      >
        {theme === 'dark' ? '🌙' : '☀️'}
      </div>
    </button>
  );
}