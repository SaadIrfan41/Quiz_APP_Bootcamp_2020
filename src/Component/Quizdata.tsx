import useAxios from 'axios-hooks'
import React, { useState } from 'react'

const QuizApp = ({ category }: any) => {
  const [score, setScore] = useState<number>(0)
  const [currentquestion, setcurrentquestion] = useState<number>(0)
  const [showScore, setShowScore] = useState(false)
  console.log(category)

  const [{ data, loading, error }] = useAxios(
    `https://opentdb.com/api.php?amount=10&difficulty=easy&category=${category}&type=multiple`
  )
  if (loading) return <h1>Loading...</h1>
  if (error) return <h1>Error!</h1>

  const handleAnswerOptionClick = (isCorrect: string) => {
    if (isCorrect === data.results[currentquestion].correct_answer) {
      setScore(score + 1)
    }

    const nextQuestion = currentquestion + 1
    if (nextQuestion < data.results.length) {
      setcurrentquestion(nextQuestion)
    } else {
      setShowScore(true)
    }
  }

  function decodestring(str: string) {
    const text = document.createElement('textarea')
    text.innerHTML = str
    return text.value
  }
  const optionlist = () => {
    const Options = data.results[currentquestion].incorrect_answers
    Options.push(data.results[currentquestion].correct_answer)
    Options.sort(() => Math.random() - 0.5)
    return Options
  }

  const options = optionlist()

  return (
    <>
      <div className='app'>
        {showScore ? (
          <div className='score-section'>
            You scored {score} out of {data.results.length}
          </div>
        ) : (
          <>
            <div className='question-section'>
              <div className='question-count'>
                <span>Question {currentquestion + 1}</span>/
                {data.results.length}
              </div>
              <div className='question-text'>
                {decodestring(data.results[currentquestion].question)}
              </div>
            </div>
            <div className='answer-section'>
              <button onClick={() => handleAnswerOptionClick(options[0])}>
                {options[0]}
              </button>
              <button onClick={() => handleAnswerOptionClick(options[1])}>
                {options[1]}
              </button>
              <button onClick={() => handleAnswerOptionClick(options[2])}>
                {options[2]}
              </button>
              <button onClick={() => handleAnswerOptionClick(options[3])}>
                {options[3]}
              </button>
            </div>
          </>
        )}
      </div>
      <button className='restart' onClick={() => window.location.reload(false)}>
        Play Again
      </button>
    </>
  )
}

export default QuizApp
