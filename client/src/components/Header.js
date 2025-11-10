import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Header = () => {
  const { getTotalItems } = useCart();
  const navigate = useNavigate();
  const totalItems = getTotalItems();
  
  // Check if user is logged in
  const user = JSON.parse(localStorage.getItem('user') || 'null');
  
  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
    window.location.reload();
  };

  return (
    <header className="bg-white/95 backdrop-blur-md shadow-xl sticky top-0 z-50 border-b border-gray-200/50">
      <div className="container mx-auto px-4 py-5">
        <div className="flex items-center justify-between gap-4">
          <Link to="/" className="flex items-center space-x-3 flex-shrink-0 group">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary-400 to-primary-600 rounded-lg blur opacity-75 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative bg-gradient-to-br from-primary-500 to-primary-700 p-2 rounded-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
            </div>
            <h1 className="text-3xl font-black bg-gradient-to-r from-primary-600 via-primary-700 to-primary-800 bg-clip-text text-transparent group-hover:from-primary-700 group-hover:via-primary-800 group-hover:to-primary-900 transition-all duration-300">
              AmazKart
            </h1>
          </Link>
          
          <nav className="flex items-center space-x-4 flex-shrink-0">
            <Link
              to="/"
              className="text-gray-700 hover:text-primary-600 font-semibold transition-all duration-200 hidden sm:block relative group"
            >
              Products
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary-600 group-hover:w-full transition-all duration-300"></span>
            </Link>
            
            {user ? (
              <>
                <div className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-lg bg-primary-50 border border-primary-200">
                  <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <span className="text-sm font-bold text-primary-700">{user.name || user.email}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="text-gray-700 hover:text-red-600 transition-all duration-200 px-4 py-2.5 rounded-xl hover:bg-red-50 font-semibold hidden sm:block"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-gray-700 hover:text-primary-600 transition-all duration-200 px-4 py-2.5 rounded-xl hover:bg-primary-50 font-semibold hidden sm:block"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="px-4 py-2.5 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-xl hover:from-primary-700 hover:to-primary-800 transition-all duration-200 font-bold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 hidden sm:block"
                >
                  Sign Up
                </Link>
              </>
            )}
            
            <Link
              to="/cart"
              className="relative flex items-center space-x-2 text-gray-700 hover:text-primary-600 transition-all duration-200 px-4 py-2.5 rounded-xl hover:bg-gradient-to-r hover:from-primary-50 hover:to-blue-50 font-semibold group"
            >
              <div className="relative">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 group-hover:scale-110 transition-transform duration-200"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-black rounded-full h-6 w-6 flex items-center justify-center shadow-lg animate-pulse border-2 border-white">
                    {totalItems}
                  </span>
                )}
              </div>
              <span className="hidden sm:inline">Cart</span>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;

