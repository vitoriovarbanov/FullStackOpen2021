import React, { useState } from 'react';
import Button from './components/Button';
import Content from './components/Content';

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  /* const onFeedbackGiven = (gradeReceived) => {
    const handler = () => {
      if (gradeReceived === 'good') {
        setGood(good + 1)
      } else if (gradeReceived === 'neutral') {
        setNeutral(neutral + 1)
      } else {
        setBad(bad + 1)
      }
    }

    return handler
  }
 */
  return (
    <>
      <h1>Give Feedback</h1>
      <Button onClick={() => setGood(good + 1)} text='good' />
      <Button onClick={() => setNeutral(neutral + 1)} text='neutral' />
      <Button onClick={() => setBad(bad + 1)} text='bad' />
      <h3>Statistics</h3>
      <Content text='good' count={good} />
      <Content text='neutral' count={neutral} />
      <Content text='bad' count={bad} />
    </>
  );
}

export default App;
