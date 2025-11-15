# Forexism Project Setup Guide

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

---

## 📋 Backend Setup

1. **Navigate to backend directory**
   ```bash
   cd forexism-backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create `.env` file** in `forexism-backend/` directory:
   ```env
   PORT=5001
   NODE_ENV=development
   FRONTEND_URL=http://localhost:3000
   
   # MongoDB Connection
   # For local MongoDB:
   MONGODB_URI=mongodb://localhost:27017/forexism
   
   # For MongoDB Atlas (cloud):
   # MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/forexism?retryWrites=true&w=majority
   
   # JWT Secret (generate a strong random key)
   # Run: node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
   JWT_SECRET=your_super_secret_jwt_key_min_32_characters
   JWT_EXPIRE=7d
   ```

4. **Start MongoDB** (if using local MongoDB)
   ```bash
   # Windows
   mongod
   
   # macOS/Linux
   sudo systemctl start mongod
   ```

5. **Start the backend server**
   ```bash
   npm start
   # or for development with auto-reload
   npm run dev
   ```

   You should see:
   ```
   🔗 Connecting to MongoDB...
   ✅ MongoDB Connected: localhost
   📊 Database: forexism
   🚀 Server running on port 5001
   ```

---

## 🎨 Frontend Setup

1. **Navigate to frontend directory**
   ```bash
   cd forexism-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create `.env` file** in `forexism-frontend/` directory (optional):
   ```env
   REACT_APP_API_URL=http://localhost:5001/api
   REACT_APP_WHATSAPP_NUMBER=923001479350
   ```

4. **Start the frontend**
   ```bash
   npm start
   ```

   The app will open at `http://localhost:3000`

---

## 🗄️ Database Setup

### Option 1: Local MongoDB

1. **Install MongoDB** from [mongodb.com](https://www.mongodb.com/try/download/community)

2. **Start MongoDB service**
   - Windows: MongoDB runs as a service automatically
   - macOS: `brew services start mongodb-community`
   - Linux: `sudo systemctl start mongod`

3. **Verify MongoDB is running**
   ```bash
   mongosh
   # or
   mongo
   ```

### Option 2: MongoDB Atlas (Cloud)

1. Create a free account at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster
3. Get your connection string
4. Update `MONGODB_URI` in `.env` file

---

## 🔐 Generate JWT Secret

Run this command to generate a secure JWT secret:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Copy the output and paste it into your `.env` file as `JWT_SECRET`.

---

## ✅ Verification

### Check Backend
Visit: `http://localhost:5001`
Should see: `{"success":true,"message":"🚀 Forexism API is running!"}`

### Check Frontend
Visit: `http://localhost:3000`
Should see: Forexism homepage

---

## 🐛 Troubleshooting

### MongoDB Connection Error

**Error**: `MONGODB_URI is not defined`
- **Solution**: Create `.env` file in `forexism-backend/` directory

**Error**: `Connection refused`
- **Solution**: Make sure MongoDB is running
  ```bash
  # Check if MongoDB is running
  mongosh
  ```

### Port Already in Use

**Error**: `Port 5001 is already in use`
- **Solution**: Change PORT in `.env` file or kill the process using that port

### Frontend Can't Connect to Backend

**Error**: API calls failing
- **Solution**: 
  1. Make sure backend is running on port 5001
  2. Check `REACT_APP_API_URL` in frontend `.env`
  3. Check CORS settings in `server.js`

---

## 📁 Project Structure

```
forexism/
├── forexism-backend/
│   ├── .env                 # Environment variables (CREATE THIS)
│   ├── config/
│   │   └── db.js           # Database connection
│   ├── controllers/        # Route controllers
│   ├── models/            # Mongoose models
│   ├── routes/            # API routes
│   ├── middleware/        # Auth & upload middleware
│   └── server.js          # Express server
│
└── forexism-frontend/
    ├── .env                # Frontend env vars (optional)
    ├── src/
    │   ├── components/     # React components
    │   ├── pages/         # Page components
    │   ├── context/        # React Context
    │   └── services/      # API services
    └── public/            # Static files
```

---

## 🎯 First Steps After Setup

1. **Create an Admin User** (optional - for testing)
   - Register through the frontend
   - Use the temporary route: `PUT /api/make-admin` (remove in production!)

2. **Test Authentication**
   - Register a new user
   - Login
   - Check if profile icon appears in navigation

3. **Test Course Enrollment**
   - Browse courses
   - Enroll in a free course
   - Submit payment for paid course

---

## 📝 Important Notes

⚠️ **Before Production:**
- Remove the temporary `/api/make-admin` route
- Use a strong, unique JWT_SECRET
- Use MongoDB Atlas or secure your MongoDB instance
- Set proper CORS origins
- Add rate limiting
- Enable HTTPS

---

## 🆘 Need Help?

Check the error logs in:
- Backend: Terminal where `npm start` is running
- Frontend: Browser console (F12)
- MongoDB: Check MongoDB logs

---

**Happy Trading! 📈**

