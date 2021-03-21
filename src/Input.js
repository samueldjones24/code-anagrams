import ANAGRAMS from "./anagrams.json";
import "./Input.scss";
import { errorToast, successToast } from "./utils/toast/index.js";

function Input(props) {
  const handleSubmit = (e) => {
    e.preventDefault();

    if (props.value === "") {
      errorToast("Oops, didn't quite catch that!");
      return;
    }

    const { answer } = ANAGRAMS.anagrams.find((a) => a.value === props.anagram);
    const answerIndex = ANAGRAMS.anagrams.findIndex((a) => a.answer === answer);
    const LAST_ANAGRAM_INDEX = 14;

    if (props.value.toUpperCase() === answer) {
      if (answerIndex === LAST_ANAGRAM_INDEX) {
        props.setIsActive(false);
        props.setGameOver(true);
      } else {
        const successMessages = [
          "Nice!",
          "Great job!",
          "Well done!",
          "You're pretty good at this!",
        ];
        successToast(
          successMessages[Math.floor(Math.random() * successMessages.length)]
        );
        props.setScore(props.score + 1);
        props.moveToNextAnagram();
      }
      props.reset();
    } else {
      props.setIsActive(false);
      props.setAnagram(props.initialAnagram);
      props.setGameOver(true);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        {props.label}:
        <input className="input" type="text" {...props.bind} />
      </label>
      <input type="submit" value="Submit" className="button button-primary" />
    </form>
  );
}

export default Input;
