'use client'

import React, { createContext, useContext, useState, useCallback } from 'react'

const TrigQuizContext = createContext(null)

export const TrigQuizProvider = ({ children }) => {
  const [results, setResults] = useState([])
  const [trialTime, setTrialTime] = useState(null);

  const addAnswerRecord = (record) => {
    setResults(prev => [...prev, record])
  }

  const resetResults = useCallback(() => {
    setResults([])
    setTrialTime(null); 
  }, [])

  return (
    <TrigQuizContext.Provider value={{ results, addAnswerRecord, resetResults, trialTime, setTrialTime }}>
      {children}
    </TrigQuizContext.Provider>
  )
}

export const useTrigQuizContext = () => {
  const context = useContext(TrigQuizContext)
  if (!context) {
    throw new Error('useTrigQuizContext must be used within a TrigQuizProvider')
  }
  return context
}
