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
    <div className="flex items-center gap-6 bg-white/90 backdrop-blur-sm p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200/50 group">
      <div className="w-32 h-32 flex-shrink-0 rounded-xl overflow-hidden shadow-md group-hover:shadow-lg transition-shadow">
        <img
          src={item.images[0] || 'https://via.placeholder.com/100'}
          alt={item.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/100?text=No+Image';
          }}
        />
      </div>
      
      <div className="flex-1 min-w-0">
        <h3 className="text-xl font-black text-gray-900 mb-2 truncate group-hover:text-primary-600 transition-colors">
          {item.name}
        </h3>
        <p className="text-2xl font-black bg-gradient-to-r from-primary-600 to-primary-800 bg-clip-text text-transparent">
          ₹{item.price.toLocaleString('en-IN')}
        </p>
        <p className="text-sm text-gray-500 mt-1">per item</p>
      </div>
      
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-3">
          <label htmlFor={`qty-${item._id}`} className="text-sm font-bold text-gray-700">
            Qty:
          </label>
          <div className="flex items-center gap-2">
            <button
              onClick={() => updateQuantity(item._id, Math.max(1, item.quantity - 1))}
              className="w-10 h-10 border-2 border-gray-300 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition-all flex items-center justify-center font-bold text-gray-700 hover:text-primary-600"
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
              className="w-20 px-3 py-2 border-2 border-gray-300 rounded-lg text-center focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 font-bold text-gray-900"
            />
            <button
              onClick={() => updateQuantity(item._id, Math.min(item.stock || 99, item.quantity + 1))}
              className="w-10 h-10 border-2 border-gray-300 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition-all flex items-center justify-center font-bold text-gray-700 hover:text-primary-600"
            >
              +
            </button>
          </div>
        </div>
        
        <div className="text-right min-w-[120px]">
          <p className="text-sm text-gray-500 mb-1">Subtotal</p>
          <p className="text-2xl font-black text-gray-900">
            ₹{(item.price * item.quantity).toLocaleString('en-IN')}
          </p>
        </div>
        
        <button
          onClick={handleRemove}
          className="p-3 text-red-600 hover:bg-red-50 rounded-xl transition-all duration-200 hover:scale-110 border-2 border-transparent hover:border-red-200"
          aria-label="Remove item"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default CartItem;

