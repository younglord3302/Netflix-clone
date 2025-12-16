# Netflix Clone - Quick Start Guide

## Installation

### Step 1: Backend Setup
```bash
cd netflix-clone/backend
npm install
```

Create `.env` file in backend directory with:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/netflix-clone
JWT_SECRET=your_jwt_secret_key_here
NODE_ENV=development
```

### Step 2: MongoDB
Make sure MongoDB is running. If using local MongoDB:
```bash
mongod
```

Or use MongoDB Atlas connection string in `.env`

### Step 3: Seed Sample Data (Optional)
```bash
node seed.js
```

### Step 4: Start Backend
```bash
npm run dev
```

Backend will run on http://localhost:5000

### Step 5: Frontend Setup
```bash
cd ../frontend
npm install
npm run dev
```

Frontend will run on http://localhost:3000

## Features Walkthrough

### Authentication
1. Go to http://localhost:3000
2. Click "Sign Up" or "Sign In"
3. Create account with email/password
4. Automatically logged in after registration

### Browse Movies
- Home page displays featured movie and movie grid
- Search movies using the search bar
- Click on movie card to view details

### Watchlist
- Click heart icon on movie card to add/remove from watchlist
- View all watchlist items on "My List" page
- Watchlist is saved to user account

### Movie Details
- View comprehensive movie information
- See rating, duration, genre, cast
- Add/remove from watchlist
- Play button ready for video integration

## Common Issues

### MongoDB Connection Error
- Ensure MongoDB is running locally or use Atlas connection string
- Update MONGODB_URI in .env

### CORS Error
- Already handled by express-cors
- Check backend is running on port 5000

### Authentication Token Issues
- Clear browser localStorage and try logging in again
- Check JWT_SECRET matches between sessions

## Next Development Steps

1. **Real Movie Data**: Integrate TMDB API
2. **Video Playback**: Add HLS video streaming
3. **Advanced Features**: Recommendations, reviews, ratings
4. **Performance**: Implement caching and pagination
5. **Deployment**: Deploy to Heroku/Vercel

## Useful Resources

- [MongoDB Documentation](https://docs.mongodb.com)
- [Express.js Guide](https://expressjs.com)
- [React Documentation](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [TMDB API](https://www.themoviedb.org/settings/api)
