require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('../models/Product');

// Sample products data
const sampleProducts = [
  {
    name: 'MacBook Pro 16',
    slug: 'macbook-pro-16',
    description: 'The most powerful MacBook Pro ever. Featuring the M2 Max chip, stunning 16-inch Liquid Retina XDR display, and up to 22 hours of battery life. Perfect for professionals who demand the best performance.',
    shortDescription: 'Powerful 16-inch laptop with M2 Max chip and stunning display',
    price: 2499.99,
    images: [
      'https://picsum.photos/800/600?random=1',
      'https://picsum.photos/800/600?random=2'
    ],
    category: 'Electronics',
    stock: 15
  },
  {
    name: 'iPhone 15 Pro',
    slug: 'iphone-15-pro',
    description: 'The ultimate iPhone experience. Titanium design, A17 Pro chip, Pro camera system with 5x Telephoto, and Action button. Capture stunning photos and videos with professional-grade tools.',
    shortDescription: 'Latest iPhone with titanium design and Pro camera system',
    price: 999.99,
    images: [
      'https://picsum.photos/800/600?random=3',
      'https://picsum.photos/800/600?random=4'
    ],
    category: 'Electronics',
    stock: 32
  },
  {
    name: 'Sony WH-1000XM5 Headphones',
    slug: 'sony-wh-1000xm5',
    description: 'Industry-leading noise canceling with Dual Noise Sensor technology. Premium sound quality, 30-hour battery life, and quick charge. The perfect headphones for music lovers and travelers.',
    shortDescription: 'Premium noise-canceling headphones with exceptional sound quality',
    price: 399.99,
    images: [
      'https://picsum.photos/800/600?random=5',
      'https://picsum.photos/800/600?random=6'
    ],
    category: 'Electronics',
    stock: 28
  },
  {
    name: 'Nike Air Max 90',
    slug: 'nike-air-max-90',
    description: 'Classic running shoes with visible Air cushioning. Timeless design meets modern comfort. Perfect for everyday wear and light running activities.',
    shortDescription: 'Classic running shoes with visible Air cushioning',
    price: 129.99,
    images: [
      'https://picsum.photos/800/600?random=7',
      'https://picsum.photos/800/600?random=8'
    ],
    category: 'Fashion',
    stock: 45
  },
  {
    name: 'Levi\'s 501 Original Jeans',
    slug: 'levis-501-original',
    description: 'The original straight-leg jeans that started it all. Made with premium denim, button fly, and timeless fit. A wardrobe essential that never goes out of style.',
    shortDescription: 'Original straight-leg jeans with button fly',
    price: 89.99,
    images: [
      'https://picsum.photos/800/600?random=9',
      'https://picsum.photos/800/600?random=10'
    ],
    category: 'Fashion',
    stock: 67
  },
  {
    name: 'Dyson V15 Detect Vacuum',
    slug: 'dyson-v15-detect',
    description: 'Powerful cordless vacuum with laser technology that reveals microscopic dust. Advanced filtration system captures 99.97% of particles. Up to 60 minutes of runtime.',
    shortDescription: 'Cordless vacuum with laser dust detection technology',
    price: 749.99,
    images: [
      'https://picsum.photos/800/600?random=11',
      'https://picsum.photos/800/600?random=12'
    ],
    category: 'Home & Kitchen',
    stock: 12
  },
  {
    name: 'Instant Pot Duo 7-in-1',
    slug: 'instant-pot-duo',
    description: '7-in-1 electric pressure cooker that replaces 7 kitchen appliances. Pressure cook, slow cook, rice cooker, yogurt maker, steamer, sauté pan, and warmer. Cook meals up to 70% faster.',
    shortDescription: '7-in-1 electric pressure cooker for faster cooking',
    price: 99.99,
    images: [
      'https://picsum.photos/800/600?random=13',
      'https://picsum.photos/800/600?random=14'
    ],
    category: 'Home & Kitchen',
    stock: 38
  },
  {
    name: 'Canon EOS R6 Mark II',
    slug: 'canon-eos-r6-mark-ii',
    description: 'Full-frame mirrorless camera with 24.2MP sensor, 4K video recording, and advanced autofocus. Perfect for photographers and videographers who demand professional results.',
    shortDescription: 'Full-frame mirrorless camera with 4K video and advanced AF',
    price: 2499.99,
    images: [
      'https://picsum.photos/800/600?random=15',
      'https://picsum.photos/800/600?random=16'
    ],
    category: 'Electronics',
    stock: 8
  }
];

async function seedDatabase() {
  try {
    // Connect to MongoDB
    const mongoURI = process.env.MONGODB_URI;
    if (!mongoURI) {
      console.error('❌ MONGODB_URI is not defined in .env file');
      process.exit(1);
    }

    await mongoose.connect(mongoURI);
    console.log('✅ Connected to MongoDB');

    // Clear existing products
    await Product.deleteMany({});
    console.log('✅ Cleared existing products');

    // Insert sample products
    const products = await Product.insertMany(sampleProducts);
    console.log(`✅ Inserted ${products.length} products`);

    // Close connection
    await mongoose.connection.close();
    console.log('✅ Database seeding completed successfully');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
}

// Run seed function
seedDatabase();

