import React from 'react';
import { useCart } from '../context/CartContext';

const CartItem = ({ item }) => {
  const { updateQuantity, removeItem } = useCart();

  const handleQuantityChange = (e) => {
    const newQuantity = parseInt(e.target.value);
    if (newQuantity > 0) {
      updateQuantity(item._id, newQuantity);
    }
  };

  const handleRemove = () => {
    removeItem(item._id);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 flex flex-col sm:flex-row gap-4">
      {/* Product Image */}
      <div className="w-full sm:w-24 h-24 flex-shrink-0 bg-gray-100 rounded-lg overflow-hidden">
        <img
          src={item.images[0] || 'https://via.placeholder.com/100'}
          alt={item.name}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/100?text=No+Image';
          }}
        />
      </div>
      
      {/* Product Info */}
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
          {item.name}
        </h3>
        <p className="text-lg font-bold text-gray-900 mb-4">
          ₹{item.price.toLocaleString('en-IN')}
        </p>
        
        {/* Quantity Controls */}
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex items-center border border-gray-300 rounded-lg">
            <button
              onClick={() => updateQuantity(item._id, Math.max(1, item.quantity - 1))}
              className="w-8 h-8 flex items-center justify-center hover:bg-gray-50 transition-colors"
            >
              −
            </button>
            <input
              id={`qty-${item._id}`}
              type="number"
              min="1"
              max={item.stock || 99}
              value={item.quantity}
              onChange={handleQuantityChange}
              className="w-12 px-2 py-1 border-0 text-center focus:outline-none text-sm"
            />
            <button
              onClick={() => updateQuantity(item._id, Math.min(item.stock || 99, item.quantity + 1))}
              className="w-8 h-8 flex items-center justify-center hover:bg-gray-50 transition-colors"
            >
              +
            </button>
          </div>
          
          {/* Subtotal */}
          <div className="text-sm">
            <span className="text-gray-600">Subtotal: </span>
            <span className="font-bold text-gray-900">
              ₹{(item.price * item.quantity).toLocaleString('en-IN')}
            </span>
          </div>
        </div>
      </div>
      
      {/* Remove Button */}
      <button
        onClick={handleRemove}
        className="self-start sm:self-center p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
        aria-label="Remove item"
      >
        <svg
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
          />
        </svg>
      </button>
    </div>
  );
};

export default CartItem;

