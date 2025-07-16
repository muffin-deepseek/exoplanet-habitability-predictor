import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const NUM_STARS = 80;

function createStarProps() {
  return Array.from({ length: NUM_STARS }).map((_, i) => ({
    key: i,
    style: {
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      animationDelay: `${Math.random() * 5}s`,
      opacity: 0.5 + Math.random() * 0.5,
      width: `${1 + Math.random() * 2}px`,
      height: `${1 + Math.random() * 2}px`,
    },
  }));
}

const HabitabilityAnalysis = ({ setActiveSection }) => {
  const starProps = useRef(createStarProps());

  const handleButtonClick = (e) => {
    if (setActiveSection) setActiveSection('calculate-habitability');
  };

  return (
    <div className="flex-1 min-h-screen relative overflow-hidden bg-gradient-to-br from-[#0d1b2a] via-[#1a0b3d] to-[#111827]">
      {/* Starfield */}
      <div className="starfield">
        {starProps.current.map((props) => (
          <div className="star" {...props} />
        ))}
      </div>

      {/* Animated 3D Planet with Ring and Glow */}
      <div className="absolute inset-0 flex items-center justify-center z-0 pointer-events-none">
        <div className="planet-ring"></div>
        <motion.div
          className="planet-3d planet-glow"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 2 }}
          style={{ width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle at 60% 40%, #a5b4fc 0%, #2563eb 60%, #0f172a 100%)', boxShadow: '0 0 120px 40px #00D4FF33' }}
        >
        </motion.div>
      </div>

      <div className="relative z-20 flex flex-col items-center justify-center min-h-screen px-8">
        <div className="text-center max-w-5xl mx-auto">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="text-6xl md:text-7xl font-extralight text-white mb-10 leading-tight tracking-wide drop-shadow-lg text-glow"
            style={{ fontFamily: 'Inter, system-ui, sans-serif', letterSpacing: '0.04em', lineHeight: 1.1 }}
          >
            Science-driven<br />
            <span className="font-normal gradient-text">Habitability Analysis</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: 'easeOut' }}
            className="text-2xl text-blue-200 max-w-3xl mx-auto leading-relaxed font-light tracking-wide mb-12 drop-shadow"
            style={{ fontFamily: 'Inter, system-ui, sans-serif', letterSpacing: '0.03em', lineHeight: 1.4 }}
          >
            Explore the universe of exoplanets with our advanced, visually immersive, and scientifically robust habitability predictor.
          </motion.p>
          <motion.button
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6, ease: 'easeOut' }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="border border-blue-500 bg-gradient-to-r from-blue-600 to-indigo-700 text-white px-16 py-5 rounded-full font-semibold text-xl shadow-xl transition-all duration-300 mb-20 tracking-wider hover:from-blue-700 hover:to-indigo-800 hover:shadow-2xl cta-planet"
            style={{ fontFamily: 'Inter, system-ui, sans-serif', letterSpacing: '0.04em' }}
            onClick={handleButtonClick}
          >
            START RESEARCH
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default HabitabilityAnalysis; 