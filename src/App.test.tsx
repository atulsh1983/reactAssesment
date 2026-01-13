import React from "react";
import { render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";

import { App } from "./App";

/**
 * Mock child pages to isolate App tab logic
 */
jest.mock("./pages/Description/Description", () => ({
  Description: () => <div data-testid="description-page">Description Page</div>,
}));

jest.mock("./pages/Implementation/Implementation", () => () => (
  <div data-testid="implementation-page">Implementation Page</div>
));

describe("App", () => {
  test("renders Description tab by default", () => {
    render(<App />);

    expect(screen.getByTestId("description-page")).toBeInTheDocument();
    expect(
      screen.queryByTestId("implementation-page")
    ).not.toBeInTheDocument();
  });

  test("switches to Implementation tab on click", async () => {
    render(<App />);

    await act(async () => {
      await userEvent.click(screen.getByText("Implementation"));
    });

    expect(
      screen.getByTestId("implementation-page")
    ).toBeInTheDocument();
    expect(
      screen.queryByTestId("description-page")
    ).not.toBeInTheDocument();
  });

  test("switches back to Description tab", async () => {
    render(<App />);

    await act(async () => {
      await userEvent.click(screen.getByText("Implementation"));
      await userEvent.click(screen.getByText("Description"));
    });

    expect(screen.getByTestId("description-page")).toBeInTheDocument();
  });

  test("applies active class to the selected tab", async () => {
    render(<App />);

    const descriptionTab = screen.getByText("Description");
    const implementationTab = screen.getByText("Implementation");

    // Default state
    expect(descriptionTab).toHaveClass("active");
    expect(implementationTab).not.toHaveClass("active");

    await act(async () => {
      await userEvent.click(implementationTab);
    });

    expect(implementationTab).toHaveClass("active");
    expect(descriptionTab).not.toHaveClass("active");
  });
});
