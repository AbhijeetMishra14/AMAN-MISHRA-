import express from 'express';
import FAQ from '../models/FAQ.js';
import { requireAuth } from '../middleware/auth.js';

const router = express.Router();

// Get all FAQs (public - home page)
router.get('/', async (req, res) => {
  try {
    const faqs = await FAQ.find({ active: true, page: 'home' }).sort({ order: 1 });
    res.json(faqs);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch FAQs' });
  }
});

// Get FAQs by page
router.get('/page/:page', async (req, res) => {
  try {
    const faqs = await FAQ.find({ active: true, page: req.params.page }).sort({ order: 1 });
    res.json(faqs);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch FAQs' });
  }
});

// Get all FAQs (including inactive) - admin
router.get('/admin/all', requireAuth, async (req, res) => {
  try {
    const faqs = await FAQ.find().sort({ page: 1, order: 1 });
    res.json(faqs);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch FAQs' });
  }
});

// Get FAQs for a specific page (admin - includes inactive)
router.get('/admin/page/:page', requireAuth, async (req, res) => {
  try {
    const faqs = await FAQ.find({ page: req.params.page }).sort({ order: 1 });
    res.json(faqs);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch FAQs' });
  }
});

// Get single FAQ
router.get('/:id', async (req, res) => {
  try {
    const faq = await FAQ.findById(req.params.id);
    if (!faq) {
      return res.status(404).json({ error: 'FAQ not found' });
    }
    res.json(faq);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch FAQ' });
  }
});

// Create FAQ (admin only)
router.post('/', requireAuth, async (req, res) => {
  try {
    const { question, answer, order, page, active } = req.body;
    if (!question || !answer) {
      return res.status(400).json({ error: 'Question and answer are required' });
    }
    const faq = new FAQ({
      question,
      answer,
      page: page || 'home',
      order: order ?? (await FAQ.countDocuments()),
      active: active !== false,
    });
    await faq.save();
    res.status(201).json(faq);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create FAQ' });
  }
});

// Update FAQ (admin only)
router.put('/:id', requireAuth, async (req, res) => {
  try {
    const faq = await FAQ.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!faq) {
      return res.status(404).json({ error: 'FAQ not found' });
    }
    res.json(faq);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update FAQ' });
  }
});

// Delete FAQ (admin only)
router.delete('/:id', requireAuth, async (req, res) => {
  try {
    const faq = await FAQ.findByIdAndDelete(req.params.id);
    if (!faq) {
      return res.status(404).json({ error: 'FAQ not found' });
    }
    res.json({ success: true, message: 'FAQ deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete FAQ' });
  }
});

export default router;
