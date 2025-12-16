import mongoose from 'mongoose';

const PricingSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    subtitle: { type: String },
    price: { type: Number, required: true },
    popular: { type: Boolean, default: false },
    badge: { type: String },
    features: [{ type: String }],
    interval: { type: String, default: 'Monthly' },
    order: { type: Number, default: 0 },
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model('Pricing', PricingSchema);

