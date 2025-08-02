import React from 'react';
import { TrigQuizProvider } from './contexts/TrigQuizContext';

export default function Layout({ children }) {
  return (
    <TrigQuizProvider>
      {children}
    </TrigQuizProvider>
  );
}
