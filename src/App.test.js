import { render } from "@testing-library/react";
import App from "./App";

test("should render", () => {
  const { container } = render(<App />);

  expect(container.firstChild).toHaveClass("app");
});
