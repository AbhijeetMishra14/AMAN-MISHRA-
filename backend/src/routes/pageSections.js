import express from 'express';
import PageSection from '../models/PageSection.js';
import { requireAuth } from '../middleware/auth.js';

const router = express.Router();

// Seed database with default sections (MUST be before /:id)
router.post('/seed', requireAuth, async (req, res) => {
  try {
    const existingCount = await PageSection.countDocuments();
    if (existingCount > 0) {
      return res.status(400).json({ error: 'Database already has sections. Use migrate instead.' });
    }

    const defaultSections = [
      {
        type: 'hero',
        title: 'Your Digital Growth Partner – Proven Results, Trusted by Leaders',
        subtitle: 'Custom web & mobile apps, data-driven marketing, and strategic SEO that deliver real ROI. 5+ years transforming ambitious businesses into digital powerhouses. Let\'s build something remarkable together.',
        buttonText: 'Start Your Free Consultation →',
        buttonLink: '/contact',
        order: 0,
        visible: true,
        backgroundColor: '#ffffff',
        textColor: '#000000',
      },
      {
        type: 'about',
        title: 'Meet Your Full-Stack Digital Expert: Aman Mishra',
        subtitle: '5+ years of proven expertise spanning full-stack development, SEO mastery, and strategic growth consulting. I\'ve helped 50+ businesses scale revenue, boost online visibility, and dominate their markets. When you work with me, you get a dedicated partner invested in your success—not just a vendor.',
        buttonText: 'Discover My Story & Approach',
        buttonLink: '/about',
        order: 1,
        visible: true,
      },
      {
        type: 'features',
        title: 'What Makes Us Different',
        subtitle: 'Comprehensive digital solutions tailored to your needs',
        order: 2,
        visible: true,
        features: [
          {
            title: 'Custom Development',
            description: 'Full-stack web and mobile applications built for performance',
          },
          {
            title: 'SEO & Growth',
            description: 'Data-driven strategies that boost rankings and drive leads',
          },
          {
            title: 'Digital Marketing',
            description: 'Social media, PPC, and content strategies that convert',
          },
        ],
      },
      {
        type: 'cta',
        title: 'Ready to Accelerate Your Growth?',
        subtitle: 'Limited availability for new projects this quarter. Let\'s discuss your vision and create a winning strategy today.',
        buttonText: 'Schedule Your Strategy Call →',
        buttonLink: '/contact',
        order: 3,
        visible: true,
      },
      {
        type: 'clients',
        title: 'Trusted by Industry Leaders',
        subtitle: 'Partnering with 50+ companies worldwide',
        order: 4,
        visible: true,
      },
    ];

    const created = await PageSection.insertMany(
      defaultSections.map((section, idx) => ({
        ...section,
        versionHistory: [{
          version: 1,
          data: section,
          createdAt: new Date(),
          createdBy: 'system',
        }],
      }))
    );

    res.status(201).json({ message: 'Database seeded successfully', count: created.length });
  } catch (error) {
    console.error('Error seeding database:', error);
    res.status(500).json({ error: 'Failed to seed database' });
  }
});

// Migrate data from code to database (MUST be before /:id)
router.post('/migrate', requireAuth, async (req, res) => {
  try {
    const migratedSections = [
      {
        type: 'hero',
        title: 'Your Digital Growth Partner – Proven Results, Trusted by Leaders',
        subtitle: 'Custom web & mobile apps, data-driven marketing, and strategic SEO that deliver real ROI. 5+ years transforming ambitious businesses into digital powerhouses. Let\'s build something remarkable together.',
        buttonText: 'Start Your Free Consultation →',
        buttonLink: '/contact',
        order: 0,
        visible: true,
      },
      {
        type: 'about',
        title: 'Meet Your Full-Stack Digital Expert: Aman Mishra',
        subtitle: '5+ years of proven expertise spanning full-stack development, SEO mastery, and strategic growth consulting. I\'ve helped 50+ businesses scale revenue, boost online visibility, and dominate their markets. When you work with me, you get a dedicated partner invested in your success—not just a vendor.',
        buttonText: 'Discover My Story & Approach',
        buttonLink: '/about',
        order: 1,
        visible: true,
      },
      {
        type: 'cta',
        title: 'Ready to Accelerate Your Growth?',
        subtitle: 'Limited availability for new projects this quarter. Let\'s discuss your vision and create a winning strategy today.',
        buttonText: 'Schedule Your Strategy Call →',
        order: 2,
        visible: true,
      },
    ];

    // Delete existing sections first
    await PageSection.deleteMany({});

    // Insert migrated sections
    const created = await PageSection.insertMany(
      migratedSections.map((section, idx) => ({
        ...section,
        versionHistory: [{
          version: 1,
          data: section,
          createdAt: new Date(),
          createdBy: 'migration',
        }],
      }))
    );

    res.json({ message: 'Data migrated successfully', count: created.length });
  } catch (error) {
    console.error('Error migrating data:', error);
    res.status(500).json({ error: 'Failed to migrate data' });
  }
});

