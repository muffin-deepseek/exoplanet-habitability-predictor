import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, ArrowRight, Telescope, Globe, Zap, Star, Sparkles, Target } from 'lucide-react';

const HabitabilityAnalysis = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [animatedProgress, setAnimatedProgress] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedProgress(85);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const features = [
    {
      icon: <Telescope className="w-6 h-6" />,
      title: "Advanced Detection",
      description: "AI-powered analysis of 5,000+ confirmed exoplanets"
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: "Habitability Scoring",
      description: "Multi-factor assessment using NASA's latest research"
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Real-time Processing",
      description: "Instant predictions with 94% accuracy rate"
    }
  ];

  return (
    <div className="flex-1 bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900 min-h-screen relative overflow-hidden">
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-96 h-96 bg-blue-500/20 rounded-full filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-500/20 rounded-full filter blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-cyan-500/10 rounded-full filter blur-2xl animate-pulse delay-500"></div>
        
        {/* Floating Stars */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full opacity-60"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.3, 1, 0.3],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 p-8">
        {/* Main Content Grid */}
        <div className="grid grid-cols-12 gap-8 min-h-screen">
          {/* Left Column - Main Content */}
          <div className="col-span-8 flex flex-col justify-center">
            {/* Hero Section */}
            <div className="flex items-center space-x-16">
              {/* Enhanced Circular Progress */}
              <div className="relative">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 1, ease: "easeOut" }}
                >
                  <svg className="w-56 h-56 transform -rotate-90">
                    {/* Background Circle */}
                    <circle
                      cx="112"
                      cy="112"
                      r="90"
                      stroke="currentColor"
                      strokeWidth="6"
                      fill="none"
                      className="text-gray-700/50"
                    />
                    {/* Progress Circle */}
                    <motion.circle
                      cx="112"
                      cy="112"
                      r="90"
                      stroke="url(#gradient)"
                      strokeWidth="6"
                      fill="none"
                      strokeDasharray={`${2 * Math.PI * 90}`}
                      strokeDashoffset={`${2 * Math.PI * 90 * (1 - animatedProgress / 100)}`}
                      strokeLinecap="round"
                      className="drop-shadow-lg"
                      initial={{ strokeDashoffset: `${2 * Math.PI * 90}` }}
                      animate={{ strokeDashoffset: `${2 * Math.PI * 90 * (1 - animatedProgress / 100)}` }}
                      transition={{ duration: 2, ease: "easeOut", delay: 0.5 }}
                    />
                    {/* Gradient Definition */}
                    <defs>
                      <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#3B82F6" />
                        <stop offset="50%" stopColor="#8B5CF6" />
                        <stop offset="100%" stopColor="#06B6D4" />
                      </linearGradient>
                    </defs>
                  </svg>
                  
                  {/* Center Content */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.8, delay: 1.5 }}
                      className="text-center"
                    >
                      <div className="text-7xl font-bold text-white mb-2">
                        {animatedProgress}%
                      </div>
                      <div className="text-sm text-blue-300 font-medium">
                        ACCURACY RATE
                      </div>
                    </motion.div>
                  </div>
                  
                  {/* Orbiting Elements */}
                  <motion.div
                    className="absolute top-4 right-4 w-4 h-4 bg-blue-400 rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                  />
                  <motion.div
                    className="absolute bottom-4 left-4 w-3 h-3 bg-purple-400 rounded-full"
                    animate={{ rotate: -360 }}
                    transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                  />
                </motion.div>
              </div>

              {/* Enhanced Content */}
              <div className="flex-1">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.3 }}
                >
                  <div className="flex items-center space-x-3 mb-6">
                    <Sparkles className="w-8 h-8 text-yellow-400" />
                    <span className="text-yellow-400 font-semibold text-lg">NEXT-GEN DISCOVERY</span>
                  </div>
                  
                  <h1 className="text-7xl font-bold text-white mb-8 leading-tight">
                    Unlock the<br />
                    <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                      Cosmic Frontier
                    </span>
                  </h1>
                  
                  <p className="text-xl text-gray-300 mb-8 max-w-2xl leading-relaxed">
                    Discover potentially habitable worlds using cutting-edge machine learning 
                    and NASA's most advanced exoplanet research. Our AI analyzes atmospheric 
                    composition, orbital dynamics, and stellar characteristics to identify 
                    the next Earth-like paradise in our galaxy.
                  </p>

                  <div className="flex items-center space-x-6 mb-8">
                    <motion.button
                      whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(59, 130, 246, 0.3)" }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-10 py-4 rounded-xl font-semibold text-lg flex items-center space-x-3 transition-all duration-300 shadow-lg"
                    >
                      <Target className="w-6 h-6" />
                      <span>START EXPLORATION</span>
                      <ArrowRight className="w-5 h-5" />
                    </motion.button>
                    
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="text-white border-2 border-gray-600 hover:border-blue-400 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300"
                    >
                      View Demo
                    </motion.button>
                  </div>

                  {/* Feature Pills */}
                  <div className="flex flex-wrap gap-3">
                    {features.map((feature, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                        className="bg-black/30 backdrop-blur-sm border border-gray-700/50 rounded-full px-4 py-2 flex items-center space-x-2"
                      >
                        <div className="text-blue-400">{feature.icon}</div>
                        <span className="text-white text-sm font-medium">{feature.title}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Enhanced Search Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mt-20"
            >
              <div className="bg-black/20 backdrop-blur-lg border border-gray-700/50 rounded-2xl p-8 shadow-2xl">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-blue-600/20 rounded-xl">
                    <Search className="w-7 h-7 text-blue-400" />
                  </div>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search for exoplanets, star systems, or habitable zones..."
                    className="flex-1 bg-transparent text-white placeholder-gray-400 text-xl outline-none"
                  />
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200"
                  >
                    Search
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column - Enhanced Stats */}
          <div className="col-span-4 flex flex-col justify-center space-y-6">
            {/* Discovery Timeline */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="bg-black/30 backdrop-blur-lg border border-gray-700/50 rounded-2xl p-8 shadow-xl"
            >
              <div className="flex items-center space-x-3 mb-6">
                <Star className="w-6 h-6 text-yellow-400" />
                <h3 className="text-white text-xl font-bold">Discovery Timeline</h3>
              </div>
              <div className="relative">
                <div className="flex justify-between text-sm text-gray-400 mb-3">
                  <span>1992</span>
                  <span>2025</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-3 overflow-hidden">
                  <motion.div 
                    className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: '82%' }}
                    transition={{ duration: 2, delay: 1.2 }}
                  />
                </div>
                <div className="mt-4 text-center">
                  <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                    Year 2024
                  </span>
                  <p className="text-gray-400 text-sm mt-1">Current Discovery Era</p>
                </div>
              </div>
            </motion.div>

            {/* Enhanced Stats Cards */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 1.0 }}
              className="space-y-4"
            >
              <div className="bg-black/30 backdrop-blur-lg border border-gray-700/50 rounded-2xl p-6 shadow-xl">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-5xl font-bold bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
                    5,247
                  </div>
                  <Globe className="w-8 h-8 text-green-400" />
                </div>
                <div className="text-gray-300 font-medium">Confirmed Exoplanets</div>
                <div className="text-green-400 text-sm mt-1">+127 this month</div>
              </div>
              
              <div className="bg-black/30 backdrop-blur-lg border border-gray-700/50 rounded-2xl p-6 shadow-xl">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-white font-bold text-lg">Habitability Zones</h4>
                  <Zap className="w-6 h-6 text-blue-400" />
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300 text-sm">Goldilocks Zone</span>
                    <span className="text-green-400 font-semibold">847</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300 text-sm">Extended Habitable</span>
                    <span className="text-yellow-400 font-semibold">1,203</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300 text-sm">Potentially Habitable</span>
                    <span className="text-blue-400 font-semibold">2,891</span>
                  </div>
                </div>
              </div>

              <div className="bg-black/30 backdrop-blur-lg border border-gray-700/50 rounded-2xl p-6 shadow-xl">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-white font-bold text-lg">AI Confidence</h4>
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-sm">AI</span>
                  </div>
                </div>
                <div className="text-4xl font-bold text-white mb-2">94.7%</div>
                <div className="text-gray-400 text-sm">Prediction Accuracy</div>
                <div className="w-full bg-gray-700 rounded-full h-2 mt-3">
                  <motion.div 
                    className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: '94.7%' }}
                    transition={{ duration: 2, delay: 1.5 }}
                  />
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