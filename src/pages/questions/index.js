import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Redirect, useHistory } from "react-router-dom"
import './questions.scss'

function Questions () {
  const ANSWERS_TYPES = ["True", "False"]
  const TIMEOUT_DELAY = 200
  const history = useHistory()
  const dispatch = useDispatch()
  const answers = useSelector(state => state.statistics.answers)
  const questions = useSelector(state => state.questions.questions)
  const score = useSelector(state => state.statistics.score)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState(null)

  function storeAnswer (value) {
    const storedAnswers = [...answers]

    storedAnswers.push({
      question: questions[currentQuestion].question,
      answer: value
    })

    dispatch({
      type: 'SET_ANSWER',
      payload: storedAnswers
    })
  }

  function handleScore (answer) {
    if (questions[currentQuestion].correct_answer === answer) {
      dispatch({
        type: 'SET_SCORE',
        payload: score + 1
      })
    }
  }

  function setProgress () {
    setSelectedAnswer(null)
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    }
  }

  function redirectToResults () {
    if (questions.length === currentQuestion + 1) {
      history.push('/results')
    }
  }

  function handleChoice (event, answer) {
    const button = event.target

    fillSelectedButton(button)
    setSelectedAnswer(answer)
    storeAnswer(answer)
    handleScore(answer)
    redirectToResults()

    setTimeout(() => {
      setProgress()
    }, TIMEOUT_DELAY)
  }

  function fillSelectedButton (button) {
    button.classList.add("questions__answer--selected")
  }

  function removeFillColor () {
    const button = document.querySelector('.questions__answer--selected')
    if (button) {
      button.classList.remove("questions__answer--selected")
    }
  }

  function disableButton (type) {
    if (selectedAnswer && type !== selectedAnswer) {
      return "questions__answer--disabled"
    }

    return ""
  }

  useEffect(() => {
    const timeout = setTimeout(() => {
      removeFillColor()
    }, TIMEOUT_DELAY)

    return () => {
      clearTimeout(timeout)
    }
  }, [currentQuestion])

  if (questions.length) {
    return (
      <div className="questions">
        <h1 className="questions__title">{questions[currentQuestion].category}</h1>

        <section className="questions__issue">

          <p dangerouslySetInnerHTML={{ __html: questions[currentQuestion].question }}></p>
        </section>

        <section className="questions__buttons">
          <button
            className={`questions__answer ${disableButton(ANSWERS_TYPES[0])}`}
            onClick={(e) => handleChoice(e, ANSWERS_TYPES[0])}
          >
            True
          </button>
          <button
            className={`questions__answer ${disableButton(ANSWERS_TYPES[1])}`}
            onClick={(e) => handleChoice(e, ANSWERS_TYPES[1])}
          >
            False
          </button>
        </section>

        <section className="questions__progress">
          <p>{currentQuestion + 1} of {questions.length}</p>
        </section>
      </div >
    )
  } else {
    return <Redirect to="/" />
  }
}

export default Questions
