import express from 'express';
import Job from '../models/Job.js';
import { requireAuth } from '../middleware/auth.js';

const router = express.Router();

// Public: list active jobs
router.get('/', async (req, res) => {
  try {
    const jobs = await Job.find({ active: true }).sort({ order: 1, createdAt: -1 });
    res.json(jobs);
  } catch (e) {
    res.status(500).json({ error: e.message || 'Failed to load jobs' });
  }
});

// Admin: list all jobs
router.get('/admin/all', requireAuth, async (req, res) => {
  try {
    const jobs = await Job.find().sort({ order: 1, createdAt: -1 });
    res.json(jobs);
  } catch (e) {
    res.status(500).json({ error: e.message || 'Failed to load jobs' });
  }
});

// Admin: create job
router.post('/', requireAuth, async (req, res) => {
  try {
    const { title, location, type, description, order, active } = req.body;
    if (!title) {
      return res.status(400).json({ error: 'Title is required' });
    }
    const count = await Job.countDocuments();
    const job = new Job({
      title,
      location,
      type,
      description,
      order: order ?? count,
      active: active !== false,
    });
    await job.save();
    res.json(job);
  } catch (e) {
    res.status(500).json({ error: e.message || 'Failed to create job' });
  }
});

// Admin: update job
router.put('/:id', requireAuth, async (req, res) => {
  try {
    const job = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!job) return res.status(404).json({ error: 'Job not found' });
    res.json(job);
  } catch (e) {
    res.status(500).json({ error: e.message || 'Failed to update job' });
  }
});

// Admin: delete job
router.delete('/:id', requireAuth, async (req, res) => {
  try {
    const job = await Job.findByIdAndDelete(req.params.id);
    if (!job) return res.status(404).json({ error: 'Job not found' });
    res.json({ ok: true });
  } catch (e) {
    res.status(500).json({ error: e.message || 'Failed to delete job' });
  }
});

export default router;


