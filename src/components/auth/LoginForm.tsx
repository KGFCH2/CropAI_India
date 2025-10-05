import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, Leaf, Wheat } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

export const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const { login, isLoading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const success = await login(email, password);
    if (success) {
      navigate('/');
    } else {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-900 via-emerald-800 to-teal-900 p-4 relative overflow-hidden">
      {/* Crop-themed animated background elements */}
      <div className="absolute inset-0 opacity-20">
        {/* Wheat icons */}
        <Wheat className="absolute top-1/4 left-1/4 w-16 h-16 text-yellow-300 transform rotate-12 animate-bounce" />
        <Wheat className="absolute top-1/3 right-1/4 w-20 h-20 text-amber-300 transform -rotate-12 animate-bounce" />
        <Wheat className="absolute bottom-1/4 left-1/3 w-14 h-14 text-yellow-400 transform rotate-45 animate-bounce" />

        {/* Leaf icons */}
        <Leaf className="absolute top-1/6 right-1/3 w-12 h-12 text-green-300 transform rotate-45 animate-pulse" />
        <Leaf className="absolute bottom-1/3 right-1/6 w-16 h-16 text-emerald-300 transform -rotate-30 animate-pulse" />
        <Leaf className="absolute top-2/3 left-1/6 w-10 h-10 text-lime-300 transform rotate-90 animate-pulse" />

        {/* Additional crop emojis */}
        <div className="absolute top-1/5 left-1/5 text-4xl animate-float">🌾</div>
        <div className="absolute top-3/4 right-1/3 text-3xl animate-float">🌽</div>
        <div className="absolute bottom-1/5 left-2/3 text-5xl animate-float">🍃</div>
        <div className="absolute top-1/2 right-1/5 text-3xl animate-float">🌱</div>

        {/* Gradient orbs */}
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-gradient-to-r from-teal-400 to-green-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
      </div>

      <div className="w-full max-w-md relative z-10">
        <div className="bg-white/10 backdrop-blur-2xl rounded-3xl p-8 shadow-2xl border border-white/20 animate-float">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="p-4 bg-gradient-to-r from-green-400 to-green-500 rounded-full shadow-lg">
                <Leaf className="w-10 h-10 text-white" />
              </div>
            </div>
            <h2 className="text-4xl font-bold bg-gradient-to-r from-green-200 via-green-300 to-green-400 bg-clip-text text-transparent mb-2">
              Welcome Back
            </h2>
            <p className="text-green-100/80 text-lg">Sign in to your agricultural intelligence dashboard</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative group">
              <Mail className="absolute left-4 top-4 w-5 h-5 text-green-300 group-focus-within:text-white transition-colors" />
              <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-green-200/70 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400 focus:bg-white/20 transition-all duration-300"
                required
              />
            </div>

            <div className="relative group">
              <Lock className="absolute left-4 top-4 w-5 h-5 text-green-300 group-focus-within:text-white transition-colors" />
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-12 pr-14 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-green-200/70 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400 focus:bg-white/20 transition-all duration-300"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-4 text-green-300 hover:text-white transition-colors"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>

            {error && (
              <div className="text-red-300 text-sm bg-red-500/20 backdrop-blur-lg p-4 rounded-xl border border-red-500/30">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 text-white rounded-xl font-bold text-lg hover:from-green-600 hover:via-emerald-600 hover:to-teal-600 focus:outline-none focus:ring-2 focus:ring-green-400 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-green-500/25 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Signing in...
                </div>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <Link to="/forgot-password" className="text-green-300 hover:text-white text-sm transition-colors underline underline-offset-2">
              Forgot your password?
            </Link>
          </div>

          <div className="mt-8 text-center">
            <div className="text-green-100/80 text-lg">
              Don't have an account?{' '}
              <Link to="/signup" className="text-green-300 hover:text-white font-bold transition-colors underline underline-offset-2">
                Sign up
              </Link>
            </div>
          </div>

          {/* Decorative elements */}
          <div className="absolute -top-2 -right-2 w-20 h-20 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full opacity-20 blur-xl"></div>
          <div className="absolute -bottom-2 -left-2 w-16 h-16 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full opacity-20 blur-xl"></div>
        </div>
      </div>
    </div>
  );
};