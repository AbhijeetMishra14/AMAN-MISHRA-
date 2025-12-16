import jwt from 'jsonwebtoken';
import Admin from '../models/Admin.js';

const JWT_SECRET = process.env.JWT_SECRET || 'change_this_secret';

export const requireAuth = async (req, res, next) => {
  try {
    const auth = req.headers.authorization;
    if (!auth || !auth.startsWith('Bearer ')) return res.status(401).json({ error: 'Unauthorized' });
    const token = auth.split(' ')[1];
    const payload = jwt.verify(token, JWT_SECRET);
    const admin = await Admin.findById(payload.id).select('-password');
    if (!admin) return res.status(401).json({ error: 'Unauthorized' });
    req.admin = admin;
    next();
  } catch (e) {
    return res.status(401).json({ error: 'Invalid token' });
  }
};

export const signToken = (admin) => {
  return jwt.sign({ id: admin._id, email: admin.email }, JWT_SECRET, { expiresIn: '7d' });
};
