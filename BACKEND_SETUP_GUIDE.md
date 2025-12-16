# 🚀 Aman Mishra Backend Setup & Integration Guide

## Overview

Complete backend infrastructure has been created for your website to handle:
- ✅ Contact form submissions
- ✅ Quote requests  
- ✅ Project requests

All data is sent to your WhatsApp Business account in real-time + confirmation emails to users.

---

## 📁 Backend Folder Structure

```
backend/
├── src/
│   ├── server.js                 # Express server
│   ├── services/
│   │   ├── whatsapp.js          # WhatsApp Business API integration
│   │   └── email.js             # Email notifications service
│   ├── routes/
│   │   ├── contact.js           # POST /api/contact
│   │   ├── quote.js             # POST /api/quote
│   │   └── project.js           # POST /api/project
│   └── utils/
│       └── validators.js        # Form validation utilities
├── .env.example                  # Template for environment variables
├── .gitignore
├── package.json
└── README.md                     # Full API documentation
```

---

## 🔧 Setup Steps

### Step 1: Install Dependencies

```bash
cd backend
npm install
```

### Step 2: Create .env File

```bash
cp .env.example .env
```

### Step 3: Configure WhatsApp Business API

**Your WhatsApp Number: `+977 9708799920`**

All messages from your website forms will be sent to this number.

**Get your WhatsApp credentials:**

