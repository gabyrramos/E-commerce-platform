// src/components/layout/Header.tsx
import React, { useState } from 'react';
import Link from 'next/link';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'; // You might need to install @heroicons/react

interface HeaderProps {
  title?: string;
}

const Header: React.FC<HeaderProps> = ({ title = 'My Awesome Store' }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="bg-gray-100 border-b border-gray-200 py-4 sm:py-6">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link
          href="/"
          className="text-xl sm:text-2xl font-semibold text-blue-600 hover:text-blue-700 transition-colors duration-200"
        >
          {title}
        </Link>


        <nav className="hidden md:block">
          <ul className="flex space-x-6 lg:space-x-8">
            <li>
              <Link href="/" className="text-gray-700 hover:text-blue-600 transition-colors duration-200">
                Home
              </Link>
            </li>
            <li>
              <Link href="/products" className="text-gray-700 hover:text-blue-600 transition-colors duration-200">
                Products
              </Link>
            </li>
            <li>
              <Link href="/cart" className="text-gray-700 hover:text-blue-600 transition-colors duration-200">
                Cart
              </Link>
            </li>
  
          </ul>
        </nav>

    
        <div className="md:hidden">
          <button onClick={toggleMobileMenu} className="text-gray-600 hover:text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500">
            {isMobileMenuOpen ? (
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            ) : (
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden ${isMobileMenuOpen ? 'block' : 'hidden'}`}>
        <div className="px-4 py-2 space-y-2">
          <Link href="/" className="block py-2 text-gray-700 hover:text-blue-600 transition-colors duration-200">
            Home
          </Link>
          <Link href="/products" className="block py-2 text-gray-700 hover:text-blue-600 transition-colors duration-200">
            Products
          </Link>
          <Link href="/cart" className="block py-2 text-gray-700 hover:text-blue-600 transition-colors duration-200">
            Cart
          </Link>
         
        </div>
      </div>
    </header>
  );
};

export default Header;