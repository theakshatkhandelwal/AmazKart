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
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col"
    >
      <div className="relative h-64 bg-gray-100 overflow-hidden">
        <img
          src={product.images[0] || 'https://via.placeholder.com/400x300'}
          alt={product.name}
          className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/400x300?text=No+Image';
          }}
        />
        {product.stock === 0 && (
          <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-sm font-semibold">
            Out of Stock
          </div>
        )}
      </div>
      
      <div className="p-4 flex-1 flex flex-col">
        <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">
          {product.name}
        </h3>
        
        {product.shortDescription && (
          <p className="text-gray-600 text-sm mb-3 line-clamp-2 flex-1">
            {product.shortDescription}
          </p>
        )}
        
        <div className="mt-auto">
          <div className="flex items-center justify-between mb-3">
            <span className="text-2xl font-bold text-primary-600">
              ${product.price.toFixed(2)}
            </span>
            {product.stock > 0 && (
              <span className="text-sm text-gray-500">
                {product.stock} in stock
              </span>
            )}
          </div>
          
          <div className="flex gap-2">
            <Link
              to={`/product/${product._id}`}
              className="flex-1 text-center py-2 px-4 border border-primary-600 text-primary-600 rounded hover:bg-primary-50 transition-colors"
            >
              View
            </Link>
            <button
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className="flex-1 py-2 px-4 bg-primary-600 text-white rounded hover:bg-primary-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;

