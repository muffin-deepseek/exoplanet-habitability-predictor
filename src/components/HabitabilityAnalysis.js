import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';

const HabitabilityAnalysis = () => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="flex-1 bg-black min-h-screen relative overflow-hidden">
      {/* Subtle space background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-px h-px bg-white opacity-30 animate-pulse"></div>
        <div className="absolute top-1/3 right-1/3 w-px h-px bg-white opacity-40 animate-pulse delay-1000"></div>
        <div className="absolute bottom-1/4 left-1/2 w-px h-px bg-white opacity-20 animate-pulse delay-2000"></div>
        <div className="absolute top-2/3 right-1/4 w-px h-px bg-white opacity-35 animate-pulse delay-500"></div>
        <div className="absolute bottom-1/3 right-2/3 w-px h-px bg-white opacity-25 animate-pulse delay-1500"></div>
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-8">
        {/* Main Content - Ultra Clean */}
        <div className="text-center max-w-5xl mx-auto">
          {/* Main Heading - Minimalistic */}
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="text-5xl md:text-6xl font-light text-white mb-12 leading-tight tracking-wide"
            style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
          >
            Science-driven<br />
            <span className="font-normal">Habitability Analysis</span>
          </motion.h1>

          {/* Clean Description */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
            className="mb-16"
          >
            <p className="text-lg text-gray-300 max-w-4xl mx-auto leading-relaxed font-light tracking-wide mb-6"
               style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
              Our algorithm integrates the Conservative Habitable Zone (CHZ) model, Earth Similarity Index (ESI), 
              and atmospheric chemical equilibrium calculations.
            </p>
            <p className="text-sm text-gray-500 font-light tracking-wider"
               style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
              All outputs are derived from peer-reviewed exoplanet research
            </p>
            <p className="text-xs text-gray-600 mt-2 font-light"
               style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
              Sources: Kopparapu et al. 2013, Schulze-Makuch et al. 2011
            </p>
          </motion.div>

          {/* Minimal CTA Button */}
          <motion.button
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
            whileHover={{ 
              scale: 1.02,
              backgroundColor: "rgba(59, 130, 246, 0.15)",
              borderColor: "rgba(59, 130, 246, 0.6)"
            }}
            whileTap={{ scale: 0.98 }}
            className="border border-gray-700 hover:border-blue-500/50 text-white px-12 py-4 rounded-sm font-light text-base transition-all duration-300 mb-20 tracking-wider bg-transparent"
            style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
          >
            START RESEARCH
          </motion.button>
        </div>

        {/* Bottom Section - Clean Layout */}
        <div className="w-full max-w-7xl mx-auto">
          <div className="grid grid-cols-12 gap-16 items-center">
            {/* Left Side - Minimal Circular Progress */}
            <div className="col-span-4">
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.2, delay: 0.8, ease: "easeOut" }}
                className="relative mx-auto w-48 h-48"
              >
                <svg className="w-48 h-48 transform -rotate-90">
                  <circle
                    cx="96"
                    cy="96"
                    r="88"
                    stroke="rgba(55, 65, 81, 0.3)"
                    strokeWidth="1"
                    fill="none"
                  />
                  <motion.circle
                    cx="96"
                    cy="96"
                    r="88"
                    stroke="rgba(59, 130, 246, 0.8)"
                    strokeWidth="1"
                    fill="none"
                    strokeDasharray={`${2 * Math.PI * 88}`}
                    strokeDashoffset={`${2 * Math.PI * 88 * (1 - 0.5)}`}
                    strokeLinecap="round"
                    initial={{ strokeDashoffset: `${2 * Math.PI * 88}` }}
                    animate={{ strokeDashoffset: `${2 * Math.PI * 88 * (1 - 0.5)}` }}
                    transition={{ duration: 2, delay: 1.2, ease: "easeOut" }}
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.span 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 2 }}
                    className="text-4xl font-light text-white tracking-wider"
                    style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
                  >
                    50%
                  </motion.span>
                </div>
              </motion.div>
            </div>

            {/* Right Side - Clean Search Interface */}
            <div className="col-span-8">
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, delay: 1.0, ease: "easeOut" }}
                className="space-y-8"
              >
                {/* Search Bar - Ultra Minimal */}
                <div className="bg-gray-900/30 border border-gray-800 rounded-sm p-6 backdrop-blur-sm">
                  <div className="flex items-center space-x-4">
                    <Search className="w-5 h-5 text-gray-500" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search"
                      className="flex-1 bg-transparent text-white placeholder-gray-500 text-lg outline-none font-light tracking-wide"
                      style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
                    />
                  </div>
                </div>

                {/* Minimal Tabs */}
                <div className="flex space-x-12">
                  <button className="text-white font-light text-base border-b border-blue-500 pb-3 tracking-wider"
                          style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                    All
                  </button>
                  <button className="text-gray-500 hover:text-gray-300 font-light text-base pb-3 transition-colors tracking-wider"
                          style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                    NASA
                  </button>
                  <button className="text-gray-500 hover:text-gray-300 font-light text-base pb-3 transition-colors tracking-wider"
                          style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                    Kepler
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HabitabilityAnalysis; 