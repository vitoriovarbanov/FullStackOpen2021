import React from 'react'
//import { useDispatch, useSelector } from 'react-redux'
import { connect } from 'react-redux'
import { filterAction } from '../reducers/filterReducer'

const FilterForm = (props) => {
    //const dispatch = useDispatch()

    const handleFilter = (e) => {
        e.preventDefault()
        const searchTerm = e.target.value
        console.log(searchTerm)
        props.filterAction(searchTerm)
    }

    return (
        <div>
            <form onChange={handleFilter}>
                <input name='filterAnecdotes' />
            </form>
        </div>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        filterAction: term => {
            dispatch(filterAction(term))
        },
    }
}

const ConnectedFilterForm = connect(null, mapDispatchToProps)(FilterForm)
export default ConnectedFilterForm