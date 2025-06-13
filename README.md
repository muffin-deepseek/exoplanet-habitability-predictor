# ExoPlanet Habitability Predictor

A sophisticated React web application for predicting exoplanet habitability using advanced machine learning algorithms and NASA research data. Features a modern UI matching Framer design templates with full ML model integration capabilities.

## 🚀 Features

### Core Functionality
- **Advanced ML Integration**: Ready-to-connect interface for your habitability prediction model
- **Real-time Predictions**: Interactive form with instant results and detailed analysis
- **Exoplanet Database**: Searchable database with filtering and sorting capabilities
- **Personal Collection**: Save and manage your exoplanet research
- **Smart Notifications**: Context-aware user feedback system

### UI/UX Excellence
- **Premium Design**: Matches high-end Framer template aesthetics
- **Dark Space Theme**: Professional astronomy-focused interface
- **Glass Morphism**: Modern backdrop blur effects and transparency
- **Smooth Animations**: Framer Motion powered micro-interactions
- **Responsive Layout**: Perfect on all devices and screen sizes

### Scientific Accuracy
- **NASA Data Integration**: Real exoplanet parameters and classifications
- **Peer-reviewed Research**: Based on Kopparapu et al. (2013) and Schulze-Makuch et al. (2011)
- **Comprehensive Analysis**: Multi-factor habitability scoring system
- **Research-grade Output**: Publication-ready results and recommendations

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn
- Your trained ML model (Python/Flask backend recommended)

### Quick Start

1. **Clone and Install**
   ```bash
   git clone <repository-url>
   cd exoplanet-habitability-predictor
   npm install
   ```

2. **Start Development Server**
   ```bash
   npm start
   ```

3. **Open Application**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🤖 ML Model Integration

### Current Setup
The application is configured with a mock ML model for development. To integrate your actual model:

### Option 1: Replace Mock API (Recommended)
1. **Update API Configuration**
   ```javascript
   // In src/services/api.js
   constructor() {
     this.baseURL = 'http://your-ml-backend-url:5000/api';
     this.mockMode = false; // Disable mock mode
   }
   ```

2. **Backend API Endpoints**
   Your ML backend should provide these endpoints:

   **POST /api/predict**
   ```json
   {
     "planetRadius": 1.0,
     "orbitalPeriod": 365,
     "stellarMass": 1.0,
     "equilibriumTemp": 288,
     "eccentricity": 0.1,
     "stellarRadius": 1.0
   }
   ```

   **Response Format:**
   ```json
   {
     "habitabilityScore": 78.5,
     "confidence": 89.2,
     "classification": "Prime Habitable",
     "factors": {
       "temperature": {
         "score": 85,
         "optimal": true,
         "description": "Optimal for liquid water"
       },
       "size": {
         "score": 90,
         "optimal": true,
         "description": "Earth-like size"
       },
       "orbital": {
         "score": 75,
         "stable": true,
         "description": "Stable circular orbit"
       },
       "stellar": {
         "score": 80,
         "suitable": true,
         "description": "Sun-like star - stable energy output"
       }
     },
     "recommendations": [
       "High priority target for atmospheric analysis",
       "Candidate for biosignature detection"
     ],
     "processingTime": 1.23
   }
   ```

### Option 2: Python Flask Backend Template

Create a simple Flask backend for your model:

```python
# app.py
from flask import Flask, request, jsonify
from flask_cors import CORS
import your_ml_model  # Your trained model

app = Flask(__name__)
CORS(app)  # Enable CORS for React app

@app.route('/api/predict', methods=['POST'])
def predict_habitability():
    try:
        data = request.json
        
        # Extract parameters
        planet_radius = data.get('planetRadius')
        orbital_period = data.get('orbitalPeriod')
        stellar_mass = data.get('stellarMass')
        equilibrium_temp = data.get('equilibriumTemp')
        eccentricity = data.get('eccentricity')
        stellar_radius = data.get('stellarRadius')
        
        # Run your ML model
        result = your_ml_model.predict([
            planet_radius, orbital_period, stellar_mass,
            equilibrium_temp, eccentricity, stellar_radius
        ])
        
        # Format response
        response = {
            'habitabilityScore': float(result.habitability_score),
            'confidence': float(result.confidence),
            'classification': result.classification,
            'factors': result.factor_breakdown,
            'recommendations': result.recommendations,
            'processingTime': result.processing_time
        }
        
        return jsonify(response)
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/exoplanets', methods=['GET'])
def get_exoplanets():
    # Return your exoplanet database
    # Implement filtering, searching, pagination
    pass

if __name__ == '__main__':
    app.run(debug=True, port=5000)
```

### Option 3: Direct Integration

Modify the mock prediction function in `src/services/api.js`:

