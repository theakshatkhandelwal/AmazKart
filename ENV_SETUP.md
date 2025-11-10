# Environment Variables Setup

Create a `.env` file in the root directory with the following variables:

```env
# MongoDB Connection String
# Get your connection string from MongoDB Atlas: https://www.mongodb.com/cloud/atlas
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/ecommerce?retryWrites=true&w=majority

# Server Port
PORT=5000

# Seed Key (protect seed endpoint)
SEED_KEY=changeme

# Frontend API URL
REACT_APP_API_URL=http://localhost:5000
```

## Getting MongoDB Atlas Connection String

1. Sign up for a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster (free tier M0 works fine)
3. Create a database user
4. Whitelist your IP address (or use 0.0.0.0/0 for development)
5. Click "Connect" and copy the connection string
6. Replace `<username>` and `<password>` with your database user credentials
7. Replace `<dbname>` with `ecommerce` or your preferred database name

## For Production

When deploying:
- Update `REACT_APP_API_URL` to your deployed backend URL
- Use a strong `SEED_KEY` value
- Never commit your `.env` file to version control

