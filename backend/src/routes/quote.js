import express from 'express';
import { notifyOwner } from '../services/whatsapp.js';
import { sendConfirmationEmail } from '../services/email.js';

const router = express.Router();

/**
 * POST /api/quote
 * Handle quote request submissions
 */
router.post('/', async (req, res) => {
  try {
    const { name, email, phone, additionalDetails } = req.body;

    // Validate required fields
    if (!name || !email || !phone) {
      return res.status(400).json({ 
        error: 'Missing required fields: name, email, phone' 
      });
    }

    const formData = {
      name,
      email,
      phone,
      additionalDetails: additionalDetails || ''
    };

    // Send WhatsApp notification to owner
    const whatsappResult = await notifyOwner(formData, 'quote');
    
    // Note: Email sending is optional and disabled to avoid SMTP errors
    // const emailResult = await sendConfirmationEmail(email, 'quote', formData);

    res.status(200).json({
      success: true,
      message: 'Quote request submitted successfully',
      data: {
        whatsapp: whatsappResult
      }
    });
  } catch (error) {
    console.error('Quote form error:', error);
    res.status(500).json({ 
      error: 'Failed to submit quote request',
      message: error.message 
    });
  }
});

export default router;
