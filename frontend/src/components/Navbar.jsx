import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Search, LogOut, Home, Heart } from 'lucide-react';
import { useState } from 'react';

export const Navbar = ({ onSearch }) => {
  const { user, logout, isAuthenticated } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <nav className="fixed top-0 w-full bg-gradient-to-b from-black via-black/80 to-transparent z-50 px-6 py-4">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <Link to="/" className="flex items-center gap-2">
          <div className="text-red-600 font-bold text-3xl tracking-tighter shadow-xl">
            NETFLIX
          </div>
        </Link>

        {isAuthenticated && (
          <div className="flex items-center gap-4 md:gap-6">
            <Link to="/" className="hover:text-netflix-accent transition flex items-center gap-2">
              <Home size={20} />
              <span className="hidden md:block">Home</span>
            </Link>

            {/* Categories Dropdown */}
            <div className="relative group z-50">
              <button className="hover:text-netflix-accent transition flex items-center gap-2">
                <span>Categories</span>
              </button>
              <div className="absolute top-full left-0 bg-black/90 border border-gray-700 p-4 w-48 hidden group-hover:block rounded shadow-xl mt-2">
                <div className="flex flex-col gap-3 text-sm text-gray-300">
                  <Link to="/category/Action" className="hover:text-white hover:underline">Action</Link>
                  <Link to="/category/Comedy" className="hover:text-white hover:underline">Comedy</Link>
                  <Link to="/category/Drama" className="hover:text-white hover:underline">Drama</Link>
                  <Link to="/category/Sci-Fi" className="hover:text-white hover:underline">Sci-Fi</Link>
                  <Link to="/category/Horror" className="hover:text-white hover:underline">Horror</Link>
                  <Link to="/category/Documentary" className="hover:text-white hover:underline">Documentary</Link>
                </div>
              </div>
            </div>

            <Link to="/watchlist" className="hover:text-netflix-accent transition flex items-center gap-2">
              <Heart size={20} />
              <span className="hidden md:block">My List</span>
            </Link>
          </div>
        )}

        <div className="flex items-center gap-4">
          {isAuthenticated && (
            <div className="relative">
              <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={handleSearch}
                className="bg-netflix-light pl-10 pr-4 py-2 rounded text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-netflix-accent w-32 sm:w-64 transition-all"
              />
            </div>
          )}

          {isAuthenticated ? (
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-300">{user?.name}</span>
              <button
                onClick={logout}
                className="text-gray-400 hover:text-netflix-accent transition"
              >
                <LogOut size={20} />
              </button>
            </div>
          ) : (
            <div className="flex gap-3">
              <Link
                to="/login"
                className="px-4 py-2 text-white hover:text-netflix-accent transition"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="px-4 py-2 bg-netflix-accent text-white rounded hover:bg-red-700 transition"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};
