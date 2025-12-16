const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  profileImage: {
    type: String,
    default: 'https://via.placeholder.com/150',
  },
  watchlist: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Movie',
  }],
  watchHistory: [{
    movieId: mongoose.Schema.Types.ObjectId,
    watchedAt: {
      type: Date,
      default: Date.now,
    },
    progress: Number, // minutes watched
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Compare password method
userSchema.methods.comparePassword = async function(password) {
  return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('User', userSchema);
