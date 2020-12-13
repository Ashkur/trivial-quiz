import React from 'react'
import './answer.scss'

function Answer ({ issue, userAnswer }) {
  const { question, correct_answer } = issue

  function setAnswerStatus () {
    const answer = userAnswer.find(answer => answer.question === question)

    if (correct_answer === answer.answer) {
      return 'answer--correct'
    }

    return 'answer--incorrect'
  }

  return (
    <li className={`answer ${setAnswerStatus()}`} >
      <p className="answer__correct-answer">{correct_answer}</p>
      <p className="answer__question" dangerouslySetInnerHTML={{ __html: question }}></p>
    </li >
  )
}

export default Answer