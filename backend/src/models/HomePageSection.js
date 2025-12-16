import mongoose from 'mongoose';

const HomePageSectionSchema = new mongoose.Schema(
  {
    sectionId: {
      type: String,
      required: true,
      unique: true,
      enum: ['hero', 'about', 'cta'],
    },
    hero: {
      title: { type: String },
      subtitle: { type: String },
      buttonText: { type: String },
      buttonLink: { type: String },
    },
    about: {
      title: { type: String },
      subtitle: { type: String },
      description: { type: String },
      buttonText: { type: String },
      buttonLink: { type: String },
    },
    cta: {
      title: { type: String },
      subtitle: { type: String },
      buttonText: { type: String },
    },
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model('HomePageSection', HomePageSectionSchema);
