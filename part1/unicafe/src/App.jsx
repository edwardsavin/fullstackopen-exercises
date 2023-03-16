import { useState } from "react";

const Button = ({ handleClick, text }) => {
  return <button onClick={handleClick}>{text}</button>;
};

const StatisticLine = ({ text, votes }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{votes}</td>
    </tr>
  );
};

const Statistics = ({ goodVotes, neutralVotes, badVotes }) => {
  let totalVotes = goodVotes + neutralVotes + badVotes;
  let averageVotes =
    (goodVotes * 1 + neutralVotes * 0 + badVotes * -1) / totalVotes;
  let positiveVotes = (goodVotes / totalVotes) * 100 + "%";

  if (totalVotes === 0) {
    return <div>No feedback given</div>;
  }

  return (
    <table>
      <tbody>
        <StatisticLine text="good" votes={goodVotes}></StatisticLine>
        <StatisticLine text="neutral" votes={neutralVotes}></StatisticLine>
        <StatisticLine text="bad" votes={badVotes}></StatisticLine>
        <StatisticLine text="all" votes={totalVotes}></StatisticLine>
        <StatisticLine text="average" votes={averageVotes}></StatisticLine>
        <StatisticLine text="positive" votes={positiveVotes}></StatisticLine>
      </tbody>
    </table>
  );
};

const App = () => {
  // Save clicks of each button to its own state
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
