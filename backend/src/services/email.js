import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

/**
 * Send email notification
 * @param {Object} options - Email options
 * @param {string} options.to - Recipient email
 * @param {string} options.subject - Email subject
 * @param {string} options.html - Email HTML content
 */
export const sendEmail = async (options) => {
  try {
    const mailOptions = {
      from: process.env.SMTP_USER,
      to: options.to,
      subject: options.subject,
      html: options.html
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(`✓ Email sent to ${options.to}`);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Email Error:', error.message);
    return { success: false, error: error.message };
  }
};

/**
 * Send confirmation email to user
 * @param {string} userEmail - User's email
 * @param {string} type - Type of submission
 * @param {Object} data - Form data
 */
export const sendConfirmationEmail = async (userEmail, type, data) => {
  let subject = '';
  let html = '';

  if (type === 'contact') {
    subject = 'Thank you for contacting Aman Mishra';
    html = `
      <h2>We received your message!</h2>
      <p>Hi ${data.firstName},</p>
      <p>Thank you for reaching out to us. We have received your message and will get back to you soon.</p>
      <hr>
      <p><strong>Your Message:</strong></p>
      <p>${data.message}</p>
      <hr>
      <p>Best regards,<br>Aman Mishra</p>
    `;
  } else if (type === 'quote') {
    subject = 'Quote Request Received - Aman Mishra';
    html = `
      <h2>Thank you for requesting a quote!</h2>
      <p>Hi ${data.name},</p>
      <p>We have received your quote request and will contact you shortly with a personalized quote.</p>
      <hr>
      <p><strong>Your Details:</strong></p>
      <p>Email: ${data.email}<br>Phone: ${data.phone}</p>
      <hr>
      <p>Best regards,<br>Aman Mishra</p>
    `;
  } else if (type === 'project') {
    subject = 'Project Request Received - Aman Mishra';
    html = `
      <h2>Thank you for submitting your project!</h2>
      <p>Hi,</p>
      <p>We have received your project request and will review it shortly.</p>
      <hr>
      <p><strong>Your Project Details:</strong></p>
      <p>
        Type: ${data.projectType}<br>
        Budget: ${data.budget}<br>
        Timeline: ${data.timeline}
      </p>
      <hr>
      <p>We'll contact you soon at ${data.contactEmail}</p>
      <p>Best regards,<br>Aman Mishra</p>
    `;
  }

  return await sendEmail({
    to: userEmail,
    subject,
    html
  });
};

export default {
  sendEmail,
  sendConfirmationEmail
};
