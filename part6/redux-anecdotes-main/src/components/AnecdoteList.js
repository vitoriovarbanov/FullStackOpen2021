import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { voteForAnecdote } from '../reducers/anecdoteReducer'
import { createNotification, removeNotification } from '../reducers/notificationReducer';


const AnecdoteList = () => {
    const anecdotes = useSelector(state => state.anecdotes)
    const term = useSelector(state => state.term)
    const dispatch = useDispatch()

    const getFilteredItems = () => {
        if (anecdotes) {
            const filtered = anecdotes.filter(x => x.content.includes(term))
            return (
                filtered.map(anecdote =>
                    <div key={anecdote.id}>
                        <div>
                            {anecdote.content}
                        </div>
                        <div>
                            has {anecdote.votes}
                            <button onClick={() => vote(anecdote.id)}>vote</button>
                        </div>
                    </div>
                )
            )
        }
    }

    const vote = (id) => {
        //console.log('vote', id)
        dispatch(voteForAnecdote(id))
        const votedAnecdote = anecdotes.find(x => x.id === id)
        const message = `You voted for: ${votedAnecdote.content}`
        dispatch(createNotification(message, 3000))
        /* setTimeout(() => {
            dispatch(removeNotification())
        }, 5000) */
    }

    return (
        <div>
            {getFilteredItems()}
        </div>
    )

}

export default AnecdoteList