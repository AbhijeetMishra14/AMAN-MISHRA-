import mongoose from 'mongoose';

const FAQSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: true,
    },
    answer: {
      type: String,
      required: true,
    },
    page: {
      type: String,
      enum: ['home', 'about', 'contact', 'career', 'pricing', 'wordpress-development', 'digital-marketing', 'seo-service', 'promotional-video', 'ui-ux-design'],
      default: 'home',
    },
    order: {
      type: Number,
      default: 0,
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model('FAQ', FAQSchema);