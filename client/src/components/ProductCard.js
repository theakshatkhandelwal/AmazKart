import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const ProductCard = ({ product }) => {
  const { addItem } = useCart();

  const handleAddToCart = (e) => {
    e.preventDefault();
    addItem(product, 1);
  };

  return (
    <Link
      to={`/product/${product._id}`}
      className="bg-white rounded-2xl shadow-soft overflow-hidden hover:shadow-2xl transition-all duration-500 flex flex-col group border border-gray-200/50 hover:border-primary-300 relative"
    >
      {/* Shine effect on hover */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 z-10"></div>
      
      <div className="relative h-72 bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 overflow-hidden">
        <img
          src={product.images[0] || 'https://via.placeholder.com/400x300'}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/400x300?text=No+Image';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        
        {/* Badges */}
        {product.stock === 0 && (
          <div className="absolute top-4 right-4 bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-2 rounded-full text-xs font-black shadow-xl backdrop-blur-sm border-2 border-white/50">
            Out of Stock
          </div>
        )}
        {product.stock > 0 && product.stock < 10 && (
          <div className="absolute top-4 left-4 bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2 rounded-full text-xs font-black shadow-xl backdrop-blur-sm border-2 border-white/50 animate-pulse">
            ⚡ Only {product.stock} left!
          </div>
        )}
        {product.stock >= 10 && (
          <div className="absolute top-4 left-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-2 rounded-full text-xs font-black shadow-xl backdrop-blur-sm border-2 border-white/50 opacity-0 group-hover:opacity-100 transition-opacity">
            ✓ In Stock
          </div>
        )}
      </div>
      
      <div className="p-6 flex-1 flex flex-col bg-white">
        <h3 className="text-xl font-extrabold text-gray-900 mb-3 line-clamp-2 group-hover:text-primary-600 transition-colors duration-300">
          {product.name}
        </h3>
        
        {product.shortDescription && (
          <p className="text-gray-600 text-sm mb-5 line-clamp-2 flex-1 leading-relaxed">
            {product.shortDescription}
          </p>
        )}
        
        <div className="mt-auto space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-3xl font-black bg-gradient-to-r from-primary-600 to-primary-800 bg-clip-text text-transparent">
                ₹{product.price.toLocaleString('en-IN')}
              </span>
            </div>
            {product.stock > 0 && (
              <span className="text-xs text-green-700 bg-gradient-to-r from-green-50 to-emerald-50 px-3 py-1.5 rounded-full font-bold border border-green-200">
                ✓ Available
              </span>
            )}
          </div>
          
          <div className="flex gap-3">
            <Link
              to={`/product/${product._id}`}
              className="flex-1 text-center py-3 px-4 border-2 border-primary-600 text-primary-600 rounded-xl hover:bg-primary-600 hover:text-white transition-all duration-300 font-bold text-sm shadow-md hover:shadow-lg transform hover:-translate-y-1"
            >
              View Details
            </Link>
            <button
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className="flex-1 py-3 px-4 bg-gradient-to-r from-primary-600 via-primary-700 to-primary-800 text-white rounded-xl hover:from-primary-700 hover:via-primary-800 hover:to-primary-900 disabled:from-gray-300 disabled:via-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed transition-all duration-300 font-bold text-sm shadow-lg hover:shadow-glow transform hover:-translate-y-1 hover:scale-105 disabled:transform-none"
            >
              🛒 Add to Cart
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;

