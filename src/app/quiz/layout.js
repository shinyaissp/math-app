import React from 'react';
import { QuizProvider } from './contexts/QuizContext';

export default function Layout({ children }) {
  return (
    <QuizProvider>
      {children}
    </QuizProvider>
  );
}
