import { useState, useEffect } from 'react';
import { movieService, userService } from '../api';
import { MovieCard } from '../components/MovieCard';

export const Watchlist = () => {
  const [watchlist, setWatchlist] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    userService.getWatchlist()
      .then(res => {
        setWatchlist(res.data);
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const handleRemoveFromWatchlist = async (movieId) => {
    try {
      await movieService.removeFromWatchlist(movieId);
      setWatchlist(watchlist.filter(m => m._id !== movieId));
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-netflix-dark pt-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="h-10 w-48 bg-gray-800 rounded mb-8 animate-pulse"></div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
              <div key={i} className="aspect-[2/3] bg-gray-800 rounded animate-pulse"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-netflix-dark pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-6">
        <h1 className="text-4xl font-bold mb-8">My List</h1>

        {watchlist.length === 0 ? (
          <div className="text-gray-400 text-center py-12">
            Your watchlist is empty
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {watchlist.map(movie => (
              <MovieCard
                key={movie._id}
                movie={movie}
                onWatchlist={true}
                onRemoveFromWatchlist={handleRemoveFromWatchlist}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
