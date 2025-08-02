'use client'

import React, { useState } from 'react'
import { useSearchParams } from 'next/navigation' 
import TimeAttack from '@/features/TimeChallenge/TimeAttack'
import TimeTrial from '@/features/TimeChallenge/TimeTrial'
import { useTrigQuizAttack } from '@/features/TimeChallenge/hooks/useTrigQuizAttack'
import { useTrigQuizTrial } from '@/features/TimeChallenge/hooks/useTrigQuizTrial'
import AnswerButtons from '../components/AnswersButton'
import { problemsDeg } from '../constants/problemsDeg'
import { problemsRad } from '../constants/problemsRad'
import { useTrigQuizContext } from '../contexts/TrigQuizContext'

export default function Page() {
  const searchParams = useSearchParams()
  const question = searchParams.get('question')
  const type = searchParams.get('type')
  const category = searchParams.get('category') || ''
  const problems = type === 'rad' ? problemsRad : problemsDeg

  const [isRunning, setIsRunning] = useState(false)

  const { results, addAnswerRecord, resetResults, setTrialTime } = useTrigQuizContext()

  const hookAttack = useTrigQuizAttack({
    category: category.split(',').filter(Boolean),
    problems,
    results,
    addAnswerRecord,
    resetResults,
  })

  const hookTrial = useTrigQuizTrial({
    category: category.split(',').filter(Boolean),
    problems,
    results,
    addAnswerRecord,
    resetResults,
  })

  const selectedHook = question === 'attack' ? hookAttack : hookTrial
  const {
    selectedProblem,
    questionIndex,
    lastResult,
    correctCount,
    handleAnswer,
    retry,
    totalCount,
    answeredCount
  } = selectedHook

  const commonProps = {
    title: "三角比",
    backPath: "/trigQuiz",
    resultPath: "/trigRatioChallenge/result",
    problem: selectedProblem?.question ?? '',
    lastResult,
    correctCount,
    questionNumber: questionIndex,
    children: <AnswerButtons onSelect={handleAnswer} disabled={!isRunning} />
  }

  return question === 'attack' ? (
    <TimeAttack
      {...commonProps}
      duration={60000}
      onRunningChange={setIsRunning}
      onRetry={retry}
    />
  ) : (
    <TimeTrial
      {...commonProps}
      onRunningChange={setIsRunning}
      onRetry={retry}
      totalCount={totalCount}
      answeredCount={answeredCount}
      setTrialTime={setTrialTime}
    />
  )
}
