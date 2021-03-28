import Emoji from "./Emoji.js";
import React from "react";

const Intro = (props) => {
  const { setIsActive } = props;

  function toggle() {
    setIsActive(true);
  }

  return (
    <>
      <section className="intro animated margin-top">
        <h3>Complete all the anagrams before the time runs out!</h3>
        <div>
          <span className="font-size-xl bold">3</span> levels
          <span className="font-size-xl bold">
            {" "}
            <span className="divider">|</span> 15
          </span>{" "}
          anagrams
          <span className="font-size-xl bold">
            {" "}
            <span className="divider">|</span> 5
          </span>{" "}
          minutes
        </div>

        <button type="button" className="button button--lg" onClick={toggle}>
          Start
        </button>

        <div className="intro__tip">
          <div className="bold">
            Tip
            <Emoji symbol="💡" label="lightbulb" />
          </div>
          <div>If the anagram consists of 2 words, then so will the answer</div>
        </div>
      </section>
    </>
  );
};

export default Intro;
