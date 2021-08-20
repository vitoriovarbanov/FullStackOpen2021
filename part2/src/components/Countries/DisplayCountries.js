import React from 'react'
import CountryDetails from './CountryDetails'

const DisplayCountries = ({ countries }) => {
    const displayCountryDetails = () => {
        return countries.map((country, i) => <div key={i}>{country.name}<CountryDetails country={country} /></div>)

    }


    return (
        <>
            <div>{countries.length > 10 ?
                "Too many matches, specify another filter" :
                displayCountryDetails(countries)
            }
            </div>
        </>
    )
}

export default DisplayCountries