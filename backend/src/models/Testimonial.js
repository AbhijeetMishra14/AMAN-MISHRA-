import mongoose from 'mongoose';

const testimonialSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
    },
    authorName: {
      type: String,
      required: true,
    },
    authorCompany: {
      type: String,
      required: true,
    },
    authorAvatar: {
      type: String,
      default: '',
    },
    page: {
      type: String,
      enum: ['google-dta', 'ui-ux-design', 'wordpress-development', 'promotional-video', 'seo-service'],
      default: 'google-dta',
    },
    order: {
      type: Number,
      default: 0,
    },
    active: {
      type: Boolean,
      default: true,
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
      default: 5,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

export default mongoose.model('Testimonial', testimonialSchema);