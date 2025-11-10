import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from './ProductCard';

const ProductCarousel = ({ title, products, showViewAll = false }) => {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    const container = scrollRef.current;
    if (container) {
      const scrollAmount = 300;
      container.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  if (!products || products.length === 0) {
    return null;
  }

  return (
    <div className="mb-16 animate-fade-in">
      {title && (
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="h-1 w-12 bg-gradient-to-r from-primary-500 to-primary-700 rounded-full"></div>
            <h2 className="text-4xl font-black text-gray-900 bg-gradient-to-r from-primary-600 via-primary-700 to-primary-800 bg-clip-text text-transparent">
              {title}
            </h2>
          </div>
          {showViewAll && (
            <Link
              to={`/category/${encodeURIComponent(title)}`}
              className="text-primary-600 hover:text-primary-700 font-bold text-lg transition-all hover:translate-x-2 flex items-center gap-2 group"
            >
              View All
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          )}
        </div>
      )}
      
      <div className="relative">
        <button
          onClick={() => scroll('left')}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/90 backdrop-blur-md rounded-full p-4 shadow-2xl hover:shadow-glow hover:bg-white transition-all duration-300 hidden md:flex items-center justify-center border-2 border-gray-200 hover:border-primary-400 group"
          aria-label="Scroll left"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-gray-700 group-hover:text-primary-600 group-hover:scale-110 transition-all"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto scrollbar-hide pb-4 scroll-smooth"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {products.map((product) => (
            <div key={product._id} className="flex-shrink-0 w-64">
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        <button
          onClick={() => scroll('right')}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/90 backdrop-blur-md rounded-full p-4 shadow-2xl hover:shadow-glow hover:bg-white transition-all duration-300 hidden md:flex items-center justify-center border-2 border-gray-200 hover:border-primary-400 group"
          aria-label="Scroll right"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-gray-700 group-hover:text-primary-600 group-hover:scale-110 transition-all"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ProductCarousel;

