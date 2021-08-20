import React, { useState } from 'react'
import CapitalWeather from './CapitalWeather'

const CountryDetails = ({ country }) => {
    const [showResults, setShowResults] = useState(false)

    const Details = () => {
        return (
            <div>
                <h1 key={country.alh1ha2Code}>{country.name}</h1>
                <p>Capital: {country.capital}</p>
                <p>Population: {country.capital}</p>
                <h3>Languages</h3>
                <ul>
                    {country.languages.map((lang, index) => {
                        return <li key={index}>{lang.name}</li>
                    })}
                </ul>
                <img alt='country-flag' src={country.flag} style={{ width: "100px", height: "100px" }}></img>
                <div>
                    <CapitalWeather capital={country.capital} />
                </div>
            </div>
        )
    }


    return (
        <>
            <button onClick={()=>setShowResults(prevShowResults => !prevShowResults)}>
                {showResults ? 'Hide' : 'Show'}
            </button>
            {showResults ? <Details /> : ''}
        </>
    )
}

export default CountryDetails