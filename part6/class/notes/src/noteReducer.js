const noteReducer = (state = [], action) => {
    if (action.type === 'NEW_NOTE') {
        state.push(action.data)
        return state
    }

    return state
}

const generateId = () => {
    return Math.floor(Math.random() * 1000000)
}

export const createNote = (content) => {
    return {
        type: 'NEW_NOTE',
        data: {
            content,
            important: false,
            id: generateId()
        }
    }
}

export const toggleImportanceOf = (id) => {
    store.dispatch({
        type: 'TOGGLE_IMPORTANCE',
        data: { id }
    })
}

export default noteReducer