1. Visit [Meta for Developers](https://developers.facebook.com/)
2. Create or access your Business Account
3. Create a WhatsApp Business App
4. In the app settings, find:
   - **Phone Number ID** (looks like: 123456789)
   - **Access Token** (long alphanumeric string)

**Update your `.env` file:**

```env
WHATSAPP_BUSINESS_PHONE_ID=your_phone_number_id_here
WHATSAPP_ACCESS_TOKEN=your_long_access_token_here
OWNER_WHATSAPP_NUMBER=9779708799920
```

✅ The phone number is already pre-configured in `.env.example`!

### Step 4: Configure Email Service (Optional but Recommended)

**Using Gmail:**

1. Enable 2-Factor Authentication on your Gmail account
2. Generate an [App Password](https://myaccount.google.com/apppasswords)
3. Update `.env`:

```env
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
OWNER_EMAIL=your_email@gmail.com
```

**Using Other Email Providers:**
- SendGrid: `SMTP_HOST=smtp.sendgrid.net`
- Mailgun: `SMTP_HOST=smtp.mailgun.org`
- AWS SES: `SMTP_HOST=email-smtp.region.amazonaws.com`

### Step 5: Complete `.env` Configuration

```env
# Server
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173

# WhatsApp
WHATSAPP_BUSINESS_PHONE_ID=your_phone_id
WHATSAPP_BUSINESS_ACCOUNT_ID=your_account_id
WHATSAPP_ACCESS_TOKEN=your_token
OWNER_WHATSAPP_NUMBER=9779708799920

# Email
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
OWNER_EMAIL=your_email@gmail.com
```

### Step 6: Start the Backend Server

**Development (with auto-reload):**
```bash
npm run dev
```

**Production:**
```bash
npm start
```

You should see:
```
🚀 Backend server running on http://localhost:5000
📱 WhatsApp integration enabled
✉️  Email notifications enabled
```

---

## 📱 Frontend Integration (Already Configured)

Your frontend components have been updated to send data to the backend:

### Contact Form (`Contact.tsx`)
```javascript
// Automatically sends POST request to http://localhost:5000/api/contact
// Fields: firstName, lastName, email, message
```

### Quote Request (`QuotePricingModal.tsx`)
```javascript
// Automatically sends POST request to http://localhost:5000/api/quote
// Fields: name, email, phone, additionalDetails
```

### Start Project (`StartProjectModal.tsx`)
```javascript
// Automatically sends POST request to http://localhost:5000/api/project
// Fields: projectType, budget, timeline, description, contactEmail
```

---

## 🧪 Testing the Backend

### Using cURL

**Test Contact Form:**
```bash
curl -X POST http://localhost:5000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "message": "Test message"
  }'
```

**Test Quote Request:**
```bash
curl -X POST http://localhost:5000/api/quote \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+977-9841969727",
    "additionalDetails": "Need a website"
  }'
```

**Test Project Request:**
```bash
curl -X POST http://localhost:5000/api/project \
  -H "Content-Type: application/json" \
  -d '{
    "projectType": "Web Development",
    "budget": "$10,000 - $25,000",
    "timeline": "1-2 Weeks",
    "description": "Build e-commerce site",
    "contactEmail": "john@example.com"
  }'
```

**Check Health:**
```bash
curl http://localhost:5000/api/health
```

### Using Postman

1. Create a new POST request
2. Set URL to `http://localhost:5000/api/contact`
3. Go to Body tab → select JSON
4. Paste the data above
5. Click Send

---

## 📊 What Happens When Someone Submits a Form

### Step 1: Form Submission
User fills out form (Contact, Quote, or Project) and clicks submit

### Step 2: Backend Receives Data
Data is validated and processed

### Step 3: WhatsApp Notification
Formatted message is sent to your WhatsApp number instantly:
```
📧 New Contact Form Submission

Name: John Doe
Email: john@example.com
Message: I'm interested in your services

_Received at: Dec 14, 2025 3:45 PM_
```

### Step 4: Confirmation Email
User receives confirmation email

### Step 5: Response Sent Back
Frontend shows success message

---

## 🔐 Security Features

✅ **CORS Protection** - Only your frontend can make requests  
✅ **Input Validation** - All fields validated before processing  
✅ **Email Validation** - Checks email format  
✅ **Phone Validation** - Validates phone number format  
✅ **XSS Prevention** - Sanitizes all inputs  
✅ **Environment Variables** - Sensitive data protected  

---

## 🚨 Troubleshooting

### WhatsApp Messages Not Sending?

**Problem:** Getting error in console
```
WhatsApp API Error: Invalid phone number
```

**Solution:**
- Phone number must include country code (e.g., +977)
- Format: Remove spaces and hyphens during transmission
- In `.env` use: `977xxxxxxxxxx`

**Problem:** "WhatsApp credentials not configured"

**Solution:**
- Ensure `.env` file exists in backend folder
- Check if `WHATSAPP_BUSINESS_PHONE_ID` and `WHATSAPP_ACCESS_TOKEN` are set
- Restart backend server after updating `.env`

### Emails Not Sending?

**Problem:** Gmail errors

**Solution:**
- Enable 2FA on Gmail account
- Create App Password (not regular password)
- Use the App Password in `.env`, not your Gmail password
- For Gmail: `SMTP_USER=your_email@gmail.com` and `SMTP_PASS=<app_password>`

**Problem:** "Network error" when submitting forms

**Solution:**
- Ensure backend is running (`npm run dev`)
- Check if `FRONTEND_URL` in `.env` matches your frontend port
- Clear browser cache
- Check browser console for exact error

### CORS Errors?

**Problem:** "Access to XMLHttpRequest blocked by CORS"

**Solution:**
- Update `.env`: `FRONTEND_URL=http://localhost:5173`
- Restart backend server
- Make sure frontend URL matches exactly

---

## 📈 Production Deployment

### Before Going Live:

1. **Change environment variables:**
```env
NODE_ENV=production
FRONTEND_URL=https://yourdomain.com
```

2. **Get production WhatsApp credentials:**
   - Submit business app for approval
   - Get production phone number ID and token

3. **Use production email service:**
   - Set up SendGrid, AWS SES, or similar
   - Use production SMTP credentials

4. **Deploy backend to:**
   - Heroku
   - Railway
   - Render
   - AWS
   - DigitalOcean
   - Your own server

5. **Update frontend API URL:**
   - Change all `http://localhost:5000` to your production URL
   - Example: `https://api.yourdomain.com`

---

## 📚 API Response Examples

### Success Response
```json
{
  "success": true,
  "message": "Contact form submitted successfully",
  "data": {
    "whatsapp": {
      "success": true,
      "messageId": "wamid.D123456789"
    },
    "email": {
      "success": true,
      "messageId": "msg@example.com"
    }
  }
}
```

### Error Response
```json
{
  "error": "Missing required fields",
  "message": "firstName, email, message are required"
}
```

---

## 📞 Support

For detailed API documentation, see: `backend/README.md`

For issues:
1. Check the troubleshooting section above
2. Review backend logs in terminal
3. Check browser console for frontend errors
4. Verify `.env` configuration

---

## ✅ Checklist

- [ ] Backend folder created with all files
- [ ] Dependencies installed (`npm install`)
- [ ] `.env` file created and configured
- [ ] WhatsApp credentials added to `.env`
- [ ] Email credentials configured (optional)
- [ ] Backend started successfully (`npm run dev`)
- [ ] Frontend components updated to send data to backend
- [ ] Test form submission from website
- [ ] Verify WhatsApp message received on your phone
- [ ] Verify confirmation email received

---

**🎉 You're all set! Your website is now integrated with WhatsApp Business API for real-time notifications.**

For any questions, refer to `backend/README.md` for complete API documentation.
