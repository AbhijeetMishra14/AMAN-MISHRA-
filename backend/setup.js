#!/usr/bin/env node

/**
 * Backend Setup Helper
 * This script helps you configure the backend environment
 * Run: node backend/setup.js
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import readline from 'readline';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const question = (prompt) => {
  return new Promise((resolve) => {
    rl.question(prompt, resolve);
  });
};

async function main() {
  console.clear();
  console.log('╔════════════════════════════════════════════╗');
  console.log('║  Aman Mishra Backend Setup Assistant       ║');
  console.log('╚════════════════════════════════════════════╝');
  console.log('');

  const envPath = path.join(__dirname, '.env');
  const envExamplePath = path.join(__dirname, '.env.example');

  // Check if .env already exists
  if (fs.existsSync(envPath)) {
    console.log('✅ .env file already exists');
    const overwrite = await question('Do you want to reconfigure? (y/n): ');
    if (overwrite.toLowerCase() !== 'y') {
      console.log('Skipping configuration...');
      rl.close();
      return;
    }
  }

  // Read .env.example
  if (!fs.existsSync(envExamplePath)) {
    console.error('❌ .env.example not found. Please ensure you have the template file.');
    rl.close();
    return;
  }

  console.log('\n📝 Let\'s configure your backend...\n');

  // WhatsApp Configuration
  console.log('🔵 WhatsApp Business API Configuration');
  console.log('─────────────────────────────────────────');
  const phoneId = await question('Enter your WhatsApp Business Phone ID: ');
  const accessToken = await question('Enter your WhatsApp Access Token: ');
  const ownerPhone = await question('Enter your WhatsApp number (e.g., 977xxxxxxxxx): ');

  // Email Configuration
  console.log('\n📧 Email Configuration');
  console.log('─────────────────────────────────────────');
  const useEmail = await question('Do you want to enable email notifications? (y/n): ');
  
  let smtpConfig = {
    host: 'smtp.gmail.com',
    port: 587,
    user: '',
    pass: '',
    ownerEmail: ''
  };

  if (useEmail.toLowerCase() === 'y') {
    const emailProvider = await question('Email provider (gmail/sendgrid/mailgun/other): ');
    
    if (emailProvider.toLowerCase() === 'gmail') {
      smtpConfig.host = 'smtp.gmail.com';
      console.log('\nℹ️  For Gmail:');
      console.log('  1. Enable 2-Factor Authentication');
      console.log('  2. Generate App Password at myaccount.google.com/apppasswords');
      console.log('  3. Use that password below (not your regular Gmail password)\n');
    } else if (emailProvider.toLowerCase() === 'sendgrid') {
      smtpConfig.host = 'smtp.sendgrid.net';
      smtpConfig.port = 587;
    } else if (emailProvider.toLowerCase() === 'mailgun') {
      smtpConfig.host = 'smtp.mailgun.org';
      smtpConfig.port = 587;
    } else {
      smtpConfig.host = await question('SMTP Host: ');
      smtpConfig.port = await question('SMTP Port (default 587): ') || 587;
    }

    smtpConfig.user = await question('Email Address: ');
    smtpConfig.pass = await question('Email Password or App Password: ');
    smtpConfig.ownerEmail = await question('Your Email (for notifications): ');
  }

  // Server Configuration
  console.log('\n⚙️  Server Configuration');
  console.log('─────────────────────────────────────────');
  const port = await question('Server Port (default 5000): ') || 5000;
  const frontend = await question('Frontend URL (default http://localhost:5173): ') || 'http://localhost:5173';

  // Generate .env content
  let envContent = fs.readFileSync(envExamplePath, 'utf-8');

  envContent = envContent
    .replace(/WHATSAPP_BUSINESS_PHONE_ID=.*/g, `WHATSAPP_BUSINESS_PHONE_ID=${phoneId}`)
    .replace(/WHATSAPP_ACCESS_TOKEN=.*/g, `WHATSAPP_ACCESS_TOKEN=${accessToken}`)
    .replace(/OWNER_WHATSAPP_NUMBER=.*/g, `OWNER_WHATSAPP_NUMBER=${ownerPhone}`)
    .replace(/PORT=.*/g, `PORT=${port}`)
    .replace(/FRONTEND_URL=.*/g, `FRONTEND_URL=${frontend}`);

  if (useEmail.toLowerCase() === 'y') {
    envContent = envContent
      .replace(/SMTP_HOST=.*/g, `SMTP_HOST=${smtpConfig.host}`)
      .replace(/SMTP_PORT=.*/g, `SMTP_PORT=${smtpConfig.port}`)
      .replace(/SMTP_USER=.*/g, `SMTP_USER=${smtpConfig.user}`)
      .replace(/SMTP_PASS=.*/g, `SMTP_PASS=${smtpConfig.pass}`)
      .replace(/OWNER_EMAIL=.*/g, `OWNER_EMAIL=${smtpConfig.ownerEmail}`);
  }

  // Write .env file
  fs.writeFileSync(envPath, envContent);

  console.log('\n✅ Configuration saved to .env');
  console.log('\n📋 Summary:');
  console.log('─────────────────────────────────────────');
  console.log(`Port: ${port}`);
  console.log(`Frontend URL: ${frontend}`);
  console.log(`WhatsApp Phone ID: ${phoneId ? '✓ Configured' : '✗ Not set'}`);
  console.log(`WhatsApp Token: ${accessToken ? '✓ Configured' : '✗ Not set'}`);
  console.log(`Owner Phone: ${ownerPhone}`);
  console.log(`Email Notifications: ${useEmail.toLowerCase() === 'y' ? '✓ Enabled' : '✗ Disabled'}`);

  console.log('\n🚀 Next steps:');
  console.log('─────────────────────────────────────────');
  console.log('1. Run: npm install (if not already done)');
  console.log('2. Run: npm run dev');
  console.log('3. Test forms on your website');
  console.log('4. Check your WhatsApp for messages!');

  console.log('\n📚 For more information, see:');
  console.log('   - README.md (API documentation)');
  console.log('   - ../BACKEND_SETUP_GUIDE.md (detailed setup)');

  rl.close();
}

main().catch(console.error);
