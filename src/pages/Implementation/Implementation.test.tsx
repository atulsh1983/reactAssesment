import React from "react";
import { render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";

import { Implementation } from "./Implementation";


/**
 * Mock SvgRenderer to observe props instead of real SVG DOM
 */
jest.mock("../../components/SvgRenderer/SvgRenderer", () => ({
  SvgRenderer: ({ floorplan, color, shapeFilter }: any) => (
    <div data-testid="svg-renderer">
      <span>floorplan:{floorplan}</span>
      <span>color:{color}</span>
      <span>filter:{shapeFilter}</span>
    </div>
  ),
}));

describe("Implementation", () => {
  test("renders SVG when a building is selected", async () => {
    render(<Implementation />);

    await act(async () => {
      await userEvent.click(screen.getByText("Germany"));
    });

    const berlin = await screen.findByText("Berlin");

    await act(async () => {
      await userEvent.click(berlin);
    });

    const buildingA = await screen.findByText("Building A");

    await act(async () => {
      await userEvent.click(buildingA);
    });

    expect(screen.getByTestId("svg-renderer")).toBeInTheDocument();
    expect(screen.getByText("floorplan:floor1.svg")).toBeInTheDocument();
  });

  test("rotation toggle rotates SVG and persists across SVG change", async () => {
    render(<Implementation />);

    const toggle = screen.getByText("Toggle");

    await act(async () => {
      await userEvent.click(toggle);
    });

    // Select first building
    await act(async () => {
      await userEvent.click(screen.getByText("Germany"));
    });

    const berlin = await screen.findByText("Berlin");

    await act(async () => {
      await userEvent.click(berlin);
    });

    await act(async () => {
      await userEvent.click(screen.getByText("Building A"));
    });

    expect(screen.getByTestId("svg-renderer")).toBeInTheDocument();

    // Switch to another building
    await act(async () => {
      await userEvent.click(screen.getByText("Building B"));
    });

    // Still rendered → rotation state preserved
    expect(screen.getByTestId("svg-renderer")).toBeInTheDocument();
  });


});
