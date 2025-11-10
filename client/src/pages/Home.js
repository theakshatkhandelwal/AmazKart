import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getProducts } from '../api/api';
import ProductCarousel from '../components/ProductCarousel';
import Loader from '../components/Loader';

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

  // Get electronics
  const electronics = getProductsByCategory('Electronics');
  
  // Get fashion
  const fashion = getProductsByCategory('Fashion');
  
  // Get home & kitchen
  const homeKitchen = getProductsByCategory('Home & Kitchen');

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
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {['Electronics', 'Fashion', 'Home & Kitchen'].map((category) => {
                const categoryProducts = getProductsByCategory(category);
                if (categoryProducts.length === 0) return null;
                
                const getCategoryBg = (cat) => {
                  if (cat === 'Electronics') return 'bg-gradient-to-br from-blue-500 to-blue-600';
                  if (cat === 'Fashion') return 'bg-gradient-to-br from-pink-500 to-pink-600';
                  if (cat === 'Home & Kitchen') return 'bg-gradient-to-br from-orange-500 to-orange-600';
                  return 'bg-gradient-to-br from-gray-500 to-gray-600';
                };
                
                return (
                  <Link
                    key={category}
                    to={`/category/${encodeURIComponent(category)}`}
                    className="group bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-200 overflow-hidden"
                  >
                    <div className={`aspect-square ${getCategoryBg(category)} p-6 flex flex-col items-center justify-center`}>
                      {category === 'Electronics' && (
                        <svg className="w-12 h-12 text-white mb-3 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                        </svg>
                      )}
                      {category === 'Fashion' && (
                        <svg className="w-12 h-12 text-white mb-3 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      )}
                      {category === 'Home & Kitchen' && (
                        <svg className="w-12 h-12 text-white mb-3 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                      )}
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-gray-900 mb-1 group-hover:text-primary-600 transition-colors">
                        {category}
                      </h3>
                      <p className="text-sm text-gray-600">
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
