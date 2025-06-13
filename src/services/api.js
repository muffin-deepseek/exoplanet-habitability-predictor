// API Service for Exoplanet Habitability Prediction
class ExoplanetAPI {
  constructor() {
    // You can configure this to point to your actual backend URL
    this.baseURL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
    this.mockMode = process.env.REACT_APP_MOCK_MODE === 'true' || true; // Set to false when you have real backend
  }

  // Simulate ML model prediction (replace with actual API call)
  async predictHabitability(planetData) {
    if (this.mockMode) {
      return this.mockPrediction(planetData);
    }
    
    try {
      const response = await fetch(`${this.baseURL}/predict`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(planetData),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Prediction API error:', error);
      throw error;
    }
  }

  // Mock prediction for development/demo
  mockPrediction(planetData) {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Simulate ML model calculation based on input parameters
        const {
          planetRadius,
          orbitalPeriod,
          stellarMass,
          equilibriumTemp,
          eccentricity,
          stellarRadius
        } = planetData;

        // Simple habitability scoring algorithm (replace with your actual model)
        let habitabilityScore = 0;
        
        // Temperature score (optimal range: 200-350K)
        const tempScore = this.calculateTempScore(equilibriumTemp);
        
        // Size score (Earth-like planets: 0.8-1.5 Earth radii)
        const sizeScore = this.calculateSizeScore(planetRadius);
        
        // Orbital stability score
        const orbitalScore = this.calculateOrbitalScore(eccentricity, orbitalPeriod);
        
        // Stellar characteristics score
        const stellarScore = this.calculateStellarScore(stellarMass, stellarRadius);
        
        // Weighted average
        habitabilityScore = (tempScore * 0.4 + sizeScore * 0.25 + orbitalScore * 0.2 + stellarScore * 0.15) * 100;
        
        // Add some randomness for demo purposes
        habitabilityScore += (Math.random() - 0.5) * 10;
        habitabilityScore = Math.max(0, Math.min(100, habitabilityScore));
        
        const result = {
          habitabilityScore: Math.round(habitabilityScore * 10) / 10,
          confidence: Math.round((85 + Math.random() * 10) * 10) / 10,
          classification: this.getClassification(habitabilityScore),
          factors: {
            temperature: {
              score: Math.round(tempScore * 100),
              optimal: equilibriumTemp >= 273 && equilibriumTemp <= 323,
              description: this.getTempDescription(equilibriumTemp)
            },
            size: {
              score: Math.round(sizeScore * 100),
              optimal: planetRadius >= 0.8 && planetRadius <= 1.5,
              description: this.getSizeDescription(planetRadius)
            },
            orbital: {
              score: Math.round(orbitalScore * 100),
              stable: eccentricity < 0.3,
              description: this.getOrbitalDescription(eccentricity, orbitalPeriod)
            },
            stellar: {
              score: Math.round(stellarScore * 100),
              suitable: stellarMass >= 0.5 && stellarMass <= 1.5,
              description: this.getStellarDescription(stellarMass, stellarRadius)
            }
          },
          recommendations: this.generateRecommendations(planetData, habitabilityScore),
          processingTime: Math.round((0.5 + Math.random() * 2) * 100) / 100 // 0.5-2.5 seconds
        };
        
        resolve(result);
      }, 1000 + Math.random() * 2000); // Simulate processing time
    });
  }

  calculateTempScore(temp) {
    if (temp >= 273 && temp <= 323) return 1.0; // Perfect range (0-50°C)
    if (temp >= 250 && temp <= 373) return 0.8; // Good range
    if (temp >= 200 && temp <= 400) return 0.6; // Marginal
    if (temp >= 150 && temp <= 500) return 0.3; // Poor
    return 0.1; // Very poor
  }

  calculateSizeScore(radius) {
    if (radius >= 0.8 && radius <= 1.5) return 1.0; // Earth-like
    if (radius >= 0.5 && radius <= 2.0) return 0.7; // Close to Earth-like
    if (radius >= 0.3 && radius <= 3.0) return 0.4; // Marginal
    return 0.2; // Poor
  }

  calculateOrbitalScore(eccentricity, period) {
    let score = 1.0;
    
    // Eccentricity penalty
    if (eccentricity > 0.3) score *= 0.5;
    else if (eccentricity > 0.1) score *= 0.8;
    
    // Period consideration (habitable zone assumption)
    if (period < 10 || period > 1000) score *= 0.7;
    
    return score;
  }

  calculateStellarScore(mass, radius) {
    if (mass >= 0.5 && mass <= 1.5 && radius >= 0.7 && radius <= 1.3) return 1.0;
    if (mass >= 0.3 && mass <= 2.0) return 0.7;
    return 0.4;
  }

  getClassification(score) {
    if (score >= 80) return 'Prime Habitable';
    if (score >= 60) return 'Marginal Habitable';
    if (score >= 30) return 'Partially Habitable';
    return 'Non-Habitable';
  }

  getTempDescription(temp) {
    if (temp >= 273 && temp <= 323) return 'Optimal for liquid water';
    if (temp < 273) return 'Too cold - water likely frozen';
    if (temp > 373) return 'Too hot - water likely vaporized';
    return 'Marginal temperature range';
  }

  getSizeDescription(radius) {
    if (radius >= 0.8 && radius <= 1.5) return 'Earth-like size';
    if (radius < 0.8) return 'Smaller than Earth - thin atmosphere risk';
    return 'Larger than Earth - thick atmosphere likely';
  }

  getOrbitalDescription(eccentricity, period) {
    if (eccentricity < 0.1) return 'Stable circular orbit';
    if (eccentricity < 0.3) return 'Moderately elliptical orbit';
    return 'Highly elliptical - temperature variations';
  }

  getStellarDescription(mass, radius) {
    if (mass >= 0.5 && mass <= 1.5) return 'Sun-like star - stable energy output';
    if (mass < 0.5) return 'Red dwarf - potentially tidally locked';
    return 'Massive star - shorter lifetime';
  }

  generateRecommendations(planetData, score) {
    const recommendations = [];
    
    if (score >= 70) {
      recommendations.push('High priority target for atmospheric analysis');
      recommendations.push('Candidate for biosignature detection');
    } else if (score >= 40) {
      recommendations.push('Requires additional observational data');
      recommendations.push('Consider atmospheric modeling studies');
    } else {
      recommendations.push('Low priority for habitability studies');
      recommendations.push('May be suitable for comparative planetology');
    }
    
    return recommendations;
  }

  // Get exoplanet database (mock data)
  async getExoplanets(filters = {}) {
    if (this.mockMode) {
      return this.getMockExoplanets(filters);
    }
    
    try {
      const queryParams = new URLSearchParams(filters);
      const response = await fetch(`${this.baseURL}/exoplanets?${queryParams}`);
      return await response.json();
    } catch (error) {
      console.error('Database API error:', error);
      throw error;
    }
  }

  getMockExoplanets(filters) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const mockData = [
          {
            id: 1,
            name: 'Kepler-186f',
            habitability: 'High Habitability',
            habitabilityScore: 78.5,
            distance: '582 ly',
            mass: '1.2 ME',
            radius: '1.11 RE',
            orbitalPeriod: '129.9 days',
            equilibriumTemp: '188 K',
            discoveryYear: '2014',
            discoveryMethod: 'Transit',
            stellarType: 'M1V',
            source: 'NASA Exoplanet Archive'
          },
          {
            id: 2,
            name: 'Kepler-442b',
            habitability: 'Prime Habitable',
            habitabilityScore: 84.2,
            distance: '1120 ly',
            mass: '2.3 ME',
            radius: '1.34 RE',
            orbitalPeriod: '112.3 days',
            equilibriumTemp: '233 K',
            discoveryYear: '2015',
            discoveryMethod: 'Transit',
            stellarType: 'K5V',
            source: 'NASA Exoplanet Archive'
          },
          {
            id: 3,
            name: 'TOI-715 b',
            habitability: 'Marginal Habitable',
            habitabilityScore: 67.8,
            distance: '137 ly',
            mass: '3.02 ME',
            radius: '1.55 RE',
            orbitalPeriod: '19.3 days',
            equilibriumTemp: '280 K',
            discoveryYear: '2024',
            discoveryMethod: 'Transit',
            stellarType: 'M4V',
            source: 'NASA Exoplanet Archive'
          }
        ];

        // Apply filters
        let filteredData = mockData;
        
        if (filters.habitability) {
          filteredData = filteredData.filter(planet => 
            planet.habitability.toLowerCase().includes(filters.habitability.toLowerCase())
          );
        }
        
        if (filters.search) {
          filteredData = filteredData.filter(planet =>
            planet.name.toLowerCase().includes(filters.search.toLowerCase())
          );
        }

        resolve({
          planets: filteredData,
          totalCount: filteredData.length,
          filters: filters
        });
      }, 500);
    });
  }

  // Save exoplanet to user's collection
  async saveExoplanet(planetData) {
    // This would typically save to a database
    console.log('Saving exoplanet:', planetData);
    
    // For now, save to localStorage
    const savedPlanets = JSON.parse(localStorage.getItem('savedExoplanets') || '[]');
    const newPlanet = {
      ...planetData,
      savedAt: new Date().toISOString(),
      id: Date.now()
    };
    
    savedPlanets.push(newPlanet);
    localStorage.setItem('savedExoplanets', JSON.stringify(savedPlanets));
    
    return newPlanet;
  }

  // Get saved exoplanets
  async getSavedExoplanets() {
    return JSON.parse(localStorage.getItem('savedExoplanets') || '[]');
  }
}

// Export singleton instance
export const exoplanetAPI = new ExoplanetAPI();
export default exoplanetAPI; 