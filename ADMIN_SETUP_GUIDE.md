# Admin Panel & Blog CMS Setup Guide

## 🚀 Quick Start

### 1. **MongoDB Setup**
Install MongoDB locally or use MongoDB Atlas (cloud):
- **Local**: [Download MongoDB Community](https://www.mongodb.com/try/download/community)
- **Cloud**: [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)

Start MongoDB:
```bash
# Windows
mongod

# macOS/Linux
brew services start mongodb-community
```

### 2. **Backend Setup**

```bash
cd backend
npm install
```

Create/update `.env` file:
```env
MONGO_URI=mongodb://127.0.0.1:27017/aman_mishra
JWT_SECRET=your_super_secret_key_here_change_this
DEFAULT_ADMIN_EMAIL=admin@gmail.com
DEFAULT_ADMIN_PASS=admin123
PORT=5000
FRONTEND_URL=http://localhost:5173
```

Start backend:
```bash
npm run dev
```

Server runs on `http://localhost:5000`

### 3. **Frontend Setup**

```bash
npm install
```

Ensure `.env.local` exists with:
```env
VITE_API_URL=http://localhost:5000/api
```

Start frontend:
```bash
npm run dev
```

Frontend runs on `http://localhost:5173`

---

## 📝 Admin Panel Usage

### **Login**
- URL: `http://localhost:5173/admin`
- **Email**: `admin@gmail.com`
- **Password**: `admin123`

### **Features**
1. **Dashboard** (`/admin/dashboard`):
   - View all blogs (published & draft)
   - Edit or delete existing blogs
   - Create new blog

2. **Blog Editor** (`/admin/blog/new` or `/admin/blog/:id`):
   - **Title**: Blog post title
   - **Summary**: Short description (appears in blog list)
   - **Content**: Rich text editor (Quill) with formatting options
   - **Images**: Upload images directly from editor
   - **Status**: Save as draft or publish immediately
   - **Actions**: Save as draft → Publish later, or Publish directly

### **Image Upload**
- Click "📸 Upload Image" button in editor
- Images stored in `backend/uploads/`
- Accessible at `http://localhost:5000/uploads/filename.jpg`

---

## 🔐 Authentication

### **JWT Token Flow**
1. Admin logs in → Backend validates credentials → JWT token issued
2. Token stored in `localStorage` as `admin_token`
3. All protected routes require `Authorization: Bearer <token>` header
4. Token auto-added to all API requests via interceptor

### **Protected Routes (Backend)**
- `POST /api/blogs` - Create blog
- `PUT /api/blogs/:id` - Update blog
- `DELETE /api/blogs/:id` - Delete blog
- `POST /api/blogs/upload` - Upload image

### **Public Routes**
- `GET /api/blogs` - List published blogs
- `GET /api/blogs/:id` - Get single blog

---

## 📱 Frontend Pages (Dynamic)

### **Blog Page** (`/blogs`)
- Fetches published blogs from `/api/blogs`
- Displays in grid with image, title, summary, date
- Pagination support
- Click to view full blog

### **Blog Post** (`/blogs/:slug`)
- Displays full blog with rich content (HTML rendered)
- Shows featured image if available
- Back button to blog list

---

## 🛠 API Endpoints

### **Admin**
```bash
# Login
POST /api/admin/login
{
  "email": "admin@gmail.com",
  "password": "admin123"
}
→ { "token": "jwt_token", "admin": { "id", "email", "name" } }

# Get current admin
GET /api/admin/me
Headers: Authorization: Bearer <token>
```

### **Blogs**
```bash
# Create blog
POST /api/blogs
Headers: Authorization: Bearer <token>
{
  "title": "My Blog",
  "summary": "Short description",
  "content": "<p>Rich HTML content</p>",
  "images": ["/uploads/img1.jpg"],
  "status": "published"
}

# Update blog
PUT /api/blogs/:id
Headers: Authorization: Bearer <token>
(same body structure)

# Delete blog
DELETE /api/blogs/:id
Headers: Authorization: Bearer <token>

# Get blog by ID
GET /api/blogs/:id

# List published blogs
GET /api/blogs
```

---

## 📦 Database Schema

### **Admin Model**
```javascript
{
  _id: ObjectId,
  email: String (unique),
  password: String (hashed with bcrypt),
  name: String,
  createdAt: Date,
  updatedAt: Date
}
```

### **Blog Model**
```javascript
{
  _id: ObjectId,
  title: String (required),
  slug: String (unique, auto-generated from title),
  summary: String,
  content: String (HTML from Quill),
  images: [String] (URLs of uploaded images),
  author: String (default: "Admin"),
  status: String (enum: ["draft", "published"]),
  createdAt: Date,
  updatedAt: Date
}
```

---

## 🎨 UI Components

### **Rich Text Editor**
- Uses **React Quill** for rich text editing
- Features:
  - Headers (H1, H2, H3)
  - Bold, Italic, Underline, Strike-through
  - Lists (ordered & unordered)
  - Blockquotes, Code blocks
  - Links and images

### **Image Gallery**
- Grid display of uploaded images
- One-click remove button
- Responsive design (auto-fit columns)

---

## 🚨 Troubleshooting

### **MongoDB not connecting**
- Ensure MongoDB is running: `mongod` (Windows) or `brew services start mongodb-community` (macOS)
- Check `MONGO_URI` in `.env`
- Try `mongodb://localhost:27017/aman_mishra` instead of `127.0.0.1`

### **Admin login fails**
- Ensure backend is running and has seeded default admin
- Check that `JWT_SECRET` in `.env` is set
- Clear browser cache & `localStorage`

### **Images not uploading**
- Ensure `backend/uploads/` folder exists
- Check backend has write permissions
- Verify `FRONTEND_URL` matches your frontend origin (CORS)

### **Backend CORS errors**
- Update `FRONTEND_URL` in `.env` to match your frontend URL
- For local dev: `FRONTEND_URL=http://localhost:5173`

---

## 🔄 Production Deployment

### **Environment Variables (Change These!)**
```env
# Generate a strong secret
JWT_SECRET=generate-a-strong-random-string-here

# Use secure MongoDB connection string
MONGO_URI=mongodb+srv://user:password@cluster.mongodb.net/aman_mishra

# Update to production frontend URL
FRONTEND_URL=https://yourdomain.com

# Set to production
NODE_ENV=production

# Change default admin credentials
DEFAULT_ADMIN_EMAIL=secure@email.com
DEFAULT_ADMIN_PASS=very_strong_password_here
```

### **Backend Deployment (Render, Railway, Heroku)**
```bash
# Build and push to your platform
# Platform will auto-install dependencies from package.json
```

### **Frontend Deployment (Vercel, Netlify)**
```bash
# Build
npm run build

# Output in dist/ folder
# Deploy to Vercel/Netlify
```

---

## 📚 Tech Stack

- **Frontend**: React + TypeScript + Vite
- **Backend**: Node.js + Express
- **Database**: MongoDB + Mongoose
- **Auth**: JWT (jsonwebtoken) + bcryptjs
- **Rich Text**: React Quill
- **File Upload**: Multer
- **API**: Axios

---

## 💡 Features Implemented

✅ Admin login with JWT authentication  
✅ Blog CRUD operations (Create, Read, Update, Delete)  
✅ Rich text editor for blog content  
✅ Image upload to server (stored in `backend/uploads/`)  
✅ Draft & Published status  
✅ Auto-slug generation from title  
✅ Dynamic blog listing on frontend  
✅ Public blog viewing  
✅ Responsive design  
✅ Token-based protected routes  

---

## 🔮 Future Enhancements

- [ ] Multi-admin support with roles/permissions
- [ ] Blog categories and tags
- [ ] Search functionality
- [ ] Blog comments
- [ ] Admin profile management
- [ ] Batch operations (bulk delete)
- [ ] Blog scheduling
- [ ] Analytics/views tracking
- [ ] SEO metadata editor
- [ ] Export blogs to PDF

---

## 📞 Support

For issues or questions, check the backend logs:
```bash
cd backend
npm run dev
# Look for error messages in terminal
```

Monitor frontend browser console (F12) for API errors.

---

**Happy blogging! 🎉**
