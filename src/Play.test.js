import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Play from "./Play";
import { BrowserRouter as Router } from "react-router-dom";
import { errorToast } from "./utils/toast";

jest.mock("./utils/toast");

const setIsActive = jest.fn();

test("should render Play component", () => {
  render(
    <Router>
      <Play isActive={true} setIsActive={setIsActive} />
    </Router>
  );

  const labelText = screen.getByLabelText("Answer:");
  expect(labelText).toBeInTheDocument();

  const initialAnagram = screen.getByRole("heading");
  expect(initialAnagram).toHaveTextContent("CAPTJARVIS");
});

test("should let user type answer in input field", () => {
  render(
    <Router>
      <Play isActive={true} setIsActive={setIsActive} />
    </Router>
  );

  userEvent.type(screen.getByRole("textbox"), "answer");
  expect(screen.getByRole("textbox")).toHaveValue("answer");
  userEvent.clear(screen.getByRole("textbox"));
});

test("should throw error if user submits empty string", () => {
  render(
    <Router>
      <Play isActive={true} setIsActive={setIsActive} />
    </Router>
  );

  userEvent.type(screen.getByRole("textbox"), " ");
  userEvent.click(screen.getByDisplayValue("Submit"));
  expect(errorToast).toHaveBeenCalledWith("Oops, didn't quite catch that!");
});

test("should restart game when user clicks 'Restart'", () => {
  render(
    <Router>
      <Play isActive={true} setIsActive={setIsActive} />
    </Router>
  );

  userEvent.click(screen.getByText("Restart"));
  expect(setIsActive).toHaveBeenCalledWith(false);
});
