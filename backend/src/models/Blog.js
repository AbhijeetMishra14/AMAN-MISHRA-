import mongoose from 'mongoose';

const BlogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  summary: { type: String },
  content: { type: String },
  images: [String],
  category: { type: String, default: 'Uncategorized' },
  author: { type: String, default: 'Admin' },
  status: { type: String, enum: ['draft','published'], default: 'draft' },
  views: { type: Number, default: 0 },
  lastViewedAt: { type: Date },
  tableOfContents: [{
    id: String,
    level: Number,
    title: String
  }]
}, { timestamps: true });

export default mongoose.model('Blog', BlogSchema);