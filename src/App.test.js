import React from "react";
import { render } from "@testing-library/react";
import App from "./App";

describe("Test App Component", () => {
  test("Login component has header", () => {
    const { getByText } = render(<App />);
    expect(getByText(/Super test form/i)).toBeInTheDocument();
  });
});
