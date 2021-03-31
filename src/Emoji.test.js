import { render, screen } from "@testing-library/react";
import Emoji from "./Emoji";

test.skip("should render emoji", () => {
  render(<Emoji symbol="🚀" label="rocket" />);

  const emoji = screen.getByRole("img");
  expect(emoji).toHaveTextContent("🚀");
});
