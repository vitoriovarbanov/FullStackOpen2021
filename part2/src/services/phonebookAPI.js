import axios from 'axios'

const base_url = 'http://localhost:3001/api/people'


const getAll = () => {
    const request = axios.get(base_url)
    return request.then(res => res.data)
}

const addPersonToPhonebook = (personObj) => {
    const request = axios.post(base_url, personObj)
    return request.then(res => res.data)
}

const deletePerson = (id) => {
    const request = axios.delete(`${base_url}/${id}`)
    return request.then(res => res.data)
}

const updateNumber = (id, newPersonObj) => {
    const request = axios.put(`${base_url}/${id}`, newPersonObj)
    return request.then(res => res.data)
}


export default { getAll, addPersonToPhonebook, deletePerson, updateNumber }