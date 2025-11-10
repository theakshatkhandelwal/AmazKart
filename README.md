# AmazKart

A full-stack e-commerce demo application built with React, Node.js, Express, and MongoDB Atlas. Features product browsing, detailed product views, and a fully functional shopping cart with persistent state.

## 🚀 Features

- **Product Catalog**: Browse products in a responsive grid layout
- **Product Details**: View detailed information about each product
- **Shopping Cart**: Add, remove, and update quantities with persistent localStorage state
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **RESTful API**: Clean backend API with pagination and search support
- **Database Seeding**: Easy setup with sample product data

## 📋 Prerequisites

- Node.js 18+ and npm
- MongoDB Atlas account (free tier works) or local MongoDB instance
- Git

## 🛠️ Setup Instructions

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd E-COMMERCE
```

### 2. Environment Variables

Create a `.env` file in the root directory. See `ENV_SETUP.md` for detailed instructions.

**Quick setup:** Create `.env` with:

```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/ecommerce?retryWrites=true&w=majority
PORT=5000
SEED_KEY=changeme
REACT_APP_API_URL=http://localhost:5000
```

**Note:** Replace the MongoDB connection string with your actual MongoDB Atlas credentials. See `ENV_SETUP.md` for step-by-step instructions.

### 3. Install Dependencies

Install dependencies for both client and server:

```bash
# Install server dependencies
cd server
npm install
cd ..

# Install client dependencies
cd client
npm install
cd ..
```

Or use the root script (if available):

```bash
npm install
```

### 4. Seed the Database

Run the seed script to populate the database with sample products:

```bash
cd server
npm run seed
```

Or with the seed key:

```bash
SEED_KEY=changeme npm run seed
```

### 5. Run the Application

#### Option 1: Run Separately (Recommended for Development)

**Terminal 1 - Start the server:**
```bash
cd server
npm run dev
```

**Terminal 2 - Start the client:**
```bash
cd client
npm start
```

#### Option 2: Run with Concurrently (Root)

If you've installed root dependencies:

```bash
npm run dev
```

The application will be available at:
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000

## 📁 Project Structure

```
E-COMMERCE/
├── client/                 # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── context/        # React Context (Cart)
│   │   ├── pages/          # Page components
│   │   ├── api/            # API utilities
│   │   └── App.js          # Main app component
│   └── package.json
├── server/                 # Node.js backend
│   ├── src/
│   │   ├── models/         # Mongoose models
│   │   ├── routes/         # Express routes
│   │   ├── controllers/    # Route controllers
│   │   ├── seed/           # Database seed script
│   │   └── server.js       # Express server
│   └── package.json
├── .env.example           # Environment variables template
└── README.md
```

## 🔌 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Endpoints

#### GET `/api/products`
Get a paginated list of products with optional search.

**Query Parameters:**
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 12)
- `search` (optional): Search term for product name/description

**Example Request:**
```bash
GET /api/products?page=1&limit=12&search=laptop
```

**Example Response:**
```json
{
  "success": true,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "name": "MacBook Pro 16",
      "slug": "macbook-pro-16",
      "price": 2499.99,
      "images": ["https://picsum.photos/400/300?random=1"],
      "stock": 15,
      "category": "Electronics",
      "shortDescription": "Powerful laptop for professionals"
    }
  ],
  "meta": {
    "page": 1,
    "limit": 12,
    "total": 8,
    "pages": 1
  }
}
```

#### GET `/api/products/:id`
Get a single product by ID or slug.

**Example Request:**
```bash
GET /api/products/507f1f77bcf86cd799439011
```

**Example Response:**
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "MacBook Pro 16",
    "slug": "macbook-pro-16",
    "description": "Full description here...",
    "price": 2499.99,
    "images": ["https://picsum.photos/400/300?random=1"],
    "stock": 15,
    "category": "Electronics",
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

#### POST `/api/seed`
Seed the database with sample products.

**Headers:**
```
x-seed-key: changeme
```

Or query parameter:
```
?seedKey=changeme
```

**Example Request:**
```bash
curl -X POST http://localhost:5000/api/seed \
  -H "x-seed-key: changeme"
```

**Example Response:**
```json
{
  "success": true,
  "message": "Database seeded successfully",
  "count": 8
}
```

## 🧪 Testing

### Test Backend Endpoints

```bash
# Get all products
curl http://localhost:5000/api/products

# Get single product
curl http://localhost:5000/api/products/:id

# Seed database
curl -X POST http://localhost:5000/api/seed -H "x-seed-key: changeme"
```

## 🚢 Deployment

### Backend Deployment (Render/Heroku)

1. Create a new web service
2. Connect your repository
3. Set environment variables:
   - `MONGODB_URI`
   - `PORT` (usually auto-set)
   - `SEED_KEY`
4. Deploy

### Frontend Deployment (Vercel/Netlify)

1. Create a new project
2. Connect your repository
3. Set build command: `npm run build`
4. Set publish directory: `build`
5. Add environment variable:
   - `REACT_APP_API_URL` (your deployed backend URL)
6. Deploy

**Important**: Update `REACT_APP_API_URL` in the frontend `.env` to point to your deployed backend URL.

## 🛒 User Stories

- ✅ Browse a list of products in a responsive grid
- ✅ View detailed product information
- ✅ Add items to cart with quantity selection
- ✅ Edit cart quantities and remove items
- ✅ See cart summary (item count & subtotal) on every page
- ✅ Cart persists across page refreshes using localStorage

## 🎨 Tech Stack

### Frontend
- React 18+
- React Router v6+
- TailwindCSS
- Context API + useReducer
- Axios

### Backend
- Node.js 18+
- Express.js
- MongoDB Atlas
- Mongoose
- dotenv
- morgan

## 📝 License

MIT

## 🤝 Contributing

Feel free to submit issues and enhancement requests!

