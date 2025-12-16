const express = require('express');
const Movie = require('../models/Movie');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// Get all movies
router.get('/', async (req, res) => {
  try {
    const { search, genre, sort = '-popularity' } = req.query;
    let query = {};

    if (search) {
      query.title = { $regex: search, $options: 'i' };
    }
    if (genre) {
      query.genre = genre;
    }

    const movies = await Movie.find(query).sort(sort).limit(50);
    res.json(movies);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get featured movies
router.get('/featured', async (req, res) => {
  try {
    const movies = await Movie.find({ featured: true }).limit(10);
    res.json(movies);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get movie by ID
router.get('/:id', async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) {
      return res.status(404).json({ message: 'Movie not found' });
    }
    res.json(movie);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Add to watchlist
router.post('/:id/watchlist', authMiddleware, async (req, res) => {
  try {
    const User = require('../models/User');
    const user = await User.findById(req.userId);
    
    if (!user.watchlist.includes(req.params.id)) {
      user.watchlist.push(req.params.id);
      await user.save();
    }
    
    res.json({ message: 'Added to watchlist' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Remove from watchlist
router.delete('/:id/watchlist', authMiddleware, async (req, res) => {
  try {
    const User = require('../models/User');
    const user = await User.findById(req.userId);
    user.watchlist = user.watchlist.filter(id => id.toString() !== req.params.id);
    await user.save();
    
    res.json({ message: 'Removed from watchlist' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
