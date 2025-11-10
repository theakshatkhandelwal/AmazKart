# 🔧 Fix: Products Not Loading

Your frontend shows "Loading products..." but nothing appears. Let's fix this step by step.

---

## 🔍 Step 1: Check Backend Health

**Visit in browser:**
```
https://amazkart.onrender.com/api/health
```

**Expected:** 
```json
{
  "success": true,
  "message": "Server is running",
  "timestamp": "..."
}
```

**If you see this:** ✅ Backend is running  
**If error:** ❌ Backend is down - check Render dashboard

---

## 🌱 Step 2: Check if Database is Seeded

**Visit in browser:**
```
https://amazkart.onrender.com/api/products
```

**Expected:** Array of 8 products
```json
{
  "success": true,
  "data": [
    { "name": "MacBook Pro 16", ... },
    { "name": "iPhone 15 Pro", ... },
    ...
  ]
}
```

**If empty array `[]`:** ❌ Database not seeded - seed it now!  
**If 8 products:** ✅ Database is seeded

---

## 🌱 Step 3: Seed Database (If Not Seeded)

**If products endpoint returns empty array:**

1. **Get SEED_KEY from Render:**
   - Render Dashboard → Your service → Environment
   - Copy `SEED_KEY` value

2. **Visit seed URL:**
   ```
   https://amazkart.onrender.com/api/seed?seedKey=YOUR_SEED_KEY
   ```

3. **Should see:**
   ```json
   {
     "success": true,
     "message": "Database seeded successfully",
     "count": 8
   }
   ```

4. **Verify products:**
   - Visit: `https://amazkart.onrender.com/api/products`
   - Should now show 8 products

---

## ⚙️ Step 4: Check Vercel Environment Variable

**This is CRITICAL!**

1. **Go to Vercel Dashboard:** https://vercel.com/dashboard
2. **Click on your project** (AmazKart)
3. **Settings** → **Environment Variables**
4. **Find `REACT_APP_API_URL`**
5. **Verify it's set to:**
   ```
   https://amazkart.onrender.com/api
   ```
   - ✅ Must end with `/api`
   - ✅ Must be `https://` (not `http://`)
   - ✅ Must match your Render backend URL

6. **If wrong or missing:**
   - Click to edit
   - Set value: `https://amazkart.onrender.com/api`
   - Save
   - **Redeploy** (or wait for auto-deploy)

---

## 🔍 Step 5: Check Browser Console

**Look for errors:**

1. **Open browser DevTools:** Press `F12`
2. **Go to "Console" tab**
3. **Look for errors:**

   **CORS Error:**
   ```
   Access to fetch at '...' from origin '...' has been blocked by CORS policy
   ```
   **Fix:** Update backend `FRONTEND_URL` in Render

   **Network Error:**
   ```
   Failed to fetch
   ```
   **Fix:** Backend might be down or URL is wrong

   **404 Error:**
   ```
   404 Not Found
   ```
   **Fix:** Check API URL is correct

---

## 🔧 Step 6: Common Fixes

### Fix 1: Backend Not Running

**Check Render Dashboard:**
- Is service status "Live"?
- Check logs for errors
- Restart service if needed

### Fix 2: Database Not Seeded

**Seed it now:**
```
https://amazkart.onrender.com/api/seed?seedKey=YOUR_KEY
```

### Fix 3: Wrong API URL

**In Vercel:**
- `REACT_APP_API_URL` must be: `https://amazkart.onrender.com/api`
- Not: `https://amazkart.onrender.com` (missing `/api`)
- Not: `http://localhost:5000/api` (wrong URL)

### Fix 4: CORS Issue

**In Render:**
- Add `FRONTEND_URL` environment variable
- Value: `https://amazkart.vercel.app`
- Wait for redeploy

### Fix 5: Backend Spun Down (Free Tier)

**Render free tier spins down after 15 min:**
- First request takes 30-60 seconds (cold start)
- Wait for backend to wake up
- Or upgrade to Starter plan for always-on

---

## ✅ Quick Checklist

- [ ] Backend health check works
- [ ] Products endpoint returns 8 products (not empty)
- [ ] Database is seeded
- [ ] Vercel `REACT_APP_API_URL` is set correctly
- [ ] No CORS errors in browser console
- [ ] No network errors in browser console
- [ ] Backend service is "Live" in Render

---

## 🧪 Test URLs

**Backend Health:**
```
https://amazkart.onrender.com/api/health
```

**Products API:**
```
https://amazkart.onrender.com/api/products
```

**Seed Database:**
```
https://amazkart.onrender.com/api/seed?seedKey=YOUR_KEY
```

---

## 🎯 Most Common Issues

1. **Database not seeded** - Most common!
2. **Wrong API URL in Vercel** - Missing `/api` or wrong URL
3. **Backend spun down** - Free tier, wait for cold start
4. **CORS error** - Backend needs frontend URL

---

## 💡 Quick Fix Order

1. ✅ Seed database first
2. ✅ Verify products endpoint works
3. ✅ Check Vercel environment variable
4. ✅ Check browser console for errors
5. ✅ Hard refresh frontend (Ctrl+Shift+R)

---

## 🆘 Still Not Working?

Share:
1. What you see at `https://amazkart.onrender.com/api/products`
2. What you see in browser console (F12)
3. What `REACT_APP_API_URL` is set to in Vercel

And we'll fix it! 🔧


