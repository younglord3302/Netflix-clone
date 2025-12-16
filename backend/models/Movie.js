const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  genre: [{
    type: String,
  }],
  releaseDate: {
    type: Date,
    required: true,
  },
  rating: {
    type: Number,
    min: 0,
    max: 10,
    default: 0,
  },
  duration: Number, // minutes
  posterUrl: {
    type: String,
    required: true,
  },
  backdropUrl: {
    type: String,
  },
  videoUrl: {
    type: String,
  },
  director: String,
  cast: [String],
  votes: {
    type: Number,
    default: 0,
  },
  popularity: {
    type: Number,
    default: 0,
  },
  featured: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Movie', movieSchema);
