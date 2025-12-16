import express from 'express';
import bcrypt from 'bcryptjs';
import Admin from '../models/Admin.js';
import { signToken, requireAuth } from '../middleware/auth.js';

const router = express.Router();

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ error: 'Missing credentials' });
    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(401).json({ error: 'Invalid credentials' });
    const ok = await bcrypt.compare(password, admin.password);
    if (!ok) return res.status(401).json({ error: 'Invalid credentials' });
    const token = signToken(admin);
    res.json({ token, admin: { id: admin._id, email: admin.email, name: admin.name } });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// Get current admin
router.get('/me', requireAuth, (req, res) => {
  res.json({ admin: req.admin });
});

export default router;
