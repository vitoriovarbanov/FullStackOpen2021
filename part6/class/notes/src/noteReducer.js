const initialState = {
    notes: [
        {
            content: 'reducer defines how redux store works',
            important: true,
            id: 1,
        },
        {
            content: 'state of store can contain any data',
            important: false,
            id: 2,
        }
    ],
    filter: 'IMPORTANT'
} 

const noteReducer = (state = initialState.notes, action) => {
    if (action.type === 'NEW_NOTE') {
        const newState = state.concat(action.data)
        return newState
    } else if (action.type === 'TOGGLE_IMPORTANCE') {
        const id = action.data.id
        const noteToChange = state.find(n => n.id === id)
        const changedNote = {
            ...noteToChange,
            important: !noteToChange.important
        }
        return state.map(note =>
            note.id !== id ? note : changedNote
        )
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
    return {
        type: 'TOGGLE_IMPORTANCE',
        data: {
            id
        }
    }
}

export default noteReducer