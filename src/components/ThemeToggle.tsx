import React from 'react';
import { Sun, Moon, Laptop } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

export const ThemeToggle: React.FC = () => {
  const { theme, setTheme } = useTheme();

  const themes = [
    { value: 'light', icon: Sun, label: 'Light' },
    { value: 'dark', icon: Moon, label: 'Dark' },
    { value: 'system', icon: Laptop, label: 'Auto' }
  ];

  return (
    <div className="relative">
      <div className="flex items-center bg-white/10 backdrop-blur-md rounded-xl p-1 border border-white/20 shadow-lg">
        {themes.map(({ value, icon: Icon, label }) => (
          <button
            key={value}
            onClick={() => setTheme(value as 'light' | 'dark' | 'system')}
            className={`
              relative flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-300 group
              ${theme === value
                ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg scale-105'
                : 'text-gray-600 dark:text-gray-300 hover:bg-white/20 hover:text-gray-800 dark:hover:text-white'
              }
            `}
            title={`Switch to ${label} mode`}
          >
            <Icon
              className={`
                w-4 h-4 transition-all duration-300
                ${theme === value ? 'rotate-0 scale-110' : 'group-hover:scale-110'}
              `}
            />
            <span className={`
              text-sm font-medium transition-all duration-300
              ${theme === value ? 'opacity-100' : 'opacity-70 group-hover:opacity-100'}
            `}>
              {label}
            </span>
          </button>
        ))}
      </div>

      {/* Indicator dot */}
      <div className={`
        absolute -top-1 -right-1 w-3 h-3 rounded-full transition-all duration-300
        ${theme === 'light' ? 'bg-yellow-400' : theme === 'dark' ? 'bg-blue-400' : 'bg-green-400'}
      `} />
    </div>
  );
};