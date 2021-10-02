const filterReducer = (state = '', action) => {
    console.log(state)
    switch (action.type) {
        case 'FILTER_ANECDOTES':
            return action.term
        default:
            return state
    }
}

export const filterAction = (term) => {
    return{
        type: 'FILTER_ANECDOTES',
        term
    }
}


export default filterReducer