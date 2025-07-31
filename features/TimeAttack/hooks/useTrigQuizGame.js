import { useState, useEffect, useCallback } from 'react'

export function useTrigQuizGame({
  category,
  problems,
  results,
  addAnswerRecord,
  resetResults,
}) {
  const [selectedProblem, setSelectedProblem] = useState(null)
  const [questionIndex, setQuestionIndex] = useState(0)
  const [lastResult, setLastResult] = useState(null)

  const chooseRandomProblem = useCallback(() => {
    const filtered =
      category === '' ? problems : problems.filter(p => p.category === category)

    if (filtered.length > 0) {
      const randomIndex = Math.floor(Math.random() * filtered.length)
      setSelectedProblem(filtered[randomIndex])
    }
  }, [category, problems])

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
