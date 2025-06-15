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
    <header className="bg-black border-b border-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <Stars className="w-6 h-6 text-white" />
            <span className="text-lg font-light text-white tracking-wide" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>Stellar</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-12">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-gray-400 hover:text-white transition-colors duration-300 font-light text-sm tracking-wide"
                style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
              >
                {item.name}
              </a>
            ))}
          </nav>

          {/* Auth Buttons */}
          <div className="flex items-center space-x-6">
            <button className="text-gray-400 hover:text-white transition-colors duration-300 font-light text-sm tracking-wide"
                    style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
              Log in
            </button>
            <button className="border border-gray-700 hover:border-gray-500 text-white px-6 py-2 rounded-sm font-light text-sm hover:bg-gray-900/30 transition-all duration-300 tracking-wide"
                    style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
              Sign up
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header; 