import ANAGRAMS from "./anagrams.json";
import { errorToast, successToast } from "./utils/toast";
import useLocalStorage from "./utils/useLocalStorage";
import Emoji from "./Emoji.js";
import formatTime from "./utils/formatTime";
import GameOver from "./GameOver";
import { Link } from "react-router-dom";
import useInterval from "./utils/useInterval";

function Play(props) {
  const initialAnagram = ANAGRAMS.anagrams[0].value;

  const { isActive, setIsActive } = props;
  const [anagram, setAnagram] = useLocalStorage("anagram", initialAnagram);
  const [level, setLevel] = useLocalStorage("level", 1);
  const [seconds, setSeconds] = useLocalStorage("seconds", 0);
  const [score, setScore] = useLocalStorage("score", 0);
  const [isGameOver, setIsGameOver] = useLocalStorage("isGameOver", false);

  useInterval(() => {
    if (isActive) {
      if (seconds === 300) {
        setIsActive(false);
        setIsGameOver(true);
      } else {
        setSeconds((curr) => curr + 1);
      }
    }
  }, 1000);

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

  const handleSubmit = (e) => {
    e.preventDefault();

    if (value === "") {
      errorToast("Oops, didn't quite catch that!");
      return;
    }

    const { answer } = ANAGRAMS.anagrams.find((a) => a.value === anagram);
    const answerIndex = ANAGRAMS.anagrams.findIndex((a) => a.answer === answer);
    const LAST_ANAGRAM_INDEX = 14;

    if (value.toUpperCase() === answer) {
      setScore(score + 1);
      if (answerIndex === LAST_ANAGRAM_INDEX) {
        setIsActive(false);
        setIsGameOver(true);
      } else {
        const successMessages = [
          "Nice!",
          "Great job!",
          "Well done!",
          "You're pretty good at this!",
          "Correct!",
          "Keep going!",
          "Hello, Anagram Master!",
          "Good work!",
        ];
        successToast(
          successMessages[Math.floor(Math.random() * successMessages.length)]
        );
        moveToNextAnagram();
      }
      reset();
    } else {
      setIsActive(false);
      setAnagram(initialAnagram);
      setIsGameOver(true);
    }
  };

  const time = formatTime(seconds);

  return (
    <>
      {isGameOver ? (
        <GameOver
          score={score}
          setIsGameOver={setIsGameOver}
          reset={resetGame}
          seconds={seconds}
        />
      ) : (
        <main>
          <div className="time">
            <span className="bold"> Level {level} | </span>
            <Emoji symbol="⏳" label="hourglass not done" /> {time}
          </div>
          <h1>{anagram}</h1>
          <form onSubmit={handleSubmit} className="input__container">
            <label htmlFor="input">Answer: </label>
            <input id="input" className="input-field" type="text" {...bind} />
            <input type="submit" value="Submit" className="button button--sm" />
          </form>
          <Link to="/">
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
          </Link>
        </main>
      )}
    </>
  );
}

export default Play;
