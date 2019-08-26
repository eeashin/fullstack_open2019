import React, { useState } from "react";
import ReactDOM from "react-dom";

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>;

const Statistics = ({ good, neutral, bad }) => {
  const Statistic = ({ text, value }) => {
    return (
      <tr>
        <td>{text}</td><td>{value}</td>
      </tr>
    );
  };

  if (good === 0 && neutral === 0 && bad === 0) {
    return <div>No feedback given</div>;
  }

  return (
    <table>
      <tbody>
        <Statistic text="good" value={good} />
        <Statistic text="neutral" value={neutral} />
        <Statistic text="bad" value={bad} />
        <Statistic value={good + bad + neutral} text="all" />
        <Statistic value={(good - bad) / (good + bad + neutral)}text="average"/>
        <Statistic value={(good / (good + bad + neutral)) * 100 + "%"}text="positive"/>
      </tbody>
    </table>
  );
};

const App = props => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleGoodClick = () => {
    setGood(good + 1);
  };

  const handleNeutralClick = () => {
    setNeutral(neutral + 1);
  };

  const handleBadClick = () => {
    setBad(bad + 1);
  };

  return (
    <div>
      <h3>give feedback</h3>
      <Button onClick={handleGoodClick} text="good" />
      <Button onClick={handleNeutralClick} text="neutral" />
      <Button onClick={handleBadClick} text="bad" />
      <h3>statistics</h3>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
