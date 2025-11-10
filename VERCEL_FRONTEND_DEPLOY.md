# 🚀 Detailed Guide: Deploy Frontend to Vercel

This comprehensive guide will walk you through deploying your AmazKart React frontend to Vercel step-by-step.

---

## 📋 Prerequisites

Before starting, make sure you have:
- ✅ Backend deployed to Render (get the URL first!)
- ✅ GitHub account with your code pushed
- ✅ Backend URL ready (e.g., `https://amazkart-backend.onrender.com`)
- ✅ Vercel account (we'll create one)

---

## Step 1: Create Vercel Account

1. **Go to [vercel.com](https://vercel.com)**
2. **Click "Sign Up"** (top right)
3. **Choose sign-up method:**
   - **GitHub** (Recommended - easiest integration)
   - **GitLab**
   - **Bitbucket**
   - **Email**
4. **If using GitHub:**
   - Click "Continue with GitHub"
   - Authorize Vercel to access your repositories
   - Select repositories to give access (or all repositories)
5. **Complete your profile** (optional)

---

## Step 2: Import Your Project

1. **Once logged in, you'll see the Vercel Dashboard**
2. **Click "Add New..." button** (top right)
3. **Select "Project"** from the dropdown
4. **You'll see "Import Git Repository" page**

---

## Step 3: Connect Repository

1. **Find your repository** in the list
   - If you don't see it, click "Adjust GitHub App Permissions"
   - Grant access to your repository
2. **Click "Import"** next to your repository (AmazKart)

---

## Step 4: Configure Project

You'll see the "Configure Project" page. Fill in these settings:

### Framework Preset

**Select:**
```
Create React App
```
(Vercel should auto-detect this, but verify it's selected)

### Root Directory

**Click "Edit"** next to Root Directory, then:
```
client
```
(This tells Vercel where your React app is located)

**Important:** Since your React app is in the `client` folder, you MUST set this!

### Build and Output Settings

**Build Command:**
```
npm run build
```
(This creates the production build)

**Output Directory:**
```
build
```
(Where React builds the production files)

**Install Command:**
```
npm install
```
(Installs dependencies - default is usually fine)

### Environment Variables

**This is CRITICAL!** Click "Add" to add environment variable:

**Variable Name:**
```
REACT_APP_API_URL
```

**Value:**
```
https://your-backend-url.onrender.com/api
```

**Important:**
- Replace `your-backend-url` with your actual Render backend URL
- Make sure it ends with `/api`
- Example: `https://amazkart-backend.onrender.com/api`

**For which environments?**
- ✅ Production
- ✅ Preview
- ✅ Development

(Check all three so it works everywhere)

---

## Step 5: Deploy

1. **Review all settings** one more time:
   - ✅ Framework: Create React App
   - ✅ Root Directory: `client`
   - ✅ Build Command: `npm run build`
   - ✅ Output Directory: `build`
   - ✅ Environment Variable: `REACT_APP_API_URL` set correctly

2. **Click "Deploy"** (blue button at bottom)

3. **Wait for deployment** - This takes 2-5 minutes

### What happens during deployment:

1. **Vercel clones your repository**
2. **Installs dependencies** (`npm install` in client folder)
3. **Builds your React app** (`npm run build`)
4. **Optimizes assets** (images, CSS, JS)
5. **Deploys to CDN** (global content delivery)

You'll see real-time build logs showing progress.

---

## Step 6: Get Your Frontend URL

Once deployment is complete:

1. **You'll see "Congratulations!" message**
2. **Your app is live!** 🎉
3. **Copy the URL** shown (e.g., `https://amazkart.vercel.app`)
4. **Click the URL** to open your app in a new tab

**Your frontend will be at:**
```
https://your-app-name.vercel.app
```

---

## Step 7: Test Your Deployed App

1. **Open your Vercel URL** in a browser
2. **Check if products load:**
   - You should see products on the homepage
   - If you see "No Products Found", check the next section

3. **Test navigation:**
   - Click on a product
   - Try adding to cart
   - Test login/signup pages

---

## Step 8: Update Backend CORS

Your backend needs to know about your frontend URL:

1. **Go to Render Dashboard** → Your backend service
2. **Click "Environment" tab**
3. **Add/Update environment variable:**

**Variable Name:**
```
FRONTEND_URL
```

**Value:**
```
https://your-app-name.vercel.app
```

**Replace `your-app-name`** with your actual Vercel app name

4. **Render will automatically redeploy** (takes 5-10 minutes)

**Alternative:** The backend CORS is already configured to allow any `.vercel.app` domain, so this step is optional but recommended.

---

## Step 9: Verify Everything Works

### Test Checklist:

- [ ] **Homepage loads** with products
- [ ] **Product images** display correctly
- [ ] **Product detail page** works
- [ ] **Add to cart** functionality works
- [ ] **Cart page** shows items
- [ ] **Login page** accessible
- [ ] **Sign up page** accessible
- [ ] **Category pages** work
- [ ] **Search bar** visible

### Check Browser Console:

1. **Open browser DevTools** (F12)
2. **Go to Console tab**
3. **Look for errors:**
   - ❌ CORS errors = Backend CORS not configured
   - ❌ Network errors = API URL incorrect
   - ❌ 404 errors = Route not found

---

## 🔧 Troubleshooting

### "No Products Found" Error

**Possible causes:**

1. **Environment variable not set:**
   - Go to Vercel Dashboard → Your project → Settings → Environment Variables
   - Verify `REACT_APP_API_URL` is set correctly
   - Make sure it ends with `/api`

2. **Backend not running:**
   - Check Render dashboard - is backend service running?
   - Visit backend health endpoint: `https://your-backend.onrender.com/api/health`

3. **CORS error:**
   - Check browser console for CORS errors
   - Update backend `FRONTEND_URL` environment variable
   - Wait for backend to redeploy

4. **Database not seeded:**
   - Seed your database (see Render deployment guide)
   - Visit: `https://your-backend.onrender.com/api/products` to verify

### Build Fails

**Check build logs:**

1. **Vercel Dashboard** → Your project → Deployments
2. **Click on failed deployment**
3. **View build logs**

**Common issues:**

1. **"Module not found"**
   - Solution: Check `package.json` has all dependencies
   - Verify `npm install` runs successfully

2. **"Build command failed"**
   - Solution: Check `npm run build` works locally
   - Verify all imports are correct

3. **"Root directory not found"**
   - Solution: Set Root Directory to `client` in project settings

### Environment Variable Not Working

**React environment variables:**
- Must start with `REACT_APP_`
- Must be set in Vercel dashboard
- Require redeployment to take effect

**To update:**
1. Vercel Dashboard → Project → Settings → Environment Variables
2. Update the value
3. Click "Redeploy" (or push a new commit)

### Images Not Loading

**If using external images (Unsplash):**
- Should work fine (they're external URLs)
- Check browser network tab for failed requests

**If using local images:**
- Make sure they're in `public` folder
- Use relative paths: `/images/photo.jpg`

---

## 📊 Vercel Dashboard Features

### Deployments Tab

- **View all deployments**
- **See build logs**
- **Redeploy previous versions**
- **View deployment status**

### Settings Tab

**General:**
- Project name
- Framework preset
- Root directory
- Build settings

**Environment Variables:**
- Add/edit variables
- Set for Production/Preview/Development
- Encrypted storage

**Domains:**
- Add custom domain
- Configure DNS
- SSL certificates (automatic)

**Analytics:**
- Page views
- Performance metrics
- User analytics

---

## 🔄 Updating Your Frontend

Vercel automatically redeploys when you push to GitHub:

1. **Make changes** to your code
2. **Commit and push** to GitHub:
```bash
git add .
git commit -m "Update frontend"
git push origin main
```
3. **Vercel detects the push** automatically
4. **Redeploys** your app (takes 2-5 minutes)

**You'll get:**
- ✅ New deployment URL
- ✅ Preview URL for each commit
- ✅ Automatic production deployment from `main` branch

---

## 🌐 Custom Domain (Optional)

### Add Custom Domain:

1. **Vercel Dashboard** → Your project → Settings → Domains
2. **Click "Add"**
3. **Enter your domain** (e.g., `amazkart.com`)
4. **Follow DNS configuration instructions:**
   - Add CNAME record pointing to Vercel
   - Or add A record with Vercel IP
5. **Wait for DNS propagation** (5-60 minutes)
6. **SSL certificate** is automatically issued

---

## 💰 Vercel Pricing

**Free Tier (Hobby):**
- ✅ Unlimited deployments
- ✅ Automatic SSL
- ✅ Global CDN
- ✅ Preview deployments
- ✅ 100GB bandwidth/month
- ✅ Perfect for personal projects

**Pro Tier ($20/month):**
- Everything in Hobby
- Team collaboration
- More bandwidth
- Advanced analytics
- Priority support

---

## 🎨 Preview Deployments

**Every push creates a preview:**
- Unique URL for each branch/PR
- Test changes before merging
- Share with team for feedback
- Example: `https://amazkart-git-feature-branch.vercel.app`

---

## ✅ Frontend Deployment Checklist

- [ ] Vercel account created
- [ ] GitHub repository connected
- [ ] Project imported
- [ ] Configuration set:
  - [ ] Framework: Create React App
  - [ ] Root Directory: `client`
  - [ ] Build Command: `npm run build`
  - [ ] Output Directory: `build`
- [ ] Environment variable added:
  - [ ] `REACT_APP_API_URL` = `https://your-backend.onrender.com/api`
- [ ] Deployment successful
- [ ] Frontend URL saved
- [ ] Backend CORS updated with frontend URL
- [ ] App tested and working
- [ ] All features verified

---

## 🎉 Success!

Your frontend is now live at:
```
https://your-app-name.vercel.app
```

**Your full-stack app is deployed!** 🚀

---

## 📝 Quick Reference

**Frontend URL:** `https://your-app-name.vercel.app`
**Backend URL:** `https://your-backend.onrender.com`
**API Base:** `https://your-backend.onrender.com/api`

**Environment Variable:**
```
REACT_APP_API_URL=https://your-backend.onrender.com/api
```

---

## 🔗 Next Steps

1. ✅ Test all features
2. ✅ Share your app with others
3. ✅ Monitor usage in Vercel dashboard
4. ✅ Set up custom domain (optional)
5. ✅ Configure analytics (optional)

---

## 🆘 Need Help?

1. **Check Vercel documentation:** https://vercel.com/docs
2. **View deployment logs** in Vercel dashboard
3. **Check browser console** for errors
4. **Verify environment variables** are set correctly
5. **Test backend** is accessible

---

## 🎯 Pro Tips

1. **Use Preview Deployments** to test before merging
2. **Monitor Analytics** to see how your app performs
3. **Set up Custom Domain** for professional look
4. **Enable Vercel Analytics** for insights
5. **Use Environment Variables** for different environments

Your AmazKart app is now live and ready to use! 🎊

