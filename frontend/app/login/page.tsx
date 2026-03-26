'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth, UserRole } from '@/lib/context/auth-context';

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState<UserRole>('volunteer');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const profile = await login(email, password, selectedRole);

      const pathMap: Record<string, string> = {
        user: '/user-dashboard',
        volunteer: '/volunteer-dashboard',
        ngo: '/ngo-dashboard',
      };

      router.push(pathMap[profile.role] || '/');
    } catch (err: any) {
      setError(err.message || 'Login failed');
      console.error('LOGIN PAGE ERROR:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-4">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-xl bg-[#050b14] border border-gray-800 rounded-3xl p-8"
      >
        <h1 className="text-4xl font-bold text-center mb-2">Welcome Back</h1>
        <p className="text-center text-gray-400 mb-10">Sign in to access your dashboard</p>

        <div className="mb-6">
          <label className="block mb-2 font-medium">Email Address</label>
          <input
            type="email"
            className="w-full rounded-xl px-4 py-3 bg-[#1d2a40] text-white outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-6">
          <label className="block mb-2 font-medium">Password</label>
          <input
            type="password"
            className="w-full rounded-xl px-4 py-3 bg-[#1d2a40] text-white outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <p className="mb-3 font-medium">I am a...</p>
        <div className="grid grid-cols-3 gap-3 mb-8">
          <button
            type="button"
            onClick={() => setSelectedRole('user')}
            className={`rounded-2xl py-3 font-semibold ${selectedRole === 'user' ? 'bg-blue-500' : 'bg-green-500'}`}
          >
            Community Member
          </button>

          <button
            type="button"
            onClick={() => setSelectedRole('volunteer')}
            className={`rounded-2xl py-3 font-semibold ${selectedRole === 'volunteer' ? 'bg-blue-500' : 'bg-green-500'}`}
          >
            Volunteer
          </button>

          <button
            type="button"
            onClick={() => setSelectedRole('ngo')}
            className={`rounded-2xl py-3 font-semibold ${selectedRole === 'ngo' ? 'bg-blue-500' : 'bg-green-500'}`}
          >
            NGO
          </button>
        </div>

        {error && (
          <div className="mb-4 rounded-xl bg-red-500/20 border border-red-500 px-4 py-3 text-red-300">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-500 hover:bg-blue-600 transition rounded-2xl py-4 text-lg font-semibold"
        >
          {loading ? 'Signing In...' : 'Sign In'}
        </button>

        <div className="mt-8 text-center">
          <p className="text-gray-400 mb-4">Don't have an account?</p>
          <button
            type="button"
            onClick={() => router.push('/signup')}
            className="w-full border border-gray-700 rounded-2xl py-4"
          >
            Create Account
          </button>
        </div>
      </form>
    </div>
  );
}