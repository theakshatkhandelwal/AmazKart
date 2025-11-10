import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getProducts } from '../api/api';
import ProductCarousel from '../components/ProductCarousel';
import Loader from '../components/Loader';

const Home = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

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

  const handleSearch = (e) => {
    e.preventDefault();
    // Search functionality can be implemented later
    console.log('Searching for:', searchTerm);
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Hero Search Section */}
      <div className="relative bg-gradient-to-r from-primary-600 via-primary-700 to-primary-800 shadow-2xl overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>
        <div className="container mx-auto px-4 py-12 relative z-10">
          <div className="text-center mb-8">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-3 drop-shadow-lg">
              Discover Amazing Products
            </h2>
            <p className="text-xl text-blue-100 font-medium">
              Shop the best deals on electronics, fashion, and more
            </p>
          </div>
          <form onSubmit={handleSearch} className="max-w-4xl mx-auto">
            <div className="flex gap-3 shadow-2xl rounded-2xl overflow-hidden bg-white/10 backdrop-blur-md border border-white/20">
              <div className="flex-1 flex items-center">
                <svg className="w-6 h-6 text-white/70 ml-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search for Products, Brands and More"
                  className="flex-1 px-4 py-5 border-0 focus:outline-none text-lg bg-transparent text-white placeholder-white/70 font-medium"
                />
              </div>
              <button
                type="submit"
                className="px-12 py-5 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 text-white hover:from-yellow-500 hover:via-orange-600 hover:to-red-600 transition-all duration-300 font-bold text-lg shadow-2xl hover:shadow-glow transform hover:scale-105 active:scale-95"
              >
                Search
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Category Filter Section */}
        {allProducts.length > 0 && (
          <div className="mb-12">
            <div className="flex items-center gap-4 mb-6">
              <div className="h-1 w-12 bg-gradient-to-r from-primary-500 to-primary-700 rounded-full"></div>
              <h2 className="text-3xl font-black text-gray-900">Shop by Category</h2>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {['Electronics', 'Fashion', 'Home & Kitchen'].map((category) => {
                const categoryProducts = getProductsByCategory(category);
                if (categoryProducts.length === 0) return null;
                
                return (
                  <Link
                    key={category}
                    to={`/category/${encodeURIComponent(category)}`}
                    className="group bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200/50 hover:border-primary-300 transform hover:-translate-y-2"
                  >
                    <div className="text-center">
                      <div className="mb-4">
                        {category === 'Electronics' && (
                          <div className="mx-auto w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                            </svg>
                          </div>
                        )}
                        {category === 'Fashion' && (
                          <div className="mx-auto w-16 h-16 bg-gradient-to-br from-pink-400 to-pink-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                          </div>
                        )}
                        {category === 'Home & Kitchen' && (
                          <div className="mx-auto w-16 h-16 bg-gradient-to-br from-orange-400 to-orange-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                            </svg>
                          </div>
                        )}
                      </div>
                      <h3 className="text-lg font-black text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
                        {category}
                      </h3>
                      <p className="text-sm text-gray-600 font-semibold">
                        {categoryProducts.length} {categoryProducts.length === 1 ? 'product' : 'products'}
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
          <ProductCarousel 
            title="Top Deals" 
            products={getTopDeals()} 
            showViewAll={true}
          />
        )}

        {/* Electronics Section */}
        {electronics.length > 0 && (
          <ProductCarousel 
            title="Electronics" 
            products={electronics} 
            showViewAll={true}
          />
        )}

        {/* Fashion Section */}
        {fashion.length > 0 && (
          <ProductCarousel 
            title="Fashion" 
            products={fashion} 
            showViewAll={true}
          />
        )}

        {/* Home & Kitchen Section */}
        {homeKitchen.length > 0 && (
          <ProductCarousel 
            title="Home & Kitchen" 
            products={homeKitchen} 
            showViewAll={true}
          />
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
          <div className="text-center py-16">
            <svg
              className="mx-auto h-24 w-24 text-gray-400 mb-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
              />
            </svg>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">No Products Found</h3>
            <p className="text-gray-600 mb-6">
              {error 
                ? "Please configure your MongoDB connection and seed the database."
                : "Products will appear here once the database is seeded."}
            </p>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 max-w-2xl mx-auto text-left">
              <p className="text-sm text-blue-800 font-semibold mb-2">To see products:</p>
              <ol className="text-sm text-blue-700 list-decimal list-inside space-y-1">
                <li>Update <code className="bg-blue-100 px-1 rounded">server/.env</code> with your MongoDB cluster URL</li>
                <li>Run <code className="bg-blue-100 px-1 rounded">cd server && npm run seed</code></li>
                <li>Restart the backend server</li>
              </ol>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
