import React, { useState } from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom';
import { Home, BarChart3, MessageCircle, LogOut, Leaf } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { ThemeToggle } from './ThemeToggle';
import { ChatSupport } from './ChatSupport';
import { Avatar } from './Avatar';

export const Layout: React.FC = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [isChatOpen, setIsChatOpen] = useState(false);

  const navigation = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Dashboard', href: '/dashboard', icon: BarChart3 },
    { name: 'Chat Support', href: '#', icon: MessageCircle, onClick: () => setIsChatOpen(true) },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
      {/* Indian Flag Themed User Info Section */}
      {user && (
        <div className="sticky top-0 z-50 bg-gradient-to-r from-orange-500 via-white to-green-500 border-b-2 border-saffron-400 shadow-lg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              {/* Left side - Branding */}
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-green-500 rounded-full flex items-center justify-center">
                    <Leaf className="w-6 h-6 text-black" />
                  </div>
                  <div>
                    <h1 className="text-lg font-bold relative">
                      <span className="bg-gradient-to-r from-green-700 via-blue-800 to-green-700 bg-clip-text text-transparent drop-shadow-sm">
                        CropAI India
                      </span>
                    </h1>
                    <p className="text-xs text-black-600">Agricultural Intelligence</p>
                  </div>
                </div>
              </div>

              {/* Center - User Welcome */}
              <div className="hidden md:flex items-center space-x-4 bg-black/20 backdrop-blur-sm rounded-xl px-6 py-2 border border-black/30">
                <div className="flex items-center space-x-3">
                  <Avatar
                    gender={localStorage.getItem('userGender') || 'male'}
                    size="md"
                    className="ring-2 ring-white/50 shadow-lg"
                  />
                  <div className="text-center">
                    <p className="text-sm font-semibold text-black-800">
                      Welcome, {user.name}
                    </p>
                    <p className="text-xs text-black-600 font-medium">
                      {localStorage.getItem('userGender') === 'female' ? 'Farmer' : 'Farmer'} | Dashboard Access
                    </p>
                  </div>
                </div>
              </div>

              {/* Right side - Actions */}
              <div className="flex items-center space-x-3">
                <div className="hidden sm:flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-lg px-3 py-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-xs font-medium text-gray-700">Live Data</span>
                </div>

                {/* Gender Toggle */}
                <div className="hidden md:flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-lg px-3 py-2">
                  <button
                    onClick={() => {
                      const newGender = localStorage.getItem('userGender') === 'male' ? 'female' : 'male';
                      localStorage.setItem('userGender', newGender);
                      window.location.reload();
                    }}
                    className="text-xs font-medium text-gray-700 hover:text-gray-900 transition-colors"
                    title="Toggle Avatar Gender"
                  >
                    👤 {localStorage.getItem('userGender') === 'female' ? 'Female' : 'Male'}
                  </button>
                </div>

                <button
                  onClick={logout}
                  className="p-2 rounded-lg bg-red-500/10 text-red-600 hover:bg-red-500/20 transition-all duration-300 backdrop-blur-sm border border-red-200/50"
                  aria-label="Logout"
                  title="Logout"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Mobile User Info */}
          <div className="md:hidden border-t border-white/20 bg-white/10 backdrop-blur-sm">
            <div className="max-w-7xl mx-auto px-4 py-2">
              <div className="flex items-center justify-center space-x-3">
                <Avatar
                  gender={localStorage.getItem('userGender') || 'male'}
                  size="sm"
                  className="ring-1 ring-white/50"
                />
                <div className="text-center">
                  <p className="text-sm font-semibold text-gray-800">Welcome, {user.name}</p>
                  <p className="text-xs text-gray-600">Agricultural Dashboard</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Navigation */}
      <nav className="glass-effect border-b border-white/20 dark:border-gray-700/20 sticky top-0 z-40 backdrop-blur-xl bg-gradient-to-r from-saffron-500/5 to-green-500/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-8">
              <Link to="/" className="flex items-center space-x-2 text-green-500 dark:text-green-400 hover:text-green-600 transition-colors duration-300">
                <Leaf className="w-8 h-8 drop-shadow-lg" />
                <span className="text-xl font-bold relative">
                  <span className="bg-gradient-to-r from-green-400 via-green-500 to-green-600 bg-clip-text text-transparent drop-shadow-sm">CropAI</span>
                  <span className="absolute inset-0 bg-gradient-to-r from-green-400/20 via-green-500/20 to-green-600/20 blur-sm"></span>
                </span>
              </Link>

              <div className="hidden md:flex space-x-4">
                {navigation.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.name}
                      to={item.href}
                      onClick={item.onClick}
                      className={`px-4 py-2 rounded-lg transition-all duration-300 flex items-center space-x-2 glow-effect backdrop-blur-sm ${isActive(item.href)
                        ? 'bg-gradient-to-r from-saffron-500 to-green-500 text-white glow-active shadow-lg'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gradient-to-r hover:from-saffron-100/20 hover:to-green-100/20 dark:hover:from-saffron-900/20 dark:hover:to-green-900/20'
                        }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{item.name}</span>
                    </Link>
                  );
                })}
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <ThemeToggle />
              {!user && (
                <div className="text-sm text-gray-700 dark:text-gray-300">
                  Please sign in to access dashboard
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      <main className="flex-1">
        <Outlet />
      </main>

      <ChatSupport isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </div>
  );
};