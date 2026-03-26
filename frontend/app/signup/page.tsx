'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth, UserRole } from '@/lib/context/auth-context';

export default function SignupPage() {
  const router = useRouter();
  const { signup } = useAuth();

  const [full_name, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [organization_name, setOrganizationName] = useState('');
  const [selectedRole, setSelectedRole] = useState<UserRole>('volunteer');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      await signup(
        {
          full_name,
          email,
          password,
          phone,
          city,
          state,
          organization_name: selectedRole === 'ngo' ? organization_name : '',
        },
        selectedRole
      );

      setSuccess('Account created successfully. Please log in.');
      setTimeout(() => {
        router.push('/login');
      }, 1200);
    } catch (err: any) {
      setError(err.message || 'Signup failed');
      console.error('SIGNUP PAGE ERROR:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-4 py-10">
      <form
        onSubmit={handleSignup}
        className="w-full max-w-2xl bg-[#050b14] border border-gray-800 rounded-3xl p-8"
      >
        <h1 className="text-4xl font-bold text-center mb-2">Create Account</h1>
        <p className="text-center text-gray-400 mb-10">Join the platform and start helping</p>

        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <input
            type="text"
            placeholder="Full Name"
            className="rounded-xl px-4 py-3 bg-[#1d2a40] text-white outline-none"
            value={full_name}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            className="rounded-xl px-4 py-3 bg-[#1d2a40] text-white outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="rounded-xl px-4 py-3 bg-[#1d2a40] text-white outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Phone"
            className="rounded-xl px-4 py-3 bg-[#1d2a40] text-white outline-none"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <input
            type="text"
            placeholder="City"
            className="rounded-xl px-4 py-3 bg-[#1d2a40] text-white outline-none"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <input
            type="text"
            placeholder="State"
            className="rounded-xl px-4 py-3 bg-[#1d2a40] text-white outline-none"
            value={state}
            onChange={(e) => setState(e.target.value)}
          />
        </div>

        <p className="mb-3 font-medium">I am registering as...</p>
        <div className="grid grid-cols-3 gap-3 mb-6">
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

        {selectedRole === 'ngo' && (
          <div className="mb-6">
            <input
              type="text"
              placeholder="Organization Name"
              className="w-full rounded-xl px-4 py-3 bg-[#1d2a40] text-white outline-none"
              value={organization_name}
              onChange={(e) => setOrganizationName(e.target.value)}
              required
            />
          </div>
        )}

        {error && (
          <div className="mb-4 rounded-xl bg-red-500/20 border border-red-500 px-4 py-3 text-red-300">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-4 rounded-xl bg-green-500/20 border border-green-500 px-4 py-3 text-green-300">
            {success}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-500 hover:bg-blue-600 transition rounded-2xl py-4 text-lg font-semibold"
        >
          {loading ? 'Creating Account...' : 'Create Account'}
        </button>

        <div className="mt-8 text-center">
          <p className="text-gray-400 mb-4">Already have an account?</p>
          <button
            type="button"
            onClick={() => router.push('/login')}
            className="w-full border border-gray-700 rounded-2xl py-4"
          >
            Go to Login
          </button>
        </div>
      </form>
    </div>
  );
}