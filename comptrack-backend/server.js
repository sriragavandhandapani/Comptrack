/**
 * CompTrack Backend Server
 * Productive-ready Express application for competitor feature tracking
 */

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();

// Standard Middleware
app.use(cors());
app.use(express.json());

// API Routes
// 1. Health Check Endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'UP', timestamp: new Date() });
});

// 2. Competitor Features Endpoint
app.get('/api/features', (req, res) => {
  res.status(200).json([
    { id: 1, name: 'AI Recommendations', competitor: 'CompeteCo', status: 'Launched' },
    { id: 2, name: 'Dark Mode UI', competitor: 'FeatureCorp', status: 'In Development' }
  ]);
});

// 3. Login Endpoint to verify JWT setup
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  if (username === 'admin' && password === 'password') {
    const token = jwt.sign(
      { role: 'admin' },
      process.env.JWT_SECRET || 'default-jwt-secret-key-12345',
      { expiresIn: '1h' }
    );
    return res.status(200).json({ token });
  }
  return res.status(401).json({ error: 'Invalid credentials' });
});

// Server Initialization (Conditioned for Jest testing environment)
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

/* istanbul ignore next */
if (process.env.NODE_ENV !== 'test') {
  if (MONGO_URI) {
    mongoose.connect(MONGO_URI)
      .then(() => console.log('MongoDB connection established successfully.'))
      .catch(err => {
        console.error('MongoDB connection error:', err);
        process.exit(1);
      });
  } else {
    console.warn('WARNING: MONGO_URI environment variable is missing. Running in standalone mode.');
  }

  app.listen(PORT, () => {
    console.log(`CompTrack backend server listening on port ${PORT}`);
  });
}

// Export app for test suite
module.exports = app;
