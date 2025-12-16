import express from 'express';
import { notifyOwner } from '../services/whatsapp.js';
import { sendConfirmationEmail } from '../services/email.js';

const router = express.Router();

/**
 * POST /api/contact
 * Handle contact form submissions
 */
router.post('/', async (req, res) => {
  try {
    const { firstName, lastName, email, message } = req.body;

    // Validate required fields
    if (!firstName || !lastName || !email || !message) {
      return res.status(400).json({ 
        error: 'Missing required fields: firstName, lastName, email, message' 
      });
    }

    const formData = {
      firstName,
      lastName,
      email,
      message
    };

    // Send WhatsApp notification to owner
    const whatsappResult = await notifyOwner(formData, 'contact');
    
    // Note: Email sending is optional and disabled to avoid SMTP errors
    // const emailResult = await sendConfirmationEmail(email, 'contact', formData);

    res.status(200).json({
      success: true,
      message: 'Contact form submitted successfully',
      data: {
        whatsapp: whatsappResult
      }
    });
  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({ 
      error: 'Failed to submit contact form',
      message: error.message 
    });
  }
});

export default router;
