import React from 'react';

const Statistics = ({ good, neutral, bad }) => {
    /* console.log(good)
    console.log(neutral)
    console.log(bad) */

    const calculateAverage = () => {
        let average = (good - bad) / (good + neutral + bad)
        if (Number.isNaN(average)) {
            average = 0
        }
        return average
    }

    const calculatePositive = () => {
        let positive = (good/(good+neutral+bad))*100
        if (Number.isNaN(positive)) {
            positive = 0
        }
        return positive
    }

    return (
        <>
            <div>
                all {good + bad + neutral}
            </div>
            <div>
                average {calculateAverage()}
            </div>
            <div>
                positive {calculatePositive()}%
            </div>
        </>
    )
}

export default Statistics 