// components/ThemeChanger.js

import { useTheme } from 'next-themes';
import { useState, useEffect } from 'react';
import { SunIcon, MoonIcon, ComputerDesktopIcon } from '@heroicons/react/24/outline';

const ThemeChanger = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  // useEffect only runs on the client, so we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="flex items-center p-1 bg-gray-200 dark:bg-gray-700 rounded-full">
      <button
        onClick={() => setTheme('light')}
        className={`p-2 rounded-full transition-colors ${
          theme === 'light' ? 'bg-white shadow-md' : 'hover:bg-gray-300'
        }`}
      >
        <SunIcon className="h-5 w-5 text-gray-800" />
      </button>
      <button
        onClick={() => setTheme('dark')}
        className={`p-2 rounded-full transition-colors ${
          theme === 'dark' ? 'bg-gray-800 shadow-md' : 'hover:bg-gray-600'
        }`}
      >
        <MoonIcon className="h-5 w-5 text-white" />
      </button>
      <button
        onClick={() => setTheme('system')}
        className={`p-2 rounded-full transition-colors ${
          theme === 'system' ? 'bg-gray-500 shadow-md' : 'hover:bg-gray-400 dark:hover:bg-gray-600'
        }`}
      >
        <ComputerDesktopIcon className="h-5 w-5 text-gray-800 dark:text-white" />
      </button>
    </div>
  );
};

export default ThemeChanger;