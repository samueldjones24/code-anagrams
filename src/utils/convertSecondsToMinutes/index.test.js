import formatTime from "./index.js";

test("should convert seconds to minutes", () => {
  expect(formatTime(90)).toBe("1m 30s");
  expect(formatTime(30)).toBe("30s");
  expect(formatTime(4728)).toBe("18m 48s");
});
