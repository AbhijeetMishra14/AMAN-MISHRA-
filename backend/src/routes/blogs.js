import express from 'express';
import multer from 'multer';
import slugify from 'slugify';
import Blog from '../models/Blog.js';
import { requireAuth } from '../middleware/auth.js';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const router = express.Router();

// Get the directory path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadsDir = path.join(__dirname, '..', '..', 'uploads');

// Create uploads directory if it doesn't exist
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Setup multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadsDir),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + '-' + Math.random().toString(36).slice(2,8) + ext);
  }
});
const upload = multer({ 
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    const allowed = /\.(jpg|jpeg|png|gif|webp)$/i;
    if (allowed.test(file.originalname)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only JPG, PNG, GIF, WebP allowed'));
    }
  }
});

// Upload image
router.post('/upload', requireAuth, upload.single('image'), (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
    const url = `/uploads/${req.file.filename}`;
    res.json({ url, filename: req.file.filename });
  } catch (error) {
    res.status(500).json({ error: error.message || 'Upload failed' });
  }
});

// Create blog
router.post('/', requireAuth, async (req, res) => {
  try {
    const { title, content, summary, images, category, status, tableOfContents, metaTitle, metaDescription } = req.body;
    const slug = slugify(title || Date.now().toString(), { lower: true, strict: true });
    const blog = new Blog({ 
      title, 
      slug, 
      content, 
      summary, 
      images: images || [], 
      category: category || 'Uncategorized',
      status: status || 'draft',
      tableOfContents: tableOfContents || [],
      metaTitle,
      metaDescription
    });
    await blog.save();
    res.json(blog);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

// Update blog
router.put('/:id', requireAuth, async (req, res) => {
  try {
    const { title, content, summary, images, category, status, tableOfContents, metaTitle, metaDescription } = req.body;
    const blog = await Blog.findByIdAndUpdate(req.params.id, {
      title,
      content,
      summary,
      images,
      category,
      status,
      tableOfContents,
      metaTitle,
      metaDescription
    }, { new: true });
    if (!blog) return res.status(404).json({ error: 'Not found' });
    res.json(blog);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

// Delete
router.delete('/:id', requireAuth, async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    if (!blog) return res.status(404).json({ error: 'Not found' });
    res.json({ ok: true });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

// Public list
router.get('/', async (req, res) => {
  try {
    const items = await Blog.find({ status: 'published' }).sort({ createdAt: -1 });
    res.json(items);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

// Get by id or slug (with view tracking)
router.get('/:id', async (req, res) => {
  try {
    let blog;
    // Try to find by ID first
    if (req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
      blog = await Blog.findById(req.params.id);
    }
    // If not found and doesn't look like ID, try slug
    if (!blog) {
      blog = await Blog.findOne({ slug: req.params.id });
    }
    if (!blog) return res.status(404).json({ error: 'Blog not found' });
    
    // Increment view count only if published
    if (blog.status === 'published') {
      blog.views = (blog.views || 0) + 1;
      blog.lastViewedAt = new Date();
      await blog.save();
    }
    
    res.json(blog);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

export default router;