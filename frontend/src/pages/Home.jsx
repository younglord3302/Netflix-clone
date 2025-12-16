import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { movieService } from '../api';
import { MovieCard } from '../components/MovieCard';
import { MovieRow } from '../components/MovieRow';
import { Play, Info } from 'lucide-react';

export const Home = ({ searchQuery }) => {
  const [featured, setFeatured] = useState(null);
  const [searchResults, setSearchResults] = useState([]);

  // Categorized movies
  const [trending, setTrending] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [actionMovies, setActionMovies] = useState([]);
  const [comedyMovies, setComedyMovies] = useState([]);
  const [dramaMovies, setDramaMovies] = useState([]);
  const [sciFiMovies, setSciFiMovies] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);

        // If searching, just get search results
        if (searchQuery) {
          const res = await movieService.getAll({ search: searchQuery });
          setSearchResults(res.data);
          setFeatured(null); // Or keep it? Let's hide it for search
          setLoading(false);
          return;
        }

        // Otherwise load the "Netflix" dashboard
        const [
          featuredRes,
          trendingRes,
          topRatedRes,
          actionRes,
          comedyRes,
          dramaRes,
          sciFiRes
        ] = await Promise.all([
          movieService.getFeatured(),
          movieService.getAll({ sort: '-popularity' }),
          movieService.getAll({ sort: '-rating' }),
          movieService.getAll({ genre: 'Action' }),
          movieService.getAll({ genre: 'Comedy' }),
          movieService.getAll({ genre: 'Drama' }),
          movieService.getAll({ genre: 'Sci-Fi' }),
        ]);

        setFeatured(featuredRes.data[0]);
        setTrending(trendingRes.data);
        setTopRated(topRatedRes.data);
        setActionMovies(actionRes.data);
        setComedyMovies(comedyRes.data);
        setDramaMovies(dramaRes.data);
        setSciFiMovies(sciFiRes.data);

      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [searchQuery]);

  // Keep these dummy handlers for now, can be moved to context or prop drill
  const handleAddToWatchlist = async (movieId) => {
    try {
      await movieService.addToWatchlist(movieId);
      // Ideally refresh local state or use React Query
    } catch (err) {
      console.error(err);
    }
  };

  const handleRemoveFromWatchlist = async (movieId) => {
    try {
      await movieService.removeFromWatchlist(movieId);
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-netflix-dark pb-10 overflow-hidden">
        {/* Hero Skeleton */}
        <div className="relative h-[85vh] w-full bg-gray-900 animate-pulse">
          <div className="absolute bottom-[30%] left-12 max-w-xl space-y-4">
            <div className="h-16 w-3/4 bg-gray-800 rounded"></div>
            <div className="h-4 w-full bg-gray-800 rounded"></div>
            <div className="h-4 w-5/6 bg-gray-800 rounded"></div>
            <div className="flex gap-4 pt-4">
              <div className="h-12 w-32 bg-gray-800 rounded"></div>
              <div className="h-12 w-32 bg-gray-800 rounded"></div>
            </div>
          </div>
        </div>
        {/* Rows Skeleton */}
        <div className="relative z-10 -mt-32 pl-8 space-y-12">
          {[1, 2, 3].map((i) => (
            <div key={i} className="space-y-4">
              <div className="h-6 w-48 bg-gray-800 rounded"></div>
              <div className="flex gap-4 overflow-hidden">
                {[1, 2, 3, 4, 5, 6].map((j) => (
                  <div key={j} className="h-40 w-64 bg-gray-800 rounded-md flex-shrink-0"></div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-netflix-dark pb-10">

      {/* Search Mode */}
      {searchQuery && (
        <div className="px-6 pt-24 pb-12 overflow-y-auto h-screen">
          <h2 className="text-2xl font-bold mb-6 text-white">Search Results</h2>
          {searchResults.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <p className="text-gray-400 text-xl">No movies found matching "{searchQuery}"</p>
              <p className="text-gray-600 mt-2">Try checking for typos or using different keywords.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {searchResults.map(movie => (
                <Link key={movie._id} to={`/movie/${movie._id}`}>
                  <MovieCard movie={movie} />
                </Link>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Dashboard Mode */}
      {!searchQuery && (
        <>
          {/* Featured Hero */}
          {featured && (
            <div className="relative h-[85vh] w-full">
              <div className="absolute inset-0">
                <img
                  src={featured.backdropUrl || featured.posterUrl}
                  alt={featured.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-netflix-dark via-transparent to-transparent"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-netflix-dark via-transparent to-transparent"></div>
              </div>

              <div className="absolute bottom-[30%] left-8 md:left-12 max-w-xl p-4">
                <h1 className="text-3xl md:text-6xl font-bold mb-4 drop-shadow-md text-white">{featured.title}</h1>
                <p className="text-gray-200 text-lg mb-8 line-clamp-3 drop-shadow-sm font-medium">{featured.description}</p>

                <div className="flex gap-4">
                  <Link to={`/watch/${featured._id}`} className="flex items-center gap-2 bg-white text-black px-6 py-2 md:px-8 md:py-3 rounded md:rounded-lg font-bold hover:bg-opacity-80 transition text-lg">
                    <Play size={28} fill="currentColor" />
                    Play
                  </Link>
                  <Link
                    to={`/movie/${featured._id}`}
                    className="flex items-center gap-2 bg-gray-500/70 text-white px-6 py-2 md:px-8 md:py-3 rounded md:rounded-lg font-bold hover:bg-gray-500/50 transition text-lg backdrop-blur-sm"
                  >
                    <Info size={28} />
                    More Info
                  </Link>
                </div>
              </div>
            </div>
          )}

          {/* Rows - Negative margin to pull up over hero fade */}
          <div className="relative z-10 -mt-32 md:-mt-48 pl-4 md:pl-8 space-y-2">
            <MovieRow title="Trending Now" movies={trending} />
            <MovieRow title="Top Rated" movies={topRated} />
            <MovieRow title="Action Blockbusters" movies={actionMovies} />
            <MovieRow title="Comedy Hits" movies={comedyMovies} />
            <MovieRow title="Sci-Fi & Fantasy" movies={sciFiMovies} />
            <MovieRow title="Dramatic Cinema" movies={dramaMovies} />
          </div>
        </>
      )}
    </div>
  );
};
