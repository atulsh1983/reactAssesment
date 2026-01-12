import React, { useEffect } from "react";
import {
  LOCATION_IDS,
  LOCATION_SHAPE_MAP,
} from "./constants/floorplan";

// Import SVGs as React components
import { ReactComponent as Floor1 } from "./assets/floor1.svg";
import { ReactComponent as Floor2 } from "./assets/floor2.svg";
import { ReactComponent as Floor3 } from "./assets/floor3.svg";
import { ReactComponent as FloorPlan } from "./assets/floor_plan.svg";

type ShapeFilter = "all" | "circle" | "rect" | "star";

type Props = {
  floorplan: string;
  color: string | null;
  shapeFilter: ShapeFilter;
};

/**
 * Renders the correct SVG based on the selected floorplan
 * and applies color + shape filtering to SVG locations.
 *
 * IMPORTANT:
 * Shape filtering is ID-based (not tag-based) to handle
 * inconsistent SVG authoring across buildings.
 */
export const SvgRenderer: React.FC<Props> = ({
  floorplan,
  color,
  shapeFilter,
}) => {
  useEffect(() => {
    // Step 1: Hide all known locations by default (when filtering)
    if (shapeFilter !== "all") {
      LOCATION_IDS.forEach((id) => {
        const el = document.getElementById(id);
        if (el) {
          el.style.display = "none";
        }
      });
    }
  
    // Step 2: Apply color + show matching shapes
    LOCATION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
  
      /* ---------- COLOR ---------- */
      if (color) {
        el.setAttribute("fill", color);
      } else {
        el.removeAttribute("fill");
      }
  
      /* ---------- FILTER ---------- */
      let visible = true;
  
      if (shapeFilter !== "all") {
        visible = LOCATION_SHAPE_MAP[id] === shapeFilter;
      }
  
      el.style.display = visible ? "" : "none";
    });
  }, [color, shapeFilter, floorplan]);
  
  switch (floorplan) {
    case "floor1.svg":
      return <Floor1 />;

    case "floor2.svg":
      return <Floor2 />;

    case "floor3.svg":
      return <Floor3 />;

    case "floor_plan.svg":
      return <FloorPlan />;

    default:
      return null;
  }
};

export default SvgRenderer;
