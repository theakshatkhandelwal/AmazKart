import React, { useState, useEffect } from 'react';
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
    <div className="min-h-screen bg-gray-50">
      {/* Hero Search Section */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-700 shadow-lg">
        <div className="container mx-auto px-4 py-8">
          <form onSubmit={handleSearch} className="max-w-3xl mx-auto">
            <div className="flex gap-3 shadow-xl rounded-xl overflow-hidden">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search for Products, Brands and More"
                className="flex-1 px-6 py-4 border-0 focus:outline-none text-lg bg-white"
              />
              <button
                type="submit"
                className="px-10 py-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-white hover:from-yellow-500 hover:to-orange-600 transition-all duration-200 font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                Search
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
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
