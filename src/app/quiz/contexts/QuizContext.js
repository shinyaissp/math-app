'use client';

import React, { createContext, useContext, useState } from 'react';

const QuizContext = createContext(null);

export const QuizProvider = ({ children }) => {
  const [correctCount, setCorrectCount] = useState([[],[]]);

  return (
    <QuizContext.Provider value={{ correctCount, setCorrectCount }}>
      {children}
    </QuizContext.Provider>
  );
};

export const useQuizContext = () => {
  const context = useContext(QuizContext);
  if (!context) {
    throw new Error('useQuizContext must be used within a QuizProvider');
  }
  return context;
};
