import { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { MovieCard } from './MovieCard';

export const MovieRow = ({ title, movies }) => {
    const rowRef = useRef(null);

    const slide = (offset) => {
        if (rowRef.current) {
            rowRef.current.scrollLeft += offset;
        }
    };

    if (!movies || movies.length === 0) return null;

    return (
        <div className="mb-8 px-6 group">
            <h2 className="text-xl md:text-2xl font-bold mb-4 text-white hover:text-gray-300 cursor-pointer transition">
                {title}
            </h2>

            <div className="relative">
                <button
                    onClick={() => slide(-500)}
                    className="absolute left-0 top-0 bottom-0 z-40 bg-black/50 hover:bg-black/70 text-white p-2 opacity-0 group-hover:opacity-100 transition-all duration-300 hidden md:flex items-center justify-center w-12 rounded-r-lg"
                >
                    <ChevronLeft size={32} />
                </button>

                <div
                    ref={rowRef}
                    className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth pb-4 px-2 -mx-2"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                    {movies.map(movie => (
                        <div key={movie._id} className="min-w-[200px] md:min-w-[240px] flex-none transition-transform hover:scale-105 duration-300">
                            <Link to={`/movie/${movie._id}`}>
                                <MovieCard
                                    movie={movie}
                                    hideContent // Optional: Pass a prop to hide detailed description in row view if needed, or stick to default
                                />
                            </Link>
                        </div>
                    ))}
                </div>

                <button
                    onClick={() => slide(500)}
                    className="absolute right-0 top-0 bottom-0 z-40 bg-black/50 hover:bg-black/70 text-white p-2 opacity-0 group-hover:opacity-100 transition-all duration-300 hidden md:flex items-center justify-center w-12 rounded-l-lg"
                >
                    <ChevronRight size={32} />
                </button>
            </div>
        </div>
    );
};
