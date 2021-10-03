import noteService from './services/notes'

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

const noteReducer = (state = [], action) => {
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
    } else if (action.type === 'INIT_NOTES') {
        return action.data
    }

    return state
}

/* const generateId = () => {
    return Math.floor(Math.random() * 1000000)
}
 */
export const initNotes = (notes) => {
    return async dispatch => {
        const notes = await noteService.getAll()
        dispatch({
            type: 'INIT_NOTES',
            data: notes
        })
    }
}

export const createNote = (data) => {
    return async dispatch => {
        const newNote = await noteService.createNew(data)
        dispatch({
            type: 'NEW_NOTE',
            data
        })
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