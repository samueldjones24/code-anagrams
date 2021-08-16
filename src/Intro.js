import Emoji from "./Emoji.js";
import React from "react";
import { Link } from "react-router-dom";

const Intro = (props) => {
  const { setIsActive } = props;

  return (
    <>
      <main className="intro animated margin-top-md">
        <div className="intro__info">
          <div>
            <span className="intro__info__text bold">3</span> levels
          </div>
          <div>
            <span className="intro__info__text bold divider">|</span>
          </div>
          <div>
            <span className="intro__info__text bold">15 </span>
            anagrams
          </div>
          <div>
            {" "}
            <span className="intro__info__text bold divider">|</span>{" "}
          </div>
          <div>
            <span className="intro__info__text bold">5</span> minutes
          </div>
        </div>

        <Link to="/play">
          <button
            type="button"
            className="button button--lg"
            onClick={() => setIsActive(true)}
          >
            Play
          </button>
        </Link>

        <div className="intro__mission">
          <p>
            Put your software development knowledge to the test by completing a
            series of anagrams before the time runs out!
          </p>
        </div>

        <div className="intro__tip margin-top-md">
          <div className="bold">
            Tip
            <Emoji symbol="💡" label="lightbulb" />
          </div>
          <div>If the anagram consists of 2 words, then so will the answer</div>
        </div>
      </main>
    </>
  );
};

export default Intro;
