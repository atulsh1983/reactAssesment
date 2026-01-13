import React from "react";
import { render, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";

import { SvgRenderer } from "./SvgRenderer";
import {
  LOCATION_IDS,
  LOCATION_SHAPE_MAP,
} from "../../constants/floorplan";

afterEach(() => {
  cleanup();
  document.body.innerHTML = "";
});

describe("SvgRenderer", () => {
  test("renders an SVG for a valid floorplan", () => {
    const { container } = render(
      <SvgRenderer
        floorplan="floor1.svg"
        color={null}
        shapeFilter="all"
      />
    );

    const svg = container.querySelector("svg");
    expect(svg).toBeInTheDocument();
  });

  test("applies selected color to all SVG locations", () => {
    // Create fake SVG elements with known IDs
    LOCATION_IDS.forEach((id) => {
      const el = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "path"
      );
      el.setAttribute("id", id);
      document.body.appendChild(el);
    });

    render(
      <SvgRenderer
        floorplan="floor1.svg"
        color="#ff0000"
        shapeFilter="all"
      />
    );

    LOCATION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      expect(el).toHaveAttribute("fill", "#ff0000");
    });
  });

  test("clears color when color is null", () => {
    LOCATION_IDS.forEach((id) => {
      const el = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "path"
      );
      el.setAttribute("id", id);
      el.setAttribute("fill", "#000000");
      document.body.appendChild(el);
    });

    render(
      <SvgRenderer
        floorplan="floor1.svg"
        color={null}
        shapeFilter="all"
      />
    );

    LOCATION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      expect(el?.getAttribute("fill")).toBeNull();
    });
  });

  test("filters SVG locations by shape type", () => {
    LOCATION_IDS.forEach((id) => {
      const el = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "path"
      );
      el.setAttribute("id", id);
      document.body.appendChild(el);
    });

    render(
      <SvgRenderer
        floorplan="floor1.svg"
        color={null}
        shapeFilter="circle"
      />
    );

    LOCATION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      const expectedVisible =
        LOCATION_SHAPE_MAP[id] === "circle";

      expect(el?.style.display).toBe(
        expectedVisible ? "" : "none"
      );
    });
  });

  test("re-applies effects when floorplan changes", () => {
    LOCATION_IDS.forEach((id) => {
      const el = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "path"
      );
      el.setAttribute("id", id);
      document.body.appendChild(el);
    });

    const { rerender } = render(
      <SvgRenderer
        floorplan="floor1.svg"
        color="#00ff00"
        shapeFilter="all"
      />
    );

    rerender(
      <SvgRenderer
        floorplan="floor2.svg"
        color="#00ff00"
        shapeFilter="all"
      />
    );

    LOCATION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      expect(el).toHaveAttribute("fill", "#00ff00");
    });
  });
});
