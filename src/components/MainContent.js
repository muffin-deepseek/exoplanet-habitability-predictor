import React from 'react';
import HabitabilityAnalysis from './HabitabilityAnalysis';
import ExploreDatabase from './ExploreDatabase';
import CalculateHabitability from './CalculateHabitability';
import ImageGeneration from './ImageGeneration';
import SavedExoPlanets from './SavedExoPlanets';

const MainContent = ({ activeSection }) => {
  const renderContent = () => {
    switch (activeSection) {
      case 'explore-database':
        return <ExploreDatabase />;
      case 'calculate-habitability':
        return <CalculateHabitability />;
      case 'image-generation':
        return <ImageGeneration />;
      case 'saved-exo-planets':
        return <SavedExoPlanets />;
      default:
        return <HabitabilityAnalysis />;
    }
  };

  return (
    <div className="flex-1 min-h-screen">
      {renderContent()}
    </div>
  );
};

export default MainContent; 