// Get all sections ordered
router.get('/', async (req, res) => {
  try {
    const sections = await PageSection.find()
      .sort({ order: 1 })
      .select('-versionHistory');
    
    if (sections.length === 0) {
      // Return default sections if none exist
      return res.json([
        {
          type: 'hero',
          title: 'Connecting Ideas Digitally',
          subtitle: 'We turn your visions into reality',
          buttonText: 'Get Started',
          buttonLink: '/contact',
          order: 0,
          visible: true,
        },
        {
          type: 'about',
          title: 'About Us',
          description: 'We are deeply committed to delivering exceptional work',
          order: 1,
          visible: true,
        },
        {
          type: 'cta',
          title: 'Ready to Transform?',
          subtitle: 'Let\'s discuss your project',
          buttonText: 'Start Project',
          order: 2,
          visible: true,
        },
      ]);
    }

    res.json(sections);
  } catch (error) {
    console.error('Error fetching sections:', error);
    res.status(500).json({ error: 'Failed to fetch sections' });
  }
});

// Get single section
router.get('/:id', async (req, res) => {
  try {
    const section = await PageSection.findById(req.params.id);
    if (!section) return res.status(404).json({ error: 'Section not found' });
    res.json(section);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch section' });
  }
});

// Create section
router.post('/', requireAuth, async (req, res) => {
  try {
    const { type, title, order } = req.body;

    if (!type) {
      return res.status(400).json({ error: 'Section type is required' });
    }

    // Get highest order if not provided
    let finalOrder = order;
    if (finalOrder === undefined) {
      const lastSection = await PageSection.findOne().sort({ order: -1 });
      finalOrder = (lastSection?.order || -1) + 1;
    }

    const section = new PageSection({
      ...req.body,
      order: finalOrder,
      versionHistory: [{
        version: 1,
        data: req.body,
        createdAt: new Date(),
        createdBy: req.admin?.email || 'system',
      }],
    });

    await section.save();
    res.status(201).json(section);
  } catch (error) {
    console.error('Error creating section:', error);
    res.status(500).json({ error: 'Failed to create section' });
  }
});

// Update section
router.put('/:id', requireAuth, async (req, res) => {
  try {
    const section = await PageSection.findById(req.params.id);
    if (!section) return res.status(404).json({ error: 'Section not found' });

    // Create version history entry
    const newVersion = (section.version || 1) + 1;
    if (!section.versionHistory) section.versionHistory = [];

    section.versionHistory.push({
      version: section.version || 1,
      data: { ...section.toObject() },
      createdAt: new Date(),
      createdBy: req.admin?.email || 'system',
    });

    // Update fields
    Object.assign(section, req.body);
    section.version = newVersion;

    await section.save();
    res.json(section);
  } catch (error) {
    console.error('Error updating section:', error);
    res.status(500).json({ error: 'Failed to update section' });
  }
});

// Reorder sections
router.put('/reorder/all', requireAuth, async (req, res) => {
  try {
    const { sections } = req.body;

    if (!Array.isArray(sections)) {
      return res.status(400).json({ error: 'Sections array is required' });
    }

    const updates = await Promise.all(
      sections.map((item, index) =>
        PageSection.findByIdAndUpdate(
          item.id,
          { order: index },
          { new: true }
        )
      )
    );

    res.json(updates);
  } catch (error) {
    console.error('Error reordering sections:', error);
    res.status(500).json({ error: 'Failed to reorder sections' });
  }
});

// Toggle visibility
router.patch('/:id/visibility', requireAuth, async (req, res) => {
  try {
    const section = await PageSection.findById(req.params.id);
    if (!section) return res.status(404).json({ error: 'Section not found' });

    section.visible = !section.visible;
    await section.save();
    res.json(section);
  } catch (error) {
    res.status(500).json({ error: 'Failed to toggle visibility' });
  }
});

// Get version history
router.get('/:id/versions', requireAuth, async (req, res) => {
  try {
    const section = await PageSection.findById(req.params.id);
    if (!section) return res.status(404).json({ error: 'Section not found' });

    res.json({
      currentVersion: section.version,
      history: section.versionHistory || [],
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch version history' });
  }
});

// Revert to version
router.post('/:id/revert/:version', requireAuth, async (req, res) => {
  try {
    const section = await PageSection.findById(req.params.id);
    if (!section) return res.status(404).json({ error: 'Section not found' });

    const versionNum = parseInt(req.params.version);
    const versionEntry = section.versionHistory?.find(v => v.version === versionNum);

    if (!versionEntry) {
      return res.status(404).json({ error: 'Version not found' });
    }

    const newVersion = (section.version || 1) + 1;
    section.versionHistory.push({
      version: section.version || 1,
      data: { ...section.toObject() },
      createdAt: new Date(),
      createdBy: req.admin?.email || 'system',
    });

    Object.assign(section, versionEntry.data);
    section.version = newVersion;
    await section.save();

    res.json(section);
  } catch (error) {
    console.error('Error reverting version:', error);
    res.status(500).json({ error: 'Failed to revert version' });
  }
});

// Delete section
router.delete('/:id', requireAuth, async (req, res) => {
  try {
    const section = await PageSection.findByIdAndDelete(req.params.id);
    if (!section) return res.status(404).json({ error: 'Section not found' });

    // Reorder remaining sections
    await PageSection.updateMany({}, [
      {
        $set: {
          order: {
            $cond: [
              { $gt: ['$order', section.order] },
              { $subtract: ['$order', 1] },
              '$order',
            ],
          },
        },
      },
    ]);

    res.json({ message: 'Section deleted' });
  } catch (error) {
    console.error('Error deleting section:', error);
    res.status(500).json({ error: 'Failed to delete section' });
  }
});

export default router;
