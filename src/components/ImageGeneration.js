import React from 'react';
import { motion } from 'framer-motion';
import { Image } from 'lucide-react';

const ImageGeneration = () => {
  return (
    <div className="flex-1 bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900 min-h-screen flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center"
      >
        <Image className="w-24 h-24 text-blue-400 mx-auto mb-8" />
        <h1 className="text-4xl font-bold text-white mb-4">Image Generation</h1>
        <p className="text-xl text-gray-300">AI-powered exoplanet visualization coming soon...</p>
      </motion.div>
    </div>
  );
};

export default ImageGeneration; 