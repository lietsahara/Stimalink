import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Prediction } from '@/data/sampleData';

type UserRole = 'producer' | 'engineer' | 'supplier' | null;

interface AppContextType {
  userRole: UserRole;
  setUserRole: (role: UserRole) => void;
  currentPrediction: Prediction | null;
  setCurrentPrediction: (prediction: Prediction | null) => void;
  opportunities: Prediction[];
  addOpportunity: (prediction: Prediction) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [userRole, setUserRole] = useState<UserRole>(null);
  const [currentPrediction, setCurrentPrediction] = useState<Prediction | null>(null);
  const [opportunities, setOpportunities] = useState<Prediction[]>([]);

  const addOpportunity = (prediction: Prediction) => {
    setOpportunities(prev => [prediction, ...prev]);
  };

  return (
    <AppContext.Provider
      value={{
        userRole,
        setUserRole,
        currentPrediction,
        setCurrentPrediction,
        opportunities,
        addOpportunity,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};
