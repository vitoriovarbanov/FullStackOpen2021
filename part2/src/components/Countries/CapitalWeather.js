import React, { useState, useEffect } from 'react'
import axios from 'axios'

const CapitalWeather = ({ capital }) => {
    const api_key = process.env.REACT_APP_API_KEY
    const [temperature, setTemperature] = useState('')
    const [icon, setIcon] = useState('')

    useEffect(() => {
        axios
            .get('http://api.weatherstack.com/current', {
                params: {
                    access_key: api_key,
                    query: capital
                }
            })
            .then(data => {
                setTemperature(data.data.current.temperature)
                setIcon(data.data.current.weather_icons[0])
                console.log(data)
            })
    }, [])




    return (
        <>
            <h1>Weather in {capital}</h1>
            <p>Temperature: {temperature} Celcius</p>
            <img alt='weather-icon' src={icon} style={{ width: "100px", height: "100px" }}></img>
        </>
    )
}

export default CapitalWeather