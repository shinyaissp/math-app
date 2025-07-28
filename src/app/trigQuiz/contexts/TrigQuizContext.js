'use client';

import React, { createContext, useContext, useState } from 'react';

const TrigQuizContext = createContext(null);

export const TrigQuizProvider = ({ children }) => {
  const [results, setResults] = useState([]); // 各問題の回答記録

  return (
    <TrigQuizContext.Provider value={{ results, setResults }}>
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
