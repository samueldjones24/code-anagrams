import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter as Router } from "react-router-dom";
import Intro from "./Intro";

const setIsActive = jest.fn();

test("should render Intro", () => {
  render(
    <Router>
      <Intro setIsActive={setIsActive} />
    </Router>
  );

  const introText = screen.getByText(
    "Complete all the anagrams before the time runs out!"
  );
  expect(introText).toBeInTheDocument();
});

test("should start game when user clicks on Start button", () => {
  render(
    <Router>
      <Intro setIsActive={setIsActive} />
    </Router>
  );

  userEvent.click(screen.getByText("Start"));
  expect(setIsActive).toHaveBeenCalledWith(true);
});
