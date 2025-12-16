import express from 'express';
import Pricing from '../models/Pricing.js';
import { requireAuth } from '../middleware/auth.js';

const router = express.Router();

// Public: list active pricing plans sorted by order then createdAt
router.get('/', async (req, res) => {
  try {
    const plans = await Pricing.find({ active: true }).sort({ order: 1, createdAt: -1 });
    res.json(plans);
  } catch (e) {
    res.status(500).json({ error: e.message || 'Failed to load pricing plans' });
  }
});

// Admin: list all plans
router.get('/all', requireAuth, async (req, res) => {
  try {
    const plans = await Pricing.find().sort({ order: 1, createdAt: -1 });
    res.json(plans);
  } catch (e) {
    res.status(500).json({ error: e.message || 'Failed to load pricing plans' });
  }
});

// Admin: create plan
router.post('/', requireAuth, async (req, res) => {
  try {
    const { name, subtitle, price, popular, badge, features, interval, order, active } = req.body;
    if (!name || price === undefined) {
      return res.status(400).json({ error: 'Name and price are required' });
    }
    const count = await Pricing.countDocuments();
    const plan = new Pricing({
      name,
      subtitle,
      price,
      popular: !!popular,
      badge,
      features: features || [],
      interval: interval || 'Monthly',
      order: order ?? count,
      active: active !== false,
    });
    await plan.save();
    res.json(plan);
  } catch (e) {
    res.status(500).json({ error: e.message || 'Failed to create pricing plan' });
  }
});

// Admin: update plan
router.put('/:id', requireAuth, async (req, res) => {
  try {
    const plan = await Pricing.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!plan) return res.status(404).json({ error: 'Pricing plan not found' });
    res.json(plan);
  } catch (e) {
    res.status(500).json({ error: e.message || 'Failed to update pricing plan' });
  }
});

// Admin: delete plan
router.delete('/:id', requireAuth, async (req, res) => {
  try {
    const plan = await Pricing.findByIdAndDelete(req.params.id);
    if (!plan) return res.status(404).json({ error: 'Pricing plan not found' });
    res.json({ ok: true });
  } catch (e) {
    res.status(500).json({ error: e.message || 'Failed to delete pricing plan' });
  }
});

export default router;

