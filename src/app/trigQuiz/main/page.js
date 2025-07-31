'use client'

import React, { useState } from 'react'
import TimeAttack from '@/features/TimeAttack/TimeAttack'
import { useTrigQuizGame } from '@/features/TimeAttack/hooks/useTrigQuizGame'
import AnswerButtons from '../components/AnswerButton'
import { problemsDeg } from '../constants/problemsDeg'
import { useTrigQuizContext } from '../contexts/TrigQuizContext'

export default function Page() {
  const [isRunning, setIsRunning] = useState(false)
  const {
    results,
    addAnswerRecord,
    resetResults,
  } = useTrigQuizContext()

  const {
    selectedProblem,
    questionIndex,
    lastResult,
    correctCount,
    handleAnswer,
    retry,
  } = useTrigQuizGame({
    category: 'H1',
    problems: problemsDeg,
    results,
    addAnswerRecord,
    resetResults,
  })

  return (
    <TimeAttack
      title="三角比"
      duration={60000}
      backPath="/trigQuiz"
      resultPath="/trigQuiz/result"
      problem={selectedProblem ? selectedProblem.question : ''}
      lastResult={lastResult}
      correctCount={correctCount}
      questionNumber={questionIndex}
      onRunningChange={setIsRunning}
      onRetry={retry}
    >
      <AnswerButtons onSelect={handleAnswer} disabled={!isRunning} />
    </TimeAttack>
  )
}
