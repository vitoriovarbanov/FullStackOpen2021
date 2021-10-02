import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { filterAction } from '../reducers/filterReducer'

const FilterForm = () => {
    const dispatch = useDispatch()

    const handleFilter = (e) =>{
        e.preventDefault()
        const searchTerm = e.target.value
        console.log(searchTerm)
        dispatch(filterAction(searchTerm))
    }

    return(
        <div>
            <form onChange={handleFilter}>
                <input name='filterAnecdotes'/>
            </form>
        </div>
    )
}


export default FilterForm