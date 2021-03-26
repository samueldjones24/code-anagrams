import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
} from "react-share";
import formatTime from "./utils/formatTime";
import confetti from "./utils/gameCompletedConfetti";

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
    <div>
      <h1>
        You completed {props.score} {singularOrPluralAnagram} in{" "}
        {formatTime(props.seconds)}
      </h1>
      <h2>{displayGameOverMessage()}</h2>
      <div>
        <button
          className="button button--md button--red"
          onClick={() => {
            props.setIsGameOver(false);
            props.reset();
          }}
        >
          Try again
        </button>
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
    </div>
  );
}

export default GameOver;
