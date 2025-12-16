// Script to add sample movies to MongoDB
// Run: node seed.js (in backend directory with MongoDB running)

const mongoose = require('mongoose');
require('dotenv').config();

const Movie = require('./models/Movie');

const sampleMovies = [
  {
    title: "Inception",
    description: "A skilled thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
    genre: ["Sci-Fi", "Action", "Thriller"],
    releaseDate: new Date("2010-07-16"),
    rating: 8.8,
    duration: 148,
    posterUrl: "https://image.tmdb.org/t/p/w500/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg",
    backdropUrl: "https://image.tmdb.org/t/p/original/s3TBrRGB1jav7y4argnzPk96Uh0.jpg",
    videoUrl: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    director: "Christopher Nolan",
    cast: ["Leonardo DiCaprio", "Marion Cotillard", "Tom Hardy", "Joseph Gordon-Levitt"],
    votes: 15000,
    popularity: 85,
    featured: true,
  },
  {
    title: "The Dark Knight",
    description: "When the menace known as the Joker wreaks havoc on Gotham, Batman must confront his greatest psychological challenge.",
    genre: ["Action", "Crime", "Drama"],
    releaseDate: new Date("2008-07-18"),
    rating: 9.0,
    duration: 152,
    posterUrl: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
    backdropUrl: "https://image.tmdb.org/t/p/original/nMKdUUepR0i5zn0y1T4CsSB5chy.jpg",
    videoUrl: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    director: "Christopher Nolan",
    cast: ["Christian Bale", "Heath Ledger", "Aaron Eckhart"],
    votes: 20000,
    popularity: 95,
    featured: true,
  },
  {
    title: "Interstellar",
    description: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
    genre: ["Sci-Fi", "Drama", "Adventure"],
    releaseDate: new Date("2014-11-07"),
    rating: 8.6,
    duration: 169,
    posterUrl: "https://image.tmdb.org/t/p/w500/gEU2QniL6C8z1dY4kdCFAQM06IW.jpg",
    backdropUrl: "https://image.tmdb.org/t/p/original/xJHokMbljvjADYdit5fK5VQsXEG.jpg",
    videoUrl: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    director: "Christopher Nolan",
    cast: ["Matthew McConaughey", "Anne Hathaway", "Jessica Chastain"],
    votes: 18000,
    popularity: 90,
    featured: true,
  },
  {
    title: "Pulp Fiction",
    description: "The lives of two mob hitmen, a boxer, a gangster and his wife intertwine in four tales of violence and redemption.",
    genre: ["Crime", "Drama"],
    releaseDate: new Date("1994-10-14"),
    rating: 8.9,
    duration: 154,
    posterUrl: "https://image.tmdb.org/t/p/w500/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg",
    backdropUrl: "https://image.tmdb.org/t/p/original/suaEOtk1916guXlVTybVStSeIl.jpg",
    videoUrl: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    director: "Quentin Tarantino",
    cast: ["John Travolta", "Uma Thurman", "Samuel L. Jackson"],
    votes: 16000,
    popularity: 80,
    featured: false,
  },
  {
    title: "The Shawshank Redemption",
    description: "Two imprisoned men bond over a number of years, finding solace in a prison where they spend decades.",
    genre: ["Drama"],
    releaseDate: new Date("1994-09-23"),
    rating: 9.3,
    duration: 142,
    posterUrl: "https://image.tmdb.org/t/p/w500/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg",
    backdropUrl: "https://image.tmdb.org/t/p/original/kXfqcdQKsToO0OUXHcrrNCHDBzO.jpg",
    videoUrl: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    director: "Frank Darabont",
    cast: ["Tim Robbins", "Morgan Freeman"],
    votes: 22000,
    popularity: 92,
    featured: false,
  },
  {
    title: "The Godfather",
    description: "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his youngest son.",
    genre: ["Crime", "Drama"],
    releaseDate: new Date("1972-03-24"),
    rating: 9.2,
    duration: 175,
    posterUrl: "https://image.tmdb.org/t/p/w500/3bhkrj58Vtu7enYsRolD1fZdja1.jpg",
    backdropUrl: "https://image.tmdb.org/t/p/original/rSPw7tgCH9c6NqICZef4kZjFOQ5.jpg",
    videoUrl: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    director: "Francis Ford Coppola",
    cast: ["Marlon Brando", "Al Pacino", "James Caan"],
    votes: 21000,
    popularity: 97,
    featured: false,
  },
  {
    title: "Forrest Gump",
    description: "The presidencies of Kennedy and Johnson unfold from the perspective of a simple man with a low IQ but a good heart.",
    genre: ["Drama", "Romance"],
    releaseDate: new Date("1994-07-06"),
    rating: 8.8,
    duration: 142,
    posterUrl: "https://image.tmdb.org/t/p/w500/saHP97rTPS5eLmrLQEcANmKrsFl.jpg",
    backdropUrl: "https://image.tmdb.org/t/p/original/hZkgoQYus5vegHoetLkCJzb17zJ.jpg",
    videoUrl: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    director: "Robert Zemeckis",
    cast: ["Tom Hanks", "Sally Field", "Gary Sinise"],
    votes: 17000,
    popularity: 88,
    featured: false,
  },
  {
    title: "The Matrix",
    description: "A computer hacker learns about the true nature of his reality and his role in the war against its controllers.",
    genre: ["Sci-Fi", "Action"],
    releaseDate: new Date("1999-03-31"),
    rating: 8.7,
    duration: 136,
    posterUrl: "https://image.tmdb.org/t/p/w500/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg",
    backdropUrl: "https://image.tmdb.org/t/p/original/5OB54avXLS63kU6980N1lgqG5y.jpg",
    videoUrl: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    director: "Lana Wachowski, Lilly Wachowski",
    cast: ["Keanu Reeves", "Laurence Fishburne", "Carrie-Anne Moss"],
    votes: 14000,
    popularity: 85,
    featured: false,
  },
];

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(async () => {
    console.log('MongoDB connected');

    try {
      await Movie.deleteMany({});
      console.log('Existing movies deleted');

      await Movie.insertMany(sampleMovies);
      console.log('Sample movies added successfully!');

      process.exit(0);
    } catch (err) {
      console.error('Error seeding database:', err);
      process.exit(1);
    }
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });
