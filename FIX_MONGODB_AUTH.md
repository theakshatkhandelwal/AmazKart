# 🔧 Fix: MongoDB Authentication Failed

## The Problem

**Error:** `bad auth : authentication failed`

This means your MongoDB connection string has incorrect username or password.

---

## ✅ Solution: Fix MongoDB Connection String

### Step 1: Get Fresh Connection String from MongoDB Atlas

1. **Go to:** https://cloud.mongodb.com
2. **Log in** to your account
3. **Click "Connect"** button (on your cluster)
4. **Select "Connect your application"**
5. **Choose:**
   - Driver: `Node.js`
   - Version: `5.5 or later`
6. **Copy the connection string**
   - It looks like: `mongodb+srv://<username>:<password>@cluster.mongodb.net/`

### Step 2: Replace Password Placeholder

**Important:** The connection string has `<password>` placeholder that you MUST replace!

1. **Copy the connection string**
2. **Replace `<password>`** with your actual MongoDB database password
3. **If your password has special characters**, you need to URL-encode them:
   - `@` becomes `%40`
   - `#` becomes `%23`
   - `$` becomes `%24`
   - `%` becomes `%25`
   - `&` becomes `%26`
   - `+` becomes `%2B`
   - `=` becomes `%3D`
   - `?` becomes `%3F`
   - `/` becomes `%2F`
   - ` ` (space) becomes `%20`

**Example:**
```
Original: mongodb+srv://user:my@pass#123@cluster.mongodb.net/
Encoded:  mongodb+srv://user:my%40pass%23123@cluster.mongodb.net/
```

### Step 3: Update Render Environment Variable

1. **Go to Render Dashboard**
2. **Click on your service** (amazkart-backend)
3. **Click "Environment" tab**
4. **Find `MONGODB_URI`**
5. **Click on it to edit**
6. **Paste your corrected connection string:**
   - Make sure password is replaced
   - Make sure special characters are URL-encoded
   - Should look like: `mongodb+srv://username:password@cluster.mongodb.net/dbname?retryWrites=true&w=majority`
7. **Click "Save Changes"**
8. **Render will automatically redeploy** (wait 5-10 minutes)

### Step 4: Verify Connection String Format

Your connection string should:
- ✅ Start with `mongodb+srv://`
- ✅ Have username (no `<username>` placeholder)
- ✅ Have password (no `<password>` placeholder)
- ✅ Have cluster URL
- ✅ Have database name
- ✅ End with `?retryWrites=true&w=majority`

**Correct format:**
```
mongodb+srv://myuser:mypassword123@cluster0.xxxxx.mongodb.net/amazkart?retryWrites=true&w=majority
```

---

## 🔍 Alternative: Reset MongoDB Password

If you're not sure what your password is:

### Step 1: Reset Database User Password

1. **Go to MongoDB Atlas**
2. **Click "Database Access"** (left sidebar)
3. **Find your database user**
4. **Click "Edit"** (pencil icon)
5. **Click "Edit Password"**
6. **Enter new password:**
   - Use a strong password
   - **Save it somewhere safe!**
   - Avoid special characters if possible (or URL-encode them)
7. **Click "Update User"**

### Step 2: Get New Connection String

1. **Go to "Connect"** → "Connect your application"
2. **Copy the connection string**
3. **Replace `<password>`** with your NEW password
4. **URL-encode special characters** if needed

### Step 3: Update Render

1. **Render Dashboard** → Your service → Environment
2. **Update `MONGODB_URI`** with new connection string
3. **Save** (auto-redeploys)

---

## 🐛 Common Issues

### Issue 1: Password Has Special Characters

**Problem:** Password contains `@`, `#`, `$`, etc.

**Solution:** URL-encode them:
- Use an online URL encoder: https://www.urlencoder.org/
- Or manually replace (see encoding table above)

### Issue 2: Password Has Spaces

**Problem:** Password has spaces

**Solution:** Replace spaces with `%20` or use a password without spaces

### Issue 3: Wrong Username

**Problem:** Using wrong username

**Solution:**
1. Check MongoDB Atlas → Database Access
2. Verify the correct username
3. Update connection string

### Issue 4: Connection String Format Wrong

**Problem:** Connection string malformed

**Solution:** Make sure format is:
```
mongodb+srv://USERNAME:PASSWORD@CLUSTER.mongodb.net/DATABASE?retryWrites=true&w=majority
```

---

## ✅ Verify the Fix

### Check Render Logs:

1. **Render Dashboard** → Your service → **Logs** tab
2. **Look for:**
   ```
   ✅ Connected to MongoDB
   🚀 Server running on port 10000
   ```
3. **If you see these, it's working!** ✅

### Test Health Endpoint:

1. **Visit:** `https://your-backend-url.onrender.com/api/health`
2. **Should see:**
   ```json
   {
     "success": true,
     "message": "Server is running"
   }
   ```

---

## 📝 Quick Checklist

- [ ] Got fresh connection string from MongoDB Atlas
- [ ] Replaced `<password>` with actual password
- [ ] URL-encoded special characters in password
- [ ] Updated `MONGODB_URI` in Render
- [ ] Waited for redeployment
- [ ] Checked logs for success
- [ ] Tested health endpoint

---

## 💡 Pro Tips

1. **Use simple passwords** (no special characters) to avoid encoding issues
2. **Save connection string** in a secure place
3. **Test connection string locally** before deploying
4. **Double-check** username and password match Atlas

---

## 🎯 Most Common Solution

**99% of the time, this fixes it:**

1. Get fresh connection string from MongoDB Atlas
2. Replace `<password>` with actual password
3. URL-encode special characters
4. Update `MONGODB_URI` in Render
5. Wait for redeployment

That's it! 🎉

