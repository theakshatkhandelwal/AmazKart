# 🎓 Complete Guide: How to Use Render

This guide will teach you everything you need to know about using Render to deploy and manage your backend.

---

## 📖 What is Render?

**Render** is a cloud platform that makes it easy to deploy and run web services, databases, and static sites. Think of it as a hosting service that automatically handles:
- ✅ Server setup
- ✅ SSL certificates
- ✅ Automatic deployments
- ✅ Scaling
- ✅ Monitoring

**Perfect for:** Backend APIs, web services, databases, static sites

---

## 🚀 Getting Started

### Step 1: Create an Account

1. **Go to [render.com](https://render.com)**
2. **Click "Get Started for Free"** (top right)
3. **Choose sign-up method:**
   - **GitHub** (Recommended - easiest)
   - **Email**
   - **Google**

4. **If using GitHub:**
   - Click "Continue with GitHub"
   - Authorize Render to access your repositories
   - You're done!

5. **If using Email:**
   - Enter your email
   - Check your inbox for verification
   - Click the verification link
   - Set a password

---

## 🏠 Understanding the Render Dashboard

Once logged in, you'll see the **Dashboard**:

### Main Sections:

1. **Services** - Your deployed applications
2. **New +** - Create new services
3. **Account** - Settings, billing, team

### Dashboard Overview:

```
┌─────────────────────────────────────┐
│  Render Dashboard                    │
├─────────────────────────────────────┤
│  [New +]  [Services]  [Account]    │
├─────────────────────────────────────┤
│                                     │
│  Your Services:                     │
│  ┌─────────────────────────────┐   │
│  │ amazkart-backend            │   │
│  │ Status: Live                │   │
│  │ URL: https://...onrender.com│   │
│  └─────────────────────────────┘   │
│                                     │
└─────────────────────────────────────┘
```

---

## 🆕 Creating Your First Service

### Types of Services:

1. **Web Service** - For Node.js, Python, Ruby apps (your backend)
2. **Static Site** - For React, Vue, static HTML
3. **Background Worker** - For scheduled tasks
4. **PostgreSQL** - Database
5. **Redis** - Cache/message queue

### For Your Backend, Use: **Web Service**

---

## 📝 Step-by-Step: Create Web Service

### 1. Click "New +"

Top right corner of dashboard

### 2. Select "Web Service"

From the dropdown menu

### 3. Connect Repository

**Option A: Connect GitHub (First Time)**
- Click "Connect account"
- Authorize Render
- Select your repository
- Click "Connect"

**Option B: Already Connected**
- Search for your repository
- Click on it
- Click "Connect"

### 4. Configure Service

Fill in these fields:

#### **Name**
```
amazkart-backend
```
- This becomes part of your URL
- Use lowercase, hyphens only
- Example: `amazkart-backend.onrender.com`

#### **Region**
```
Oregon (US West)
```
- Choose closest to you or your users
- Options: US East, US West, Europe, Asia

#### **Branch**
```
main
```
- Which Git branch to deploy from
- Usually `main` or `master`

#### **Root Directory**
```
server
```
- **IMPORTANT:** Where your backend code is located
- If your code is in `server/` folder, enter `server`
- If code is in root, leave empty

#### **Runtime**
```
Node
```
- Auto-detected usually
- Options: Node, Python, Ruby, Go, etc.

#### **Build Command**
```
npm install
```
- Command to install dependencies
- For Node.js: `npm install`
- For Python: `pip install -r requirements.txt`

#### **Start Command**
```
npm start
```
- Command to start your server
- For Node.js: `npm start` or `node src/server.js`
- This runs when service starts

---

## ⚙️ Environment Variables

**What are they?**
- Secret configuration values
- Database URLs, API keys, etc.
- Not stored in code (secure)

### How to Add:

1. **Scroll to "Environment Variables" section**
2. **Click "Add Environment Variable"**
3. **Enter:**
   - **Key:** Variable name (e.g., `MONGODB_URI`)
   - **Value:** The actual value
4. **Click "Save Changes"**

### Common Variables for Your Backend:

```
MONGODB_URI = mongodb+srv://user:pass@cluster.mongodb.net/dbname
PORT = 10000
SEED_KEY = your_secret_key_123
NODE_ENV = production
FRONTEND_URL = https://your-app.vercel.app
```

**Important:**
- No spaces around `=`
- Values are case-sensitive
- Keep secrets secret!

---

## 🚀 Deploying

### 1. Review Settings

Double-check:
- ✅ Root Directory correct
- ✅ Build Command correct
- ✅ Start Command correct
- ✅ Environment variables added

### 2. Choose Plan

**Free Plan:**
- ✅ 750 hours/month
- ⚠️ Spins down after 15 min inactivity
- ✅ Perfect for demos

**Starter Plan ($7/month):**
- ✅ Always on
- ✅ More resources
- ✅ Better performance

### 3. Click "Create Web Service"

Bottom of the page

### 4. Watch Deployment

You'll see:
- Building logs
- Installing dependencies
- Starting server
- Health checks

**Takes:** 5-10 minutes first time

---

## 📊 Understanding Service Status

### Status Indicators:

- 🟢 **Live** - Running and healthy
- 🟡 **Deploying** - Currently deploying
- 🔴 **Failed** - Deployment failed
- ⚪ **Stopped** - Service stopped

### Service States:

**Live:**
- Service is running
- Accessible via URL
- Handling requests

**Deploying:**
- Building and starting
- Wait for completion
- Check logs if stuck

**Failed:**
- Something went wrong
- Check logs for errors
- Fix and redeploy

---

## 🔍 Viewing Logs

**Why logs matter:**
- See what's happening
- Debug errors
- Monitor activity

### How to View:

1. **Go to Dashboard**
2. **Click on your service**
3. **Click "Logs" tab** (top navigation)

### Log Types:

- **Build Logs** - During deployment
- **Runtime Logs** - While running
- **Error Logs** - When things break

### Reading Logs:

```
✅ Good:
[INFO] Server running on port 10000
[INFO] Connected to MongoDB

❌ Bad:
[ERROR] Cannot connect to MongoDB
[ERROR] Module not found: 'express'
```

---

## 🔄 Updating Your Service

### Automatic Deployments:

Render **automatically redeploys** when you:
- Push to connected branch
- Merge pull requests
- Update environment variables

### Manual Deploy:

1. **Go to service dashboard**
2. **Click "Manual Deploy"**
3. **Select:**
   - **Deploy latest commit** - Latest code
   - **Clear build cache & deploy** - Fresh build

### Update Environment Variables:

1. **Service dashboard** → **Environment** tab
2. **Click variable** to edit
3. **Update value**
4. **Save** (auto-redeploys)

---

## 🛠️ Service Management

### Service Dashboard Tabs:

#### **1. Overview**
- Service status
- URL
- Recent deployments
- Quick actions

#### **2. Logs**
- Real-time logs
- Build logs
- Runtime logs
- Filter/search

#### **3. Metrics**
- CPU usage
- Memory usage
- Request count
- Response times

#### **4. Environment**
- Environment variables
- Add/edit/delete
- Secure storage

#### **5. Settings**
- Service name
- Region
- Build/start commands
- Plan
- Custom domains

#### **6. Events**
- Deployment history
- Status changes
- Activity log

#### **7. Shell** (Advanced)
- Terminal access
- Run commands
- Debug issues

---

## 🔧 Common Tasks

### Restart Service:

1. **Service dashboard**
2. **Click "Manual Deploy"**
3. **Select "Deploy latest commit"**

### View Service URL:

1. **Service dashboard**
2. **Overview tab**
3. **Copy URL** (top of page)

### Check if Service is Running:

1. **Visit:** `https://your-service.onrender.com/api/health`
2. **Should see:** JSON response

### Stop Service:

1. **Settings tab**
2. **Scroll to bottom**
3. **Click "Suspend Service"**

### Delete Service:

1. **Settings tab**
2. **Scroll to bottom**
3. **Click "Delete Service"**
4. **Confirm** (cannot undo!)

---

## 💰 Understanding Plans

### Free Plan:

**Included:**
- ✅ 750 hours/month
- ✅ SSL certificates
- ✅ Automatic deployments
- ✅ Custom domains

**Limitations:**
- ⚠️ Spins down after 15 min inactivity
- ⚠️ Cold start takes 30-60 seconds
- ⚠️ Limited resources

**Best for:**
- Demos
- Personal projects
- Testing

### Starter Plan ($7/month):

**Included:**
- ✅ Always on (no spin-down)
- ✅ More CPU/RAM
- ✅ Faster performance
- ✅ Priority support

**Best for:**
- Production apps
- Always-available services
- Better performance

---

## 🐛 Troubleshooting

### Service Won't Start

**Check:**
1. **Logs** - What error appears?
2. **Environment variables** - All set?
3. **Build command** - Correct?
4. **Start command** - Correct?

**Common fixes:**
- Fix errors in logs
- Add missing environment variables
- Correct build/start commands

### Service Keeps Restarting

**Check:**
1. **Logs** for crash errors
2. **Environment variables** missing
3. **Database connection** issues

**Common fixes:**
- Fix code errors
- Add required environment variables
- Check database connection

### Build Fails

**Check:**
1. **Build logs** for errors
2. **Dependencies** in package.json
3. **Root directory** correct

**Common fixes:**
- Fix dependency issues
- Correct root directory
- Check build command

### Can't Connect to Database

**Check:**
1. **MONGODB_URI** environment variable
2. **MongoDB Atlas** IP whitelist
3. **Connection string** format

**Common fixes:**
- Add `0.0.0.0/0` to MongoDB whitelist
- Verify connection string
- Check database user permissions

---

## 📱 Mobile App

Render has a **mobile app**:
- View services
- Check status
- View logs
- Get notifications

**Download:**
- iOS App Store
- Google Play Store

---

## 🔐 Security Best Practices

1. **Never commit secrets** to Git
2. **Use environment variables** for sensitive data
3. **Keep SEED_KEY** secret
4. **Use strong passwords** for database
5. **Enable 2FA** on your account

---

## 📊 Monitoring

### Metrics to Watch:

- **CPU Usage** - Should be low
- **Memory Usage** - Watch for leaks
- **Request Count** - Traffic levels
- **Response Time** - Performance

### Alerts:

Set up alerts for:
- Service down
- High error rate
- Resource limits

---

## 🎯 Pro Tips

1. **Use Free Plan** for testing
2. **Check logs regularly** to catch issues early
3. **Save service URLs** for easy access
4. **Use environment variables** for all config
5. **Monitor metrics** to understand usage
6. **Test locally first** before deploying
7. **Keep dependencies updated**
8. **Use descriptive service names**

---

## 📚 Additional Resources

- **Render Docs:** https://render.com/docs
- **Support:** support@render.com
- **Community:** Render Discord
- **Status Page:** status.render.com

---

## ✅ Quick Reference

### Essential Commands:

**View Logs:**
- Dashboard → Service → Logs

**Update Environment:**
- Dashboard → Service → Environment

**Redeploy:**
- Dashboard → Service → Manual Deploy

**Check Status:**
- Dashboard → Service → Overview

### Important URLs:

**Your Service:**
- `https://your-service.onrender.com`

**Health Check:**
- `https://your-service.onrender.com/api/health`

**Dashboard:**
- https://dashboard.render.com

---

## 🎓 Learning Path

1. ✅ **Create account** - Sign up
2. ✅ **Deploy first service** - Follow guide
3. ✅ **Learn dashboard** - Explore tabs
4. ✅ **Monitor logs** - Watch activity
5. ✅ **Update service** - Make changes
6. ✅ **Troubleshoot** - Fix issues

---

## 🎉 You're Ready!

You now know how to:
- ✅ Create Render account
- ✅ Deploy services
- ✅ Manage services
- ✅ View logs
- ✅ Update configurations
- ✅ Troubleshoot issues

**Next Step:** Deploy your AmazKart backend using `RENDER_BACKEND_DEPLOY.md`!

---

## 💡 Remember

- **Render is free** to start
- **Automatic deployments** from Git
- **Logs help debug** issues
- **Environment variables** keep secrets safe
- **Free tier spins down** after inactivity

Happy deploying! 🚀

