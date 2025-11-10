# ✅ Deployment Checklist

## Backend Deployment (Render)

- [ ] Sign up at [render.com](https://render.com)
- [ ] Create new Web Service
- [ ] Connect GitHub repository
- [ ] Set configuration:
  - Name: `amazkart-backend`
  - Build Command: `cd server && npm install`
  - Start Command: `cd server && npm start`
- [ ] Add environment variables:
  - [ ] `MONGODB_URI` = Your MongoDB Atlas connection string
  - [ ] `PORT` = `10000`
  - [ ] `SEED_KEY` = Your secret key
  - [ ] `NODE_ENV` = `production`
- [ ] Deploy and wait for success
- [ ] Copy backend URL (e.g., `https://amazkart-backend.onrender.com`)
- [ ] Seed database via: `https://your-backend-url.onrender.com/api/seed?seedKey=your_seed_key`

## Frontend Deployment (Vercel)

- [ ] Sign up at [vercel.com](https://vercel.com)
- [ ] Click "Add New Project"
- [ ] Import GitHub repository
- [ ] Configure:
  - Framework: Create React App
  - Root Directory: `client`
  - Build Command: `npm run build`
  - Output Directory: `build`
- [ ] Add environment variable:
  - [ ] `REACT_APP_API_URL` = `https://your-backend-url.onrender.com/api`
- [ ] Deploy and wait for success
- [ ] Copy frontend URL (e.g., `https://amazkart.vercel.app`)

## Post-Deployment

- [ ] Update backend `FRONTEND_URL` environment variable in Render
- [ ] Test frontend URL in browser
- [ ] Test product browsing
- [ ] Test login/signup
- [ ] Test cart functionality
- [ ] Check browser console for errors
- [ ] Verify MongoDB Atlas IP whitelist includes `0.0.0.0/0`

## Environment Variables Reference

### Render (Backend)
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/dbname
PORT=10000
SEED_KEY=your_secret_key_here
NODE_ENV=production
FRONTEND_URL=https://your-app.vercel.app
```

### Vercel (Frontend)
```
REACT_APP_API_URL=https://your-backend.onrender.com/api
```

---

## 🎯 Quick Links

- **Render Dashboard**: https://dashboard.render.com
- **Vercel Dashboard**: https://vercel.com/dashboard
- **MongoDB Atlas**: https://cloud.mongodb.com

---

## 🆘 Need Help?

1. Check `VERCEL_DEPLOY.md` for detailed steps
2. Check `DEPLOYMENT.md` for comprehensive guide
3. View logs in Render/Vercel dashboards
4. Check browser console for errors

