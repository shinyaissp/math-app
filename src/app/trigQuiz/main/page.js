'use client'

import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation' 
import TimeAttack from '@/features/TimeChallenge/TimeAttack'
import TimeTrial from '@/features/TimeChallenge/TimeTrial'
import { useTrigQuizAttack } from '@/features/TimeChallenge/hooks/useTrigQuizAttack'
import { useTrigQuizTrial } from '@/features/TimeChallenge/hooks/useTrigQuizTrial'
import AnswerButtons from '../components/AnswersButton'
import { problemsDeg } from '../constants/problemsDeg'
import { useTrigQuizContext } from '../contexts/TrigQuizContext'
import { problemsRad } from '../constants/problemsRad'

export default function Page() {
  const searchParams = useSearchParams()
  const question = searchParams.get('question')
  const type = searchParams.get('type')
  const category = searchParams.get('category') || ''
  const problems = type === 'rad' ? problemsRad : problemsDeg
  const [isRunning, setIsRunning] = useState(false)

  const [startTime, setStartTime] = useState(null)
  const [elapsedTime, setElapsedTime] = useState(null)

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

  const {
    selectedProblem,
    questionIndex,
    lastResult,
    correctCount,
    handleAnswer,
    retry,
    totalCount,
    answeredCount
  } = question === 'attack' ? hookAttack : hookTrial

  useEffect(() => {
    if (
      question === 'trial' &&
      isRunning &&
      answeredCount === totalCount &&
      startTime !== null
    ) {
      const end = Date.now()
      const durationSec = (end - startTime) / 1000
      setElapsedTime(durationSec)
      setTrialTime(durationSec) 
    }
  }, [isRunning, answeredCount, totalCount, question, startTime, setTrialTime])

  return question === 'attack' ? (
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
  ) : (
    <TimeTrial
      title="三角比"
      backPath="/trigQuiz"
      resultPath="/trigQuiz/result"
      problem={selectedProblem ? selectedProblem.question : ''}
      lastResult={lastResult}
      correctCount={correctCount}
      questionNumber={questionIndex}
      onRunningChange={(running) => {
        setIsRunning(running)
        if (running && startTime === null) {
          setStartTime(Date.now())
        }
      }}
      onRetry={() => {
        retry()
        setStartTime(null)
        setElapsedTime(null)
      }}
      totalCount={totalCount}
      answeredCount={answeredCount}
    >
      <AnswerButtons onSelect={handleAnswer} disabled={!isRunning} />
    </TimeTrial>
  )
}
