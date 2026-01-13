import React from "react";
import { render, screen, act } from "@testing-library/react";
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

    await act(async () => {
      await userEvent.click(screen.getByText("Germany"));
    });

    expect(await screen.findByText("Berlin")).toBeInTheDocument();
    expect(await screen.findByText("Munich")).toBeInTheDocument();
  });

  test("expands buildings when city is clicked", async () => {
    render(<LocationTree onSelectFloorplan={jest.fn()} />);

    await act(async () => {
      await userEvent.click(screen.getByText("Germany"));
    });

    const berlin = await screen.findByText("Berlin");

    await act(async () => {
      await userEvent.click(berlin);
    });

    expect(await screen.findByText("Building A")).toBeInTheDocument();
    expect(await screen.findByText("Building B")).toBeInTheDocument();
  });

  test("calls onSelectFloorplan when building is clicked", async () => {
    const onSelectFloorplan = jest.fn();
    render(<LocationTree onSelectFloorplan={onSelectFloorplan} />);

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

    expect(onSelectFloorplan).toHaveBeenCalledTimes(1);
    expect(onSelectFloorplan).toHaveBeenCalledWith("floor1.svg");
  });

  test("collapses expanded nodes on second click", async () => {
    render(<LocationTree onSelectFloorplan={jest.fn()} />);

    const germany = screen.getByText("Germany");

    await act(async () => {
      await userEvent.click(germany);
    });

    expect(await screen.findByText("Berlin")).toBeInTheDocument();

    await act(async () => {
      await userEvent.click(germany);
    });

    expect(screen.queryByText("Berlin")).not.toBeInTheDocument();
  });
});
