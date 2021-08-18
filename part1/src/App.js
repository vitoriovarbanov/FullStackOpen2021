/* import React, { useState } from 'react';
import Button from './components/Button';
import Content from './components/Content';
import Statistics from './components/Statistics';

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const onFeedbackGiven = (gradeReceived) => {
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


  return (
    <>
      <h1>Give Feedback</h1>
      <Button onClick={() => setGood(good + 1)} text='good' />
      <Button onClick={() => setNeutral(neutral + 1)} text='neutral' />
      <Button onClick={() => setBad(bad + 1)} text='bad' />
      <h3>Statistics</h3>
      {
        good + neutral + bad === 0 ? 'No feedback given' :
          <>
            <table>
              <tbody>
                <Content text='good' count={good} />
                <Content text='neutral' count={neutral} />
                <Content text='bad' count={bad} />
                <Statistics good={good} neutral={neutral} bad={bad} />
              </tbody>
            </table>
          </>
      }

    </>
  );
} */


//ANECDOTES
import React, { useState } from 'react';


const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]

  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState({ 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 });

  let randomNumber = Math.random() * 6;

  const selectNum = () => {
    const handler = () => {
      setSelected(Number(randomNumber.toFixed(0)))
    }
    return handler
  }

  const updateVotes = () => {
    const handler = () => {
      const copy = { ...votes }
      console.log(copy)
      copy[selected] += 1
      console.log(copy)
      setVotes(copy)
    }
    return handler
  }

  const showBestAnecdote = () => {
    const votesArray = Object.values(votes)
    let maxVotes = Math.max(...votesArray)
    let index = votesArray.indexOf(maxVotes)
    return anecdotes[index]
  }


  return (
    <>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <p>has {votes[selected]} votes</p>
      <div>
        <button onClick={updateVotes()}>Vote</button>
        <button onClick={selectNum()}>Next Anecdote</button>
      </div>
      <h1>Anecdote with most votes</h1>
      <p>{showBestAnecdote()}</p>
    </>
  );
}

export default App;
