import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import GameOver from "./GameOver";
import { BrowserRouter as Router } from "react-router-dom";
import confetti from "./utils/gameCompletedConfetti";

jest.mock("./utils/gameCompletedConfetti");

const resetGame = jest.fn();
const setIsGameOver = jest.fn();

test("should render GameOver component with correct props", () => {
  render(
    <Router>
      <GameOver
        score={3}
        setIsGameOver={setIsGameOver}
        reset={resetGame}
        seconds={123}
      />
    </Router>
  );

  const gameOverMessage = screen.getByText("GAME OVER!");
  expect(gameOverMessage).toBeInTheDocument();

  const finalScore = screen.getByRole("heading", { level: 2 });
  expect(finalScore).toHaveTextContent("You completed 3 anagrams in 2m 3s");
});

test("should throw confetti when game is completed", () => {
  render(
    <Router>
      <GameOver
        score={15}
        setIsGameOver={setIsGameOver}
        reset={resetGame}
        seconds={123}
      />
    </Router>
  );

  const gameOverMessage = screen.getByText("GAME COMPLETED!");
  expect(gameOverMessage).toBeInTheDocument();

  expect(confetti).toHaveBeenCalled();
});

test("should reset game when user clicks 'Try again'", () => {
  render(
    <Router>
      <GameOver
        score={10}
        setIsGameOver={setIsGameOver}
        reset={resetGame}
        seconds={176}
      />
    </Router>
  );

  userEvent.click(screen.getByText("Try again"));
  expect(resetGame).toHaveBeenCalled();
  expect(setIsGameOver).toHaveBeenCalledWith(false);
});