```javascript
async mockPrediction(planetData) {
  // Replace this with your actual ML model logic
  // You can use TensorFlow.js, ONNX.js, or call your Python model
  
  const result = await yourMLModel.predict(planetData);
  return result;
}
```

## 📊 Application Structure

```
src/
├── components/
│   ├── Header.js              # Navigation header
│   ├── Sidebar.js             # Left navigation panel
│   ├── MainContent.js         # Content router
│   ├── HabitabilityAnalysis.js # Landing page
│   ├── ExploreDatabase.js     # Exoplanet database browser
│   ├── CalculateHabitability.js # Redirects to PredictionForm
│   ├── PredictionForm.js      # Main ML prediction interface
│   ├── SavedExoPlanets.js     # User's saved collection
│   ├── NotificationSystem.js  # Toast notifications
│   └── ...
├── services/
│   └── api.js                 # ML model API integration
├── context/
│   └── ExoplanetContext.js    # Global state management
├── App.js                     # Main application
└── index.js                   # Entry point
```

## 🎮 Usage Guide

### Making Predictions

1. **Navigate to Calculate Habitability** section
2. **Enter planetary parameters:**
   - Planet Radius (0.1 - 10.0 Earth radii)
   - Orbital Period (1 - 10,000 days)
   - Stellar Mass (0.1 - 5.0 solar masses)
   - Equilibrium Temperature (50 - 1,000 K)
   - Orbital Eccentricity (0.0 - 0.9)
   - Stellar Radius (0.1 - 5.0 solar radii)

3. **Use presets** for quick testing:
   - Earth (baseline comparison)
   - Kepler-186f (known habitable candidate)
   - Mars (marginal habitability)
   - Venus (non-habitable)

4. **Analyze results:**
   - Habitability score (0-100%)
   - Classification category
   - Factor breakdown
   - Research recommendations

### Exploring the Database

1. **Search** by exoplanet name
2. **Filter** by habitability categories
3. **Sort** by discovery date, distance, or habitability
4. **Save** interesting planets to your collection
5. **Export** data for research

### Managing Your Collection

1. **View saved planets** in your personal collection
2. **Search and sort** your saved data
3. **Export** your research collection
4. **Delete** outdated entries

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
# API Configuration
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_MOCK_MODE=false

# Application Settings
REACT_APP_VERSION=1.0.0
REACT_APP_ENVIRONMENT=development
```

### Customization Options

**Theme Colors** (in `tailwind.config.js`):
```javascript
colors: {
  primary: {
    50: '#eff6ff',
    500: '#3b82f6',
    900: '#1e3a8a',
  }
}
```

**Animation Settings** (in components):
```javascript
transition={{ duration: 0.8, delay: 0.2 }}
```

## 🧪 Testing Your ML Model

### Test Data Validation

Use these test cases to validate your model integration:

1. **Earth-like Planet** (Expected: High habitability)
   - Radius: 1.0 RE, Period: 365 days, Temperature: 288K

2. **Hot Jupiter** (Expected: Low habitability)
   - Radius: 11.0 RE, Period: 3 days, Temperature: 1000K

3. **Cold Super-Earth** (Expected: Marginal habitability)
   - Radius: 1.5 RE, Period: 1000 days, Temperature: 200K

### Performance Benchmarks

- **Prediction latency**: < 2 seconds
- **UI responsiveness**: < 100ms for interactions
- **Data loading**: < 1 second for database queries

## 📈 Advanced Features

### Real-time NASA API Integration

```javascript
// Future enhancement: Live NASA data
const NASA_API_KEY = 'your-nasa-api-key';
const NASA_ENDPOINT = 'https://exoplanetarchive.ipac.caltech.edu/TAP';
```

### Batch Processing

```javascript
// Process multiple planets simultaneously
const batchPredict = async (planetArray) => {
  const promises = planetArray.map(planet => 
    exoplanetAPI.predictHabitability(planet)
  );
  return await Promise.all(promises);
};
```

### Export Formats

- **JSON**: Full data structure
- **CSV**: Tabular format for analysis
- **PDF**: Research reports (future enhancement)

## 🚀 Deployment

### Production Build

```bash
npm run build
```

### Deploy to Vercel/Netlify

1. **Connect your repository**
2. **Set environment variables**
3. **Deploy automatically**

### Docker Deployment

```dockerfile
FROM node:16-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🌟 Acknowledgments

- **NASA Exoplanet Archive** for comprehensive datasets
- **Kepler Space Telescope Team** for groundbreaking discoveries
- **ESA Gaia Mission** for stellar characterization
- **Research Community** for peer-reviewed methodologies

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/your-repo/issues)
- **Discussions**: [GitHub Discussions](https://github.com/your-repo/discussions)
- **Email**: support@exoplanetai.com

---

**Ready to discover habitable worlds? Start exploring! 🌍✨** 