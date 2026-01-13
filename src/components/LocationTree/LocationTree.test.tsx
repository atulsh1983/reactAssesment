import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";

import { LocationTree } from "./LocationTree";

describe("LocationTree", () => {
  test("renders top-level countries", () => {
    render(<LocationTree onSelectFloorplan={jest.fn()} />);

    expect(screen.getByText("Germany")).toBeInTheDocument();
    expect(screen.getByText("France")).toBeInTheDocument();
  });

  test("expands cities when country is clicked", async () => {
    render(<LocationTree onSelectFloorplan={jest.fn()} />);

    await userEvent.click(screen.getByText("Germany"));

    expect(screen.getByText("Berlin")).toBeInTheDocument();
    expect(screen.getByText("Munich")).toBeInTheDocument();
  });

  test("expands buildings when city is clicked", async () => {
    render(<LocationTree onSelectFloorplan={jest.fn()} />);

    await userEvent.click(screen.getByText("Germany"));
    await userEvent.click(screen.getByText("Berlin"));

    expect(screen.getByText("Building A")).toBeInTheDocument();
    expect(screen.getByText("Building B")).toBeInTheDocument();
  });

  test("calls onSelectFloorplan when building is clicked", async () => {
    const onSelectFloorplan = jest.fn();

    render(<LocationTree onSelectFloorplan={onSelectFloorplan} />);

    await userEvent.click(screen.getByText("Germany"));
    await userEvent.click(screen.getByText("Berlin"));
    await userEvent.click(screen.getByText("Building A"));

    expect(onSelectFloorplan).toHaveBeenCalledTimes(1);
    expect(onSelectFloorplan).toHaveBeenCalledWith("floor1.svg");
  });

  test("collapses expanded nodes on second click", async () => {
    render(<LocationTree onSelectFloorplan={jest.fn()} />);

    const germany = screen.getByText("Germany");

    await userEvent.click(germany);
    expect(screen.getByText("Berlin")).toBeInTheDocument();

    await userEvent.click(germany);
    expect(screen.queryByText("Berlin")).not.toBeInTheDocument();
  });
});
