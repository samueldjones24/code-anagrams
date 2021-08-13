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
        <div className="intro__mission">
          <p>
            Do you know software development? Then, you'll have come across the
            jumbled words in this game before. <br />
            <br />
            To really show off your programming knowledge,{" "}
            <span className="underline">
              complete all the anagrams before the time runs out!
            </span>
          </p>
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

        <div className="intro__tip">
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
