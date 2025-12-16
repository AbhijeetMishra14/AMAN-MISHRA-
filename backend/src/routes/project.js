import express from 'express';
import { notifyOwner } from '../services/whatsapp.js';
import { sendConfirmationEmail } from '../services/email.js';

const router = express.Router();

/**
 * POST /api/project
 * Handle project request submissions
 */
router.post('/', async (req, res) => {
  try {
    const { projectType, budget, timeline, description, contactEmail } = req.body;

    // Validate required fields
    if (!projectType || !budget || !timeline || !description || !contactEmail) {
      return res.status(400).json({ 
        error: 'Missing required fields: projectType, budget, timeline, description, contactEmail' 
      });
    }

    const formData = {
      projectType,
      budget,
      timeline,
      description,
      contactEmail
    };

    // Send WhatsApp notification to owner
    const whatsappResult = await notifyOwner(formData, 'project');
    
    // Send confirmation email to user
    const emailResult = await sendConfirmationEmail(contactEmail, 'project', formData);

    res.status(200).json({
      success: true,
      message: 'Project request submitted successfully',
      data: {
        whatsapp: whatsappResult,
        email: emailResult
      }
    });
  } catch (error) {
    console.error('Project form error:', error);
    res.status(500).json({ 
      error: 'Failed to submit project request',
      message: error.message 
    });
  }
});

export default router;
