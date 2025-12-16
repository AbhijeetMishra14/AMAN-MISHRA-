import mongoose from 'mongoose';

const PortfolioSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: '',
    },
    page: {
      type: String,
      enum: ['seo-service', 'wordpress-development', 'promotional-video', 'ui-ux-design'],
      required: true,
    },
    imageUrl: {
      type: String,
      default: '',
    },
    websiteUrl: {
      type: String,
      default: '',
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

export default mongoose.model('Portfolio', PortfolioSchema);
