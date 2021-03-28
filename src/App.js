import { useEffect } from "react";
import "./App.scss";
import Input from "./Input.js";
import ANAGRAMS from "./anagrams.json";
import Intro from "./Intro.js";
import GameOver from "./GameOver.js";
import Emoji from "./Emoji.js";
import formatTime from "./utils/formatTime/index.js";
import useLocalStorage from "./utils/useLocalStorage/index.js";

function App() {
  const initialAnagram = ANAGRAMS.anagrams[0].value;

  const [anagram, setAnagram] = useLocalStorage("anagram", initialAnagram);
  const [level, setLevel] = useLocalStorage("level", 1);
  const [seconds, setSeconds] = useLocalStorage("seconds", 0);
  const [isActive, setIsActive] = useLocalStorage("isActive", false);
  const [score, setScore] = useLocalStorage("score", 0);
  const [isGameOver, setIsGameOver] = useLocalStorage("isGameOver", false);

  useEffect(() => {
    let interval = null;
    if (isActive) {
      if (seconds === 300) {
        setIsActive(false);
        setIsGameOver(true);
      } else {
        interval = setInterval(() => {
          setSeconds((seconds) => seconds + 1);
        }, 1000);
      }
    } else if (!isActive && seconds !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, seconds, setIsActive, setIsGameOver, setSeconds]);

  const useInput = (initialValue) => {
    const [value, setValue] = useLocalStorage("value", initialValue);

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

  function resetGame() {
    setAnagram(initialAnagram);
    setSeconds(0);
    setIsActive(false);
    setLevel(1);
    setScore(0);
    reset();
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

  const letters = [
    "C",
    "O",
    "D",
    "E",
    " ",
    "A",
    "N",
    "A",
    "G",
    "R",
    "A",
    "M",
    "S",
  ];

  const time = formatTime(seconds);

  const copyRightYear = new Date().getFullYear();

  return (
    <div className="app">
      <header>
        <div>
          {letters.map((c, i) => {
            const style = { animationDelay: 0.5 + i / 10 + "s" };

            return (
              <span
                aria-hidden="true"
                key={i}
                style={style}
                className="animate-letter heading-primary"
              >
                {c}
              </span>
            );
          })}
        </div>
        {Boolean(isActive) && (
          <div className="time">
            <span className="bold"> Level {level} | </span>
            <Emoji symbol="⏳" label="hourglass not done" /> {time}
          </div>
        )}
      </header>

      {Boolean(!isActive && !isGameOver) && (
        <Intro setIsActive={setIsActive} isActive={isActive} />
      )}

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
            className="button button--sm button--red"
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

      <footer className="animated">
        <h6>
          built with <Emoji symbol="☕" label="coffee" /> by{" "}
          <a
            href="https://www.twitter.com/samueldjones"
            target="_blank"
            rel="noopener noreferrer"
            className="footer__link"
          >
            Samuel Jones
          </a>{" "}
          <br />
          <br />
          Copyright &#169; {copyRightYear}
        </h6>
      </footer>
    </div>
  );
}

export default App;
