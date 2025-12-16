import mongoose from 'mongoose';

const pageSectionSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ['hero', 'features', 'about', 'testimonials', 'faq', 'cta', 'pricing', 'clients'],
      required: true,
    },
    title: String,
    subtitle: String,
    description: String,
    order: {
      type: Number,
      default: 0,
    },
    visible: {
      type: Boolean,
      default: true,
    },
    // Hero specific
    heroImage: String,
    buttonText: String,
    buttonLink: String,
    backgroundColor: String,

    // Features specific
    features: [{
      title: String,
      description: String,
      icon: String,
      image: String,
    }],

    // Testimonials specific
    testimonials: [{
      name: String,
      role: String,
      company: String,
      text: String,
      image: String,
      rating: Number,
    }],

    // CTA specific
    ctaButtonText: String,
    ctaButtonLink: String,

    // Metadata
    backgroundColor: String,
    textColor: String,
    padding: String,
    customCSS: String,

    // Versioning
    version: {
      type: Number,
      default: 1,
    },
    versionHistory: [{
      version: Number,
      data: mongoose.Schema.Types.Mixed,
      createdAt: Date,
      createdBy: String,
    }],
  },
  { timestamps: true }
);

export default mongoose.model('PageSection', pageSectionSchema);
