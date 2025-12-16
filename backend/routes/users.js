const express = require('express');
const User = require('../models/User');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// Get user profile
router.get('/profile', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.userId)
      .select('-password')
      .populate('watchlist');
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get watchlist
router.get('/watchlist', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.userId).populate('watchlist');
    res.json(user.watchlist);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update watch history
router.post('/watch-history', authMiddleware, async (req, res) => {
  try {
    const { movieId, progress } = req.body;
    const user = await User.findById(req.userId);
    
    const historyIndex = user.watchHistory.findIndex(h => h.movieId.toString() === movieId);
    if (historyIndex >= 0) {
      user.watchHistory[historyIndex].progress = progress;
      user.watchHistory[historyIndex].watchedAt = new Date();
    } else {
      user.watchHistory.push({ movieId, progress });
    }
    
    await user.save();
    res.json({ message: 'Watch history updated' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
