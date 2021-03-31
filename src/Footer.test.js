import { render, screen } from "@testing-library/react";
import Footer from "./Footer";

test("should render footer", () => {
  render(<Footer />);

  const twitterLink = screen.getByRole("link");
  expect(twitterLink.href).toBe("https://www.twitter.com/samueldjones");
});
