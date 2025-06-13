import React from 'react';
import { motion } from 'framer-motion';
import { Stars } from 'lucide-react';

const Header = () => {
  const navItems = [
    { name: 'Product', href: '#' },
    { name: 'Teams', href: '#' },
    { name: 'Changelog', href: '#' },
  ];

  return (
    <header className="bg-black/20 backdrop-blur-sm border-b border-gray-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <Stars className="w-8 h-8 text-white" />
            <span className="text-xl font-bold text-white">Stellar</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-gray-300 hover:text-white transition-colors duration-200 font-medium"
              >
                {item.name}
              </a>
            ))}
          </nav>

          {/* Auth Buttons */}
          <div className="flex items-center space-x-4">
            <button className="text-gray-300 hover:text-white transition-colors duration-200 font-medium">
              Log in
            </button>
            <button className="bg-white text-gray-900 px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors duration-200">
              Sign up
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header; 