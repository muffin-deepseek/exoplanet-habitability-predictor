import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, MoreHorizontal, Eye, Bookmark, Download, Star } from 'lucide-react';
import { exoplanetAPI } from '../services/api';

const ExploreDatabase = () => {
  const [activeTab, setActiveTab] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [exoplanets, setExoplanets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedFilters, setSelectedFilters] = useState({
    habitability: '',
    stellarAge: '',
    sortBy: 'discoveryYear'
  });

  const tabs = ['All', 'NASA', 'Kepler'];

  const habitabilityCategories = [
    { name: 'Prime Habitable (80-100%)', value: 'prime', color: 'bg-green-500', selected: selectedFilters.habitability === 'prime' },
    { name: 'Marginal Habitable (60-80%)', value: 'marginal', color: 'bg-yellow-500', selected: selectedFilters.habitability === 'marginal' },
    { name: 'Partially Habitable (30-60%)', value: 'partial', color: 'bg-orange-500', selected: selectedFilters.habitability === 'partial' },
    { name: 'Non-Habitable (0-30%)', value: 'none', color: 'bg-red-500', selected: selectedFilters.habitability === 'none' },
  ];

  const stellarAgeCategories = [
    { name: 'Young Stars (0.1-1 Gyr)', value: 'young', selected: selectedFilters.stellarAge === 'young' },
    { name: 'Main Sequence (1-5 Gyr)', value: 'main', selected: selectedFilters.stellarAge === 'main' },
    { name: 'Mature Stars (5-10 Gyr)', value: 'mature', selected: selectedFilters.stellarAge === 'mature' },
    { name: 'Old Stars (>10 Gyr)', value: 'old', selected: selectedFilters.stellarAge === 'old' },
  ];

  useEffect(() => {
    loadExoplanets();
  }, [activeTab, searchQuery, selectedFilters]);

  const loadExoplanets = async () => {
    setIsLoading(true);
    try {
      const filters = {
        search: searchQuery,
        habitability: selectedFilters.habitability,
        stellarAge: selectedFilters.stellarAge,
        source: activeTab === 'All' ? '' : activeTab
      };

      const response = await exoplanetAPI.getExoplanets(filters);
      setExoplanets(response.planets);
    } catch (error) {
      console.error('Failed to load exoplanets:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleFilterChange = (filterType, value) => {
    setSelectedFilters(prev => ({
      ...prev,
      [filterType]: prev[filterType] === value ? '' : value
    }));
  };

  const handleSaveExoplanet = async (planet) => {
    try {
      await exoplanetAPI.saveExoplanet(planet);
      // Show success feedback
      console.log('Planet saved successfully');
    } catch (error) {
      console.error('Failed to save planet:', error);
    }
  };

  const resetFilters = () => {
    setSelectedFilters({
      habitability: '',
      stellarAge: '',
      sortBy: 'discoveryYear'
    });
    setSearchQuery('');
  };

  const getHabitabilityColor = (score) => {
    if (score >= 80) return 'bg-green-500';
    if (score >= 60) return 'bg-yellow-500';
    if (score >= 30) return 'bg-orange-500';
    return 'bg-red-500';
  };

  const getHabitabilityTextColor = (score) => {
    if (score >= 80) return 'text-green-400';
    if (score >= 60) return 'text-yellow-400';
    if (score >= 30) return 'text-orange-400';
    return 'text-red-400';
  };

  return (
    <div className="flex-1 bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900 min-h-screen">
      <div className="flex">
        {/* Main Content */}
        <div className="flex-1 p-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <h1 className="text-4xl font-bold text-white mb-2">Exoplanet Database</h1>
            <p className="text-gray-300">Explore confirmed and candidate exoplanets from NASA's archive</p>
          </motion.div>

          {/* Search and Tabs */}
          <div className="mb-8">
            <div className="bg-black/20 backdrop-blur-sm border border-gray-700/50 rounded-xl p-4 mb-6">
              <div className="flex items-center space-x-4">
                <Search className="w-6 h-6 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                  placeholder="Search exoplanets by name..."
                  className="flex-1 bg-transparent text-white placeholder-gray-400 text-lg outline-none"
                />
              </div>
            </div>

            {/* Tabs */}
            <div className="flex space-x-6 mb-6">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                    activeTab === tab
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {tab}
                </button>
              ))}
              <div className="ml-auto">
                <select
                  value={selectedFilters.sortBy}
                  onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                  className="bg-gray-800 border border-gray-600 text-white rounded-lg px-3 py-2 text-sm"
                >
                  <option value="discoveryYear">Discovery Date</option>
                  <option value="distance">Distance</option>
                  <option value="habitabilityScore">Habitability</option>
                  <option value="name">Name</option>
                </select>
              </div>
            </div>
          </div>

          {/* Results Count */}
          <div className="mb-6">
            <span className="text-gray-400">
              {isLoading ? 'Loading...' : `${exoplanets.length} planets found`}
            </span>
          </div>

          {/* Exoplanet Cards */}
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="bg-black/30 backdrop-blur-sm border border-gray-700/50 rounded-xl overflow-hidden animate-pulse">
                  <div className="h-48 bg-gray-700"></div>
                  <div className="p-6 space-y-3">
                    <div className="h-6 bg-gray-700 rounded"></div>
                    <div className="h-4 bg-gray-700 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-700 rounded w-1/2"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {exoplanets.map((planet, index) => (
                <motion.div
                  key={planet.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-black/30 backdrop-blur-sm border border-gray-700/50 rounded-xl overflow-hidden hover:border-blue-500/50 transition-all duration-300"
                >
                  {/* Planet Image/Visualization */}
                  <div className="h-48 bg-gradient-to-br from-orange-400 to-red-600 relative overflow-hidden">
                    <div className="absolute inset-0 bg-black/20"></div>
                    <div className="absolute top-4 left-4">
                      <span className={`text-white px-3 py-1 rounded-full text-sm font-medium ${getHabitabilityColor(planet.habitabilityScore)}`}>
                        {planet.habitability}
                      </span>
                    </div>
                    <div className="absolute top-4 right-4">
                      <span className="bg-black/50 text-white px-2 py-1 rounded-full text-xs">
                        {planet.habitabilityScore}%
                      </span>
                    </div>
                    
                    {/* Planet visualization */}
                    <div className="absolute bottom-4 right-4">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 opacity-80 flex items-center justify-center">
                        <Star className="w-8 h-8 text-white" />
                      </div>
                    </div>
                  </div>

                  {/* Planet Info */}
                  <div className="p-6">
                    <h3 className="text-white text-xl font-bold mb-3">{planet.name}</h3>
                    
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Distance:</span>
                        <span className="text-white">{planet.distance}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Mass:</span>
                        <span className="text-white">{planet.mass}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Radius:</span>
                        <span className="text-white">{planet.radius}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Period:</span>
                        <span className="text-white">{planet.orbitalPeriod}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Temperature:</span>
                        <span className="text-white">{planet.equilibriumTemp}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Discovered:</span>
                        <span className="text-white">{planet.discoveryYear}</span>
                      </div>
                    </div>

                    {/* Habitability Score */}
                    <div className="mt-4 p-3 bg-black/30 rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-300 text-sm">Habitability Score</span>
                        <span className={`font-bold ${getHabitabilityTextColor(planet.habitabilityScore)}`}>
                          {planet.habitabilityScore}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${getHabitabilityColor(planet.habitabilityScore)}`}
                          style={{ width: `${planet.habitabilityScore}%` }}
                        ></div>
                      </div>
                    </div>

                    {/* Source */}
                    <div className="mt-4 flex items-center justify-between text-xs">
                      <span className="text-blue-400">{planet.source}</span>
                      <span className="text-gray-400">{planet.discoveryMethod}</span>
                    </div>

                    {/* Action Buttons */}
                    <div className="mt-4 flex space-x-2">
                      <button 
                        onClick={() => handleSaveExoplanet(planet)}
                        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-3 rounded-lg text-sm font-medium transition-colors flex items-center justify-center space-x-1"
                      >
                        <Bookmark className="w-4 h-4" />
                        <span>Save</span>
                      </button>
                      <button className="bg-gray-600 hover:bg-gray-700 text-white py-2 px-3 rounded-lg text-sm transition-colors flex items-center justify-center">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="bg-gray-600 hover:bg-gray-700 text-white py-2 px-3 rounded-lg text-sm transition-colors flex items-center justify-center">
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {/* Empty State */}
          {!isLoading && exoplanets.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <Search className="w-16 h-16 text-gray-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-400 mb-2">No exoplanets found</h3>
              <p className="text-gray-500 mb-4">Try adjusting your search criteria or filters</p>
              <button
                onClick={resetFilters}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
              >
                Clear Filters
              </button>
            </motion.div>
          )}
        </div>

        {/* Right Sidebar - Filters */}
        <div className="w-80 bg-black/30 backdrop-blur-sm border-l border-gray-700/50 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-white text-lg font-semibold">Filters</h3>
            <button 
              onClick={resetFilters}
              className="text-gray-400 hover:text-white text-sm transition-colors"
            >
              Reset
            </button>
          </div>

          {/* Habitability Filter */}
          <div className="mb-8">
            <h4 className="text-white font-medium mb-4">Habitability</h4>
            <div className="space-y-3">
              {habitabilityCategories.map((category) => (
                <div key={category.value} className="flex items-center space-x-3">
                  <button
                    onClick={() => handleFilterChange('habitability', category.value)}
                    className={`w-4 h-4 rounded-full border-2 transition-colors ${
                      category.selected 
                        ? 'border-blue-500 bg-blue-500' 
                        : 'border-gray-400 hover:border-gray-300'
                    }`}
                  ></button>
                  <span className="text-gray-300 text-sm flex-1">{category.name}</span>
                  <span className={`w-3 h-3 rounded-full ${category.color}`}></span>
                </div>
              ))}
            </div>
          </div>

          {/* Stellar Age Filter */}
          <div className="mb-8">
            <h4 className="text-white font-medium mb-4">Stellar Age (Gyr)</h4>
            <div className="space-y-3">
              {stellarAgeCategories.map((category, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <button
                    onClick={() => handleFilterChange('stellarAge', category.value)}
                    className={`w-4 h-4 rounded-full border-2 transition-colors ${
                      category.selected 
                        ? 'border-blue-500 bg-blue-500' 
                        : 'border-gray-400 hover:border-gray-300'
                    }`}
                  ></button>
                  <span className="text-gray-300 text-sm">{category.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Stats */}
          <div className="bg-black/40 rounded-lg p-4 mb-6">
            <h4 className="text-white font-medium mb-4">Database Stats</h4>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">Total Planets:</span>
                <span className="text-white font-semibold">5,234</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Confirmed:</span>
                <span className="text-white font-semibold">4,892</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Candidates:</span>
                <span className="text-white font-semibold">342</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Potentially Habitable:</span>
                <span className="text-green-400 font-semibold">67</span>
              </div>
            </div>
          </div>

          {/* Discovery Timeline Chart */}
          <div className="bg-black/40 rounded-lg p-4">
            <h4 className="text-white font-medium mb-4">Recent Discoveries</h4>
            <div className="space-y-2">
              <div className="flex items-end space-x-1 h-20">
                <div className="w-6 bg-blue-500 h-12 rounded-t"></div>
                <div className="w-6 bg-blue-400 h-16 rounded-t"></div>
                <div className="w-6 bg-blue-600 h-20 rounded-t"></div>
                <div className="w-6 bg-blue-500 h-14 rounded-t"></div>
                <div className="w-6 bg-blue-400 h-18 rounded-t"></div>
              </div>
              <div className="flex justify-between text-xs text-gray-400">
                <span>2020</span>
                <span>2021</span>
                <span>2022</span>
                <span>2023</span>
                <span>2024</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExploreDatabase; 