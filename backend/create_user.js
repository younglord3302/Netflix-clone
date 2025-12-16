require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');

async function createDemoUser() {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const email = 'demo@netflix.local';
    const password = 'Password123!';
    const name = 'Demo User';

    let user = await User.findOne({ email });
    if (user) {
      console.log('User already exists:', email);
      process.exit(0);
    }

    user = new User({ email, password, name });
    await user.save();
    console.log('Demo user created:');
    console.log('  email:', email);
    console.log('  password:', password);
    process.exit(0);
  } catch (err) {
    console.error('Error creating demo user:', err);
    process.exit(1);
  }
}

createDemoUser();
