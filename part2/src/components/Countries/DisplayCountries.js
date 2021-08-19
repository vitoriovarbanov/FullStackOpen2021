import React from 'react'

const DisplayCountries = ({ countries }) => {
    const displayCountryDetails = () => {
        if (countries.length === 1) {
            return countries.map((country,index) =>
                <div key={index}>
                    <h1 key={country.alh1ha2Code}>{country.name}</h1>
                    <p>Capital: {country.capital}</p>
                    <p>Population: {country.capital}</p>
                    <h3>Languages</h3>
                    <ul>
                        {country.languages.map((lang,index) => {
                            return <li key={index}>{lang.name}</li>
                        })}
                    </ul>
                    <img src={country.flag} style={{ width: "100px", height: "100px" }}></img>
                </div>
            )
        } else {
            return countries.map((country,i) => <p key={i}>{country.name}</p>)
        }

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