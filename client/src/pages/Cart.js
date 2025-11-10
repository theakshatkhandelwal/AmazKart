import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import CartItem from '../components/CartItem';

const Cart = () => {
  const { items, getTotalPrice, clearCart } = useCart();
  const total = getTotalPrice();

  const handleCheckout = () => {
    // This is a demo - in a real app, this would redirect to a checkout page
    alert('Checkout functionality would be implemented here!');
    // Optionally clear cart after checkout
    // clearCart();
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center py-16">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="relative inline-block mb-6">
            <div className="absolute inset-0 bg-primary-200 rounded-full blur-2xl opacity-50 animate-pulse"></div>
            <div className="relative bg-gradient-to-br from-primary-100 to-primary-200 p-8 rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-20 w-20 text-primary-600 mx-auto"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </div>
          </div>
          <h2 className="text-4xl font-black text-gray-900 mb-3 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
            Your cart is empty
          </h2>
          <p className="text-gray-600 mb-8 text-lg">Start shopping to add amazing products to your cart!</p>
          <Link
            to="/"
            className="inline-block px-8 py-4 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-xl hover:from-primary-700 hover:to-primary-800 transition-all duration-300 font-bold text-lg shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
          >
            🛍️ Browse Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-12">
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-4 mb-10">
          <div className="h-1 w-16 bg-gradient-to-r from-primary-500 to-primary-700 rounded-full"></div>
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 bg-gradient-to-r from-primary-600 via-primary-700 to-primary-800 bg-clip-text text-transparent">
            Shopping Cart
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-5">
            {items.map((item, index) => (
              <div key={item._id} className="animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <CartItem item={item} />
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl p-8 sticky top-28 border border-gray-200/50">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-1 w-12 bg-gradient-to-r from-primary-500 to-primary-700 rounded-full"></div>
                <h2 className="text-2xl font-black text-gray-900">Order Summary</h2>
              </div>
              
              <div className="space-y-4 mb-8">
                <div className="flex justify-between items-center py-3 border-b border-gray-200">
                  <span className="text-gray-600 font-semibold">Subtotal ({items.length} {items.length === 1 ? 'item' : 'items'})</span>
                  <span className="font-black text-lg text-gray-900">₹{total.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-200">
                  <span className="text-gray-600 font-semibold">Shipping</span>
                  <span className="font-bold text-green-600">FREE</span>
                </div>
                <div className="pt-4 flex justify-between items-center">
                  <span className="text-xl font-black text-gray-900">Total</span>
                  <span className="text-3xl font-black bg-gradient-to-r from-primary-600 to-primary-800 bg-clip-text text-transparent">
                    ₹{total.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                className="w-full py-4 bg-gradient-to-r from-primary-600 via-primary-700 to-primary-800 text-white rounded-xl hover:from-primary-700 hover:via-primary-800 hover:to-primary-900 transition-all duration-300 font-black text-lg shadow-xl hover:shadow-glow transform hover:-translate-y-1 mb-4"
              >
                🛒 Proceed to Checkout
              </button>

              <button
                onClick={clearCart}
                className="w-full py-3 text-red-600 hover:text-red-700 transition-all duration-200 font-bold border-2 border-red-200 hover:border-red-300 rounded-xl hover:bg-red-50"
              >
                Clear Cart
              </button>

              <Link
                to="/"
                className="block text-center mt-6 text-primary-600 hover:text-primary-700 transition-colors font-bold"
              >
                ← Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;

