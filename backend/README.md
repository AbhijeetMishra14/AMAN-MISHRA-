# Aman Mishra Backend API

REST API backend for Aman Mishra's website with WhatsApp Business API integration for real-time notifications.

## Features

- 📱 **WhatsApp Integration**: Send form submissions directly to WhatsApp
- 📧 **Email Notifications**: Confirmation emails to users and owner
- 🔒 **Data Validation**: Comprehensive input validation
- 🚀 **RESTful API**: Clean and organized endpoints
- ⚡ **Fast & Lightweight**: Built with Express.js

## Setup Instructions

### Prerequisites
- Node.js 16+ and npm
- WhatsApp Business Account with verified phone number
- SMTP credentials for email notifications (Gmail, SendGrid, etc.)

### Installation

1. **Navigate to backend folder**
```bash
cd backend
```

2. **Install dependencies**
```bash
npm install
```

3. **Create .env file**
```bash
cp .env.example .env
```

4. **Configure environment variables**
Edit `.env` and add your credentials:

```env
# WhatsApp Business Configuration
WHATSAPP_BUSINESS_PHONE_ID=your_phone_number_id
WHATSAPP_ACCESS_TOKEN=your_access_token
OWNER_WHATSAPP_NUMBER=977xxxxxxxxxx

# Email Configuration
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
OWNER_EMAIL=your_email@gmail.com

# Frontend
FRONTEND_URL=http://localhost:5173
PORT=5000
```

### How to Get WhatsApp Credentials

1. Go to [Meta for Developers](https://developers.facebook.com/)
2. Create or use existing Business Account
3. Create WhatsApp Business App
4. Get your:
   - Business Phone ID
   - Access Token
   - Add your phone number for testing
5. Submit for production approval

### Running the Backend

**Development (with auto-reload)**
```bash
npm run dev
```

**Production**
```bash
npm start
```

The API will be available at `http://localhost:5000`

## API Endpoints

### 1. Contact Form
**POST** `/api/contact`

```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "message": "I'm interested in your services"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Contact form submitted successfully",
  "data": {
    "whatsapp": { "success": true, "messageId": "wamid.xxx" },
    "email": { "success": true, "messageId": "xxx@xxx" }
  }
}
```

### 2. Get Quote
**POST** `/api/quote`

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+977-9xxxxxxxxx",
  "additionalDetails": "Need a website redesign"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Quote request submitted successfully",
  "data": {
    "whatsapp": { "success": true, "messageId": "wamid.xxx" },
    "email": { "success": true, "messageId": "xxx@xxx" }
  }
}
```

### 3. Start Project
**POST** `/api/project`

```json
{
  "projectType": "Web Development",
  "budget": "$10,000 - $25,000",
  "timeline": "1-2 Weeks",
  "description": "Build an e-commerce platform",
  "contactEmail": "john@example.com"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Project request submitted successfully",
  "data": {
    "whatsapp": { "success": true, "messageId": "wamid.xxx" },
    "email": { "success": true, "messageId": "xxx@xxx" }
  }
}
```

### 4. Health Check
**GET** `/api/health`

**Response:**
```json
{
  "status": "OK",
  "message": "Aman Mishra Backend is running",
  "timestamp": "2025-12-14T10:30:00Z"
}
```

## Frontend Integration

Update your frontend components to send data to these endpoints:

```javascript
// Example: Contact form
const handleSubmit = async (formData) => {
  try {
    const response = await fetch('http://localhost:5000/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });
    const result = await response.json();
    console.log(result);
  } catch (error) {
    console.error('Error:', error);
  }
};
```

## Project Structure

```
backend/
├── src/
│   ├── server.js           # Main server file
│   ├── services/
│   │   ├── whatsapp.js     # WhatsApp integration
│   │   └── email.js        # Email service
│   ├── routes/
│   │   ├── contact.js      # Contact form route
│   │   ├── quote.js        # Quote request route
│   │   └── project.js      # Project request route
│   └── utils/
│       └── validators.js   # Form validation utilities
├── .env.example            # Environment variables template
├── package.json
└── README.md
```

## Environment Variables

| Variable | Description |
|----------|-------------|
| `PORT` | Server port (default: 5000) |
| `WHATSAPP_BUSINESS_PHONE_ID` | Your WhatsApp phone ID |
| `WHATSAPP_ACCESS_TOKEN` | Your WhatsApp access token |
| `OWNER_WHATSAPP_NUMBER` | Your WhatsApp number to receive messages |
| `SMTP_HOST` | SMTP server address |
| `SMTP_PORT` | SMTP port (usually 587) |
| `SMTP_USER` | Email address for sending |
| `SMTP_PASS` | Email password or app password |
| `OWNER_EMAIL` | Email to receive notifications |
| `FRONTEND_URL` | Frontend URL for CORS |

## Error Handling

All endpoints return standardized error responses:

```json
{
  "error": "Error message",
  "message": "Detailed error information"
}
```

## Security Features

- ✅ CORS protection
- ✅ Input validation
- ✅ XSS prevention with input sanitization
- ✅ Email format validation
- ✅ Phone number format validation
- ✅ Environment variable protection

## Troubleshooting

### WhatsApp Messages Not Sending
1. Check WhatsApp credentials in `.env`
2. Ensure phone number is formatted correctly with country code
3. Verify phone number is approved in WhatsApp Business Account
4. Check API token validity

### Emails Not Sending
1. Enable "Less secure app access" for Gmail
2. Use Gmail App Password if 2FA is enabled
3. Verify SMTP credentials
4. Check email logs in console

## Development

### Testing the API

Use tools like Postman or cURL:

```bash
curl -X POST http://localhost:5000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "Test",
    "lastName": "User",
    "email": "test@example.com",
    "message": "This is a test message"
  }'
```

## License

ISC

## Support

For issues or questions, contact: amandreamsbig@gmail.com
