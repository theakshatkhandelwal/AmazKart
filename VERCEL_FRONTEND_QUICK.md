# 🚀 Quick Guide: Deploy Frontend to Vercel

## Your Backend URL
```
https://amazkart.onrender.com/api
```

---

## Step 1: Create Vercel Account

1. **Go to:** https://vercel.com
2. **Click "Sign Up"** (top right)
3. **Choose:** Continue with GitHub (recommended)
4. **Authorize Vercel** to access your repositories
5. **Done!** You're logged in

---

## Step 2: Import Project

1. **Click "Add New..."** → **"Project"**
2. **Find your repository:** "AmazKart" or "theakshatkhandelwal/AmazKart"
3. **Click "Import"**

---

## Step 3: Configure Project

### Important Settings:

**Framework Preset:**
```
Create React App
```
(Should auto-detect)

**Root Directory:**
```
client
```
**⚠️ CRITICAL:** Click "Edit" and set this to `client`!

**Build Command:**
```
npm run build
```
(Default - should be correct)

**Output Directory:**
```
build
```
(Default - should be correct)

**Install Command:**
```
npm install
```
(Default - should be correct)

---

## Step 4: Add Environment Variable

**This is CRITICAL!**

1. **Scroll to "Environment Variables"** section
2. **Click "Add"**
3. **Enter:**
   - **Name:** `REACT_APP_API_URL`
   - **Value:** `https://amazkart.onrender.com/api`
   - **Environments:** Check all (Production, Preview, Development)
4. **Click "Save"**

---

## Step 5: Deploy

1. **Review settings:**
   - ✅ Root Directory: `client`
   - ✅ Framework: Create React App
   - ✅ Environment Variable: `REACT_APP_API_URL` set
2. **Click "Deploy"** (blue button)
3. **Wait 2-5 minutes** for deployment

---

## Step 6: Get Your Frontend URL

Once deployed:
1. **You'll see "Congratulations!"**
2. **Copy your URL:** `https://amazkart.vercel.app` (or similar)
3. **Click the URL** to open your app!

---

## Step 7: Update Backend CORS (Optional)

Your backend CORS already allows `.vercel.app` domains, but you can add your specific URL:

1. **Go to Render Dashboard**
2. **Your service** → **Environment** tab
3. **Add/Update:**
   - **Key:** `FRONTEND_URL`
   - **Value:** `https://your-app-name.vercel.app`
4. **Save** (auto-redeploys)

---

## ✅ Verify Everything Works

1. **Visit your Vercel URL**
2. **Check if products load** on homepage
3. **Test navigation:**
   - Click on a product
   - Add to cart
   - Test login/signup pages

---

## 🐛 Troubleshooting

### "No Products Found"

**Check:**
1. Environment variable `REACT_APP_API_URL` is set correctly
2. Backend is running (visit `https://amazkart.onrender.com/api/health`)
3. Database is seeded (visit `https://amazkart.onrender.com/api/products`)

**Fix:**
- Verify environment variable in Vercel dashboard
- Make sure it's: `https://amazkart.onrender.com/api`
- Redeploy if needed

### Build Fails

**Check:**
1. Root Directory is set to `client`
2. Build command is `npm run build`
3. Check build logs for specific errors

**Fix:**
- Update Root Directory to `client`
- Check build logs for errors
- Fix errors and redeploy

### CORS Errors

**Check:**
1. Backend `FRONTEND_URL` environment variable
2. Browser console for CORS errors

**Fix:**
- Add frontend URL to backend `FRONTEND_URL` in Render
- Wait for backend to redeploy

---

## 📝 Quick Checklist

- [ ] Vercel account created
- [ ] Repository imported
- [ ] Root Directory set to `client`
- [ ] Environment variable added: `REACT_APP_API_URL = https://amazkart.onrender.com/api`
- [ ] Deployed successfully
- [ ] Frontend URL saved
- [ ] App tested and working

---

## 🎉 Success!

Your full-stack app is now live!

**Frontend:** `https://your-app.vercel.app`  
**Backend:** `https://amazkart.onrender.com`

Share it with the world! 🚀

---

## 📚 Need More Details?

See `VERCEL_FRONTEND_DEPLOY.md` for comprehensive guide.

