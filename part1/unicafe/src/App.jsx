import { useState } from "react";

const Button = ({ handleClick, text }) => {
  return <button onClick={handleClick}>{text}</button>;
};

const Statistics = ({ goodVotes, neutralVotes, badVotes }) => {
  return (
    <div>
      <div>good {goodVotes}</div>
      <div>neutral {neutralVotes}</div>
      <div>bad {badVotes}</div>
    </div>
  );
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <h2>give feedback</h2>
      <Button handleClick={() => setGood(good + 1)} text="good"></Button>
      <Button
        handleClick={() => setNeutral(neutral + 1)}
        text="neutral"
      ></Button>
      <Button handleClick={() => setBad(bad + 1)} text="bad"></Button>
      <h2>statistics</h2>
      <Statistics
        goodVotes={good}
        neutralVotes={neutral}
        badVotes={bad}
      ></Statistics>
    </div>
  );
};

export default App;
