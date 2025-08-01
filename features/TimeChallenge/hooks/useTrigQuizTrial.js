import { useState, useEffect, useCallback, useMemo } from 'react'

export function useTrigQuizTrial({
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

  const filteredProblems = useMemo(() => {
    const categories = categoryKey === '' ? [] : categoryKey.split(',')

    return categories.length === 0
      ? problems.filter(p => p.category === '')
      : problems.filter(p => categories.includes(p.category))
  }, [categoryKey, problems])

  const answeredQuestions = useMemo(
    () => results.map(r => r.question),
    [results]
  )

  const notYetAsked = useMemo(
    () => filteredProblems.filter(p => !answeredQuestions.includes(p.question)),
    [filteredProblems, answeredQuestions]
  )

  const chooseRandomProblem = useCallback(() => {
    if (notYetAsked.length === 0) {
      setSelectedProblem(null)
      return
    }

    const randomIndex = Math.floor(Math.random() * notYetAsked.length)
    setSelectedProblem(notYetAsked[randomIndex])
  }, [notYetAsked])

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
    resetResults()
  }, [resetResults])

  useEffect(() => {
    chooseRandomProblem()
  }, [chooseRandomProblem])

  const correctCount = useMemo(() => results.filter(r => r.isCorrect).length, [results])

  return {
    selectedProblem,
    questionIndex,
    lastResult,
    correctCount,
    totalCount: filteredProblems.length,
    answeredCount: filteredProblems.length - notYetAsked.length,
    handleAnswer,
    retry,
  }
}
