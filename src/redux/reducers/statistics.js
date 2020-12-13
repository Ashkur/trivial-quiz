const INITIAL_STATE = {
  score: 0,
  answers: [],
}

function statistics (state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'SET_SCORE':
      return {
        ...state,
        score: action.payload
      }

    case 'SET_ANSWER':
      return {
        ...state,
        answers: action.payload
      }

    default:
      return state
  }
}

export default statistics