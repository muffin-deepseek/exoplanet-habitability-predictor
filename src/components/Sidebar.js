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
    <div className="w-64 bg-black border-r border-gray-900 min-h-screen p-6">
      {/* Stellar Logo Section */}
      <div className="flex items-center space-x-3 mb-12 p-2">
        <Stars className="w-5 h-5 text-white" />
        <span className="text-base font-light text-white tracking-wide" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>Stellar</span>
      </div>

      {/* Navigation Items */}
      <nav className="space-y-1">
        {sidebarItems.map((item) => {
          const Icon = item.icon;
          return (
            <motion.button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              className={`w-full flex items-center space-x-3 p-4 text-left transition-all duration-300 ${
                item.active 
                  ? 'text-white border-l-2 border-blue-500 bg-gray-900/30' 
                  : 'text-gray-500 hover:text-gray-300 hover:bg-gray-900/20'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span className="font-light text-sm tracking-wide" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>{item.name}</span>
            </motion.button>
          );
        })}
      </nav>
    </div>
  );
};

export default Sidebar; 