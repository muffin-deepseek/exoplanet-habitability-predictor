import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ExoplanetProvider } from './context/ExoplanetContext';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';
import NotificationSystem from './components/NotificationSystem';
import HabitabilityAnalysis from './components/HabitabilityAnalysis';

function App() {
  const [activeSection, setActiveSection] = useState('habitability-analysis');

  return (
    <ExoplanetProvider>
      <div className="App min-h-screen bg-black">
        <Header setActiveSection={setActiveSection} />
        <div className="flex">
          <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} />
          {activeSection === 'habitability-analysis' ? (
            <HabitabilityAnalysis setActiveSection={setActiveSection} />
          ) : (
            <MainContent activeSection={activeSection} />
          )}
        </div>
        <NotificationSystem />
      </div>
    </ExoplanetProvider>
  );
}

export default App; 