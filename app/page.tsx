'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Home, Mail, Lock, ArrowRight, CheckCircle, Key } from 'lucide-react';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const endpoint = isLogin ? '/api/auth/login' : '/api/auth/signup';

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (data.success) {
        localStorage.setItem('user', JSON.stringify(data.user));
        router.push('/home');
      } else {
        setError(data.error || 'Something went wrong');
      }
    } catch (err) {
      setError('Failed to connect to server');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gray-900">
      {/* Dynamic Aesthetic Background Image */}
      <div 
        className="absolute inset-0 z-0 opacity-40 transition-opacity duration-1000"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1560448204-603b3fc33ddc?q=80&w=2070")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/40 via-transparent to-black/60 z-0" />

      <main className="relative z-10 w-full max-w-5xl grid lg:grid-cols-2 gap-0 shadow-2xl rounded-3xl overflow-hidden m-4 border border-white/10">
        
        {/* Left Side: Aesthetic Brand Section */}
        <div className="hidden lg:flex flex-col justify-between bg-blue-600/20 backdrop-blur-xl p-12 text-white border-r border-white/10">
          <div>
            <div className="flex items-center gap-2 mb-8">
              <div className="bg-white p-2 rounded-lg">
                <Home className="text-blue-600" size={24} />
              </div>
              <span className="font-bold text-xl tracking-tight uppercase">Premium Rentals</span>
            </div>
            
            <h1 className="text-6xl font-black italic leading-tight tracking-tighter mb-6">
              Bhara <br /> 
              <span className="text-blue-400">Chai?</span>
            </h1>
            <p className="text-lg text-blue-100/80 leading-relaxed max-w-xs">
              Your gateway to the most aesthetic living spaces in the city.
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-3 text-sm font-medium bg-white/5 p-3 rounded-xl border border-white/10">
              <CheckCircle size={18} className="text-green-400" />
              Verified Owners & Properties
            </div>
            <div className="flex items-center gap-3 text-sm font-medium bg-white/5 p-3 rounded-xl border border-white/10">
              <Key size={18} className="text-yellow-400" />
              Easy Move-in Process
            </div>
          </div>
        </div>

        {/* Right Side: Elegant Auth Form */}
        <div className="bg-white p-8 md:p-16 flex flex-col justify-center">
          <div className="lg:hidden flex items-center justify-center gap-2 mb-8">
            <Home className="text-blue-600" size={28} />
            <h1 className="text-3xl font-black text-blue-600 italic tracking-tighter">Bhara Chai?</h1>
          </div>

          <div className="mb-8">
            <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
              {isLogin ? 'Welcome back' : 'Start your journey'}
            </h2>
            <p className="text-gray-500 mt-2">
              {isLogin ? 'Login to manage your rentals' : 'Find your dream home in minutes'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2 ml-1">Email</label>
              <div className="group relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-600 transition-colors" size={18} />
                <input
                  type="email"
                  required
                  className="w-full pl-12 pr-4 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-600/20 transition-all text-gray-800 placeholder-gray-300"
                  placeholder="name@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2 ml-1">Password</label>
              <div className="group relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-600 transition-colors" size={18} />
                <input
                  type="password"
                  required
                  className="w-full pl-12 pr-4 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-600/20 transition-all text-gray-800 placeholder-gray-300"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            {error && <p className="text-red-500 text-sm font-medium bg-red-50 p-3 rounded-xl">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-2xl shadow-xl shadow-blue-200 flex items-center justify-center gap-3 transition-all transform active:scale-[0.98] disabled:opacity-50"
            >
              {loading ? 'Wait a moment...' : isLogin ? 'Sign In' : 'Join Now'}
              <ArrowRight size={20} />
            </button>
          </form>

          <div className="mt-10 text-center">
            <span className="text-gray-400 text-sm">
              {isLogin ? "Don't have an account?" : "Already a member?"}
            </span>
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="ml-2 text-blue-600 font-bold hover:underline decoration-2 underline-offset-4"
            >
              {isLogin ? 'Create one' : 'Sign in here'}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}