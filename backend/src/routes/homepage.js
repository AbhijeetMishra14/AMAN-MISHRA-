import express from 'express';
import HomePageSection from '../models/HomePageSection.js';
import { requireAuth } from '../middleware/auth.js';

const router = express.Router();

// Get all homepage sections
router.get('/', async (req, res) => {
  try {
    const sections = await HomePageSection.findOne({ sectionId: 'all' });
    if (!sections) {
      // Return default sections if none exist
      return res.json({
        hero: {
          title: 'Connecting Ideas Digitally – We\'ve Done It for 5 Years!',
          subtitle: 'We are deeply committed to delivering exceptional work with unwavering dedication and passion.',
          buttonText: 'Check Out What We Offer →',
          buttonLink: '/contact',
        },
        about: {
          title: 'Aman Mishra: SEO Expert & Software Engineer',
          subtitle: 'With over 4 years of experience...',
          description: 'Full Stack Developer delivering cutting-edge solutions.',
          buttonText: 'Explore More',
          buttonLink: '/about',
        },
        cta: {
          title: 'Ready to Transform Your Digital Presence?',
          subtitle: 'Let\'s discuss your project',
          buttonText: 'Start your project →',
        },
      });
    }
    res.json(sections);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch homepage sections' });
  }
});

// Get specific section
router.get('/:sectionId', async (req, res) => {
  try {
    const section = await HomePageSection.findOne({ sectionId: req.params.sectionId });
    if (!section) {
      return res.status(404).json({ error: 'Section not found' });
    }
    res.json(section);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch section' });
  }
});

// Update section (admin only)
router.put('/:sectionId', requireAuth, async (req, res) => {
  try {
    const { sectionId } = req.params;
    const updateData = req.body;

    let section = await HomePageSection.findOne({ sectionId });
    
    if (!section) {
      section = new HomePageSection({ sectionId, ...updateData });
    } else {
      Object.assign(section, updateData);
    }

    await section.save();
    res.json(section);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update section' });
  }
});

// Bulk update all sections
router.put('/', requireAuth, async (req, res) => {
  try {
    const { hero, about, cta } = req.body;

    if (hero) {
      const heroSection = await HomePageSection.findOne({ sectionId: 'hero' });
      if (heroSection) {
        heroSection.hero = hero;
        await heroSection.save();
      } else {
        await HomePageSection.create({ sectionId: 'hero', hero });
      }
    }

    if (about) {
      const aboutSection = await HomePageSection.findOne({ sectionId: 'about' });
      if (aboutSection) {
        aboutSection.about = about;
        await aboutSection.save();
      } else {
        await HomePageSection.create({ sectionId: 'about', about });
      }
    }

    if (cta) {
      const ctaSection = await HomePageSection.findOne({ sectionId: 'cta' });
      if (ctaSection) {
        ctaSection.cta = cta;
        await ctaSection.save();
      } else {
        await HomePageSection.create({ sectionId: 'cta', cta });
      }
    }

    res.json({ success: true, message: 'Homepage sections updated' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update sections' });
  }
});

export default router;
