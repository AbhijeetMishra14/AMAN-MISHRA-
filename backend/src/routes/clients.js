import express from 'express';
import { requireAuth } from '../middleware/auth.js';
import ClientLogo from '../models/ClientLogo.js';

const router = express.Router();

// Public: list client logos (sorted)
router.get('/', async (req, res) => {
  try {
    const logos = await ClientLogo.find().sort({ order: 1, createdAt: -1 });
    res.json(logos);
  } catch (e) {
    res.status(500).json({ error: e.message || 'Failed to load client logos' });
  }
});

// Admin: create client logo
router.post('/', requireAuth, async (req, res) => {
  try {
    const { name, imageUrl, website } = req.body;
    if (!name || !imageUrl) {
      return res.status(400).json({ error: 'Name and imageUrl are required' });
    }
    const existingCount = await ClientLogo.countDocuments();
    const logo = new ClientLogo({
      name,
      imageUrl,
      website,
      order: existingCount,
    });
    await logo.save();
    res.json(logo);
  } catch (e) {
    res.status(500).json({ error: e.message || 'Failed to create client logo' });
  }
});

// Admin: delete client logo
router.delete('/:id', requireAuth, async (req, res) => {
  try {
    const deleted = await ClientLogo.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: 'Client logo not found' });
    }
    res.json({ ok: true });
  } catch (e) {
    res.status(500).json({ error: e.message || 'Failed to delete client logo' });
  }
});

export default router;

