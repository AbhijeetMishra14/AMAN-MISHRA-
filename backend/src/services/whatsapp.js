import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const WHATSAPP_API_URL = 'https://graph.facebook.com/v22.0';
const WHATSAPP_BUSINESS_PHONE_ID = process.env.WHATSAPP_BUSINESS_PHONE_ID;
const WHATSAPP_ACCESS_TOKEN = process.env.WHATSAPP_ACCESS_TOKEN;
const OWNER_WHATSAPP_NUMBER = process.env.OWNER_WHATSAPP_NUMBER || '977';

/**
 * Format WhatsApp number to international format
 * @param {string} number - Phone number
 * @returns {string} Formatted number
 */
const formatWhatsAppNumber = (number) => {
  // Remove all non-digit characters
  const cleaned = number.replace(/\D/g, '');
  
  // If number doesn't start with country code, assume it's Nepal (+977)
  if (cleaned.length === 10) {
    return '977' + cleaned;
  }
  
  return cleaned;
};

/**
 * Send message via WhatsApp Business API (Text message - no template required)
 * @param {string} recipientNumber - Recipient phone number
 * @param {string} message - Message content
 * @returns {Promise<Object>} Response from WhatsApp API
 */
export const sendWhatsAppMessage = async (recipientNumber, message) => {
  try {
    if (!WHATSAPP_BUSINESS_PHONE_ID || !WHATSAPP_ACCESS_TOKEN) {
      console.warn('WhatsApp credentials not configured. Message not sent.');
      return { success: false, error: 'WhatsApp not configured' };
    }

    const formattedNumber = formatWhatsAppNumber(recipientNumber);

    const response = await axios.post(
      `${WHATSAPP_API_URL}/${WHATSAPP_BUSINESS_PHONE_ID}/messages`,
      {
        messaging_product: 'whatsapp',
        to: formattedNumber,
        type: 'text',
        text: {
          body: message
        }
      },
      {
        headers: {
          Authorization: `Bearer ${WHATSAPP_ACCESS_TOKEN}`,
          'Content-Type': 'application/json'
        }
      }
    );

    console.log(`✓ WhatsApp message sent to ${formattedNumber}`);
    return { success: true, messageId: response.data.messages[0].id };
  } catch (error) {
    console.error('WhatsApp API Error:', error.response?.data || error.message);
    return { success: false, error: error.message };
  }
};

/**
 * Send notification to owner about contact form submission
 * @param {Object} data - Form data
 * @param {string} type - Type of submission (contact, quote, project)
 */
export const notifyOwner = async (data, type) => {
  let message = '';

  if (type === 'contact') {
    message = `📧 *New Contact Form Submission*\n\n`;
    message += `*Name:* ${data.firstName} ${data.lastName}\n`;
    message += `*Email:* ${data.email}\n`;
    message += `*Message:* ${data.message}\n`;
  } else if (type === 'quote') {
    message = `💰 *New Quote Request*\n\n`;
    message += `*Name:* ${data.name}\n`;
    message += `*Email:* ${data.email}\n`;
    message += `*Phone:* ${data.phone}\n`;
    message += `*Details:* ${data.additionalDetails || 'No additional details'}\n`;
  } else if (type === 'project') {
    message = `🚀 *New Project Request*\n\n`;
    message += `*Project Type:* ${data.projectType}\n`;
    message += `*Budget:* ${data.budget}\n`;
    message += `*Timeline:* ${data.timeline}\n`;
    message += `*Description:* ${data.description}\n`;
    message += `*Email:* ${data.contactEmail}\n`;
  }

  message += `\n_Received at: ${new Date().toLocaleString()}_`;

  // Send to owner's WhatsApp
  const result = await sendWhatsAppMessage(OWNER_WHATSAPP_NUMBER, message);
  return result;
};

export default {
  sendWhatsAppMessage,
  notifyOwner
};