function GameOver(props) {
  const gameCompleted = props.score === 15;

  const displayGameOverMessage = () => {
    let message = "Great effort!";
    if (props.score < 5) {
      message = "You can do better. Give it another go!";
    }

    if (props.score > 5 && props.score < 10) {
      message = "Well done! You're pretty good at this.";
    }

    if (props.score > 10 && props.score < 15) {
      message = "Fantastic effort!";
    }

    if (gameCompleted) {
      message = "Amazing! Congratulations, you answered all the anagrams!";
    }

    return message;
  };

  return (
    <div>
      <section>
        <h1>
          You completed {props.score} anagrams in {props.seconds}s.
        </h1>
        <h2>{displayGameOverMessage()}</h2>
        <button
          className="button button-primary"
          onClick={() => {
            props.setIsGameOver(false);
            props.reset();
          }}
        >
          Try again
        </button>
      </section>
    </div>
  );
}

export default GameOver;
