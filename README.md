# Netflix Clone

A full-stack Netflix clone built with React, Node.js, Express, and MongoDB.

## Features

- **User Authentication**: Register and login with JWT tokens
- **Movie Browsing**: Browse and search movies by title or genre
- **Featured Section**: Dynamic featured movie banner
- **Watchlist**: Add/remove movies from personal watchlist
- **Movie Details**: View detailed information about movies
- **Watch History**: Track watched movies and progress
- **Responsive Design**: Works seamlessly on desktop and mobile

## Project Structure

```
netflix-clone/
├── backend/
│   ├── models/
│   │   ├── User.js
│   │   └── Movie.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── movies.js
│   │   └── users.js
│   ├── middleware/
│   │   └── auth.js
│   ├── server.js
│   ├── package.json
│   └── .env
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── MovieCard.jsx
    │   │   └── Navbar.jsx
    │   ├── context/
    │   │   └── AuthContext.jsx
    │   ├── pages/
    │   │   ├── Home.jsx
    │   │   ├── Login.jsx
    │   │   ├── Register.jsx
    │   │   ├── MovieDetail.jsx
    │   │   └── Watchlist.jsx
    │   ├── api.js
    │   ├── App.jsx
    │   └── main.jsx
    ├── package.json
    ├── vite.config.js
    └── index.html
```

## Setup Instructions

### Prerequisites
- Node.js (v16+)
- MongoDB (local or Atlas)

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Configure `.env`:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/netflix-clone
JWT_SECRET=your_jwt_secret_key_change_in_production
NODE_ENV=development
```

4. Start the server:
```bash
npm run dev
```

The API will be available at `http://localhost:5000`

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user profile

### Movies
- `GET /api/movies` - Get all movies (with search/filter)
- `GET /api/movies/featured` - Get featured movies
- `GET /api/movies/:id` - Get movie details
- `POST /api/movies/:id/watchlist` - Add to watchlist
- `DELETE /api/movies/:id/watchlist` - Remove from watchlist

### Users
- `GET /api/users/profile` - Get user profile
- `GET /api/users/watchlist` - Get user's watchlist
- `POST /api/users/watch-history` - Update watch history

## Database Schema

### User
```javascript
{
  email: String (unique),
  password: String (hashed),
  name: String,
  profileImage: String,
  watchlist: [MovieId],
  watchHistory: [{
    movieId: ObjectId,
    watchedAt: Date,
    progress: Number
  }],
  createdAt: Date
}
```

### Movie
```javascript
{
  title: String,
  description: String,
  genre: [String],
  releaseDate: Date,
  rating: Number (0-10),
  duration: Number,
  posterUrl: String,
  backdropUrl: String,
  videoUrl: String,
  director: String,
  cast: [String],
  votes: Number,
  popularity: Number,
  featured: Boolean,
  createdAt: Date
}
```

## Technologies Used

### Backend
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **express-validator** - Input validation
- **CORS** - Cross-origin requests

### Frontend
- **React 18** - UI framework
- **React Router** - Routing
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Axios** - HTTP client
- **Lucide React** - Icons

## Getting Started with Sample Data

To add sample movies to your database, you can use MongoDB Compass or a script. Here's a sample movie:

```javascript
{
  title: "Inception",
  description: "A skilled thief who steals corporate secrets...",
  genre: ["Sci-Fi", "Action", "Thriller"],
  releaseDate: new Date("2010-07-16"),
  rating: 8.8,
  duration: 148,
  posterUrl: "https://image.tmdb.org/t/p/w500/...",
  backdropUrl: "https://image.tmdb.org/t/p/w1280/...",
  director: "Christopher Nolan",
  cast: ["Leonardo DiCaprio", "Marion Cotillard"],
  votes: 15000,
  popularity: 85,
  featured: true
}
```

## Next Steps

1. **Add real movie data** - Integrate with TMDB API
2. **Video streaming** - Implement video playback
3. **Payment integration** - Add subscription plans
4. **Social features** - Recommendations and reviews
5. **Mobile app** - React Native version

## License

MIT

## Support

For issues and questions, please create an issue in the repository.
# Netflix-clone
