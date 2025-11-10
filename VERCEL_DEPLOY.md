# 🚀 Quick Vercel Deployment Guide

## Step-by-Step Deployment

### 1️⃣ Deploy Backend First (Render - Free)

1. **Go to [render.com](https://render.com)** and sign up
2. **Click "New +" → "Web Service"**
3. **Connect GitHub** and select your repository
4. **Configure**:
   - **Name**: `amazkart-backend`
   - **Environment**: `Node`
   - **Build Command**: `cd server && npm install`
   - **Start Command**: `cd server && npm start`
   - **Root Directory**: Leave empty

5. **Add Environment Variables**:
   ```
   MONGODB_URI=your_mongodb_connection_string
   PORT=10000
   SEED_KEY=your_secret_key_here
   NODE_ENV=production
   FRONTEND_URL=https://your-app.vercel.app
   ```

6. **Click "Create Web Service"**
7. **Wait for deployment** (~5 minutes)
8. **Copy your backend URL** (e.g., `https://amazkart-backend.onrender.com`)

### 2️⃣ Seed the Database

Once backend is live, visit:
```
https://your-backend-url.onrender.com/api/seed?seedKey=your_secret_key_here
```

Or use Render Shell:
```bash
cd server
npm run seed
```

### 3️⃣ Deploy Frontend to Vercel

#### Option A: Via Vercel Dashboard (Easiest)

1. **Go to [vercel.com](https://vercel.com)** and sign up/login
2. **Click "Add New Project"**
3. **Import your GitHub repository**
4. **Configure Project**:
   - **Framework Preset**: Create React App
   - **Root Directory**: `client`
   - **Build Command**: `npm run build`
   - **Output Directory**: `build`
   - **Install Command**: `npm install`

5. **Add Environment Variable**:
   - Name: `REACT_APP_API_URL`
   - Value: `https://your-backend-url.onrender.com/api`
   - Replace `your-backend-url` with your actual Render URL

6. **Click "Deploy"**
7. **Wait for deployment** (~2-3 minutes)

#### Option B: Via Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Navigate to client folder
cd client

# Deploy
vercel

# Add environment variable when prompted
# REACT_APP_API_URL = https://your-backend-url.onrender.com/api

# Deploy to production
vercel --prod
```

### 4️⃣ Update Backend CORS

After getting your Vercel URL, update backend environment variable:
- Go to Render dashboard → Your service → Environment
- Add/Update: `FRONTEND_URL=https://your-app.vercel.app`
- Render will auto-redeploy

### 5️⃣ Test Your Deployment

1. Visit your Vercel URL
2. Test product browsing
3. Test login/signup
4. Test cart functionality

---

## 🔧 Troubleshooting

### Frontend shows "No Products Found"
- Check `REACT_APP_API_URL` in Vercel environment variables
- Verify backend URL is correct (should end with `/api`)
- Check browser console for CORS errors

### Backend not connecting to MongoDB
- Verify `MONGODB_URI` in Render environment variables
- Check MongoDB Atlas IP whitelist includes `0.0.0.0/0`
- Verify connection string format

### CORS Errors
- Make sure `FRONTEND_URL` in backend matches your Vercel URL
- Check backend logs in Render dashboard
- Verify CORS configuration in `server/src/server.js`

---

## 📝 Environment Variables Summary

### Frontend (Vercel)
```
REACT_APP_API_URL=https://your-backend.onrender.com/api
```

### Backend (Render)
```
MONGODB_URI=mongodb+srv://...
PORT=10000
SEED_KEY=your_secret_key
NODE_ENV=production
FRONTEND_URL=https://your-app.vercel.app
```

---

## ✅ Success Checklist

- [ ] Backend deployed on Render
- [ ] Database seeded with products
- [ ] Frontend deployed on Vercel
- [ ] Environment variables set correctly
- [ ] CORS configured properly
- [ ] App is accessible and working

---

## 🎉 You're Live!

Your app should now be accessible at:
- **Frontend**: `https://your-app.vercel.app`
- **Backend**: `https://your-backend.onrender.com`

Share it with the world! 🌍

