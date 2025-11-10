# 🚀 Deployment Guide - AmazKart to Vercel

This guide will help you deploy your AmazKart application to Vercel (frontend) and Render/Railway (backend).

## 📋 Prerequisites

1. **GitHub Account** - Your code should be pushed to GitHub
2. **Vercel Account** - Sign up at [vercel.com](https://vercel.com)
3. **Render/Railway Account** - For backend deployment (free tier available)
4. **MongoDB Atlas** - Already set up

---

## 🎯 Deployment Strategy

- **Frontend (React)** → Deploy to **Vercel** (Free, fast, easy)
- **Backend (Express)** → Deploy to **Render** or **Railway** (Free tier available)

---

## Part 1: Deploy Backend to Render

### Step 1: Prepare Backend for Deployment

1. **Update CORS in `server/src/server.js`**:
   - Make sure CORS allows your Vercel domain
   - We'll update this after getting the Vercel URL

### Step 2: Deploy to Render

1. **Go to [Render.com](https://render.com)** and sign up/login
2. **Click "New +" → "Web Service"**
3. **Connect your GitHub repository**
4. **Configure the service**:
   - **Name**: `amazkart-backend` (or any name)
   - **Environment**: `Node`
   - **Build Command**: `cd server && npm install`
   - **Start Command**: `cd server && npm start`
   - **Root Directory**: Leave empty (or set to `server` if needed)

5. **Add Environment Variables**:
   - Click "Environment" tab
   - Add these variables:
     ```
     MONGODB_URI=your_mongodb_atlas_connection_string
     PORT=10000
     SEED_KEY=your_secret_seed_key
     NODE_ENV=production
     ```

6. **Click "Create Web Service"**
7. **Wait for deployment** (takes 5-10 minutes)
8. **Copy your backend URL** (e.g., `https://amazkart-backend.onrender.com`)

### Step 3: Update MongoDB Atlas IP Whitelist

1. Go to MongoDB Atlas → Network Access
2. Add `0.0.0.0/0` to allow all IPs (or add Render's IP ranges)
3. This allows Render to connect to your database

### Step 4: Seed the Database

1. Once backend is deployed, visit: `https://your-backend-url.onrender.com/api/seed?key=your_seed_key`
2. Or use the Render shell to run: `cd server && npm run seed`

---

## Part 2: Deploy Frontend to Vercel

### Step 1: Update API URL

1. **Update `client/src/api/api.js`** (already done - uses environment variable)
2. **Create `.env.production` in `client/` folder**:
   ```env
   REACT_APP_API_URL=https://your-backend-url.onrender.com/api
   ```
   Replace `your-backend-url` with your actual Render backend URL

### Step 2: Deploy to Vercel

#### Option A: Using Vercel CLI (Recommended)

1. **Install Vercel CLI**:
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**:
   ```bash
   vercel login
   ```

3. **Navigate to client folder**:
   ```bash
   cd client
   ```

4. **Deploy**:
   ```bash
   vercel
   ```
   - Follow the prompts
   - When asked for project settings, use defaults
   - When asked for environment variables, add:
     ```
     REACT_APP_API_URL=https://your-backend-url.onrender.com/api
     ```

5. **For production deployment**:
   ```bash
   vercel --prod
   ```

#### Option B: Using Vercel Dashboard (Easier)

1. **Go to [vercel.com](https://vercel.com)** and sign up/login
2. **Click "Add New Project"**
3. **Import your GitHub repository**
4. **Configure the project**:
   - **Framework Preset**: Create React App
   - **Root Directory**: `client`
   - **Build Command**: `npm run build`
   - **Output Directory**: `build`
   - **Install Command**: `npm install`

5. **Add Environment Variables**:
   - Click "Environment Variables"
   - Add:
     ```
     REACT_APP_API_URL = https://your-backend-url.onrender.com/api
     ```
   - Replace `your-backend-url` with your Render backend URL

6. **Click "Deploy"**
7. **Wait for deployment** (takes 2-5 minutes)

### Step 3: Update Backend CORS

1. **Go to Render dashboard** → Your backend service
2. **Go to "Environment" tab**
3. **Update your backend code** to allow Vercel domain:
   ```javascript
   // In server/src/server.js
   const allowedOrigins = [
     'http://localhost:3000',
     'https://your-vercel-app.vercel.app',
     'https://your-custom-domain.com'
   ];
   ```

4. **Redeploy backend** (Render auto-deploys on git push)

---

## Part 3: Update CORS in Backend

Update `server/src/server.js` to include your Vercel URL:

```javascript
const cors = require('cors');

const corsOptions = {
  origin: function (origin, callback) {
    const allowedOrigins = [
      'http://localhost:3000',
      'https://your-app-name.vercel.app',
      process.env.FRONTEND_URL
    ].filter(Boolean);
    
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
};

app.use(cors(corsOptions));
```

Then push to GitHub, and Render will auto-deploy.

---

## 🔧 Alternative: Deploy Backend to Railway

If you prefer Railway over Render:

1. **Go to [Railway.app](https://railway.app)** and sign up
2. **Click "New Project" → "Deploy from GitHub repo"**
3. **Select your repository**
4. **Configure**:
   - **Root Directory**: `server`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`

5. **Add Environment Variables**:
   - `MONGODB_URI`
   - `PORT` (Railway auto-assigns, but you can set it)
   - `SEED_KEY`
   - `NODE_ENV=production`

6. **Copy the Railway URL** and use it in your frontend `.env`

---

## ✅ Post-Deployment Checklist

- [ ] Backend deployed and accessible
- [ ] Frontend deployed and accessible
- [ ] Environment variables set correctly
- [ ] CORS configured to allow frontend domain
- [ ] MongoDB Atlas IP whitelist updated
- [ ] Database seeded with products
- [ ] Test login/signup functionality
- [ ] Test product browsing
- [ ] Test cart functionality

---

## 🌐 Custom Domain (Optional)

### For Vercel:
1. Go to your project → Settings → Domains
2. Add your custom domain
3. Follow DNS configuration instructions

### For Render:
1. Go to your service → Settings → Custom Domain
2. Add your domain
3. Update DNS records

---

## 🐛 Troubleshooting

### Frontend can't connect to backend
- Check `REACT_APP_API_URL` environment variable
- Verify backend URL is correct
- Check CORS settings in backend

### Backend not starting
- Check environment variables in Render/Railway
- Check MongoDB connection string
- View logs in Render/Railway dashboard

### Database connection issues
- Verify MongoDB Atlas IP whitelist includes `0.0.0.0/0`
- Check connection string is correct
- Verify database user has proper permissions

### Build fails
- Check Node.js version (should be 18+)
- Verify all dependencies are in `package.json`
- Check build logs for specific errors

---

## 📝 Quick Commands

### Deploy Frontend (Vercel CLI)
```bash
cd client
vercel --prod
```

### Deploy Backend (Render)
- Auto-deploys on git push
- Or use Render dashboard to trigger manual deploy

### Seed Database (After Backend Deployment)
```bash
# Via Render Shell or Railway CLI
cd server
npm run seed
```

---

## 🎉 You're Done!

Your AmazKart app should now be live at:
- **Frontend**: `https://your-app.vercel.app`
- **Backend**: `https://your-backend.onrender.com`

Share your deployed app with the world! 🚀

