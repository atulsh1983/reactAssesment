import React, { useState } from "react";
import "./Implementation.scss";
import { LocationTree } from "./LocationTree";
import { SvgRenderer } from "./SvgRenderer";
import { getRandomHexColor, hexColorToGeneralName } from "./utils/colors";

/**
 * Implementation tab is responsible for:
 * - Owning global UI state (rotation, color, filters, selected building)
 * - Wiring tree selection to SVG rendering
 * - Ensuring state persists across SVG switches
 *
 * SVG rendering and tree rendering will be delegated
 * to child components to keep responsibilities clear.
 */
export const Implementation = () => {
  /**
   * Selected building identifier from the location tree.
   * When this changes, a different SVG will be rendered.
   */
  const [selectedFloorplan, setSelectedFloorplan] = useState<string | null>(
    null
  );

  /**
   * Currently selected color applied to all SVG locations.
   * This state is global and must persist across SVG switches.
   */
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [availableColors] = useState<string[]>(() =>
    Array.from({ length: 10 }, getRandomHexColor)
  );

  /**
   * Controls whether the SVG is rotated by 180 degrees.
   * Rotation must persist when switching between buildings.
   */
  const [isRotated, setIsRotated] = useState<boolean>(false);

  /**
   * Active shape filter applied to SVG locations.
   * Used to show/hide shapes by type.
   */
  const [activeShapeFilter, setActiveShapeFilter] = useState<
    "all" | "circle" | "rect" | "star"
  >("all");

  return (
    <div className="implementation">
      {/* Top controls: rotate toggle, color selector, shape filter */}
      <div className="implementation-toolbar">
        {/* Controls will be added here in the next steps */}
        <div className="implementation-toolbar">
          <div className="toolbar-controls">
            <button
              className="rotate-toggle"
              onClick={() => setIsRotated((prev) => !prev)}
            >
              Toggle
            </button>
            <select
              value={selectedColor ?? ""}
              onChange={(e) => setSelectedColor(e.target.value || null)}
            >
              <option value="">No color</option>

              {availableColors.map((color) => (
                <option key={color} value={color}>
                  {hexColorToGeneralName(color)}
                </option>
              ))}
            </select>
            <select>Filter</select>
          </div>
        </div>
      </div>

      <div className="implementation-body">
        {/* Left panel: hierarchical tree */}
        <aside className="implementation-sidebar">
          {/* Tree component will be rendered here */}
          <LocationTree onSelectFloorplan={setSelectedFloorplan} />
        </aside>

        {/* Main content: SVG rendering area */}
        <main className="implementation-canvas">
          {selectedFloorplan ? (
            <div
              className="svg-wrapper"
              style={{
                transform: isRotated ? "rotate(180deg)" : "rotate(0deg)",
              }}
            >
              <SvgRenderer floorplan={selectedFloorplan} color={selectedColor} />
            </div>
          ) : (
            <div className="placeholder">Select location</div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Implementation;
