import React from "react";

function App() {
  // state
  let [text, setText] = React.useState({ word: "" });
  let [timeRemaining, setTimeRemaining] = React.useState(30);
  let [isRunning, setIsrunning] = React.useState(false);
  let [words, setWords] = React.useState(0);

  // ref
  let inputRef = React.useRef();

  // saving value
  let typing = (e) => {
    let { name, value } = e.target;
    setText(() => ({ [name]: value }));
  };

  // eff
  React.useEffect(() => {
    if (timeRemaining > 0 && isRunning) {
      setTimeout(() => {
        setTimeRemaining((prev) => prev - 1);
      }, 1000);
    } else if (timeRemaining === 0) {
      End();
    }
  }, [timeRemaining, isRunning]);

  // game start
  let Start = () => {
    setIsrunning(true);
    setTimeRemaining(30);
    setText((prev) => ({ word: "" }));
    setWords(0);
    inputRef.current.disabled = false;
    inputRef.current.focus();
  };

  // game end
  let End = () => {
    setIsrunning(false);
    setWords(calculateWordCount(text.word));
  };

  // calculate Word
  function calculateWordCount(cal) {
    const wordsArr = cal.trim().split(" ");
    return wordsArr.filter((word) => word !== "").length;
  }

  // JSX

  return (
    <>
      <h1 className="title"> Speed Typing game </h1>
      <textarea
        name="speedInput"
        onChange={typing}
        value={text.word}
        name="word"
        disabled={!isRunning}
        ref={inputRef}
      />
      <h4 className="time">Time remaining : {timeRemaining}</h4>
      <button disabled={isRunning} onClick={Start}>
        START
      </button>
      <h4>{!isRunning && `Word count : ${words}`} </h4>
    </>
  );
}

export default App;
