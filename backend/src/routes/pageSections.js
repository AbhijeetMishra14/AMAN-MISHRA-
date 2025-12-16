import express from 'express';
import PageSection from '../models/PageSection.js';
import { requireAuth } from '../middleware/auth.js';

const router = express.Router();

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
