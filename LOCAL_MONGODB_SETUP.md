# Local MongoDB Setup Guide

## ✅ MongoDB Already Configured & Running

Your local MongoDB is set up and running with the following configuration:

### **Database Location**
```
C:\data\db
```

### **Connection Details**
- **Host**: `127.0.0.1`
- **Port**: `27017`
- **Database**: `aman_mishra`
- **Connection String**: `mongodb://127.0.0.1:27017/aman_mishra`

### **Backend Configuration**
In `backend/.env`:
```env
MONGO_URI=mongodb://127.0.0.1:27017/aman_mishra
```

---

## 🚀 Running MongoDB

### **Start MongoDB (Persist)**
```bash
mongod --dbpath C:\data\db
```

### **Stop MongoDB**
Press `Ctrl+C` in the terminal where MongoDB is running.

### **Access MongoDB Shell**
```bash
mongosh
```

---

## 📊 Database Collections

Your `aman_mishra` database includes:

| Collection | Purpose |
|-----------|---------|
| `admins` | User accounts for admin login |
| `blogs` | Blog posts with content and metadata |
| `config.system.sessions` | MongoDB session management |

### **View Data (Shell)**
```bash
mongosh
> use aman_mishra
> db.admins.find()
> db.blogs.find()
```

---

## 🔐 Default Admin Account

- **Email**: `admin@gmail.com`
- **Password**: `admin123`

Automatically seeded on first backend start if it doesn't exist.

---

## ⚠️ Important Notes

- MongoDB runs on `localhost` only (local development)
- No authentication enabled (development mode)
- Data persists in `C:\data\db` folder
- For production, enable authentication and use secure connection string

---

## 🧹 Clear Database (Reset)

To delete all data and start fresh:

```bash
# Stop MongoDB
# Delete the data folder
rmdir /s C:\data\db
# Recreate and restart
mkdir C:\data\db
mongod --dbpath C:\data\db
```

---

## 📞 Troubleshooting

| Issue | Solution |
|-------|----------|
| "Data directory not found" | Create `C:\data\db` folder first |
| Port 27017 already in use | Another MongoDB instance running; stop it first |
| Connection refused | Ensure MongoDB is running: `mongod --dbpath C:\data\db` |
| Data corruption | Delete `C:\data\db` and restart (recreates clean database) |

---

## ✨ Summary

MongoDB is fully configured for local development:
- ✅ Database: `mongodb://127.0.0.1:27017/aman_mishra`
- ✅ Data stored in: `C:\data\db`
- ✅ Admin account seeded automatically
- ✅ Backend configured in `.env`
- ✅ All blog & admin data persists locally

**Everything is ready to use!** 🎉
