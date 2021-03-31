import { render } from "@testing-library/react";
import Header from "./Header";

test("should render header", () => {
  const { container } = render(<Header />);

  expect(container).toHaveTextContent(/^CODE ANAGRAMS$/);
});
