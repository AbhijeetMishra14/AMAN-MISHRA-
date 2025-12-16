import mongoose from 'mongoose';

const ClientLogoSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    imageUrl: { type: String, required: true },
    website: { type: String },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model('ClientLogo', ClientLogoSchema);

