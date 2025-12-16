import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen bg-netflix-dark flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-netflix-light p-8 rounded-lg">
        <h1 className="text-3xl font-bold mb-8 text-center">Sign In</h1>
        
        {error && (
          <div className="bg-red-500/20 text-red-400 p-4 rounded mb-4 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 bg-netflix-dark rounded text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-netflix-accent"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 bg-netflix-dark rounded text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-netflix-accent"
          />
          <button
            type="submit"
            className="w-full bg-netflix-accent hover:bg-red-700 text-white font-bold py-3 rounded transition"
          >
            Sign In
          </button>
        </form>

        <p className="text-center text-gray-400 mt-6">
          Don't have an account?{' '}
          <Link to="/register" className="text-netflix-accent hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};
