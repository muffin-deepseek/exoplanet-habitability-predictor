import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, ArrowRight } from 'lucide-react';

const HabitabilityAnalysis = () => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="flex-1 bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900 min-h-screen relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-96 h-96 bg-blue-500 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500 rounded-full filter blur-3xl"></div>
      </div>

      <div className="relative z-10 p-8">
        {/* Main Content Grid */}
        <div className="grid grid-cols-12 gap-8 min-h-screen">
          {/* Left Column - Main Content */}
          <div className="col-span-8 flex flex-col justify-center">
            {/* Circular Progress and Content */}
            <div className="flex items-center space-x-12">
              {/* Circular Progress */}
              <div className="relative">
                <svg className="w-48 h-48 transform -rotate-90">
                  <circle
                    cx="96"
                    cy="96"
                    r="80"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="none"
                    className="text-gray-700"
                  />
                  <circle
                    cx="96"
                    cy="96"
                    r="80"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="none"
                    strokeDasharray={`${2 * Math.PI * 80}`}
                    strokeDashoffset={`${2 * Math.PI * 80 * (1 - 0.5)}`}
                    className="text-blue-500"
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-6xl font-bold text-white">50%</span>
                </div>
              </div>

              {/* Content */}
              <div className="flex-1">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  <h1 className="text-6xl font-bold text-white mb-8 leading-tight">
                    Science-driven<br />
                    <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                      Habitability Analysis
                    </span>
                  </h1>
                  
                  <p className="text-xl text-gray-300 mb-8 max-w-2xl leading-relaxed">
                    Our algorithm integrates the Conservative Habitable Zone (CHZ) model,
                    Earth Similarity Index (ESI), and atmospheric chemical equilibrium
                    calculations. All outputs are derived from peer-reviewed exoplanet
                    research (Sources: Kopparapu et al. 2013, Schulze-Makuch et al. 2011).
                  </p>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold text-lg flex items-center space-x-2 transition-all duration-200"
                  >
                    <span>START RESEARCH</span>
                    <ArrowRight className="w-5 h-5" />
                  </motion.button>
                </motion.div>
              </div>
            </div>

            {/* Search Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mt-16"
            >
              <div className="bg-black/20 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
                <div className="flex items-center space-x-4">
                  <Search className="w-6 h-6 text-gray-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search"
                    className="flex-1 bg-transparent text-white placeholder-gray-400 text-lg outline-none"
                  />
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column - Stats/Info */}
          <div className="col-span-4 flex flex-col justify-center space-y-8">
            {/* Discovery Timeline */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="bg-black/30 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6"
            >
              <h3 className="text-white text-lg font-semibold mb-4">Discovery Timeline</h3>
              <div className="relative">
                <div className="flex justify-between text-sm text-gray-400 mb-2">
                  <span>1992</span>
                  <span>2025</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: '78%' }}></div>
                </div>
                <div className="mt-2 text-center">
                  <span className="text-blue-400 font-semibold">Year 2019</span>
                </div>
              </div>
            </motion.div>

            {/* Stats Cards */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="space-y-4"
            >
              <div className="bg-black/30 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
                <div className="text-4xl font-bold text-white mb-2">98</div>
                <div className="text-gray-400">Discovery Timeline</div>
              </div>
              
              <div className="bg-black/30 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
                <div className="text-white font-semibold mb-2">Stellar Age (Gyr)</div>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 border-2 border-gray-400 rounded-full"></div>
                    <span className="text-gray-300 text-sm">Young Stars (0.1-1 Gyr)</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 border-2 border-gray-400 rounded-full"></div>
                    <span className="text-gray-300 text-sm">Main Sequence (1-5 Gyr)</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 border-2 border-gray-400 rounded-full"></div>
                    <span className="text-gray-300 text-sm">Mature Stars (5-10 Gyr)</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 border-2 border-gray-400 rounded-full"></div>
                    <span className="text-gray-300 text-sm">Old Stars (>10 Gyr)</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HabitabilityAnalysis; 