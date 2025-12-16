import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { movieService } from '../api';
import { MovieCard } from '../components/MovieCard';
import { Skeleton } from '../components/Skeleton';

export const Category = () => {
    const { name } = useParams();
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        movieService.getAll({ genre: name })
            .then(res => {
                setMovies(res.data);
            })
            .catch(err => console.error(err))
            .finally(() => setLoading(false));
    }, [name]);

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
                <h1 className="text-4xl font-bold mb-8 text-white">{name} Movies</h1>

                {movies.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20 text-center">
                        <div className="text-gray-400 text-xl">No movies found in pure "{name}"</div>
                        <p className="text-gray-600 mt-2">Try browing other categories.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                        {movies.map(movie => (
                            <Link key={movie._id} to={`/movie/${movie._id}`}>
                                <MovieCard movie={movie} />
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};
