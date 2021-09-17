const initialState = {
  good: 0,
  ok: 0,
  bad: 0
}

const counterReducer = (state = initialState, action) => {
  console.log(action)
  switch (action.type) {
    case 'GOOD':
      const good = state.good + 1;
      const goodState = {...state, good}
      return goodState
    case 'OK':
      const ok = state.ok + 1;
      const okState = {...state, ok}
      return okState
    case 'BAD':
      const bad = state.bad + 1;
      const badState = {...state, bad}
      return badState
    case 'ZERO':
      return initialState
    default: return state
  }
  
}

export default counterReducer