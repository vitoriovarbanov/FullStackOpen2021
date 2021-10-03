import React from 'react';
//import { useDispatch } from 'react-redux'
import { connect } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { createNotification, removeNotification } from '../reducers/notificationReducer';

const AnecdoteForm = (props) => {
    //const dispatch = useDispatch()

    const handleSubmit = async (e) => {
        e.preventDefault()
        const content = e.target.anecdote.value
        e.target.anecdote.value = ''
        console.log(content)
        props.createAnecdote(content)
        const message = 'You have created a new entry!';
        props.createNotification(message, 5000)
        /* setTimeout(()=>{
            dispatch(removeNotification())
        },5000) */
    }


    return (
        <>
            <h2>create new</h2>
            <form onSubmit={handleSubmit}>
                <input name="anecdote" />
                <button type="submit">create</button>
            </form>
        </>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        createAnecdote: data => {
            dispatch(createAnecdote(data))
        },
        createNotification: message => {
            dispatch(createNotification(message))
        }
    }
}

const ConnectedAnecdoteFrom = connect(null, mapDispatchToProps)(AnecdoteForm)
export default ConnectedAnecdoteFrom
