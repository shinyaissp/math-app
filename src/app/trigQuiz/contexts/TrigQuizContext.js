'use client';

import React, { createContext, useContext, useState } from 'react';

const TrigQuizContext = createContext(null);

export const TrigQuizProvider = ({ children }) => {
  const [correctCount, setCorrectCount] = useState([[],[]]);

  return (
    <TrigQuizContext.Provider value={{ correctCount, setCorrectCount }}>
      {children}
    </TrigQuizContext.Provider>
  );
};

export const useTrigQuizContext = () => {
  const context = useContext(TrigQuizContext);
  if (!context) {
    throw new Error('useTrigQuizContext must be used within a TrigQuizProvider');
  }
  return context;
};
