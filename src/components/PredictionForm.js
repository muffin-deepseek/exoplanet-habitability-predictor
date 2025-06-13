import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calculator, 
  Loader, 
  CheckCircle, 
  AlertCircle, 
  TrendingUp, 
  Thermometer,
  Globe,
  Orbit,
  Star,
  Save,
  Download,
  RotateCcw
} from 'lucide-react';
import { exoplanetAPI } from '../services/api';

const PredictionForm = () => {
  const [formData, setFormData] = useState({
    planetRadius: 1.0,
    orbitalPeriod: 365,
    stellarMass: 1.0,
    equilibriumTemp: 288,
    eccentricity: 0.1,
    stellarRadius: 1.0
  });

  const [prediction, setPrediction] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isSaved, setIsSaved] = useState(false);

  const parameterInfo = {
    planetRadius: {
      label: 'Planet Radius',
      unit: 'Earth Radii (RE)',
      range: '0.1 - 10.0',
      optimal: '0.8 - 1.5',
      description: 'Size relative to Earth. Affects gravity and atmosphere retention.',
      icon: Globe
    },
    orbitalPeriod: {
      label: 'Orbital Period',
      unit: 'Days',
      range: '1 - 10000',
      optimal: '200 - 700',
      description: 'Time to complete one orbit. Indicates distance from star.',
      icon: Orbit
    },
    stellarMass: {
      label: 'Stellar Mass',
      unit: 'Solar Masses (M☉)',
      range: '0.1 - 5.0',
      optimal: '0.5 - 1.5',
      description: 'Mass of the host star. Affects luminosity and lifetime.',
      icon: Star
    },
    equilibriumTemp: {
      label: 'Equilibrium Temperature',
      unit: 'Kelvin (K)',
      range: '50 - 1000',
      optimal: '273 - 323',
      description: 'Theoretical surface temperature without atmosphere.',
      icon: Thermometer
    },
    eccentricity: {
      label: 'Orbital Eccentricity',
      unit: 'Dimensionless',
      range: '0.0 - 0.9',
      optimal: '0.0 - 0.3',
      description: 'How elliptical the orbit is. 0 = circular, higher = more elliptical.',
      icon: Orbit
    },
    stellarRadius: {
      label: 'Stellar Radius',
      unit: 'Solar Radii (R☉)',
      range: '0.1 - 5.0',
      optimal: '0.7 - 1.3',
      description: 'Size of the host star relative to the Sun.',
      icon: Star
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: parseFloat(value) || 0
    }));
    
    // Clear previous results when form changes
    if (prediction) {
      setPrediction(null);
      setIsSaved(false);
    }
  };

  const handlePresetLoad = (presetName) => {
    const presets = {
      earth: {
        planetRadius: 1.0,
        orbitalPeriod: 365.25,
        stellarMass: 1.0,
        equilibriumTemp: 288,
        eccentricity: 0.017,
        stellarRadius: 1.0
      },
      'kepler-186f': {
        planetRadius: 1.11,
        orbitalPeriod: 129.9,
        stellarMass: 0.54,
        equilibriumTemp: 188,
        eccentricity: 0.04,
        stellarRadius: 0.51
      },
      'mars': {
        planetRadius: 0.53,
        orbitalPeriod: 687,
        stellarMass: 1.0,
        equilibriumTemp: 210,
        eccentricity: 0.093,
        stellarRadius: 1.0
      },
      'venus': {
        planetRadius: 0.95,
        orbitalPeriod: 225,
        stellarMass: 1.0,
        equilibriumTemp: 737,
        eccentricity: 0.007,
        stellarRadius: 1.0
      }
    };

    if (presets[presetName]) {
      setFormData(presets[presetName]);
      setPrediction(null);
      setIsSaved(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const result = await exoplanetAPI.predictHabitability(formData);
      setPrediction(result);
    } catch (err) {
      setError('Failed to predict habitability. Please try again.');
      console.error('Prediction error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    if (!prediction) return;

    try {
      const planetData = {
        ...formData,
        ...prediction,
        name: `Custom Planet ${Date.now()}`,
        customPrediction: true
      };

      await exoplanetAPI.saveExoplanet(planetData);
      setIsSaved(true);
      
      // Show success message briefly
      setTimeout(() => setIsSaved(false), 3000);
    } catch (err) {
      console.error('Save error:', err);
    }
  };

  const handleReset = () => {
    setFormData({
      planetRadius: 1.0,
      orbitalPeriod: 365,
      stellarMass: 1.0,
      equilibriumTemp: 288,
      eccentricity: 0.1,
      stellarRadius: 1.0
    });
    setPrediction(null);
    setError(null);
    setIsSaved(false);
  };

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-green-400';
    if (score >= 60) return 'text-yellow-400';
    if (score >= 30) return 'text-orange-400';
    return 'text-red-400';
  };

  const getScoreBg = (score) => {
    if (score >= 80) return 'bg-green-500';
    if (score >= 60) return 'bg-yellow-500';
    if (score >= 30) return 'bg-orange-500';
    return 'bg-red-500';
  };

  return (
    <div className="max-w-7xl mx-auto p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-12"
      >
        <h1 className="text-5xl font-bold text-white mb-4">
          Habitability <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Predictor</span>
        </h1>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          Enter planetary parameters to predict habitability using our advanced machine learning model
          trained on NASA's exoplanet database and peer-reviewed research.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Input Form */}
        <div className="lg:col-span-2">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-black/30 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8"
          >
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-white flex items-center space-x-2">
                <Calculator className="w-6 h-6 text-blue-400" />
                <span>Planetary Parameters</span>
              </h2>
              
              <div className="flex space-x-2">
                <select
                  onChange={(e) => handlePresetLoad(e.target.value)}
                  className="bg-gray-800 border border-gray-600 text-white rounded-lg px-3 py-2 text-sm"
                  defaultValue=""
                >
                  <option value="" disabled>Load Preset</option>
                  <option value="earth">Earth</option>
                  <option value="kepler-186f">Kepler-186f</option>
                  <option value="mars">Mars</option>
                  <option value="venus">Venus</option>
                </select>
                
                <button
                  onClick={handleReset}
                  className="bg-gray-700 hover:bg-gray-600 text-white px-3 py-2 rounded-lg text-sm flex items-center space-x-1 transition-colors"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Reset</span>
                </button>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Object.entries(parameterInfo).map(([field, info]) => {
                  const Icon = info.icon;
                  return (
                    <div key={field} className="space-y-2">
                      <label className="flex items-center space-x-2 text-white font-medium">
                        <Icon className="w-4 h-4 text-blue-400" />
                        <span>{info.label}</span>
                      </label>
                      
                      <div className="relative">
                        <input
                          type="number"
                          value={formData[field]}
                          onChange={(e) => handleInputChange(field, e.target.value)}
                          step="0.01"
                          className="w-full bg-gray-800 border border-gray-600 text-white rounded-lg px-4 py-3 pr-20 focus:border-blue-500 focus:outline-none transition-colors"
                          placeholder={`Enter ${info.label.toLowerCase()}`}
                        />
                        <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm">
                          {info.unit.split(' ')[0]}
                        </span>
                      </div>
                      
                      <div className="text-xs text-gray-400 space-y-1">
                        <div>Range: {info.range}</div>
                        <div className="text-green-400">Optimal: {info.optimal}</div>
                        <div>{info.description}</div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-red-500/20 border border-red-500/50 rounded-lg p-4 flex items-center space-x-2"
                >
                  <AlertCircle className="w-5 h-5 text-red-400" />
                  <span className="text-red-300">{error}</span>
                </motion.div>
              )}

              <motion.button
                type="submit"
                disabled={isLoading}
                whileHover={{ scale: isLoading ? 1 : 1.02 }}
                whileTap={{ scale: isLoading ? 1 : 0.98 }}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-4 px-8 rounded-lg font-semibold text-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {isLoading ? (
                  <>
                    <Loader className="w-5 h-5 animate-spin" />
                    <span>Analyzing...</span>
                  </>
                ) : (
                  <>
                    <TrendingUp className="w-5 h-5" />
                    <span>Predict Habitability</span>
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>

        {/* Results Panel */}
        <div className="lg:col-span-1">
          <AnimatePresence mode="wait">
            {prediction ? (
              <motion.div
                key="results"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.6 }}
                className="space-y-6"
              >
                {/* Main Score */}
                <div className="bg-black/30 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8">
                  <div className="text-center mb-6">
                    <h3 className="text-xl font-bold text-white mb-4">Habitability Score</h3>
                    
                    <div className="relative w-32 h-32 mx-auto mb-4">
                      <svg className="w-32 h-32 transform -rotate-90">
                        <circle
                          cx="64"
                          cy="64"
                          r="56"
                          stroke="currentColor"
                          strokeWidth="8"
                          fill="none"
                          className="text-gray-700"
                        />
                        <circle
                          cx="64"
                          cy="64"
                          r="56"
                          stroke="currentColor"
                          strokeWidth="8"
                          fill="none"
                          strokeDasharray={`${2 * Math.PI * 56}`}
                          strokeDashoffset={`${2 * Math.PI * 56 * (1 - prediction.habitabilityScore / 100)}`}
                          className={getScoreColor(prediction.habitabilityScore).replace('text-', 'text-')}
                          strokeLinecap="round"
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className={`text-3xl font-bold ${getScoreColor(prediction.habitabilityScore)}`}>
                          {prediction.habitabilityScore}%
                        </span>
                      </div>
                    </div>
                    
                    <div className={`text-lg font-semibold ${getScoreColor(prediction.habitabilityScore)} mb-2`}>
                      {prediction.classification}
                    </div>
                    
                    <div className="text-gray-400">
                      Confidence: {prediction.confidence}%
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <button
                      onClick={handleSave}
                      className={`flex-1 ${isSaved ? 'bg-green-600' : 'bg-blue-600 hover:bg-blue-700'} text-white py-2 px-4 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2`}
                    >
                      {isSaved ? (
                        <>
                          <CheckCircle className="w-4 h-4" />
                          <span>Saved</span>
                        </>
                      ) : (
                        <>
                          <Save className="w-4 h-4" />
                          <span>Save</span>
                        </>
                      )}
                    </button>
                    
                    <button className="bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded-lg font-medium transition-colors flex items-center justify-center">
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Factor Breakdown */}
                <div className="bg-black/30 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-white mb-4">Factor Analysis</h3>
                  
                  <div className="space-y-4">
                    {Object.entries(prediction.factors).map(([factor, data]) => (
                      <div key={factor} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-300 capitalize">{factor}</span>
                          <span className={`font-semibold ${getScoreColor(data.score)}`}>
                            {data.score}%
                          </span>
                        </div>
                        
                        <div className="w-full bg-gray-700 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full ${getScoreBg(data.score)}`}
                            style={{ width: `${data.score}%` }}
                          ></div>
                        </div>
                        
                        <div className="text-xs text-gray-400">
                          {data.description}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recommendations */}
                <div className="bg-black/30 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-white mb-4">Recommendations</h3>
                  
                  <ul className="space-y-2">
                    {prediction.recommendations.map((rec, index) => (
                      <li key={index} className="text-gray-300 text-sm flex items-start space-x-2">
                        <CheckCircle className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                        <span>{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Processing Info */}
                <div className="bg-black/30 backdrop-blur-sm border border-gray-700/50 rounded-xl p-4">
                  <div className="text-center text-gray-400 text-sm">
                    Processed in {prediction.processingTime}s
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="placeholder"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="bg-black/30 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8 text-center"
              >
                <Calculator className="w-16 h-16 text-gray-500 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-400 mb-2">Ready to Analyze</h3>
                <p className="text-gray-500">
                  Enter planetary parameters and click "Predict Habitability" to see results.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default PredictionForm; 