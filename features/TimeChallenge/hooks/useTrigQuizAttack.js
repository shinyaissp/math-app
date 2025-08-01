import { useState, useEffect, useCallback } from 'react'

export function useTrigQuizAttack({
  category,
  problems,
  results,
  addAnswerRecord,
  resetResults,
}) {
  
  const [selectedProblem, setSelectedProblem] = useState(null)
  const [questionIndex, setQuestionIndex] = useState(0)
  const [lastResult, setLastResult] = useState(null)

  const categoryKey = category.join(',')

  const chooseRandomProblem = useCallback(() => {
    const categories = categoryKey === '' ? [] : categoryKey.split(',')

    const filtered =
      categories.length === 0
        ? problems.filter(p => p.category === '')
        : problems.filter(p => categories.includes(p.category))

    if (filtered.length > 0) {
      const randomIndex = Math.floor(Math.random() * filtered.length)
      setSelectedProblem(filtered[randomIndex])
    }
  }, [categoryKey, problems])

  const handleAnswer = useCallback(
    (selectedAnswerId) => {
      if (!selectedProblem) return

      const isCorrect = selectedAnswerId === selectedProblem.correctAnswerId

      const answerRecord = {
        questionNumber: questionIndex + 1,
        question: selectedProblem.question,
        correctAnswerId: selectedProblem.correctAnswerId,
        selectedAnswerId,
        isCorrect,
      }

      addAnswerRecord(answerRecord)
      setLastResult(answerRecord)
      setQuestionIndex(prev => prev + 1)
      chooseRandomProblem()
    },
    [selectedProblem, questionIndex, addAnswerRecord, chooseRandomProblem]
  )

  const retry = useCallback(() => {
    resetResults()
    setQuestionIndex(0)
    setLastResult(null)
    chooseRandomProblem()
  }, [resetResults, chooseRandomProblem])

  
  useEffect(() => {
    chooseRandomProblem()
    resetResults()
  }, [chooseRandomProblem, resetResults])

  const correctCount = results.filter(r => r.isCorrect).length

  return {
    selectedProblem,
    questionIndex,
    lastResult,
    correctCount,
    handleAnswer,
    retry,
  }
}