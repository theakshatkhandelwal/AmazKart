import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const ProductCard = ({ product }) => {
  const { addItem } = useCart();

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, 1);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-200 overflow-hidden group flex flex-col h-full">
      <Link to={`/product/${product._id}`} className="flex flex-col flex-1">
        {/* Image Section */}
        <div className="relative aspect-square bg-gray-100 overflow-hidden">
          <img
            src={product.images[0] || 'https://via.placeholder.com/400x300'}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/400x300?text=No+Image';
            }}
          />
          
          {/* Stock Badge */}
          {product.stock === 0 && (
            <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-bold">
              Out of Stock
            </div>
          )}
          {product.stock > 0 && product.stock < 10 && (
            <div className="absolute top-2 left-2 bg-orange-500 text-white px-2 py-1 rounded text-xs font-bold">
              Only {product.stock} left
            </div>
          )}
        </div>
        
        {/* Product Info */}
        <div className="p-4 flex flex-col flex-1">
          <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-primary-600 transition-colors min-h-[3rem]">
            {product.name}
          </h3>
          
          {/* Price */}
          <div className="mt-auto">
            <div className="flex items-baseline gap-2 mb-3">
              <span className="text-2xl font-bold text-gray-900">
                ₹{product.price.toLocaleString('en-IN')}
              </span>
            </div>
            
            {/* Stock Status */}
            {product.stock > 0 ? (
              <div className="flex items-center gap-1 text-xs text-green-600 mb-3">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>In Stock</span>
              </div>
            ) : (
              <div className="text-xs text-red-600 mb-3">Out of Stock</div>
            )}
          </div>
        </div>
      </Link>
      
      {/* Action Button */}
      <div className="p-4 pt-0">
        <button
          onClick={handleAddToCart}
          disabled={product.stock === 0}
          className="w-full py-2.5 bg-primary-600 hover:bg-primary-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-lg font-semibold transition-colors text-sm"
        >
          {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;

