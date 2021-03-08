import React from "react";
import "./Timer.scss";

const Timer = (props) => {
  const { setIsActive, isActive, seconds } = props;

  function toggle() {
    setIsActive(!isActive);
  }

  return (
    <div>
      <div className="time">{seconds}s</div>
      <div className="row">
        <button
          type="button"
          className={`button button-${isActive ? "primary-active" : "primary"}`}
          onClick={toggle}
          disabled={isActive}
        >
          Start
        </button>
      </div>
    </div>
  );
};

export default Timer;
