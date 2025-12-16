import express from 'express';
import Portfolio from '../models/Portfolio.js';
import { requireAuth } from '../middleware/auth.js';

const router = express.Router();

// Get all portfolio items (public - active only)
router.get('/', async (req, res) => {
  try {
    const portfolios = await Portfolio.find({ active: true }).sort({ page: 1, order: 1 });
    res.json(portfolios);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch portfolio items' });
  }
});

// Get portfolio items by page (public - active only)
router.get('/page/:page', async (req, res) => {
  try {
    const portfolios = await Portfolio.find({ active: true, page: req.params.page }).sort({ order: 1 });
    res.json(portfolios);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch portfolio items' });
  }
});

// Get all portfolio items (admin - includes inactive)
router.get('/admin/all', requireAuth, async (req, res) => {
  try {
    const portfolios = await Portfolio.find().sort({ page: 1, order: 1 });
    res.json(portfolios);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch portfolio items' });
  }
});

// Get portfolio items for a specific page (admin - includes inactive)
router.get('/admin/page/:page', requireAuth, async (req, res) => {
  try {
    const portfolios = await Portfolio.find({ page: req.params.page }).sort({ order: 1 });
    res.json(portfolios);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch portfolio items' });
  }
});

// Get single portfolio item
router.get('/:id', async (req, res) => {
  try {
    const portfolio = await Portfolio.findById(req.params.id);
    if (!portfolio) {
      return res.status(404).json({ error: 'Portfolio item not found' });
    }
    res.json(portfolio);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch portfolio item' });
  }
});

// Create portfolio item (admin only)
router.post('/', requireAuth, async (req, res) => {
  try {
    const { title, description, page, imageUrl, websiteUrl, order, active } = req.body;
    if (!title || !page) {
      return res.status(400).json({ error: 'Title and page are required' });
    }
    const portfolio = new Portfolio({
      title,
      description,
      page,
      imageUrl,
      websiteUrl,
      order: order ?? (await Portfolio.countDocuments({ page })),
      active: active !== false,
    });
    await portfolio.save();
    res.status(201).json(portfolio);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create portfolio item' });
  }
});

// Update portfolio item (admin only)
router.put('/:id', requireAuth, async (req, res) => {
  try {
    const portfolio = await Portfolio.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!portfolio) {
      return res.status(404).json({ error: 'Portfolio item not found' });
    }
    res.json(portfolio);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update portfolio item' });
  }
});

// Delete portfolio item (admin only)
router.delete('/:id', requireAuth, async (req, res) => {
  try {
    const portfolio = await Portfolio.findByIdAndDelete(req.params.id);
    if (!portfolio) {
      return res.status(404).json({ error: 'Portfolio item not found' });
    }
    res.json({ message: 'Portfolio item deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete portfolio item' });
  }
});

export default router;
