const INITIAL_STATE = {
  questions: [],
}

function questions (state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'SET_QUESTIONS':
      return {
        ...state,
        questions: action.payload
      }

    default:
      return state
  }
}

export default questions