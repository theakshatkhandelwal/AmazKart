require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');
const productRoutes = require('./routes/products');
const Product = require('./models/Product');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware - CORS Configuration
const allowedOrigins = [
  'http://localhost:3000',
  process.env.FRONTEND_URL,
  process.env.VERCEL_URL
].filter(Boolean);

const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1 || process.env.NODE_ENV === 'development') {
      callback(null, true);
    } else {
      // In production, allow specific origins
      if (process.env.NODE_ENV === 'production') {
        // Allow any Vercel preview/deployment URLs
        if (origin.includes('.vercel.app')) {
          return callback(null, true);
        }
        callback(new Error('Not allowed by CORS'));
      } else {
        callback(null, true);
      }
    }
  },
  credentials: true
};

app.use(cors(corsOptions));
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/products', productRoutes);

// Seed endpoint (protected) - accepts GET requests
app.get('/api/seed', async (req, res) => {
  try {
    const seedKey = req.query.seedKey || req.headers['x-seed-key'];
    const expectedKey = process.env.SEED_KEY || 'changeme';

    if (seedKey !== expectedKey) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized. Invalid seed key.'
      });
    }

    // Sample products with INR prices and actual product images
    const sampleProducts = [
      {
        name: 'MacBook Pro 16',
        slug: 'macbook-pro-16',
        description: 'The most powerful MacBook Pro ever. Featuring the M2 Max chip, stunning 16-inch Liquid Retina XDR display, and up to 22 hours of battery life. Perfect for professionals who demand the best performance.',
        shortDescription: 'Powerful 16-inch laptop with M2 Max chip and stunning display',
        price: 207999,
        images: [
          'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&h=600&fit=crop',
          'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&h=600&fit=crop'
        ],
        category: 'Electronics',
        stock: 15
      },
      {
        name: 'iPhone 15 Pro',
        slug: 'iphone-15-pro',
        description: 'The ultimate iPhone experience. Titanium design, A17 Pro chip, Pro camera system with 5x Telephoto, and Action button. Capture stunning photos and videos with professional-grade tools.',
        shortDescription: 'Latest iPhone with titanium design and Pro camera system',
        price: 82999,
        images: [
          'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=800&h=600&fit=crop',
          'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&h=600&fit=crop'
        ],
        category: 'Electronics',
        stock: 32
      },
      {
        name: 'Sony WH-1000XM5 Headphones',
        slug: 'sony-wh-1000xm5',
        description: 'Industry-leading noise canceling with Dual Noise Sensor technology. Premium sound quality, 30-hour battery life, and quick charge. The perfect headphones for music lovers and travelers.',
        shortDescription: 'Premium noise-canceling headphones with exceptional sound quality',
        price: 33199,
        images: [
          'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=600&fit=crop',
          'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800&h=600&fit=crop'
        ],
        category: 'Electronics',
        stock: 28
      },
      {
        name: 'Nike Air Max 90',
        slug: 'nike-air-max-90',
        description: 'Classic running shoes with visible Air cushioning. Timeless design meets modern comfort. Perfect for everyday wear and light running activities.',
        shortDescription: 'Classic running shoes with visible Air cushioning',
        price: 10799,
        images: [
          'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&h=600&fit=crop',
          'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800&h=600&fit=crop'
        ],
        category: 'Fashion',
        stock: 45
      },
      {
        name: 'Levi\'s 501 Original Jeans',
        slug: 'levis-501-original',
        description: 'The original straight-leg jeans that started it all. Made with premium denim, button fly, and timeless fit. A wardrobe essential that never goes out of style.',
        shortDescription: 'Original straight-leg jeans with button fly',
        price: 7499,
        images: [
          'https://images.unsplash.com/photo-1542272604-787c3835535d?w=800&h=600&fit=crop',
          'https://images.unsplash.com/photo-1582418702059-97ebafbcd5c1?w=800&h=600&fit=crop'
        ],
        category: 'Fashion',
        stock: 67
      },
      {
        name: 'Dyson V15 Detect Vacuum',
        slug: 'dyson-v15-detect',
        description: 'Powerful cordless vacuum with laser technology that reveals microscopic dust. Advanced filtration system captures 99.97% of particles. Up to 60 minutes of runtime.',
        shortDescription: 'Cordless vacuum with laser dust detection technology',
        price: 62249,
        images: [
          'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop',
          'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&h=600&fit=crop'
        ],
        category: 'Home & Kitchen',
        stock: 12
      },
      {
        name: 'Instant Pot Duo 7-in-1',
        slug: 'instant-pot-duo',
        description: '7-in-1 electric pressure cooker that replaces 7 kitchen appliances. Pressure cook, slow cook, rice cooker, yogurt maker, steamer, sauté pan, and warmer. Cook meals up to 70% faster.',
        shortDescription: '7-in-1 electric pressure cooker for faster cooking',
        price: 8299,
        images: [
          'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800&h=600&fit=crop',
          'https://images.unsplash.com/photo-1556911220-bff31c812dba?w=800&h=600&fit=crop'
        ],
        category: 'Home & Kitchen',
        stock: 38
      },
      {
        name: 'Canon EOS R6 Mark II',
        slug: 'canon-eos-r6-mark-ii',
        description: 'Full-frame mirrorless camera with 24.2MP sensor, 4K video recording, and advanced autofocus. Perfect for photographers and videographers who demand professional results.',
        shortDescription: 'Full-frame mirrorless camera with 4K video and advanced AF',
        price: 207999,
        images: [
          'https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=800&h=600&fit=crop',
          'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=800&h=600&fit=crop'
        ],
        category: 'Electronics',
        stock: 8
      },
      // Beauty & Personal Care
      {
        name: 'L\'Oréal Paris Skincare Set',
        slug: 'loreal-skincare-set',
        description: 'Complete skincare routine with cleanser, toner, and moisturizer. Formulated with hyaluronic acid and vitamin C for radiant, hydrated skin. Suitable for all skin types.',
        shortDescription: 'Complete skincare set with cleanser, toner, and moisturizer',
        price: 2499,
        images: [
          'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=800&h=600&fit=crop',
          'https://images.unsplash.com/photo-1571875257727-256c39da42af?w=800&h=600&fit=crop'
        ],
        category: 'Beauty & Personal Care',
        stock: 52
      },
      {
        name: 'Maybelline Fit Me Foundation',
        slug: 'maybelline-fit-me-foundation',
        description: 'Matte and poreless foundation that fits all skin tones. Lightweight formula provides natural coverage that lasts all day. Available in 40 shades.',
        shortDescription: 'Matte foundation with natural coverage for all skin tones',
        price: 599,
        images: [
          'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800&h=600&fit=crop',
          'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&h=600&fit=crop'
        ],
        category: 'Beauty & Personal Care',
        stock: 78
      },
      {
        name: 'Dove Men+Care Body Wash',
        slug: 'dove-mencare-body-wash',
        description: 'Hydrating body wash specially formulated for men. Contains micro-moisture technology that activates in the shower. Refreshing scent and 24-hour care.',
        shortDescription: 'Hydrating body wash with micro-moisture technology for men',
        price: 399,
        images: [
          'https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8?w=800&h=600&fit=crop',
          'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=800&h=600&fit=crop'
        ],
        category: 'Beauty & Personal Care',
        stock: 95
      },
      {
        name: 'CeraVe Moisturizing Cream',
        slug: 'cerave-moisturizing-cream',
        description: 'Daily moisturizing cream with ceramides and hyaluronic acid. Developed with dermatologists for normal to dry skin. Non-comedogenic and fragrance-free.',
        shortDescription: 'Daily moisturizing cream with ceramides and hyaluronic acid',
        price: 899,
        images: [
          'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=800&h=600&fit=crop',
          'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800&h=600&fit=crop'
        ],
        category: 'Beauty & Personal Care',
        stock: 61
      },
      // Sports & Fitness
      {
        name: 'Yoga Mat Premium',
        slug: 'yoga-mat-premium',
        description: 'Non-slip yoga mat with extra cushioning for comfort. Eco-friendly TPE material, lightweight and portable. Perfect for yoga, pilates, and floor exercises.',
        shortDescription: 'Non-slip yoga mat with extra cushioning and eco-friendly material',
        price: 2499,
        images: [
          'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=800&h=600&fit=crop',
          'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&h=600&fit=crop'
        ],
        category: 'Sports & Fitness',
        stock: 43
      },
      {
        name: 'Adjustable Dumbbells Set',
        slug: 'adjustable-dumbbells-set',
        description: 'Space-saving adjustable dumbbells with weight range of 5-25kg per dumbbell. Quick-change weight system. Perfect for home gym workouts and strength training.',
        shortDescription: 'Adjustable dumbbells with quick-change weight system (5-25kg)',
        price: 14999,
        images: [
          'https://images.unsplash.com/photo-1576678927484-cc907957088c?w=800&h=600&fit=crop',
          'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=800&h=600&fit=crop'
        ],
        category: 'Sports & Fitness',
        stock: 18
      },
      {
        name: 'Nike Dri-FIT Training T-Shirt',
        slug: 'nike-dri-fit-training-tshirt',
        description: 'Moisture-wicking training t-shirt with Dri-FIT technology. Breathable fabric keeps you dry and comfortable during workouts. Available in multiple colors.',
        shortDescription: 'Moisture-wicking training t-shirt with Dri-FIT technology',
        price: 2499,
        images: [
          'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&h=600&fit=crop',
          'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&h=600&fit=crop'
        ],
        category: 'Sports & Fitness',
        stock: 56
      },
      {
        name: 'Resistance Bands Set',
        slug: 'resistance-bands-set',
        description: 'Set of 5 resistance bands with different resistance levels. Includes door anchor, ankle straps, and carrying bag. Perfect for strength training and physical therapy.',
        shortDescription: 'Set of 5 resistance bands with accessories for strength training',
        price: 1299,
        images: [
          'https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?w=800&h=600&fit=crop',
          'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop'
        ],
        category: 'Sports & Fitness',
        stock: 72
      },
      // Stationery & Office Supplies
      {
        name: 'Moleskine Classic Notebook',
        slug: 'moleskine-classic-notebook',
        description: 'Hardcover notebook with acid-free paper and rounded corners. Expandable inner pocket and bookmark ribbon. Perfect for journaling, note-taking, and sketching.',
        shortDescription: 'Hardcover notebook with acid-free paper and expandable pocket',
        price: 1899,
        images: [
          'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&h=600&fit=crop',
          'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=800&h=600&fit=crop'
        ],
        category: 'Stationery & Office Supplies',
        stock: 87
      },
      {
        name: 'Parker Fountain Pen Set',
        slug: 'parker-fountain-pen-set',
        description: 'Premium fountain pen set with elegant design and smooth writing experience. Includes ink converter and gift box. Perfect for professionals and writing enthusiasts.',
        shortDescription: 'Premium fountain pen set with ink converter and gift box',
        price: 3499,
        images: [
          'https://images.unsplash.com/photo-1583484963886-d5ad2f0b5b68?w=800&h=600&fit=crop',
          'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=600&fit=crop'
        ],
        category: 'Stationery & Office Supplies',
        stock: 34
      },
      {
        name: 'Stapler with Remover',
        slug: 'stapler-with-remover',
        description: 'Heavy-duty stapler with built-in staple remover. Can staple up to 30 sheets. Durable metal construction with ergonomic design for comfortable use.',
        shortDescription: 'Heavy-duty stapler with built-in remover (up to 30 sheets)',
        price: 499,
        images: [
          'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=800&h=600&fit=crop',
          'https://images.unsplash.com/photo-1532619675605-1ede6c9ed2d7?w=800&h=600&fit=crop'
        ],
        category: 'Stationery & Office Supplies',
        stock: 112
      },
      {
        name: 'File Organizer Set',
        slug: 'file-organizer-set',
        description: 'Set of 5 color-coded file folders with tabs. Made from durable cardstock. Perfect for organizing documents, papers, and important files in office or home.',
        shortDescription: 'Set of 5 color-coded file folders with tabs for organizing',
        price: 799,
        images: [
          'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&h=600&fit=crop',
          'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800&h=600&fit=crop'
        ],
        category: 'Stationery & Office Supplies',
        stock: 65
      }
    ];

    // Clear and insert
    await Product.deleteMany({});
    const products = await Product.insertMany(sampleProducts);

    res.json({
      success: true,
      message: 'Database seeded successfully',
      count: products.length
    });
  } catch (error) {
    console.error('Error seeding database:', error);
    res.status(500).json({
      success: false,
      message: 'Error seeding database',
      error: error.message
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'Server is running',
    timestamp: new Date().toISOString()
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal server error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

// Connect to MongoDB and start server
async function startServer() {
  try {
    const mongoURI = process.env.MONGODB_URI;
    if (!mongoURI) {
      console.error('❌ MONGODB_URI is not defined in .env file');
      process.exit(1);
    }

    await mongoose.connect(mongoURI);
    console.log('✅ Connected to MongoDB');

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(`📡 API available at http://localhost:${PORT}/api`);
    });
  } catch (error) {
    console.error('❌ Error starting server:', error);
    process.exit(1);
  }
}

startServer();

