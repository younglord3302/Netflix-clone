import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { movieService } from '../api';
import { ArrowLeft } from 'lucide-react';

export const Watch = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMovie = async () => {
            try {
                const res = await movieService.getById(id);
                setMovie(res.data);
            } catch (err) {
                console.error(err);
                // Optionally redirect or show error
            } finally {
                setLoading(false);
            }
        };

        fetchMovie();
    }, [id]);

    if (loading) return <div className="bg-black h-screen text-white flex items-center justify-center">Loading...</div>;
    if (!movie) return <div className="bg-black h-screen text-white flex items-center justify-center">Movie not found</div>;

    return (
        <div className="w-screen h-screen bg-black overflow-hidden relative">
            {/* Back Button Overlay */}
            <div className="absolute top-4 left-4 z-50">
                <button
                    onClick={() => navigate(-1)}
                    className="text-white hover:text-gray-300 transition flex items-center gap-2 cursor-pointer"
                >
                    <ArrowLeft size={40} />
                    <span className="text-xl font-semibold">Back</span>
                </button>
            </div>

            {/* Video Player */}
            <video
                className="w-full h-full object-contain"
                controls
                autoPlay
                controlsList="nodownload" // Basic protection
            >
                <source src={movie.videoUrl} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
        </div>
    );
};
