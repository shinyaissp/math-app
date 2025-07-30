'use client'

import React, { useState, useEffect } from 'react'
import TimeAttack from '@/features/TimeAttack/TimeAttack'
import AnswerButtons from '../components/AnswerButton'
import { problemsDeg } from '../constants/problemsDeg'
import { useTrigQuizContext } from '../contexts/TrigQuizContext'

export default function Page() {
  const [selectedProblem, setSelectedProblem] = useState(null)
  const [questionIndex, setQuestionIndex] = useState(0)
  const [lastResult, setLastResult] = useState(null)
  const [isRunning, setIsRunning] = useState(false)
  const { results, addAnswerRecord, resetResults } = useTrigQuizContext()
  
  const chooseRandomProblem = () => {
    const filtered = problemsDeg.filter(p => p.category === 'H1')
    if (filtered.length > 0) {
      const randomIndex = Math.floor(Math.random() * filtered.length)
      setSelectedProblem(filtered[randomIndex])
    }
  }

  useEffect(() => {
    chooseRandomProblem()
    resetResults()
  }, [resetResults])

  const handleAnswer = (selectedAnswerId) => {
    if (!selectedProblem) return

    const isCorrect = selectedAnswerId === selectedProblem.correctAnswerId

    const answerRecord = {
      questionNumber: questionIndex + 1, // 表示用は +1
      question: selectedProblem.question,
      correctAnswerId: selectedProblem.correctAnswerId,
      selectedAnswerId,
      isCorrect,
    }

    addAnswerRecord(answerRecord)
    setLastResult(answerRecord)
    setQuestionIndex(prev => prev + 1) // 問題カウントアップ
    chooseRandomProblem()
  }
  
  const correctCount = results.filter((r) => r.isCorrect).length

  return (
    <TimeAttack
      title="三角比"
      duration={6000}
      backPath="/trigQuiz"
      resultPath="/trigQuiz/result"
      problem={selectedProblem ? selectedProblem.question : ''}
      lastResult={lastResult}
      correctCount={correctCount}
      questionNumber={questionIndex}
      onRunningChange={setIsRunning}
      onRetry={() => {
        resetResults();
        setQuestionIndex(0);
        setLastResult(null);
        chooseRandomProblem();
      }}
    >
      <AnswerButtons onSelect={handleAnswer} disabled={!isRunning} />
    </TimeAttack>
  )
}
