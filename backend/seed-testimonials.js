#!/usr/bin/env node

/**
 * Seed Testimonials Script
 * Seeds the database with initial testimonials for all service pages
 * Run: node backend/seed-testimonials.js
 */

import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

// Import model
import Testimonial from './src/models/Testimonial.js';

const testimonialData = [
  // UI/UX Design Testimonials
  {
    text: 'We were very impressed with the pace Makura Creations team worked. We had only an idea but the UI/UX team at Makura put that idea into reality in just a couple of days. Not only was the product delivered ahead of time, it was also unique and had a certain charm to it. Visually, functionally and experience-wise the site was transformed for the better. A great team.',
    authorName: 'Seed Financial Academy',
    authorCompany: 'Seed Financial Academy',
    authorAvatar: '👥',
    page: 'ui-ux-design',
    order: 1,
    active: true,
    rating: 5,
  },
  {
    text: 'Makura Creations has a talented team of professionals working for them. I was informed about them through a client of mine and have never looked back since. I have still employed them and have no complaints about them. What started out as a UI/UX change turned into an all-out service including SEO, and social media advertising, and it was the best.',
    authorName: 'Varicon',
    authorCompany: 'Varicon',
    authorAvatar: '👥',
    page: 'ui-ux-design',
    order: 2,
    active: true,
    rating: 5,
  },
  {
    text: 'When I first came to Makura, I didn\'t know what exactly was UI/UX and its importance. I was using an outdated design and it was affecting my business. Fortunately for me, I found Makura Creations. They advised me to change my website and after hearing their pitch, I was convinced. Now my website is fresh, and also feels easy to',
    authorName: 'Nepal Travel Adventure',
    authorCompany: 'Nepal Travel Adventure',
    authorAvatar: '👥',
    page: 'ui-ux-design',
    order: 3,
    active: true,
    rating: 5,
  },

  // WordPress Development Testimonials
  {
    text: 'Choosing Aman Mishra to build my WordPress website while I spent time organizing my resources and crafting narratives was undoubtedly the right choice. The end product is a website that looks professional and has all the newest features available. In conclusion, I am overjoyed to have partnered with Aman Mishra.',
    authorName: 'Chandan Goopta',
    authorCompany: 'RAIN',
    authorAvatar: 'CG',
    page: 'wordpress-development',
    order: 1,
    active: true,
    rating: 5,
  },
  {
    text: 'Aman Mishra was easy and quick to work with. There were on schedule, had wonderful communication throughout, and created a fantastic WordPress website that was customized to my needs. Extremely happy with their assistance!',
    authorName: 'Samyukta Dawadi',
    authorCompany: 'UWS Nepal',
    authorAvatar: 'SD',
    page: 'wordpress-development',
    order: 2,
    active: true,
    rating: 5,
  },
  {
    text: 'The work that Aman Mishra made on my WordPress website was superb. They were punctual, professional, and responsive. The user-friendly design has greatly increased the traffic to my website. I heartily endorse their services!',
    authorName: 'Arsheena Piya',
    authorCompany: 'Piya Plastics',
    authorAvatar: 'AP',
    page: 'wordpress-development',
    order: 3,
    active: true,
    rating: 5,
  },

  // Promotional Video Testimonials
  {
    text: 'Not only does Makura Creations have a good script writer and videographer, their post production editing is also top-notch. The editors gladly accepted any changes we had and provided the updated video swiftly. The pacing, audio, color selection are all perfect for each respective video delivery and visual presentation are something',
    authorName: 'Hello Topik',
    authorCompany: 'Hello Topik',
    authorAvatar: '👥',
    page: 'promotional-video',
    order: 1,
    active: true,
    rating: 5,
  },
  {
    text: 'The best way to engage an audience is with promotional videos and no one does it better than Makura Creations. My business needed a bit of storytelling to bring in more clients and the team at Makura Creations were just perfect for the job. The video led to new leads and brought in more customers. They subtly showcased my products wit',
    authorName: 'Seed Finance',
    authorCompany: 'Seed Finance',
    authorAvatar: '👥',
    page: 'promotional-video',
    order: 2,
    active: true,
    rating: 5,
  },
  {
    text: 'Edupro needed a professional promotional video to showcase our online learning platform. Makura Creations delivered beyond expectations. The entire process from concept to final delivery was seamless and professional.',
    authorName: 'Edupro',
    authorCompany: 'Edupro',
    authorAvatar: '👥',
    page: 'promotional-video',
    order: 3,
    active: true,
    rating: 5,
  },
];

async function seedTestimonials() {
  try {
    const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/aman_mishra';
    
    console.log('🔗 Connecting to MongoDB...');
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ Connected to MongoDB');

    // Check if testimonials already exist
    const existingCount = await Testimonial.countDocuments();
    if (existingCount > 0) {
      console.log(`⚠️  Found ${existingCount} existing testimonials`);
      console.log('Skipping seed to avoid duplicates. Delete testimonials first if you want to reseed.');
      process.exit(0);
    }

    console.log('📝 Seeding testimonials...');
    await Testimonial.insertMany(testimonialData);
    console.log(`✅ Successfully seeded ${testimonialData.length} testimonials`);

    // Show summary by page
    const summary = {};
    for (const page of ['home', 'ui-ux-design', 'wordpress-development', 'promotional-video']) {
      const count = await Testimonial.countDocuments({ page });
      summary[page] = count;
    }
    
    console.log('\n📊 Testimonials by page:');
    Object.entries(summary).forEach(([page, count]) => {
      console.log(`   ${page}: ${count} testimonials`);
    });

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding testimonials:', error.message || error);
    process.exit(1);
  }
}

seedTestimonials();
