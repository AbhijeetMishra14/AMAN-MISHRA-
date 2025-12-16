import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import path from 'path';
import { fileURLToPath } from 'url';

// Import routes
import contactRoutes from './routes/contact.js';
import quoteRoutes from './routes/quote.js';
import projectRoutes from './routes/project.js';
import reviewsRoutes from './routes/reviews.js';
import adminRoutes from './routes/admin.js';
import blogRoutes from './routes/blogs.js';
import clientRoutes from './routes/clients.js';
import pricingRoutes from './routes/pricing.js';
import jobsRoutes from './routes/jobs.js';
import faqRoutes from './routes/faq.js';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve uploaded files
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));

// Admin, Blog & Client routes
app.use('/api/admin', adminRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/clients', clientRoutes);
app.use('/api/pricing', pricingRoutes);
app.use('/api/jobs', jobsRoutes);
app.use('/api/faq', faqRoutes);

// Routes
app.use('/api/contact', contactRoutes);
app.use('/api/quote', quoteRoutes);
app.use('/api/project', projectRoutes);
app.use('/api/reviews', reviewsRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Aman Mishra Backend is running',
    timestamp: new Date().toISOString()
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ 
    error: 'Internal Server Error',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
  });
});

// Connect to MongoDB and start server
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/aman_mishra';
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    console.log('✅ Connected to MongoDB');
    // Seed default admin if not present
    try {
      const { seedDefaultAdmin } = await import('./utils/seedAdmin.js');
      await seedDefaultAdmin();
    } catch (e) {
      console.warn('⚠️  Could not run seedAdmin:', e.message || e);
    }

    app.listen(PORT, () => {
      console.log(`🚀 Backend server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err.message || err);
    process.exit(1);
  });
