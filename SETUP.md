# Quick Setup Guide

## Step-by-Step Setup

### 1. Install Dependencies

```bash
# Install root dependencies (for concurrently)
npm install

# Install server dependencies
cd server
npm install
cd ..

# Install client dependencies
cd client
npm install
cd ..
```

### 2. Set Up Environment Variables

Create a `.env` file in the root directory:

```bash
# Windows (PowerShell)
New-Item -Path .env -ItemType File

# macOS/Linux
touch .env
```

Add the following content to `.env`:

```
MONGODB_URI=your_mongodb_connection_string_here
PORT=5000
SEED_KEY=changeme
REACT_APP_API_URL=http://localhost:5000
```

See `ENV_SETUP.md` for detailed instructions on getting your MongoDB connection string.

### 3. Seed the Database

```bash
cd server
npm run seed
```

This will populate your database with 8 sample products.

### 4. Start the Application

#### Option A: Run Both Together (Recommended)

From the root directory:

```bash
npm run dev
```

This starts both the server (port 5000) and client (port 3000) concurrently.

#### Option B: Run Separately

**Terminal 1 - Start Server:**
```bash
cd server
npm run dev
```

**Terminal 2 - Start Client:**
```bash
cd client
npm start
```

### 5. Access the Application

- Frontend: http://localhost:3000
- Backend API: http://localhost:5000/api

## Troubleshooting

### MongoDB Connection Issues

- Ensure your MongoDB Atlas cluster is running
- Check that your IP address is whitelisted in MongoDB Atlas
- Verify your connection string is correct in `.env`
- Make sure you've replaced `<username>` and `<password>` in the connection string

### Port Already in Use

If port 5000 or 3000 is already in use:

- Change `PORT` in `.env` for the server
- For React, set `PORT=3001` in your terminal before running `npm start`

### CORS Errors

If you see CORS errors, ensure:
- `REACT_APP_API_URL` in `.env` matches your backend URL
- The server is running before the client
- Both are running on the expected ports

## Next Steps

- Browse products at http://localhost:3000
- Click on any product to view details
- Add items to your cart
- View your cart and manage quantities
- Cart persists across page refreshes!

