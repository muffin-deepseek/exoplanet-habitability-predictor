import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Bookmark, Trash2, Download, Eye, Star, Search, Calendar, Globe } from 'lucide-react';
import { exoplanetAPI } from '../services/api';

const SavedExoPlanets = () => {
  const [savedPlanets, setSavedPlanets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('savedAt');

  useEffect(() => {
    loadSavedPlanets();
  }, []);

  const loadSavedPlanets = async () => {
    setIsLoading(true);
    try {
      const planets = await exoplanetAPI.getSavedExoplanets();
      setSavedPlanets(planets);
    } catch (error) {
      console.error('Failed to load saved planets:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeletePlanet = (planetId) => {
    const updatedPlanets = savedPlanets.filter(planet => planet.id !== planetId);
    setSavedPlanets(updatedPlanets);
    localStorage.setItem('savedExoplanets', JSON.stringify(updatedPlanets));
  };

  const handleExportData = () => {
    const dataStr = JSON.stringify(savedPlanets, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'saved_exoplanets.json';
    link.click();
    URL.revokeObjectURL(url);
  };

  const filteredPlanets = savedPlanets
    .filter(planet => 
      planet.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      planet.classification?.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name?.localeCompare(b.name) || 0;
        case 'habitabilityScore':
          return (b.habitabilityScore || 0) - (a.habitabilityScore || 0);
        case 'savedAt':
        default:
          return new Date(b.savedAt) - new Date(a.savedAt);
      }
    });

  const getHabitabilityColor = (score) => {
    if (score >= 80) return 'text-green-400';
    if (score >= 60) return 'text-yellow-400';
    if (score >= 30) return 'text-orange-400';
    return 'text-red-400';
  };

  const getHabitabilityBg = (score) => {
    if (score >= 80) return 'bg-green-500';
    if (score >= 60) return 'bg-yellow-500';
    if (score >= 30) return 'bg-orange-500';
    return 'bg-red-500';
  };

  if (isLoading) {
    return (
      <div className="flex-1 bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900 min-h-screen flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-400 mx-auto mb-4"></div>
          <p className="text-xl text-gray-300">Loading saved exoplanets...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900 min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2 flex items-center space-x-3">
                <Bookmark className="w-10 h-10 text-blue-400" />
                <span>Saved Exoplanets</span>
              </h1>
              <p className="text-gray-300">Your personal collection of exoplanet research</p>
            </div>
            
            {savedPlanets.length > 0 && (
              <button
                onClick={handleExportData}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center space-x-2"
              >
                <Download className="w-5 h-5" />
                <span>Export Data</span>
              </button>
            )}
          </div>
        </motion.div>

        {savedPlanets.length === 0 ? (
          // Empty State
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center py-16"
          >
            <Bookmark className="w-24 h-24 text-gray-500 mx-auto mb-8" />
            <h2 className="text-3xl font-bold text-white mb-4">No Saved Exoplanets Yet</h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Start exploring the database or use the habitability predictor to save interesting exoplanets to your collection.
            </p>
            <div className="flex justify-center space-x-4">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
                Explore Database
              </button>
              <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
                Predict Habitability
              </button>
            </div>
          </motion.div>
        ) : (
          <>
            {/* Search and Controls */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-8"
            >
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                {/* Search */}
                <div className="flex-1 bg-black/20 backdrop-blur-sm border border-gray-700/50 rounded-xl p-4">
                  <div className="flex items-center space-x-4">
                    <Search className="w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search saved exoplanets..."
                      className="flex-1 bg-transparent text-white placeholder-gray-400 outline-none"
                    />
                  </div>
                </div>

                {/* Sort */}
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-gray-800 border border-gray-600 text-white rounded-xl px-4 py-4 min-w-[200px]"
                >
                  <option value="savedAt">Recently Saved</option>
                  <option value="name">Name (A-Z)</option>
                  <option value="habitabilityScore">Habitability Score</option>
                </select>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-black/30 backdrop-blur-sm border border-gray-700/50 rounded-xl p-4">
                  <div className="text-2xl font-bold text-white">{savedPlanets.length}</div>
                  <div className="text-gray-400">Total Saved</div>
                </div>
                <div className="bg-black/30 backdrop-blur-sm border border-gray-700/50 rounded-xl p-4">
                  <div className="text-2xl font-bold text-green-400">
                    {savedPlanets.filter(p => (p.habitabilityScore || 0) >= 60).length}
                  </div>
                  <div className="text-gray-400">Potentially Habitable</div>
                </div>
                <div className="bg-black/30 backdrop-blur-sm border border-gray-700/50 rounded-xl p-4">
                  <div className="text-2xl font-bold text-blue-400">
                    {savedPlanets.filter(p => p.customPrediction).length}
                  </div>
                  <div className="text-gray-400">Custom Predictions</div>
                </div>
              </div>
            </motion.div>

            {/* Planets Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredPlanets.map((planet, index) => (
                <motion.div
                  key={planet.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-black/30 backdrop-blur-sm border border-gray-700/50 rounded-xl overflow-hidden hover:border-blue-500/50 transition-all duration-300"
                >
                  {/* Header */}
                  <div className="p-6 pb-0">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-bold text-white">{planet.name || 'Unnamed Planet'}</h3>
                      <button
                        onClick={() => handleDeletePlanet(planet.id)}
                        className="text-gray-400 hover:text-red-400 transition-colors"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>

                    {planet.customPrediction && (
                      <div className="bg-purple-500/20 border border-purple-500/50 rounded-lg px-3 py-1 mb-4">
                        <span className="text-purple-400 text-sm font-medium">Custom Prediction</span>
                      </div>
                    )}
                  </div>

                  {/* Habitability Score */}
                  {planet.habitabilityScore && (
                    <div className="px-6 mb-4">
                      <div className="bg-black/40 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-gray-300">Habitability Score</span>
                          <span className={`font-bold text-lg ${getHabitabilityColor(planet.habitabilityScore)}`}>
                            {planet.habitabilityScore}%
                          </span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full ${getHabitabilityBg(planet.habitabilityScore)}`}
                            style={{ width: `${planet.habitabilityScore}%` }}
                          ></div>
                        </div>
                        {planet.classification && (
                          <div className={`text-sm mt-2 ${getHabitabilityColor(planet.habitabilityScore)}`}>
                            {planet.classification}
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Planet Parameters */}
                  <div className="px-6 mb-4">
                    <h4 className="text-white font-medium mb-3 flex items-center space-x-2">
                      <Globe className="w-4 h-4 text-blue-400" />
                      <span>Parameters</span>
                    </h4>
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      {planet.planetRadius && (
                        <div>
                          <span className="text-gray-400">Radius:</span>
                          <div className="text-white font-medium">{planet.planetRadius} RE</div>
                        </div>
                      )}
                      {planet.orbitalPeriod && (
                        <div>
                          <span className="text-gray-400">Period:</span>
                          <div className="text-white font-medium">{planet.orbitalPeriod} days</div>
                        </div>
                      )}
                      {planet.stellarMass && (
                        <div>
                          <span className="text-gray-400">Star Mass:</span>
                          <div className="text-white font-medium">{planet.stellarMass} M☉</div>
                        </div>
                      )}
                      {planet.equilibriumTemp && (
                        <div>
                          <span className="text-gray-400">Temperature:</span>
                          <div className="text-white font-medium">{planet.equilibriumTemp} K</div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Metadata */}
                  <div className="px-6 pb-6">
                    <div className="flex items-center justify-between text-xs text-gray-400 mb-4">
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-3 h-3" />
                        <span>Saved {new Date(planet.savedAt).toLocaleDateString()}</span>
                      </div>
                      {planet.confidence && (
                        <span>Confidence: {planet.confidence}%</span>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex space-x-2">
                      <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-3 rounded-lg text-sm font-medium transition-colors flex items-center justify-center space-x-1">
                        <Eye className="w-4 h-4" />
                        <span>Details</span>
                      </button>
                      <button className="bg-gray-600 hover:bg-gray-700 text-white py-2 px-3 rounded-lg text-sm transition-colors flex items-center justify-center">
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* No results found */}
            {filteredPlanets.length === 0 && searchQuery && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-16"
              >
                <Search className="w-16 h-16 text-gray-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-400 mb-2">No planets found</h3>
                <p className="text-gray-500 mb-4">Try adjusting your search query</p>
                <button
                  onClick={() => setSearchQuery('')}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                >
                  Clear Search
                </button>
              </motion.div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default SavedExoPlanets; 