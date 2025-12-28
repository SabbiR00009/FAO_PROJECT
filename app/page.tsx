'use client';

import { useState } from 'react';
import { Eye, EyeOff, Mail, Lock, ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function AuthPage() {
  const router = useRouter();
  const [showTopAuth, setShowTopAuth] = useState<'signup' | 'login' | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleAuth = async (type: 'signup' | 'login') => {
    setError('');
    setLoading(true);

    try {
      const res = await fetch(`/api/auth/${type}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (data.success) {
        // Store user info in localStorage
        localStorage.setItem('user', JSON.stringify(data.user));
        // Redirect to homepage
        router.push('/home');
      } else {
        setError(data.error);
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Top Navigation Bar */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-gray-200 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            MyApp
          </h1>
          <div className="flex gap-3">
            <button
              onClick={() => setShowTopAuth('signup')}
              className="px-6 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition font-medium"
            >
              Sign Up
            </button>
            <button
              onClick={() => setShowTopAuth('login')}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
            >
              Log In
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="pt-24 pb-12 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Hero Section */}
          {!showTopAuth && (
            <div className="text-center mb-16">
              <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Welcome to Your App
              </h2>
              <p className="text-xl text-gray-600 mb-12">
                Manage your tasks, boost productivity, and achieve your goals
              </p>

              {/* Large Center Options */}
              <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                {/* Get Started Card */}
                <div
                  onClick={() => setShowTopAuth('signup')}
                  className="group cursor-pointer bg-white p-10 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-blue-500"
                >
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mx-auto mb-6 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <ArrowRight className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3 text-gray-800">Get Started</h3>
                  <p className="text-gray-600 mb-6">
                    Create a new account and start your journey with us
                  </p>
                  <div className="inline-flex items-center text-blue-600 font-semibold group-hover:gap-2 transition-all">
                    Sign Up Now
                    <ArrowRight className="w-5 h-5 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>

                {/* Login Card */}
                <div
                  onClick={() => setShowTopAuth('login')}
                  className="group cursor-pointer bg-white p-10 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-purple-500"
                >
                  <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full mx-auto mb-6 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Lock className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3 text-gray-800">
                    I Already Have an Account
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Welcome back! Log in to continue where you left off
                  </p>
                  <div className="inline-flex items-center text-purple-600 font-semibold group-hover:gap-2 transition-all">
                    Log In Now
                    <ArrowRight className="w-5 h-5 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Auth Form (appears when button is clicked) */}
          {showTopAuth && (
            <div className="max-w-md mx-auto">
              <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-100">
                <button
                  onClick={() => {
                    setShowTopAuth(null);
                    setError('');
                  }}
                  className="text-gray-500 hover:text-gray-700 mb-4"
                >
                  ← Back
                </button>

                <h3 className="text-3xl font-bold mb-2 text-gray-800">
                  {showTopAuth === 'signup' ? 'Create Account' : 'Welcome Back'}
                </h3>
                <p className="text-gray-600 mb-8">
                  {showTopAuth === 'signup'
                    ? 'Sign up to get started'
                    : 'Log in to your account'}
                </p>

                {error && (
                  <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
                    {error}
                  </div>
                )}

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleAuth(showTopAuth);
                  }}
                  className="space-y-6"
                >
                  {/* Email Input */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                        placeholder="you@example.com"
                      />
                    </div>
                  </div>

                  {/* Password Input */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        minLength={6}
                        className="w-full pl-11 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                        placeholder="••••••••"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showPassword ? (
                          <EyeOff className="w-5 h-5" />
                        ) : (
                          <Eye className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                    <p className="mt-2 text-sm text-gray-500">
                      Must be at least 6 characters
                    </p>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading
                      ? 'Please wait...'
                      : showTopAuth === 'signup'
                      ? 'Create Account'
                      : 'Log In'}
                  </button>
                </form>

                {/* Toggle Auth Type */}
                <div className="mt-6 text-center text-sm text-gray-600">
                  {showTopAuth === 'signup' ? (
                    <>
                      Already have an account?{' '}
                      <button
                        onClick={() => {
                          setShowTopAuth('login');
                          setError('');
                        }}
                        className="text-blue-600 hover:underline font-semibold"
                      >
                        Log In
                      </button>
                    </>
                  ) : (
                    <>
                      Don't have an account?{' '}
                      <button
                        onClick={() => {
                          setShowTopAuth('signup');
                          setError('');
                        }}
                        className="text-blue-600 hover:underline font-semibold"
                      >
                        Sign Up
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}