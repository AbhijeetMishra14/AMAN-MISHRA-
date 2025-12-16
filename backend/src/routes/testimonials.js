import express from 'express';
import Testimonial from '../models/Testimonial.js';
import { requireAuth as protect } from '../middleware/auth.js';

const router = express.Router();

// Get all testimonials (public)
router.get('/', async (req, res) => {
  try {
    const testimonials = await Testimonial.find({ active: true }).sort({ order: 1 });
    res.json(testimonials);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get testimonials for specific page (public)
router.get('/page/:page', async (req, res) => {
  try {
    const testimonials = await Testimonial.find({
      page: req.params.page,
      active: true,
    }).sort({ order: 1 });
    res.json(testimonials);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all testimonials (admin - including inactive)
router.get('/admin/all', protect, async (req, res) => {
  try {
    const testimonials = await Testimonial.find().sort({ order: 1 });
    res.json(testimonials);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get testimonials for specific page (admin - including inactive)
router.get('/admin/page/:page', protect, async (req, res) => {
  try {
    const testimonials = await Testimonial.find({ page: req.params.page }).sort({ order: 1 });
    res.json(testimonials);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create testimonial
router.post('/', protect, async (req, res) => {
  const testimonial = new Testimonial({
    text: req.body.text,
    authorName: req.body.authorName,
    authorCompany: req.body.authorCompany,
    authorAvatar: req.body.authorAvatar || '',
    page: req.body.page || 'home',
    order: req.body.order || 0,
    active: req.body.active !== false,
    rating: req.body.rating || 5,
  });

  try {
    const newTestimonial = await testimonial.save();
    res.status(201).json(newTestimonial);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update testimonial
router.put('/:id', protect, async (req, res) => {
  try {
    const testimonial = await Testimonial.findById(req.params.id);
    if (!testimonial) {
      return res.status(404).json({ message: 'Testimonial not found' });
    }

    if (req.body.text) testimonial.text = req.body.text;
    if (req.body.authorName) testimonial.authorName = req.body.authorName;
    if (req.body.authorCompany) testimonial.authorCompany = req.body.authorCompany;
    if (req.body.authorAvatar !== undefined) testimonial.authorAvatar = req.body.authorAvatar;
    if (req.body.page) testimonial.page = req.body.page;
    if (req.body.order !== undefined) testimonial.order = req.body.order;
    if (req.body.active !== undefined) testimonial.active = req.body.active;
    if (req.body.rating) testimonial.rating = req.body.rating;

    const updatedTestimonial = await testimonial.save();
    res.json(updatedTestimonial);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Toggle testimonial visibility
router.patch('/:id/toggle', protect, async (req, res) => {
  try {
    const testimonial = await Testimonial.findById(req.params.id);
    if (!testimonial) {
      return res.status(404).json({ message: 'Testimonial not found' });
    }
    testimonial.active = !testimonial.active;
    const updatedTestimonial = await testimonial.save();
    res.json(updatedTestimonial);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete testimonial
router.delete('/:id', protect, async (req, res) => {
  try {
    const testimonial = await Testimonial.findByIdAndDelete(req.params.id);
    if (!testimonial) {
      return res.status(404).json({ message: 'Testimonial not found' });
    }
    res.json({ message: 'Testimonial deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Reorder testimonials
router.put('/reorder/all', protect, async (req, res) => {
  try {
    const { testimonials } = req.body;
    
    for (const item of testimonials) {
      await Testimonial.findByIdAndUpdate(item.id, { order: item.order });
    }
    
    const updated = await Testimonial.find().sort({ order: 1 });
    res.json(updated);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default router;