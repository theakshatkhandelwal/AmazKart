# Quick Setup with Your MongoDB Credentials

You have:
- **Username:** `akshat111bkg_db_user`
- **Password:** `9MMnuo5K00Kxad2S`

## Option 1: Automatic Update (Recommended)

If you have your cluster URL (e.g., `cluster0.xxxxx.mongodb.net`), run:

```powershell
.\update-env.ps1 -ClusterUrl "cluster0.xxxxx.mongodb.net"
```

## Option 2: Manual Update

1. Get your connection string from MongoDB Atlas:
   - Go to https://cloud.mongodb.com
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy the connection string

2. Open `server\.env` and update the `MONGODB_URI` line:

   Replace this line:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/ecommerce?retryWrites=true&w=majority
   ```

   With your actual connection string (replace username and password):
   ```
   MONGODB_URI=mongodb+srv://akshat111bkg_db_user:9MMnuo5K00Kxad2S@YOUR_CLUSTER_URL/ecommerce?retryWrites=true&w=majority
   ```

   **Important:** Replace `YOUR_CLUSTER_URL` with your actual cluster URL from Atlas.

## After Updating .env:

1. **Seed the database:**
   ```powershell
   cd server
   npm run seed
   ```

2. **Start the application:**
   ```powershell
   cd ..
   npm run dev
   ```

## Need Help Getting the Connection String?

See `GET_CONNECTION_STRING.md` for detailed instructions.

