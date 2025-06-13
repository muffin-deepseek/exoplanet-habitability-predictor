import React from 'react';
import { motion } from 'framer-motion';
import { Database, Calculator, Image, Bookmark, Stars } from 'lucide-react';

const Sidebar = ({ activeSection, setActiveSection }) => {
  const sidebarItems = [
    { 
      id: 'explore-database', 
      name: 'Explore Database', 
      icon: Database,
      active: activeSection === 'explore-database'
    },
    { 
      id: 'calculate-habitability', 
      name: 'Calculate Habitability', 
      icon: Calculator,
      active: activeSection === 'calculate-habitability'
    },
    { 
      id: 'image-generation', 
      name: 'Image Generation', 
      icon: Image,
      active: activeSection === 'image-generation'
    },
    { 
      id: 'saved-exo-planets', 
      name: 'Saved Exo-Planets', 
      icon: Bookmark,
      active: activeSection === 'saved-exo-planets'
    }
  ];

  return (
    <div className="w-64 bg-black/40 backdrop-blur-sm border-r border-gray-800/50 min-h-screen p-4">
      {/* Stellar Logo Section */}
      <div className="flex items-center space-x-3 mb-8 p-3">
        <Stars className="w-6 h-6 text-white" />
        <span className="text-lg font-bold text-white">Stellar</span>
      </div>

      {/* Navigation Items */}
      <nav className="space-y-2">
        {sidebarItems.map((item) => {
          const Icon = item.icon;
          return (
            <motion.button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`w-full flex items-center space-x-3 p-3 rounded-lg text-left transition-all duration-200 ${
                item.active 
                  ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30' 
                  : 'text-gray-300 hover:bg-gray-800/50 hover:text-white'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{item.name}</span>
            </motion.button>
          );
        })}
      </nav>
    </div>
  );
};

export default Sidebar; 