# 🚀 Detailed Guide: Deploy Backend to Render

This guide will walk you through deploying your AmazKart backend to Render step-by-step.

---

## 📋 Prerequisites

Before starting, make sure you have:
- ✅ GitHub account with your code pushed
- ✅ MongoDB Atlas account with database set up
- ✅ MongoDB connection string ready
- ✅ Render account (we'll create one)

---

## Step 1: Create Render Account

1. **Go to [render.com](https://render.com)**
2. **Click "Get Started for Free"** (top right)
3. **Sign up using one of these methods:**
   - GitHub (Recommended - easiest)
   - Email
   - Google
4. **Verify your email** if you used email signup
5. **Complete your profile** (optional)

---

## Step 2: Create New Web Service

1. **Once logged in, you'll see the Render Dashboard**
2. **Click the "New +" button** (top right, blue button)
3. **Select "Web Service"** from the dropdown menu

---

## Step 3: Connect GitHub Repository

1. **You'll see "Connect a repository" section**
2. **Click "Connect account"** if you haven't connected GitHub yet
3. **Authorize Render** to access your GitHub repositories
4. **Search for your repository** (e.g., "AmazKart")
5. **Click on your repository** to select it
6. **Click "Connect"**

---

## Step 4: Configure Web Service

Fill in the following configuration:

### Basic Settings

**Name:**
```
amazkart-backend
```
(Or any name you prefer - this will be part of your URL)

**Region:**
```
Oregon (US West)
```
(Choose the region closest to you or your users)

**Branch:**
```
main
```
(Or `master` if that's your default branch)

**Root Directory:**
```
server
```
(This tells Render where your backend code is)

**Runtime:**
```
Node
```
(Should auto-detect)

**Build Command:**
```
npm install
```
(Installs all dependencies)

**Start Command:**
```
npm start
```
(This runs `node src/server.js`)

---

## Step 5: Add Environment Variables

This is **CRITICAL** - your app won't work without these!

1. **Scroll down to "Environment Variables" section**
2. **Click "Add Environment Variable"** for each variable below

### Required Variables:

#### 1. MONGODB_URI
```
Key: MONGODB_URI
Value: mongodb+srv://username:password@cluster.mongodb.net/dbname?retryWrites=true&w=majority
```
**Important:** 
- Replace `username`, `password`, `cluster`, and `dbname` with your actual MongoDB Atlas values
- Get this from MongoDB Atlas → Connect → Connect your application
- Make sure there are no spaces in the connection string

#### 2. PORT
```
Key: PORT
Value: 10000
```
(Render will auto-assign a port, but setting this ensures consistency)

#### 3. SEED_KEY
```
Key: SEED_KEY
Value: your_secret_key_here_12345
```
**Important:**
- Use a strong, random string
- You'll need this to seed your database later
- Example: `AmazKart2024SecretKey!@#`

#### 4. NODE_ENV
```
Key: NODE_ENV
Value: production
```
(This tells Node.js it's running in production mode)

#### 5. FRONTEND_URL (Add after Vercel deployment)
```
Key: FRONTEND_URL
Value: https://your-app.vercel.app
```
**Note:** Add this AFTER you deploy to Vercel and get your frontend URL

---

## Step 6: Choose Plan

1. **Select "Free" plan** (perfect for getting started)
   - 750 hours/month free
   - Spins down after 15 minutes of inactivity
   - Free tier is great for demos and small projects

2. **Or upgrade to "Starter"** ($7/month) if you need:
   - Always-on service
   - More resources
   - Better performance

---

## Step 7: Deploy

1. **Review all your settings** one more time
2. **Click "Create Web Service"** (blue button at bottom)
3. **Wait for deployment** - This takes 5-10 minutes

### What happens during deployment:

1. **Render clones your repository**
2. **Installs dependencies** (`npm install`)
3. **Builds your application**
4. **Starts the server** (`npm start`)
5. **Checks health** (makes sure it's running)

You'll see logs in real-time showing the progress.

---

## Step 8: Get Your Backend URL

Once deployment is complete:

1. **You'll see "Your service is live!" message**
2. **Copy the URL** shown (e.g., `https://amazkart-backend.onrender.com`)
3. **Save this URL** - you'll need it for Vercel deployment

**Your backend API will be at:**
```
https://your-backend-url.onrender.com/api
```

---

## Step 9: Test Backend Health

1. **Open a new browser tab**
2. **Visit:** `https://your-backend-url.onrender.com/api/health`
3. **You should see:**
```json
{
  "success": true,
  "message": "Server is running",
  "timestamp": "2024-..."
}
```

If you see this, your backend is working! ✅

---

## Step 10: Seed the Database

You need to populate your database with products.

### Option A: Via Browser (Easiest)

1. **Visit this URL in your browser:**
```
https://your-backend-url.onrender.com/api/seed?seedKey=your_seed_key_here
```
2. **Replace `your_seed_key_here`** with the SEED_KEY you set earlier
3. **You should see:**
```json
{
  "success": true,
  "message": "Database seeded successfully",
  "count": 8
}
```

### Option B: Via Render Shell

1. **Go to Render Dashboard** → Your service
2. **Click "Shell" tab** (top navigation)
3. **Run these commands:**
```bash
cd server
npm run seed
```
4. **Wait for completion** - you'll see success message

### Option C: Via cURL (Command Line)

```bash
curl -X POST "https://your-backend-url.onrender.com/api/seed?seedKey=your_seed_key_here"
```

---

## Step 11: Verify Products Endpoint

1. **Visit:** `https://your-backend-url.onrender.com/api/products`
2. **You should see a JSON response** with 8 products
3. **If you see products, database seeding worked!** ✅

---

## 🔧 Troubleshooting

### Backend won't start

**Check logs:**
1. Go to Render Dashboard → Your service
2. Click "Logs" tab
3. Look for error messages

**Common issues:**

1. **"MONGODB_URI is not defined"**
   - Solution: Add MONGODB_URI environment variable
   - Make sure there are no typos

2. **"Cannot connect to MongoDB"**
   - Solution: Check MongoDB Atlas IP whitelist
   - Add `0.0.0.0/0` to allow all IPs
   - Verify connection string is correct

3. **"Port already in use"**
   - Solution: Remove PORT variable or set to 10000
   - Render will auto-assign if not set

4. **"Module not found"**
   - Solution: Check package.json has all dependencies
   - Verify build command is `npm install`

### Database connection timeout

1. **Check MongoDB Atlas:**
   - Network Access → Add `0.0.0.0/0`
   - Database Access → Verify user has read/write permissions

2. **Verify connection string:**
   - Should start with `mongodb+srv://`
   - No spaces or special characters (except in password)
   - Includes database name

### Service keeps restarting

1. **Check logs** for error messages
2. **Verify all environment variables** are set
3. **Check MongoDB connection** is working
4. **Verify start command** is correct

---

## 📊 Monitoring Your Backend

### View Logs
- **Render Dashboard** → Your service → "Logs" tab
- Shows real-time logs
- Useful for debugging

### View Metrics
- **Render Dashboard** → Your service → "Metrics" tab
- CPU usage
- Memory usage
- Request count

### Manual Restart
- **Render Dashboard** → Your service → "Manual Deploy" → "Clear build cache & deploy"

---

## 🔄 Updating Your Backend

Render automatically redeploys when you push to GitHub:

1. **Make changes** to your code
2. **Commit and push** to GitHub:
```bash
git add .
git commit -m "Update backend"
git push origin main
```
3. **Render detects the push** automatically
4. **Redeploys** your service (takes 5-10 minutes)

---

## 💰 Free Tier Limitations

**Render Free Tier:**
- ✅ 750 hours/month (enough for ~24/7 if you're the only user)
- ⚠️ Spins down after 15 minutes of inactivity
- ⚠️ First request after spin-down takes 30-60 seconds (cold start)
- ✅ Perfect for demos and small projects

**To avoid spin-down:**
- Use a service like UptimeRobot to ping your backend every 10 minutes
- Or upgrade to Starter plan ($7/month)

---

## ✅ Backend Deployment Checklist

- [ ] Render account created
- [ ] GitHub repository connected
- [ ] Web service created
- [ ] Environment variables added:
  - [ ] MONGODB_URI
  - [ ] PORT
  - [ ] SEED_KEY
  - [ ] NODE_ENV
- [ ] Service deployed successfully
- [ ] Health check endpoint working
- [ ] Database seeded with products
- [ ] Products endpoint returning data
- [ ] Backend URL saved for Vercel deployment

---

## 🎉 Success!

Your backend is now live at:
```
https://your-backend-url.onrender.com
```

**Next Step:** Deploy your frontend to Vercel using the Vercel deployment guide!

---

## 📝 Quick Reference

**Backend URL:** `https://your-backend-url.onrender.com`
**API Base:** `https://your-backend-url.onrender.com/api`
**Health Check:** `https://your-backend-url.onrender.com/api/health`
**Products:** `https://your-backend-url.onrender.com/api/products`
**Seed:** `https://your-backend-url.onrender.com/api/seed?seedKey=YOUR_KEY`

