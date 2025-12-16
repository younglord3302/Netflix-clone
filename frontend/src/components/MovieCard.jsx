import { Heart, Plus } from 'lucide-react';
import { useState } from 'react';

export const MovieCard = ({ movie, onWatchlist, onAddToWatchlist, onRemoveFromWatchlist }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleWatchlistToggle = async () => {
    if (onWatchlist) {
      await onRemoveFromWatchlist(movie._id);
    } else {
      await onAddToWatchlist(movie._id);
    }
  };

  return (
    <div
      className="relative group cursor-pointer overflow-hidden rounded-md"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img
        src={movie.posterUrl}
        alt={movie.title}
        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
      />
      
      {isHovered && (
        <div className="absolute inset-0 bg-black bg-opacity-80 flex flex-col justify-between p-4 transition-all duration-300">
          <div>
            <h3 className="text-lg font-bold line-clamp-2">{movie.title}</h3>
            <p className="text-sm text-gray-300 mt-2 line-clamp-3">{movie.description}</p>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-yellow-400 font-bold">{movie.rating}/10</span>
              <span className="text-gray-400">{movie.duration} min</span>
            </div>
            <button
              onClick={handleWatchlistToggle}
              className="bg-netflix-accent hover:bg-red-700 text-white p-2 rounded-full transition"
            >
              {onWatchlist ? (
                <Heart size={20} fill="currentColor" />
              ) : (
                <Plus size={20} />
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
