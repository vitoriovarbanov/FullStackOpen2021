import React from 'react';

const Statistics = ({ good, neutral, bad }) => {

    const calculateAverage = () => {
        let average = (good - bad) / (good + neutral + bad)
        if (Number.isNaN(average)) {
            average = 0
        }
        return average
    }

    const calculatePositive = () => {
        let positive = (good / (good + neutral + bad)) * 100
        if (Number.isNaN(positive)) {
            positive = 0
        }
        return positive
    }

    return (
        <>
            <tr>
                <td>
                    all {good + bad + neutral}
                </td>
            </tr>
            <tr>
                <td>
                    average {calculateAverage()}
                </td>
            </tr>
            <tr>
                <td>
                    positive {calculatePositive()}%
                </td>

            </tr>
        </>
    )
}

export default Statistics 