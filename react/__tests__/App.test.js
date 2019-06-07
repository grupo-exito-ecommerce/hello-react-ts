/* eslint-env jest */
import React from "react";
import { render } from "@vtex/test-tools/react";
import App from "../App";

test("should render the example in TypeScript", () => {
  const { getByText } = render(<App />);

  expect(getByText(/Welcome to React/)).toBeDefined();
});