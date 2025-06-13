import React from 'react';
import { motion } from 'framer-motion';
import { Play, Globe } from 'lucide-react';
import PredictionForm from './PredictionForm';

const CalculateHabitability = () => {
  return (
    <div className="flex-1 bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900 min-h-screen">
      <PredictionForm />
    </div>
  );
};

export default CalculateHabitability; 