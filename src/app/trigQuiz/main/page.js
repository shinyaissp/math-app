'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import TimeAttackContainer from '@/components/TimeAttack/TimeAttackContainer'
import ProgressBar from '@/components/TimeAttack/ProgressBar'
import styles from './page.module.css'
import 'katex/dist/katex.min.css'
import { BlockMath } from 'react-katex'
import AnswerButtons from '../components/AnswerButton'
import { problemsDeg } from '../constants/problemsDeg'
import DefaultButton from '@/components/Button/DefaultButton'
import { useTrigQuizContext } from '../contexts/TrigQuizContext'

const countdownSteps = ['3', '2', '1', 'Start!']

function getRandomProblem(problems, excludeIds = []) {
  const filtered = problems.filter(p => !excludeIds.includes(p.id))
  if (filtered.length === 0) return null
  const index = Math.floor(Math.random() * filtered.length)
  return filtered[index]
}

export default function Page() {
  const [resetCount, setResetCount] = useState(0)
  const [stepIndex, setStepIndex] = useState(0)
  const [countdownFinished, setCountdownFinished] = useState(false)
  const [askedIds, setAskedIds] = useState([])
  const [currentProblem, setCurrentProblem] = useState(null)
  const [score, setScore] = useState(0)
  const [isTimeUp, setIsTimeUp] = useState(false)
  const [isFinished, setIsFinished] = useState(false)
  const router = useRouter()
  const { results, setResults } = useTrigQuizContext()

  useEffect(() => {
    resetAll()
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const resetAll = () => {
    setCountdownFinished(false)
    setStepIndex(0)
    setResetCount(prev => prev + 1)
    setAskedIds([])
    setCurrentProblem(null)
    setScore(0)
    setIsTimeUp(false)
    setIsFinished(false)
    setResults([])
  }

  const handleTimeUp = useCallback(() => {
    setIsTimeUp(true)
    setIsFinished(true)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setStepIndex(prev => {
        if (prev < countdownSteps.length - 1) {
          return prev + 1
        } else {
          clearInterval(interval)
          setTimeout(() => {
            setCountdownFinished(true)
            setCurrentProblem(getRandomProblem(problemsDeg))
          }, 400)
          return prev
        }
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [resetCount])

  const handleReset = () => {
    resetAll()
  }

  const handleSelect = (selectedAnswerId) => {
    if (!currentProblem) return

    const isCorrect = selectedAnswerId === currentProblem.correctAnswerId
    if (isCorrect) {
      setScore(prev => prev + 1)
    }

    setResults(prev => [
      ...prev,
      {
        id: currentProblem.id,
        question: currentProblem.question,
        selected: selectedAnswerId,
        correct: currentProblem.correctAnswerId,
        isCorrect,
      },
    ])

    setAskedIds(prev => {
      const newAsked = [...prev, currentProblem.id]
      const nextProblem = getRandomProblem(problemsDeg, newAsked)

      if (nextProblem) {
        setCurrentProblem(nextProblem)
        return newAsked
      } else {
        alert(`終了！正解数は${score + (isCorrect ? 1 : 0)}問です。`)
        resetAll()
        return []
      }
    })
  }

  return (
    <>
      <TimeAttackContainer
        title="三角比"
        stepIndex={stepIndex}
        countdownSteps={countdownSteps}
        countdownFinished={countdownFinished}
        isFinished={isFinished}
      >
        {countdownFinished && currentProblem && !isFinished && (
          <div className={styles.question}>
            <BlockMath math={currentProblem.question} />
          </div>
        )}
      </TimeAttackContainer>

      <div className={styles.ProgressBarWrapper}>
        {countdownFinished && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.1 }}
          >
            <ProgressBar duration={60000} onFinish={handleTimeUp} />
          </motion.div>
        )}
      </div>

      <AnswerButtons onSelect={handleSelect} disabled={!countdownFinished || isTimeUp} />

      <div className={styles.score}>
        正解数: {score} / {askedIds.length}
      </div>
      <div className={styles.buttonBox}>
        <DefaultButton onClick={() => router.push('/trigQuiz')}>戻る</DefaultButton>
        {countdownFinished && (
          <div className={styles.retryButtonWrapper}>
            <DefaultButton onClick={handleReset}>やり直し</DefaultButton>
          </div>
        )}
        {isTimeUp && (
          <div className={styles.resultButtonWrapper}>
            <DefaultButton onClick={() => router.push('/trigQuiz/result')}>
              結果を見る
            </DefaultButton>
          </div>
        )}
      </div>
    </>
  )
}
