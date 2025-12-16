import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(email, password, name);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="min-h-screen bg-netflix-dark flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-netflix-light p-8 rounded-lg">
        <h1 className="text-3xl font-bold mb-8 text-center">Create Account</h1>
        
        {error && (
          <div className="bg-red-500/20 text-red-400 p-4 rounded mb-4 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-3 bg-netflix-dark rounded text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-netflix-accent"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 bg-netflix-dark rounded text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-netflix-accent"
          />
          <input
            type="password"
            placeholder="Password (min 6 characters)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 bg-netflix-dark rounded text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-netflix-accent"
          />
          <button
            type="submit"
            className="w-full bg-netflix-accent hover:bg-red-700 text-white font-bold py-3 rounded transition"
          >
            Create Account
          </button>
        </form>

        <p className="text-center text-gray-400 mt-6">
          Already have an account?{' '}
          <Link to="/login" className="text-netflix-accent hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};
