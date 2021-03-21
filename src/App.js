import { useState, useEffect } from "react";
import "./App.scss";
import Input from "./Input.js";
import ANAGRAMS from "./anagrams.json";
import Timer from "./Timer.js";
import GameOver from "./GameOver.js";

function App() {
  const initialAnagram = ANAGRAMS.anagrams[0].value;

  const [anagram, setAnagram] = useState(initialAnagram);
  const [level, setLevel] = useState(1);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [score, setScore] = useState(1);
  const [isGameOver, setIsGameOver] = useState(false);

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setSeconds((seconds) => seconds + 1);
      }, 1000);
    } else if (!isActive && seconds !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, seconds]);

  function resetGame() {
    setAnagram(initialAnagram);
    setSeconds(0);
    setIsActive(false);
    setLevel(1);
    setScore(1);
  }

  function moveToNextAnagram() {
    const currentAnagramIndex = ANAGRAMS.anagrams.findIndex(
      (a) => a.value === anagram
    );
    const nextAnagramIndex = currentAnagramIndex + 1;

    if (Number(nextAnagramIndex) === Number(5)) {
      setLevel(2);
    } else if (Number(nextAnagramIndex) === Number(10)) {
      setLevel(3);
    }

    const nextAnagram = ANAGRAMS.anagrams[currentAnagramIndex + 1].value;
    setAnagram(nextAnagram);
  }

  const useInput = (initialValue) => {
    const [value, setValue] = useState(initialValue);

    return {
      value,
      setValue,
      reset: () => setValue(""),
      bind: {
        value,
        onChange: (event) => {
          setValue(event.target.value);
        },
      },
    };
  };

  const { value, bind, reset } = useInput("");

  return (
    <div className="App">
      <header className="App-header">
        <h1>Code Anagrams</h1>
      </header>

      {Boolean(!isActive && !isGameOver) && (
        <section>
          <h4>Complete all the anagrams as quickly as you can</h4>
          <p>3 levels - 15 anagrams </p>

          <p>
            A quick tip before you start: if the anagram consists of 2 words,
            the answer will also consist of 2 words.
          </p>
          <p>Good luck!</p>
        </section>
      )}

      <Timer seconds={seconds} setIsActive={setIsActive} isActive={isActive} />

      {Boolean(isGameOver) && (
        <main>
          <GameOver
            score={score}
            setIsGameOver={setIsGameOver}
            reset={resetGame}
            seconds={seconds}
          />
        </main>
      )}

      {Boolean(isActive) && (
        <main>
          <h3>Level {level}</h3>

          <h1>{anagram}</h1>
          <Input
            anagram={anagram}
            moveToNextAnagram={moveToNextAnagram}
            label="Answer"
            setGameOver={setIsGameOver}
            setScore={setScore}
            score={score}
            setIsActive={setIsActive}
            setAnagram={setAnagram}
            initialAnagram={initialAnagram}
            value={value}
            bind={bind}
            reset={reset}
          />
          <button
            className="button button-primary"
            onClick={() => {
              setAnagram(initialAnagram);
              resetGame();
              reset();
            }}
          >
            Restart
          </button>
        </main>
      )}

      <footer>
        <h6>built by Samuel Jones</h6>
      </footer>
    </div>
  );
}

export default App;
