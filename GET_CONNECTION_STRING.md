# How to Get Your MongoDB Atlas Connection String

You have your credentials:
- **Username:** `akshat111bkg_db_user`
- **Password:** `9MMnuo5K00Kxad2S`

Now you need to get the connection string from MongoDB Atlas:

## Steps:

1. **Go to MongoDB Atlas** (https://cloud.mongodb.com)
2. **Click on your cluster** (or create one if you haven't)
3. **Click the "Connect" button** (usually a green button)
4. **Choose "Connect your application"**
5. **Copy the connection string** - it will look like:
   ```
   mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
6. **Replace the placeholders:**
   - Replace `<username>` with: `akshat111bkg_db_user`
   - Replace `<password>` with: `9MMnuo5K00Kxad2S`
   - Add `/ecommerce` before the `?` (or use your preferred database name)
   
   Final format should be:
   ```
   mongodb+srv://akshat111bkg_db_user:9MMnuo5K00Kxad2S@cluster0.xxxxx.mongodb.net/ecommerce?retryWrites=true&w=majority
   ```

7. **Important:** Make sure your IP address is whitelisted in MongoDB Atlas:
   - Go to "Network Access" in the left sidebar
   - Click "Add IP Address"
   - For development, you can use `0.0.0.0/0` (allows all IPs) or add your current IP

## Quick Template:

Once you have the cluster URL (the part after `@` and before `/`), your connection string will be:

```
mongodb+srv://akshat111bkg_db_user:9MMnuo5K00Kxad2S@YOUR_CLUSTER_URL_HERE/ecommerce?retryWrites=true&w=majority
```

Replace `YOUR_CLUSTER_URL_HERE` with your actual cluster URL from Atlas.

