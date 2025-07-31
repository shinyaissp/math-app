'use client'

import React, { useState } from 'react'
import { useSearchParams } from 'next/navigation' 
import TimeAttack from '@/features/TimeAttack/TimeAttack'
import { useTrigQuizGame } from '@/features/TimeAttack/hooks/useTrigQuizGame'
import AnswerButtons from '../components/AnswersButton'
import { problemsDeg } from '../constants/problemsDeg'
import { useTrigQuizContext } from '../contexts/TrigQuizContext'
import { problemsRad } from '../constants/problemsRad'

export default function Page() {
  const searchParams = useSearchParams()
  const type = searchParams.get('type')
  const category = searchParams.get('category') || ''
  const problems = type === 'rad' ? problemsRad : problemsDeg
  const [isRunning, setIsRunning] = useState(false)
  const {results, addAnswerRecord, resetResults, } = useTrigQuizContext()
  const {
    selectedProblem,
    questionIndex,
    lastResult,
    correctCount,
    handleAnswer,
    retry,
  } = useTrigQuizGame({
    category: category.split(',').filter(Boolean),
    problems: problems,
    results,
    addAnswerRecord,
    resetResults,
  })

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
      onRetry={retry}
    >
      <AnswerButtons onSelect={handleAnswer} disabled={!isRunning} />
    </TimeAttack>
  )
}
