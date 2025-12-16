import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { movieService } from '../api';
import { ChevronLeft, Play, Heart } from 'lucide-react';

export const MovieDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [isWatchlist, setIsWatchlist] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    movieService.getById(id)
      .then(res => setMovie(res.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, [id]);

  const handleAddToWatchlist = async () => {
    try {
      await movieService.addToWatchlist(movie._id);
      setIsWatchlist(true);
    } catch (err) {
      console.error(err);
    }
  };

  const handleRemoveFromWatchlist = async () => {
    try {
      await movieService.removeFromWatchlist(movie._id);
      setIsWatchlist(false);
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-netflix-dark animate-pulse">
        <div className="h-96 bg-gray-900"></div>
        <div className="max-w-6xl mx-auto px-6 py-12 -mt-24 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-6">
              <div className="h-12 w-3/4 bg-gray-800 rounded"></div>
              <div className="flex gap-4">
                <div className="h-6 w-16 bg-gray-800 rounded"></div>
                <div className="h-6 w-16 bg-gray-800 rounded"></div>
              </div>
              <div className="space-y-3">
                <div className="h-4 w-full bg-gray-800 rounded"></div>
                <div className="h-4 w-full bg-gray-800 rounded"></div>
                <div className="h-4 w-5/6 bg-gray-800 rounded"></div>
              </div>
              <div className="flex gap-4 pt-4">
                <div className="h-12 w-32 bg-gray-800 rounded"></div>
                <div className="h-12 w-32 bg-gray-800 rounded"></div>
              </div>
            </div>
            <div>
              <div className="h-[450px] w-full bg-gray-800 rounded-lg shadow-lg"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!movie) {
    return <div className="min-h-screen bg-netflix-dark flex items-center justify-center">Movie not found</div>;
  }

  return (
    <div className="min-h-screen bg-netflix-dark">
      <button
        onClick={() => navigate(-1)}
        className="absolute top-20 left-6 z-40 p-2 bg-netflix-accent rounded-full hover:bg-red-700 transition"
      >
        <ChevronLeft size={24} />
      </button>

      <div className="relative h-96 overflow-hidden">
        <img
          src={movie.backdropUrl || movie.posterUrl}
          alt={movie.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-netflix-dark"></div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-12 -mt-24 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <h1 className="text-4xl font-bold mb-4">{movie.title}</h1>

            <div className="flex items-center gap-4 mb-6 text-sm">
              <span className="text-yellow-400 font-bold text-lg">{movie.rating}/10</span>
              <span>{movie.duration} minutes</span>
              <span>{new Date(movie.releaseDate).getFullYear()}</span>
            </div>

            <p className="text-gray-300 text-lg mb-6 leading-relaxed">
              {movie.description}
            </p>

            <div className="flex gap-3 mb-8">
              <Link to={`/watch/${movie._id}`} className="flex items-center gap-2 bg-netflix-accent hover:bg-red-700 text-white px-6 py-3 rounded transition font-bold">
                <Play size={20} fill="currentColor" />
                Play
              </Link>
              <button
                onClick={isWatchlist ? handleRemoveFromWatchlist : handleAddToWatchlist}
                className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded transition"
              >
                <Heart size={20} fill={isWatchlist ? 'currentColor' : 'none'} />
                {isWatchlist ? 'In My List' : 'Add to List'}
              </button>
            </div>

            <div className="space-y-4">
              {movie.director && (
                <div>
                  <span className="text-gray-400">Director: </span>
                  <span className="text-white">{movie.director}</span>
                </div>
              )}
              {movie.cast && movie.cast.length > 0 && (
                <div>
                  <span className="text-gray-400">Cast: </span>
                  <span className="text-white">{movie.cast.join(', ')}</span>
                </div>
              )}
              {movie.genre && movie.genre.length > 0 && (
                <div>
                  <span className="text-gray-400">Genres: </span>
                  <span className="text-white">{movie.genre.join(', ')}</span>
                </div>
              )}
            </div>
          </div>

          <div>
            <img
              src={movie.posterUrl}
              alt={movie.title}
              className="w-full rounded-lg shadow-lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
