import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getProducts } from '../api/api';
import ProductCarousel from '../components/ProductCarousel';
import Loader from '../components/Loader';

// Category images are loaded from public folder

const Home = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAllProducts();
  }, []);

  const fetchAllProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getProducts({ limit: 100 });
      setAllProducts(response.data || []);
    } catch (err) {
      setError('Failed to load products. Please check your connection.');
      console.error('Error fetching products:', err);
      // Set empty array on error so UI still renders
      setAllProducts([]);
    } finally {
      setLoading(false);
    }
  };

  // Organize products by category
  const getProductsByCategory = (category) => {
    return allProducts.filter(p => p.category === category);
  };

  // Get top deals (products with lower prices or featured)
  const getTopDeals = () => {
    return allProducts
      .sort((a, b) => a.price - b.price)
      .slice(0, 6);
  };

  // Get products by category
  const electronics = getProductsByCategory('Electronics');
  const fashion = getProductsByCategory('Fashion');
  const homeKitchen = getProductsByCategory('Home & Kitchen');
  const beauty = getProductsByCategory('Beauty & Personal Care');
  const sports = getProductsByCategory('Sports & Fitness');
  const stationery = getProductsByCategory('Stationery & Office Supplies');

  if (loading && allProducts.length === 0) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Banner Section */}
      {allProducts.length > 0 && (
        <div className="bg-gradient-to-r from-primary-600 to-primary-700 text-white">
          <div className="container mx-auto px-4 py-8">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex-1 min-w-[300px]">
                <h2 className="text-3xl md:text-4xl font-bold mb-2">Great Deals Await!</h2>
                <p className="text-lg text-white/90">Shop the latest trends and best prices</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold">🎉</div>
                  <div className="text-sm">Special Offers</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">🚚</div>
                  <div className="text-sm">Free Delivery</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">💳</div>
                  <div className="text-sm">Easy Payments</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 py-8">
        {/* Category Filter Section */}
        {allProducts.length > 0 && (
          <div className="mb-10">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Shop by Category</h2>
              <Link to="/" className="text-primary-600 hover:text-primary-700 text-sm font-semibold hidden md:block">
                View All Categories →
              </Link>
            </div>
            <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
              {['Electronics', 'Fashion', 'Home & Kitchen', 'Beauty & Personal Care', 'Sports & Fitness', 'Stationery & Office Supplies'].map((category) => {
                const categoryProducts = getProductsByCategory(category);
                if (categoryProducts.length === 0) return null;
                
                const getCategoryImage = (cat) => {
                  // Map category names to image filenames (using hyphenated names)
                  const imageMap = {
                    'Electronics': '/electronics.jpg',
                    'Fashion': '/fashion.jpg',
                    'Home & Kitchen': '/home-kitchen.jpg',
                    'Beauty & Personal Care': '/beauty-personal-care.jpg',
                    'Sports & Fitness': '/sports-fitness.jpg',
                    'Stationery & Office Supplies': '/office-stationery-supplies.jpg'
                  };
                  return imageMap[cat] || '/electronics.jpg';
                };
                
                return (
                  <Link
                    key={category}
                    to={`/category/${encodeURIComponent(category)}`}
                    className="group bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-200 overflow-hidden flex-shrink-0 w-32 sm:w-40"
                  >
                    <div className="w-full h-24 sm:h-32 bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden relative">
                      <img
                        src={getCategoryImage(category)}
                        alt={category}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        style={{ minHeight: '100%' }}
                      />
                    </div>
                    <div className="p-3 text-center">
                      <h3 className="font-semibold text-sm text-gray-900 mb-1 group-hover:text-primary-600 transition-colors line-clamp-2">
                        {category}
                      </h3>
                      <p className="text-xs text-gray-600">
                        {categoryProducts.length} {categoryProducts.length === 1 ? 'item' : 'items'}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        )}

        {/* Error Message */}
        {error && allProducts.length === 0 && (
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
            <div className="flex">
              <div className="ml-3">
                <p className="text-sm text-yellow-700">
                  {error} Make sure your MongoDB connection is configured and the database is seeded.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Top Deals Section */}
        {getTopDeals().length > 0 && (
          <div className="mb-10">
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900">🔥 Top Deals</h2>
                <Link 
                  to="/" 
                  className="text-primary-600 hover:text-primary-700 text-sm font-semibold"
                >
                  See All →
                </Link>
              </div>
              <p className="text-gray-600">Best prices on trending products</p>
            </div>
            <ProductCarousel 
              title="" 
              products={getTopDeals()} 
              showViewAll={false}
            />
          </div>
        )}

        {/* Electronics Section */}
        {electronics.length > 0 && (
          <div className="mb-10">
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900">📱 Electronics</h2>
                <Link 
                  to="/category/Electronics" 
                  className="text-primary-600 hover:text-primary-700 text-sm font-semibold"
                >
                  See All →
                </Link>
              </div>
              <p className="text-gray-600">Latest gadgets and tech accessories</p>
            </div>
            <ProductCarousel 
              title="" 
              products={electronics} 
              showViewAll={false}
            />
          </div>
        )}

        {/* Fashion Section */}
        {fashion.length > 0 && (
          <div className="mb-10">
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900">👕 Fashion</h2>
                <Link 
                  to="/category/Fashion" 
                  className="text-primary-600 hover:text-primary-700 text-sm font-semibold"
                >
                  See All →
                </Link>
              </div>
              <p className="text-gray-600">Trending styles and fashion essentials</p>
            </div>
            <ProductCarousel 
              title="" 
              products={fashion} 
              showViewAll={false}
            />
          </div>
        )}

        {/* Home & Kitchen Section */}
        {homeKitchen.length > 0 && (
          <div className="mb-10">
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900">🏠 Home & Kitchen</h2>
                <Link 
                  to="/category/Home & Kitchen" 
                  className="text-primary-600 hover:text-primary-700 text-sm font-semibold"
                >
                  See All →
                </Link>
              </div>
              <p className="text-gray-600">Everything for your home</p>
            </div>
            <ProductCarousel 
              title="" 
              products={homeKitchen} 
              showViewAll={false}
            />
          </div>
        )}

        {/* Beauty & Personal Care Section */}
        {beauty.length > 0 && (
          <div className="mb-10">
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900">💄 Beauty & Personal Care</h2>
                <Link 
                  to="/category/Beauty & Personal Care" 
                  className="text-primary-600 hover:text-primary-700 text-sm font-semibold"
                >
                  See All →
                </Link>
              </div>
              <p className="text-gray-600">Skincare, makeup, and personal care essentials</p>
            </div>
            <ProductCarousel 
              title="" 
              products={beauty} 
              showViewAll={false}
            />
          </div>
        )}

        {/* Sports & Fitness Section */}
        {sports.length > 0 && (
          <div className="mb-10">
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900">💪 Sports & Fitness</h2>
                <Link 
                  to="/category/Sports & Fitness" 
                  className="text-primary-600 hover:text-primary-700 text-sm font-semibold"
                >
                  See All →
                </Link>
              </div>
              <p className="text-gray-600">Gym equipment and fitness accessories</p>
            </div>
            <ProductCarousel 
              title="" 
              products={sports} 
              showViewAll={false}
            />
          </div>
        )}

        {/* Stationery & Office Supplies Section */}
        {stationery.length > 0 && (
          <div className="mb-10">
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900">📝 Stationery & Office Supplies</h2>
                <Link 
                  to="/category/Stationery & Office Supplies" 
                  className="text-primary-600 hover:text-primary-700 text-sm font-semibold"
                >
                  See All →
                </Link>
              </div>
              <p className="text-gray-600">Notebooks, pens, and office essentials</p>
            </div>
            <ProductCarousel 
              title="" 
              products={stationery} 
              showViewAll={false}
            />
          </div>
        )}

        {/* All Products Grid (if no categories) */}
        {allProducts.length > 0 && 
         electronics.length === 0 && 
         fashion.length === 0 && 
         homeKitchen.length === 0 && (
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">All Products</h2>
            <ProductCarousel title="" products={allProducts} showViewAll={false} />
          </div>
        )}

        {/* Empty State */}
        {allProducts.length === 0 && !loading && (
          <div className="bg-white rounded-lg shadow-sm p-12 text-center">
            <div className="max-w-md mx-auto">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-12 h-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">No Products Available</h3>
              <p className="text-gray-600 mb-6">
                {error 
                  ? "Please check your MongoDB connection and seed the database."
                  : "Products will appear here once the database is seeded."}
              </p>
              {error && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-left">
                  <p className="text-sm text-yellow-800 font-semibold mb-2">Setup Instructions:</p>
                  <ol className="text-sm text-yellow-700 list-decimal list-inside space-y-1">
                    <li>Update <code className="bg-yellow-100 px-1 rounded">server/.env</code> with your MongoDB URI</li>
                    <li>Visit the seed endpoint to populate the database</li>
                    <li>Refresh this page</li>
                  </ol>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
