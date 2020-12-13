import React from "react"
import { useSelector, useDispatch } from 'react-redux'
import { Redirect, useHistory } from 'react-router-dom'
import './results.scss'

// components
import Answer from './components/answer/index.js'

function Results () {
  const history = useHistory()
  const dispatch = useDispatch()
  const questions = useSelector(state => state.questions.questions)
  const score = useSelector(state => state.statistics.score)
  const userAnswer = useSelector(state => state.statistics.answers)

  function renderResults () {
    return questions.map((question, index) => (
      <Answer
        key={`answer-${index}`}
        issue={question}
        index={index}
        userAnswer={userAnswer} />
    ))
  }

  function renderScoreIcon () {
    if (score <= 4) {
      // render egg
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="64.48" height="85.973" viewBox="0 0 64.48 85.973">
          <path id="egg-solid" d="M32.24,0C14.441,0,0,35.934,0,53.733a32.24,32.24,0,0,0,64.48,0C64.48,35.934,50.039,0,32.24,0Z" fill="#f9690e" />
        </svg>
      )
    } else if (score > 4 && score <= 7) {
      // render brain
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="96.719" height="85.973" viewBox="0 0 96.719 85.973">
          <path id="brain-solid" d="M34.926,0A10.715,10.715,0,0,0,24.549,8.094c-.134,0-.235-.034-.369-.034A10.757,10.757,0,0,0,13.433,18.807a9.9,9.9,0,0,0,.285,2.351A13.317,13.317,0,0,0,6.767,39.443,13.383,13.383,0,0,0,8.3,63.455a12.3,12.3,0,0,0-.235,2.368,12.082,12.082,0,0,0,12.09,12.09,11.384,11.384,0,0,0,2.015-.2,12.061,12.061,0,0,0,23.508-3.828V10.747A10.757,10.757,0,0,0,34.926,0ZM96.719,51.046a13.363,13.363,0,0,0-6.767-11.6,13.216,13.216,0,0,0,1.394-5.86A13.433,13.433,0,0,0,83,21.157,10.647,10.647,0,0,0,72.54,8.06c-.134,0-.252.034-.369.034a10.726,10.726,0,0,0-21.124,2.653V73.883a12.061,12.061,0,0,0,23.508,3.828,11.384,11.384,0,0,0,2.015.2,12.082,12.082,0,0,0,12.09-12.09,12.305,12.305,0,0,0-.235-2.368A13.433,13.433,0,0,0,96.719,51.046Z" fill="#f9690e" />
        </svg>
      )
    } else if (score > 7 && score <= 10) {
      // render crown
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="94.938" height="75.95" viewBox="0 0 94.938 75.95">
          <path id="crown-solid" d="M78.324,66.456H16.614a2.38,2.38,0,0,0-2.373,2.373v4.747a2.38,2.38,0,0,0,2.373,2.373h61.71A2.38,2.38,0,0,0,80.7,73.577V68.83A2.38,2.38,0,0,0,78.324,66.456Zm9.494-47.469a7.122,7.122,0,0,0-7.12,7.12,6.976,6.976,0,0,0,.653,2.937L70.61,35.483a4.741,4.741,0,0,1-6.557-1.721L51.964,12.609a7.12,7.12,0,1,0-8.989,0L30.884,33.762a4.744,4.744,0,0,1-6.557,1.721L13.6,29.045A7.118,7.118,0,1,0,7.12,33.228a7.271,7.271,0,0,0,1.142-.119l10.725,28.6H75.95l10.725-28.6a7.271,7.271,0,0,0,1.142.119,7.12,7.12,0,0,0,0-14.241Z" fill="#f9690e" />
        </svg>
      )
    }
  }

  function resetStore () {
    dispatch({
      type: 'SET_QUESTIONS',
      payload: []
    })

    dispatch({
      type: 'SET_SCORE',
      payload: 0
    })

    dispatch({
      type: 'SET_ANSWER',
      payload: []
    })
  }

  function restartGame () {
    resetStore()
    history.push('/')
  }

  function scrollToAnswers () {
    document.querySelector('#answer-list').scrollIntoView({
      behavior: 'smooth'
    })
  }

  if (questions.length) {
    return (
      <div className="results">
        <section className="results__score">
          <div>
            {renderScoreIcon()}
            <p>You scored</p>
            <p>{score}/{questions.length}</p>
            <p className="results__try-again" onClick={() => restartGame()}>TRY AGAIN?</p>
          </div>

          <button onClick={scrollToAnswers} className="results__answers-link">
            <p>Answers</p>
            <svg xmlns="http://www.w3.org/2000/svg" width="18.009" height="10.295" viewBox="0 0 18.009 10.295">
              <g id="Group_9" data-name="Group 9" transform="translate(-125.563 -541.814)">
                <path id="Path_1" data-name="Path 1" d="M2835.816,542.245l9.013,5.28,3.058-1.9,5.421-3.375" transform="translate(-2710)" fill="none" stroke="#f9690e" strokeWidth="1" />
                <path id="Path_2" data-name="Path 2" d="M2835.816,542.245l9.013,5.28,3.058-1.9,5.421-3.375" transform="translate(-2710 4)" fill="none" stroke="#f9690e" strokeWidth="1" />
              </g>
            </svg>
          </button>
        </section>

        <section className="results__answer-list" id="answer-list">
          <ul>
            {renderResults()}
          </ul>
        </section>
      </div>
    )
  } else {
    return <Redirect to="/" />
  }
}

export default Results
