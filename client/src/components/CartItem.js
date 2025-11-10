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
    <div className="flex items-center space-x-4 bg-white p-4 rounded-lg shadow-sm">
      <div className="w-24 h-24 flex-shrink-0">
        <img
          src={item.images[0] || 'https://via.placeholder.com/100'}
          alt={item.name}
          className="w-full h-full object-cover rounded"
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/100?text=No+Image';
          }}
        />
      </div>
      
      <div className="flex-1 min-w-0">
        <h3 className="text-lg font-semibold text-gray-800 truncate">
          {item.name}
        </h3>
        <p className="text-primary-600 font-bold text-lg mt-1">
          ₹{item.price.toLocaleString('en-IN')}
        </p>
      </div>
      
      <div className="flex items-center space-x-3">
        <div className="flex items-center space-x-2">
          <label htmlFor={`qty-${item._id}`} className="text-sm text-gray-600">
            Qty:
          </label>
          <input
            id={`qty-${item._id}`}
            type="number"
            min="1"
            max={item.stock || 99}
            value={item.quantity}
            onChange={handleQuantityChange}
            className="w-16 px-2 py-1 border border-gray-300 rounded text-center focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>
        
        <div className="text-right min-w-[80px]">
          <p className="text-lg font-bold text-gray-800">
            ₹{(item.price * item.quantity).toLocaleString('en-IN')}
          </p>
        </div>
        
        <button
          onClick={handleRemove}
          className="p-2 text-red-600 hover:bg-red-50 rounded transition-colors"
          aria-label="Remove item"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
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
    </div>
  );
};

export default CartItem;

