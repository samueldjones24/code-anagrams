import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
} from "react-share";
import formatTime from "./utils/formatTime";
import confetti from "./utils/gameCompletedConfetti";
import { Link } from "react-router-dom";

function GameOver(props) {
  const gameCompleted = props.score === 15;

  const displayGameOverMessage = () => {
    let message = "Great effort!";
    if (props.score < 5) {
      message = "Not a bad effort!";
    }

    if (props.score > 5 && props.score < 10) {
      message = "Well done, you're pretty good at this!";
    }

    if (props.score > 10 && props.score < 15) {
      message = "Fantastic effort!";
    }

    if (gameCompleted) {
      confetti();
      message = "Amazing! Congratulations, you answered all the anagrams!";
    }

    return message;
  };

  const singularOrPluralAnagram = props.score === 1 ? "anagram" : "anagrams";

  return (
    <main>
      <h1>{gameCompleted ? "GAME COMPLETED!" : "GAME OVER!"}</h1>
      <h2>
        You completed <span className="underline">{props.score}</span>{" "}
        {singularOrPluralAnagram} in{" "}
        <span className="underline">{formatTime(props.seconds)}</span>
      </h2>
      <h3>{displayGameOverMessage()}</h3>
      <div>
        <Link to="/">
          <button
            className="button button--md button--red"
            onClick={() => {
              props.setIsGameOver(false);
              props.reset();
            }}
          >
            Try again
          </button>
        </Link>
        <div>
          <p>or share your score with friends</p>
          <TwitterShareButton
            url="www.twitter.com" // change to site domain
            title={`Check out my score on Code Anagrams:

🔥 ${props.score} anagrams
⏱️ ${formatTime(props.seconds)}
            
Do you think you can do better?`}
            hashtags={["CodeAnagrams"]}
            className="social-share-button"
          >
            <TwitterIcon size={50} round={true} />
          </TwitterShareButton>
          <FacebookShareButton
            url="www.facebook.com" // change to site domain
            quote={`Check out my score on Code Anagrams:

🔥 ${props.score} anagrams
⏱️ ${formatTime(props.seconds)}
            
Do you think you can do better?`}
            className="social-share-button"
          >
            <FacebookIcon size={50} round={true} />
          </FacebookShareButton>
        </div>
      </div>
    </main>
  );
}

export default GameOver;
