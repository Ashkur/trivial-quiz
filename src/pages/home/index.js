import React, { useEffect, useState } from "react"
import { useDispatch } from 'react-redux'
import { useHistory } from "react-router-dom"
import './home.scss'

function Home () {
  const dispatch = useDispatch()
  const history = useHistory()
  const [isFetchingQuestions, setIsFetchingQuestions] = useState(false)
  const [shouldPulseButton, setShouldPulseButton] = useState(false)

  function renderButtonText () {
    if (isFetchingQuestions) {
      return 'Wait...'
    }

    return 'BEGIN'
  }

  function applyEnableClass () {
    if (!isFetchingQuestions) {
      return 'home__start-button--enabled'
    }

    return ""
  }

  function applyPulseAnimation () {
    if (shouldPulseButton) {
      return 'home__start-button--clicked'
    }

    return ""
  }

  function redirectToQuestions () {
    history.push('/questions')
  }

  function handleClick () {
    if (!shouldPulseButton) {
      setShouldPulseButton(true)

      setTimeout(() => {
        setShouldPulseButton(false)
        redirectToQuestions()
      }, 700)
    }
  }

  useEffect(() => {
    async function fetchQuestions () {

      setIsFetchingQuestions(true)
      const response = await fetch('https://opentdb.com/api.php?amount=10&difficulty=hard&type=boolean')
      const { results } = await response.json()

      dispatch({
        type: 'SET_QUESTIONS',
        payload: results
      })

      setTimeout(() => {
        setIsFetchingQuestions(false)
      }, 1000)
    }

    fetchQuestions()
  }, [dispatch])

  return (
    <div className="home">
      <h1 className="home__title">Welcome to the Trivia Challenge!</h1>

      <p className="home__presentation">
        You will be presented with 10 True or False questions
      </p>

      <button type="button" onClick={() => handleClick()} className={`home__start-button ${applyEnableClass()} ${applyPulseAnimation()}`}>
        {renderButtonText()}
      </button>
    </div>
  )
}

export default Home
